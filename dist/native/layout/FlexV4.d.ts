import * as React from 'react';
import type { FlexProps } from './Flex';
export interface FlexV4Props extends FlexProps {
    /**
     * Flex **shrink** factor for this container — the missing half of the base's
     * `grow`, added on both twins by `LAYOUT-DASHBOARD-V4-BRIEF.md` §5.
     *
     * `shrink={0}` is the one that matters in practice: it is how a leading slot
     * or a trailing affordance in the §4.3 row anatomy keeps its 44 while the
     * title between them absorbs the overflow. Without it the only way to say
     * that was a raw `style`, which is how literal widths get back into the
     * module.
     *
     * Undefined by default, so React Native's own default (`flexShrink: 0` on a
     * `View`) stands and today's rendering is unchanged (§1.4).
     */
    shrink?: number;
}
/**
 * **V4 flex container (native)** — the escape hatch when `RowV4`/`ColumnV4` are
 * too opinionated, and the exact twin of the web `FlexV4`.
 *
 * ## Almost no visual change, by design
 *
 * `LAYOUT-DASHBOARD-V4-BRIEF.md` §5 marks `Flex` "structure only" and notes
 * that its twins are already at exact parity. Defaults, style composition and
 * token bindings are unchanged from the base — with `shrink` left off this
 * renders the same style object `Flex` renders, and the spec asserts that
 * against the base.
 *
 * ## What V4 adds
 *
 * **`shrink`.** §5: "add `shrink?: number` to both twins to match the existing
 * `grow`". A flex container that can be told to grow but not to hold its size
 * is half a control, and the half that was missing is the one the row family
 * needs — see the prop's own note.
 *
 * `grow` and `shrink` are flex factors, which §1.1 lists among the geometric
 * bare numbers a component may carry: ratios, not measurements, with no token
 * scale they could come from. They are the caller's numbers either way.
 *
 * The caller's `style` is still applied **last**, exactly as the base does it,
 * so a caller who was already setting `flexGrow` by hand keeps winning.
 */
export declare function FlexV4({ direction, gap, align, justify, wrap, grow, shrink, style, children, ...rest }: FlexV4Props): React.ReactElement;
//# sourceMappingURL=FlexV4.d.ts.map