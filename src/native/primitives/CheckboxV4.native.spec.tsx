import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import type { ThemeSeed } from '../../theme/types';
import { CheckboxV4 } from './CheckboxV4';

const THEME = compileTheme(SEED_LIGHT);
const RING = THEME.spacing.xs;

/** Every style object in the tree, flattened one level out of arrays. */
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

/** The reserved-space wrapper that paints the press halo. */
function halo(root: ReactTestInstance): Record<string, unknown> | undefined {
  return styles(root).find((s) => s.padding === RING && s.margin === -RING);
}

/** The visible box. */
function box(root: ReactTestInstance): Record<string, unknown> | undefined {
  return styles(root).find((s) => s.borderWidth === 1 && s.width === THEME.spacing.lg);
}

describe('CheckboxV4 (native)', () => {
  it('keeps the mark small but opens the target out to a full control height', () => {
    const { root, getByRole } = renderThemed(<CheckboxV4 accessibilityLabel="Remember" />, SEED_LIGHT);
    expect(box(root)?.width).toBe(THEME.spacing.lg);
    expect(box(root)?.height).toBe(THEME.spacing.lg);
    expect(box(root)?.borderRadius).toBe(THEME.radius.sm);
    // hitSlop lifts the touch area to the height every V4 control takes.
    expect(getByRole('checkbox').props.hitSlop).toBe(
      (THEME.spacing['2xl'] - THEME.spacing.lg) / 2
    );
  });

  it('reserves the halo whether or not it is showing', () => {
    const { root } = renderThemed(<CheckboxV4 accessibilityLabel="Remember" />, SEED_LIGHT);
    const wrapper = halo(root);
    expect(wrapper).toBeDefined();
    expect(wrapper?.borderRadius).toBe(THEME.radius.sm + RING);
    expect(wrapper?.backgroundColor).toBe('transparent');
  });

  it('lights the halo while it is held, and puts it out again', () => {
    const { root, getByRole } = renderThemed(
      <CheckboxV4 accessibilityLabel="Remember" />,
      SEED_LIGHT
    );
    fireEvent(getByRole('checkbox'), 'pressIn');
    expect(halo(root)?.backgroundColor).not.toBe('transparent');
    fireEvent(getByRole('checkbox'), 'pressOut');
    expect(halo(root)?.backgroundColor).toBe('transparent');
  });

  it('fills with the scheme-resolved brand slot, not a ramp step', () => {
    const seed: ThemeSeed = { ...SEED_LIGHT, mode: 'both' };
    const theme = compileTheme(seed);
    const fill = (scheme: 'light' | 'dark'): unknown => {
      const { root } = renderThemed(<CheckboxV4 accessibilityLabel="R" checked />, seed, scheme);
      return styles(root).find((s) => s.backgroundColor === theme[scheme].primary);
    };
    expect(fill('light')).toBeDefined();
    expect(fill('dark')).toBeDefined();
    expect(theme.light.primary).not.toBe(theme.dark.primary);
  });

  it('borders in primary when checked and danger when invalid', () => {
    const { root: plain } = renderThemed(<CheckboxV4 accessibilityLabel="R" />, SEED_LIGHT);
    expect(box(plain)?.borderColor).toBe(THEME.light.border);

    const { root: on } = renderThemed(<CheckboxV4 accessibilityLabel="R" checked />, SEED_LIGHT);
    expect(box(on)?.borderColor).toBe(THEME.light.primary);

    const { root: bad } = renderThemed(
      <CheckboxV4 accessibilityLabel="R" invalid checked />,
      SEED_LIGHT
    );
    expect(box(bad)?.borderColor).toBe(THEME.light.danger);
    // The fill follows the same flag, so border and fill can never disagree.
    expect(styles(bad).find((s) => s.backgroundColor === THEME.light.danger)).toBeDefined();
  });

  it('reports the next value, and stays put when disabled', () => {
    const onCheckedChange = jest.fn();
    const { getByRole } = renderThemed(
      <CheckboxV4 accessibilityLabel="R" checked onCheckedChange={onCheckedChange} />,
      SEED_LIGHT
    );
    fireEvent.press(getByRole('checkbox'));
    expect(onCheckedChange).toHaveBeenCalledWith(false);

    const off = jest.fn();
    const { getByRole: getDisabled } = renderThemed(
      <CheckboxV4 accessibilityLabel="R" disabled onCheckedChange={off} />,
      SEED_LIGHT
    );
    fireEvent.press(getDisabled('checkbox'));
    expect(off).not.toHaveBeenCalled();
    expect(getDisabled('checkbox').props.accessibilityState).toMatchObject({ disabled: true });
  });

  it('spends no depth on a form control — no gradient, no shadow', () => {
    const { root, queryByLabelText } = renderThemed(
      <CheckboxV4 accessibilityLabel="R" />,
      SEED_LIGHT
    );
    expect(queryByLabelText('linear-gradient')).toBeNull();
    expect(styles(root).find((s) => s.shadowOpacity !== undefined)).toBeUndefined();
  });
});
