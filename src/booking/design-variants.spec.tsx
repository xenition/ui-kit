/** @jest-environment jsdom */
/**
 * Alternate booking designs (v2 / v3) for the web (React DOM) — drop-in redesigns
 * of BookingCalendar, BookingSummary, SlotPicker. Each variant keeps the base
 * props; these specs prove they (a) mount, (b) stay token-pure (no literal hex in
 * inline styles), and (c) honor a key interaction/state.
 */
import { fireEvent, render } from '@testing-library/react';
import { BookingCalendarV2 } from './BookingCalendarV2';
import { BookingCalendarV3 } from './BookingCalendarV3';
import { BookingSummaryV2 } from './BookingSummaryV2';
import { BookingSummaryV3 } from './BookingSummaryV3';
import { SlotPickerV2 } from './SlotPickerV2';
import { SlotPickerV3 } from './SlotPickerV3';
import { addDays, toDayKey } from './datetime';

const HEX_LITERAL = /#[0-9a-fA-F]{3,8}\b/;
const inlineStyles = (root: HTMLElement): string =>
  Array.from(root.querySelectorAll<HTMLElement>('[style]'))
    .map((el) => el.getAttribute('style') ?? '')
    .join('\n');

const SLOTS = [
  { startsAt: '2026-08-25T09:00:00Z', endsAt: '2026-08-25T09:30:00Z', spotsLeft: 4 },
  { startsAt: '2026-08-25T10:00:00Z', endsAt: '2026-08-25T10:30:00Z', spotsLeft: 1 },
  { startsAt: '2026-08-25T11:00:00Z', endsAt: '2026-08-25T11:30:00Z', spotsLeft: 0 },
];
const RESOURCE = { name: 'Dr. Ada', timezone: 'UTC' };

describe('BookingCalendar alternates (web)', () => {
  it('V2 selects a day', () => {
    const onSelectDate = jest.fn();
    const selected = new Date(2026, 7, 25);
    const { getByLabelText, container } = render(
      <BookingCalendarV2 availability={[{ date: '2026-08-25', count: 3 }]} selectedDate={selected} onSelectDate={onSelectDate} />
    );
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByLabelText(/Aug 25 2026/));
    expect(onSelectDate).toHaveBeenCalled();
  });
  it('V3 selects an available day', () => {
    const onSelectDate = jest.fn();
    const soon = addDays(new Date(), 3);
    const { getByLabelText, container } = render(
      <BookingCalendarV3 availability={[{ date: toDayKey(soon), count: 2 }]} onSelectDate={onSelectDate} />
    );
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByLabelText(new RegExp(`${soon.toDateString()}`)));
    expect(onSelectDate).toHaveBeenCalled();
  });
});

describe('SlotPicker alternates (web)', () => {
  it('V2 picks a slot', () => {
    const onPick = jest.fn();
    const { getByLabelText, container } = render(<SlotPickerV2 slots={SLOTS} timeZone="UTC" onPick={onPick} />);
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByLabelText(/9:00/));
    expect(onPick).toHaveBeenCalled();
  });
  it('V3 picks a slot', () => {
    const onPick = jest.fn();
    const { getByLabelText, container } = render(<SlotPickerV3 slots={SLOTS} timeZone="UTC" onPick={onPick} />);
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByLabelText(/10:00/));
    expect(onPick).toHaveBeenCalled();
  });
});

describe('BookingSummary alternates (web)', () => {
  it('V2 renders the review + action', () => {
    const { getByText, container } = render(<BookingSummaryV2 resource={RESOURCE} slot={SLOTS[0]} timeZone="UTC" action={<button type="button">Confirm</button>} />);
    expect(getByText('Dr. Ada')).toBeTruthy();
    expect(getByText('Confirm')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
  it('V3 renders a compact line', () => {
    const { getByText, container } = render(<BookingSummaryV3 resource={RESOURCE} slot={SLOTS[0]} timeZone="UTC" />);
    expect(getByText(/Dr. Ada/)).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
});
