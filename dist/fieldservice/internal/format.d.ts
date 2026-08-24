/**
 * Shared internals for the web field-service module. Money re-uses the single
 * kit-wide `formatMoney` home (integer **cents** → localized string, no float
 * drift). Status tints are expressed as Tailwind `--xen-*` token classes (e.g.
 * `bg-success/10`) — never a literal color — so the token-purity invariant
 * holds. `formatDuration` renders elapsed minutes as a compact `2h 15m` string.
 */
import { formatMoney, type MoneyFormatter } from '../../commerce';
export { formatMoney };
export type { MoneyFormatter };
/** Semantic slot used to tint a status disc + its glyph. `muted` → neutral. */
export type FieldSlot = 'primary' | 'success' | 'warn' | 'danger' | 'accent' | 'muted';
/**
 * Token-bound translucent disc backgrounds. Each entry is a Tailwind class
 * bound to a `--xen-*` variable (opacity modifier for the semantic slots, the
 * neutral ramp for `muted`) — no literal colors.
 */
export declare const DISC_TINT: Record<FieldSlot, string>;
/** Clamp a whole percentage into [0, 100]; guards non-finite input. */
export declare function clampPct(value: number): number;
/** Format a whole percentage (0–100) with no decimals. */
export declare function formatPct(value: number): string;
/** Render a duration in minutes as a compact `2h 15m` / `45m` string. */
export declare function formatDuration(totalMinutes: number): string;
//# sourceMappingURL=format.d.ts.map