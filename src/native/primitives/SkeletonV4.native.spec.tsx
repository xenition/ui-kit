import * as React from 'react';
import { AccessibilityInfo } from 'react-native';
import { waitFor } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { mixToken } from '../../primitives/internal/v4-depth';
import { SkeletonV4 } from './SkeletonV4';

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

/** Every block in the tree — the styled Views that carry a borderRadius. */
function blocks(root: ReactTestInstance): Record<string, unknown>[] {
  return root
    // Host views only — a composite and its host both carry the same `style`.
    .findAll((n) => typeof n.type === 'string' && n.props?.style !== undefined)
    .map((n) => flatten(n.props.style))
    .filter((s) => s.borderRadius !== undefined);
}

function peaks(root: ReactTestInstance): Record<string, unknown>[] {
  return root
    .findAllByProps({ testID: 'xen-v4-skeleton-peak' })
    .map((n) => flatten(n.props.style));
}

describe('SkeletonV4 (native)', () => {
  it('rests and peaks on two OPAQUE colours, never on transparency', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { root } = renderThemed(<SkeletonV4 />, SEED_LIGHT);
    // The base faded the block's own opacity to 0.4, turning the placeholder
    // into a window onto whatever it was sitting on.
    expect(blocks(root)[0]?.backgroundColor).toBe(
      mixToken(theme.light.surface, theme.light.onSurface, 0.08)
    );
    expect(peaks(root)[0]?.backgroundColor).toBe(
      mixToken(theme.light.surface, theme.light.onSurface, 0.16)
    );
  });

  it('never uses `muted` — that is the kit`s de-emphasised TEXT colour', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { root } = renderThemed(<SkeletonV4 />, SEED_LIGHT);
    blocks(root).forEach((b) => expect(b.backgroundColor).not.toBe(theme.light.muted));
  });

  it('takes the text line height from the scale it stands in for — §36.7', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { root } = renderThemed(<SkeletonV4 />, SEED_LIGHT);
    expect(blocks(root)[0]?.height).toBe(theme.typography.scale.sm);
  });

  it('matches the layout it replaces — N lines, the last one short', () => {
    const { root } = renderThemed(<SkeletonV4 lines={3} />, SEED_LIGHT);
    const widths = blocks(root).map((b) => b.width);
    expect(widths).toEqual(['100%', '100%', '60%']);
  });

  it('rounds each variant from the seed', () => {
    const theme = compileTheme(SEED_LIGHT);
    expect(blocks(renderThemed(<SkeletonV4 variant="circle" />, SEED_LIGHT).root)[0]?.borderRadius)
      .toBe(theme.radius.full);
    expect(blocks(renderThemed(<SkeletonV4 variant="rect" />, SEED_LIGHT).root)[0]?.borderRadius)
      .toBe(theme.radius.md);
    expect(blocks(renderThemed(<SkeletonV4 />, SEED_LIGHT).root)[0]?.borderRadius)
      .toBe(theme.radius.sm);
  });

  it('rests at its brighter end under Reduce Motion — §36.10', async () => {
    jest.spyOn(AccessibilityInfo, 'isReduceMotionEnabled').mockResolvedValue(true);
    const { root } = renderThemed(<SkeletonV4 />, SEED_LIGHT);
    await waitFor(() => expect(peaks(root)[0]?.opacity).toBe(1));
  });

  it('is hidden from assistive tech — a region announces busy, not its boxes', () => {
    const { root } = renderThemed(<SkeletonV4 lines={2} />, SEED_LIGHT);
    const container = root.findAll((n) => n.props?.accessibilityElementsHidden === true);
    expect(container.length).toBeGreaterThan(0);
    expect(container[0]?.props.importantForAccessibility).toBe('no-hide-descendants');
  });

  it('honours an explicit width and height', () => {
    const { root } = renderThemed(
      <SkeletonV4 variant="rect" width={120} height={60} />,
      SEED_LIGHT
    );
    expect(blocks(root)[0]?.width).toBe(120);
    expect(blocks(root)[0]?.height).toBe(60);
  });
});
