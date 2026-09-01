import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { CategoryTileV4 } from './CategoryTileV4';

const LIGHT = compileTheme(SEED_LIGHT).light;
const SPACING = compileTheme(SEED_LIGHT).spacing;

/** Flatten a possibly-nested RN `style` into one object. */
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

const fillsOf = (root: ReactTestInstance): unknown[] =>
  root.findAll((n) => n.props?.style !== undefined).map((n) => flat(n.props.style).backgroundColor);

describe('CategoryTileV4 (native)', () => {
  // ── §4.2 / the selected token ──────────────────────────────────────

  it('paints `card`, not the page colour', () => {
    const { UNSAFE_root } = renderThemed(<CategoryTileV4 label="Cameras" />, SEED_LIGHT);
    expect(fillsOf(UNSAFE_root)).toContain(LIGHT.card);
    expect(fillsOf(UNSAFE_root)).not.toContain(LIGHT.surface);
  });

  it('a selected tile uses the `selected` token pair, not a hand-mixed brand wash', () => {
    const { UNSAFE_root } = renderThemed(<CategoryTileV4 label="Cameras" selected />, SEED_LIGHT);
    const fills = fillsOf(UNSAFE_root);
    expect(fills).toContain(LIGHT.selected);
    // The base composed `withAlpha(colors.primary, 0.1)` — a translucent string,
    // not a pair with a contrast promise.
    expect(fills.some((f) => typeof f === 'string' && f.startsWith('rgba('))).toBe(false);
  });

  // ── rule 6: selection is not colour alone ──────────────────────────

  it('a selected tile shows a checkmark, not only a shade', () => {
    const on = renderThemed(<CategoryTileV4 label="Cameras" selected />, SEED_LIGHT);
    expect(on.queryByText('✓', { includeHiddenElements: true })).not.toBeNull();
    const off = renderThemed(<CategoryTileV4 label="Cameras" />, SEED_LIGHT);
    expect(off.queryByText('✓', { includeHiddenElements: true })).toBeNull();
  });

  // ── the new `iconName` prop ────────────────────────────────────────

  it('`iconName` resolves through the kit’s named set; `glyph` still wins', () => {
    expect(
      renderThemed(<CategoryTileV4 label="Cameras" iconName="camera" />, SEED_LIGHT).queryByText('📷', { includeHiddenElements: true })
    ).not.toBeNull();
    expect(
      renderThemed(
        <CategoryTileV4 label="Bikes" iconName="camera" glyph="🚲" />,
        SEED_LIGHT
      ).queryByText('🚲', { includeHiddenElements: true })
    ).not.toBeNull();
  });

  // ── the tap floor and the state layer ──────────────────────────────

  it('clears the 44 tap floor', () => {
    const { UNSAFE_root } = renderThemed(
      <CategoryTileV4 label="Cameras" variant="chip" />,
      SEED_LIGHT
    );
    const heights = UNSAFE_root
      .findAll((n) => n.props?.style !== undefined)
      .map((n) => flat(n.props.style).minHeight);
    // 44, composed as `2xl - xs` rather than typed.
    expect(heights).toContain(SPACING['2xl'] - SPACING.xs);
  });

  it('press feedback is the state layer, not an opacity dimmer', () => {
    const { getByRole, UNSAFE_root } = renderThemed(
      <CategoryTileV4 label="Cameras" onPress={() => {}} />,
      SEED_LIGHT
    );
    const target = getByRole('button');
    fireEvent(target, 'pressIn');
    const fills = fillsOf(UNSAFE_root);
    // The ground changed to the layer…
    expect(fills).not.toContain(LIGHT.card);
    // …and nothing was dimmed.
    const opacities = UNSAFE_root
      .findAll((n) => n.props?.style !== undefined)
      .map((n) => flat(n.props.style).opacity)
      .filter((o) => o !== undefined);
    expect(opacities).toHaveLength(0);
  });

  it('fires onPress', () => {
    const onPress = jest.fn();
    const { getByRole } = renderThemed(
      <CategoryTileV4 label="Cameras" onPress={onPress} />,
      SEED_LIGHT
    );
    fireEvent.press(getByRole('button'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  // ── the empty case ─────────────────────────────────────────────────

  it('renders nothing with neither a label nor a mark (§4.5)', () => {
    const { toJSON } = renderThemed(<CategoryTileV4 label="" />, SEED_LIGHT);
    expect(toJSON()).toBeNull();
  });

  it('a glyph with no label still renders', () => {
    const { queryByText } = renderThemed(<CategoryTileV4 label="" glyph="📷" />, SEED_LIGHT);
    expect(queryByText('📷', { includeHiddenElements: true })).not.toBeNull();
  });

  it('omits the count line when there is no count', () => {
    const { queryByText } = renderThemed(<CategoryTileV4 label="Cameras" />, SEED_LIGHT);
    expect(queryByText(/items$/)).toBeNull();
  });

  // ── the accessible label ───────────────────────────────────────────

  it('names itself with the label and the count, and carries the selected state', () => {
    const { getByLabelText } = renderThemed(
      <CategoryTileV4 label="Cameras" count={1234} selected onPress={() => {}} />,
      SEED_LIGHT
    );
    const el = getByLabelText('Cameras, 1,234 items');
    expect(el.props.accessibilityState.selected).toBe(true);
  });
});
