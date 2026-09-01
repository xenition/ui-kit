import * as React from 'react';
import type { BracketViewProps, BracketSlot, BracketMatch, BracketRound } from './BracketView';
/** Drop-in for {@link BracketViewProps} — same props, the V4 "broadcast" design. */
export type BracketViewV4Props = BracketViewProps;
/**
 * BracketView — **V4** "broadcast" design (web parity of the native V4). The
 * knockout draw as a matchday graphic: horizontally-scrolling round columns of
 * clean, elevated matchup cells, the advancing side bolded and washed in a
 * soft-primary tint with a primary check glyph (never color alone). The implied
 * connective column structure of the base is preserved, as is horizontal scroll.
 * Same props/behavior as {@link BracketViewProps}; all colors from `--xen-*`
 * token classes (no literals).
 */
export declare const BracketViewV4: React.ForwardRefExoticComponent<BracketViewProps & React.RefAttributes<HTMLDivElement>>;
export type { BracketSlot, BracketMatch, BracketRound };
//# sourceMappingURL=BracketViewV4.d.ts.map