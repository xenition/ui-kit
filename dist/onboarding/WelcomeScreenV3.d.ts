import * as React from 'react';
import type { WelcomeScreenProps } from './WelcomeScreen';
/** Same public contract as {@link WelcomeScreen} — a drop-in alternate design. */
export type WelcomeScreenV3Props = WelcomeScreenProps;
/**
 * WelcomeScreen, redesigned (v3): a **compact welcome card**. A small inline
 * medallion beside the title, a short subtitle, and the CTAs in a tight row —
 * sized for a bottom sheet or modal rather than a full page. The opposite of v2's
 * split hero. Same props, token-only.
 */
export declare const WelcomeScreenV3: React.ForwardRefExoticComponent<WelcomeScreenProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=WelcomeScreenV3.d.ts.map