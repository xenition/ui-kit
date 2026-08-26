import * as React from 'react';
import type { StatisticProps, StatisticTrend } from './Statistic';
export type { StatisticProps as StatisticV4Props, StatisticTrend };
/**
 * **V4 statistic** — same props as {@link Statistic}, a different design line.
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
 * 2. **The brand's display face.** A hero number wears `fontHeading`; the base
 *    left it on the body face, so the loudest thing on a dashboard was the one
 *    place the brand's type never appeared.
 * 3. **A real baseline.** The value takes a line height equal to its size, and
 *    the suffix sits on its baseline instead of being nudged into place with a
 *    hand-picked bottom margin. `12` and `GB` now share a baseline the way
 *    they would in any typeset line.
 * 4. **The label is a caption.** `xs` and muted, matching `DescriptionsV4`, so
 *    the number grows relative to it without a single point being added to the
 *    number (§6 — hierarchy before styling).
 *
 * The delta's tone moves from `success`/`danger` to `successText`/`dangerText`.
 * The first pair is the *fill* colour — what a filled chip is painted with —
 * and the compiler makes no contrast promise about it as text on `surface`.
 * The `*Text` pair is exactly that promise, and the base was setting a
 * green-on-white delta with the wrong green. The arrow is hidden from the
 * accessibility tree: "▲ 12%" should be announced as "12%", not as a triangle.
 *
 * **Still not a card.** It renders bare so it can sit in a row, a header or a
 * grid — §11, and a dashboard of tiles each in its own bordered box is the
 * "cards inside cards" §8 bans, at KPI scale.
 */
export declare function StatisticV4({ label, value, delta, trend, suffix, style, }: StatisticProps): React.ReactElement;
//# sourceMappingURL=StatisticV4.d.ts.map