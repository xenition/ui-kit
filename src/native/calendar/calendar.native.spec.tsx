import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import {
  SEED_LIGHT,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { MonthView } from './MonthView';
import { WeekView } from './WeekView';
import { DayAgenda } from './DayAgenda';
import { EventBlock } from './EventBlock';
import { TimeGrid } from './TimeGrid';
import { AvailabilityPicker } from './AvailabilityPicker';
import { MiniCalendar } from './MiniCalendar';
import { EventDetailSheet } from './EventDetailSheet';
import { DateNavigator } from './DateNavigator';
import { AllDayRow } from './AllDayRow';
import { RecurrenceRow } from './RecurrenceRow';
import { TimezoneRow } from './TimezoneRow';
import type { CalendarEvent, AvailabilitySlot } from './types';

const allowed = tokenHexSet(SEED_LIGHT);
const assertTokenPure = (root: Parameters<typeof renderedStyleHexes>[0]): void =>
  renderedStyleHexes(root).forEach((hex) => expect(allowed.has(hex)).toBe(true));

// Fixed anchor dates — nothing reads the clock.
const MONTH = new Date(2026, 7, 1); // Aug 2026
const DAY = new Date(2026, 7, 24); // Mon Aug 24 2026
const NOW = new Date(2026, 7, 24, 10, 30);

const events: CalendarEvent[] = [
  {
    id: 'e1',
    title: 'Standup',
    start: new Date(2026, 7, 24, 9, 0),
    end: new Date(2026, 7, 24, 9, 30),
    tone: 'primary',
    location: 'Room A',
  },
  {
    id: 'e2',
    title: 'Design review',
    start: new Date(2026, 7, 24, 14, 0),
    end: new Date(2026, 7, 24, 15, 0),
    tone: 'accent',
  },
  { id: 'e3', title: 'Company offsite', start: new Date(2026, 7, 24), allDay: true, tone: 'success' },
];

describe('MonthView (native)', () => {
  it('mounts, fires onSelectDate for a tapped day, and stays token-pure', () => {
    const onSelectDate = jest.fn();
    const { getByText, getByLabelText, root } = renderThemed(
      <MonthView month={MONTH} events={events} today={DAY} onSelectDate={onSelectDate} />,
      SEED_LIGHT
    );
    expect(getByText('Sun')).toBeTruthy(); // weekday header
    fireEvent.press(getByLabelText('10')); // day cell with no events
    expect(onSelectDate).toHaveBeenCalledTimes(1);
    expect(onSelectDate.mock.calls[0][0].getDate()).toBe(10);
    assertTokenPure(root);
  });
});

describe('DateNavigator (native)', () => {
  it('fires prev/next/today and switches view', () => {
    const onPrev = jest.fn();
    const onNext = jest.fn();
    const onViewChange = jest.fn();
    const { getByText, getByLabelText, root } = renderThemed(
      <DateNavigator
        title="August 2026"
        view="month"
        onPrev={onPrev}
        onNext={onNext}
        onToday={jest.fn()}
        onViewChange={onViewChange}
      />,
      SEED_LIGHT
    );
    expect(getByText('August 2026')).toBeTruthy();
    fireEvent.press(getByLabelText('Previous'));
    fireEvent.press(getByLabelText('Next'));
    expect(onPrev).toHaveBeenCalledTimes(1);
    expect(onNext).toHaveBeenCalledTimes(1);
    fireEvent.press(getByText('Week'));
    expect(onViewChange).toHaveBeenCalledWith('week');
    assertTokenPure(root);
  });
});

describe('DayAgenda (native)', () => {
  it('renders an explicit empty state when there are no events', () => {
    const { getByText, root } = renderThemed(
      <DayAgenda day={DAY} events={[]} emptyLabel="Nothing today" />,
      SEED_LIGHT
    );
    expect(getByText('Nothing today')).toBeTruthy();
    assertTokenPure(root);
  });

  it('renders the day events and fires onSelectEvent on tap', () => {
    const onSelectEvent = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <DayAgenda day={DAY} events={events} now={NOW} onSelectEvent={onSelectEvent} />,
      SEED_LIGHT
    );
    expect(getByText('Standup')).toBeTruthy();
    fireEvent.press(getByLabelText(/Design review/));
    expect(onSelectEvent).toHaveBeenCalledTimes(1);
    expect(onSelectEvent.mock.calls[0][0].id).toBe('e2');
  });
});

describe('EventBlock (native)', () => {
  it('fires onPress and exposes selection via a11y (not color-alone)', () => {
    const onPress = jest.fn();
    const { getByLabelText, root } = renderThemed(
      <EventBlock event={events[0]} selected onPress={onPress} />,
      SEED_LIGHT
    );
    const node = getByLabelText(/Standup/);
    expect(node.props.accessibilityState.selected).toBe(true);
    fireEvent.press(node);
    expect(onPress).toHaveBeenCalledWith(events[0]);
    assertTokenPure(root);
  });
});

