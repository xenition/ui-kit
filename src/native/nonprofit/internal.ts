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
export function withAlpha(hex: string, alpha: number): string {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/** Percent of `value` toward `goal`, guarded against a zero/negative goal. */
export function goalPct(value: number, goal: number): number {
  if (!(goal > 0)) return 0;
  return Math.max(0, Math.min(100, (value / goal) * 100));
}
