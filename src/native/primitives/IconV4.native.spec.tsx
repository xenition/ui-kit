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
import { contrastRatio } from '../../theme/color';
import { mixToken } from '../../primitives/internal/v4-depth';
import { ICON_GLYPHS } from '../../primitives/icon-names';
import type { ThemeSeed } from '../../theme/types';
import { Icon } from './Icon';
import { IconV4 } from './IconV4';

/** A `sharp` seed — where `radius.full` compiles to 0 and a pill stops being one. */
const SHARP_SEED: ThemeSeed = { ...SEED_LIGHT, shape: 'sharp' };

const LIGHT = toNativeTokens(compileTheme(SEED_LIGHT));
const COLORS = LIGHT.colors.light;

/** Every flattened style object in the tree, outermost first. */
function styles(root: ReactTestInstance): Record<string, unknown>[] {
  return root
    .findAll((n) => n.props?.style !== undefined)
    .map((n) => {
      const merged: Record<string, unknown> = {};
      const walk = (style: unknown): void => {
        if (!style) return;
        if (Array.isArray(style)) {
          style.forEach(walk);
          return;
        }
        if (typeof style === 'object') Object.assign(merged, style as Record<string, unknown>);
      };
      walk(n.props.style);
      return merged;
    });
}

/** The badge container — the only box that carries a `backgroundColor`. */
function badge(root: ReactTestInstance): Record<string, unknown> {
  const found = styles(root).find((s) => s.backgroundColor !== undefined);
  expect(found).toBeDefined();
  return found as Record<string, unknown>;
}

/** The glyph box — the only style that carries a `fontSize`. */
function glyph(root: ReactTestInstance): Record<string, unknown> {
  const found = styles(root).find((s) => s.fontSize !== undefined);
  expect(found).toBeDefined();
  return found as Record<string, unknown>;
}

/** The hollow empty-state ring — bordered, and never carrying a glyph. */
function ring(root: ReactTestInstance): Record<string, unknown> | undefined {
  return styles(root).find((s) => s.borderWidth === 1 && s.fontSize === undefined);
}

const TONES = ['primary', 'success', 'warn', 'danger', 'onSurface', 'muted'] as const;

