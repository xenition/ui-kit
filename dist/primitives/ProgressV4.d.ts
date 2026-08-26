import * as React from 'react';
import type { ProgressProps, ProgressTone } from './Progress';
export type { ProgressProps as ProgressV4Props, ProgressTone };
/**
 * **V4 progress** — the web twin of the native `ProgressV4`, same props as
 * {@link Progress}, a different design line.
 *
 * ## The bar reports a number, so it may not be decorated
 *
 * A progress bar is the one component in the feedback line that carries a
 * *quantity*, and `design.md` §8's ban on meaningless charts applies to it
 * exactly: anything that makes the length harder to read has cost more than it
 * added.
 *
 * So the fill is **flat**. No gradient across it, at any depth. A bar that
 * fades toward its leading edge has no leading edge — the reader cannot say
 * where "done" stops, which is the only thing the component exists to say. And
 * no shadow: a bar is a mark on the page, not an object above it.
 *
 * ## The track belongs to the bar
 *
 * The base painted `bg-neutral-200` — a ramp step with no relationship to the
 * thing filling it. V4 mixes the fill's own tone into `surface` at 10%, so the
 * track reads as *the same quantity, unfilled*. `color-mix` over two
 * scheme-aware tokens also means the track follows the scheme by construction
 * rather than by the ramp happening to invert the right way.
 *
 * ## What this twin cannot do
 *
 * The native twin runs the fill through `ensureContrast` against the track it
 * painted, so the boundary between done and not-done always clears 3:1 — WCAG's
 * bar for a meaningful graphic. CSS has no equivalent: `color-mix` composites,
 * it does not measure, and the fill here is the raw tone token. For every seed
 * whose tone already separates from its own 10% tint the two twins are
 * identical; for a pale `warn` on a light page the native bar nudges its fill
 * and this one does not. The asymmetry is the same one `BadgeV4` carries, and
 * the native spec is where the threshold is actually proven.
 *
 * ## `warn` is `warn`
 *
 * The native base routed `warn` to `accent` — a brand colour standing in for a
 * semantic one (§35.4), and a silent disagreement with this twin. Both now read
 * the same slot table.
 *
 * ## A started task must look started
 *
 * At 1% of a 200px bar the fill rounds to two pixels and, with a radius on both
 * ends, to nothing at all — the bar reports "nothing has happened" about a task
 * that has begun. So a non-zero value paints at least the bar's own thickness.
 * It is a floor, not a scale: capped at the thickness it can never be mistaken
 * for meaningful width, and at zero the fill is genuinely zero.
 *
 * ## Motion
 *
 * The width eases over 300ms so a jump reads as movement rather than as a
 * repaint (§36.6, animate state changes). Under `prefers-reduced-motion` it
 * snaps — the number is in the DOM either way, so nothing is lost (§36.10).
 */
export declare const ProgressV4: React.ForwardRefExoticComponent<ProgressProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ProgressV4.d.ts.map