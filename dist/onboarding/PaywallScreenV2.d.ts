import * as React from 'react';
import { type PaywallScreenProps } from './PaywallScreen';
/** Same public contract as {@link PaywallScreen} — a drop-in alternate design. */
export type PaywallScreenV2Props = PaywallScreenProps;
/**
 * PaywallScreen, redesigned (v2): the **editorial** line. The hero runs
 * full-bleed to the top edge with no inset panel, and the content sheet rises
 * over it with a rounded lip so the headline overlaps the artwork. Below sit the
 * trial strip, the §8 feature rows, the value-framing block and the v2 plan
 * cards, with the CTA pinned (§5).
 *
 * The plan cards are the v2 selector, not the base one — an app that picks v2
 * picks it for every surface it sees, and a composite that reaches back into v1
 * breaks that line. {@link TrialBanner} has no alternate, so the base one is the
 * whole line — that is correct, not a gap. Same props, token-only.
 */
export declare const PaywallScreenV2: React.ForwardRefExoticComponent<PaywallScreenProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PaywallScreenV2.d.ts.map