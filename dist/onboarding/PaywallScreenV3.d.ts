import * as React from 'react';
import type { PaywallScreenProps } from './PaywallScreen';
/** Same public contract as {@link PaywallScreen} — a drop-in alternate design. */
export type PaywallScreenV3Props = PaywallScreenProps;
/**
 * PaywallScreen, redesigned (v3): a **compact upgrade sheet**. A tight title +
 * subtitle, a condensed inline value list, the {@link PlanSelector}, and the CTA
 * + dismiss — sized for a modal/bottom sheet rather than a full page. The
 * opposite of v2's hero paywall. Same props, token-only.
 */
export declare const PaywallScreenV3: React.ForwardRefExoticComponent<PaywallScreenProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PaywallScreenV3.d.ts.map