describe('IconV4 (native)', () => {
  describe('the base rendering, unchanged', () => {
    it('resolves a name through the kit set and lets `glyph` win', () => {
      // The glyph is decorative, so it is hidden from the a11y tree by design.
      const seen = (ui: React.ReactElement): unknown =>
        renderThemed(ui, SEED_LIGHT).root.findAll((n) => typeof n.props?.children === 'string')[0]
          ?.props.children;
      expect(seen(<IconV4 name="close" />)).toBe(ICON_GLYPHS.close);
      expect(seen(<IconV4 name="close" glyph="🫐" />)).toBe('🫐');
      // An unrecognised name still renders as-is — the pre-named-set behaviour.
      expect(seen(<IconV4 name={'🎈' as never} />)).toBe('🎈');
    });

    it(`renders the base Icon glyph box node for node when no V4 prop is passed`, () => {
      const base = glyph(renderThemed(<Icon name="home" color="primary" />, SEED_LIGHT).root);
      const v4 = glyph(renderThemed(<IconV4 name="home" color="primary" />, SEED_LIGHT).root);
      expect(v4).toEqual(base);
    });

    it('takes its size from the type scale, or a raw px number', () => {
      expect(glyph(renderThemed(<IconV4 name="home" size="2xl" />, SEED_LIGHT).root).fontSize).toBe(
        LIGHT.typography.scale['2xl']
      );
      expect(glyph(renderThemed(<IconV4 name="home" size={28} />, SEED_LIGHT).root).fontSize).toBe(28);
    });

    it('is decorative unless it is given a label', () => {
      const quiet = renderThemed(<IconV4 name="home" />, SEED_LIGHT);
      expect(quiet.queryByLabelText('Home')).toBeNull();
      const spoken = renderThemed(<IconV4 name="home" accessibilityLabel="Home" />, SEED_LIGHT);
      expect(spoken.getByLabelText('Home')).toBeTruthy();
      expect(spoken.getByLabelText('Home').props.accessibilityRole).toBe('image');
    });
  });

  describe('the empty state (§12)', () => {
    it('holds the box with a ring rather than collapsing to nothing', () => {
      const { root } = renderThemed(<IconV4 />, SEED_LIGHT);
      const mark = ring(root);
      expect(mark).toBeDefined();
      expect(mark?.width).toBe(LIGHT.typography.scale.lg);
      expect(mark?.height).toBe(LIGHT.typography.scale.lg);
      expect(mark?.opacity).toBe(LIGHT.state.disabledContent);
    });

    it('draws the ring as a circle from its own diameter, not from `radius.full`', () => {
      const sharp = toNativeTokens(compileTheme(SHARP_SEED));
      const mark = ring(renderThemed(<IconV4 />, SHARP_SEED).root);
      expect(sharp.radius.full).toBe(0);
      expect(mark?.borderRadius).toBe(sharp.typography.scale.lg / 2);
    });

    it('treats an empty `glyph` and an empty `name` as absent too', () => {
      expect(ring(renderThemed(<IconV4 glyph="" />, SEED_LIGHT).root)).toBeDefined();
      expect(ring(renderThemed(<IconV4 name={'' as never} />, SEED_LIGHT).root)).toBeDefined();
      expect(ring(renderThemed(<IconV4 name="home" />, SEED_LIGHT).root)).toBeUndefined();
    });

    it('stays hidden from the screen reader — an absent icon has nothing to announce', () => {
      const { root } = renderThemed(<IconV4 />, SEED_LIGHT);
      const hidden = root.findAll((n) => n.props?.accessibilityElementsHidden === true);
      expect(hidden.length).toBeGreaterThan(0);
    });

    it('still survives with a badge — a badge with no glyph is not a hole either', () => {
      const { root } = renderThemed(<IconV4 badge="soft" color="primary" />, SEED_LIGHT);
      expect(badge(root).backgroundColor).toBe(mixToken(COLORS.surface, COLORS.primary, 0.14));
      expect(ring(root)).toBeDefined();
    });
  });

  describe('the badge (§8 / §9)', () => {
    it('draws nothing extra by default — the additive rule', () => {
      const { root } = renderThemed(<IconV4 name="star" />, SEED_LIGHT);
      expect(styles(root).find((s) => s.backgroundColor !== undefined)).toBeUndefined();
    });

    it('composites a soft ground opaquely rather than reaching for `primary[50]`', () => {
      const { root } = renderThemed(<IconV4 name="sparkle" color="primary" badge="soft" />, SEED_LIGHT);
      expect(badge(root).backgroundColor).toBe(mixToken(COLORS.surface, COLORS.primary, 0.14));
      // Not the ramp step §8 names literally: `tokens.ramps` carries the LIGHT
      // orientation in both schemes, so it cannot be a per-scheme ground.
      expect(badge(root).backgroundColor).not.toBe(LIGHT.ramps.primary[50]);
    });

    it('resolves per scheme, so a dark page gets a dark wash', () => {
      const dark = toNativeTokens(compileTheme(SEED_DARK)).colors.dark;
      const { root } = renderThemed(
        <IconV4 name="sparkle" color="primary" badge="soft" />,
        SEED_DARK,
        'dark'
      );
      expect(badge(root).backgroundColor).toBe(mixToken(dark.surface, dark.primary, 0.14));
    });

    it('fills solid with the tone and labels it with the guaranteed on-pair', () => {
      const { root } = renderThemed(<IconV4 name="lock" color="primary" badge="solid" />, SEED_LIGHT);
      expect(badge(root).backgroundColor).toBe(COLORS.primary);
      expect(contrastRatio(glyph(root).color as string, COLORS.primary)).toBeGreaterThanOrEqual(4.5);
    });

    it('re-measures the glyph against the ground it derived, every tone, both fills', () => {
      TONES.forEach((color) => {
        (['soft', 'solid'] as const).forEach((fill) => {
          const { root } = renderThemed(
            <IconV4 name="check" color={color} badge={fill} />,
            SEED_LIGHT
          );
          expect(
            contrastRatio(glyph(root).color as string, badge(root).backgroundColor as string)
          ).toBeGreaterThanOrEqual(4.5);
        });
      });
    });

    it('sizes from the spacing scale with the 44 control floor', () => {
      const floor = (size: 'sm' | 'lg' | '3xl'): unknown =>
        badge(renderThemed(<IconV4 name="check" size={size} badge="soft" />, SEED_LIGHT).root).width;
      // Small and default glyphs both land exactly on §8's 44.
      expect(floor('sm')).toBe(44);
      expect(floor('lg')).toBe(44);
      // A large glyph grows the badge by `spacing.sm` on each side, from the scale.
      expect(floor('3xl')).toBe(LIGHT.typography.scale['3xl'] + LIGHT.spacing.sm * 2);
    });

    it('is a circle by geometry, not by `radius.full` — which a sharp seed zeroes', () => {
      const sharp = toNativeTokens(compileTheme(SHARP_SEED));
      const box = badge(renderThemed(<IconV4 name="check" badge="soft" />, SHARP_SEED).root);
      expect(sharp.radius.full).toBe(0);
      expect(box.borderRadius).toBe((box.width as number) / 2);
    });

    it('takes `radius.lg` for the §9 rounded tile', () => {
      const box = badge(
        renderThemed(<IconV4 name="lock" badge="solid" badgeShape="rounded" />, SEED_LIGHT).root
      );
      expect(box.borderRadius).toBe(LIGHT.radius.lg);
    });

    it(`lets a caller override the badge box, which is the component own box`, () => {
      const box = badge(
        renderThemed(
          <IconV4 name="lock" badge="solid" style={{ width: 56, height: 56 }} />,
          SEED_LIGHT
        ).root
      );
      expect(box.width).toBe(56);
      expect(box.height).toBe(56);
    });
  });

  it('traces every colour to a token — no hardcoded hex anywhere', () => {
    const allowed = tokenHexSet(SEED_DARK);
    // Unbadged: the badge's ink is `ensureContrast`-walked, which is a
    // derivation OF a token rather than a token, and would fail a set check.
    const { root } = renderThemed(
      <IconV4 name="check" color="success" size="2xl" />,
      SEED_DARK,
      'dark'
    );
    const hexes = renderedStyleHexes(root);
    expect(hexes.length).toBeGreaterThan(0);
    hexes.forEach((hex) => expect(allowed.has(hex)).toBe(true));
  });
});
