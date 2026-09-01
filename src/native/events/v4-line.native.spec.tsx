/**
 * The **V4 events line** (native) — the twin of `events/v4-line.spec.tsx`. The
 * schedule pass is the same pure module, so the date, countdown and inventory
 * findings are pinned once and hold on both sides.
 */
import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import {
  countdownParts,
  countdownSentence,
  monthName,
  remainingParts,
  seatParts,
  weekdayName,
} from '../../events/schedule-v4';
import { SessionCardV4 } from './SessionCardV4';
import { TicketTypeRowV4 } from './TicketTypeRowV4';

describe('schedule-v4', () => {
  it('speaks the locale it is given', () => {
    // `events/format.ts` held WEEKDAYS_SHORT and MONTHS_SHORT as inline English
    // arrays, duplicated in both twins, so the strip was English-only and
    // always Sunday-first.
    const day = new Date(2026, 0, 5);
    expect(weekdayName(day, 'fr-FR').toLowerCase()).toContain('lun');
    expect(monthName(day, 'fr-FR').toLowerCase()).toContain('janv');
    expect(weekdayName(day, 'en-US')).toBe('Mon');
  });

  it('does not announce that an event has started when it knows nothing', () => {
    // The base fell through to ms = 0 with neither a target nor a remaining
    // duration, and countdownParts(0) reports elapsed — so a badge with
    // nothing to count down to said the event had already begun.
    const unknown = countdownParts(undefined);
    expect(unknown.known).toBe(false);
    expect(unknown.elapsed).toBe(false);

    const started = countdownParts(0);
    expect(started.known).toBe(true);
    expect(started.elapsed).toBe(true);
  });

  it('splits a duration and pluralises the sentence', () => {
    const parts = countdownParts((26 * 60 + 1) * 60 * 1000);
    expect(parts.days).toBe(1);
    expect(parts.hours).toBe(2);
    expect(parts.minutes).toBe(1);
    // The base announced "1 days 1 hours 1 minutes".
    expect(countdownSentence({ days: 1, hours: 1, minutes: 1, elapsed: false, known: true })).toBe(
      '1 day 1 hour 1 minute'
    );
  });

  it('clamps seats instead of printing a negative count', () => {
    // The base clamped the *bar* and then printed the raw number, so
    // seatsTaken: -5 drew an empty meter beside "-5 / 100 seats taken".
    expect(seatParts(-5, 100)).toMatchObject({ taken: 0, ratio: 0, full: false });
    expect(seatParts(500, 100)).toMatchObject({ taken: 100, full: true });
    expect(seatParts(50, 100)).toMatchObject({ taken: 50, ratio: 0.5, full: false });
    expect(seatParts(50, 0)).toBeUndefined();
    expect(seatParts(undefined, 100)).toBeUndefined();
  });

  it('treats negative inventory as sold out rather than ignoring it', () => {
    // `remaining === 0` is a strict test, so -3 was neither sold out nor low
    // stock: the row rendered normal, enabled, and onSelect fired.
    expect(remainingParts(-3, undefined, 10)).toMatchObject({ soldOut: true, lowStock: false });
    expect(remainingParts(0, undefined, 10)).toMatchObject({ soldOut: true });
    expect(remainingParts(2, undefined, 10)).toMatchObject({ soldOut: false, lowStock: true });
    expect(remainingParts(40, undefined, 10)).toMatchObject({ soldOut: false, lowStock: false });
    expect(remainingParts(40, true, 10)).toMatchObject({ soldOut: true });
  });
});

describe('SessionCardV4', () => {
  it('reaches the bookmark without going through the card', () => {
    // On native the outer Pressable was `accessible` with the card's own
    // label, so VoiceOver flattened the card to one leaf and the bookmark was
    // not reachable at all.
    const onPress = jest.fn();
    const onBookmark = jest.fn();
    const { getByLabelText } = renderThemed(
      <SessionCardV4 title="Keynote" onPress={onPress} onBookmark={onBookmark} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText(/bookmark/i));
    expect(onBookmark).toHaveBeenCalled();
    expect(onPress).not.toHaveBeenCalled();
  });
});

describe('TicketTypeRowV4', () => {
  it('will not sell negative inventory', () => {
    const onSelect = jest.fn();
    const { getByLabelText } = renderThemed(
      <TicketTypeRowV4 name="General" price="£20" remaining={-3} onSelect={onSelect} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText(/General/));
    expect(onSelect).not.toHaveBeenCalled();
  });
});
