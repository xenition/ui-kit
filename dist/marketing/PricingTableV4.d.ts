import * as React from 'react';
import type { PricingTableProps, PricingTierProps } from './PricingTable';
/** Drop-in for {@link PricingTableProps} — same props, the V4 "showcase" design. */
export type PricingTableV4Props = PricingTableProps;
/** Drop-in for {@link PricingTierProps} — same props, the V4 "showcase" design. */
export type PricingTierV4Props = PricingTierProps;
/**
 * PricingTable — **V4** "showcase" design (web parity of the native V4).
 * Responsive row of `PricingTierV4` cards on the clean page ground; composes the
 * tier just like the base. Same props/behavior as {@link PricingTableProps};
 * every color is a `--xen-*` token — no literals.
 */
export declare const PricingTableV4: React.ForwardRefExoticComponent<PricingTableProps & React.RefAttributes<HTMLDivElement>>;
/**
 * PricingTier — **V4** "showcase" design (web parity of the native V4). One
 * elevated rounded card: an extra-bold name, a big extra-bold `tabular-nums`
 * price, a soft-primary ✓ feature list, and a prominent CTA. The **featured**
 * tier is the accent moment — a token primary ring, a soft-primary "Popular"
 * chip (never color alone), and a primary CTA (others outline). A token accent,
 * NOT a full brand gradient. Same props/behavior as {@link PricingTierProps};
 * token-only colors, no literals.
 */
export declare const PricingTierV4: React.ForwardRefExoticComponent<PricingTierProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PricingTableV4.d.ts.map