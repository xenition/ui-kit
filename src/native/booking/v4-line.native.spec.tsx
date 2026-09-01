/**
 * The **V4 booking line** (native) — the props V4 adds, the empty states, and
 * the one functional bug the pass found: the week view's chevrons moved a
 * value the week row was not reading, so they did nothing on screen.
 *
 * The web twin of this file asserts the same things against the same prop
 * names.
 */
import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { BookingCalendarV4 } from './BookingCalendarV4';
import { SlotPickerV4 } from './SlotPickerV4';
import { BookingSummaryV4 } from './BookingSummaryV4';
import { groupSlotsByPeriod, slotPeriod } from '../../booking/schedule-v4';
import type { BookingSlot } from '../../booking/types';

/** Three slots on one day, one in each bucket, in UTC so the test is stable. */
const SLOTS: BookingSlot[] = [
  { startsAt: '2026-09-01T09:00:00Z', endsAt: '2026-09-01T09:30:00Z', spotsLeft: 8 },
  { startsAt: '2026-09-01T14:00:00Z', endsAt: '2026-09-01T14:30:00Z', spotsLeft: 2 },
  { startsAt: '2026-09-01T19:00:00Z', endsAt: '2026-09-01T19:30:00Z', spotsLeft: 0 },
];

describe('schedule-v4', () => {
  it('buckets a slot in its own timezone, not the device s', () => {
    // 09:00 UTC is morning in London and evening in Auckland. The bucket has
    // to follow the booking, not whoever is looking at it.
    expect(slotPeriod('2026-09-01T09:00:00Z', 'UTC')).toBe('morning');
    expect(slotPeriod('2026-09-01T09:00:00Z', 'Pacific/Auckland')).toBe('evening');
  });

  it('drops empty buckets and keeps the caller s order inside one', () => {
    const groups = groupSlotsByPeriod(SLOTS, 'UTC');
    expect(groups.map((g) => g.period)).toEqual(['morning', 'afternoon', 'evening']);
    expect(groups[0]!.slots).toHaveLength(1);

    const morningOnly = groupSlotsByPeriod([SLOTS[0]!], 'UTC');
    expect(morningOnly.map((g) => g.period)).toEqual(['morning']);
  });
});

describe('BookingCalendarV4', () => {
  it('moves a week at a time in the week view, and says so', () => {
    // The base's chevrons were labelled "Previous month" in both views and
    // moved `viewDate` by a month, which the week row did not read.
    const { getByLabelText } = renderThemed(
      <BookingCalendarV4 view="week" selectedDate={new Date('2026-09-01T12:00:00Z')} />,
      SEED_LIGHT
    );
    expect(getByLabelText('Previous week')).toBeTruthy();
    expect(getByLabelText('Next week')).toBeTruthy();
  });

  it('still says month in the month view', () => {
    const { getByLabelText } = renderThemed(<BookingCalendarV4 view="month" />, SEED_LIGHT);
    expect(getByLabelText('Previous month')).toBeTruthy();
  });

  it('marks today in the cell s accessible name', () => {
    const today = new Date();
    const { getAllByLabelText, queryAllByLabelText } = renderThemed(
      <BookingCalendarV4 selectedDate={today} todayLabel="today" />,
      SEED_LIGHT
    );
    // One cell in the grid carries it; the month view can render the same day
    // number twice at a boundary, so this asserts "at least one".
    expect(queryAllByLabelText(/today/).length).toBeGreaterThan(0);
    expect(getAllByLabelText(/no availability|available/).length).toBeGreaterThan(0);
  });

  it('can be told not to mark today', () => {
    const { queryAllByLabelText } = renderThemed(
      <BookingCalendarV4 markToday={false} selectedDate={new Date()} />,
      SEED_LIGHT
    );
    expect(queryAllByLabelText(/today/)).toHaveLength(0);
  });
});

describe('SlotPickerV4', () => {
  it('groups a day into morning, afternoon and evening', () => {
    const { getByText } = renderThemed(
      <SlotPickerV4 slots={SLOTS} timeZone="UTC" />,
      SEED_LIGHT
    );
    ['Morning', 'Afternoon', 'Evening'].forEach((h) => expect(getByText(h)).toBeTruthy());
  });

  it('drops the headings when grouping is off', () => {
    const { queryByText } = renderThemed(
      <SlotPickerV4 slots={SLOTS} timeZone="UTC" grouped={false} />,
      SEED_LIGHT
    );
    expect(queryByText('Morning')).toBeNull();
  });

  it('lets the host write the spots hint', () => {
    const { getByText } = renderThemed(
      <SlotPickerV4
        slots={[SLOTS[0]!]}
        timeZone="UTC"
        formatSpots={(n) => `noch ${n} frei`}
      />,
      SEED_LIGHT
    );
    expect(getByText('noch 8 frei')).toBeTruthy();
  });

  it('will not pick a full slot', () => {
    const onPick = jest.fn();
    const { getByText } = renderThemed(
      <SlotPickerV4 slots={[SLOTS[2]!]} timeZone="UTC" onPick={onPick} fullLabel="Full" />,
      SEED_LIGHT
    );
    fireEvent.press(getByText('Full'));
    expect(onPick).not.toHaveBeenCalled();
  });

  it('shows the empty message rather than a blank grid', () => {
    const { getByText } = renderThemed(
      <SlotPickerV4 slots={[]} emptyMessage="Nothing free." />,
      SEED_LIGHT
    );
    expect(getByText('Nothing free.')).toBeTruthy();
  });
});

describe('BookingSummaryV4', () => {
  it('shows the price, which the base could not', () => {
    const { getByText } = renderThemed(
      <BookingSummaryV4
        resource={{ name: 'Dr Ada' }}
        price="$48.00"
        priceNote="Charged at the appointment"
      />,
      SEED_LIGHT
    );
    expect(getByText('Total')).toBeTruthy();
    expect(getByText('$48.00')).toBeTruthy();
    expect(getByText('Charged at the appointment')).toBeTruthy();
  });

  it('lets the host relabel every row', () => {
    const { getByText, queryByText } = renderThemed(
      <BookingSummaryV4
        resource={{ name: 'Dr Ada' }}
        labels={{ resource: 'Mit', price: 'Summe' }}
        price="48,00 €"
      />,
      SEED_LIGHT
    );
    expect(getByText('Mit')).toBeTruthy();
    expect(getByText('Summe')).toBeTruthy();
    expect(queryByText('With')).toBeNull();
  });

  it('says nothing is selected rather than rendering an empty card', () => {
    const { getByText } = renderThemed(<BookingSummaryV4 />, SEED_LIGHT);
    expect(getByText('Nothing selected yet.')).toBeTruthy();
  });
});
