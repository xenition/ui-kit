import * as React from 'react';
import type { CashDrawerRowProps } from './CashDrawerRow';
/** Drop-in for {@link CashDrawerRowProps} — same props, the V4 "register" design. */
export type CashDrawerRowV4Props = CashDrawerRowProps;
/**
 * CashDrawerRow — **V4** "register" design. The tactile checkout take on a
 * cash-movement row: the kind glyph rides in a **soft-tint disc**, the label +
 * optional detail sit beside it, and the **signed amount is big and bold** in
 * tabular numerals — money in reads `success`, money out reads `danger` by sign,
 * always shown with `+`/`−`. For `kind="variance"`, pass `expectedCents` +
 * counted `amountCents` for an over/short/balanced **glyph + word** pill and a
 * signed delta (state by text, never color alone). Same props/behavior as
 * {@link CashDrawerRowProps}; token-only tints via `useXenitionTheme()`.
 */
export declare function CashDrawerRowV4({ kind, label, amountCents, currency, expectedCents, detail, onPress, variant, testID, style, }: CashDrawerRowV4Props): React.ReactElement;
//# sourceMappingURL=CashDrawerRowV4.d.ts.map