import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_BOTH, SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { TimePickerV4 } from './TimePickerV4';

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

function halo(root: ReactTestInstance): Record<string, unknown> | undefined {
  return styles(root).find((s) => s.padding === RING && s.margin === -RING);
}

const TIME = { h: 9, m: 30 };

describe('TimePickerV4 (native)', () => {
  it('wears InputV4 s field treatment, so it belongs in a form', () => {
    const { root } = renderThemed(<TimePickerV4 value={TIME} />, SEED_LIGHT);
    const field = styles(root).find((s) => s.borderWidth === 1 && s.minHeight === TARGET);
    expect(field?.borderRadius).toBe(THEME.radius.md);
    expect(field?.paddingHorizontal).toBe(THEME.spacing.md);
    expect(field?.borderColor).toBe(THEME.light.border);
  });

  it('rings the field while its own popover is open', () => {
    const { root, getByText } = renderThemed(<TimePickerV4 value={TIME} />, SEED_LIGHT);
    expect(halo(root)?.backgroundColor).toBe('transparent');
    fireEvent.press(getByText('09:30'));
    expect(halo(root)?.backgroundColor).not.toBe('transparent');
  });

  it('gives every hour and minute row the tap-target floor', () => {
    const { getByText, getByLabelText } = renderThemed(
      <TimePickerV4 value={TIME} />,
      SEED_LIGHT
    );
    fireEvent.press(getByText('09:30'));
    for (const label of ['Hour 14', 'Min 45']) {
      const row = styles(getByLabelText(label)).find((s) => s.height === TARGET);
      expect(row?.height).toBe(TARGET);
    }
    expect(TARGET).toBeGreaterThanOrEqual(44);
  });

  it('fills the active hour and minute with the contrast-checked pair', () => {
    const { getByText, getByLabelText } = renderThemed(
      <TimePickerV4 value={TIME} />,
      SEED_LIGHT
    );
    fireEvent.press(getByText('09:30'));
    for (const label of ['Hour 9', 'Min 30']) {
      const row = styles(getByLabelText(label)).find((s) => s.height === TARGET);
      expect(row?.backgroundColor).toBe(THEME.light.primary);
      expect(getByLabelText(label).props.accessibilityState).toMatchObject({ selected: true });
    }
  });

  it('resolves the active fill per scheme, not from a ramp', () => {
    const theme = compileTheme(SEED_BOTH);
    const read = (scheme: 'light' | 'dark'): unknown => {
      const { getByText, getByLabelText } = renderThemed(
        <TimePickerV4 value={TIME} />,
        SEED_BOTH,
        scheme
      );
      fireEvent.press(getByText('09:30'));
      return styles(getByLabelText('Hour 9')).find((s) => s.height === TARGET)?.backgroundColor;
    };
    expect(read('light')).toBe(theme.light.primary);
    expect(read('dark')).toBe(theme.dark.primary);
  });

  it('honours minuteStep', () => {
    const { getByText, getByLabelText, queryByLabelText } = renderThemed(
      <TimePickerV4 value={TIME} minuteStep={15} />,
      SEED_LIGHT
    );
    fireEvent.press(getByText('09:30'));
    expect(getByLabelText('Min 45')).toBeTruthy();
    expect(queryByLabelText('Min 20')).toBeNull();
  });

  it('reports each column independently', () => {
    const onChange = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <TimePickerV4 value={TIME} onChange={onChange} />,
      SEED_LIGHT
    );
    fireEvent.press(getByText('09:30'));
    fireEvent.press(getByLabelText('Hour 14'));
    expect(onChange).toHaveBeenLastCalledWith({ h: 14, m: 30 });
    fireEvent.press(getByLabelText('Min 45'));
    expect(onChange).toHaveBeenLastCalledWith({ h: 9, m: 45 });
  });

  it('gives Done the primary pair at the tap-target height', () => {
    const { getByText, getByLabelText } = renderThemed(
      <TimePickerV4 value={TIME} />,
      SEED_LIGHT
    );
    fireEvent.press(getByText('09:30'));
    const done = styles(getByLabelText('Done')).find((s) => s.height === TARGET);
    expect(done?.backgroundColor).toBe(THEME.light.primary);
  });

  it('scrims with black from the elevation token, never with onSurface', () => {
    const { getByText, UNSAFE_root } = renderThemed(<TimePickerV4 value={TIME} />, SEED_BOTH, 'dark');
    fireEvent.press(getByText('09:30'));
    const scrim = styles(UNSAFE_root).find(
      (s) => s.position === 'absolute' && s.top === 0 && s.bottom === 0
    );
    expect(scrim?.backgroundColor).toContain('rgba(0, 0, 0');
  });

  it('shows the placeholder in muted when there is no time', () => {
    const { getByText } = renderThemed(<TimePickerV4 placeholder="Pick a slot" />, SEED_LIGHT);
    expect((getByText('Pick a slot').props.style as { color: string }).color).toBe(
      THEME.light.muted
    );
  });
});
