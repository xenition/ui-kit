import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_BOTH, SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { mixToken } from '../../primitives/internal/v4-depth';
import { DateRangePickerV4 } from './DateRangePickerV4';

const THEME = compileTheme(SEED_LIGHT);
const TARGET = THEME.spacing['2xl'];

function styles(root: ReactTestInstance): Record<string, unknown>[] {
  const out: Record<string, unknown>[] = [];
  const walk = (style: unknown): void => {
    if (!style) return;
    if (Array.isArray(style)) {
      style.forEach(walk);
      return;
    }
    if (typeof style === 'object') out.push(style as Record<string, unknown>);
  };
  root.findAll(() => true).forEach((node) => walk(node.props?.style));
  return out;
}

const LABEL = (d: string): string =>
  new Intl.DateTimeFormat('en-US', {
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
  const mo = String(now.getMonth() + 1).padStart(2, '0');
  return `${now.getFullYear()}-${mo}-${String(day).padStart(2, '0')}`;
};

/** The band behind a day: the full-bleed layer, not the disc. */
function bandOf(cell: ReactTestInstance): Record<string, unknown> | undefined {
  return styles(cell).find((s) => s.position === 'absolute');
}

describe('DateRangePickerV4 (native)', () => {
  it('offers one field with two segments, not two separate pickers', () => {
    const { getAllByText, getByLabelText } = renderThemed(
      <DateRangePickerV4 locale="en-US" />,
      SEED_LIGHT
    );
    expect(getByLabelText('Start')).toBeTruthy();
    expect(getByLabelText('End')).toBeTruthy();
    // Both ends read "Add date" until they are chosen.
    expect(getAllByText('Add date').length).toBe(2);
  });

  it('wears InputV4 s field treatment', () => {
    const { root } = renderThemed(<DateRangePickerV4 locale="en-US" />, SEED_LIGHT);
    const field = styles(root).find((s) => s.borderWidth === 1 && s.minHeight === TARGET);
    expect(field?.borderRadius).toBe(THEME.radius.md);
    expect(field?.paddingHorizontal).toBe(THEME.spacing.md);
  });

  it('fills the days between the ends with an opaque mix, never a ramp step', () => {
    const { getByLabelText } = renderThemed(
      <DateRangePickerV4 value={RANGE} locale="en-US" />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Start'));
    const middle = bandOf(getByLabelText(LABEL('2024-03-13')));
    expect(middle?.backgroundColor).toBe(
      mixToken(THEME.light.surface, THEME.light.primary, 0.16)
    );
    // A ramp step would be the same colour in both schemes; this is not one.
    expect(middle?.backgroundColor).not.toBe(THEME.ramps.primary[50]);
  });

  it('re-derives the band per scheme, so a dark range is not a white hole', () => {
    const theme = compileTheme(SEED_BOTH);
    const read = (scheme: 'light' | 'dark'): unknown => {
      const { getByLabelText } = renderThemed(
        <DateRangePickerV4 value={RANGE} locale="en-US" />,
        SEED_BOTH,
        scheme
      );
      fireEvent.press(getByLabelText('Start'));
      return bandOf(getByLabelText(LABEL('2024-03-13')))?.backgroundColor;
    };
    expect(read('light')).toBe(mixToken(theme.light.surface, theme.light.primary, 0.16));
    expect(read('dark')).toBe(mixToken(theme.dark.surface, theme.dark.primary, 0.16));
    expect(read('light')).not.toBe(read('dark'));
  });

  it('draws the band half-width under each cap so the span is continuous', () => {
    const { getByLabelText } = renderThemed(
      <DateRangePickerV4 value={RANGE} locale="en-US" />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Start'));
    expect(bandOf(getByLabelText(LABEL('2024-03-10')))).toMatchObject({ left: '50%', right: 0 });
    expect(bandOf(getByLabelText(LABEL('2024-03-16')))).toMatchObject({ left: 0, right: '50%' });
    expect(bandOf(getByLabelText(LABEL('2024-03-13')))).toMatchObject({ left: 0, right: 0 });
  });

  it('caps both ends with the contrast-checked brand pair', () => {
    const { getByLabelText } = renderThemed(
      <DateRangePickerV4 value={RANGE} locale="en-US" />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Start'));
    for (const day of ['2024-03-10', '2024-03-16']) {
      const disc = styles(getByLabelText(LABEL(day))).find(
        (s) => s.borderRadius === THEME.radius.full
      );
      expect(disc?.backgroundColor).toBe(THEME.light.primary);
    }
  });

  it('leaves a one-day range as a single disc with no band', () => {
    const { getByLabelText } = renderThemed(
      <DateRangePickerV4 value={{ start: '2024-03-10', end: '2024-03-10' }} locale="en-US" />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Start'));
    expect(bandOf(getByLabelText(LABEL('2024-03-10')))).toBeUndefined();
  });

  it('builds the range start-then-end and can never cross', () => {
    const onChange = jest.fn();
    const { getByLabelText } = renderThemed(
      <DateRangePickerV4 onChange={onChange} locale="en-US" />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Start'));
    fireEvent.press(getByLabelText(LABEL(THIS_MONTH(10))));
    expect(onChange).toHaveBeenLastCalledWith({ start: THIS_MONTH(10), end: null });
  });

  it('starts a new range rather than refusing a backwards tap', () => {
    const onChange = jest.fn();
    const { getByLabelText } = renderThemed(
      <DateRangePickerV4
        value={{ start: '2024-03-10', end: null }}
        onChange={onChange}
        locale="en-US"
      />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Start'));
    fireEvent.press(getByLabelText(LABEL('2024-03-05')));
    expect(onChange).toHaveBeenLastCalledWith({ start: '2024-03-05', end: null });
  });

  it('says which end the next tap sets', () => {
    const { getByLabelText, getByText } = renderThemed(
      <DateRangePickerV4 startLabel="Check in" endLabel="Check out" locale="en-US" />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Check in'));
    expect(getByText('Choose the check in date')).toBeTruthy();
  });

  it('blocks a day outside min/max', () => {
    const { getByLabelText } = renderThemed(
      <DateRangePickerV4
        value={{ start: '2024-03-12', end: null }}
        min="2024-03-10"
        max="2024-03-20"
        locale="en-US"
      />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Start'));
    expect(getByLabelText(LABEL('2024-03-05')).props.accessibilityState).toMatchObject({
      disabled: true,
    });
  });

  it('scrims with black from the elevation token, never with onSurface', () => {
    const { getByLabelText, UNSAFE_root } = renderThemed(
      <DateRangePickerV4 locale="en-US" />,
      SEED_BOTH,
      'dark'
    );
    fireEvent.press(getByLabelText('Start'));
    const scrim = styles(UNSAFE_root).find(
      (s) => s.position === 'absolute' && s.top === 0 && s.bottom === 0
    );
    expect(scrim?.backgroundColor).toContain('rgba(0, 0, 0');
  });
});
