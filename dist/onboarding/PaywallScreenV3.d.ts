import * as React from 'react';
import { type PaywallScreenProps } from './PaywallScreen';
/** Same public contract as {@link PaywallScreen} — a drop-in alternate design. */
export type PaywallScreenV3Props = PaywallScreenProps;
/**
 * PaywallScreen, redesigned (v3): the **compact** line. No hero panel — a small
 * leading brand tile sits beside a left-aligned headline, the §8 rows run dense,
 * and the tiers stack as {@link PlanSelectorV3} rows. Sized for a modal or
 * bottom sheet rather than a full page; the CTA closes the sheet, which is the
 * fold here, so the ask still never scrolls away (§5).
 *
 * `showHero` is honoured as an opt-*in* on this line (it defaults to off).
 *
 * The plan rows are the v3 selector, not the base one — an app that picks v3
 * picks it for every surface it sees. {@link TrialBanner} has no alternate, so
 * the base one is the whole line. Same props, token-only.
 */
export declare const PaywallScreenV3: React.ForwardRefExoticComponent<PaywallScreenProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PaywallScreenV3.d.ts.map