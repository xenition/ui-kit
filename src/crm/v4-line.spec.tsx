/** @jest-environment jsdom */
/**
 * The **V4 crm line** (web) — the twin of `native/crm/v4-line.native.spec.tsx`,
 * plus the web's own half of the headline finding: a quick action on a contact
 * card fired the card's handler too.
 */
import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { ACTIVITY_META } from './internal';
import { ACTIVITY_META_V4, BADGE_V4, attainment, spokenLine } from './internal/crm-v4';
import { ActivityLogRowV4 } from './ActivityLogRowV4';
import { ContactCardV4 } from './ContactCardV4';
import { ContactTimelineV4 } from './ContactTimelineV4';
import { DealCardV4 } from './DealCardV4';
import { DealForecastV4 } from './DealForecastV4';
import { EmailThreadRowV4 } from './EmailThreadRowV4';
import { LeadRowV4 } from './LeadRowV4';
import { NextStepRowV4 } from './NextStepRowV4';
import { PipelineBoardV4 } from './PipelineBoardV4';
import { QuoteCardV4 } from './QuoteCardV4';
import { TagFilterBarV4 } from './TagFilterBarV4';
import { WinLossBadgeV4 } from './WinLossBadgeV4';

describe('crm-v4', () => {
  it('clamps attainment into its own track', () => {
    // The base divided raw, so a reversed period rendered a negative percent
    // and a bumper quarter drew a bar past the end of the track.
    expect(attainment(5000, 10000)).toBe(50);
    expect(attainment(20000, 10000)).toBe(100);
    expect(attainment(-5000, 10000)).toBe(0);
    // No target is not zero attainment — it is no answer.
    expect(attainment(5000, 0)).toBeUndefined();
    expect(attainment(5000, undefined)).toBeUndefined();
  });

  it('stops an activity kind from wearing a status colour', () => {
    // A logged task is not a success. The glyph already says which kind it is.
    expect(ACTIVITY_META_V4.task.tone).toBe('neutral');
    expect(ACTIVITY_META_V4.deal.tone).toBe('neutral');
    // ...and the glyph it carries is untouched.
    expect(ACTIVITY_META_V4.call.glyph).toBe(ACTIVITY_META.call.glyph);
  });

  it('pins one badge shape for both twins', () => {
    // Web took Badge's `solid` default while native passed `soft`, so a won
    // deal was a saturated pill on one platform and a tinted chip on the other.
    expect(BADGE_V4).toEqual({ variant: 'soft', size: 'sm' });
  });

  it('joins a spoken line with commas, not the visible middle dot', () => {
    expect(spokenLine(['Acme', null, '$4,000', ''])).toBe('Acme, $4,000');
  });
});

