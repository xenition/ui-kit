import * as React from 'react';
import type { TransactionRowProps } from './TransactionRow';
/** Same public contract as {@link TransactionRow} — a drop-in alternate design. */
export type TransactionRowV3Props = TransactionRowProps;
/**
 * TransactionRow, redesigned (v3): a **minimal dense line**. A tiny colored
 * status dot (or the bare glyph) leads, the title and a middot-joined subtitle /
 * date share one flexible line, and the signed amount hugs the right edge. No
 * avatar disc, no card — tuned for long, scannable feeds. Distinct at a glance
 * from the base/v2. Same props, integer-cents money, token-pure.
 */
export declare const TransactionRowV3: React.ForwardRefExoticComponent<TransactionRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=TransactionRowV3.d.ts.map