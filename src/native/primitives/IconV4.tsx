import * as React from 'react';
import { Text, View, type StyleProp, type TextStyle, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { mixToken } from '../../primitives/internal/v4-depth';
import { ensureContrast } from '../../theme/color';
import { MIN_CONTRAST } from '../../theme/compile';
import { resolveIconGlyph } from '../../primitives/icon-names';
import type { IconProps } from './Icon';

/** How a badge is filled. `undefined` — the default — draws no badge at all. */
export type IconBadge = 'soft' | 'solid';

/** The badge silhouette: §8's circle, or §9's rounded brand tile. */
export type IconBadgeShape = 'circle' | 'rounded';

export interface IconV4Props extends IconProps {
  /**
   * Draw the glyph inside a tinted ground — `ONBOARDING-DESIGN-SPEC.md` §8's
   * feature-row badge (`'soft'`) or §9's brand tile (`'solid'`).
   *
   * Omitted by default, so an `IconV4` with no badge renders exactly what the
   * base `Icon` renders.
   */
  badge?: IconBadge;
  /**
   * Badge silhouette. `'circle'` (default) is §8's circular badge; `'rounded'`
   * is §9's rounded square, on `radius.lg`. Ignored when there is no `badge`.
   */
  badgeShape?: IconBadgeShape;
}

/**
 * The counter-slot of every icon colour — what a `solid` badge draws its glyph
 * in once the slot itself has become the fill. Symmetric by construction: a
 * `primary` glyph on a `primary` tile becomes `onPrimary`, and an `onPrimary`
 * glyph becomes `primary`. Anything with no natural counter falls back to
 * `surface`, and `ensureContrast` walks it from there.
 */
const ON_SLOT: Partial<Record<keyof SemanticColors, keyof SemanticColors>> = {
  onSurface: 'surface',
  onPrimary: 'primary',
  primary: 'onPrimary',
  muted: 'surface',
  success: 'onSuccess',
  onSuccess: 'success',
  warn: 'onWarn',
  onWarn: 'warn',
  danger: 'onDanger',
  onDanger: 'danger',
};

/**
 * How much tone a `soft` badge carries — the same 14% `BadgeV4` uses, so a
 * feature-row badge and a soft badge beside it are the same wash rather than
 * two neighbouring shades of nearly-the-same.
 */
const SOFT_MIX = 0.14;

/**
 * §8's badge is 44×44 and §2 keeps every control at a 44 minimum, so this is
 * the named control constant the spec allows — the one bare number in the
 * file, and it is a control metric rather than a colour, a spacing or a radius.
 * The badge grows past it only when the glyph itself is large enough to need
 * the room; the padding around the glyph is `spacing.sm`, from the scale.
 */
const BADGE_MIN = 44;

/**
 * **V4 icon** — the native twin of the web `IconV4`, the base {@link Icon}'s
 * props plus an optional tinted ground, a different design line.
 *
 * Two things change, and both come straight out of `ONBOARDING-DESIGN-SPEC.md`.
 *
 * 1. **The badge.** §8's feature row and §9's sign-in tile are the same object
 *    at two settings — a glyph sitting inside a shape that carries the tone —
 *    and every screen in the onboarding and auth families reaches for one. It
 *    lives here rather than being redrawn in each composite, because it was
 *    redrawn in each composite and they did not match. `badge="soft"` is §8
 *    (a wash, the tone as the glyph); `badge="solid"` is §9 (the tone as the
 *    fill, its guaranteed on-pair as the glyph). `badgeShape` picks the
 *    silhouette.
 *
 *    The ground is **composited opaquely** rather than taken from
 *    `primary[50]`, which is the literal reading of §8. React Native has no
 *    `color-mix()` at all, so a translucent wash there is not even expressible
 *    without `withAlpha` — and a translucent wash reads correctly over exactly
 *    one ground while the glyph's legibility was measured against that one
 *    ground too. `mixToken` at {@link SOFT_MIX} lands where `primary[50]` lands
 *    on a light page, resolves per scheme rather than per ramp orientation, and
 *    — because the component now owns its ground — lets the glyph be
 *    re-measured against it with `ensureContrast` instead of inheriting a
 *    promise about `surface`.
 *
 * 2. **The empty state.** `<Icon />` with neither `glyph` nor `name` renders
 *    the empty string, so it collapses to nothing and the row it was aligning
 *    loses its rhythm — §12 says every component has to survive that. V4 keeps
 *    the box and draws a hollow ring in the icon's own colour at M3's
 *    disabled-content opacity: present enough to hold the column, quiet enough
 *    that nobody mistakes it for content. It stays hidden from the screen
 *    reader — an absent icon has nothing to announce.
 *
 * A circle is drawn from its own diameter rather than from `radius.full`, for
 * the reason the spec addendum already records for `Switch`: `radius.full`
 * compiles to `0` on a `sharp` seed, and §8's badge is a circle in every brand.
 * `badgeShape="rounded"` is the case that genuinely wants a radius token, and
 * it takes `radius.lg`.
 */
export function IconV4({
  glyph,
  name,
  size = 'lg',
  color = 'onSurface',
  badge,
  badgeShape = 'circle',
  accessibilityLabel,
  style,
}: IconV4Props): React.ReactElement {
  const { colors, tokens, state } = useXenitionTheme();

  const fontSize = typeof size === 'number' ? size : tokens.typography.scale[size];
  const decorative = accessibilityLabel == null;
  const mark = glyph ?? (name != null ? resolveIconGlyph(name) : '');
  const empty = mark === '';

  const a11y = {
    accessibilityRole: decorative ? undefined : ('image' as const),
    accessibilityLabel,
    accessibilityElementsHidden: decorative,
    importantForAccessibility: (decorative ? 'no-hide-descendants' : 'yes') as
      | 'no-hide-descendants'
      | 'yes',
  };

  let ground: string | null = null;
  let ink = colors[color];
  if (badge !== undefined) {
    ground =
      badge === 'solid' ? colors[color] : mixToken(colors.surface, colors[color], SOFT_MIX);
    const seed = badge === 'solid' ? colors[ON_SLOT[color] ?? 'surface'] : colors[color];
    // A glyph is often the only label a control carries, so it is held to the
    // text bar rather than to 1.4.11's 3:1 for a decorative graphic.
    ink = ensureContrast(seed, ground, MIN_CONTRAST);
  }

  /** The hollow ring that stands in for an absent glyph — §12, not a hole. */
  const ring = (
    <View
      style={{
        width: fontSize,
        height: fontSize,
        // Geometry, not a radius token: `radius.full` compiles to 0 on a
        // `sharp` seed and this mark is a circle in every brand.
        borderRadius: fontSize / 2,
        borderWidth: 1,
        borderColor: ink,
        opacity: state.disabledContent,
      }}
    />
  );

  const glyphStyle: TextStyle = {
    fontSize,
    lineHeight: fontSize * 1.1,
    color: ink,
    textAlign: 'center',
  };

  if (badge === undefined) {
    // Unbadged and non-empty is the base rendering, node for node — the
    // additive rule: a caller who passes no V4 prop gets no V4 change.
    if (!empty) {
      return (
        <Text {...a11y} allowFontScaling={false} style={[glyphStyle, style]}>
          {mark}
        </Text>
      );
    }
    return (
      <View
        {...a11y}
        style={[{ alignItems: 'center', justifyContent: 'center' }, style as StyleProp<ViewStyle>]}
      >
        {ring}
      </View>
    );
  }

  // Grows only when the glyph needs the room; the padding is `spacing.sm`, and
  // the floor is §8's 44.
  const diameter = Math.max(BADGE_MIN, fontSize + tokens.spacing.sm * 2);

  return (
    <View
      {...a11y}
      style={[
        {
          width: diameter,
          height: diameter,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: ground as string,
          borderRadius: badgeShape === 'circle' ? diameter / 2 : tokens.radius.lg,
        },
        // `style` is typed `TextStyle` for parity with the base `Icon`; badged,
        // the component's own box is this container, so that is where a caller's
        // width/height override has to land.
        style as StyleProp<ViewStyle>,
      ]}
    >
      {empty ? (
        ring
      ) : (
        <Text allowFontScaling={false} style={glyphStyle}>
          {mark}
        </Text>
      )}
    </View>
  );
}
