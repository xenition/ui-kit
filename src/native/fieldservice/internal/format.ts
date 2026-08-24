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
export function withAlpha(hex: string, alpha: number): string {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/** Clamp a whole percentage into [0, 100]; guards non-finite input. */
export function clampPct(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(100, Math.round(value)));
}

/** Format a whole percentage (0–100) with no decimals. */
export function formatPct(value: number): string {
  return `${clampPct(value)}%`;
}

/** Render a duration in minutes as a compact `2h 15m` / `45m` string. */
export function formatDuration(totalMinutes: number): string {
  const mins = Number.isFinite(totalMinutes) ? Math.max(0, Math.trunc(totalMinutes)) : 0;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}
