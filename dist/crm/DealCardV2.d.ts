import * as React from 'react';
import type { DealCardProps } from './DealCard';
/** V2 accepts the exact same props as {@link DealCard} — a drop-in replacement. */
export type DealCardV2Props = DealCardProps;
/**
 * DealCard **design V2** — an *elevated* deal card led by a big money figure,
 * with a full-width stage progress bar and an owner-avatar footer. Where the base
 * is a flat outlined summary, V2 floats on a token `shadow-md`, promotes the value
 * to a hero number colored by outcome, and turns win-probability into the card's
 * primary visual. Outcome sits in a tinted pill (glyph + word) so it never leans
 * on color. Same props / integer-cents money as {@link DealCard}. Token-pure.
 */
export declare const DealCardV2: React.ForwardRefExoticComponent<DealCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=DealCardV2.d.ts.map