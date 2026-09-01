/** @jest-environment jsdom */
/**
 * The **V4 events line** (web) — the schedule pass, and the finding this
 * module exists for: the keyboard could not reach a control nested in a card.
 */
import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import {
  countdownParts,
  countdownSentence,
  monthName,
  remainingParts,
  seatParts,
  weekdayName,
} from './schedule-v4';
import { SessionCardV4 } from './SessionCardV4';
import { TicketTypeRowV4 } from './TicketTypeRowV4';
import { VenueCardV4 } from './VenueCardV4';

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

describe('SessionCardV4 / VenueCardV4 — the nested control', () => {
  it('bookmarks from the keyboard instead of navigating away', () => {
    // The finding. The card's onKeyDown caught the keydown bubbling out of the
    // bookmark button and ran preventDefault(); currentTarget.click(), which
    // cancelled the button's own activation and fired the card instead.
    const onClick = jest.fn();
    const onBookmark = jest.fn();
    const { getByRole } = render(
      <SessionCardV4 title="Keynote" onClick={onClick} onBookmark={onBookmark} />
    );
    const bookmark = getByRole('button', { name: /bookmark/i });

    // The structural property that made the escape possible.
    expect(bookmark.closest('button')).toBe(bookmark);

    fireEvent.click(bookmark);
    expect(onBookmark).toHaveBeenCalled();
    expect(onClick).not.toHaveBeenCalled();
  });

  it('keeps Directions out of the venue card\'s activation', () => {
    const onClick = jest.fn();
    const onDirections = jest.fn();
    const { getByRole } = render(
      <VenueCardV4 name="The Depot" onClick={onClick} onDirections={onDirections} />
    );
    const directions = getByRole('button', { name: /Directions/i });
    expect(directions.closest('button')).toBe(directions);

    fireEvent.click(directions);
    expect(onDirections).toHaveBeenCalled();
    expect(onClick).not.toHaveBeenCalled();
  });

  it('exposes the seat meter, which role="button" made presentational', () => {
    const { getByRole } = render(
      <SessionCardV4 title="Keynote" capacity={100} seatsTaken={40} />
    );
    expect(getByRole('progressbar').getAttribute('aria-valuenow')).toBe('40');
  });
});

describe('TicketTypeRowV4', () => {
  it('will not sell negative inventory', () => {
    const onSelect = jest.fn();
    const { getByRole } = render(
      <TicketTypeRowV4 name="General" price="£20" remaining={-3} onSelect={onSelect} />
    );
    const row = getByRole('radio');
    fireEvent.click(row);
    expect(onSelect).not.toHaveBeenCalled();
  });
});
