import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { TextV4 } from '../primitives/TextV4';
import { pressFill } from '../primitives/internal/state-v4';
import { rangeVerdict, type HealthRange, type RangeVerdict } from '../../health/goal-v4';
import { appearanceStyle } from '../primitives/internal/appearance';
import { RANGE_LABEL, spokenLine, toneInk, verdictTone } from './internal/tone-v4';
import type { VitalStatProps, VitalStatVariant } from './VitalStat';

export type { VitalStatVariant };

export interface VitalStatV4Props extends VitalStatProps {
  /** The normal band this reading is judged against. Omitted, nothing is judged. */
  range?: HealthRange;
  /** Wording for each verdict. Defaults to `Below range` / `In range` / `Above range`. */
  rangeLabels?: Partial<Record<RangeVerdict, string>>;
}

/** Icon per variant. Identity, and nothing but identity. */
const VARIANT_GLYPH: Record<VitalStatVariant, string> = {
  'heart-rate': '❤️',
  steps: '👟',
  calories: '🔥',
  distance: '📍',
  oxygen: '🫁',
  'blood-pressure': '🩺',
  temperature: '🌡️',
  respiration: '💨',
};

const VARIANT_LABEL: Record<VitalStatVariant, string> = {
  'heart-rate': 'Heart rate',
  steps: 'Steps',
  calories: 'Calories',
  distance: 'Distance',
  oxygen: 'Blood oxygen',
  'blood-pressure': 'Blood pressure',
  temperature: 'Temperature',
  respiration: 'Respiration',
};

const VARIANT_UNIT: Record<VitalStatVariant, string> = {
  'heart-rate': 'bpm',
  steps: '',
  calories: 'kcal',
  distance: 'km',
  oxygen: '%',
  'blood-pressure': 'mmHg',
  temperature: '°C',
  respiration: 'br/min',
};

/**
 * **V4 vital tile** — same props as {@link VitalStat} plus `range` and
 * `rangeLabels`. (`label` and `unit` are the base's own and keep their
 * meaning.)
 *
 * ## Five changes
 *
 * 1. **A heart rate is no longer permanently red.** `heart-rate` and
 *    `blood-pressure` were tinted `danger` and `calories` `warn` by *variant*,
 *    so a resting 58 bpm and a dangerous 190 bpm rendered identically — and in
 *    the same alarm colour, which teaches a user to ignore it. Discipline is
 *    identity and now gets the glyph; the value is ordinary ink.
 * 2. **Out of range is expressible.** Pass a `range` and the tile reads the
 *    verdict from the shared `rangeVerdict`, tones the value accordingly and
 *    prints the verdict as a **word**. With no `range` it behaves exactly as
 *    today, because a component that does not know the band must not guess.
 * 3. **The delta reaches the accessible name.** The base computed it,
 *    coloured it and drew it — and then set `accessibilityLabel` to the label
 *    and value only. Once the tile is a button that name *replaces* its
 *    contents, so the change the tile exists to show was sighted-only.
 * 4. **The non-pressable branch is `accessible`.** It set a label on a plain
 *    `Animated.View`, which is never an accessibility element on iOS, so the
 *    whole computed name was dead.
 * 5. **Press is a state layer**, not `opacity: pressed ? 0.8 : 1`.
 *
 * **Renders nothing without a `value`.**
 */
export function VitalStatV4({
  variant,
  value,
  unit,
  label,
  delta,
  range,
  rangeLabels,
  onPress,
  appearance = 'classic',
  style,
}: VitalStatV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  if (value == null || value === '') return null;

  const resolvedUnit = unit ?? VARIANT_UNIT[variant];
  const resolvedLabel = label ?? VARIANT_LABEL[variant];

  const numeric = typeof value === 'number' ? value : Number(value);
  const verdict = Number.isFinite(numeric) ? rangeVerdict(numeric, range) : undefined;
  const verdictWord = verdict ? (rangeLabels?.[verdict] ?? RANGE_LABEL[verdict]) : null;
  const valueInk = verdict ? toneInk(theme, verdictTone(verdict)) : colors.onSurface;

  const sign = delta == null || delta === 0 ? '' : delta > 0 ? '+' : '−';
  const arrow = delta == null || delta === 0 ? '' : delta > 0 ? '▲ ' : '▼ ';
  const deltaAmount =
    delta != null && Number.isFinite(delta) ? String(Math.abs(delta)) : null;
  const deltaText = deltaAmount === null ? null : `${sign}${deltaAmount}`;
  const deltaInk =
    delta == null || delta === 0
      ? colors.mutedText
      : toneInk(theme, delta > 0 ? 'success' : 'danger');

  const name = spokenLine([
    resolvedLabel,
    `${String(value)}${resolvedUnit ? ` ${resolvedUnit}` : ''}`,
    verdictWord,
    deltaText,
  ]);

  const inner = (pressed: boolean): React.ReactElement => (
    <View
      style={[
        {
          ...appearanceStyle(appearance, colors, tokens),
          borderRadius: tokens.radius.md,
          padding: tokens.spacing.md,
          gap: tokens.spacing.xs,
        },
        pressed ? { backgroundColor: pressFill(theme) } : null,
        style,
      ]}
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
        <TextV4 size="xs" tone="mutedText" numberOfLines={1} style={{ flex: 1 }}>
          {resolvedLabel}
        </TextV4>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: tokens.spacing.xs }}>
        <TextV4 size="2xl" weight="bold" numeric="tabular" style={{ color: valueInk }}>
          {value}
        </TextV4>
        {resolvedUnit ? (
          <TextV4 size="sm" tone="mutedText" style={{ marginBottom: tokens.spacing.xs }}>
            {resolvedUnit}
          </TextV4>
        ) : null}
      </View>
      {/* A verdict is a word before it is a colour — the tone alone is
          invisible to a colour-blind reader and to greyscale. */}
      {verdictWord ? (
        <TextV4 size="xs" weight="semibold" style={{ color: toneInk(theme, verdictTone(verdict)) }}>
          {verdictWord}
        </TextV4>
      ) : null}
      {deltaAmount ? (
        <TextV4 size="xs" weight="semibold" numeric="tabular" style={{ color: deltaInk }}>
          {`${arrow}${deltaAmount}`}
        </TextV4>
      ) : null}
    </View>
  );

  if (!onPress) {
    return (
      <View accessible accessibilityLabel={name}>
        {inner(false)}
      </View>
    );
  }
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={name} onPress={onPress}>
      {({ pressed }) => inner(pressed)}
    </Pressable>
  );
}
