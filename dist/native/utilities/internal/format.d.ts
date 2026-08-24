/**
 * Shared internals for the native utilities (energy / bill-pay) module. Money
 * re-uses the single kit-wide `formatMoney` home (integer **cents** →
 * two-decimal localized string, no float drift), and `withAlpha` derives a
 * translucent tint from a resolved token hex so tints never introduce a literal
 * color (mirrors the primitives' pattern). `formatUsage` renders a metered
 * quantity + unit stably (fixed decimals, no `NaN` leak).
 */
import { formatMoney, type MoneyFormatter } from '../../commerce/money';
export { formatMoney };
export type { MoneyFormatter };
/**
 * Token-derived translucent tint. Takes a resolved token hex (from `colors.*`
 * or `tokens.ramps.*`) and returns an `rgba()` string — never a hardcoded
 * literal, so the token-purity invariant holds.
 */
export declare function withAlpha(hex: string, alpha: number): string;
/** Format a whole percentage (0–100) with no decimals; guards non-finite. */
export declare function formatPct(value: number): string;
/**
 * Format a metered quantity with a unit suffix (e.g. `"842 kWh"`, `"3.40 m³"`).
 * Non-finite input collapses to `0`; `decimals` defaults to `0` for whole-unit
 * meters. The value never renders `NaN`/`Infinity`.
 */
export declare function formatUsage(value: number, unit: string, decimals?: number): string;
/** Clamp a number into `[min, max]`, guarding non-finite input to `min`. */
export declare function clamp(value: number, min: number, max: number): number;
//# sourceMappingURL=format.d.ts.map