import * as React from 'react';
import type { PricingPlan, PricingTableProps } from './PricingTable';
/** Drop-in for {@link PricingTableProps} — same props, the V4 "showcase" design. */
export type PricingTableV4Props = PricingTableProps;
/** A single tier plus its style hook (mirrors the web `PricingTierV4`). */
export interface PricingTierV4Props {
    plan: PricingPlan;
}
/**
 * PricingTier — **V4** "showcase" design (native mirror of the web V4). One
 * elevated rounded card built from a `PricingPlan`: an extra-bold name, a big
 * extra-bold `tabular-nums` price, a soft-primary ✓ feature list, and a
 * prominent CTA. The **highlighted** tier is the accent moment — a token primary
 * ring, a soft-primary "Popular" chip (never color alone), and a primary CTA
 * (others outline). A token accent, NOT a full brand gradient. Token-only colors,
 * no literals.
 */
export declare function PricingTierV4({ plan }: PricingTierV4Props): React.ReactElement;
/**
 * PricingTable — **V4** "showcase" design (native mirror of the web V4). Stacks
 * elevated `PricingTierV4` cards from the base's `plans` data array (the web V4
 * composes children in a responsive grid). The highlighted tier stands out with
 * a primary ring + soft-primary chip. Same props/behavior as
 * {@link PricingTableProps}; token-only colors, no literals.
 */
export declare function PricingTableV4({ plans, style }: PricingTableV4Props): React.ReactElement;
//# sourceMappingURL=PricingTableV4.d.ts.map