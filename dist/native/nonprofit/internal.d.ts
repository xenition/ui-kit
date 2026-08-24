/**
 * Shared internals for the `@xenition/ui/native/nonprofit` module. No external
 * deps: a token-tinting helper (mirrors the `withAlpha` used by `Button` /
 * `GlassPanel`) and a re-export of the single `formatMoney` home so every
 * nonprofit component prints money from integer **cents** with a stable
 * 2-decimal representation.
 */
export { formatMoney } from '../commerce/money';
export type { MoneyFormatter } from '../commerce/money';
/**
 * Token-derived translucent tint. Takes a resolved theme **hex** (always from
 * `colors.*` / `tokens.ramps.*`, never a literal) and returns an `rgba()`
 * string — so the value still traces to a token and no hex literal is authored.
 */
export declare function withAlpha(hex: string, alpha: number): string;
/** Percent of `value` toward `goal`, guarded against a zero/negative goal. */
export declare function goalPct(value: number, goal: number): number;
//# sourceMappingURL=internal.d.ts.map