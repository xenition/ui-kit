/**
 * `Text` (native) — the component that exists so screens stop hand-assembling
 * `{ fontSize: tokens.typography.scale.lg, color: colors.muted }`. The specs
 * that matter are therefore: the scale step and the semantic slot actually
 * reach the rendered style, and every colour it emits traces to a token.
 */
import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { compileTheme } from '../../theme/compile';
import { toNativeTokens } from '../../theme/outputs';
import {
  SEED_LIGHT,
  SEED_DARK,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { Text } from './Text';

const allowed = tokenHexSet(SEED_LIGHT);
const assertTokenPure = (root: Parameters<typeof renderedStyleHexes>[0]): void =>
  renderedStyleHexes(root).forEach((hex) => expect(allowed.has(hex)).toBe(true));

const LIGHT = toNativeTokens(compileTheme(SEED_LIGHT));

/** Flatten the rendered `style` prop of a node into one object. */
function flatStyle(node: { props: { style?: unknown } }): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  const walk = (s: unknown): void => {
    if (!s) return;
    if (Array.isArray(s)) return s.forEach(walk);
    if (typeof s === 'object') Object.assign(out, s as Record<string, unknown>);
  };
  walk(node.props.style);
  return out;
}

describe('Text (native)', () => {
  it('renders its children and is token-pure', () => {
    const { getByText, root } = renderThemed(<Text>Pantry is empty</Text>, SEED_LIGHT);
    expect(getByText('Pantry is empty')).toBeTruthy();
    assertTokenPure(root);
  });

  it('resolves `variant` off the compiled type scale, never a literal', () => {
    const { getByText } = renderThemed(<Text size="2xl">Recipes</Text>, SEED_LIGHT);
    const style = flatStyle(getByText('Recipes'));
    expect(style.fontSize).toBe(LIGHT.typography.scale['2xl']);
    // Line height is a ratio of the resolved size — not a px literal.
    expect(style.lineHeight).toBe(LIGHT.typography.scale['2xl'] * 1.25);
  });

  it('defaults to the base step and the onSurface slot', () => {
    const { getByText } = renderThemed(<Text>Body</Text>, SEED_LIGHT);
    const style = flatStyle(getByText('Body'));
    expect(style.fontSize).toBe(LIGHT.typography.scale.base);
    expect(style.color).toBe(LIGHT.colors.light.onSurface);
  });

  it('resolves `tone` off the semantic slots (including the contrast-safe text forms)', () => {
    const muted = renderThemed(<Text tone="muted">Caption</Text>, SEED_LIGHT);
    expect(flatStyle(muted.getByText('Caption')).color).toBe(LIGHT.colors.light.muted);

    const danger = renderThemed(<Text tone="dangerText">Out of date</Text>, SEED_LIGHT);
    expect(flatStyle(danger.getByText('Out of date')).color).toBe(LIGHT.colors.light.dangerText);
  });

  it('follows the active color scheme', () => {
    const dark = renderThemed(<Text>Night</Text>, SEED_DARK, 'dark');
    const darkTokens = toNativeTokens(compileTheme(SEED_DARK));
    expect(flatStyle(dark.getByText('Night')).color).toBe(darkTokens.colors.dark.onSurface);
  });

  it('maps weight and align onto real style values', () => {
    const { getByText } = renderThemed(
      <Text weight="bold" align="center">
        Heading
      </Text>,
      SEED_LIGHT
    );
    const style = flatStyle(getByText('Heading'));
    expect(style.fontWeight).toBe('700');
    expect(style.textAlign).toBe('center');
  });

  it('forwards numberOfLines and the rest of the RN Text props', () => {
    const onPress = jest.fn();
    const { getByText } = renderThemed(
      <Text numberOfLines={2} onPress={onPress} accessibilityRole="header">
        Long method step
      </Text>,
      SEED_LIGHT
    );
    const node = getByText('Long method step');
    expect(node.props.numberOfLines).toBe(2);
    fireEvent.press(node);
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('lets `style` layer layout on top without losing the token color', () => {
    const { getByText } = renderThemed(
      <Text tone="primaryText" style={{ marginTop: 8 }}>
        Sign in
      </Text>,
      SEED_LIGHT
    );
    const style = flatStyle(getByText('Sign in'));
    expect(style.marginTop).toBe(8);
    expect(style.color).toBe(LIGHT.colors.light.primaryText);
  });
});
