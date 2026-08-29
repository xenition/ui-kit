import * as React from 'react';
import type { WelcomeScreenProps } from './WelcomeScreen';
/** Same public contract as {@link WelcomeScreen} — a drop-in alternate design. */
export type WelcomeScreenV3Props = WelcomeScreenProps;
/**
 * First-launch welcome — V3, the **compact** line.
 *
 * No hero panel at all. The brand mark drops to a small leading badge beside
 * the headline and the whole screen collapses to header · title row · sticky
 * footer, for a bottom-sheet presentation or a short screen where a 38%-tall
 * illustration would push the CTA off the fold. That is the §11 idea: the three
 * lines differ in what they *are*, not in how they are painted.
 *
 * Identical props to {@link WelcomeScreen}. An `illustration` is still honoured
 * (§3) — it just occupies the leading badge rather than a hero panel, clipped
 * to the badge's circle — and the medallion is the fallback when there is none,
 * so an empty hero slot still reads as composed. Token-only.
 */
export declare const WelcomeScreenV3: React.ForwardRefExoticComponent<WelcomeScreenProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=WelcomeScreenV3.d.ts.map