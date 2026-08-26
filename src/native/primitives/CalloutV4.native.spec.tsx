import * as React from 'react';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_DARK, SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { contrastRatio } from '../../theme/color';
import { mixToken } from '../../primitives/internal/v4-depth';
import { TINT, TINT_ASIDE } from '../../primitives/internal/feedback-v4';
import type { ThemeSeed } from '../../theme/types';
import type { CalloutTone } from './Callout';
import { CalloutV4 } from './CalloutV4';

const TONES: CalloutTone[] = ['info', 'success', 'warn', 'danger', 'neutral'];

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

function calloutStyle(root: ReactTestInstance): Record<string, unknown> {
  return flatten(root.findAll((n) => n.props?.style !== undefined)[0]?.props?.style);
}

function textColor(node: ReactTestInstance): string {
  return flatten(node.props.style).color as string;
}

describe('CalloutV4 (native)', () => {
  it('keeps the edge NEUTRAL — a tip is not an alert', () => {
    const theme = compileTheme(SEED_LIGHT);
    TONES.forEach((tone) => {
      const style = calloutStyle(
        renderThemed(<CalloutV4 tone={tone}>Body</CalloutV4>, SEED_LIGHT).root
      );
      // The base ringed the whole box in the tone, so a tip and a failed
      // payment were the same object at the same volume (§35.6).
      expect(style.borderColor).toBe(theme.light.border);
    });
  });

  it('washes the ground more faintly than an alert — the loudness ladder', () => {
    const theme = compileTheme(SEED_LIGHT);
    const bg = calloutStyle(
      renderThemed(<CalloutV4 tone="danger">Body</CalloutV4>, SEED_LIGHT).root
    ).backgroundColor as string;
    expect(bg).toBe(mixToken(theme.light.surface, theme.light.danger, TINT_ASIDE));
    expect(TINT_ASIDE).toBeLessThan(TINT);
  });

  it('leaves `neutral` untinted — a note with no tone is not a faint warning', () => {
    const theme = compileTheme(SEED_LIGHT);
    const style = calloutStyle(
      renderThemed(<CalloutV4 tone="neutral">Body</CalloutV4>, SEED_LIGHT).root
    );
    expect(style.backgroundColor).toBe(theme.light.surface);
  });

  it('titles with the contrast-safe TEXT form, never the fill', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { getByText } = renderThemed(
      <CalloutV4 tone="success" title="Tip">
        Body
      </CalloutV4>,
      SEED_LIGHT
    );
    expect(textColor(getByText('Tip'))).not.toBe(theme.light.success);
  });

  it('clears AA on the wash it painted — every tone and scheme', () => {
    ([SEED_LIGHT, SEED_DARK] as ThemeSeed[]).forEach((seed) => {
      (['light', 'dark'] as const).forEach((scheme) => {
        TONES.forEach((tone) => {
          const { root, getByText } = renderThemed(
            <CalloutV4 tone={tone} title="Heading">
              Body
            </CalloutV4>,
            seed,
            scheme
          );
          const bg = calloutStyle(root).backgroundColor as string;
          expect(contrastRatio(textColor(getByText('Heading')), bg)).toBeGreaterThanOrEqual(4.5);
          expect(contrastRatio(textColor(getByText('Body')), bg)).toBeGreaterThanOrEqual(4.5);
        });
      });
    });
  });

  it('carries no shadow and no gradient — an aside is in the page', () => {
    const style = calloutStyle(renderThemed(<CalloutV4>Body</CalloutV4>, SEED_LIGHT).root);
    expect(style.shadowOpacity).toBeUndefined();
    expect(style.elevation).toBeUndefined();
  });

  it('takes its radius and padding from the seed', () => {
    const sharp: ThemeSeed = { ...SEED_LIGHT, shape: 'sharp' };
    const theme = compileTheme(sharp);
    const style = calloutStyle(renderThemed(<CalloutV4>Body</CalloutV4>, sharp).root);
    expect(style.borderRadius).toBe(theme.radius.md);
    expect(style.padding).toBe(theme.spacing.md);
  });
});
