import * as React from 'react';
import { Text } from 'react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_BOTH, SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { WATERMARK_ALPHA, WATERMARK_SCALE, WATERMARK_TILT } from './internal/identity-v4';
import { WatermarkV4 } from './WatermarkV4';

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

function overlay(root: ReactTestInstance): Record<string, unknown> {
  const found = root
    .findAll((n) => typeof n.type === 'string' && n.props?.style !== undefined)
    .map((n) => flat(n.props.style))
    .find((s) => s.opacity !== undefined);
  expect(found).toBeDefined();
  return found as Record<string, unknown>;
}

function tiles(root: ReactTestInstance): ReactTestInstance[] {
  return root.findAll(
    (n) => typeof n.type === 'string' && n.props?.children === 'CONFIDENTIAL'
  );
}

describe('WatermarkV4 (native)', () => {
  it('lays the tiles out as a lattice, not a wrapped blob', () => {
    const { root } = renderThemed(
      <WatermarkV4 text="CONFIDENTIAL" count={9}>
        <Text>doc</Text>
      </WatermarkV4>,
      SEED_LIGHT
    );
    // 9 tiles at 3 per row: explicit rows, so where they break no longer
    // depends on how wide the container happens to be.
    const rows = root
      .findAll((n) => typeof n.type === 'string' && n.props?.style?.flexDirection === 'row');
    expect(rows).toHaveLength(3);
    expect(tiles(root)).toHaveLength(9);
  });

  it('offsets every other row, so the lattice is a brick course', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { root } = renderThemed(
      <WatermarkV4 text="CONFIDENTIAL" count={9}>
        <Text>doc</Text>
      </WatermarkV4>,
      SEED_LIGHT
    );
    const offsets = root
      .findAll((n) => typeof n.type === 'string' && n.props?.style?.flexDirection === 'row')
      .map((n) => n.props.style.marginLeft as number);
    expect(offsets).toEqual([0, theme.spacing['2xl'], 0]);
  });

  it('renders exactly `count` tiles, and never fewer than one', () => {
    const at = (count: number): number =>
      tiles(
        renderThemed(
          <WatermarkV4 text="CONFIDENTIAL" count={count}>
            <Text>doc</Text>
          </WatermarkV4>,
          SEED_LIGHT
        ).root
      ).length;
    expect(at(24)).toBe(24);
    expect(at(7)).toBe(7);
    expect(at(0)).toBe(1);
    expect(at(-4)).toBe(1);
  });

  it('prints in the page’s own ink, so it is one strength in both schemes', () => {
    const theme = compileTheme(SEED_BOTH);
    (['light', 'dark'] as const).forEach((scheme) => {
      const { root } = renderThemed(
        <WatermarkV4 text="CONFIDENTIAL">
          <Text>doc</Text>
        </WatermarkV4>,
        SEED_BOTH,
        scheme
      );
      // `muted` is a MID tone: its distance from the page moves with the
      // scheme, so the same alpha was two different marks.
      const ink = flat(tiles(root)[0].props.style).color;
      expect(ink).toBe(theme[scheme].onSurface);
      expect(ink).not.toBe(theme[scheme].muted);
      expect(overlay(root).opacity).toBe(WATERMARK_ALPHA);
    });
  });

  it('tilts and oversizes by the shared constants', () => {
    const { root } = renderThemed(
      <WatermarkV4 text="CONFIDENTIAL">
        <Text>doc</Text>
      </WatermarkV4>,
      SEED_LIGHT
    );
    expect(overlay(root).transform).toEqual([
      { rotate: `${WATERMARK_TILT}deg` },
      { scale: WATERMARK_SCALE },
    ]);
  });

  it('takes no touches and is hidden from assistive tech', () => {
    const { root, getByText } = renderThemed(
      <WatermarkV4 text="CONFIDENTIAL">
        <Text>doc</Text>
      </WatermarkV4>,
      SEED_LIGHT
    );
    const layer = root.findAll(
      (n) => n.props?.importantForAccessibility === 'no-hide-descendants'
    )[0];
    expect(layer.props.pointerEvents).toBe('none');
    // The content underneath is untouched.
    expect(getByText('doc')).toBeTruthy();
  });
});
