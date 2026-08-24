import * as React from 'react';
import type { TransactionRowProps } from './TransactionRow';
/** Same public contract as {@link TransactionRow} — a drop-in alternate design. */
export type TransactionRowV3Props = TransactionRowProps;
/**
 * TransactionRow, redesigned (v3): a **minimal dense line**. A tiny colored
 * status glyph leads, the title and (middot-joined) subtitle share one flexible
 * line, and the signed amount hugs the right edge. No avatar disc, no card —
 * tuned for long, scannable feeds. Distinct at a glance from v1/v2. Same props,
 * integer-cents money, token-pure.
 */
export declare function TransactionRowV3({ title, subtitle, amountCents, currency, direction, date, icon, iconColor, onPress, style, }: TransactionRowV3Props): React.ReactElement;
//# sourceMappingURL=TransactionRowV3.d.ts.map