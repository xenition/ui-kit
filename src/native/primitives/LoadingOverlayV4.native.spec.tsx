import * as React from 'react';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_DARK, SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { contrastRatio } from '../../theme/color';
import type { ThemeSeed } from '../../theme/types';
import { LoadingOverlayV4 } from './LoadingOverlayV4';

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

function byTestId(root: ReactTestInstance, id: string): Record<string, unknown> {
  return flatten(root.findByProps({ testID: id }).props.style);
}

describe('LoadingOverlayV4 (native)', () => {
  it('renders nothing when not visible', () => {
    const { toJSON } = renderThemed(<LoadingOverlayV4 visible={false} />, SEED_LIGHT);
    expect(toJSON()).toBeNull();
  });

  it('never builds the scrim from `onSurface` — that inverts into a white veil', () => {
    (['light', 'dark'] as const).forEach((scheme) => {
      const theme = compileTheme(SEED_LIGHT);
      const { root } = renderThemed(<LoadingOverlayV4 visible />, SEED_LIGHT, scheme);
      const scrim = byTestId(root, 'xen-v4-overlay-scrim').backgroundColor as string;
      expect(scrim).not.toContain(theme[scheme].onSurface.replace('#', ''));
      // Built from the shadow colour, which does not invert.
      expect(scrim).toMatch(/^rgba\(/);
    });
  });

  it('keeps the scrim dark in BOTH schemes, so the page always recedes', () => {
    ([SEED_LIGHT, SEED_DARK] as ThemeSeed[]).forEach((seed) => {
      (['light', 'dark'] as const).forEach((scheme) => {
        const { root } = renderThemed(<LoadingOverlayV4 visible />, seed, scheme);
        const scrim = byTestId(root, 'xen-v4-overlay-scrim').backgroundColor as string;
        const [r, g, b] = scrim.match(/\d+/g)!.slice(0, 3).map(Number);
        // Near-black in every combination. The base painted this near-white in
        // dark mode and then put a dark card on top of it.
        expect(r + g + b).toBeLessThan(120);
      });
    });
  });

  it('is the ONE component in the feedback line that takes a layer', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { root } = renderThemed(<LoadingOverlayV4 visible />, SEED_LIGHT);
    const panel = byTestId(root, 'xen-v4-overlay-panel');
    // `elevation.sheet` — the same token ModalV4 takes, for the same reason.
    expect(panel.shadowRadius).toBe(theme.lightElevation.sheet.radius);
    expect(panel.shadowColor).toBe(theme.lightElevation.sheet.color);
  });

  it('goes flat with the seed and needs no branch to do it', () => {
    const flat: ThemeSeed = { ...SEED_LIGHT, depth: 'flat' };
    const { root } = renderThemed(<LoadingOverlayV4 visible />, flat);
    expect(byTestId(root, 'xen-v4-overlay-panel').shadowOpacity).toBe(0);
  });

  it('labels legibly on the panel — `onSurface`, never `muted`', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { root, getByText } = renderThemed(
      <LoadingOverlayV4 visible label="Saving your work" />,
      SEED_LIGHT
    );
    const panel = byTestId(root, 'xen-v4-overlay-panel');
    const color = flatten(getByText('Saving your work').props.style).color as string;
    expect(color).toBe(theme.light.onSurface);
    expect(color).not.toBe(theme.light.muted);
    expect(contrastRatio(color, panel.backgroundColor as string)).toBeGreaterThanOrEqual(4.5);
  });

  it('uses the kit spinner, which can honour Reduce Motion', () => {
    const { root } = renderThemed(<LoadingOverlayV4 visible />, SEED_LIGHT);
    expect(root.findAllByProps({ testID: 'xen-v4-spinner' }).length).toBeGreaterThan(0);
    expect(root.findAll((n) => n.props?.animating !== undefined)).toHaveLength(0);
  });

  it('announces one busy region, not two', () => {
    const { root } = renderThemed(<LoadingOverlayV4 visible label="Loading" />, SEED_LIGHT);
    const hidden = root.findAll(
      (n) => n.props?.importantForAccessibility === 'no-hide-descendants'
    );
    expect(hidden.length).toBeGreaterThan(0);
  });

  it('rounds and pads from the seed', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { root } = renderThemed(<LoadingOverlayV4 visible />, SEED_LIGHT);
    const panel = byTestId(root, 'xen-v4-overlay-panel');
    expect(panel.borderRadius).toBe(theme.radius.lg);
    expect(panel.paddingHorizontal).toBe(theme.spacing.xl);
  });
});
