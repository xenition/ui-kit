/**
 * The **V4 calendar line** (native) — the shared layout pass, the localised
 * names, and the finding this module exists for: `TimeGrid` gave overlapping
 * events inconsistent widths.
 */
import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import {
  DEFAULT_EVENT_MINUTES,
  hourTitle,
  layoutEvents,
  monthTitle,
  weekdayNames,
} from '../../calendar/layout-v4';
import { AllDayRowV4 } from './AllDayRowV4';
import { AvailabilityPickerV4 } from './AvailabilityPickerV4';
import { DateNavigatorV4 } from './DateNavigatorV4';
import { DayAgendaV4 } from './DayAgendaV4';
import { EventBlockV4 } from './EventBlockV4';
import { EventDetailSheetV4 } from './EventDetailSheetV4';
import { MiniCalendarV4 } from './MiniCalendarV4';
import { MonthViewV4 } from './MonthViewV4';
import { RecurrenceRowV4 } from './RecurrenceRowV4';
import { TimeGridV4 } from './TimeGridV4';
import { TimezoneRowV4 } from './TimezoneRowV4';
import { WeekViewV4 } from './WeekViewV4';

describe('layoutEvents', () => {
  const at = (h: number, m = 0) => new Date(2026, 0, 5, h, m);

  it('gives every event in one overlap cluster the same column count', () => {
    // §2.1. The base counted each event's own overlaps, so A (overlapping two)
    // was drawn a third of the width while C (overlapping one) took a half —
    // three events, three different widths, and a gap where none belongs.
    const laid = layoutEvents([
      { id: 'a', title: 'A', start: at(9), end: at(11) },
      { id: 'b', title: 'B', start: at(9, 30), end: at(10) },
      { id: 'c', title: 'C', start: at(10, 30), end: at(11, 30) },
    ]);

    expect(laid).toHaveLength(3);
    // One cluster: a overlaps b, a overlaps c — so all three share a count.
    expect(laid.map((e) => e.columns)).toEqual([2, 2, 2]);
    // ...and b and c re-use the same column, because b has ended by 10:30.
    expect(laid.map((e) => e.column)).toEqual([0, 1, 1]);
  });

  it('starts a new cluster once the previous one has closed', () => {
    const laid = layoutEvents([
      { id: 'a', title: 'A', start: at(9), end: at(10) },
      { id: 'b', title: 'B', start: at(9, 30), end: at(10) },
      { id: 'c', title: 'C', start: at(11), end: at(12) },
    ]);

    expect(laid.map((e) => e.columns)).toEqual([2, 2, 1]);
    expect(laid[2]?.column).toBe(0);
  });

  it('gives a point event a default length instead of zero height', () => {
    const [only] = layoutEvents([{ id: 'a', title: 'A', start: at(9) }]);
    expect(only?.endMin).toBe((only?.startMin ?? 0) + DEFAULT_EVENT_MINUTES);
  });

  it('keeps a zero-length event visible rather than collapsing it', () => {
    // A bad payload — end at or before start — still needs a positive height,
    // or the event vanishes with nothing saying so.
    const [only] = layoutEvents([{ id: 'a', title: 'A', start: at(9), end: at(8) }]);
    expect((only?.endMin ?? 0) > (only?.startMin ?? 0)).toBe(true);
  });
});

describe('weekdayNames / monthTitle / hourTitle', () => {
  it('rotates to the requested first day', () => {
    const sunday = weekdayNames(0, { locale: 'en-US', width: 'short' });
    const monday = weekdayNames(1, { locale: 'en-US', width: 'short' });
    expect(monday[0]).toBe(sunday[1]);
    expect(monday).toHaveLength(7);
  });

  it('speaks the locale it is given', () => {
    // §2.2. The base held two English arrays inline, so a French app drew
    // 'Mon' under a French month.
    const fr = weekdayNames(1, { locale: 'fr-FR', width: 'short' });
    expect(fr[0]?.toLowerCase()).toContain('lun');
    expect(monthTitle(new Date(2026, 0, 5), { locale: 'fr-FR' }).toLowerCase()).toContain('janvier');
  });

  it('formats an hour through the locale clock', () => {
    expect(hourTitle(13, 'en-US')).toMatch(/1/);
    expect(hourTitle(13, 'en-GB')).toMatch(/13/);
  });
});

const EVENT = {
  id: 'e1',
  title: 'Design review',
  start: new Date(2026, 0, 5, 9, 0),
  end: new Date(2026, 0, 5, 10, 0),
};

describe('EventBlockV4', () => {
  it('selects through a real button', () => {
    const onPress = jest.fn();
    const { getByLabelText } = renderThemed(
      <EventBlockV4 event={EVENT} onPress={onPress} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText(/Design review/));
    expect(onPress).toHaveBeenCalledWith(EVENT);
  });
});

