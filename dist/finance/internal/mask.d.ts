/**
 * Number-masking helpers shared by the account / card / payment-method
 * components. Pure string utilities — no theme, no float, no side effects.
 * Web parity of `native/finance/internal/mask.ts` (identical, framework-free).
 */
/**
 * Last four digits of an account number, prefixed with a bullet — e.g.
 * `"•• 4242"`. Falls back to `"••••"` when fewer than four digits are present.
 */
export declare function maskAccountNumber(input: string): string;
/**
 * A full 16-digit card face masked to `•••• •••• •••• 1234`. Any grouping in
 * the input is ignored; only the trailing four digits are revealed. When the
 * last four are unknown the final group renders as bullets too.
 */
export declare function maskCardNumber(input: string): string;
//# sourceMappingURL=mask.d.ts.map