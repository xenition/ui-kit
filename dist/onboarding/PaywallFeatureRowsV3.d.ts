import * as React from 'react';
import type { PaywallFeatureRowsProps } from './PaywallScreen';
/** Drop-in for {@link PaywallFeatureRows} — identical props, different design. */
export type PaywallFeatureRowsV3Props = PaywallFeatureRowsProps;
/**
 * Feature rows — V3, the compact line: **a checklist**. One `✓` per row in the
 * success tone, the title inline beside it, the description folded onto the
 * same block at caption size.
 *
 * Where it earns its place: the confirmation half of a flow — a plan card with
 * "what's included" under it, a sheet, the second half of a screen whose hero
 * already spent the vertical budget. Six benefits as §8 rows is a scroll; six
 * as a checklist is a paragraph.
 *
 * `rail` is accepted and ignored — a rail is what makes badges read as one
 * list, and a checklist already reads as one. The row's glyph is ignored too:
 * a checklist's mark is the check, and letting each row bring its own turns
 * the column of ticks back into the icon list this line exists to compress.
 *
 * Same props as {@link PaywallFeatureRows}. Renders nothing for an empty list.
 * Token-pure.
 */
export declare const PaywallFeatureRowsV3: React.ForwardRefExoticComponent<PaywallFeatureRowsProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PaywallFeatureRowsV3.d.ts.map