/** @jest-environment jsdom */
/**
 * The **V4 fieldservice line** (web) — the verdict pass, and the finding this
 * module exists for: a stray tap turned a safety block into "All clear".
 */
import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { clearsHazard, hazardCount, isComplete, nextVerdict } from './verdict-v4';
import { JobSiteCardV4 } from './JobSiteCardV4';
import { SafetyChecklistV4 } from './SafetyChecklistV4';
import { ServiceChecklistV4 } from './ServiceChecklistV4';

describe('verdict-v4', () => {
  it('guards the one transition that takes a hazard off the screen', () => {
    // The finding. `fail -> unchecked` on one press dropped the item out of
    // the hazard count, unmounted the "do not proceed" banner and flipped the
    // header to "All clear" — no confirmation, no undo, no announcement.
    const hazard = { hazard: true, verdict: 'fail' as const };
    expect(clearsHazard(hazard, 'unchecked')).toBe(true);
    expect(clearsHazard(hazard, 'pass')).toBe(true);
    // Staying failed is not clearing it.
    expect(clearsHazard(hazard, 'fail')).toBe(false);
    // An ordinary failing checkpoint cycles freely; only a *blocking* one asks.
    expect(clearsHazard({ hazard: false, verdict: 'fail' }, 'unchecked')).toBe(false);
    expect(clearsHazard({ hazard: true, verdict: 'pass' }, 'fail')).toBe(false);
  });

  it('leaves the cycle exactly as it was', () => {
    // Passing is the ordinary case. Making it cost two taps would be a worse
    // component, not a safer one — the guard is on the hazard, not the cycle.
    expect(nextVerdict('unchecked')).toBe('pass');
    expect(nextVerdict('pass')).toBe('fail');
    expect(nextVerdict('fail')).toBe('unchecked');
  });

  it('counts only blocking hazards that are actually failing', () => {
    expect(
      hazardCount([
        { hazard: true, verdict: 'fail' },
        { hazard: true, verdict: 'pass' },
        { hazard: false, verdict: 'fail' },
        { hazard: true, verdict: 'unchecked' },
      ])
    ).toBe(1);
  });

  it('does not call a checklist complete one item early', () => {
    // The base compared a *rounded* percentage against 100, and the round-trip
    // through clampPct turned 199/200 into 100 — the bar went green with an
    // item outstanding.
    expect(isComplete(199, 200)).toBe(false);
    expect(isComplete(200, 200)).toBe(true);
    expect(isComplete(0, 0)).toBe(false);
  });
});

const HAZARD = [
  { id: 'h1', label: 'Fall protection anchored', verdict: 'fail' as const, hazard: true },
];

describe('SafetyChecklistV4', () => {
  it('does not clear a blocking hazard on one press', () => {
    const onToggle = jest.fn();
    const { getAllByRole } = render(
      <SafetyChecklistV4 items={HAZARD} onToggle={onToggle} />
    );
    const row = getAllByRole('button')[0] as HTMLElement;

    fireEvent.click(row);
    // The first press arms it and says so; it does not report a change.
    expect(onToggle).not.toHaveBeenCalled();

    fireEvent.click(row);
    expect(onToggle).toHaveBeenCalledWith('h1', 'unchecked');
  });

  it('leaves an ordinary checkpoint immediate', () => {
    const onToggle = jest.fn();
    const { getAllByRole } = render(
      <SafetyChecklistV4
        items={[{ id: 'o1', label: 'Ladder inspected', verdict: 'unchecked' }]}
        onToggle={onToggle}
      />
    );
    fireEvent.click(getAllByRole('button')[0] as HTMLElement);
    expect(onToggle).toHaveBeenCalledWith('o1', 'pass');
  });
});

describe('ServiceChecklistV4', () => {
  it('does not report complete one item early', () => {
    const tasks = Array.from({ length: 200 }, (_, i) => ({
      id: `t${i}`,
      label: `Task ${i}`,
      done: i < 199,
    }));
    const { container } = render(<ServiceChecklistV4 tasks={tasks} />);
    // 199/200 rounds to 100%; the count is what decides.
    expect(container.textContent).not.toContain('100%');
  });
});

describe('JobSiteCardV4', () => {
  it('keeps Directions out of the card\'s own activation', () => {
    // The card's onKeyDown caught the keydown bubbling out of the nested
    // button and ran preventDefault(); currentTarget.click() — so Enter on
    // Directions opened the site card instead.
    const onClick = jest.fn();
    const onNavigate = jest.fn();
    const { getByRole } = render(
      <JobSiteCardV4
        name="Depot 4"
        address="12 Mill Lane"
        status="active"
        onClick={onClick}
        onNavigate={onNavigate}
      />
    );
    const directions = getByRole('button', { name: /Directions/i });
    expect(directions.closest('button')).toBe(directions);

    fireEvent.click(directions);
    expect(onNavigate).toHaveBeenCalled();
    expect(onClick).not.toHaveBeenCalled();
  });
});
