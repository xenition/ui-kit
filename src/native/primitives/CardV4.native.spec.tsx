import * as React from 'react';
import { Text } from 'react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_LIGHT, SEED_DARK, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import type { ThemeSeed } from '../../theme/types';
import { CardV4 } from './CardV4';

/** The card's own flattened style (the outermost styled View in the tree). */
function cardStyle(root: ReactTestInstance): Record<string, unknown> {
  const merged: Record<string, unknown> = {};
  const walk = (style: unknown): void => {
    if (!style) return;
    if (Array.isArray(style)) {
      style.forEach(walk);
      return;
    }
    if (typeof style === 'object') Object.assign(merged, style as Record<string, unknown>);
  };
  const node = root.findAll((n) => n.props?.style !== undefined)[0];
  walk(node?.props?.style);
  return merged;
}

const FLAT_SEED: ThemeSeed = { ...SEED_LIGHT, depth: 'flat' };
const GLASS_SEED: ThemeSeed = { ...SEED_LIGHT, depth: 'glass' };

describe('CardV4 (native)', () => {
  it('renders a token surface with a hairline and the historical padding', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { root, getByText } = renderThemed(
      <CardV4>
        <Text>inside</Text>
      </CardV4>,
      SEED_LIGHT
    );
    expect(getByText('inside')).toBeTruthy();
    const style = cardStyle(root);
    expect(style.backgroundColor).toBe(theme.light.surface);
    expect(style.borderColor).toBe(theme.light.border);
    expect(style.borderWidth).toBe(1);
    expect(style.padding).toBe(theme.spacing.lg);
    expect(style.borderRadius).toBe(theme.radius.lg);
  });

  it('raises with elevation.card — the seed decision, not a picked number', () => {
    const theme = compileTheme(SEED_LIGHT);
    const style = cardStyle(
      renderThemed(
        <CardV4 variant="elevated">
          <Text>x</Text>
        </CardV4>,
        SEED_LIGHT
      ).root
    );
    expect(style.shadowOpacity).toBe(theme.lightElevation.card.opacity);
    expect(style.shadowRadius).toBe(theme.lightElevation.card.radius);
    expect(style.elevation).toBe(theme.lightElevation.card.android);
  });

  it('gives a dark page MORE shadow, not less', () => {
    const theme = compileTheme(SEED_DARK);
    const style = cardStyle(
      renderThemed(
        <CardV4 variant="elevated">
          <Text>x</Text>
        </CardV4>,
        SEED_DARK
      ).root
    );
    expect(style.shadowOpacity).toBe(theme.darkElevation.card.opacity);
    expect(theme.darkElevation.card.opacity).toBeGreaterThan(theme.lightElevation.card.opacity);
  });

  it('keeps the hairline on a raised card so it cannot dissolve', () => {
    const theme = compileTheme(SEED_LIGHT);
    const style = cardStyle(
      renderThemed(
        <CardV4 variant="elevated">
          <Text>x</Text>
        </CardV4>,
        SEED_LIGHT
      ).root
    );
    expect(style.borderWidth).toBe(1);
    expect(style.borderColor).toBe(theme.light.border);
  });

  it('resolves the hairline per scheme, never from the light-oriented ramps', () => {
    const theme = compileTheme({ ...SEED_LIGHT, mode: 'both' });
    const seed: ThemeSeed = { ...SEED_LIGHT, mode: 'both' };
    const light = cardStyle(
      renderThemed(
        <CardV4>
          <Text>x</Text>
        </CardV4>,
        seed,
        'light'
      ).root
    );
    const dark = cardStyle(
      renderThemed(
        <CardV4>
          <Text>x</Text>
        </CardV4>,
        seed,
        'dark'
      ).root
    );
    expect(light.borderColor).toBe(theme.light.border);
    expect(dark.borderColor).toBe(theme.dark.border);
    expect(light.borderColor).not.toBe(dark.borderColor);
  });

  it('drops the edge only for `flat`', () => {
    (['outlined', 'elevated', 'interactive'] as const).forEach((variant) => {
      const style = cardStyle(
        renderThemed(
          <CardV4 variant={variant}>
            <Text>x</Text>
          </CardV4>,
          SEED_LIGHT
        ).root
      );
      expect(style.borderWidth).toBe(1);
    });
    const flat = cardStyle(
      renderThemed(
        <CardV4 variant="flat">
          <Text>x</Text>
        </CardV4>,
        SEED_LIGHT
      ).root
    );
    expect(flat.borderWidth).toBe(0);
    expect(flat.shadowOpacity).toBeUndefined();
  });

  it("falls flat for a depth:'flat' seed without branching on depth", () => {
    const style = cardStyle(
      renderThemed(
        <CardV4 variant="elevated">
          <Text>x</Text>
        </CardV4>,
        FLAT_SEED
      ).root
    );
    // The card still asks for elevation.card; the compiler already zeroed it.
    expect(style.shadowOpacity).toBe(0);
    expect(style.shadowRadius).toBe(0);
  });

  it("wears the translucent pair only when the seed says depth:'glass'", () => {
    const glass = compileTheme(GLASS_SEED);
    const glassStyle = cardStyle(
      renderThemed(
        <CardV4>
          <Text>x</Text>
        </CardV4>,
        GLASS_SEED
      ).root
    );
    expect(glassStyle.backgroundColor).toBe(glass.lightGlass.tint);
    expect(glassStyle.borderColor).toBe(glass.lightGlass.border);

    // A soft seed gets the opaque surface — §8, no glassmorphism without purpose.
    const soft = compileTheme(SEED_LIGHT);
    const softStyle = cardStyle(
      renderThemed(
        <CardV4>
          <Text>x</Text>
        </CardV4>,
        SEED_LIGHT
      ).root
    );
    expect(softStyle.backgroundColor).toBe(soft.light.surface);
    expect(softStyle.backgroundColor).not.toBe(glass.lightGlass.tint);
  });

  it('honours the padding and radius scales', () => {
    const theme = compileTheme(SEED_LIGHT);
    const style = cardStyle(
      renderThemed(
        <CardV4 padding="sm" radius="md">
          <Text>x</Text>
        </CardV4>,
        SEED_LIGHT
      ).root
    );
    expect(style.padding).toBe(theme.spacing.sm);
    expect(style.borderRadius).toBe(theme.radius.md);

    const none = cardStyle(
      renderThemed(
        <CardV4 padding="none">
          <Text>x</Text>
        </CardV4>,
        SEED_LIGHT
      ).root
    );
    expect(none.padding).toBe(0);
  });

  it('never carries a gradient — §35.11 keeps that for the hero and the action', () => {
    const { queryByLabelText } = renderThemed(
      <CardV4 variant="elevated">
        <Text>x</Text>
      </CardV4>,
      SEED_LIGHT
    );
    expect(queryByLabelText('linear-gradient')).toBeNull();
  });
});
