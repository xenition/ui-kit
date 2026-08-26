import * as React from 'react';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_DARK, SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { contrastRatio } from '../../theme/color';
import { mixToken } from '../../primitives/internal/v4-depth';
import { TINT } from '../../primitives/internal/feedback-v4';
import type { ThemeSeed } from '../../theme/types';
import type { ProgressTone } from './Progress';
import { ProgressV4 } from './ProgressV4';

const TONES: ProgressTone[] = ['primary', 'success', 'warn', 'danger'];

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

function trackStyle(root: ReactTestInstance): Record<string, unknown> {
  return flatten(root.findAll((n) => n.props?.style !== undefined)[0]?.props?.style);
}

function fillStyle(root: ReactTestInstance): Record<string, unknown> {
  return flatten(root.findByProps({ testID: 'xen-v4-progress-fill' }).props.style);
}

describe('ProgressV4 (native)', () => {
  it('routes `warn` to the WARN slot, never to the brand accent — §35.4', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { root } = renderThemed(<ProgressV4 value={50} tone="warn" />, SEED_LIGHT);
    // The base said "no warning slot in the primitive token whitelist". There
    // is one, and its own web twin was already using it.
    expect(fillStyle(root).backgroundColor).not.toBe(theme.light.accent);
    expect(trackStyle(root).backgroundColor).toBe(
      mixToken(theme.light.surface, theme.light.warn, TINT)
    );
  });

  it('builds the track from the fill`s own tone — one colour, two strengths', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { root } = renderThemed(<ProgressV4 value={40} tone="success" />, SEED_LIGHT);
    expect(trackStyle(root).backgroundColor).toBe(
      mixToken(theme.light.surface, theme.light.success, TINT)
    );
    // Opaque: the bar looks the same on a card, on glass and on the page.
    expect(trackStyle(root).backgroundColor).toMatch(/^#[0-9a-f]{6}$/i);
    expect(trackStyle(root).backgroundColor).not.toBe(theme.light.border);
  });

  it('holds the boundary between done and not-done to 3:1 — every tone, scheme', () => {
    ([SEED_LIGHT, SEED_DARK] as ThemeSeed[]).forEach((seed) => {
      (['light', 'dark'] as const).forEach((scheme) => {
        TONES.forEach((tone) => {
          const { root } = renderThemed(
            <ProgressV4 value={60} tone={tone} />,
            seed,
            scheme
          );
          expect(
            contrastRatio(
              fillStyle(root).backgroundColor as string,
              trackStyle(root).backgroundColor as string
            )
          ).toBeGreaterThanOrEqual(3);
        });
      });
    });
  });

  it('makes a started task look started, and a zero task look zero', () => {
    const theme = compileTheme(SEED_LIGHT);
    const started = fillStyle(renderThemed(<ProgressV4 value={1} />, SEED_LIGHT).root);
    expect(started.width).toBe('1%');
    // A floor at the bar's own thickness — never enough to read as a quantity.
    expect(started.minWidth).toBe(theme.spacing.sm);

    const zero = fillStyle(renderThemed(<ProgressV4 value={0} />, SEED_LIGHT).root);
    expect(zero.width).toBe('0%');
    expect(zero.minWidth).toBe(0);
  });

  it('clamps out-of-range values', () => {
    expect(fillStyle(renderThemed(<ProgressV4 value={-5} />, SEED_LIGHT).root).width).toBe('0%');
    expect(fillStyle(renderThemed(<ProgressV4 value={500} />, SEED_LIGHT).root).width).toBe(
      '100%'
    );
    expect(
      fillStyle(renderThemed(<ProgressV4 value={5} max={0} />, SEED_LIGHT).root).width
    ).toBe('0%');
  });

  it('takes its thickness from the spacing scale', () => {
    const theme = compileTheme(SEED_LIGHT);
    expect(trackStyle(renderThemed(<ProgressV4 value={1} size="sm" />, SEED_LIGHT).root).height)
      .toBe(theme.spacing.xs);
    expect(trackStyle(renderThemed(<ProgressV4 value={1} />, SEED_LIGHT).root).height)
      .toBe(theme.spacing.sm);
  });

  it('squares its ends on a sharp seed instead of defaulting to a capsule — §8', () => {
    const sharp: ThemeSeed = { ...SEED_LIGHT, shape: 'sharp' };
    expect(trackStyle(renderThemed(<ProgressV4 value={50} />, sharp).root).borderRadius).toBe(0);
  });

  it('carries no gradient and no shadow — the length is the whole message', () => {
    const { root } = renderThemed(<ProgressV4 value={50} />, SEED_LIGHT);
    expect(trackStyle(root).shadowOpacity).toBeUndefined();
    expect(fillStyle(root).backgroundColor).toMatch(/^#[0-9a-f]{6}$/i);
  });

  it('reports its value to assistive tech', () => {
    const { root } = renderThemed(<ProgressV4 value={30} max={60} />, SEED_LIGHT);
    const bar = root.find((n) => n.props?.accessibilityRole === 'progressbar');
    expect(bar.props.accessibilityValue).toEqual({ min: 0, max: 60, now: 30 });
  });
});
