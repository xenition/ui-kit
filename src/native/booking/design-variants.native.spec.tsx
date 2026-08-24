import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import {
  SEED_LIGHT,
  SEED_DARK,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { BookingCalendarV2 } from './BookingCalendarV2';
import { BookingCalendarV3 } from './BookingCalendarV3';
import { SlotPickerV2 } from './SlotPickerV2';
import { SlotPickerV3 } from './SlotPickerV3';
import { BookingSummaryV2 } from './BookingSummaryV2';
import { BookingSummaryV3 } from './BookingSummaryV3';
import type { BookingSlot } from '../../booking/types';

const SEEDS = [SEED_LIGHT, SEED_DARK] as const;

// A fixed selected day so the strip/grid are deterministic (June 2026).
const SELECTED = new Date(2026, 5, 15); // 2026-06-15 (local civil date)

// Slots spanning morning / afternoon / evening (UTC → stable bucketing).
const slots: BookingSlot[] = [
  { startsAt: '2026-06-15T09:00:00Z', endsAt: '2026-06-15T09:30:00Z', spotsLeft: 4 }, // morning, open
  { startsAt: '2026-06-15T14:00:00Z', endsAt: '2026-06-15T14:30:00Z', spotsLeft: 2 }, // afternoon, low
  { startsAt: '2026-06-15T19:00:00Z', endsAt: '2026-06-15T19:30:00Z', spotsLeft: 0 }, // evening, full
];

describe('booking design variants — mount + core content', () => {
  it('BookingCalendarV2 renders month grid with availability dots', () => {
    const { getByLabelText, getAllByTestId } = renderThemed(
      <BookingCalendarV2
        selectedDate={SELECTED}
        availability={[
          { date: '2026-06-15', count: 3 },
          { date: '2026-06-16', count: 1 },
        ]}
      />,
      SEED_LIGHT
    );
    expect(getByLabelText(/June 15, 2026, available/).props.accessibilityState.selected).toBe(true);
    expect(getAllByTestId('xen-calendar-v2-dot')).toHaveLength(2);
  });

  it('BookingCalendarV3 renders a horizontal strip of day pills', () => {
    const { getByLabelText, getAllByTestId } = renderThemed(
      <BookingCalendarV3
        selectedDate={SELECTED}
        availability={[{ date: '2026-06-15', count: 3 }]}
      />,
      SEED_DARK
    );
    // The selected day is present and pressable in the strip.
    expect(getByLabelText(/June 15, 2026, available/)).toBeTruthy();
    expect(getAllByTestId('xen-calendar-v3-dot')).toHaveLength(1);
  });

  it('SlotPickerV2 groups slots under Morning / Afternoon / Evening headers', () => {
    const { getByText } = renderThemed(
      <SlotPickerV2 slots={slots} timeZone="UTC" />,
      SEED_LIGHT
    );
    expect(getByText('MORNING')).toBeTruthy();
    expect(getByText('AFTERNOON')).toBeTruthy();
    expect(getByText('EVENING')).toBeTruthy();
    expect(getByText('4 open')).toBeTruthy();
    expect(getByText('2 left')).toBeTruthy();
    expect(getByText('Full')).toBeTruthy();
  });

  it('SlotPickerV3 renders one capacity row per slot (incl. empty state)', () => {
    const { getByText } = renderThemed(
      <SlotPickerV3 slots={slots} timeZone="UTC" scrollEnabled={false} />,
      SEED_DARK
    );
    expect(getByText('4 open')).toBeTruthy();
    expect(getByText('2 left')).toBeTruthy();
    expect(getByText('Full')).toBeTruthy();

    const empty = renderThemed(<SlotPickerV3 slots={[]} scrollEnabled={false} />, SEED_LIGHT);
    expect(empty.getByText('No times available.')).toBeTruthy();
  });

  it('BookingSummaryV2 / V3 render the recap (and an empty state)', () => {
    const v2 = renderThemed(
      <BookingSummaryV2
        resource={{ name: 'Dr. Reed', timezone: 'UTC', slotMinutes: 30 }}
        slot={slots[0]}
      />,
      SEED_LIGHT
    );
    expect(v2.getByText('Your booking')).toBeTruthy();
    expect(v2.getByText('Dr. Reed')).toBeTruthy();
    expect(v2.getByText('30 min')).toBeTruthy();

    const v3 = renderThemed(
      <BookingSummaryV3
        resource={{ name: 'Studio A', timezone: 'UTC', slotMinutes: 45 }}
        slot={slots[1]}
      />,
      SEED_DARK
    );
    // Facts collapse to a single dot-separated muted line.
    expect(v3.getByText(/Studio A/)).toBeTruthy();
    expect(v3.getByText(/45 min/)).toBeTruthy();

    const empty = renderThemed(<BookingSummaryV2 />, SEED_DARK);
    expect(empty.getByText('Nothing selected yet.')).toBeTruthy();
  });
});

describe('booking design variants — interaction', () => {
  it('BookingCalendarV2 fires onSelectDate with the civil date', () => {
    const onSelectDate = jest.fn();
    const { getByLabelText } = renderThemed(
      <BookingCalendarV2 selectedDate={SELECTED} onSelectDate={onSelectDate} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText(/June 20, 2026/));
    expect(onSelectDate).toHaveBeenCalledTimes(1);
    const arg = onSelectDate.mock.calls[0][0] as Date;
    expect(arg.getFullYear()).toBe(2026);
    expect(arg.getMonth()).toBe(5);
    expect(arg.getDate()).toBe(20);
  });

  it('BookingCalendarV3 fires onSelectDate when a day pill is pressed', () => {
    const onSelectDate = jest.fn();
    const { getByLabelText } = renderThemed(
      <BookingCalendarV3 selectedDate={SELECTED} onSelectDate={onSelectDate} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText(/June 15, 2026/));
    expect(onSelectDate).toHaveBeenCalledTimes(1);
    expect((onSelectDate.mock.calls[0][0] as Date).getDate()).toBe(15);
  });

  it('SlotPickerV2 picks a bookable chip but never a full one', () => {
    const onPick = jest.fn();
    const { getByLabelText } = renderThemed(
      <SlotPickerV2 slots={slots} timeZone="UTC" onPick={onPick} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText(/4 open$/));
    expect(onPick).toHaveBeenCalledTimes(1);
    expect(onPick.mock.calls[0][0].startsAt).toBe('2026-06-15T09:00:00Z');

    const fullChip = getByLabelText(/Full$/);
    expect(fullChip.props.accessibilityState.disabled).toBe(true);
    fireEvent.press(fullChip);
    expect(onPick).toHaveBeenCalledTimes(1); // unchanged
  });

  it('SlotPickerV3 fires onPick with the slot and marks selection', () => {
    const onPick = jest.fn();
    const { getByLabelText } = renderThemed(
      <SlotPickerV3
        slots={slots}
        timeZone="UTC"
        onPick={onPick}
        selected="2026-06-15T09:00:00Z"
        scrollEnabled={false}
      />,
      SEED_DARK
    );
    const openRow = getByLabelText(/4 open$/);
    expect(openRow.props.accessibilityState.selected).toBe(true);
    fireEvent.press(getByLabelText(/2 left$/));
    expect(onPick).toHaveBeenCalledTimes(1);
    expect(onPick.mock.calls[0][0].startsAt).toBe('2026-06-15T14:00:00Z');
  });
});

describe('booking design variants — token purity (both seeds)', () => {
  it('every rendered hex traces to a compiled token', () => {
    SEEDS.forEach((seed) => {
      const { root } = renderThemed(
        <>
          <BookingCalendarV2
            selectedDate={SELECTED}
            availability={[{ date: '2026-06-15', count: 3 }]}
          />
          <BookingCalendarV3
            selectedDate={SELECTED}
            availability={[{ date: '2026-06-15', count: 3 }]}
          />
          <SlotPickerV2 slots={slots} timeZone="UTC" selected={slots[0]} />
          <SlotPickerV3 slots={slots} timeZone="UTC" selected={slots[0]} scrollEnabled={false} />
          <BookingSummaryV2 resource={{ name: 'Dr. Reed', timezone: 'UTC', slotMinutes: 30 }} slot={slots[0]} />
          <BookingSummaryV3 resource={{ name: 'Dr. Reed', timezone: 'UTC', slotMinutes: 30 }} slot={slots[0]} />
        </>,
        seed
      );
      const allowed = tokenHexSet(seed);
      const found = renderedStyleHexes(root);
      expect(found.length).toBeGreaterThan(0);
      found.forEach((hex) => expect(allowed.has(hex)).toBe(true));
    });
  });
});
