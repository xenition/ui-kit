import * as React from 'react';
import { Text } from 'react-native';
import { fireEvent } from '@testing-library/react-native';
import {
  SEED_LIGHT,
  SEED_DARK,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { BookingCalendar } from './BookingCalendar';
import { SlotPicker } from './SlotPicker';
import { BookingSummary } from './BookingSummary';
import type { BookingSlot } from '../../booking/types';

// A fixed selected day so the month view is deterministic (June 2026).
const SELECTED = new Date(2026, 5, 15); // 2026-06-15 (local civil date)

// Two slots on the selected day, in UTC so the civil-day bucketing is stable.
const slots: BookingSlot[] = [
  { startsAt: '2026-06-15T09:00:00Z', endsAt: '2026-06-15T09:30:00Z', spotsLeft: 4 },
  { startsAt: '2026-06-15T10:00:00Z', endsAt: '2026-06-15T10:30:00Z', spotsLeft: 2 },
  { startsAt: '2026-06-15T11:00:00Z', endsAt: '2026-06-15T11:30:00Z', spotsLeft: 0 },
];

describe('BookingCalendar (native)', () => {
  it('renders the weekday headers and day cells under both seeds', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const { getByLabelText } = renderThemed(
        <BookingCalendar selectedDate={SELECTED} availability={[{ date: '2026-06-15', count: 3 }]} />,
        seed
      );
      // The selected day is announced with availability + selected state.
      const cell = getByLabelText(/June 15, 2026, available/);
      expect(cell.props.accessibilityState.selected).toBe(true);
    });
  });

  it('highlights availability with a token dot only on days that have openings', () => {
    const { getAllByTestId, getByLabelText } = renderThemed(
      <BookingCalendar
        selectedDate={SELECTED}
        availability={[
          { date: '2026-06-15', count: 3 },
          { date: '2026-06-16', count: 1 },
        ]}
      />,
      SEED_LIGHT
    );
    // Exactly two availability dots for the two days with openings.
    expect(getAllByTestId('xen-calendar-dot')).toHaveLength(2);
    // A day without availability is announced as such.
    expect(getByLabelText(/June 17, 2026, no availability/)).toBeTruthy();
  });

  it('derives availability from raw slots (timezone-bucketed)', () => {
    const { getAllByTestId } = renderThemed(
      <BookingCalendar selectedDate={SELECTED} slots={slots} timezone="UTC" />,
      SEED_LIGHT
    );
    // 2026-06-15 has two bookable slots (the spotsLeft=0 one is excluded), one day → one dot.
    expect(getAllByTestId('xen-calendar-dot')).toHaveLength(1);
  });

  it('fires onSelectDate with the civil date when a day is pressed', () => {
    const onSelectDate = jest.fn();
    const { getByLabelText } = renderThemed(
      <BookingCalendar selectedDate={SELECTED} onSelectDate={onSelectDate} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText(/June 20, 2026/));
    expect(onSelectDate).toHaveBeenCalledTimes(1);
    const arg = onSelectDate.mock.calls[0][0] as Date;
    expect(arg.getFullYear()).toBe(2026);
    expect(arg.getMonth()).toBe(5);
    expect(arg.getDate()).toBe(20);
  });

  it('renders a single week row in week view', () => {
    const { getByLabelText } = renderThemed(
      <BookingCalendar selectedDate={SELECTED} view="week" />,
      SEED_LIGHT
    );
    // The selected day is in the week row and pressable.
    expect(getByLabelText(/June 15, 2026/)).toBeTruthy();
  });
});

describe('SlotPicker (native)', () => {
  it('renders each slot with its time and remaining-spots hint', () => {
    const { getByText } = renderThemed(
      <SlotPicker slots={slots} timeZone="UTC" scrollEnabled={false} />,
      SEED_LIGHT
    );
    expect(getByText('2 left')).toBeTruthy(); // low-stock hint (<= threshold)
    expect(getByText('4 open')).toBeTruthy(); // normal capacity
  });

  it('disables a full slot (spotsLeft === 0) and never fires onPick for it', () => {
    const onPick = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <SlotPicker slots={slots} timeZone="UTC" onPick={onPick} scrollEnabled={false} />,
      SEED_LIGHT
    );
    expect(getByText('Full')).toBeTruthy();
    const fullChip = getByLabelText(/Full$/);
    expect(fullChip.props.accessibilityState.disabled).toBe(true);
    fireEvent.press(fullChip);
    expect(onPick).not.toHaveBeenCalled();
  });

  it('fires onPick with the slot when a bookable chip is pressed', () => {
    const onPick = jest.fn();
    const { getByLabelText } = renderThemed(
      <SlotPicker slots={slots} timeZone="UTC" onPick={onPick} scrollEnabled={false} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText(/4 open$/));
    expect(onPick).toHaveBeenCalledTimes(1);
    expect(onPick.mock.calls[0][0].startsAt).toBe('2026-06-15T09:00:00Z');
  });

  it('marks the selected slot via accessibilityState', () => {
    const { getByLabelText } = renderThemed(
      <SlotPicker
        slots={slots}
        timeZone="UTC"
        selected="2026-06-15T09:00:00Z"
        scrollEnabled={false}
      />,
      SEED_DARK
    );
    expect(getByLabelText(/4 open$/).props.accessibilityState.selected).toBe(true);
  });

  it('respects a custom formatTime', () => {
    const { getAllByText } = renderThemed(
      <SlotPicker slots={slots} formatTime={() => 'CUSTOM'} scrollEnabled={false} />,
      SEED_LIGHT
    );
    // One custom-formatted time label per slot.
    expect(getAllByText('CUSTOM')).toHaveLength(slots.length);
  });
});

describe('BookingSummary (native)', () => {
  it('renders the resource + slot recap', () => {
    const { getByText } = renderThemed(
      <BookingSummary
        resource={{ name: 'Dr. Reed', timezone: 'UTC', slotMinutes: 30 }}
        slot={slots[0]}
      />,
      SEED_LIGHT
    );
    expect(getByText('Your booking')).toBeTruthy();
    expect(getByText('Dr. Reed')).toBeTruthy();
    expect(getByText('30 min')).toBeTruthy();
    expect(getByText('UTC')).toBeTruthy();
  });

  it('shows an empty hint when nothing is selected', () => {
    const { getByText } = renderThemed(<BookingSummary />, SEED_DARK);
    expect(getByText('Nothing selected yet.')).toBeTruthy();
  });

  it('accepts a custom title and a trailing action', () => {
    const { getByText } = renderThemed(
      <BookingSummary
        title="Confirm"
        resource={{ name: 'Studio A' }}
        action={<Text>CTA</Text>}
      />,
      SEED_LIGHT
    );
    expect(getByText('Confirm')).toBeTruthy();
    expect(getByText('CTA')).toBeTruthy();
  });
});

describe('token purity (native booking, both seeds)', () => {
  it('every rendered hex traces to a compiled token', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const { root } = renderThemed(
        <>
          <BookingCalendar
            selectedDate={SELECTED}
            availability={[{ date: '2026-06-15', count: 3 }]}
          />
          <SlotPicker slots={slots} timeZone="UTC" selected={slots[0]} scrollEnabled={false} />
          <BookingSummary resource={{ name: 'Dr. Reed', timezone: 'UTC', slotMinutes: 30 }} slot={slots[0]} />
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
