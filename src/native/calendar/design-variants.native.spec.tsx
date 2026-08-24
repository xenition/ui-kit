/**
 * Alternate calendar designs (v2 / v3) — the drop-in redesigns of the four
 * most-used native scheduling blocks (MonthView, DayAgenda, EventBlock,
 * AvailabilityPicker). Each variant keeps its base component's exact props, so
 * these specs prove they (a) mount (including DayAgenda's empty state), (b) stay
 * token-pure under BOTH seeds (no hardcoded hex — every color traces to a
 * compiled token), and (c) remain interactive where the base was (day / slot
 * selection).
 */
import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import {
  SEED_LIGHT,
  SEED_DARK,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { MonthViewV2 } from './MonthViewV2';
import { MonthViewV3 } from './MonthViewV3';
import { DayAgendaV2 } from './DayAgendaV2';
import { DayAgendaV3 } from './DayAgendaV3';
import { EventBlockV2 } from './EventBlockV2';
import { EventBlockV3 } from './EventBlockV3';
import { AvailabilityPickerV2 } from './AvailabilityPickerV2';
import { AvailabilityPickerV3 } from './AvailabilityPickerV3';
import type { CalendarEvent, AvailabilitySlot } from './types';

// Fixed anchor dates — nothing reads the clock.
const MONTH = new Date(2026, 7, 1); // Aug 2026
const DAY = new Date(2026, 7, 24); // Mon Aug 24 2026
const NOW = new Date(2026, 7, 24, 10, 30);

const events: CalendarEvent[] = [
  { id: 'e1', title: 'Standup', start: new Date(2026, 7, 24, 9, 0), end: new Date(2026, 7, 24, 9, 30), tone: 'primary', location: 'Room A' },
  { id: 'e2', title: 'Design review', start: new Date(2026, 7, 24, 14, 0), end: new Date(2026, 7, 24, 15, 0), tone: 'accent' },
  { id: 'e3', title: 'Company offsite', start: new Date(2026, 7, 24), allDay: true, tone: 'success' },
];

const slots: AvailabilitySlot[] = [
  { start: new Date(2026, 7, 24, 9, 0) }, // Morning
  { start: new Date(2026, 7, 24, 10, 0), disabled: true }, // Morning, blocked
  { start: new Date(2026, 7, 24, 14, 0) }, // Afternoon
  { start: new Date(2026, 7, 24, 18, 0) }, // Evening
];

describe('MonthView alternates (native)', () => {
  it('V2 mounts an elevated grid and fires onSelectDate for a tapped day', () => {
    const onSelectDate = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <MonthViewV2 month={MONTH} events={events} today={DAY} onSelectDate={onSelectDate} />,
      SEED_LIGHT
    );
    expect(getByText('Sun')).toBeTruthy();
    fireEvent.press(getByLabelText('10')); // empty day cell
    expect(onSelectDate).toHaveBeenCalledTimes(1);
    expect(onSelectDate.mock.calls[0][0].getDate()).toBe(10);
  });

  it('V3 mounts a compact grid with an agenda preview and selects a day', () => {
    const onSelectDate = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <MonthViewV3 month={MONTH} events={events} selected={DAY} today={DAY} onSelectDate={onSelectDate} />,
      SEED_DARK
    );
    expect(getByText('Standup')).toBeTruthy(); // agenda preview row for selected day
    fireEvent.press(getByLabelText(/^12/));
    expect(onSelectDate).toHaveBeenCalledTimes(1);
    expect(onSelectDate.mock.calls[0][0].getDate()).toBe(12);
  });
});

describe('DayAgenda alternates (native)', () => {
  it('V2 renders a timeline and fires onSelectEvent on tap', () => {
    const onSelectEvent = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <DayAgendaV2 day={DAY} events={events} now={NOW} onSelectEvent={onSelectEvent} />,
      SEED_LIGHT
    );
    expect(getByText('Standup')).toBeTruthy();
    fireEvent.press(getByLabelText(/Design review/));
    expect(onSelectEvent).toHaveBeenCalledTimes(1);
    expect(onSelectEvent.mock.calls[0][0].id).toBe('e2');
  });

  it('V2 renders an explicit empty state when there are no events', () => {
    const { getByText } = renderThemed(
      <DayAgendaV2 day={DAY} events={[]} emptyLabel="Nothing today" />,
      SEED_DARK
    );
    expect(getByText('Nothing today')).toBeTruthy();
  });

  it('V3 renders a minimal list and fires onSelectEvent on tap', () => {
    const onSelectEvent = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <DayAgendaV3 day={DAY} events={events} now={NOW} onSelectEvent={onSelectEvent} />,
      SEED_DARK
    );
    expect(getByText('Standup')).toBeTruthy();
    fireEvent.press(getByLabelText(/Design review/));
    expect(onSelectEvent).toHaveBeenCalledTimes(1);
  });

  it('V3 renders an explicit empty state when there are no events', () => {
    const { getByText } = renderThemed(
      <DayAgendaV3 day={DAY} events={[]} emptyLabel="All clear" />,
      SEED_LIGHT
    );
    expect(getByText('All clear')).toBeTruthy();
  });
});

