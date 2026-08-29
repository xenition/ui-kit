import * as React from 'react';
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
export declare const IconV4: React.ForwardRefExoticComponent<IconV4Props & React.RefAttributes<HTMLSpanElement>>;
//# sourceMappingURL=IconV4.d.ts.map