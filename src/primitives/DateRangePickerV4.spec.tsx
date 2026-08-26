/** @jest-environment jsdom */
import { fireEvent, render, within } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { DateRangePickerV4 } from './DateRangePickerV4';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

function renderThemed(ui: ReactElement, theme: ThemeSeed = SEED) {
  const result = render(<XenitionUIProvider theme={theme}>{ui}</XenitionUIProvider>);
  return { ...result, q: within(result.container) };
}

const LABEL = (d: string): string =>
  new Intl.DateTimeFormat(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(`${d}T12:00:00`));

const RANGE = { start: '2024-03-10', end: '2024-03-16' };

/**
 * A day in the month the picker opens on when it has no value — which is the
 * month containing today, not March 2024.
 */
const THIS_MONTH = (day: number): string => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
};

/** The band behind a day: the absolutely positioned layer, not the disc. */
function bandOf(cell: HTMLElement): HTMLElement | null {
  return cell.querySelector('span.absolute');
}

describe('DateRangePickerV4 (web)', () => {
  it('offers one field with two segments, not two separate pickers', () => {
    const { q } = renderThemed(<DateRangePickerV4 />);
    expect(q.getByLabelText('Start')).toBeTruthy();
    expect(q.getByLabelText('End')).toBeTruthy();
    expect(q.getAllByText('Add date').length).toBe(2);
    // One calendar, not two date inputs.
    expect(q.queryAllByDisplayValue('').length).toBe(0);
  });

  it('wears InputV4 s field treatment', () => {
    const { container } = renderThemed(<DateRangePickerV4 />);
    const field = container.querySelector('[data-xen-v4-field]');
    expect(field?.className).toContain('min-h-[var(--xen-space-2xl)]');
    expect(field?.className).toContain('rounded-[var(--xen-radius-md)]');
  });

  it('fills the days between the ends with a color-mix, never a ramp step', () => {
    const { q } = renderThemed(<DateRangePickerV4 value={RANGE} />);
    fireEvent.click(q.getByLabelText('Start'));
    const band = bandOf(q.getByLabelText(LABEL('2024-03-13')));
    expect(band?.hasAttribute('data-xen-v4-band')).toBe(true);
    expect(band?.className).not.toContain('primary-50');
    // The fill is a stylesheet rule, not an inline style: jsdom and SSR style
    // extractors drop a color-mix() from a style attribute outright.
    const css = document.getElementById('xen-v4-picker-styles')?.textContent ?? '';
    expect(css).toContain('[data-xen-v4-band] { background-color: color-mix(in srgb, var(--xen-primary) 16%, var(--xen-surface)); }');
  });

  it('draws the band half-width under each cap so the span is continuous', () => {
    const { q } = renderThemed(<DateRangePickerV4 value={RANGE} />);
    fireEvent.click(q.getByLabelText('Start'));
    expect(bandOf(q.getByLabelText(LABEL('2024-03-10')))?.style.left).toBe('50%');
    expect(bandOf(q.getByLabelText(LABEL('2024-03-16')))?.style.right).toBe('50%');
    const middle = bandOf(q.getByLabelText(LABEL('2024-03-13')));
    expect(middle?.style.left).toBe('0px');
    expect(middle?.style.right).toBe('0px');
  });

  it('caps both ends with the contrast-checked brand pair', () => {
    const { q } = renderThemed(<DateRangePickerV4 value={RANGE} />);
    fireEvent.click(q.getByLabelText('Start'));
    for (const day of ['2024-03-10', '2024-03-16']) {
      const disc = q.getByLabelText(LABEL(day)).querySelector('span.relative');
      expect(disc?.className).toContain('bg-primary');
      expect(disc?.className).toContain('text-on-primary');
    }
  });

  it('leaves a one-day range as a single disc with no band', () => {
    const { q } = renderThemed(
      <DateRangePickerV4 value={{ start: '2024-03-10', end: '2024-03-10' }} />
    );
    fireEvent.click(q.getByLabelText('Start'));
    expect(bandOf(q.getByLabelText(LABEL('2024-03-10')))).toBeNull();
  });

  it('builds the range start-then-end and can never cross', () => {
    const onChange = jest.fn();
    const { q } = renderThemed(<DateRangePickerV4 onChange={onChange} />);
    fireEvent.click(q.getByLabelText('Start'));
    fireEvent.click(q.getByLabelText(LABEL(THIS_MONTH(10))));
    expect(onChange).toHaveBeenLastCalledWith({ start: THIS_MONTH(10), end: null });
  });

  it('starts a new range rather than refusing a backwards click', () => {
    const onChange = jest.fn();
    const { q } = renderThemed(
      <DateRangePickerV4 value={{ start: '2024-03-10', end: null }} onChange={onChange} />
    );
    fireEvent.click(q.getByLabelText('Start'));
    fireEvent.click(q.getByLabelText(LABEL('2024-03-05')));
    expect(onChange).toHaveBeenLastCalledWith({ start: '2024-03-05', end: null });
  });

  it('says which end the next click sets', () => {
    const { q } = renderThemed(<DateRangePickerV4 startLabel="Check in" endLabel="Check out" />);
    fireEvent.click(q.getByLabelText('Check in'));
    expect(q.getByText('Choose the check in date')).toBeTruthy();
  });

  it('blocks a day outside min/max', () => {
    const { q } = renderThemed(
      <DateRangePickerV4
        value={{ start: '2024-03-12', end: null }}
        min="2024-03-10"
        max="2024-03-20"
      />
    );
    fireEvent.click(q.getByLabelText('Start'));
    expect((q.getByLabelText(LABEL('2024-03-05')) as HTMLButtonElement).disabled).toBe(true);
  });

  it('gives every day the tap-target floor', () => {
    const { q } = renderThemed(<DateRangePickerV4 value={RANGE} />);
    fireEvent.click(q.getByLabelText('Start'));
    const cell = q.getByLabelText(LABEL('2024-03-13'));
    expect(cell.className).toContain('h-[var(--xen-space-2xl)]');
    expect(cell.className).toContain('w-[var(--xen-space-2xl)]');
  });
});
