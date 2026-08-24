/**
 * Display-formatting helpers for the crypto module. Every value is formatted
 * deterministically (fixed fraction digits via `Intl.NumberFormat`) so a
 * token amount, price, or percentage never shows float drift on screen. Hashes
 * and addresses are truncated with guarded slicing — a short or non-string
 * input can never throw.
 */
import type { SemanticColors } from '../../theme';
/**
 * Truncate a long hex hash/address to `lead…tail` (e.g. `0x1234…cdef`).
 * Returns the input unchanged when it is already short, and `''` for a
 * non-string. Never indexes past the bounds.
 */
export declare function truncateHash(hash: string, lead?: number, tail?: number): string;
/**
 * Format a token quantity with a stable number of fraction digits. Non-finite
 * input falls back to `0`; `decimals` is clamped to `0…18`. The optional
 * `symbol` is appended (`1,234.5 ETH`).
 */
export declare function formatToken(amount: number, opts?: {
    decimals?: number;
    symbol?: string;
}): string;
/**
 * Format a fiat/crypto price with a fixed 2-decimal (configurable) precision
 * and a currency symbol prefix. Stable — the printed value never drifts.
 */
export declare function formatPrice(price: number, opts?: {
    symbol?: string;
    decimals?: number;
}): string;
/**
 * Format a signed percentage as `+1.23%` / `−1.23%` / `0.00%`. Uses the
 * unicode minus so it lines up with the rest of the kit.
 */
export declare function formatPct(pct: number, decimals?: number): string;
/**
 * Resolve a signed change to a semantic color slot: gains read `success`,
 * losses read `danger`, and a flat/zero change reads `muted`. Never color a
 * status by hue alone — pair this with a glyph or label at the call site.
 */
export declare function changeToneKey(delta: number): keyof SemanticColors;
/** Directional glyph for a signed change (▲ / ▼ / •) — a non-color status cue. */
export declare function changeGlyph(delta: number): string;
//# sourceMappingURL=format.d.ts.map