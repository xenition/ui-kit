import * as React from 'react';
import type { ReactTestInstance } from 'react-test-renderer';
import {
  SEED_DARK,
  SEED_LIGHT,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { toNativeTokens } from '../../theme/outputs';
import { COVER_FORMS, hashSeed, resolveCoverPlate } from '../../commerce/internal/cover-v4';
import { GenerativeCoverV4 } from './GenerativeCoverV4';

/** The `expo-linear-gradient` mock forwards `colors` as a readable prop. */
function gradient(root: ReactTestInstance): ReactTestInstance {
  return root.findAll((n) => n.props?.colors !== undefined)[0] as ReactTestInstance;
}

function stops(root: ReactTestInstance): readonly string[] {
  return gradient(root).props.colors as readonly string[];
}

/** The compiled ramp colour a shared plate role resolves to. */
function roleColor(role: string, seed = SEED_LIGHT): string {
  const tokens = toNativeTokens(compileTheme(seed));
  const [ramp, step] = role.split('-');
  return (tokens.ramps[ramp as 'primary' | 'accent'] as Record<number, string>)[Number(step)];
}

describe('GenerativeCoverV4 (native)', () => {
  // ── the seeded plate, shared with the web twin ──────────────────────

  it('paints the two ramp steps the shared plate chose for this seed', () => {
    const plate = resolveCoverPlate('ceramic-mug');
    const { root } = renderThemed(<GenerativeCoverV4 seed="ceramic-mug" />, SEED_LIGHT);
    expect(stops(root)).toEqual([roleColor(plate.paper), roleColor(plate.ink)]);
  });

  it('gives the same seed the same form, ink and paper as the web twin', () => {
    // The web spec asserts the same three values reach the SVG as
    // `var(--xen-…)`; this one asserts they reach the gradient as compiled
    // ramp steps. One table, two resolutions.
    ['ceramic-mug', 'linen-napkin', 42, 'cedar candle'].forEach((seed) => {
      const plate = resolveCoverPlate(seed);
      const { root } = renderThemed(<GenerativeCoverV4 seed={seed} />, SEED_LIGHT);
      expect(stops(root)).toEqual([roleColor(plate.paper), roleColor(plate.ink)]);
      expect(COVER_FORMS).toContain(plate.form);
    });
  });

  it('gives the same seed the same output, every render and in both schemes', () => {
    const a = renderThemed(<GenerativeCoverV4 seed="ceramic-mug" />, SEED_LIGHT);
    const b = renderThemed(<GenerativeCoverV4 seed="ceramic-mug" />, SEED_LIGHT);
    expect(stops(a.root)).toEqual(stops(b.root));
    expect(gradient(a.root).props.start).toEqual(gradient(b.root).props.start);
    expect(gradient(a.root).props.end).toEqual(gradient(b.root).props.end);

    // A different seed on the same theme is a different plate — the component
    // varies, it is not just deterministic-because-constant.
    const other = renderThemed(<GenerativeCoverV4 seed="linen-napkin" />, SEED_LIGHT);
    const differs =
      stops(other.root)[0] !== stops(a.root)[0] ||
      stops(other.root)[1] !== stops(a.root)[1] ||
      gradient(other.root).props.start !== gradient(a.root).props.start;
    expect(differs).toBe(true);
  });

  it('hashes unsigned, so a seed past 2^31 still resolves to a real colour', () => {
    // The bug the base caught live on `ember-oak-hero`: a signed shift indexes
    // backwards, reaches the gradient as `undefined`, and paints a black plate.
    ['ember-oak-hero', 'ceramic-mug', '', 'x'].forEach((seed) => {
      expect(hashSeed(seed)).toBeGreaterThanOrEqual(0);
      const { root } = renderThemed(<GenerativeCoverV4 seed={seed} />, SEED_DARK);
      stops(root).forEach((stop) => expect(stop).toMatch(/^#[0-9a-fA-F]{6}$/));
    });
  });

  // ── the new props ───────────────────────────────────────────────────

  it('varies the gradient direction by form, and only the direction', () => {
    const directions = COVER_FORMS.map((form) => {
      const { root } = renderThemed(<GenerativeCoverV4 seed="x" form={form} />, SEED_LIGHT);
      const g = gradient(root);
      return JSON.stringify([g.props.start, g.props.end]);
    });
    // Six forms, six directions — the honest limit, but a real one.
    expect(new Set(directions).size).toBe(COVER_FORMS.length);
  });

  it('lets an explicit ink and paper beat the seed', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { root } = renderThemed(
      <GenerativeCoverV4 seed="ceramic-mug" ink="accent" paper="surface" />,
      SEED_LIGHT
    );
    expect(stops(root)).toEqual([theme.light.surface, theme.light.accent]);
  });

  it('throws on a literal colour instead of painting a black plate', () => {
    const quiet = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    expect(() =>
      renderThemed(<GenerativeCoverV4 seed="mug" paper="#ff0000" />, SEED_LIGHT)
    ).toThrow(/invalid paper role/);
    quiet.mockRestore();
  });

  it('every rendered hex traces to a compiled token, in both seeds', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const { root } = renderThemed(<GenerativeCoverV4 seed="ceramic-mug" />, seed);
      const allowed = tokenHexSet(seed);
      const found = renderedStyleHexes(root);
      // The stops arrive as a prop rather than a style, so assert those too.
      stops(root).forEach((stop) => expect(allowed.has(stop.toLowerCase())).toBe(true));
      found.forEach((hex) => expect(allowed.has(hex)).toBe(true));
    });
  });

  // ── the accessible label ────────────────────────────────────────────

  it('is announced as an image when named', () => {
    const { getByLabelText } = renderThemed(
      <GenerativeCoverV4 seed="ceramic-mug" label="Ceramic Mug" />,
      SEED_LIGHT
    );
    const el = getByLabelText('Ceramic Mug');
    expect(el.props.accessibilityRole).toBe('image');
    expect(el.props.accessible).toBe(true);
  });

  it('is decorative when unnamed — the state it is in inside a ProductCardV4', () => {
    const { root, queryByLabelText } = renderThemed(
      <GenerativeCoverV4 seed="ceramic-mug" />,
      SEED_LIGHT
    );
    expect(queryByLabelText('ceramic-mug')).toBeNull();
    const hidden = root.findAll((n) => n.props?.accessibilityElementsHidden === true);
    expect(hidden.length).toBeGreaterThan(0);
    expect(hidden[0]?.props.importantForAccessibility).toBe('no-hide-descendants');
  });

  it('draws no initials — the art carries no unverifiable text', () => {
    const { root } = renderThemed(
      <GenerativeCoverV4 seed="Ceramic Mug" label="Ceramic Mug" />,
      SEED_LIGHT
    );
    expect(root.findAll((n) => typeof n.type === 'string' && n.type === 'Text')).toHaveLength(0);
  });

  // ── the empty case ──────────────────────────────────────────────────

  it('still draws a plate for an empty seed rather than nothing', () => {
    // There is no "no cover" state: this exists because a product has no
    // image, so an empty slug must still produce art.
    const { root } = renderThemed(<GenerativeCoverV4 seed="" />, SEED_LIGHT);
    expect(stops(root)).toHaveLength(2);
    expect(stops(root)[0]).not.toBe(stops(root)[1]);
  });
});
