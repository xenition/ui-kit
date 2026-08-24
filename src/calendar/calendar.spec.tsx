/** @jest-environment jsdom */
/**
 * Web calendar/scheduling suite: render smoke for the scheduling surfaces,
 * token-purity (no hex literal in the rendered markup — colors come only from
 * `--xen-*` utility classes), and the behavioral contracts (day select, prev/
 * next nav, event tap, empty `DayAgenda`, availability selection skipping a
 * disabled slot, and the `EventDetailSheet` edit action + null render).
 */
import { fireEvent, render } from '@testing-library/react';
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

const HEX_LITERAL = /#[0-9a-fA-F]{3,8}\b/;

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

const assertTokenPure = (html: string): void => {
  expect(html).not.toMatch(HEX_LITERAL);
};

describe('MonthView (web)', () => {
  it('renders weekday headers, is token-pure, and fires onSelectDate for a tapped day', () => {
    const onSelectDate = jest.fn();
    const { getByText, getByLabelText, container } = render(
      <MonthView month={MONTH} events={events} today={DAY} onSelectDate={onSelectDate} />
    );
    expect(getByText('Sun')).toBeTruthy(); // weekday header
    // token class present (surface container) and no hex literal anywhere.
    expect(container.querySelector('.bg-surface')).toBeTruthy();
    expect(container.querySelector('.border-border')).toBeTruthy();
    assertTokenPure(container.innerHTML);

    fireEvent.click(getByLabelText('10')); // day cell with no events
    expect(onSelectDate).toHaveBeenCalledTimes(1);
    expect(onSelectDate.mock.calls[0][0].getDate()).toBe(10);
  });
});

describe('DateNavigator (web)', () => {
  it('fires prev/next/today and switches view', () => {
    const onPrev = jest.fn();
    const onNext = jest.fn();
    const onViewChange = jest.fn();
    const { getByText, getByLabelText, container } = render(
      <DateNavigator
        title="August 2026"
        view="month"
        onPrev={onPrev}
        onNext={onNext}
        onToday={jest.fn()}
        onViewChange={onViewChange}
      />
    );
    expect(getByText('August 2026')).toBeTruthy();
    expect(container.querySelector('.text-on-surface')).toBeTruthy();
    fireEvent.click(getByLabelText('Previous'));
    fireEvent.click(getByLabelText('Next'));
    expect(onPrev).toHaveBeenCalledTimes(1);
    expect(onNext).toHaveBeenCalledTimes(1);
    fireEvent.click(getByText('Week'));
    expect(onViewChange).toHaveBeenCalledWith('week');
    assertTokenPure(container.innerHTML);
  });
});

describe('DayAgenda (web)', () => {
  it('renders an explicit EmptyState when there are no events', () => {
    const { getByText, container } = render(
      <DayAgenda day={DAY} events={[]} emptyLabel="Nothing today" />
    );
    expect(getByText('Nothing today')).toBeTruthy();
    expect(container.querySelector('[data-xen-empty-state]')).toBeTruthy();
    assertTokenPure(container.innerHTML);
  });

  it('renders the day events and fires onSelectEvent on tap', () => {
    const onSelectEvent = jest.fn();
    const { getByText, getByLabelText } = render(
      <DayAgenda day={DAY} events={events} now={NOW} onSelectEvent={onSelectEvent} />
    );
    expect(getByText('Standup')).toBeTruthy();
    fireEvent.click(getByLabelText(/Design review/));
    expect(onSelectEvent).toHaveBeenCalledTimes(1);
    expect(onSelectEvent.mock.calls[0][0].id).toBe('e2');
  });
});

describe('EventBlock (web)', () => {
  it('fires onPress and exposes selection via aria-pressed (not color-alone)', () => {
    const onPress = jest.fn();
    const { getByLabelText, container } = render(
      <EventBlock event={events[0]!} selected onPress={onPress} />
    );
    const node = getByLabelText(/Standup/);
    expect(node.getAttribute('aria-pressed')).toBe('true');
    expect(container.querySelector('.bg-primary')).toBeTruthy(); // tone accent bar
    fireEvent.click(node);
    expect(onPress).toHaveBeenCalledWith(events[0]);
    assertTokenPure(container.innerHTML);
  });
});

describe('WeekView (web)', () => {
  it('mounts, taps an event, and stays token-pure', () => {
    const onSelectEvent = jest.fn();
    const { getByLabelText, container } = render(
      <WeekView week={DAY} events={events} today={DAY} onSelectEvent={onSelectEvent} />
    );
    fireEvent.click(getByLabelText(/Standup/));
    expect(onSelectEvent).toHaveBeenCalledTimes(1);
    assertTokenPure(container.innerHTML);
  });
});

