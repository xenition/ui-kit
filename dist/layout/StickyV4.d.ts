import * as React from 'react';
import type { SpaceKey } from './_tokens';
/** Which edge the box pins to. */
export type StickySide = 'top' | 'bottom';
export interface StickyV4Props extends React.HTMLAttributes<HTMLDivElement> {
    /** Which edge to stick to. Defaults to `top`. */
    side?: 'top' | 'bottom';
    /**
     * Distance from the sticky edge. Defaults to `0`.
     *
     * A `SpaceKey` resolves to the matching spacing token — the right answer
     * when the gap is a design decision. A number stays a raw px offset, for the
     * case the base was written for: clearing a *measured* thing above it, an
     * app bar of a height the caller knows and the design system does not.
     */
    offset?: number | SpaceKey;
    /**
     * Add the viewport's safe-area inset for `side` to the offset, so a pinned
     * bar clears the notch or the home indicator.
     *
     * Defaults to `false` because the base read no inset and V4 is additive
     * (§1.4). Turn it on for a bar pinned to the edge of a full-height app
     * surface; leave it off when an ancestor already consumed the inset, since
     * paying twice leaves a visible gap.
     */
    safeArea?: boolean;
    /**
     * Give the band an opaque `surface` ground and a hairline `border` on the
     * edge the content passes, so scrolling content goes **under** it instead of
     * showing through it.
     *
     * Defaults to `false`: the base was transparent, and a transparent sticky
     * box is still the right thing for a pinned label inside a card. The two
     * halves are one prop on purpose — §5's band is a hairline *and* an opaque
     * fill, and a rule with nothing behind it over moving content is the worst
     * of both.
     */
    filled?: boolean;
}
/**
 * **V4 sticky** — `position: sticky` pinned to the top or bottom edge of the
 * nearest scrolling ancestor.
 *
 * **Web only, deliberately.** There is no native twin and there should not be:
 * `position: sticky` has no React Native equivalent, and faking one with a
 * measured `onScroll` and an absolutely positioned overlay is a different
 * component with different failure modes. §6.1 settles this the same way it
 * settles `KeyboardAvoider` in the other direction — a documented
 * single-platform exception, like `XenitionNativeThemeProviderV4`.
 *
 * ## What V4 changes
 *
 * **The offset can be a token.** `offset` was px-only, so every caller that
 * wanted a normal gap from the edge typed a number — §1.1's "no literal
 * spacings", arriving through the front door. It now also takes a `SpaceKey`,
 * while a number still means what it always did, for the measured case.
 *
 * **It can clear the system chrome.** HIG asks edge-anchored content to
 * respect the safe areas; a bar pinned to `bottom: 0` on a notched phone sits
 * under the home indicator, which is the most visible way a web surface admits
 * it was not designed for a phone. `safeArea` adds `env(safe-area-inset-*)` to
 * the offset — the same expression `AuthStickyFooterV4` uses, so there is one
 * approach to the inset in the kit rather than two.
 *
 * **It can wear §5's band.** `filled` gives it the opaque `surface` and the
 * hairline that make content scroll under a pinned bar rather than collide
 * with it. Without it, a sticky header over a scrolling list is transparent
 * and the list reads straight through it.
 *
 * ## What it deliberately does not do
 *
 * **No shadow.** §4.6 gives a shadow to a card, a sheet and the one dominant
 * action, and §5's band is a hairline — the CTA inside such a band already
 * carries `elevation.action`, and two stacked shadows read as a UI element
 * that has come loose from the screen.
 *
 * **Nothing renders when there is nothing to pin** (§4.5). An empty band is a
 * hairline and a strip of surface across the edge of the screen with no
 * explanation — the same defect as a divider above no content.
 *
 * The `z-10` is a stacking order, not a design value: without it a
 * transformed or positioned child of the scrolling content paints over the
 * pinned bar, which defeats the entire point of pinning it.
 */
export declare const StickyV4: React.ForwardRefExoticComponent<StickyV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=StickyV4.d.ts.map