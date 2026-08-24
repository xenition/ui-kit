/**
 * Shared internals for the native insurance module. Money re-uses the single
 * kit-wide `formatMoney` home (integer **cents** → two-decimal localized string,
 * no float drift), and `withAlpha` derives a translucent tint from a token hex
 * so tints never introduce a literal color (mirrors the primitives' pattern).
 */
import { formatMoney, type MoneyFormatter } from '../../commerce/money';
export { formatMoney };
export type { MoneyFormatter };
/**
 * Token-derived translucent tint. Takes a resolved token hex (from
 * `colors.*` or `tokens.ramps.*`) and returns an `rgba()` string — never a
 * hardcoded literal, so the token-purity invariant holds.
 */
export declare function withAlpha(hex: string, alpha: number): string;
/** Format a whole percentage (0–100) with no decimals; guards non-finite. */
export declare function formatPct(value: number): string;
//# sourceMappingURL=format.d.ts.map