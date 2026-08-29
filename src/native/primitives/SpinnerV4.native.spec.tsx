import * as React from 'react';
import { AccessibilityInfo } from 'react-native';
import { waitFor } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { contrastRatio } from '../../theme/color';
import { mixToken } from '../../primitives/internal/v4-depth';
import type { SpinnerSize } from './Spinner';
import { SpinnerV4 } from './SpinnerV4';

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

function ringStyle(root: ReactTestInstance): Record<string, unknown> {
  return flatten(root.findByProps({ testID: 'xen-v4-spinner' }).props.style);
}

describe('SpinnerV4 (native)', () => {
  it('draws its own ring instead of the platform indicator', () => {
    const { root } = renderThemed(<SpinnerV4 />, SEED_LIGHT);
    const style = ringStyle(root);
    // An ActivityIndicator has no border and cannot be stopped; this can.
    expect(style.borderWidth).toBeGreaterThan(0);
    expect(style.borderTopColor).toBeDefined();
  });

  it('sizes from the spacing scale — the base 16/24/32, now as tokens', () => {
    const theme = compileTheme(SEED_LIGHT);
    const expected: Record<SpinnerSize, number> = {
      sm: theme.spacing.md,
      md: theme.spacing.lg,
      lg: theme.spacing.xl,
    };
    (['sm', 'md', 'lg'] as SpinnerSize[]).forEach((size) => {
      const style = ringStyle(renderThemed(<SpinnerV4 size={size} />, SEED_LIGHT).root);
      expect(style.width).toBe(expected[size]);
      expect(style.height).toBe(expected[size]);
      expect(style.borderRadius).toBe(expected[size] / 2);
    });
  });

  it('keeps the ring one hue family, not a grey hoop with a chip on it', () => {
    const theme = compileTheme(SEED_LIGHT);
    const style = ringStyle(renderThemed(<SpinnerV4 />, SEED_LIGHT).root);
    expect(style.borderColor).toBe(mixToken(theme.light.surface, theme.light.primary, 0.2));
  });

  it('holds the bright arc to 3:1 against its own track — a meaningful graphic', () => {
    (['light', 'dark'] as const).forEach((scheme) => {
      const style = ringStyle(renderThemed(<SpinnerV4 />, SEED_LIGHT, scheme).root);
      expect(
        contrastRatio(style.borderTopColor as string, style.borderColor as string)
      ).toBeGreaterThanOrEqual(3);
    });
  });

  it('stops turning under Reduce Motion but stays a spinner — §36.10', async () => {
    jest.spyOn(AccessibilityInfo, 'isReduceMotionEnabled').mockResolvedValue(true);
    const { root } = renderThemed(<SpinnerV4 />, SEED_LIGHT);
    await waitFor(() => expect(ringStyle(root).transform).toEqual([]));
    // The ring is still brighter on one side, which reads as "working" with no
    // movement at all — the information survives the loss of the animation.
    const style = ringStyle(root);
    expect(style.borderTopColor).not.toBe(style.borderColor);
  });

  it('turns when motion is allowed', async () => {
    const { root } = renderThemed(<SpinnerV4 />, SEED_LIGHT);
    await waitFor(() =>
      expect((ringStyle(root).transform as unknown[]).length).toBeGreaterThan(0)
    );
  });

  it('announces itself as busy without needing a visible label', () => {
    const { root } = renderThemed(<SpinnerV4 />, SEED_LIGHT);
    const node = root.findByProps({ testID: 'xen-v4-spinner' });
    expect(node.props.accessibilityRole).toBe('progressbar');
    expect(node.props.accessibilityLabel).toBe('Loading');
  });

});
