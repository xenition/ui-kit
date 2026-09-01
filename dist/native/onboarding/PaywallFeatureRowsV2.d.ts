import * as React from 'react';
import type { PaywallFeatureRowsProps } from './PaywallScreen';
/** Drop-in for {@link PaywallFeatureRows} — identical props, different design. */
export type PaywallFeatureRowsV2Props = PaywallFeatureRowsProps;
/**
 * Feature rows — V2, the editorial line: **tiles, not a list**. Each benefit
 * gets its own card with a large glyph plate above the copy, and the cards
 * stack full-width.
 *
 * The idea: a list says "here are four facts"; tiles say "here are four
 * things". On the screen where the value proposition IS the product — a
 * welcome-offer, a first paywall — the extra weight per row is the point, and
 * a rail joining four cards would fight the separation the cards already have.
 *
 * `rail` is therefore accepted and ignored: cards are separated objects, and
 * a line drawn between them is a diagram of a list they are deliberately not.
 * `dense` still tightens the stack for a longer set.
 *
 * Same props as {@link PaywallFeatureRows}. Renders nothing for an empty list.
 * Token-pure.
 */
export declare function PaywallFeatureRowsV2({ rows, heading, dense, style, }: PaywallFeatureRowsV2Props): React.ReactElement | null;
//# sourceMappingURL=PaywallFeatureRowsV2.d.ts.map