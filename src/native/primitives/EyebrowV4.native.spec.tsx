import * as React from 'react';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_BOTH, SEED_DARK, SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { contrastRatio } from '../../theme/color';
import { EYEBROW_TRACKING } from './internal/identity-v4';
import type { ThemeSeed } from '../../theme/types';
import type { EyebrowTone } from './Eyebrow';
import { EyebrowV4 } from './EyebrowV4';

const TONES: EyebrowTone[] = ['primary', 'accent', 'muted'];

function labelStyle(getByText: (t: string) => ReactTestInstance): Record<string, unknown> {
  const style = getByText('Now shipping').props.style as unknown;
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

describe('EyebrowV4 (native)', () => {
  it('clears AA on the page — every tone, every scheme', () => {
    ([SEED_LIGHT, SEED_DARK, SEED_BOTH] as ThemeSeed[]).forEach((seed) => {
      (['light', 'dark'] as const).forEach((scheme) => {
        const surface = compileTheme(seed)[scheme].surface;
        TONES.forEach((tone) => {
          const { getByText } = renderThemed(
            <EyebrowV4 tone={tone}>Now shipping</EyebrowV4>,
            seed,
            scheme
          );
          const color = labelStyle(getByText).color as string;
          expect(contrastRatio(color, surface)).toBeGreaterThanOrEqual(4.5);
        });
      });
    });
  });

  it('takes the TEXT form of a tone, not the fill it paints buttons with', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { getByText } = renderThemed(<EyebrowV4 tone="primary">Now shipping</EyebrowV4>, SEED_LIGHT);
    expect(labelStyle(getByText).color).toBe(theme.light.primaryText);
  });

  it('tracks from one ratio, so the twins cannot drift apart', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { getByText } = renderThemed(<EyebrowV4>Now shipping</EyebrowV4>, SEED_LIGHT);
    expect(labelStyle(getByText).letterSpacing).toBe(
      theme.typography.scale.xs * EYEBROW_TRACKING
    );
  });

  it('sets it in the heading face — a kicker is display type, not body', () => {
    const theme = compileTheme(SEED_DARK);
    const { getByText } = renderThemed(<EyebrowV4>Now shipping</EyebrowV4>, SEED_DARK);
    const style = labelStyle(getByText);
    expect(style.fontFamily).toBe(theme.typography.fontHeading);
    expect(style.textTransform).toBe('uppercase');
    expect(style.fontSize).toBe(theme.typography.scale.xs);
  });

  it('draws the flanking rule as a hairline that frames, not a second voice', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { root, getByText } = renderThemed(
      <EyebrowV4 rule>Now shipping</EyebrowV4>,
      SEED_LIGHT
    );
    const ticks = root
      .findAll((n) => typeof n.type === 'string' && n.props?.style?.height === 1)
      .map((n) => n.props.style as Record<string, unknown>);
    expect(ticks).toHaveLength(2);
    ticks.forEach((t) => {
      expect(t.backgroundColor).toBe(theme.light.border);
      // Not the label's own colour — that is what made it compete.
      expect(t.backgroundColor).not.toBe(labelStyle(getByText).color);
      expect(t.width).toBe(theme.spacing.lg);
    });
  });

  it('omits the rule unless asked', () => {
    const { root } = renderThemed(<EyebrowV4>Now shipping</EyebrowV4>, SEED_LIGHT);
    expect(root.findAll((n) => typeof n.type === 'string' && n.props?.style?.height === 1)).toHaveLength(0);
  });

  it('centres when asked and leads otherwise', () => {
    const justify = (align?: 'start' | 'center'): unknown => {
      const { root } = renderThemed(
        <EyebrowV4 align={align}>Now shipping</EyebrowV4>,
        SEED_LIGHT
      );
      return root.findAll((n) => typeof n.type === 'string')[0].props.style.justifyContent;
    };
    expect(justify('center')).toBe('center');
    expect(justify()).toBe('flex-start');
  });

  it('lets the caller override through `style`, as the base does', () => {
    const { getByText } = renderThemed(
      <EyebrowV4 style={{ fontWeight: '400' }}>Now shipping</EyebrowV4>,
      SEED_LIGHT
    );
    expect(labelStyle(getByText).fontWeight).toBe('400');
  });
});
