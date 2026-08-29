import * as React from 'react';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_DARK, SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { contrastRatio } from '../../theme/color';
import { mixToken } from '../../primitives/internal/v4-depth';
import { TINT } from '../../primitives/internal/feedback-v4';
import type { ThemeSeed } from '../../theme/types';
import { StatusMessageV4 } from './StatusMessageV4';

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

function textStyle(node: ReactTestInstance): Record<string, unknown> {
  return flatten(node.props.style);
}

describe('StatusMessageV4 (native)', () => {
  it('loads with the kit spinner, which can honour Reduce Motion', () => {
    const { root } = renderThemed(<StatusMessageV4 state="loading" />, SEED_LIGHT);
    // The base used the platform ActivityIndicator, which spins regardless of
    // what the user has set (§36.10).
    expect(root.findAllByProps({ testID: 'xen-v4-spinner' }).length).toBeGreaterThan(0);
    // An ActivityIndicator reports itself through `animating`; the kit ring has
    // a real border and a transform instead.
    expect(root.findAll((n) => n.props?.animating !== undefined)).toHaveLength(0);
  });

  it('never shows a determinate bar — §36.7 forbids inventing a fraction', () => {
    const { root } = renderThemed(
      <StatusMessageV4 state="loading" message="Working" />,
      SEED_LIGHT
    );
    expect(root.findAll((n) => n.props?.accessibilityValue !== undefined)).toHaveLength(0);
  });

  it('promotes the empty copy out of the quietest type in the kit — §15', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { getByText } = renderThemed(
      <StatusMessageV4 state="empty" message="No habits yet" />,
      SEED_LIGHT
    );
    const style = textStyle(getByText('No habits yet'));
    expect(style.color).toBe(theme.light.onSurface);
    expect(style.color).not.toBe(theme.light.muted);
    expect(style.fontSize).toBe(theme.typography.scale.base);
  });

  it('gives a failure a body instead of red text in a void — §38', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { root } = renderThemed(<StatusMessageV4 state="error" />, SEED_LIGHT);
    const panel = root
      .findAll((n) => n.props?.style !== undefined)
      .map((n) => flatten(n.props.style))
      .find((s) => s.borderRadius !== undefined);
    expect(panel?.backgroundColor).toBe(
      mixToken(theme.light.surface, theme.light.danger, TINT)
    );
    // The edge is neutral: the tint already says which kind of container.
    expect(panel?.borderColor).toBe(theme.light.border);
  });

  it('labels the failure legibly on the panel it painted — both schemes', () => {
    ([SEED_LIGHT, SEED_DARK] as ThemeSeed[]).forEach((seed) => {
      (['light', 'dark'] as const).forEach((scheme) => {
        const { root, getByText } = renderThemed(
          <StatusMessageV4 state="error" message="Could not load" />,
          seed,
          scheme
        );
        const panel = root
          .findAll((n) => n.props?.style !== undefined)
          .map((n) => flatten(n.props.style))
          .find((s) => s.borderRadius !== undefined);
        const fg = textStyle(getByText('Could not load')).color as string;
        expect(contrastRatio(fg, panel?.backgroundColor as string)).toBeGreaterThanOrEqual(4.5);
      });
    });
  });

  it('announces each state the way a screen reader needs it', () => {
    const loading = renderThemed(<StatusMessageV4 state="loading" />, SEED_LIGHT);
    expect(
      loading.root.findAll((n) => n.props?.accessibilityLiveRegion === 'polite').length
    ).toBeGreaterThan(0);

    const error = renderThemed(<StatusMessageV4 state="error" />, SEED_LIGHT);
    expect(
      error.root.findAll((n) => n.props?.accessibilityRole === 'alert').length
    ).toBeGreaterThan(0);
  });

  it('falls back to copy for every state', () => {
    expect(
      renderThemed(<StatusMessageV4 state="empty" />, SEED_LIGHT).getByText('Nothing here yet.')
    ).toBeTruthy();
    expect(
      renderThemed(<StatusMessageV4 state="error" />, SEED_LIGHT).getByText(
        'Something went wrong.'
      )
    ).toBeTruthy();
  });
});
