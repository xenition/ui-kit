import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_BOTH, SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { hexToRgb } from './internal/color';
import { DatePickerV4 } from './DatePickerV4';

const THEME = compileTheme(SEED_LIGHT);
const TARGET = THEME.spacing['2xl'];
const RING = THEME.spacing.xs;

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

/** The reserved-space wrapper that paints the focus halo. */
function halo(root: ReactTestInstance): Record<string, unknown> | undefined {
  return styles(root).find((s) => s.padding === RING && s.margin === -RING);
}

const LABEL = (d: string): string =>
  new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(`${d}T12:00:00`));

describe('DatePickerV4 (native)', () => {
  it('wears InputV4 s field treatment, so it belongs in a form', () => {
    const { root } = renderThemed(<DatePickerV4 value="2024-03-15" locale="en-US" />, SEED_LIGHT);
    const field = styles(root).find((s) => s.borderWidth === 1 && s.minHeight !== undefined);
    expect(field?.minHeight).toBe(TARGET);
    expect(field?.borderRadius).toBe(THEME.radius.md);
    expect(field?.paddingHorizontal).toBe(THEME.spacing.md);
    expect(field?.borderColor).toBe(THEME.light.border);
  });

  it('reserves the focus halo whether or not it is showing', () => {
    const { root, getByText } = renderThemed(
      <DatePickerV4 value="2024-03-15" locale="en-US" />,
      SEED_LIGHT
    );
    expect(halo(root)?.backgroundColor).toBe('transparent');
    fireEvent.press(getByText(LABEL('2024-03-15')));
    // Opening the picker rings the field it belongs to.
    expect(halo(root)?.backgroundColor).not.toBe('transparent');
  });

  it('gives every day the tap-target floor, not a 44px column', () => {
    const { getByText, getByLabelText } = renderThemed(
      <DatePickerV4 value="2024-03-15" locale="en-US" />,
      SEED_LIGHT
    );
    fireEvent.press(getByText(LABEL('2024-03-15')));
    const cell = getByLabelText(LABEL('2024-03-14'));
    const style = cell.props.style as { width: number; height: number };
    expect(style.width).toBe(TARGET);
    expect(style.height).toBe(TARGET);
    expect(TARGET).toBeGreaterThanOrEqual(44);
  });

  it('fills the selected day with the scheme-resolved brand pair', () => {
    const theme = compileTheme(SEED_BOTH);
    const read = (scheme: 'light' | 'dark'): unknown => {
      const { getByText, getByLabelText } = renderThemed(
        <DatePickerV4 value="2024-03-15" locale="en-US" />,
        SEED_BOTH,
        scheme
      );
      fireEvent.press(getByText(LABEL('2024-03-15')));
      return styles(getByLabelText(LABEL('2024-03-15'))).find(
        (s) => s.borderRadius === theme.radius.full
      )?.backgroundColor;
    };
    expect(read('light')).toBe(theme.light.primary);
    expect(read('dark')).toBe(theme.dark.primary);
  });

  it('scrims with black from the elevation token, never with onSurface', () => {
    const { getByText, UNSAFE_root } = renderThemed(
      <DatePickerV4 value="2024-03-15" locale="en-US" />,
      SEED_BOTH,
      'dark'
    );
    fireEvent.press(getByText(LABEL('2024-03-15')));
    // The full-bleed layer behind the panel.
    const scrim = styles(UNSAFE_root).find(
      (s) => s.position === 'absolute' && s.top === 0 && s.bottom === 0
    );
    // A dark-mode scrim built from `onSurface` would be a near-white veil.
    const [r, g, b] = hexToRgb(compileTheme(SEED_BOTH).dark.onSurface);
    expect(scrim?.backgroundColor).not.toContain(`rgba(${r}, ${g}, ${b}`);
    expect(scrim?.backgroundColor).toContain('rgba(0, 0, 0');
  });

  it('floats the panel on elevation.sheet with its hairline', () => {
    const { getByText, getByLabelText } = renderThemed(
      <DatePickerV4 value="2024-03-15" locale="en-US" />,
      SEED_LIGHT
    );
    fireEvent.press(getByText(LABEL('2024-03-15')));
    const panel = styles(getByLabelText('Choose a date — March 2024')).find(
      (s) => s.shadowOpacity !== undefined
    );
    expect(panel?.shadowOpacity).toBe(THEME.lightElevation.sheet.opacity);
    expect(panel?.borderRadius).toBe(THEME.radius.lg);
  });

  it('blocks and mutes a day outside min/max instead of merely fading it', () => {
    const { getByText, getByLabelText } = renderThemed(
      <DatePickerV4 value="2024-03-15" min="2024-03-10" max="2024-03-20" locale="en-US" />,
      SEED_LIGHT
    );
    fireEvent.press(getByText(LABEL('2024-03-15')));
    const blocked = getByLabelText(LABEL('2024-03-05'));
    expect(blocked.props.accessibilityState).toMatchObject({ disabled: true });
  });

  it('reports the picked day as a civil YYYY-MM-DD and closes', () => {
    const onChange = jest.fn();
    const { getByText, getByLabelText, queryByLabelText } = renderThemed(
      <DatePickerV4 value="2024-03-15" onChange={onChange} locale="en-US" />,
      SEED_LIGHT
    );
    fireEvent.press(getByText(LABEL('2024-03-15')));
    fireEvent.press(getByLabelText(LABEL('2024-03-21')));
    expect(onChange).toHaveBeenCalledWith('2024-03-21');
    expect(queryByLabelText('Close')).toBeNull();
  });

  it('shows the placeholder in muted when there is no date', () => {
    const { getByText } = renderThemed(
      <DatePickerV4 placeholder="Pick a delivery date" />,
      SEED_LIGHT
    );
    const text = getByText('Pick a delivery date');
    expect((text.props.style as { color: string }).color).toBe(THEME.light.muted);
  });

  it('pages the month without touching the value', () => {
    const onChange = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <DatePickerV4 value="2024-03-15" onChange={onChange} locale="en-US" />,
      SEED_LIGHT
    );
    fireEvent.press(getByText(LABEL('2024-03-15')));
    fireEvent.press(getByLabelText('Next month'));
    expect(getByText('April 2024')).toBeTruthy();
    expect(onChange).not.toHaveBeenCalled();
  });
});
