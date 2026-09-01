import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import {
  SEED_LIGHT,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { resolveIconGlyph } from '../../primitives/icon-names';
import { AuthProviderButtonV4 } from './AuthProviderButtonV4';

const THEME = compileTheme(SEED_LIGHT);
const GOOGLE = 'Continue with Google';

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

/** The `Pressable` itself — the one node carrying a style *function*. */
function button(root: ReactTestInstance): ReactTestInstance {
  return root.findAll(
    (n) => n.props?.accessibilityRole === 'button' && typeof n.props?.style === 'function'
  )[0]!;
}

/** The bordered box, resolved through the `Pressable` style function. */
function shell(root: ReactTestInstance, pressed = false): Record<string, unknown> {
  return button(root).props.style({ pressed }) as Record<string, unknown>;
}

describe('AuthProviderButtonV4 (native)', () => {
  it('takes the field metric, so the auth stack shares an edge (Addendum §1)', () => {
    const { root } = renderThemed(<AuthProviderButtonV4 label={GOOGLE} glyph="G" />, SEED_LIGHT);
    const box = shell(root);
    // The same numbers `InputV4` and the eleven form controls take — 48 /
    // radius.md off the scales, NOT §9's literal 56 / radius.full pill.
    expect(box.height).toBe(THEME.spacing['2xl']);
    expect(box.borderRadius).toBe(THEME.radius.md);
    expect(box.paddingHorizontal).toBe(THEME.spacing.lg);
    expect(box.height).not.toBe(56);
    expect(box.borderRadius).not.toBe(THEME.radius.full);
  });

  it('is outlined, not filled — the CTA keeps the only dominant fill (§5)', () => {
    const { root } = renderThemed(<AuthProviderButtonV4 label={GOOGLE} glyph="G" />, SEED_LIGHT);
    const box = shell(root);
    expect(box.borderWidth).toBe(1);
    expect(box.borderColor).toBe(THEME.light.border);
    expect(box.backgroundColor).toBe(THEME.light.surface);
    expect(box.backgroundColor).not.toBe(THEME.light.primary);
  });

  it('composes the V4 children (§10.5): IconV4 leads, TextV4 labels', () => {
    const { getByText } = renderThemed(
      <AuthProviderButtonV4 label={GOOGLE} glyph="G" />,
      SEED_LIGHT
    );
    expect(getByText('G', { includeHiddenElements: true })).toBeTruthy();
    const label = getByText(GOOGLE);
    const flat = [label.props.style].flat(3).filter(Boolean) as Record<string, unknown>[];
    expect(flat.find((s) => s.fontSize !== undefined)?.fontSize).toBe(
      THEME.typography.scale.base
    );
    expect(flat.find((s) => s.fontWeight !== undefined)?.fontWeight).toBe('600');
  });

  it('accepts a named icon as well as a one-off glyph', () => {
    const { getByText } = renderThemed(
      <AuthProviderButtonV4 label="Continue with email" name="mail" />,
      SEED_LIGHT
    );
    expect(getByText(resolveIconGlyph('mail'), { includeHiddenElements: true })).toBeTruthy();
  });

  it('EMPTY STATE — no glyph and no name renders the label alone, not a hole', () => {
    const { getByText, queryByText } = renderThemed(
      <AuthProviderButtonV4 label="Single sign-on" />,
      SEED_LIGHT
    );
    expect(getByText('Single sign-on')).toBeTruthy();
    expect(queryByText('G', { includeHiddenElements: true })).toBeNull();
  });

  it('tints the container on press rather than dimming its content', () => {
    const { root } = renderThemed(<AuthProviderButtonV4 label={GOOGLE} glyph="G" />, SEED_LIGHT);
    const rest = shell(root, false).backgroundColor;
    const held = shell(root, true).backgroundColor;
    expect(held).not.toBe(rest);
    // Opaque, because the button owns its fill and its label is contrast
    // checked against it — not a translucent rgba borrowing the page.
    expect(typeof held).toBe('string');
    expect(held as string).toMatch(/^#/);
  });

  it('disables at M3 0.38, the same figure ButtonV4 uses', () => {
    const onPress = jest.fn();
    const { root, getByLabelText } = renderThemed(
      <AuthProviderButtonV4 label={GOOGLE} glyph="G" disabled onPress={onPress} />,
      SEED_LIGHT
    );
    expect(styles(root).some((s) => s.opacity === THEME.state.disabledContent)).toBe(true);
    expect(button(root).props.accessibilityState.disabled).toBe(true);
    // Fired on the host element, so RNTL honours the disabled responder the
    // way a finger would.
    fireEvent.press(getByLabelText(GOOGLE));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('loading swaps the mark for a spinner, blocks the press and announces busy', () => {
    const onPress = jest.fn();
    const { queryByText, queryByTestId, getByLabelText, root } = renderThemed(
      <AuthProviderButtonV4 label={GOOGLE} glyph="G" loading onPress={onPress} />,
      SEED_LIGHT
    );
    expect(queryByTestId('xen-v4-spinner', { includeHiddenElements: true })).toBeTruthy();
    expect(queryByText('G', { includeHiddenElements: true })).toBeNull();
    const pressable = button(root);
    expect(pressable.props.accessibilityState.busy).toBe(true);
    expect(pressable.props.accessibilityState.disabled).toBe(true);
    fireEvent.press(getByLabelText(GOOGLE));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('compact hides the label but keeps it as the accessibility label', () => {
    const { root, queryByText, getByText } = renderThemed(
      <AuthProviderButtonV4 label={GOOGLE} glyph="G" compact />,
      SEED_LIGHT
    );
    expect(queryByText(GOOGLE)).toBeNull();
    expect(getByText('G', { includeHiddenElements: true })).toBeTruthy();
    const pressable = button(root);
    expect(pressable.props.accessibilityLabel).toBe(GOOGLE);
    // A square footprint at the field height, so a row of them lines up.
    const box = shell(root);
    expect(box.minWidth).toBe(THEME.spacing['2xl']);
    expect(box.paddingHorizontal).toBe(THEME.spacing.md);
  });

  it('fills its container by default and can step out of it for a row', () => {
    const full = renderThemed(<AuthProviderButtonV4 label={GOOGLE} glyph="G" />, SEED_LIGHT);
    expect(styles(full.root).some((s) => s.alignSelf === 'stretch')).toBe(true);

    const row = renderThemed(
      <AuthProviderButtonV4 label={GOOGLE} glyph="G" fullWidth={false} />,
      SEED_LIGHT
    );
    expect(styles(row.root).some((s) => s.alignSelf === 'flex-start')).toBe(true);
  });

  it('fires on press and accepts a style override', () => {
    const onPress = jest.fn();
    const { root, getByLabelText } = renderThemed(
      <AuthProviderButtonV4
        label={GOOGLE}
        glyph="G"
        onPress={onPress}
        style={{ marginTop: 12 }}
      />,
      SEED_LIGHT
    );
    expect(styles(root).some((s) => s.marginTop === 12)).toBe(true);
    fireEvent.press(getByLabelText(GOOGLE));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('every colour it paints traces to a token — no literal hex', () => {
    const { root } = renderThemed(<AuthProviderButtonV4 label={GOOGLE} glyph="G" />, SEED_LIGHT);
    const allowed = tokenHexSet(SEED_LIGHT);
    renderedStyleHexes(root).forEach((hex) => expect(allowed.has(hex)).toBe(true));
  });
});
