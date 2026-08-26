import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_BOTH, SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { SearchInputV4 } from './SearchInputV4';
import { V4_STATE } from '../../primitives/internal/v4-state';

const THEME = compileTheme(SEED_LIGHT);
const TARGET = THEME.spacing['2xl'];
const RING = THEME.spacing.xs;
const GLYPH = THEME.spacing.lg;

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

function field(root: ReactTestInstance): Record<string, unknown> | undefined {
  return styles(root).find((s) => s.borderWidth === 1 && s.minHeight === TARGET);
}

describe('SearchInputV4 (native)', () => {
  it('stops being a pill and wears InputV4 s field treatment', () => {
    const { root } = renderThemed(<SearchInputV4 />, SEED_LIGHT);
    const f = field(root);
    expect(f?.borderRadius).toBe(THEME.radius.md);
    expect(f?.borderRadius).not.toBe(THEME.radius.full);
    expect(f?.minHeight).toBe(TARGET);
    expect(f?.paddingHorizontal).toBe(THEME.spacing.md);
  });

  it('reserves the focus halo whether or not it is showing', () => {
    const { root, getByLabelText } = renderThemed(<SearchInputV4 />, SEED_LIGHT);
    expect(halo(root)?.backgroundColor).toBe('transparent');
    fireEvent(getByLabelText('Search'), 'focus');
    expect(halo(root)?.backgroundColor).not.toBe('transparent');
    expect(field(root)?.borderColor).toBe(THEME.light.ring);
    fireEvent(getByLabelText('Search'), 'blur');
    expect(halo(root)?.backgroundColor).toBe('transparent');
  });

  it('takes the halo from the scheme-resolved brand slot, not the ramps', () => {
    const theme = compileTheme(SEED_BOTH);
    const read = (scheme: 'light' | 'dark'): unknown => {
      const { root, getByLabelText } = renderThemed(<SearchInputV4 />, SEED_BOTH, scheme);
      fireEvent(getByLabelText('Search'), 'focus');
      return field(root)?.borderColor;
    };
    expect(read('light')).toBe(theme.light.ring);
    expect(read('dark')).toBe(theme.dark.ring);
  });

  it('grows the clear target to the floor without growing the field', () => {
    const { root, getByLabelText } = renderThemed(
      <SearchInputV4 value="invoices" />,
      SEED_LIGHT
    );
    const clear = getByLabelText('Clear search');
    // The glyph stays small…
    const style = styles(clear).find((x) => x.width === GLYPH);
    expect(style?.width).toBe(GLYPH);
    // …and the slop makes up the difference to the tap-target floor.
    expect(clear.props.hitSlop).toBe(Math.round((TARGET - GLYPH) / 2));
    expect(GLYPH + clear.props.hitSlop * 2).toBeGreaterThanOrEqual(44);
    // The field is unchanged by it.
    expect(field(root)?.minHeight).toBe(TARGET);
  });

  it('only offers a clear affordance when there is something to clear', () => {
    const { queryByLabelText } = renderThemed(<SearchInputV4 />, SEED_LIGHT);
    expect(queryByLabelText('Clear search')).toBeNull();
  });

  it('clears through both callbacks', () => {
    const onChangeText = jest.fn();
    const onClear = jest.fn();
    const { getByLabelText } = renderThemed(
      <SearchInputV4 value="invoices" onChangeText={onChangeText} onClear={onClear} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Clear search'));
    expect(onChangeText).toHaveBeenCalledWith('');
    expect(onClear).toHaveBeenCalledTimes(1);
  });

  it('turns the field and its ring danger when invalid', () => {
    const { root, getByLabelText } = renderThemed(<SearchInputV4 invalid />, SEED_LIGHT);
    expect(field(root)?.borderColor).toBe(THEME.light.danger);
    fireEvent(getByLabelText('Search'), 'focus');
    expect(halo(root)?.backgroundColor).not.toBe('transparent');
    expect(field(root)?.borderColor).toBe(THEME.light.danger);
  });

  it('still calls the caller onFocus / onBlur / onChangeText', () => {
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    const onChangeText = jest.fn();
    const { getByLabelText } = renderThemed(
      <SearchInputV4 onFocus={onFocus} onBlur={onBlur} onChangeText={onChangeText} />,
      SEED_LIGHT
    );
    const input = getByLabelText('Search');
    fireEvent(input, 'focus');
    fireEvent(input, 'blur');
    fireEvent.changeText(input, 'inv');
    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(onBlur).toHaveBeenCalledTimes(1);
    expect(onChangeText).toHaveBeenCalledWith('inv');
  });

  it('dims and blocks when disabled', () => {
    const { root, getByLabelText } = renderThemed(<SearchInputV4 disabled />, SEED_LIGHT);
    expect(field(root)?.opacity).toBe(V4_STATE.disabledContent);
    expect(getByLabelText('Search').props.accessibilityState).toMatchObject({ disabled: true });
  });

  it('spends no depth on a form field', () => {
    const { root } = renderThemed(<SearchInputV4 value="x" />, SEED_LIGHT);
    expect(styles(root).find((s) => s.shadowOpacity !== undefined)).toBeUndefined();
  });
});
