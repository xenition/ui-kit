import * as React from 'react';
import type { ReactTestInstance } from 'react-test-renderer';
import {
  SEED_LIGHT,
  SEED_DARK,
  SEED_BOTH,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { contrastRatio } from '../../theme/color';
import { resolveIconGlyph } from '../../primitives/icon-names';
import type { ThemeSeed } from '../../theme/types';
import { AuthBrandTileV4 } from './AuthBrandTileV4';

const THEME = compileTheme(SEED_LIGHT);

/** `SEED_DARK` is the `sharp` seed — the one whose whole radius scale is 0. */
const SHARP = compileTheme(SEED_DARK);

/** Three brand hues, so a contrast claim is a claim about the compiler. */
const SEEDS: ThemeSeed[] = [SEED_LIGHT, SEED_DARK, SEED_BOTH];

/** One style object, arrays flattened in order so later entries win. */
function flat(style: unknown): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  const walk = (s: unknown): void => {
    if (!s) return;
    if (Array.isArray(s)) {
      s.forEach(walk);
      return;
    }
    if (typeof s === 'object') Object.assign(out, s as Record<string, unknown>);
  };
  walk(style);
  return out;
}

/** The tile itself: the one box that carries a fill and a square. */
function tile(root: ReactTestInstance): Record<string, unknown> {
  const hit = root.findAll((node) => {
    const style = flat((node.props as { style?: unknown } | undefined)?.style);
    return style.backgroundColor !== undefined && typeof style.width === 'number';
  })[0];
  expect(hit).toBeDefined();
  return flat((hit.props as { style?: unknown }).style);
}

/** The mark inside it — the only node in the tree carrying a `fontSize`. */
function mark(root: ReactTestInstance): Record<string, unknown> {
  const hit = root.findAll((node) => {
    const style = flat((node.props as { style?: unknown } | undefined)?.style);
    return typeof style.fontSize === 'number';
  })[0];
  expect(hit).toBeDefined();
  return flat((hit.props as { style?: unknown }).style);
}

