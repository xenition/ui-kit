import * as React from 'react';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_DARK, SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { contrastRatio } from '../../theme/color';
import type { ThemeSeed } from '../../theme/types';
import { RatingV4 } from './RatingV4';

function flatten(style: unknown): Record<string, unknown> {
  const merged: Record<string, unknown> = {};
  const walk = (s: unknown): void => {
    if (!s) return;
    if (Array.isArray(s)) {
      s.forEach(walk);
      return;
    }
    if (typeof s === 'object') Object.assign(merged, s as Record<string, unknown>);
  };
  walk(style);
  return merged;
}

function fillWidth(root: ReactTestInstance): string {
  return flatten(root.findByProps({ testID: 'xen-v4-rating-fill' }).props.style).width as string;
}

/** Every star glyph in the tree, in render order. */
function starColors(root: ReactTestInstance): string[] {
  return root
    // Host text nodes only — a composite and its host both carry the glyph.
    .findAll(
      (n) => typeof n.type === 'string' && n.props?.children === '★' && n.props?.style !== undefined
    )
    .map((n) => flatten(n.props.style).color as string);
}

describe('RatingV4 (native)', () => {
  it('draws the exact fraction, not the nearest whole star', () => {
    // 4.2 of 5 is 84% of the row. The base rounded it to four stars, so a 4.2
    // and a 4.4 were the same picture beside two different numbers.
    expect(fillWidth(renderThemed(<RatingV4 value={4.2} />, SEED_LIGHT).root)).toBe('84%');
    expect(fillWidth(renderThemed(<RatingV4 value={4.4} />, SEED_LIGHT).root)).toBe('88%');
    expect(fillWidth(renderThemed(<RatingV4 value={3} />, SEED_LIGHT).root)).toBe('60%');
  });

  it('clamps a value outside the scale', () => {
    expect(fillWidth(renderThemed(<RatingV4 value={-1} />, SEED_LIGHT).root)).toBe('0%');
    expect(fillWidth(renderThemed(<RatingV4 value={99} />, SEED_LIGHT).root)).toBe('100%');
    expect(fillWidth(renderThemed(<RatingV4 value={2} max={0} />, SEED_LIGHT).root)).toBe('0%');
  });

  it('fills with `accentText`, never the raw `accent` fill', () => {
    const theme = compileTheme(SEED_LIGHT);
    const colors = starColors(renderThemed(<RatingV4 value={5} />, SEED_LIGHT).root);
    expect(colors).toContain(theme.light.accentText);
    expect(colors).not.toContain(theme.light.accent);
  });

  it('keeps both rows legible on the page — both seeds, both schemes', () => {
    ([SEED_LIGHT, SEED_DARK] as ThemeSeed[]).forEach((seed) => {
      (['light', 'dark'] as const).forEach((scheme) => {
        const theme = compileTheme(seed);
        const colors = starColors(renderThemed(<RatingV4 value={3.5} />, seed, scheme).root);
        colors.forEach((c) => {
          // A FILLED star is a glyph carrying the value, held at the text
          // threshold. An empty one is the unfilled half of a meaningful
          // graphic, judged at 3:1 — `muted` is a de-emphasis, by design.
          const floor = c === theme[scheme].accentText ? 4.5 : 3;
          expect(contrastRatio(c, theme[scheme].surface)).toBeGreaterThanOrEqual(floor);
        });
      });
    });
  });

  it('draws `max` empty glyphs and `max` filled ones behind the clip', () => {
    const { root } = renderThemed(<RatingV4 value={2} max={7} />, SEED_LIGHT);
    expect(starColors(root)).toHaveLength(14);
  });

  it('announces the exact value once, not a run of glyphs', () => {
    const { root } = renderThemed(<RatingV4 value={4.2} />, SEED_LIGHT);
    const labelled = root.findAll((n) => n.props?.accessibilityLabel !== undefined);
    expect(labelled[0]?.props.accessibilityLabel).toBe('4.2 out of 5 stars');
    expect(labelled).toHaveLength(1);
  });

  it('takes a custom label', () => {
    const { root } = renderThemed(<RatingV4 value={4} label="Rated 4 by 12 people" />, SEED_LIGHT);
    expect(
      root.findAll((n) => n.props?.accessibilityLabel === 'Rated 4 by 12 people').length
    ).toBeGreaterThan(0);
  });

  it('sizes from the typography scale', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { root } = renderThemed(<RatingV4 value={3} size="lg" />, SEED_LIGHT);
    const star = root.findAll(
      (n) => typeof n.type === 'string' && n.props?.children === '★' && n.props?.style !== undefined
    )[0];
    expect(flatten(star?.props.style).fontSize).toBe(theme.typography.scale.xl);
  });

  it('shows the numeric value when asked', () => {
    const { getByText } = renderThemed(<RatingV4 value={4.2} showValue />, SEED_LIGHT);
    expect(getByText('4.2')).toBeTruthy();
  });
});
