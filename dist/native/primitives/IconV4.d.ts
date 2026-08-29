import * as React from 'react';
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
export declare function IconV4({ glyph, name, size, color, badge, badgeShape, accessibilityLabel, style, }: IconV4Props): React.ReactElement;
//# sourceMappingURL=IconV4.d.ts.map