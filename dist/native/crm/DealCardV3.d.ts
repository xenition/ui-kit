import * as React from 'react';
import type { DealCardProps } from './DealCard';
/** V3 accepts the exact same props as {@link DealCard} — a drop-in replacement. */
export type DealCardV3Props = DealCardProps;
/**
 * DealCard **design V3** — a *minimal single line*: a small stage/outcome dot,
 * the deal name + account stacked, and the value pushed hard to the right.
 * No card chrome, no meter — a scannable roster row for long deal lists. Same
 * props as {@link DealCard}, same integer-cents money. The dot is reinforced by
 * an outcome word for screen readers, so meaning never rests on color alone.
 * Token-pure; won reads `successText`, lost `dangerText`.
 */
export declare function DealCardV3({ name, company, valueCents, currency, stage, probability, outcome, loading, onPress, testID, style, }: DealCardV3Props): React.ReactElement;
//# sourceMappingURL=DealCardV3.d.ts.map