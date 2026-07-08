import * as React from 'react';
export type PricingTableProps = React.HTMLAttributes<HTMLDivElement>;
/** Responsive row of `PricingTier` cards. */
export declare const PricingTable: React.ForwardRefExoticComponent<PricingTableProps & React.RefAttributes<HTMLDivElement>>;
export interface PricingTierProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Tier name ("Starter", "Pro", …). */
    name: React.ReactNode;
    /** Price display ("$19", "Free", …). */
    price: React.ReactNode;
    /** Billing period line (e.g. "/month"). */
    period?: React.ReactNode;
    /** Short description under the price. */
    description?: React.ReactNode;
    /** Checklist entries. */
    features?: readonly React.ReactNode[];
    /** Emphasized tier: token ring, slight scale, badge. */
    featured?: boolean;
    /** Badge text on the featured tier. */
    featuredLabel?: React.ReactNode;
    /** Call-to-action slot (usually a `Button`). */
    action?: React.ReactNode;
}
/** One pricing tier card. */
export declare const PricingTier: React.ForwardRefExoticComponent<PricingTierProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PricingTable.d.ts.map