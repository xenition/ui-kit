import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from './cn';
import { mixToken, useOptionalCompiledTheme } from './internal/v4-depth';
import { transitionCss } from './internal/v4-motion';
import { V4_STATE } from './internal/v4-state';
import { ensureContrast } from '../theme/color';
import { MIN_CONTRAST } from '../theme/compile';
import { resolveIconGlyph } from './icon-names';
import type { SemanticColors } from '../theme/types';
import type { IconColor, IconProps, IconSize } from './Icon';

export type { IconColor, IconSize };

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

const SIZE_CLASS: Record<IconSize, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
};

const COLOR_CLASS: Record<IconColor, string> = {
  onSurface: 'text-on-surface',
  onPrimary: 'text-on-primary',
  primary: 'text-primary',
  muted: 'text-muted',
  success: 'text-success',
  onSuccess: 'text-on-success',
  warn: 'text-warn',
  onWarn: 'text-on-warn',
  danger: 'text-danger',
  onDanger: 'text-on-danger',
};

/** The same ten slots as `--xen-*` custom properties, for the no-provider path. */
const COLOR_VAR: Record<IconColor, string> = {
  onSurface: 'var(--xen-on-surface)',
  onPrimary: 'var(--xen-on-primary)',
  primary: 'var(--xen-primary)',
  muted: 'var(--xen-muted)',
  success: 'var(--xen-success)',
  onSuccess: 'var(--xen-on-success)',
  warn: 'var(--xen-warn)',
  onWarn: 'var(--xen-on-warn)',
  danger: 'var(--xen-danger)',
  onDanger: 'var(--xen-on-danger)',
};

/**
 * The counter-slot of every icon colour — what a `solid` badge draws its glyph
 * in once the slot itself has become the fill. Symmetric by construction: a
 * `primary` glyph on a `primary` tile becomes `onPrimary`, and an `onPrimary`
 * glyph becomes `primary`.
 */
