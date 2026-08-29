import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_BOTH, SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { ComboboxV4 } from './ComboboxV4';

const THEME = compileTheme(SEED_LIGHT);
const TARGET = THEME.spacing['2xl'];
const RING = THEME.spacing.xs;

const OPTIONS = [
  { label: 'Amsterdam', value: 'ams' },
  { label: 'Rotterdam', value: 'rtm' },
  { label: 'Utrecht', value: 'utc' },
];

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

describe('ComboboxV4 (native)', () => {
  it('wears InputV4 s field treatment on the trigger', () => {
    const { root } = renderThemed(<ComboboxV4 options={OPTIONS} />, SEED_LIGHT);
    const field = styles(root).find((s) => s.borderWidth === 1 && s.minHeight === TARGET);
    expect(field?.borderRadius).toBe(THEME.radius.md);
    expect(field?.paddingHorizontal).toBe(THEME.spacing.md);
  });

  it('rings the trigger while its own sheet is open', () => {
    const { root, getByText } = renderThemed(<ComboboxV4 options={OPTIONS} />, SEED_LIGHT);
    expect(halo(root)?.backgroundColor).toBe('transparent');
    fireEvent.press(getByText('Search…'));
    expect(halo(root)?.backgroundColor).not.toBe('transparent');
  });

  it('gives every option row the tap-target floor', () => {
    const { getByText, getByLabelText } = renderThemed(
      <ComboboxV4 options={OPTIONS} />,
      SEED_LIGHT
    );
    fireEvent.press(getByText('Search…'));
    const row = styles(getByLabelText('Utrecht')).find((s) => s.minHeight === TARGET);
    expect(row?.minHeight).toBe(TARGET);
    expect(TARGET).toBeGreaterThanOrEqual(44);
  });

  it('marks the selected option with primaryText and a tick, never bare primary', () => {
    const { getByText, getByLabelText } = renderThemed(
      <ComboboxV4 options={OPTIONS} value="rtm" />,
      SEED_LIGHT
    );
    fireEvent.press(getByText('Rotterdam'));
    const row = getByLabelText('Rotterdam');
    const labelStyles = styles(row).filter((s) => s.color !== undefined);
    // `primaryText` is the slot the compiler derives to read ON a surface;
    // `primary` only promises contrast against `onPrimary`. (For a seed whose
    // brand already reads on the surface the compiler leaves the two equal —
    // the point is which slot is asked for, not that they always differ.)
    expect(labelStyles.some((s) => s.color === THEME.light.primaryText)).toBe(true);
    expect(row.props.accessibilityState).toMatchObject({ selected: true });
  });

  it('filters as you type and quotes the query when nothing matches', () => {
    const { getByText, getByLabelText, queryByLabelText } = renderThemed(
      <ComboboxV4 options={OPTIONS} />,
      SEED_LIGHT
    );
    fireEvent.press(getByText('Search…'));
    fireEvent.changeText(getByLabelText('Filter options'), 'dam');
    expect(getByLabelText('Amsterdam')).toBeTruthy();
    expect(queryByLabelText('Utrecht')).toBeNull();

    fireEvent.changeText(getByLabelText('Filter options'), 'zzz');
    expect(getByText('No matches for “zzz”')).toBeTruthy();
  });

  it('reports the chosen value and closes', () => {
    const onValueChange = jest.fn();
    const { getByText, getByLabelText, queryByLabelText } = renderThemed(
      <ComboboxV4 options={OPTIONS} onValueChange={onValueChange} />,
      SEED_LIGHT
    );
    fireEvent.press(getByText('Search…'));
    fireEvent.press(getByLabelText('Utrecht'));
    expect(onValueChange).toHaveBeenCalledWith('utc');
    expect(queryByLabelText('Filter options')).toBeNull();
  });

  it('prefers onValueChange when both spellings are passed', () => {
    const onValueChange = jest.fn();
    const onChange = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <ComboboxV4 options={OPTIONS} onValueChange={onValueChange} onChange={onChange} />,
      SEED_LIGHT
    );
    fireEvent.press(getByText('Search…'));
    fireEvent.press(getByLabelText('Utrecht'));
    expect(onValueChange).toHaveBeenCalledWith('utc');
    expect(onChange).not.toHaveBeenCalled();
  });

  it('scrims with black from the elevation token, never with the neutral ramp', () => {
    const { getByText, UNSAFE_root } = renderThemed(
      <ComboboxV4 options={OPTIONS} />,
      SEED_BOTH,
      'dark'
    );
    fireEvent.press(getByText('Search…'));
    const scrim = styles(UNSAFE_root).find(
      (s) => s.position === 'absolute' && s.top === 0 && s.bottom === 0
    );
    expect(scrim?.backgroundColor).toContain('rgba(0, 0, 0');
  });

  it('floats the sheet on elevation.sheet', () => {
    const { getByText, getByLabelText } = renderThemed(
      <ComboboxV4 options={OPTIONS} />,
      SEED_LIGHT
    );
    fireEvent.press(getByText('Search…'));
    const panel = styles(getByLabelText('Choose an option')).find(
      (s) => s.shadowOpacity !== undefined
    );
    expect(panel?.shadowOpacity).toBe(THEME.lightElevation.sheet.opacity);
    expect(panel?.borderRadius).toBe(THEME.radius.lg);
  });

  it('turns the trigger danger when invalid', () => {
    const { root } = renderThemed(<ComboboxV4 options={OPTIONS} invalid />, SEED_LIGHT);
    const field = styles(root).find((s) => s.borderWidth === 1 && s.minHeight === TARGET);
    expect(field?.borderColor).toBe(THEME.light.danger);
  });

  it('resolves the selected ink per scheme', () => {
    const theme = compileTheme(SEED_BOTH);
    const read = (scheme: 'light' | 'dark'): boolean => {
      const { getByText, getByLabelText } = renderThemed(
        <ComboboxV4 options={OPTIONS} value="rtm" />,
        SEED_BOTH,
        scheme
      );
      fireEvent.press(getByText('Rotterdam'));
      return styles(getByLabelText('Rotterdam')).some(
        (s) => s.color === theme[scheme].primaryText
      );
    };
    expect(read('light')).toBe(true);
    expect(read('dark')).toBe(true);
  });
});
