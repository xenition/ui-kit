import * as React from 'react';
import { cn } from './cn';
import type { StatisticProps, StatisticTrend } from './Statistic';

export type { StatisticProps as StatisticV4Props, StatisticTrend };

function inferTrend(delta: string | number | undefined): StatisticTrend {
  if (typeof delta === 'number') {
    if (delta > 0) return 'up';
    if (delta < 0) return 'down';
  }
  return 'flat';
}

/**
 * Trend → ink.
 *
 * `text-success` / `text-danger` are the FILL colours — what a filled chip is
 * painted with — and the compiler makes no contrast promise about them as text
 * on `surface`. `text-success-text` / `text-danger-text` are exactly that
 * promise. The base was setting a green-on-white delta with the wrong green.
 */
const TREND_CLASS: Record<StatisticTrend, string> = {
  up: 'text-success-text',
  down: 'text-danger-text',
  flat: 'text-muted-text',
};

const TREND_ARROW: Record<StatisticTrend, string> = {
  up: '▲',
  down: '▼',
  flat: '→',
};

/**
 * **V4 statistic** — the web twin of the native `StatisticV4`, same props as
 * {@link Statistic}, a different design line.
 *
 * This is one of the two components in the kit where a number is the hero, and
 * the base treats it as a big string. Four changes, all of them about making
 * the number behave like type rather than like text that happens to be large:
 *
 * 1. **Tabular figures.** The single most important fix here. A KPI whose
 *    value ticks — `1,204` → `1,209` — reflows on every update with
 *    proportional digits, and a column of statistics never lines up. Tabular
 *    figures cost nothing and are the difference between comparing two numbers
 *    and re-reading them (§33).
 * 2. **The brand's display face.** A hero number wears `font-heading`; the
 *    base left it on the body face, so the loudest thing on a dashboard was
 *    the one place the brand's type never appeared.
 * 3. **A real baseline.** `items-baseline` replaces `items-end` plus the
 *    `pb-0.5` nudge on the suffix, so `12` and `GB` share a baseline the way
 *    they would in any typeset line rather than being aligned by a
 *    hand-measured offset.
 * 4. **The label is a caption.** `text-xs` and muted, matching
 *    `DescriptionsV4`, so the number grows relative to it without a single
 *    pixel being added to the number (§6 — hierarchy before styling).
 *
 * The arrow is already `aria-hidden`, and stays so: "▲ 12%" should be
 * announced as "12%".
 *
 * **Still not a card.** It renders bare so it can sit in a row, a header or a
 * grid — §11, and a dashboard of tiles each in its own bordered box is the
 * "cards inside cards" §8 bans, at KPI scale.
 */
export const StatisticV4 = React.forwardRef<HTMLDivElement, StatisticProps>(function StatisticV4(
  { className, label, value, delta, trend, suffix, ...rest },
  ref
) {
  const resolvedTrend = trend ?? inferTrend(delta);
  return (
    <div ref={ref} className={cn('inline-flex flex-col gap-0.5', className)} {...rest}>
      <span className="text-xs font-medium text-muted-text">{label}</span>
      {/* Baseline, not flex-end: the suffix sits on the number's baseline
          instead of being nudged there with a bottom padding. */}
      <span className="flex items-baseline gap-[var(--xen-space-xs)]">
        <span className="font-heading text-3xl font-bold leading-none text-on-surface [font-variant-numeric:tabular-nums]">
          {value}
        </span>
        {suffix != null ? <span className="text-base text-muted-text">{suffix}</span> : null}
      </span>
      {delta != null ? (
        <span
          className={cn(
            'flex items-center gap-[var(--xen-space-xs)] text-sm font-semibold [font-variant-numeric:tabular-nums]',
            TREND_CLASS[resolvedTrend]
          )}
        >
          <span aria-hidden="true" className="text-xs">
            {TREND_ARROW[resolvedTrend]}
          </span>
          {String(delta)}
        </span>
      ) : null}
    </div>
  );
});
