import * as React from 'react';
import { type HealthRange, type RangeVerdict } from '../../health/goal-v4';
import type { BodyMetricCardProps, BodyMetricVariant } from './BodyMetricCard';
export type { BodyMetricVariant };
export interface BodyMetricCardV4Props extends BodyMetricCardProps {
    /** The normal band this reading is judged against. Omitted, nothing is judged. */
    range?: HealthRange;
    /** Override the variant's default caption. */
    label?: string;
    /** Wording for each verdict. Defaults to `Below range` / `In range` / `Above range`. */
    rangeLabels?: Partial<Record<RangeVerdict, string>>;
}
/**
 * **V4 body-metric card** — same props as {@link BodyMetricCard} plus `range`,
 * `label` and `rangeLabels`.
 *
 * ## Five changes
 *
 * 1. **The drop the card exists to show now reaches everybody.** The base
 *    computed the delta, coloured it and drew it, then set the card's
 *    `accessibilityLabel` to the metric and value alone — and once the card is
 *    a button that name *replaces* its contents, so "▼ 1.2 kg" was visible to
 *    sighted users and to nobody else.
 * 2. **A fasting glucose of 260 no longer renders identically to 95.** Pass a
 *    `range` and the value takes its tone and a spoken verdict from the shared
 *    `rangeVerdict`. With no `range` the card behaves exactly as before,
 *    because a card that does not know the band must not invent one.
 * 3. **The trend chart is a *sibling* of the card's activation.** A
 *    `Pressable` is `accessible` by default and flattens its subtree, so the
 *    `Sparkline`'s own name — "Weight trend over 12 readings" — was pruned on
 *    iOS. The container is a plain `View` now, the activation wraps only the
 *    caption and the reading, and the chart sits beside it.
 * 4. **The non-pressable branch is `accessible`**, which it was not, so its
 *    label was dead on iOS.
 * 5. **Press is a state layer**, not `opacity: pressed ? 0.85 : 1` — a value
 *    inside M3's disabled band, so a pressed card read as an unavailable one.
 *
 * **Renders nothing without a `value`.**
 */
export declare function BodyMetricCardV4({ variant, value, unit, label, delta, lowerIsBetter, trend, range, rangeLabels, onPress, appearance, style, }: BodyMetricCardV4Props): React.ReactElement | null;
//# sourceMappingURL=BodyMetricCardV4.d.ts.map