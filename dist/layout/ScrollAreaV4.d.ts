import * as React from 'react';
import { type SpaceKey } from './_tokens';
/** Which axis scrolls. */
export type ScrollAxis = 'vertical' | 'horizontal' | 'both';
/** `'none'` is the full-bleed choice — see `padding` below. */
export type ScrollPadding = SpaceKey | 'none';
export interface ScrollAreaV4Props extends React.HTMLAttributes<HTMLDivElement> {
    /** Which axis scrolls. Defaults to `vertical`. */
    axis?: ScrollAxis;
    /**
     * Inner content padding, from the spacing scale. Defaults to `lg` — the page
     * gutter of §4.1, and changing it would not be additive.
     *
     * Pass `'none'` for full-bleed content: a list whose rows own their own
     * `spacing.md` padding, a carousel that must run to the screen edge, media.
     * A row list inside a `padding="lg"` region is indented twice and stops
     * lining up with everything else on the page.
     */
    padding?: ScrollPadding;
    /** Fill the theme surface color behind the content. */
    filled?: boolean;
    /**
     * Pay the viewport's bottom safe-area inset as extra content padding, so the
     * last row can be scrolled clear of the home indicator.
     *
     * Defaults to `false` because the base paid no inset and V4 is additive
     * (§1.4) — turn it on for a full-height scrolling screen, and leave it off
     * when an ancestor already consumed the inset or a sticky footer sits below
     * the region and is paying it instead.
     */
    safeArea?: boolean;
}
/**
 * **V4 scroll area** — the web twin of the native `ScrollAreaV4`, the base's
 * props plus `padding="none"` and safe-area handling.
 *
 * §5 calls this one "structure and parity only, no visual change", and nothing
 * here moves a default: the same `axis`, the same `padding="lg"`, the same
 * `filled`.
 *
 * ## What V4 changes
 *
 * **Parity with native.** The base pair diverged: web had `axis`, native did
 * not, so the same scrolling carousel needed two different call shapes on the
 * two platforms. `axis` is now on both twins (§1.3).
 *
 * **`padding="none"` exists.** The base's `SpaceKey` had no zero, so full-bleed
 * content — a row list whose rows carry §4.3's own `spacing.md`, a chip row
 * bleeding to the screen edge — had to fight the region's `lg` with a negative
 * margin. It is a real layout choice, so it gets a real value.
 *
 * **It can clear the home indicator.** HIG asks a scroll region to respect the
 * system safe areas and the base read none, so the final row of a full-height
 * list sat under the home indicator with no way to scroll it out. `safeArea`
 * adds `env(safe-area-inset-bottom)` to the content's bottom padding, the same
 * expression `AuthStickyFooterV4` uses — one approach to the inset across the
 * kit, not two.
 *
 * ## What it deliberately does not do
 *
 * **No shadow, no scroll-edge line.** §4.6 gives a shadow to a card, a sheet
 * and the one dominant action; a scroll region is none of the three. §4.4:
 * between free-standing blocks, space rather than a rule.
 *
 * **An empty region still draws.** §4.5's "render nothing" is about a
 * component with nothing to *say*; a scroll region is a viewport the caller
 * has sized, and collapsing it would take the page's scroll with it. With no
 * children it paints nothing but its own optional `surface` and takes up the
 * room it was given.
 */
export declare const ScrollAreaV4: React.ForwardRefExoticComponent<ScrollAreaV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ScrollAreaV4.d.ts.map