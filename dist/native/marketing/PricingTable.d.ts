import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface PricingPlanCta {
    label: string;
    onPress?: () => void;
}
export interface PricingPlan {
    /** Tier name ("Starter", "Pro", …). */
    name: string;
    /** Price display ("$19", "Free", …). */
    price: string;
    /** Billing period line (e.g. "/month"). */
    period?: string;
    /** Short description under the price. */
    description?: string;
    /** Checklist entries. */
    features?: string[];
    /** Call-to-action button; a node is rendered as-is. */
    cta?: PricingPlanCta | React.ReactNode;
    /** Emphasized tier: token ring + badge (web `featured`). */
    highlighted?: boolean;
    /** Badge text on the highlighted tier. */
    highlightLabel?: string;
}
export interface PricingTableProps {
    /** The tiers to render (mirrors the web `PricingTier` children). */
    plans: PricingPlan[];
    style?: StyleProp<ViewStyle>;
}
/**
 * Stacked pricing tiers — the native mirror of the web `PricingTable` +
 * `PricingTier`. The web version composes children in a responsive grid; native
 * takes a `plans` data array and stacks the cards vertically (the `lg:scale-105`
 * highlight is expressed with a token ring + badge only). Token-only.
 */
export declare function PricingTable({ plans, style }: PricingTableProps): React.ReactElement;
//# sourceMappingURL=PricingTable.d.ts.map