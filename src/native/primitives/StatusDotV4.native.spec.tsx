import * as React from 'react';
import { AccessibilityInfo } from 'react-native';
import { waitFor } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_DARK, SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { contrastRatio } from '../../theme/color';
import type { ThemeSeed } from '../../theme/types';
import type { StatusDotTone } from './StatusDot';
import { StatusDotV4 } from './StatusDotV4';

const TONES: StatusDotTone[] = ['success', 'warn', 'danger', 'primary', 'accent', 'muted'];

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

function fillStyle(root: ReactTestInstance): Record<string, unknown> {
  return flatten(root.findByProps({ testID: 'xen-v4-status-fill' }).props.style);
}

describe('StatusDotV4 (native)', () => {
  it('draws the mark in the TEXT form of its slot, never the raw fill', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { root } = renderThemed(<StatusDotV4 tone="warn" />, SEED_LIGHT);
    // `warn` is a background colour with no promise against `surface`; at eight
    // pixels on a light page that is a dot nobody can find.
    expect(fillStyle(root).backgroundColor).toBe(theme.light.warnText);
  });

  it('clears AA against the page — every tone and scheme', () => {
    ([SEED_LIGHT, SEED_DARK] as ThemeSeed[]).forEach((seed) => {
      (['light', 'dark'] as const).forEach((scheme) => {
        const theme = compileTheme(seed);
        TONES.forEach((tone) => {
          const { root } = renderThemed(<StatusDotV4 tone={tone} />, seed, scheme);
          // `muted` is the one tone with no `*Text` form to take: it means "no
          // status", the compiler makes no AA promise for it, and a non-text
          // mark is judged at 3:1. The five that carry meaning clear 4.5.
          const floor = tone === 'muted' ? 3 : 4.5;
          expect(
            contrastRatio(fillStyle(root).backgroundColor as string, theme[scheme].surface)
          ).toBeGreaterThanOrEqual(floor);
        });
      });
    });
  });

  it('sizes from the spacing scale — the 8 the base hard-coded', () => {
    const theme = compileTheme(SEED_LIGHT);
    expect(fillStyle(renderThemed(<StatusDotV4 />, SEED_LIGHT).root).width).toBe(
      theme.spacing.sm
    );
    expect(fillStyle(renderThemed(<StatusDotV4 size={20} />, SEED_LIGHT).root).width).toBe(20);
  });

  it('echoes only when asked, and never under Reduce Motion — §36.10', async () => {
    const on = renderThemed(<StatusDotV4 />, SEED_LIGHT);
    expect(on.root.findAllByProps({ testID: 'xen-v4-status-echo' }).length).toBeGreaterThan(0);

    const off = renderThemed(<StatusDotV4 pulse={false} />, SEED_LIGHT);
    expect(off.root.findAllByProps({ testID: 'xen-v4-status-echo' })).toHaveLength(0);

    jest.spyOn(AccessibilityInfo, 'isReduceMotionEnabled').mockResolvedValue(true);
    const reduced = renderThemed(<StatusDotV4 />, SEED_LIGHT);
    await waitFor(() =>
      expect(reduced.root.findAllByProps({ testID: 'xen-v4-status-echo' })).toHaveLength(0)
    );
    // The solid dot still carries the state without the movement.
    expect(fillStyle(reduced.root).backgroundColor).toBeDefined();
  });

  it('is decorative without a label and announced with one', () => {
    const bare = renderThemed(<StatusDotV4 />, SEED_LIGHT);
    expect(
      bare.root.findAll((n) => n.props?.importantForAccessibility === 'no-hide-descendants').length
    ).toBeGreaterThan(0);

    const named = renderThemed(<StatusDotV4 label="Live" />, SEED_LIGHT);
    expect(named.root.findAll((n) => n.props?.accessibilityLabel === 'Live').length)
      .toBeGreaterThan(0);
  });

  it('keeps the echo in the dot`s own colour — one mark, not two', () => {
    const { root } = renderThemed(<StatusDotV4 tone="danger" />, SEED_LIGHT);
    const echo = flatten(root.findByProps({ testID: 'xen-v4-status-echo' }).props.style);
    expect(echo.backgroundColor).toBe(fillStyle(root).backgroundColor);
  });
});
