import * as React from 'react';
import { type SpaceKey } from './_tokens';
/**
 * Which horizontal edge the bleed escapes through.
 *
 * The names are **logical, not physical** — `'start'` is the left edge in a
 * left-to-right document and the right edge in an RTL one — because the
 * component they exist for is a horizontally scrolling chip strip, and "the
 * side the last chip runs off" flips with the writing direction.
 */
export type BleedV4Edge = 'both' | 'start' | 'end';
export interface BleedV4Props extends React.HTMLAttributes<HTMLDivElement> {
    /** Uniform negative margin on all sides, from the spacing scale. Defaults to `md`. */
    space?: SpaceKey;
    /** Bleed only horizontally — overrides `space` on the horizontal axis. */
    horizontal?: SpaceKey;
    /** Bleed only vertically — overrides `space` on the vertical axis. */
    vertical?: SpaceKey;
    /**
     * Which horizontal edge to bleed through. `'both'` (the default, and the
     * base component's only behaviour) escapes the padded parent on both sides;
     * `'start'` / `'end'` escape one side and leave the other aligned to the
     * parent's gutter. Does not affect the vertical bleed.
     */
    edge?: BleedV4Edge;
}
/**
 * **V4 bleed** — the inverse of `Inset`: token-bound *negative* margins that
 * let content break out of a padded parent (a full-bleed image, an
 * edge-to-edge row) without the parent having to drop its gutter.
 *
 * `LAYOUT-DASHBOARD-V4-BRIEF.md` §5 calls the base *"already the cleanest file
 * in the module"* and asks for exactly one addition, which is the whole of the
 * change here: **`edge`**. A horizontally scrolling strip — `FilterChips`, a
 * card carousel — has to bleed only its trailing side. Bleeding both, which is
 * all the base can do, pulls the *first* chip under the screen edge as well,
 * so the strip opens already looking scrolled and its first item is clipped.
 * Bleeding one side keeps the strip's leading edge on the page gutter (§4.1,
 * `spacing.lg`) while the last item can still be scrolled fully into reach.
 *
 * Everything else is unchanged and deliberately so: the default `edge="both"`
 * renders exactly what `Bleed` renders today, so upgrading an import cannot
 * move a pixel. No colour, no radius, no type — every margin traces to a
 * `--xen-space-*` token.
 *
 * The one-sided classes are the logical `-ms-` / `-me-` rather than `-ml-` /
 * `-mr-`, which is what keeps this at prop parity with the native twin's
 * `marginStart` / `marginEnd`: both twins bleed the same edge in an RTL
 * layout, so a screen does not have to special-case one platform.
 */
export declare const BleedV4: React.ForwardRefExoticComponent<BleedV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=BleedV4.d.ts.map