describe('WeekView (native)', () => {
  it('mounts, taps an event, and stays token-pure', () => {
    const onSelectEvent = jest.fn();
    const { getByLabelText, root } = renderThemed(
      <WeekView week={DAY} events={events} today={DAY} onSelectEvent={onSelectEvent} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText(/Standup/));
    expect(onSelectEvent).toHaveBeenCalledTimes(1);
    assertTokenPure(root);
  });
});

describe('MiniCalendar (native)', () => {
  it('pages the month and selects a day', () => {
    const onMonthChange = jest.fn();
    const onSelectDate = jest.fn();
    const { getByLabelText, root } = renderThemed(
      <MiniCalendar
        month={MONTH}
        today={DAY}
        marks={[DAY]}
        onMonthChange={onMonthChange}
        onSelectDate={onSelectDate}
      />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Previous month'));
    expect(onMonthChange.mock.calls[0][0].getMonth()).toBe(6); // July
    fireEvent.press(getByLabelText('August 12'));
    expect(onSelectDate.mock.calls[0][0].getDate()).toBe(12);
    assertTokenPure(root);
  });
});

describe('AvailabilityPicker (native)', () => {
  const slots: AvailabilitySlot[] = [
    { start: new Date(2026, 7, 24, 9, 0) },
    { start: new Date(2026, 7, 24, 10, 0), disabled: true },
    { start: new Date(2026, 7, 24, 11, 0) },
  ];

  it('selects an open slot but never a disabled one', () => {
    const onSelect = jest.fn();
    const { getByLabelText, root } = renderThemed(
      <AvailabilityPicker slots={slots} value={slots[0].start} onSelect={onSelect} />,
      SEED_LIGHT
    );
    expect(getByLabelText('09:00').props.accessibilityState.selected).toBe(true);
    fireEvent.press(getByLabelText('11:00'));
    expect(onSelect).toHaveBeenCalledTimes(1);
    fireEvent.press(getByLabelText('10:00'));
    expect(onSelect).toHaveBeenCalledTimes(1); // disabled slot ignored
    assertTokenPure(root);
  });

  it('renders an empty state with no slots', () => {
    const { getByText } = renderThemed(
      <AvailabilityPicker slots={[]} emptyLabel="Fully booked" />,
      SEED_LIGHT
    );
    expect(getByText('Fully booked')).toBeTruthy();
  });
});

describe('TimeGrid (native)', () => {
  it('positions events and fires onSelectEvent', () => {
    const onSelectEvent = jest.fn();
    const { getByLabelText, root } = renderThemed(
      <TimeGrid day={DAY} events={events} now={NOW} onSelectEvent={onSelectEvent} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText(/Standup/));
    expect(onSelectEvent).toHaveBeenCalledWith(events[0]);
    assertTokenPure(root);
  });
});

describe('EventDetailSheet (native)', () => {
  it('renders event detail and fires Edit', () => {
    const onEdit = jest.fn();
    const { getByText, root } = renderThemed(
      <EventDetailSheet
        event={events[1]}
        description="Quarterly design critique."
        recurrenceLabel="Weekly on Monday"
        onEdit={onEdit}
      />,
      SEED_LIGHT
    );
    expect(getByText('Design review')).toBeTruthy();
    fireEvent.press(getByText('Edit'));
    expect(onEdit).toHaveBeenCalledWith(events[1]);
    assertTokenPure(root);
  });

  it('renders nothing when there is no event', () => {
    const { toJSON } = renderThemed(<EventDetailSheet event={null} />, SEED_LIGHT);
    expect(toJSON()).toBeNull();
  });
});

describe('AllDayRow (native)', () => {
  it('shows all-day chips for the day', () => {
    const onSelectEvent = jest.fn();
    const { getByLabelText } = renderThemed(
      <AllDayRow day={DAY} events={events} onSelectEvent={onSelectEvent} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText(/Company offsite/));
    expect(onSelectEvent).toHaveBeenCalledTimes(1);
  });
});

describe('RecurrenceRow (native)', () => {
  it('reports the picked frequency via a11y and callback', () => {
    const onChange = jest.fn();
    const { getByLabelText, root } = renderThemed(
      <RecurrenceRow value="none" onChange={onChange} />,
      SEED_LIGHT
    );
    expect(getByLabelText('Does not repeat').props.accessibilityState.selected).toBe(true);
    fireEvent.press(getByLabelText('Weekly'));
    expect(onChange).toHaveBeenCalledWith('weekly');
    assertTokenPure(root);
  });
});

describe('TimezoneRow (native)', () => {
  it('renders the zone label and fires onPress', () => {
    const onPress = jest.fn();
    const { getByText, root } = renderThemed(
      <TimezoneRow timezone="America/New_York" offsetLabel="GMT-4 · EDT" onPress={onPress} />,
      SEED_LIGHT
    );
    expect(getByText('New York')).toBeTruthy();
    fireEvent.press(getByText('Time zone'));
    expect(onPress).toHaveBeenCalledTimes(1);
    assertTokenPure(root);
  });
});
