import * as React from 'react';
import { SEED_BOTH, SEED_DARK, SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { contrastRatio } from '../../theme/color';
import { gradientInk } from '../../primitives/internal/v4-depth';
import type { ThemeSeed } from '../../theme/types';
import { GradientText, type GradientTextRamp } from './GradientText';

const RAMPS: GradientTextRamp[] = ['primary', 'accent', 'primary-accent', 'accent-primary'];

function color(node: { props: { style: unknown } }): string {
  const merged: Record<string, unknown> = {};
  const walk = (s: unknown): void => {
    if (!s) return;
    if (Array.isArray(s)) {
      s.forEach(walk);
      return;
    }
    if (typeof s === 'object') Object.assign(merged, s as Record<string, unknown>);
  };
  walk(node.props.style);
  return merged.color as string;
}

describe('GradientText (native)', () => {
  it('clears AA on the page — every ramp, every scheme, every seed', () => {
    ([SEED_LIGHT, SEED_DARK, SEED_BOTH] as ThemeSeed[]).forEach((seed) => {
      (['light', 'dark'] as const).forEach((scheme) => {
        const surface = compileTheme(seed)[scheme].surface;
        RAMPS.forEach((ramp) => {
          const { getByText } = renderThemed(
            <GradientText ramp={ramp}>faster</GradientText>,
            seed,
            scheme
          );
          // The whole point of the component is a word you can read.
          expect(contrastRatio(color(getByText('faster')), surface)).toBeGreaterThanOrEqual(4.5);
        });
      });
    });
  });

  it('takes its colour from the brand gradient, corrected against the page', () => {
    const theme = compileTheme(SEED_BOTH);
    (['light', 'dark'] as const).forEach((scheme) => {
      const surface = theme[scheme].surface;
      const brand = scheme === 'light' ? theme.lightGradient.brand : theme.darkGradient.brand;
      // The same call the component makes: the ink is the page and cannot
      // move, so both extremes are the ground and the stops get walked.
      const legible = gradientInk(brand, surface, { darkest: surface, lightest: surface });
      const { getByText } = renderThemed(
        <GradientText ramp="primary">faster</GradientText>,
        SEED_BOTH,
        scheme
      );
      expect(color(getByText('faster')).toLowerCase()).toBe(legible.from.toLowerCase());
    });

    // And on a dark page it is nothing like the light-oriented ramp step the
    // old fallback reached for — `ramps` does not resolve per scheme.
    const dark = renderThemed(<GradientText ramp="primary">faster</GradientText>, SEED_BOTH, 'dark');
    expect(color(dark.getByText('faster')).toLowerCase()).not.toBe(
      theme.ramps.primary[500].toLowerCase()
    );
  });

  it('follows the scheme, because `gradient` resolves and `ramps` does not', () => {
    const light = renderThemed(<GradientText>faster</GradientText>, SEED_BOTH, 'light');
    const dark = renderThemed(<GradientText>faster</GradientText>, SEED_BOTH, 'dark');
    expect(color(light.getByText('faster'))).not.toBe(color(dark.getByText('faster')));
  });

  it('lands on one flat brand colour when the seed asked for flat depth', () => {
    const flat: ThemeSeed = { ...SEED_LIGHT, depth: 'flat' };
    const ends = ['primary', 'accent', 'primary-accent'].map(
      (ramp) =>
        color(
          renderThemed(
            <GradientText ramp={ramp as GradientTextRamp}>faster</GradientText>,
            flat
          ).getByText('faster')
        )
    );
    // `inert()` collapses both stops to the same colour, so there is nothing
    // left to pick between and no branch in the component that says so.
    expect(new Set(ends).size).toBe(1);
  });

  it('still accepts `angle` for prop parity, with no visual effect', () => {
    const a = renderThemed(<GradientText angle={12}>faster</GradientText>, SEED_LIGHT);
    const b = renderThemed(<GradientText angle={200}>faster</GradientText>, SEED_LIGHT);
    expect(color(a.getByText('faster'))).toBe(color(b.getByText('faster')));
  });

  it('lets the caller override through `style`', () => {
    const { getByText } = renderThemed(
      <GradientText style={{ fontWeight: '400' }}>faster</GradientText>,
      SEED_LIGHT
    );
    const merged: Record<string, unknown> = {};
    (getByText('faster').props.style as unknown[]).forEach((s) =>
      Object.assign(merged, s as Record<string, unknown>)
    );
    expect(merged.fontWeight).toBe('400');
  });
});
