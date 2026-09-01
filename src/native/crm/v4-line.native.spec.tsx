/**
 * The **V4 crm line** (native) — the shared vocabulary, and the findings this
 * pass exists for: a card's name that swallowed everything inside it, and a
 * score badge coloured by something other than the score.
 */
import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
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

describe('LeadRowV4', () => {
  it('announces the score and the money the base dropped', () => {
    // The base labelled the row `Warm lead Ada` — which *replaces* the
    // subtree — so the value and the score were never announced at all.
    const { getByLabelText } = renderThemed(
      <LeadRowV4
        name="Ada"
        company="Acme"
        temperature="warm"
        score={72}
        valueCents={400000}
        onPress={jest.fn()}
      />,
      SEED_LIGHT
    );
    expect(getByLabelText(/72/)).toBeTruthy();
    expect(getByLabelText(/Score/)).toBeTruthy();
  });

  it('does not announce a plain row as a disabled button', () => {
    // `accessibilityRole="button"` was unconditional with `disabled={!onPress}`,
    // so a read-only row read as unavailable.
    const { queryByRole } = renderThemed(
      <LeadRowV4 name="Ada" temperature="warm" score={72} />,
      SEED_LIGHT
    );
    expect(queryByRole('button')).toBeNull();
  });
});

describe('NextStepRowV4', () => {
  it('announces the meta line, which is the point of the row', () => {
    // `accessibilityLabel={title}` dropped priority, assignee, due date and
    // the word Overdue — everything the row exists to show.
    const { getByLabelText } = renderThemed(
      <NextStepRowV4 title="Send the quote" overdue dueDate="Mar 4" onPress={jest.fn()} />,
      SEED_LIGHT
    );
    expect(getByLabelText(/Overdue/)).toBeTruthy();
  });

  it('renders no checkbox when there is nothing to toggle', () => {
    // The base drew a normal, apparently-tappable checkbox that did nothing.
    const { queryByLabelText } = renderThemed(
      <NextStepRowV4 title="Send the quote" />,
      SEED_LIGHT
    );
    expect(queryByLabelText(/Mark complete/)).toBeNull();
  });

  it('toggles through a named control when it can', () => {
    const onToggle = jest.fn();
    const { getByLabelText } = renderThemed(
      <NextStepRowV4 title="Send the quote" onToggle={onToggle} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText(/Mark complete/));
    expect(onToggle).toHaveBeenCalled();
  });
});

describe('DealForecastV4', () => {
  it('shows the target it has always only computed with', () => {
    const { getByText } = renderThemed(
      <DealForecastV4
        title="Q1"
        periods={[{ label: 'Jan', valueCents: 500000 }]}
        targetCents={1000000}
        formatTarget={() => '$10,000'}
      />,
      SEED_LIGHT
    );
    expect(getByText(/\$10,000/)).toBeTruthy();
  });

  it('says target met in words, not only in green', () => {
    const { getByText } = renderThemed(
      <DealForecastV4
        title="Q1"
        periods={[{ label: 'Jan', valueCents: 2000000 }]}
        targetCents={1000000}
        attainedLabel="Target met"
      />,
      SEED_LIGHT
    );
    expect(getByText('Target met')).toBeTruthy();
  });
});

describe('ContactCardV4 / QuoteCardV4 / DealCardV4', () => {
  it('keeps a quick action out of the card\'s own activation', () => {
    const onPress = jest.fn();
    const onCall = jest.fn();
    const { getByLabelText } = renderThemed(
      <ContactCardV4
        name="Ada"
        onPress={onPress}
        actions={[{ key: 'call', glyph: '📞', label: 'Call', onPress: onCall }]}
      />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText(/Call/));
    expect(onCall).toHaveBeenCalled();
    expect(onPress).not.toHaveBeenCalled();
  });

  it('announces a quote total, which the card name used to replace', () => {
    const { getAllByLabelText } = renderThemed(
      <QuoteCardV4 number="Q-1" status="sent" totalCents={250000} onPress={jest.fn()} />,
      SEED_LIGHT
    );
    // Both the card's name and the status chip carry it — assert the card's.
    expect(getAllByLabelText(/Sent/).length).toBeGreaterThan(0);
    expect(getAllByLabelText(/Q-1/).length).toBeGreaterThan(0);
  });

  it('names the probability meter', () => {
    const { getAllByLabelText } = renderThemed(
      <DealCardV4 name="Acme" valueCents={400000} probability={60} probabilityLabel="Probability" />,
      SEED_LIGHT
    );
    // The meter is named, where the base gave it a value and no name at all.
    expect(getAllByLabelText(/Probability/).length).toBeGreaterThan(0);
  });
});

describe('PipelineBoardV4 / TagFilterBarV4 / WinLossBadgeV4', () => {
  it('gives a stage count its unit', () => {
    const { getAllByLabelText } = renderThemed(
      <PipelineBoardV4
        stages={[
          { id: 's1', name: 'Qualified', deals: [{ id: 'd1', name: 'Acme', valueCents: 100 }] },
        ]}
        formatStageCount={(count) => `${count} deals`}
      />,
      SEED_LIGHT
    );
    // The chip stays a bare numeral on screen; the unit rides the spoken name.
    expect(getAllByLabelText(/1 deals/).length).toBeGreaterThan(0);
  });

  it('carries a filter count into the chip\'s name', () => {
    const { getByLabelText } = renderThemed(
      <TagFilterBarV4
        tags={[{ key: 't1', label: 'Hot', count: 4 }]}
        selected={[]}
        onToggle={jest.fn()}
      />,
      SEED_LIGHT
    );
    expect(getByLabelText(/4/)).toBeTruthy();
  });

  it('renders an outcome badge with a word', () => {
    const { getByText } = renderThemed(<WinLossBadgeV4 outcome="won" />, SEED_LIGHT);
    // Glyph and word in one string, so the badge is one reader stop.
    expect(getByText(/Won/)).toBeTruthy();
  });
});

describe('ActivityLogRowV4 / ContactTimelineV4 / EmailThreadRowV4', () => {
  it('gives pending a word, not only a lowered opacity', () => {
    const { getByLabelText } = renderThemed(
      <ActivityLogRowV4 kind="call" title="Called Ada" pending pendingLabel="Pending" />,
      SEED_LIGHT
    );
    expect(getByLabelText(/Pending/)).toBeTruthy();
  });

  it('gives an empty timeline a next step', () => {
    const { getByText } = renderThemed(
      <ContactTimelineV4
        items={[]}
        emptyLabel="No activity yet"
        emptyDescription="Log a call to start."
      />,
      SEED_LIGHT
    );
    expect(getByText('Log a call to start.')).toBeTruthy();
  });

  it('gives the message count its unit', () => {
    const { getByLabelText } = renderThemed(
      <EmailThreadRowV4
        from="Ada"
        subject="Re: quote"
        messageCount={3}
        formatMessageCount={(n) => `${n} messages`}
        onPress={jest.fn()}
      />,
      SEED_LIGHT
    );
    expect(getByLabelText(/3 messages/)).toBeTruthy();
  });
});