const ON_SLOT: Record<IconColor, keyof SemanticColors> = {
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
const BADGE_MIN_PX = 44;

/**
 * Every rule here needs something a utility class bound to a token cannot say:
 * a `max()`/`calc()` diameter, a `[data-theme="dark"]` switch, `border-radius:
 * 50%` (a *circle*, which is geometry rather than a radius token), and
 * `currentColor`. Every colour in the sheet is a custom property — a `--xen-*`
 * token or a `--xen-v4-*` this component derived from the compiled theme — so
 * the no-literal-colours rule holds.
 */
const ICON_V4_CSS = `
[data-xen-v4-icon] {
  --xen-v4-icon-d: max(${BADGE_MIN_PX}px, calc(1em + var(--xen-space-sm) * 2));
}
[data-xen-v4-icon][data-badge] {
  box-sizing: border-box;
  flex-shrink: 0;
  width: var(--xen-v4-icon-d);
  height: var(--xen-v4-icon-d);
  background-color: var(--xen-v4-icon-ground-l);
  color: var(--xen-v4-icon-ink-l);
  transition: ${transitionCss(['background-color', 'color'])};
}
[data-theme="dark"] [data-xen-v4-icon][data-badge] {
  background-color: var(--xen-v4-icon-ground-d);
  color: var(--xen-v4-icon-ink-d);
}
[data-xen-v4-icon][data-shape="circle"] { border-radius: 50%; }
[data-xen-v4-icon][data-shape="rounded"] { border-radius: var(--xen-radius-lg); }
[data-xen-v4-icon-empty] {
  display: block;
  box-sizing: border-box;
  width: 1em;
  height: 1em;
  border: 1px solid currentColor;
  border-radius: 50%;
  opacity: ${V4_STATE.disabledContent};
}
@media (prefers-reduced-motion: reduce) {
  [data-xen-v4-icon][data-badge] { transition: none; }
}
`;

/**
 * **V4 icon** — the web twin of the native `IconV4`, the base {@link Icon}'s
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
 *    `primary[50]`, which is the literal reading of §8. Two reasons, both the
 *    same ones `BadgeV4` and `AvatarV4` already moved for: a ramp step is a
 *    light-scheme colour whose contrast against the glyph nobody measured in
 *    dark, and a translucent tint is a different colour on a card, on glass
 *    and on the page while the glyph's legibility was checked against exactly
 *    one of the three. `mixToken` at {@link SOFT_MIX} lands where `primary[50]`
 *    lands on a light page, inverts correctly in dark, and — because the
 *    component now owns its ground — lets the glyph be re-measured against it
 *    with `ensureContrast` instead of inheriting a promise about `surface`.
 *
 * 2. **The empty state.** `<Icon />` with neither `glyph` nor `name` renders
 *    the empty string, so it collapses to nothing and the row it was aligning
 *    loses its rhythm — §12 says every component has to survive that. V4 keeps
 *    the box and draws a hollow ring in the icon's own `currentColor` at M3's
 *    disabled-content opacity: present enough to hold the column, quiet enough
 *    that nobody mistakes it for content. It stays `aria-hidden` — an absent
 *    icon has nothing to announce.
 *
 * With no `XenitionUIProvider` above it there is no compiled theme to measure
 * against, so the badge falls back to a `color-mix()` of the same two token
 * variables. The look is the same; only the contrast correction is skipped,
 * because there is nothing to correct against.
 */
export const IconV4 = React.forwardRef<HTMLSpanElement, IconV4Props>(function IconV4(
  {
    glyph,
    name,
    size = 'lg',
    color = 'onSurface',
    badge,
    badgeShape = 'circle',
    className,
    style,
    'aria-label': ariaLabel,
    ...rest
  },
  ref
) {
  injectStyleOnce('xen-v4-icon-styles', ICON_V4_CSS);
  const theme = useOptionalCompiledTheme();

  const decorative = ariaLabel == null;
  const numeric = typeof size === 'number';
  const mark = glyph ?? (name != null ? resolveIconGlyph(name) : '');
  const empty = mark === '';

  const vars: Record<string, string> = {};
  if (badge !== undefined) {
    if (theme !== null) {
      // One legible pair per scheme: the provider stamps `data-theme` on a
      // wrapper rather than putting the scheme in context, so both go down and
      // the sheet picks — exactly as `ButtonV4` and `AvatarV4` do.
      const groundL =
        badge === 'solid'
          ? theme.light[color]
          : mixToken(theme.light.surface, theme.light[color], SOFT_MIX);
      const groundD =
        badge === 'solid'
          ? theme.dark[color]
          : mixToken(theme.dark.surface, theme.dark[color], SOFT_MIX);
      const seedL = badge === 'solid' ? theme.light[ON_SLOT[color]] : theme.light[color];
      const seedD = badge === 'solid' ? theme.dark[ON_SLOT[color]] : theme.dark[color];
      vars['--xen-v4-icon-ground-l'] = groundL;
      vars['--xen-v4-icon-ground-d'] = groundD;
      // A glyph is often the only label a control carries, so it is held to the
      // text bar rather than to 1.4.11's 3:1 for a decorative graphic.
      vars['--xen-v4-icon-ink-l'] = ensureContrast(seedL, groundL, MIN_CONTRAST);
      vars['--xen-v4-icon-ink-d'] = ensureContrast(seedD, groundD, MIN_CONTRAST);
    } else {
      const tone = COLOR_VAR[color];
      const ground =
        badge === 'solid'
          ? tone
          : `color-mix(in srgb, ${tone} ${Math.round(SOFT_MIX * 100)}%, var(--xen-surface))`;
      const ink = badge === 'solid' ? `var(--xen-${kebab(ON_SLOT[color])})` : tone;
      vars['--xen-v4-icon-ground-l'] = ground;
      vars['--xen-v4-icon-ground-d'] = ground;
      vars['--xen-v4-icon-ink-l'] = ink;
      vars['--xen-v4-icon-ink-d'] = ink;
    }
  }

  return (
    <span
      ref={ref}
      data-xen-v4-icon=""
      data-badge={badge}
      data-shape={badge !== undefined ? badgeShape : undefined}
      data-empty={empty ? '' : undefined}
      role={decorative ? undefined : 'img'}
      aria-label={ariaLabel}
      aria-hidden={decorative || undefined}
      className={cn(
        'inline-flex items-center justify-center leading-none',
        !numeric && SIZE_CLASS[size],
        // Badged, the ink is `--xen-v4-icon-ink-*` from the sheet, which has to
        // follow the scheme; a utility class cannot.
        badge === undefined && COLOR_CLASS[color],
        className
      )}
      style={
        {
          ...vars,
          ...(numeric ? { fontSize: size } : null),
          ...style,
        } as React.CSSProperties
      }
      {...rest}
    >
      {empty ? <span data-xen-v4-icon-empty="" aria-hidden /> : mark}
    </span>
  );
});

/** `onPrimary` → `on-primary`, so a slot name can address its `--xen-*` twin. */
function kebab(slot: string): string {
  return slot.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);
}
