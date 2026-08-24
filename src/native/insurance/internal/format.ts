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
export function withAlpha(hex: string, alpha: number): string {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/** Format a whole percentage (0–100) with no decimals; guards non-finite. */
export function formatPct(value: number): string {
  const v = Number.isFinite(value) ? Math.round(value) : 0;
  return `${v}%`;
}
