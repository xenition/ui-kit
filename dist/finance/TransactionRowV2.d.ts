import * as React from 'react';
import type { TransactionRowProps } from './TransactionRow';
/** Same public contract as {@link TransactionRow} — a drop-in alternate design. */
export type TransactionRowV2Props = TransactionRowProps;
/**
 * TransactionRow, redesigned (v2): an elevated **card row**. The category glyph
 * sits in a rounded, tinted tile on the left; the title stacks over a subtitle;
 * and the signed {@link MoneyAmount} is rendered large and bold on the right
 * over its date. Distinct at a glance from the base's borderless avatar-disc
 * row. Same props, integer-cents money, token-pure throughout.
 */
export declare const TransactionRowV2: React.ForwardRefExoticComponent<TransactionRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=TransactionRowV2.d.ts.map