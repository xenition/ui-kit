import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Sparkline } from '../charts';
import { TextV4 } from '../primitives/TextV4';
import { pressFill } from '../primitives/internal/state-v4';
import { rangeVerdict, type HealthRange, type RangeVerdict } from '../../health/goal-v4';
import {
  RANGE_LABEL,
  cardStyle,
  deltaTone,
  spokenLine,
  toneInk,
  verdictTone,
} from './internal/tone-v4';
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

/** Icon per metric. Identity, and nothing but identity. */
const VARIANT_GLYPH: Record<BodyMetricVariant, string> = {
  weight: '⚖️',
  bmi: '📊',
  'body-fat': '📉',
  muscle: '💪',
  waist: '📏',
  'blood-sugar': '🩸',
};

const VARIANT_LABEL: Record<BodyMetricVariant, string> = {
  weight: 'Weight',
  bmi: 'BMI',
  'body-fat': 'Body fat',
  muscle: 'Muscle mass',
  waist: 'Waist',
  'blood-sugar': 'Blood sugar',
};

const VARIANT_UNIT: Record<BodyMetricVariant, string> = {
  weight: 'kg',
  bmi: '',
  'body-fat': '%',
  muscle: 'kg',
  waist: 'cm',
  'blood-sugar': 'mg/dL',
};

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
export function BodyMetricCardV4({
  variant,
  value,
  unit,
  label,
  delta,
  lowerIsBetter = false,
  trend,
  range,
  rangeLabels,
  onPress,
  appearance = 'classic',
  style,
}: BodyMetricCardV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  if (value == null || value === '') return null;

  const resolvedUnit = unit ?? VARIANT_UNIT[variant];
  const resolvedLabel = label ?? VARIANT_LABEL[variant];

  const numeric = typeof value === 'number' ? value : Number(value);
  const verdict = Number.isFinite(numeric) ? rangeVerdict(numeric, range) : undefined;
  const verdictWord = verdict ? (rangeLabels?.[verdict] ?? RANGE_LABEL[verdict]) : null;
  const valueInk = verdict ? toneInk(theme, verdictTone(verdict)) : colors.onSurface;

  const tone = deltaTone(delta, lowerIsBetter);
  const deltaInk = tone === 'neutral' ? colors.mutedText : toneInk(theme, tone);
  const sign = delta == null || delta === 0 ? '' : delta > 0 ? '+' : '−';
  const arrow = delta == null || delta === 0 ? '' : delta > 0 ? '▲ ' : '▼ ';
  const deltaAmount =
    delta != null && Number.isFinite(delta)
      ? `${Math.abs(delta)}${resolvedUnit ? ` ${resolvedUnit}` : ''}`
      : null;
  const deltaText = deltaAmount === null ? null : `${sign}${deltaAmount}`;

  const trendName =
    trend && trend.length > 0 ? `${resolvedLabel} trend over ${trend.length} readings` : null;
  const name = spokenLine([
    resolvedLabel,
    `${String(value)}${resolvedUnit ? ` ${resolvedUnit}` : ''}`,
    verdictWord,
    deltaText,
  ]);

  const heading = (pressed: boolean): React.ReactElement => (
    <View
      style={{
        gap: tokens.spacing.sm,
        borderRadius: tokens.radius.md,
        backgroundColor: pressed ? pressFill(theme) : 'transparent',
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
        <TextV4
          size="base"
          allowFontScaling={false}
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
        >
          {VARIANT_GLYPH[variant]}
        </TextV4>
        <TextV4 size="sm" tone="mutedText" numberOfLines={1} style={{ flex: 1 }}>
          {resolvedLabel}
        </TextV4>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: tokens.spacing.xs }}>
        <TextV4 size="3xl" weight="bold" numeric="tabular" style={{ color: valueInk }}>
          {value}
        </TextV4>
        {resolvedUnit ? (
          <TextV4 size="base" tone="mutedText" style={{ marginBottom: tokens.spacing.xs }}>
            {resolvedUnit}
          </TextV4>
        ) : null}
      </View>

      {verdictWord ? (
        <TextV4 size="sm" weight="semibold" style={{ color: toneInk(theme, verdictTone(verdict)) }}>
          {verdictWord}
        </TextV4>
      ) : null}

      {deltaAmount ? (
        <TextV4 size="sm" weight="semibold" numeric="tabular" style={{ color: deltaInk }}>
          {`${arrow}${deltaAmount}`}
        </TextV4>
      ) : null}
    </View>
  );

  return (
    <View style={[cardStyle(theme, appearance), style]}>
      {onPress ? (
        <Pressable accessibilityRole="button" accessibilityLabel={name} onPress={onPress}>
          {({ pressed }) => heading(pressed)}
        </Pressable>
      ) : (
        <View accessible accessibilityLabel={name}>
          {heading(false)}
        </View>
      )}

      {/* Beside the activation, never inside it: a chart nested in a button is
          pruned along with the name it carries. */}
      {trend && trend.length > 0 && trendName ? (
        <View accessible accessibilityRole="image" accessibilityLabel={trendName}>
          <View accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
            <Sparkline data={trend} color={tone === 'neutral' ? 'primary' : tone} />
          </View>
        </View>
      ) : null}
    </View>
  );
}
