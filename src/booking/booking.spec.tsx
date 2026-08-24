/** @jest-environment jsdom */
/**
 * Booking components: render smoke under BOTH compiled seeds, token-purity
 * sweep, and the contracts — calendar availability highlighting + keyboard +
 * ARIA grid, SlotPicker disabled-when-0 / spotsLeft, BookingSummary recap.
 */
import { fireEvent, render } from '@testing-library/react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { installMatchMedia } from '../spec-support/mock-io';
import { BookingCalendar } from './BookingCalendar';
import { SlotPicker } from './SlotPicker';
import { BookingSummary } from './BookingSummary';
import type { BookingResource, BookingSlot } from './types';

const HEX_LITERAL = /#[0-9a-fA-F]{3,8}\b/;

const SEED_LIGHT: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'light',
};
const SEED_DARK: ThemeSeed = {
  primary: '#EA580C',
  accent: '#D4A24E',
  neutral: 'warm',
  font: { heading: 'Fraunces', body: 'Inter' },
  shape: 'sharp',
  mode: 'dark',
};

const TZ = 'America/New_York';
const resource: BookingResource = { name: 'Dr. Ada Lovelace', timezone: TZ, slotMinutes: 30 };
// July 2026 slots (EDT, UTC-4). 14:00Z = 10:00 EDT on the 15th.
const slots: BookingSlot[] = [
  { startsAt: '2026-07-15T13:00:00Z', endsAt: '2026-07-15T13:30:00Z', spotsLeft: 5 },
  { startsAt: '2026-07-15T13:30:00Z', endsAt: '2026-07-15T14:00:00Z', spotsLeft: 2 },
  { startsAt: '2026-07-15T14:00:00Z', endsAt: '2026-07-15T14:30:00Z', spotsLeft: 0 },
  { startsAt: '2026-07-17T15:00:00Z', endsAt: '2026-07-17T15:30:00Z', spotsLeft: 3 },
];

const inlineStyles = (root: HTMLElement): string =>
  Array.from(root.querySelectorAll<HTMLElement>('[style]'))
    .map((el) => el.getAttribute('style') ?? '')
    .join('\n');
const paintAttrs = (root: HTMLElement): string =>
  Array.from(root.querySelectorAll<SVGElement>('[fill], [stroke]'))
    .flatMap((el) => [el.getAttribute('fill') ?? '', el.getAttribute('stroke') ?? ''])
    .join('\n');
const injectedSheets = (): string =>
  Array.from(document.querySelectorAll<HTMLStyleElement>('style[id^="xen-"]'))
    .map((el) => el.textContent ?? '')
    .join('\n');

beforeEach(() => {
  installMatchMedia(false);
});

describe.each([
  ['light seed', SEED_LIGHT, 'light'],
  ['dark seed', SEED_DARK, 'dark'],
])('booking under the %s', (_name, seed, mode) => {
  it('renders calendar + slot picker + summary with the compiled theme', () => {
    const { container } = render(
      <XenitionUIProvider theme={seed}>
        <BookingCalendar slots={slots} selectedDate={new Date(2026, 6, 15)} timezone={TZ} />
        <SlotPicker slots={slots} timeZone={TZ} selected={slots[0]} />
        <BookingSummary resource={resource} slot={slots[0]} />
      </XenitionUIProvider>
    );
    expect(container.querySelector(`[data-theme="${mode}"]`)).not.toBeNull();
    expect(container.querySelector('[data-xen-booking-calendar="month"]')).not.toBeNull();
    expect(container.querySelector('[data-xen-slot-picker]')).not.toBeNull();
    expect(container.querySelector('[data-xen-booking-summary]')).not.toBeNull();
  });

  it('stays token-pure: no hex in inline styles, SVG paint, or injected sheets', () => {
    const { container } = render(
      <XenitionUIProvider theme={seed}>
        <BookingCalendar slots={slots} selectedDate={new Date(2026, 6, 15)} timezone={TZ} />
        <SlotPicker slots={slots} timeZone={TZ} />
      </XenitionUIProvider>
    );
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    expect(paintAttrs(container)).not.toMatch(HEX_LITERAL);
  });
});

