import * as React from 'react';
import type { StatisticProps, StatisticTrend } from './Statistic';
export type { StatisticProps as StatisticV4Props, StatisticTrend };
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
export declare const StatisticV4: React.ForwardRefExoticComponent<StatisticProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=StatisticV4.d.ts.map