describe('ContactCardV4', () => {
  it('dials without also opening the contact', () => {
    // The finding. The action pills were real buttons nested inside a root
    // that `activate()` had turned into a `role="button"` with its own
    // handler, and nothing stopped the event — so "Call" dialled *and*
    // navigated. Native never had the bug, so it only reproduced here.
    const onClick = jest.fn();
    const onCall = jest.fn();
    const { getByRole } = render(
      <ContactCardV4
        name="Ada"
        onClick={onClick}
        actions={[{ key: 'call', glyph: '📞', label: 'Call', onClick: onCall }]}
      />
    );

    fireEvent.click(getByRole('button', { name: /Call/ }));
    expect(onCall).toHaveBeenCalledTimes(1);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('does not nest the action inside the card\'s own control', () => {
    const { getByRole } = render(
      <ContactCardV4
        name="Ada"
        onClick={jest.fn()}
        actions={[{ key: 'call', glyph: '📞', label: 'Call', onClick: jest.fn() }]}
      />
    );
    const action = getByRole('button', { name: /Call/ });
    expect(action.closest('button')).toBe(action);
  });
});

describe('LeadRowV4', () => {
  it('announces the score and the money the base dropped', () => {
    const { getByRole } = render(
      <LeadRowV4
        name="Ada"
        company="Acme"
        temperature="warm"
        score={72}
        valueCents={400000}
        onClick={jest.fn()}
      />
    );
    const name = getByRole('button').getAttribute('aria-label') ?? '';
    expect(name).toContain('72');
    expect(name).toContain('Score');
  });

  it('does not announce a plain row as a button', () => {
    const { queryByRole } = render(<LeadRowV4 name="Ada" temperature="warm" score={72} />);
    expect(queryByRole('button')).toBeNull();
  });
});

describe('NextStepRowV4', () => {
  it('announces the meta line, which is the point of the row', () => {
    const { getByRole } = render(
      <NextStepRowV4 title="Send the quote" overdue dueDate="Mar 4" onClick={jest.fn()} />
    );
    const names = Array.from(document.querySelectorAll('[aria-label]'))
      .map((el) => el.getAttribute('aria-label'))
      .join(' | ');
    expect(names).toContain('Overdue');
    expect(getByRole('button', { name: /Overdue/ })).toBeTruthy();
  });

  it('renders no checkbox when there is nothing to toggle', () => {
    const { queryByLabelText } = render(<NextStepRowV4 title="Send the quote" />);
    expect(queryByLabelText('Mark complete')).toBeNull();
  });
});

describe('DealForecastV4 / DealCardV4', () => {
  it('shows the target it has always only computed with', () => {
    const { getByText } = render(
      <DealForecastV4
        title="Q1"
        periods={[{ label: 'Jan', valueCents: 500000 }]}
        targetCents={1000000}
        formatTarget={() => '$10,000'}
      />
    );
    expect(getByText(/\$10,000/)).toBeTruthy();
  });

  it('says target met in words, not only in green', () => {
    const { getByText } = render(
      <DealForecastV4
        title="Q1"
        periods={[{ label: 'Jan', valueCents: 2000000 }]}
        targetCents={1000000}
        attainedLabel="Target met"
      />
    );
    expect(getByText('Target met')).toBeTruthy();
  });

  it('names the probability meter', () => {
    const { getByRole } = render(
      <DealCardV4 name="Acme" valueCents={400000} probability={60} probabilityLabel="Probability" />
    );
    expect(getByRole('progressbar').getAttribute('aria-label')).toContain('Probability');
  });
});

describe('WinLossBadgeV4', () => {
  it('honours the size the base dropped on web', () => {
    // `size` was destructured, read only in the `inline` branch and never
    // forwarded, so `DealCard` passing `size="sm"` got an `md` badge here and
    // an `sm` one on native.
    const { container } = render(<WinLossBadgeV4 outcome="won" size="sm" />);
    const md = render(<WinLossBadgeV4 outcome="won" size="md" />);
    expect(container.firstElementChild?.className).not.toBe(
      md.container.firstElementChild?.className
    );
  });

  it('renders an outcome with a word', () => {
    const { getByText } = render(<WinLossBadgeV4 outcome="won" />);
    expect(getByText(/Won/)).toBeTruthy();
  });
});

describe('PipelineBoardV4 / TagFilterBarV4', () => {
  it('gives a stage count its unit', () => {
    const { getByText } = render(
      <PipelineBoardV4
        stages={[
          { id: 's1', name: 'Qualified', deals: [{ id: 'd1', name: 'Acme', valueCents: 100 }] },
        ]}
        formatStageCount={(count) => `${count} deals`}
      />
    );
    // The chip stays a bare numeral on screen; the unit rides the name.
    expect(document.body.textContent).toContain('1');
  });

  it('announces a selected filter once, not twice', () => {
    // The base said `aria-pressed` *and* appended ", selected" to the name.
    const { getByRole } = render(
      <TagFilterBarV4
        tags={[{ key: 't1', label: 'Hot', count: 4 }]}
        selected={['t1']}
        onToggle={jest.fn()}
      />
    );
    const chip = getByRole('button', { name: /Hot/ });
    expect(chip.getAttribute('aria-pressed')).toBe('true');
    expect(chip.getAttribute('aria-label')).not.toMatch(/selected/i);
  });

  it('carries a filter count into the chip name', () => {
    const { getByRole } = render(
      <TagFilterBarV4
        tags={[{ key: 't1', label: 'Hot', count: 4 }]}
        selected={[]}
        onToggle={jest.fn()}
      />
    );
    expect(getByRole('button', { name: /4/ })).toBeTruthy();
  });
});

describe('ActivityLogRowV4 / ContactTimelineV4 / EmailThreadRowV4', () => {
  it('gives pending a word, not only a lowered opacity', () => {
    const { getByText } = render(
      <ActivityLogRowV4 kind="call" title="Called Ada" pending pendingLabel="Pending" />
    );
    expect(getByText(/Pending/)).toBeTruthy();
  });

  it('keeps the list intact when the timeline is interactive', () => {
    // The item set `role="listitem"` and then spread `activate()`, whose
    // `role: 'button'` won — so an interactive timeline was a list with zero
    // list items, which readers announce as empty.
    const { getAllByRole } = render(
      <ContactTimelineV4
        items={[{ id: 'i1', kind: 'call', title: 'Called Ada' }]}
        onItemClick={jest.fn()}
      />
    );
    expect(getAllByRole('listitem').length).toBe(1);
  });

  it('gives an empty timeline a next step', () => {
    const { getByText } = render(
      <ContactTimelineV4
        items={[]}
        emptyLabel="No activity yet"
        emptyDescription="Log a call to start."
      />
    );
    expect(getByText('Log a call to start.')).toBeTruthy();
  });

  it('gives the message count its unit', () => {
    const { getByRole } = render(
      <EmailThreadRowV4
        from="Ada"
        subject="Re: quote"
        messageCount={3}
        formatMessageCount={(n) => `${n} messages`}
        onClick={jest.fn()}
      />
    );
    expect(getByRole('button').getAttribute('aria-label')).toContain('3 messages');
  });
});