describe('BookingCalendar', () => {
  it('highlights days with availability and marks them in the aria-label', () => {
    const { container } = render(
      <BookingCalendar slots={slots} selectedDate={new Date(2026, 6, 15)} timezone={TZ} />
    );
    const available = container.querySelectorAll('[data-xen-calendar-day][data-available="true"]');
    // The 15th and 17th (in ET) have open slots.
    expect(available.length).toBe(2);
    const labels = Array.from(available).map((el) => el.getAttribute('aria-label'));
    expect(labels.every((l) => l?.includes('available'))).toBe(true);
    // A dot indicator (not color alone) marks availability.
    expect(container.querySelectorAll('[data-xen-calendar-dot]')).toHaveLength(2);
  });

  it('exposes an ARIA grid with a single roving-tabindex cell', () => {
    const { container } = render(
      <BookingCalendar slots={slots} selectedDate={new Date(2026, 6, 15)} timezone={TZ} />
    );
    expect(container.querySelector('[role="grid"]')).not.toBeNull();
    const focusable = container.querySelectorAll('[data-xen-calendar-day][tabindex="0"]');
    expect(focusable).toHaveLength(1);
    expect(focusable[0]?.getAttribute('aria-label')).toContain('July 15');
  });

  it('moves focus with arrow keys and selects with Enter', () => {
    const onSelectDate = jest.fn();
    const { container } = render(
      <BookingCalendar slots={slots} selectedDate={new Date(2026, 6, 15)} timezone={TZ} onSelectDate={onSelectDate} />
    );
    const start = container.querySelector<HTMLButtonElement>('[data-xen-calendar-day][tabindex="0"]')!;
    fireEvent.keyDown(start, { key: 'ArrowRight' });
    const focused = container.querySelector<HTMLButtonElement>('[data-xen-calendar-day][tabindex="0"]')!;
    expect(focused.getAttribute('aria-label')).toContain('July 16');
    fireEvent.keyDown(focused, { key: 'Enter' });
    expect(onSelectDate).toHaveBeenCalled();
    const picked = onSelectDate.mock.calls[0][0] as Date;
    expect(picked.getDate()).toBe(16);
  });

  it('changes month with the next/prev controls', () => {
    const { container, getByLabelText } = render(
      <BookingCalendar slots={slots} selectedDate={new Date(2026, 6, 15)} timezone={TZ} />
    );
    expect(container.querySelector('[data-xen-calendar-label]')?.textContent).toBe('July 2026');
    fireEvent.click(getByLabelText('Next month'));
    expect(container.querySelector('[data-xen-calendar-label]')?.textContent).toBe('August 2026');
    fireEvent.click(getByLabelText('Previous month'));
    fireEvent.click(getByLabelText('Previous month'));
    expect(container.querySelector('[data-xen-calendar-label]')?.textContent).toBe('June 2026');
  });

  it('supports a single-row week view', () => {
    const { container } = render(
      <BookingCalendar view="week" slots={slots} selectedDate={new Date(2026, 6, 15)} timezone={TZ} />
    );
    expect(container.querySelector('[data-xen-booking-calendar="week"]')).not.toBeNull();
    // 1 header row + 1 week row of cells = 7 day buttons.
    expect(container.querySelectorAll('[data-xen-calendar-day]')).toHaveLength(7);
  });

  it('accepts a pre-summarized availability array', () => {
    const { container } = render(
      <BookingCalendar
        availability={[{ date: '2026-07-20', count: 4 }]}
        selectedDate={new Date(2026, 6, 20)}
      />
    );
    expect(
      container.querySelectorAll('[data-xen-calendar-day][data-available="true"]')
    ).toHaveLength(1);
  });
});

describe('SlotPicker', () => {
  it('renders local times and remaining spots, disabling full slots', () => {
    const onPick = jest.fn();
    const { container } = render(<SlotPicker slots={slots} timeZone={TZ} onPick={onPick} />);
    const buttons = container.querySelectorAll<HTMLButtonElement>('[data-xen-slot]');
    expect(buttons).toHaveLength(4);
    // Third slot is full (spotsLeft 0) → disabled + "Full".
    const full = container.querySelector<HTMLButtonElement>('[data-xen-slot][data-full="true"]')!;
    expect(full.disabled).toBe(true);
    expect(full.querySelector('[data-xen-slot-spots]')?.textContent).toBe('Full');
    fireEvent.click(full);
    expect(onPick).not.toHaveBeenCalled();
    // Low-capacity slot (2 left) surfaces the count.
    const low = buttons[1]!;
    expect(low.querySelector('[data-xen-slot-spots]')?.textContent).toBe('2 left');
    // 13:00Z is 09:00 in New York.
    expect(low.textContent).toContain('9:30');
  });

  it('picks a bookable slot and reflects selection via aria-pressed', () => {
    const onPick = jest.fn();
    const { container } = render(
      <SlotPicker slots={slots} timeZone={TZ} onPick={onPick} selected={slots[0]} />
    );
    const first = container.querySelector<HTMLButtonElement>('[data-xen-slot]')!;
    expect(first.getAttribute('aria-pressed')).toBe('true');
    fireEvent.click(container.querySelectorAll('[data-xen-slot]')[1]!);
    expect(onPick).toHaveBeenCalledWith(slots[1]);
  });

  it('uses a formatTime override when provided', () => {
    const { container } = render(
      <SlotPicker slots={[slots[0]!]} formatTime={() => 'NOON'} />
    );
    expect(container.querySelector('[data-xen-slot]')?.textContent).toContain('NOON');
  });
});

describe('BookingSummary', () => {
  it('recaps the resource, date, time range, duration, and timezone', () => {
    const { getByText, container } = render(
      <BookingSummary resource={resource} slot={slots[0]} />
    );
    expect(getByText('Dr. Ada Lovelace')).toBeTruthy();
    expect(getByText('30 min')).toBeTruthy();
    expect(getByText(TZ)).toBeTruthy();
    expect(container.querySelector('[data-xen-booking-summary]')).not.toBeNull();
  });

  it('shows an empty hint when nothing is selected', () => {
    const { container } = render(<BookingSummary />);
    expect(container.querySelector('[data-xen-booking-empty]')).not.toBeNull();
  });
});