describe('MiniCalendar (web)', () => {
  it('pages the month and selects a day', () => {
    const onMonthChange = jest.fn();
    const onSelectDate = jest.fn();
    const { getByLabelText, container } = render(
      <MiniCalendar
        month={MONTH}
        today={DAY}
        marks={[DAY]}
        onMonthChange={onMonthChange}
        onSelectDate={onSelectDate}
      />
    );
    fireEvent.click(getByLabelText('Previous month'));
    expect(onMonthChange.mock.calls[0][0].getMonth()).toBe(6); // July
    fireEvent.click(getByLabelText('August 12'));
    expect(onSelectDate.mock.calls[0][0].getDate()).toBe(12);
    assertTokenPure(container.innerHTML);
  });
});

describe('AvailabilityPicker (web)', () => {
  const slots: AvailabilitySlot[] = [
    { start: new Date(2026, 7, 24, 9, 0) },
    { start: new Date(2026, 7, 24, 10, 0), disabled: true },
    { start: new Date(2026, 7, 24, 11, 0) },
  ];

  it('selects an open slot but never a disabled one', () => {
    const onSelect = jest.fn();
    const { getByLabelText, container } = render(
      <AvailabilityPicker slots={slots} value={slots[0]!.start} onSelect={onSelect} />
    );
    expect(getByLabelText('09:00').getAttribute('aria-checked')).toBe('true');
    fireEvent.click(getByLabelText('11:00'));
    expect(onSelect).toHaveBeenCalledTimes(1);
    fireEvent.click(getByLabelText('10:00')); // disabled button ignores clicks
    expect(onSelect).toHaveBeenCalledTimes(1);
    assertTokenPure(container.innerHTML);
  });

  it('renders an EmptyState with no slots', () => {
    const { getByText } = render(<AvailabilityPicker slots={[]} emptyLabel="Fully booked" />);
    expect(getByText('Fully booked')).toBeTruthy();
  });
});

describe('TimeGrid (web)', () => {
  it('positions events and fires onSelectEvent', () => {
    const onSelectEvent = jest.fn();
    const { getByLabelText, container } = render(
      <TimeGrid day={DAY} events={events} now={NOW} onSelectEvent={onSelectEvent} />
    );
    fireEvent.click(getByLabelText(/Standup/));
    expect(onSelectEvent).toHaveBeenCalledWith(events[0]);
    assertTokenPure(container.innerHTML);
  });
});

describe('EventDetailSheet (web)', () => {
  it('renders event detail and fires Edit', () => {
    const onEdit = jest.fn();
    const { getByText, container } = render(
      <EventDetailSheet
        event={events[1]!}
        description="Quarterly design critique."
        recurrenceLabel="Weekly on Monday"
        onEdit={onEdit}
      />
    );
    expect(getByText('Design review')).toBeTruthy();
    fireEvent.click(getByText('Edit'));
    expect(onEdit).toHaveBeenCalledWith(events[1]);
    assertTokenPure(container.innerHTML);
  });

  it('renders nothing when there is no event', () => {
    const { container } = render(<EventDetailSheet event={null} />);
    expect(container.firstChild).toBeNull();
  });
});

describe('AllDayRow (web)', () => {
  it('shows all-day chips and fires onSelectEvent', () => {
    const onSelectEvent = jest.fn();
    const { getByLabelText } = render(
      <AllDayRow day={DAY} events={events} onSelectEvent={onSelectEvent} />
    );
    fireEvent.click(getByLabelText(/Company offsite/));
    expect(onSelectEvent).toHaveBeenCalledTimes(1);
  });
});

describe('RecurrenceRow (web)', () => {
  it('reports the picked frequency via aria-checked and callback', () => {
    const onChange = jest.fn();
    const { getByLabelText, container } = render(
      <RecurrenceRow value="none" onChange={onChange} />
    );
    expect(getByLabelText('Does not repeat').getAttribute('aria-checked')).toBe('true');
    fireEvent.click(getByLabelText('Weekly'));
    expect(onChange).toHaveBeenCalledWith('weekly');
    assertTokenPure(container.innerHTML);
  });
});

describe('TimezoneRow (web)', () => {
  it('renders the zone label and fires onPress', () => {
    const onPress = jest.fn();
    const { getByText, container } = render(
      <TimezoneRow timezone="America/New_York" offsetLabel="GMT-4 · EDT" onPress={onPress} />
    );
    expect(getByText('New York')).toBeTruthy();
    fireEvent.click(getByText('Time zone'));
    expect(onPress).toHaveBeenCalledTimes(1);
    assertTokenPure(container.innerHTML);
  });
});
