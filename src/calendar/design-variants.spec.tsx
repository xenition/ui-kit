/** @jest-environment jsdom */
/**
 * Alternate calendar designs (v2 / v3) for the web (React DOM) — drop-in redesigns
 * of AvailabilityPicker, DayAgenda, EventBlock, MonthView. Each variant keeps the
 * base props; these specs prove they (a) mount, (b) stay token-pure (no literal hex
 * in inline styles beyond geometric heights), and (c) honor a key interaction/state.
 */
import { fireEvent, render } from '@testing-library/react';
import { AvailabilityPickerV2 } from './AvailabilityPickerV2';
import { AvailabilityPickerV3 } from './AvailabilityPickerV3';
import { DayAgendaV2 } from './DayAgendaV2';
import { DayAgendaV3 } from './DayAgendaV3';
import { EventBlockV2 } from './EventBlockV2';
import { EventBlockV3 } from './EventBlockV3';
import { MonthViewV2 } from './MonthViewV2';
import { MonthViewV3 } from './MonthViewV3';

const inlineStyles = (root: HTMLElement): string =>
  Array.from(root.querySelectorAll<HTMLElement>('[style]'))
    .map((el) => el.getAttribute('style') ?? '')
    .join('\n');
const COLOR_HEX = /(?:color|background|border|fill|stroke)[^;]*#[0-9a-fA-F]{3,8}/;

const DAY = new Date(2026, 7, 25, 0, 0, 0);
const EVENT = { id: 'e1', title: 'Standup', start: new Date(2026, 7, 25, 9, 0), end: new Date(2026, 7, 25, 9, 30), location: 'Room A', tone: 'primary' as const };
const SLOTS = [
  { start: new Date(2026, 7, 25, 9, 0) },
  { start: new Date(2026, 7, 25, 10, 0), disabled: true },
];

describe('EventBlock alternates (web)', () => {
  it('V2 fires onPress', () => {
    const onPress = jest.fn();
    const { getByText, container } = render(<EventBlockV2 event={EVENT} onPress={onPress} />);
    expect(getByText('Standup')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(COLOR_HEX);
    fireEvent.click(getByText('Standup'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
  it('V3 fires onPress', () => {
    const onPress = jest.fn();
    const { getByText, container } = render(<EventBlockV3 event={EVENT} onPress={onPress} />);
    expect(inlineStyles(container)).not.toMatch(COLOR_HEX);
    fireEvent.click(getByText('Standup'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

describe('DayAgenda alternates (web)', () => {
  it('V2 selects an event', () => {
    const onSelectEvent = jest.fn();
    const { getByText, container } = render(<DayAgendaV2 day={DAY} events={[EVENT]} onSelectEvent={onSelectEvent} />);
    expect(inlineStyles(container)).not.toMatch(COLOR_HEX);
    fireEvent.click(getByText('Standup'));
    expect(onSelectEvent).toHaveBeenCalledTimes(1);
  });
  it('V3 selects an event', () => {
    const onSelectEvent = jest.fn();
    const { getByText, container } = render(<DayAgendaV3 day={DAY} events={[EVENT]} onSelectEvent={onSelectEvent} />);
    expect(inlineStyles(container)).not.toMatch(COLOR_HEX);
    fireEvent.click(getByText('Standup'));
    expect(onSelectEvent).toHaveBeenCalledTimes(1);
  });
});

describe('AvailabilityPicker alternates (web)', () => {
  it('V2 selects a slot', () => {
    const onSelect = jest.fn();
    const { getAllByRole, container } = render(<AvailabilityPickerV2 slots={SLOTS} onSelect={onSelect} />);
    expect(inlineStyles(container)).not.toMatch(COLOR_HEX);
    fireEvent.click(getAllByRole('radio')[0]!);
    expect(onSelect).toHaveBeenCalledTimes(1);
  });
  it('V3 selects a slot', () => {
    const onSelect = jest.fn();
    const { getAllByRole, container } = render(<AvailabilityPickerV3 slots={SLOTS} onSelect={onSelect} />);
    expect(inlineStyles(container)).not.toMatch(COLOR_HEX);
    fireEvent.click(getAllByRole('radio')[0]!);
    expect(onSelect).toHaveBeenCalledTimes(1);
  });
});

describe('MonthView alternates (web)', () => {
  it('V2 selects a day', () => {
    const onSelectDate = jest.fn();
    const { getByLabelText, container } = render(<MonthViewV2 month={DAY} events={[EVENT]} today={DAY} onSelectDate={onSelectDate} />);
    expect(inlineStyles(container)).not.toMatch(COLOR_HEX);
    fireEvent.click(getByLabelText(new RegExp(DAY.toDateString())));
    expect(onSelectDate).toHaveBeenCalled();
  });
  it('V3 selects a day', () => {
    const onSelectDate = jest.fn();
    const { getByLabelText, container } = render(<MonthViewV3 month={DAY} events={[EVENT]} today={DAY} onSelectDate={onSelectDate} />);
    expect(inlineStyles(container)).not.toMatch(COLOR_HEX);
    fireEvent.click(getByLabelText(new RegExp(DAY.toDateString())));
    expect(onSelectDate).toHaveBeenCalled();
  });
});
