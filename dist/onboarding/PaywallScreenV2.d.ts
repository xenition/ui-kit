import * as React from 'react';
import type { PaywallScreenProps } from './PaywallScreen';
/** Same public contract as {@link PaywallScreen} — a drop-in alternate design. */
export type PaywallScreenV2Props = PaywallScreenProps;
/**
 * PaywallScreen, redesigned (v2): a **hero paywall**. A primary-tinted hero band
 * carries the value-first headline + subtitle; below sit the trial banner, the
 * "why upgrade" list, the inline {@link PlanSelector}, a full-width CTA, footnote,
 * and a quiet dismiss. Bolder framing than v1, same paywall-after-value order.
 * Same props, token-only.
 */
export declare const PaywallScreenV2: React.ForwardRefExoticComponent<PaywallScreenProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PaywallScreenV2.d.ts.map