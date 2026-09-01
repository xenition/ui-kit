import * as React from 'react';
import type { CashDrawerRowProps } from './CashDrawerRow';
/** Drop-in for {@link CashDrawerRowProps} — same props, the V4 "register" design. */
export type CashDrawerRowV4Props = CashDrawerRowProps;
/**
 * CashDrawerRow — **V4** "register" design (web parity of the native V4). The
 * tactile checkout take on a cash-movement row: the kind glyph rides in a
 * **soft-tint disc**, the label + optional detail sit beside it, and the **signed
 * amount is big and bold** in `tabular-nums` — money in reads `success`, money
 * out reads `danger` by sign, always shown with `+`/`−`. For `kind="variance"`,
 * pass `expectedCents` + counted `amountCents` for an over/short/balanced
 * **glyph + word** pill and a signed delta (state by text, never color alone).
 * When `onClick` is set the row is a keyboard-operable `role="button"`. Same
 * props/behavior as {@link CashDrawerRowProps}; all colors from `--xen-*` token
 * classes (no literals).
 */
export declare const CashDrawerRowV4: React.ForwardRefExoticComponent<CashDrawerRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CashDrawerRowV4.d.ts.map