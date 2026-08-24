/**
 * Shared internals for the native field-service module. Money re-uses the
 * single kit-wide `formatMoney` home (integer **cents** → localized string, no
 * float drift). `withAlpha` derives a translucent tint from a resolved token
 * hex (from `colors.*` or `tokens.ramps.*`) so tints never introduce a literal
 * color — the token-purity invariant holds. `formatDuration` renders elapsed
 * minutes as a compact `2h 15m` string.
 */
import { formatMoney, type MoneyFormatter } from '../../commerce/money';
export { formatMoney };
export type { MoneyFormatter };
/**
 * Token-derived translucent tint. Takes a resolved token hex and returns an
 * `rgba()` string — never a hardcoded literal.
 */
export declare function withAlpha(hex: string, alpha: number): string;
/** Clamp a whole percentage into [0, 100]; guards non-finite input. */
export declare function clampPct(value: number): number;
/** Format a whole percentage (0–100) with no decimals. */
export declare function formatPct(value: number): string;
/** Render a duration in minutes as a compact `2h 15m` / `45m` string. */
export declare function formatDuration(totalMinutes: number): string;
//# sourceMappingURL=format.d.ts.map