describe('EventBlock alternates (native)', () => {
  it('V2 fires onPress and exposes selection via a11y (not color-alone)', () => {
    const onPress = jest.fn();
    const { getByLabelText } = renderThemed(
      <EventBlockV2 event={events[0]} selected onPress={onPress} />,
      SEED_LIGHT
    );
    const node = getByLabelText(/Standup/);
    expect(node.props.accessibilityState.selected).toBe(true);
    fireEvent.press(node);
    expect(onPress).toHaveBeenCalledWith(events[0]);
  });

  it('V3 fires onPress and exposes selection via a11y', () => {
    const onPress = jest.fn();
    const { getByLabelText } = renderThemed(
      <EventBlockV3 event={events[1]} selected onPress={onPress} />,
      SEED_DARK
    );
    const node = getByLabelText(/Design review/);
    expect(node.props.accessibilityState.selected).toBe(true);
    fireEvent.press(node);
    expect(onPress).toHaveBeenCalledWith(events[1]);
  });
});

describe('AvailabilityPicker alternates (native)', () => {
  it('V2 groups by part of day, selects an open slot, ignores a blocked one', () => {
    const onSelect = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <AvailabilityPickerV2 slots={slots} value={slots[0].start} onSelect={onSelect} />,
      SEED_LIGHT
    );
    expect(getByText('Morning')).toBeTruthy();
    expect(getByText('Afternoon')).toBeTruthy();
    expect(getByText('Evening')).toBeTruthy();
    expect(getByLabelText('09:00').props.accessibilityState.selected).toBe(true);
    fireEvent.press(getByLabelText('14:00'));
    expect(onSelect).toHaveBeenCalledTimes(1);
    fireEvent.press(getByLabelText('10:00')); // disabled
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it('V3 renders vertical rows, selects an open slot, ignores a blocked one', () => {
    const onSelect = jest.fn();
    const { getByLabelText, getByText } = renderThemed(
      <AvailabilityPickerV3 slots={slots} value={slots[2].start} onSelect={onSelect} />,
      SEED_DARK
    );
    expect(getByLabelText('14:00').props.accessibilityState.selected).toBe(true);
    expect(getByText('Booked')).toBeTruthy(); // the blocked 10:00 row
    fireEvent.press(getByLabelText('18:00'));
    expect(onSelect).toHaveBeenCalledTimes(1);
    fireEvent.press(getByLabelText('10:00')); // disabled
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it('V2 + V3 render an empty state with no slots', () => {
    const v2 = renderThemed(<AvailabilityPickerV2 slots={[]} emptyLabel="Fully booked" />, SEED_LIGHT);
    expect(v2.getByText('Fully booked')).toBeTruthy();
    const v3 = renderThemed(<AvailabilityPickerV3 slots={[]} emptyLabel="Fully booked" />, SEED_DARK);
    expect(v3.getByText('Fully booked')).toBeTruthy();
  });
});

describe('token purity — calendar alternates (both seeds)', () => {
  it('every rendered style hex traces to a compiled token', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const { root } = renderThemed(
        <>
          <MonthViewV2 month={MONTH} events={events} selected={DAY} today={DAY} onSelectDate={() => {}} />
          <MonthViewV3 month={MONTH} events={events} selected={DAY} today={DAY} onSelectDate={() => {}} />
          <DayAgendaV2 day={DAY} events={events} now={NOW} selectedEventId="e1" onSelectEvent={() => {}} />
          <DayAgendaV3 day={DAY} events={events} now={NOW} selectedEventId="e2" onSelectEvent={() => {}} />
          <DayAgendaV2 day={DAY} events={[]} />
          <DayAgendaV2 day={DAY} loading />
          <DayAgendaV3 day={DAY} loading />
          <EventBlockV2 event={events[0]} selected onPress={() => {}} />
          <EventBlockV3 event={events[1]} onPress={() => {}} />
          <AvailabilityPickerV2 slots={slots} value={slots[0].start} onSelect={() => {}} />
          <AvailabilityPickerV3 slots={slots} value={slots[2].start} multiple onSelect={() => {}} />
          <AvailabilityPickerV2 loading />
          <AvailabilityPickerV3 loading />
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
