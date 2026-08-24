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
export function formatPct(value: number): string {
  const v = Number.isFinite(value) ? Math.round(value) : 0;
  return `${v}%`;
}

/**
 * Format a metered quantity with a unit suffix (e.g. `"842 kWh"`, `"3.40 m³"`).
 * Non-finite input collapses to `0`; `decimals` defaults to `0` for whole-unit
 * meters. The value never renders `NaN`/`Infinity`.
 */
export function formatUsage(value: number, unit: string, decimals = 0): string {
  const safe = Number.isFinite(value) ? value : 0;
  const d = Math.max(0, Math.trunc(decimals));
  return `${safe.toFixed(d)} ${unit}`;
}

/** Clamp a number into `[min, max]`, guarding non-finite input to `min`. */
export function clamp(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) return min;
  return Math.min(Math.max(value, min), max);
}

/**
 * Semantic tint slot. `neutral`/`muted` collapse to `muted`; every other
 * `BadgeTone` maps to its own slot. Used to token-tint discs, dots, rails, and
 * caption text without ever touching a literal color.
 */
export type TintSlot = 'primary' | 'success' | 'warn' | 'danger' | 'accent' | 'muted';

/** Reduce a `BadgeTone` to the tint slot used for discs / rails / text. */
export function tintSlot(tone: BadgeTone): TintSlot {
  switch (tone) {
    case 'primary':
    case 'success':
    case 'warn':
    case 'danger':
    case 'accent':
      return tone;
    default:
      return 'muted';
  }
}

/** Token-bound translucent disc backgrounds (opacity modifier / neutral ramp). */
export const DISC_TINT: Record<TintSlot, string> = {
  primary: 'bg-primary/10',
  success: 'bg-success/10',
  warn: 'bg-warn/10',
  danger: 'bg-danger/10',
  accent: 'bg-accent/10',
  muted: 'bg-neutral-100',
};

/** Solid token fills for dots / left rails. */
export const SOLID_TINT: Record<TintSlot, string> = {
  primary: 'bg-primary',
  success: 'bg-success',
  warn: 'bg-warn',
  danger: 'bg-danger',
  accent: 'bg-accent',
  muted: 'bg-neutral-400',
};

/** Token text colors for reinforcing captions / headlines. */
export const TEXT_TINT: Record<TintSlot, string> = {
  primary: 'text-primary',
  success: 'text-success',
  warn: 'text-warn',
  danger: 'text-danger',
  accent: 'text-accent',
  muted: 'text-muted',
};

/** Token border colors for tinted banners / blocks. */
export const BORDER_TINT: Record<TintSlot, string> = {
  primary: 'border-primary',
  success: 'border-success',
  warn: 'border-warn',
  danger: 'border-danger',
  accent: 'border-accent',
  muted: 'border-border',
};
