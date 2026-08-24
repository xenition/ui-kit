import * as React from 'react';
import type { DealCardProps } from './DealCard';
/** V3 accepts the exact same props as {@link DealCard} — a drop-in replacement. */
export type DealCardV3Props = DealCardProps;
/**
 * DealCard **design V3** — a *minimal single line*: a small outcome dot, the deal
 * name + account stacked, and the value pushed hard to the right. No card chrome,
 * no meter — a scannable roster row for long deal lists. The dot is paired with
 * an outcome word in the row's `aria-label`, so meaning never rests on color
 * alone. Same props / integer-cents money as {@link DealCard}. Token-pure.
 */
export declare const DealCardV3: React.ForwardRefExoticComponent<DealCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=DealCardV3.d.ts.map