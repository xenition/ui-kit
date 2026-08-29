import * as React from 'react';
import { Text } from 'react-native';
import { SEED_LIGHT, SEED_BOTH, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { composeGlass } from '../../theme/glass';
import { GlassPanel } from './GlassPanel';

/** Flatten whatever RN style shape a node carries into one object. */
function flatStyle(style: unknown): Record<string, unknown> {
  if (Array.isArray(style)) return Object.assign({}, ...style.map(flatStyle));
  return (style ?? {}) as Record<string, unknown>;
}

/** Parse `rgba(r, g, b, a)` back into numbers. */
function rgba(value: unknown): { r: number; g: number; b: number; a: number } {
  const m = /rgba\((\d+), (\d+), (\d+), ([\d.]+)\)/.exec(String(value));
  if (!m) throw new Error(`not an rgba() string: ${String(value)}`);
  return { r: Number(m[1]), g: Number(m[2]), b: Number(m[3]), a: Number(m[4]) };
}

function panelStyle(seed: typeof SEED_LIGHT, ui: React.ReactElement, scheme?: 'light' | 'dark') {
  const { getByTestId } = renderThemed(ui, seed, scheme);
  return flatStyle(getByTestId('panel').props.style);
}

describe('GlassPanel (native)', () => {
  it('fills from the compiled glass token at the requested intensity', () => {
    const theme = compileTheme(SEED_LIGHT);
    for (const intensity of ['soft', 'regular', 'strong'] as const) {
      const style = panelStyle(
        SEED_LIGHT,
        <GlassPanel testID="panel" intensity={intensity}>
          <Text>body</Text>
        </GlassPanel>
      );
      expect(style.backgroundColor).toBe(
        composeGlass(theme.lightGlass, theme.light.surface, intensity).backgroundColor
      );
      expect(style.borderColor).toBe(
        composeGlass(theme.lightGlass, theme.light.surface, intensity).borderColor
      );
    }
  });

  it('gets more opaque with intensity and never more transparent than the token', () => {
    // The scale is one-way on purpose: the compiler's alpha is the point below
    // which `onSurface` stops clearing AA over dark artwork.
    const theme = compileTheme(SEED_LIGHT);
    const alphas = (['soft', 'regular', 'strong'] as const).map(
      (intensity) =>
        rgba(
          panelStyle(
            SEED_LIGHT,
            <GlassPanel testID="panel" intensity={intensity}>
              <Text>body</Text>
            </GlassPanel>
          ).backgroundColor
        ).a
    );
    expect(alphas[0]).toBeLessThan(alphas[1]!);
    expect(alphas[1]).toBeLessThan(alphas[2]!);
    // `soft` IS the token, to the byte.
    const tokenAlpha = Number.parseInt(theme.lightGlass.tint.slice(7, 9), 16) / 255;
    expect(alphas[0]).toBeCloseTo(tokenAlpha, 2);
  });

  it('follows the active scheme — the token is resolved, unlike ramps', () => {
    const theme = compileTheme(SEED_BOTH);
    const light = panelStyle(
      SEED_BOTH,
      <GlassPanel testID="panel">
        <Text>body</Text>
      </GlassPanel>,
      'light'
    );
    const dark = panelStyle(
      SEED_BOTH,
      <GlassPanel testID="panel">
        <Text>body</Text>
      </GlassPanel>,
      'dark'
    );
    expect(light.backgroundColor).not.toBe(dark.backgroundColor);
    expect(dark.backgroundColor).toBe(
      composeGlass(theme.darkGlass, theme.dark.surface, 'regular').backgroundColor
    );
  });

  it('drops the border when asked, and keeps the token radius', () => {
    const theme = compileTheme(SEED_LIGHT);
    const style = panelStyle(
      SEED_LIGHT,
      <GlassPanel testID="panel" bordered={false}>
        <Text>body</Text>
      </GlassPanel>
    );
    expect(style.borderWidth).toBeUndefined();
    expect(style.borderColor).toBeUndefined();
    expect(style.borderRadius).toBe(theme.radius.lg);
  });

  it('mounts no blur view — React Native has no backdrop-filter and the kit does not pretend', () => {
    // The token's `blur` is exposed on the theme for an app that HAS a
    // BlurView; the panel itself must stay dependency-free, because a component
    // that mounted `expo-blur` would crash every app without it.
    const { toJSON } = renderThemed(
      <GlassPanel testID="panel">
        <Text>body</Text>
      </GlassPanel>,
      SEED_LIGHT
    );
    expect(JSON.stringify(toJSON())).not.toMatch(/blur/i);
  });
});
