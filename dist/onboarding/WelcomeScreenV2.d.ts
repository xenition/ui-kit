import * as React from 'react';
import type { WelcomeScreenProps } from './WelcomeScreen';
/** Same public contract as {@link WelcomeScreen} — a drop-in alternate design. */
export type WelcomeScreenV2Props = WelcomeScreenProps;
/**
 * First-launch welcome — V2, the **editorial** line.
 *
 * Where the base line insets the hero into a rounded panel below the header,
 * V2 runs it full-bleed to the very top edge and floats the header controls
 * over it, then lifts a `surface` content sheet up over the bottom of the art.
 * The result reads like a magazine opener rather than a centred stack, which is
 * the whole point of the alternate: §11 asks the three lines to differ in idea,
 * not skin.
 *
 * Identical props to {@link WelcomeScreen}, including the §3 `illustration`
 * slot — with the same medallion fallback, so a screen that ships no artwork
 * still looks composed — and the same §5 sticky footer. Token-only.
 */
export declare const WelcomeScreenV2: React.ForwardRefExoticComponent<WelcomeScreenProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=WelcomeScreenV2.d.ts.map