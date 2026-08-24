/**
 * Shared internals for the web utilities (energy / bill-pay) module. Money
 * re-uses the single kit-wide `formatMoney` home (integer **cents** →
 * two-decimal localized string, no float drift), and metered quantities run
 * through `formatUsage` (fixed decimals, no `NaN` leak). Status tints are
 * expressed as Tailwind `--xen-*` token classes (e.g. `bg-success/10`,
 * `text-danger`) — never a literal color — so the token-purity invariant holds.
 * Web parity of the native `utilities/internal/format`.
 */
import { formatMoney, type MoneyFormatter } from '../../commerce/money';
import type { BadgeTone } from '../../primitives';
export { formatMoney };
export type { MoneyFormatter };
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
/**
 * Semantic tint slot. `neutral`/`muted` collapse to `muted`; every other
 * `BadgeTone` maps to its own slot. Used to token-tint discs, dots, rails, and
 * caption text without ever touching a literal color.
 */
export type TintSlot = 'primary' | 'success' | 'warn' | 'danger' | 'accent' | 'muted';
/** Reduce a `BadgeTone` to the tint slot used for discs / rails / text. */
export declare function tintSlot(tone: BadgeTone): TintSlot;
/** Token-bound translucent disc backgrounds (opacity modifier / neutral ramp). */
export declare const DISC_TINT: Record<TintSlot, string>;
/** Solid token fills for dots / left rails. */
export declare const SOLID_TINT: Record<TintSlot, string>;
/** Token text colors for reinforcing captions / headlines. */
export declare const TEXT_TINT: Record<TintSlot, string>;
/** Token border colors for tinted banners / blocks. */
export declare const BORDER_TINT: Record<TintSlot, string>;
//# sourceMappingURL=format.d.ts.map