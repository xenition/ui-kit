import * as React from 'react';
import type { DealCardProps } from './DealCard';
/** V2 accepts the exact same props as {@link DealCard} — a drop-in replacement. */
export type DealCardV2Props = DealCardProps;
/**
 * DealCard **design V2** — an *elevated* deal card led by a big money figure,
 * with a full-width stage progress bar and an owner avatar footer. Where the
 * original DealCard is a flat outlined summary, V2 floats on a shadow, promotes
 * the value to a hero number, and turns win-probability into the card's primary
 * visual. Same props, same integer-cents money, same glyph+word outcome so it
 * never leans on color. Token-pure; won reads `successText`, lost `dangerText`.
 */
export declare function DealCardV2({ name, company, valueCents, currency, stage, probability, owner, closeDate, outcome, variant, loading, onPress, testID, style, }: DealCardV2Props): React.ReactElement;
//# sourceMappingURL=DealCardV2.d.ts.map