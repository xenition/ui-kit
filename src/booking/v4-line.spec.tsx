/** @jest-environment jsdom */
/**
 * The **V4 booking line** (web) — the twin of
 * `native/booking/v4-line.native.spec.tsx`, asserting the same things against
 * the same prop names, plus the keyboard model that only exists here.
 */
import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { BookingCalendarV4 } from './BookingCalendarV4';
import { SlotPickerV4 } from './SlotPickerV4';
import { BookingSummaryV4 } from './BookingSummaryV4';
import type { BookingSlot } from './types';

const SLOTS: BookingSlot[] = [
  { startsAt: '2026-09-01T09:00:00Z', endsAt: '2026-09-01T09:30:00Z', spotsLeft: 8 },
  { startsAt: '2026-09-01T14:00:00Z', endsAt: '2026-09-01T14:30:00Z', spotsLeft: 2 },
  { startsAt: '2026-09-01T19:00:00Z', endsAt: '2026-09-01T19:30:00Z', spotsLeft: 0 },
];

describe('BookingCalendarV4', () => {
  it('moves a week at a time in the week view, and says so', () => {
    const { getByLabelText } = render(
      <BookingCalendarV4 view="week" selectedDate={new Date('2026-09-01T12:00:00Z')} />
    );
    expect(getByLabelText('Previous week')).toBeTruthy();
    expect(getByLabelText('Next week')).toBeTruthy();
  });

  it('actually changes the visible week when the chevron is clicked', () => {
    // The regression this pass exists for: the base moved `viewDate` by a
    // month while the week row read `selectedDate`, so nothing moved.
    const { container, getByLabelText } = render(
      <BookingCalendarV4 view="week" selectedDate={new Date('2026-09-01T12:00:00Z')} />
    );
    const days = (): string[] =>
      Array.from(container.querySelectorAll('[data-xen-calendar-day]')).map(
        (el) => el.textContent ?? ''
      );
    const before = days();
    fireEvent.click(getByLabelText('Next week'));
    expect(days()).not.toEqual(before);
  });

  it('keeps the roving-tabindex keyboard model', () => {
    const { container } = render(<BookingCalendarV4 selectedDate={new Date('2026-09-15T12:00:00Z')} />);
    const cells = Array.from(
      container.querySelectorAll<HTMLButtonElement>('[data-xen-calendar-day]')
    );
    // Exactly one tab stop for the whole grid.
    expect(cells.filter((c) => c.tabIndex === 0)).toHaveLength(1);
  });

  it('marks today, and can be told not to', () => {
    const marked = render(<BookingCalendarV4 selectedDate={new Date()} />);
    expect(marked.container.querySelectorAll('[data-today="true"]').length).toBeGreaterThan(0);
    marked.unmount();

    const plain = render(<BookingCalendarV4 markToday={false} selectedDate={new Date()} />);
    expect(plain.container.querySelectorAll('[data-today="true"]')).toHaveLength(0);
  });
});

describe('SlotPickerV4', () => {
  it('groups a day into morning, afternoon and evening', () => {
    const { getByText } = render(<SlotPickerV4 slots={SLOTS} timeZone="UTC" />);
    ['Morning', 'Afternoon', 'Evening'].forEach((h) => expect(getByText(h)).toBeTruthy());
  });

  it('drops the headings when grouping is off', () => {
    const { queryByText } = render(<SlotPickerV4 slots={SLOTS} timeZone="UTC" grouped={false} />);
    expect(queryByText('Morning')).toBeNull();
  });

  it('lets the host write the spots hint', () => {
    const { getByText } = render(
      <SlotPickerV4 slots={[SLOTS[0]!]} timeZone="UTC" formatSpots={(n) => `noch ${n} frei`} />
    );
    expect(getByText('noch 8 frei')).toBeTruthy();
  });

  it('disables a full slot rather than only dimming it', () => {
    const onPick = jest.fn();
    const { getByText } = render(
      <SlotPickerV4 slots={[SLOTS[2]!]} timeZone="UTC" onPick={onPick} />
    );
    const button = getByText('Full').closest('button')!;
    expect(button.disabled).toBe(true);
    fireEvent.click(button);
    expect(onPick).not.toHaveBeenCalled();
  });

  it('shows the empty message rather than a blank grid', () => {
    const { getByText } = render(<SlotPickerV4 slots={[]} emptyMessage="Nothing free." />);
    expect(getByText('Nothing free.')).toBeTruthy();
  });
});

describe('BookingSummaryV4', () => {
  it('shows the price, which the base could not', () => {
    const { getByText } = render(
      <BookingSummaryV4
        resource={{ name: 'Dr Ada' }}
        price="$48.00"
        priceNote="Charged at the appointment"
      />
    );
    expect(getByText('Total')).toBeTruthy();
    expect(getByText('$48.00')).toBeTruthy();
    expect(getByText('Charged at the appointment')).toBeTruthy();
  });

  it('lets the host relabel every row', () => {
    const { getByText, queryByText } = render(
      <BookingSummaryV4
        resource={{ name: 'Dr Ada' }}
        labels={{ resource: 'Mit', price: 'Summe' }}
        price="48,00 €"
      />
    );
    expect(getByText('Mit')).toBeTruthy();
    expect(getByText('Summe')).toBeTruthy();
    expect(queryByText('With')).toBeNull();
  });

  it('says nothing is selected rather than rendering an empty card', () => {
    const { getByText } = render(<BookingSummaryV4 />);
    expect(getByText('Nothing selected yet.')).toBeTruthy();
  });
});
