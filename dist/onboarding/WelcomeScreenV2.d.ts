import * as React from 'react';
import type { WelcomeScreenProps } from './WelcomeScreen';
/** Same public contract as {@link WelcomeScreen} — a drop-in alternate design. */
export type WelcomeScreenV2Props = WelcomeScreenProps;
/**
 * WelcomeScreen, redesigned (v2): a **split hero**. A tall primary-filled top
 * panel carries the brand medallion + headline reversed out in on-primary ink;
 * the subtitle and CTAs sit on the surface below. A bolder, branded first
 * impression vs. v1's flat centered layout. Same props, token-only.
 */
export declare const WelcomeScreenV2: React.ForwardRefExoticComponent<WelcomeScreenProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=WelcomeScreenV2.d.ts.map