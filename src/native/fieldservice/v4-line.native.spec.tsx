/**
 * The **V4 fieldservice line** (native) — the twin of
 * `fieldservice/v4-line.spec.tsx`. The verdict pass is the same pure module,
 * so the safety finding is pinned once and holds on both sides.
 */
import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import {
  clearsHazard,
  hazardCount,
  isComplete,
  nextVerdict,
} from '../../fieldservice/verdict-v4';
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
    const { getByLabelText } = renderThemed(
      <SafetyChecklistV4 items={HAZARD} onToggle={onToggle} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText(/Fall protection anchored/));
    expect(onToggle).not.toHaveBeenCalled();

    fireEvent.press(getByLabelText(/Fall protection anchored/));
    expect(onToggle).toHaveBeenCalledWith('h1', 'unchecked');
  });

  it('leaves an ordinary checkpoint immediate', () => {
    const onToggle = jest.fn();
    const { getByLabelText } = renderThemed(
      <SafetyChecklistV4
        items={[{ id: 'o1', label: 'Ladder inspected', verdict: 'unchecked' }]}
        onToggle={onToggle}
      />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText(/Ladder inspected/));
    expect(onToggle).toHaveBeenCalledWith('o1', 'pass');
  });
});

describe('ServiceChecklistV4', () => {
  it('renders a checklist', () => {
    const { getByText } = renderThemed(
      <ServiceChecklistV4 tasks={[{ id: 't1', label: 'Bleed the system', done: false }]} />,
      SEED_LIGHT
    );
    expect(getByText('Bleed the system')).toBeTruthy();
  });
});