describe('AuthBrandTileV4 (native)', () => {
  it('renders NOTHING when there is neither a glyph nor a name — §12', () => {
    // The kit ships no brand marks, so "this app has no mark" is a state the
    // tile has to survive. An empty 56pt primary square is worse than no
    // square: it reads as a picture that failed to load.
    expect(renderThemed(<AuthBrandTileV4 />, SEED_LIGHT).toJSON()).toBeNull();

    // Not merely "no tile" — nothing at all, whatever the other props say.
    expect(
      renderThemed(<AuthBrandTileV4 align="center" size="lg" shape="circle" />, SEED_LIGHT).toJSON()
    ).toBeNull();
  });

  it('draws the mark when it is given one, either way round', () => {
    const glyphed = renderThemed(<AuthBrandTileV4 glyph="🌱" />, SEED_LIGHT);
    expect(glyphed.getByText('🌱', { includeHiddenElements: true })).toBeTruthy();

    const named = renderThemed(<AuthBrandTileV4 name="home" />, SEED_LIGHT);
    expect(
      named.getByText(resolveIconGlyph('home'), { includeHiddenElements: true })
    ).toBeTruthy();
  });

  it('composes the square from the SPACING SCALE, landing on §9’s 56', () => {
    // The base typed `56`. This is the same 56 — derived, so a seed that
    // re-scales its rhythm re-scales the tile with the fields beneath it.
    expect(THEME.spacing['2xl'] + THEME.spacing.sm).toBe(56);
    const { root } = renderThemed(<AuthBrandTileV4 glyph="🌱" />, SEED_LIGHT);
    const style = tile(root);
    expect(style.width).toBe(56);
    // A square, not a rectangle: both axes read the same sum.
    expect(style.height).toBe(style.width);
  });

  it('offers §3’s hero size, and it is a bigger square from the same scale', () => {
    expect(THEME.spacing['2xl'] + THEME.spacing.lg).toBe(72);
    const { root } = renderThemed(<AuthBrandTileV4 glyph="🌱" size="lg" />, SEED_LIGHT);
    const style = tile(root);
    expect(style.width).toBe(72);
    expect(style.height).toBe(72);
  });

  it('steps the mark up with the square so it keeps its share of the tile', () => {
    // `2xl` inside 56 and `3xl` inside 72 are both ~43% — the mark reads as
    // centred in a tile rather than as a glyph that happens to be in a box.
    const md = renderThemed(<AuthBrandTileV4 glyph="🌱" />, SEED_LIGHT);
    const lg = renderThemed(<AuthBrandTileV4 glyph="🌱" size="lg" />, SEED_LIGHT);
    expect(mark(md.root).fontSize).toBe(THEME.typography.scale['2xl']);
    expect(mark(lg.root).fontSize).toBe(THEME.typography.scale['3xl']);
    const mdShare = THEME.typography.scale['2xl'] / (THEME.spacing['2xl'] + THEME.spacing.sm);
    const lgShare = THEME.typography.scale['3xl'] / (THEME.spacing['2xl'] + THEME.spacing.lg);
    expect(mdShare).toBeCloseTo(lgShare, 1);
  });

  it('keeps §9’s rounded square by default and offers §3’s medallion', () => {
    const square = renderThemed(<AuthBrandTileV4 glyph="🌱" />, SEED_LIGHT);
    expect(tile(square.root).borderRadius).toBe(THEME.radius.lg);

    const disc = renderThemed(<AuthBrandTileV4 glyph="🌱" shape="circle" />, SEED_LIGHT);
    const style = tile(disc.root);
    // Half the box the component already owns — NOT `radius.full`, and…
    expect(style.borderRadius).toBe((style.width as number) / 2);
    expect(style.borderRadius).not.toBe(THEME.radius.full);
  });

  it('…and the reason is that `radius.full` is 0 on a sharp seed', () => {
    // The Addendum records the same trap for `Switch`. A ratio of the box is
    // geometry (§10.1); a radius token that squares off the one round thing
    // on the screen is a bug.
    expect(SHARP.radius.full).toBe(0);
    const { root } = renderThemed(<AuthBrandTileV4 glyph="🌱" shape="circle" />, SEED_DARK);
    const style = tile(root);
    expect(style.width).toBe(SHARP.spacing['2xl'] + SHARP.spacing.sm);
    expect(style.borderRadius).toBe((style.width as number) / 2);
    expect(style.borderRadius).toBeGreaterThan(0);
  });

  it('fills with `primary` and marks in `onPrimary` — the one guaranteed pair', () => {
    const { root } = renderThemed(<AuthBrandTileV4 glyph="🌱" />, SEED_LIGHT);
    expect(tile(root).backgroundColor).toBe(THEME.light.primary);
    expect(mark(root).color).toBe(THEME.light.onPrimary);
  });

  it('and that pair clears AA on every brand hue, in both schemes', () => {
    // The tempting alternative — §8’s `primary[50]` ground with the mark in
    // `primary` — measures 1.72:1 on the teal seed in light, under the 3:1 a
    // non-text graphic must clear. This is why the tile has no soft variant.
    SEEDS.forEach((seed) => {
      const theme = compileTheme(seed);
      expect(contrastRatio(theme.light.onPrimary, theme.light.primary)).toBeGreaterThanOrEqual(4.5);
      expect(contrastRatio(theme.dark.onPrimary, theme.dark.primary)).toBeGreaterThanOrEqual(4.5);
    });
  });

  it('sits top-LEFT by default — §9 is explicit that it is not centred', () => {
    const { root } = renderThemed(<AuthBrandTileV4 glyph="🌱" />, SEED_LIGHT);
    expect(tile(root).alignSelf).toBe('flex-start');
  });

  it('centres deliberately when asked', () => {
    const { root } = renderThemed(<AuthBrandTileV4 glyph="🌱" align="center" />, SEED_LIGHT);
    expect(tile(root).alignSelf).toBe('center');
  });

  it('centres the mark inside the square at either size', () => {
    const { root } = renderThemed(<AuthBrandTileV4 glyph="🌱" size="lg" />, SEED_LIGHT);
    const style = tile(root);
    expect(style.alignItems).toBe('center');
    expect(style.justifyContent).toBe('center');
  });

  it('announces a label when given one, and is decorative otherwise', () => {
    const labelled = renderThemed(
      <AuthBrandTileV4 glyph="🌱" accessibilityLabel="Acme" />,
      SEED_LIGHT
    );
    expect(labelled.getByLabelText('Acme')).toBeTruthy();

    const plain = renderThemed(<AuthBrandTileV4 glyph="🌱" />, SEED_LIGHT);
    expect(plain.queryByLabelText('Acme')).toBeNull();
    // Decorative: the mark is hidden from the screen reader entirely.
    const glyph = plain.getByText('🌱', { includeHiddenElements: true });
    expect(glyph.props.accessibilityElementsHidden).toBe(true);
  });

  it('takes a style for layout without losing its own', () => {
    const { root } = renderThemed(
      <AuthBrandTileV4 glyph="🌱" style={{ marginBottom: 24 }} />,
      SEED_LIGHT
    );
    const style = tile(root);
    expect(style.marginBottom).toBe(24);
    expect(style.backgroundColor).toBe(THEME.light.primary);
    expect(style.width).toBe(56);
  });

  it('paints only from the theme — every colour traces to a token', () => {
    const { root } = renderThemed(
      <AuthBrandTileV4 glyph="🌱" size="lg" shape="circle" />,
      SEED_LIGHT
    );
    const allowed = tokenHexSet(SEED_LIGHT);
    renderedStyleHexes(root).forEach((hex) => expect(allowed.has(hex)).toBe(true));
  });
});
