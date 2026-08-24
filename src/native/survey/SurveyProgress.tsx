import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Progress } from '../primitives';

export type SurveyProgressVariant = 'bar' | 'steps' | 'fraction';

export interface SurveyProgressProps {
  /** 1-based index of the current question. */
  current: number;
  /** Total number of questions. */
  total: number;
  /** Render style. Default `'bar'`. */
  variant?: SurveyProgressVariant;
  /** Show the `"Question X of Y"` caption above the indicator. Default `true`. */
  showLabel?: boolean;
  /** Override the caption text (e.g. localized). */
  label?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * Survey completion indicator — `bar` wraps the token `Progress` primitive,
 * `steps` renders a segmented dot-per-question track, and `fraction` shows just
 * the `"X of Y"` caption. Exposes a `progressbar` role with min/max/now so
 * assistive tech can read completion. `current` is clamped into `[0, total]`.
 * No literal colors.
 */
export function SurveyProgress({
  current,
  total,
  variant = 'bar',
  showLabel = true,
  label,
  style,
}: SurveyProgressProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const safeTotal = Math.max(1, Math.floor(total));
  const safeCurrent = Math.max(0, Math.min(safeTotal, Math.floor(current)));
  const caption = label ?? `Question ${safeCurrent} of ${safeTotal}`;

  return (
    <View
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: safeTotal, now: safeCurrent }}
      accessibilityLabel={caption}
      style={[{ gap: tokens.spacing.xs }, style]}
    >
      {showLabel ? (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
            {caption}
          </Text>
          {variant !== 'fraction' ? (
            <Text style={{ color: colors.primary, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
              {Math.round((safeCurrent / safeTotal) * 100)}%
            </Text>
          ) : null}
        </View>
      ) : null}

      {variant === 'bar' ? (
        <Progress value={safeCurrent} max={safeTotal} tone="primary" size="md" />
      ) : variant === 'steps' ? (
        <View style={{ flexDirection: 'row', gap: tokens.spacing.xs }}>
          {Array.from({ length: safeTotal }, (_, i) => (
            <View
              key={i}
              style={{
                flex: 1,
                height: 6,
                borderRadius: tokens.radius.full,
                backgroundColor: i < safeCurrent ? colors.primary : colors.border,
              }}
            />
          ))}
        </View>
      ) : null}
    </View>
  );
}