describe('TimeGridV4', () => {
  it('says so when the day is empty, rather than drawing bare hour rules', () => {
    const { getByText } = renderThemed(
      <TimeGridV4 day={new Date(2026, 0, 5)} events={[]} emptyLabel="Nothing scheduled." />,
      SEED_LIGHT
    );
    expect(getByText('Nothing scheduled.')).toBeTruthy();
  });

  it('names the now line', () => {
    // §2.3. The base drew an unnamed red hairline — the one moving element on
    // the screen, and the only one a reader could not find.
    const { getByLabelText } = renderThemed(
      <TimeGridV4
        day={new Date(2026, 0, 5)}
        events={[EVENT]}
        now={new Date(2026, 0, 5, 9, 30)}
        nowLabel="Current time"
      />,
      SEED_LIGHT
    );
    expect(getByLabelText('Current time')).toBeTruthy();
  });
});

describe('DayAgendaV4 / AllDayRowV4 / MonthViewV4', () => {
  it('renders an empty agenda as a sentence', () => {
    const { getByText } = renderThemed(
      <DayAgendaV4 day={new Date(2026, 0, 5)} events={[]} emptyLabel="No events today." />,
      SEED_LIGHT
    );
    expect(getByText('No events today.')).toBeTruthy();
  });

  it('hides the all-day row when it is empty and asked to', () => {
    const { toJSON } = renderThemed(<AllDayRowV4 day={new Date(2026, 0, 5)} events={[]} hideWhenEmpty />, SEED_LIGHT);
    expect(toJSON()).toBeNull();
  });

  it('draws a month grid the reader can walk', () => {
    const { getAllByLabelText } = renderThemed(
      <MonthViewV4 month={new Date(2026, 0, 1)} events={[EVENT]} locale="en-US" />,
      SEED_LIGHT
    );
    expect(getAllByLabelText(/January 5/).length).toBeGreaterThan(0);
  });
});

describe('DateNavigatorV4 / MiniCalendarV4', () => {
  it('pages with named controls', () => {
    const onPrev = jest.fn();
    const onNext = jest.fn();
    const { getByLabelText } = renderThemed(
      <DateNavigatorV4
        title="January 2026"
        onPrev={onPrev}
        onNext={onNext}
        previousLabel="Previous week"
        nextLabel="Next week"
      />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Previous week'));
    fireEvent.press(getByLabelText('Next week'));
    expect(onPrev).toHaveBeenCalled();
    expect(onNext).toHaveBeenCalled();
  });

  it('selects a day from the mini calendar', () => {
    const onSelectDate = jest.fn();
    const { getByLabelText } = renderThemed(
      <MiniCalendarV4
        month={new Date(2026, 0, 1)}
        onSelectDate={onSelectDate}
        locale="en-US"
      />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText(/January 5/));
    expect(onSelectDate).toHaveBeenCalled();
  });
});

describe('AvailabilityPickerV4 / RecurrenceRowV4 / TimezoneRowV4 / EventDetailSheetV4', () => {
  it('will not book an unavailable slot', () => {
    const onSelect = jest.fn();
    const { getByLabelText } = renderThemed(
      <AvailabilityPickerV4
        slots={[{ start: new Date(2026, 0, 5, 9, 0), disabled: true }]}
        onSelect={onSelect}
        locale="en-US"
        unavailableLabel="Unavailable"
      />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText(/Unavailable/));
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('changes recurrence through a named control', () => {
    const onChange = jest.fn();
    const { getByText } = renderThemed(
      <RecurrenceRowV4 variant="inline" label="Repeats" value="daily" onChange={onChange} />,
      SEED_LIGHT
    );
    fireEvent.press(getByText('Weekly'));
    expect(onChange).toHaveBeenCalledWith('weekly');
  });

  it('names the summary row with the frequency it is showing', () => {
    const { getByLabelText } = renderThemed(
      <RecurrenceRowV4 value="weekly" label="Repeats" />,
      SEED_LIGHT
    );
    expect(getByLabelText('Repeats, Weekly')).toBeTruthy();
  });

  it('renders a timezone row', () => {
    const { getByLabelText } = renderThemed(
      <TimezoneRowV4 timezone="Europe/Berlin" title="Time zone" />,
      SEED_LIGHT
    );
    expect(getByLabelText(/Europe\/Berlin/)).toBeTruthy();
  });

  it('offers edit and delete with names', () => {
    const onDelete = jest.fn();
    const { getByLabelText } = renderThemed(
      <EventDetailSheetV4 event={EVENT} open onDelete={onDelete} deleteLabel="Delete event" />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText(/Delete event/));
    expect(onDelete).toHaveBeenCalledWith(EVENT);
  });
});

describe('WeekViewV4', () => {
  it('selects a day from the week header', () => {
    const onSelectDate = jest.fn();
    const { getByLabelText } = renderThemed(
      <WeekViewV4
        week={new Date(2026, 0, 5)}
        events={[EVENT]}
        onSelectDate={onSelectDate}
        locale="en-US"
      />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText(/January 5/));
    expect(onSelectDate).toHaveBeenCalled();
  });
});
