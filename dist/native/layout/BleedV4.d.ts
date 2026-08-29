import * as React from 'react';
import { type StyleProp, type ViewProps, type ViewStyle } from 'react-native';
import type { SpacingScale } from '../../theme/types';
export type SpaceKey = keyof SpacingScale;
/**
 * Which horizontal edge the bleed escapes through.
 *
 * The names are **logical, not physical** — `'start'` is the left edge in a
 * left-to-right layout and the right edge in an RTL one — because the
 * component they exist for is a horizontally scrolling chip strip, and "the
 * side the last chip runs off" flips with the writing direction. React
 * Native's `marginStart` / `marginEnd` already resolve that way, and the web
 * twin's `-ms-` / `-me-` classes match them.
 */
export type BleedV4Edge = 'both' | 'start' | 'end';
export interface BleedV4Props extends ViewProps {
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
    style?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
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
 * move a pixel. No colour, no radius, no type — every margin is a value from
 * the compiled spacing scale, negated. The leading `-` is a sign, not a
 * measurement; the measurement is the token.
 */
export declare function BleedV4({ space, horizontal, vertical, edge, style, children, ...rest }: BleedV4Props): React.ReactElement;
//# sourceMappingURL=BleedV4.d.ts.map