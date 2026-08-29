import * as React from 'react';
import type { ReactTestInstance } from 'react-test-renderer';
import { fireEvent } from '@testing-library/react-native';
import { SEED_BOTH, SEED_DARK, SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { contrastRatio } from '../../theme/color';
import { gradientInk } from '../../primitives/internal/v4-depth';
import type { ThemeSeed } from '../../theme/types';
import { FloatButtonV4 } from './FloatButtonV4';
import { V4_STATE } from '../../primitives/internal/v4-state';

function flat(style: unknown): Record<string, unknown> {
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

/** The animated shell — the node that carries the anchor and the elevation. */
function shell(root: ReactTestInstance): Record<string, unknown> {
  const found = root
    .findAll((n) => typeof n.type === 'string' && n.props?.style !== undefined)
    .map((n) => flat(n.props.style))
    .find((s) => s.position === 'absolute');
  expect(found).toBeDefined();
  return found as Record<string, unknown>;
}

/** The `expo-linear-gradient` mock renders with `accessibilityLabel`. */
function stops(root: ReactTestInstance): string[] {
  const node = root.findAll((n) => n.props?.colors !== undefined)[0];
  expect(node).toBeDefined();
  return node.props.colors as string[];
}

describe('FloatButtonV4 (native)', () => {
  it('carries the brand gradient — the one place §35.11 allows it', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { root } = renderThemed(<FloatButtonV4 label="New" />, SEED_LIGHT);
    const legible = gradientInk(theme.lightGradient.brand, theme.light.onPrimary, {
      darkest: theme.ramps.neutral[950],
      lightest: theme.ramps.neutral[50],
    });
    expect(stops(root)).toEqual([legible.from, legible.to]);
  });

  it('labels against BOTH stops, not against one flat colour', () => {
    ([SEED_LIGHT, SEED_DARK, SEED_BOTH] as ThemeSeed[]).forEach((seed) => {
      (['light', 'dark'] as const).forEach((scheme) => {
        const { root, getByText } = renderThemed(
          <FloatButtonV4 label="New" />,
          seed,
          scheme
        );
        const ink = flat(getByText('New').props.style).color as string;
        stops(root).forEach((stop) => {
          expect(contrastRatio(ink, stop)).toBeGreaterThanOrEqual(4.5);
        });
      });
    });
  });

  it('lifts on `elevation.action`, whose opacity is HIGHER in dark', () => {
    const theme = compileTheme(SEED_BOTH);
    const light = shell(renderThemed(<FloatButtonV4 label="New" />, SEED_BOTH, 'light').root);
    const dark = shell(renderThemed(<FloatButtonV4 label="New" />, SEED_BOTH, 'dark').root);
    expect(light.shadowOpacity).toBe(theme.lightElevation.action.opacity);
    expect(dark.shadowOpacity).toBe(theme.darkElevation.action.opacity);
    // The base hand-picked 0.3 with `ramps.neutral[950]` — the LIGHT
    // orientation in both schemes, and the same alpha on either page.
    expect(dark.shadowOpacity as number).toBeGreaterThan(light.shadowOpacity as number);
    expect(light.shadowColor).toBe(theme.lightElevation.action.color);
  });

  it('sits back down when held, instead of dimming to look disabled', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { root, getByLabelText } = renderThemed(<FloatButtonV4 label="New" />, SEED_LIGHT);
    expect(shell(root).opacity).toBe(1);
    fireEvent(getByLabelText('New'), 'pressIn');
    expect(shell(root).shadowOpacity).toBe(theme.lightElevation.action.opacity * 0.5);
    fireEvent(getByLabelText('New'), 'pressOut');
    expect(shell(root).shadowOpacity).toBe(theme.lightElevation.action.opacity);
    // The base dipped to 0.85 on press, which reads as "disabled", not "pushed".
    expect(shell(root).opacity).toBe(1);
  });

  it('goes flat on a flat seed with no branch — the tokens are already inert', () => {
    const flatSeed: ThemeSeed = { ...SEED_LIGHT, depth: 'flat' };
    const { root } = renderThemed(<FloatButtonV4 label="New" />, flatSeed);
    const [from, to] = stops(root);
    expect(from).toBe(to);
    expect(shell(root).shadowOpacity).toBe(0);
  });

  it('clears the touch minimum, and the safe-area inset above it', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { root, getByLabelText } = renderThemed(<FloatButtonV4 label="New" />, SEED_LIGHT);
    const target = flat(getByLabelText('New').props.style);
    expect(target.minHeight).toBe(theme.spacing['2xl'] + theme.spacing.sm);
    expect(target.minHeight as number).toBeGreaterThanOrEqual(44);
    // The mocked safe-area context contributes a fixed bottom inset.
    expect(shell(root).bottom as number).toBeGreaterThanOrEqual(theme.spacing.xl);
  });

  it('anchors by placement, on the spacing scale', () => {
    const theme = compileTheme(SEED_LIGHT);
    const right = shell(renderThemed(<FloatButtonV4 label="New" />, SEED_LIGHT).root);
    expect(right.right).toBe(theme.spacing.lg);
    const left = shell(
      renderThemed(<FloatButtonV4 label="New" placement="bottom-left" />, SEED_LIGHT).root
    );
    expect(left.left).toBe(theme.spacing.lg);
    const centre = shell(
      renderThemed(<FloatButtonV4 label="New" placement="bottom-center" />, SEED_LIGHT).root
    );
    expect(centre.alignSelf).toBe('center');
  });

  it('is a circle without a label and a pill with one', () => {
    const theme = compileTheme(SEED_LIGHT);
    const size = theme.spacing['2xl'] + theme.spacing.sm;
    const bare = renderThemed(<FloatButtonV4 accessibilityLabel="Add" />, SEED_LIGHT);
    expect(flat(bare.getByLabelText('Add').props.style).width).toBe(size);
    const pill = renderThemed(<FloatButtonV4 label="New note" />, SEED_LIGHT);
    const style = flat(pill.getByLabelText('New note').props.style);
    expect(style.width).toBeUndefined();
    expect(style.paddingHorizontal).toBe(theme.spacing.lg);
  });

  it('presses, and stops pressing when disabled', () => {
    const onPress = jest.fn();
    const live = renderThemed(<FloatButtonV4 label="New" onPress={onPress} />, SEED_LIGHT);
    fireEvent.press(live.getByLabelText('New'));
    expect(onPress).toHaveBeenCalledTimes(1);

    const dead = renderThemed(<FloatButtonV4 label="New" onPress={onPress} disabled />, SEED_LIGHT);
    fireEvent.press(dead.getByLabelText('New'));
    expect(onPress).toHaveBeenCalledTimes(1);
    expect(shell(dead.root).opacity).toBe(V4_STATE.disabledContent);
  });
});
