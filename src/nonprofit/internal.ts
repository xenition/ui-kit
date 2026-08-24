/**
 * Shared internals for the `@xenition/ui/nonprofit` (web) module — the DOM
 * parity of `@xenition/ui/native/nonprofit`. No external deps: a re-export of
 * the single `formatMoney` home (so every nonprofit component prints money from
 * integer **cents** with a stable 2-decimal representation) and the
 * divide-by-zero-guarded `goalPct` helper shared by the progress meters.
 *
 * Unlike the native module there is no `withAlpha` here: on the web every color
 * traces to a `--xen-*` Tailwind token class, so translucent tints are drawn
 * with ramp classes (`bg-primary-50`, …) rather than an authored `rgba()`.
 */
export { formatMoney } from '../commerce/money';
export type { MoneyFormatter } from '../commerce/money';

/** Percent of `value` toward `goal`, guarded against a zero/negative goal, clamped to [0, 100]. */
export function goalPct(value: number, goal: number): number {
  if (!(goal > 0)) return 0;
  return Math.max(0, Math.min(100, (value / goal) * 100));
}
