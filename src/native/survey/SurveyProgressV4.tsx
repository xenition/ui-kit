import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import type { SurveyProgressProps } from './SurveyProgress';

/** Drop-in for {@link SurveyProgressProps} — same props, the V4 "focus" design. */
export type SurveyProgressV4Props = SurveyProgressProps;

/**
 * SurveyProgress — **V4** "clean form / focus" design. Deliberately calm — NO
 * gradient — so it never competes with the question: a clean rounded progress bar
 * (track = soft-primary tint, fill = solid primary) under a legible "Step N of M"
 * line with a big primary percentage numeral. `steps` swaps the bar for a
 * segmented dot-per-question track; `fraction` shows just the caption. Exposes a
 * `progressbar` role with min/max/now so assistive tech can read completion.
 * `current` is clamped into `[0, total]`. Same props/behavior as
 * {@link SurveyProgressProps}; token-only colors via `useXenitionTheme()` (no
 * literals), dark-mode safe.
 */
export function SurveyProgressV4({
  current,
  total,
  variant = 'bar',
  showLabel = true,
  label,
  style,
}: SurveyProgressV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const safeTotal = Math.max(1, Math.floor(total));
  const safeCurrent = Math.max(0, Math.min(safeTotal, Math.floor(current)));
  const pct = Math.round((safeCurrent / safeTotal) * 100);
  const caption = label ?? `Step ${safeCurrent} of ${safeTotal}`;
  const track = withAlpha(colors.primary, 0.1);

  return (
    <View
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: safeTotal, now: safeCurrent }}
      accessibilityLabel={caption}
      style={[{ gap: tokens.spacing.sm }, style]}
    >
      {showLabel ? (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
            {caption}
          </Text>
          {variant !== 'fraction' ? (
            <Text style={{ color: colors.primary, fontSize: tokens.typography.scale.xl, fontWeight: '800' }}>
              {pct}%
            </Text>
          ) : null}
        </View>
      ) : null}

      {variant === 'bar' ? (
        <View style={{ height: 8, borderRadius: tokens.radius.full, backgroundColor: track, overflow: 'hidden' }}>
          <View
            style={{
              width: `${pct}%`,
              height: '100%',
              borderRadius: tokens.radius.full,
              backgroundColor: colors.primary,
            }}
          />
        </View>
      ) : variant === 'steps' ? (
        <View style={{ flexDirection: 'row', gap: tokens.spacing.xs }}>
          {Array.from({ length: safeTotal }, (_, i) => (
            <View
              key={i}
              style={{
                flex: 1,
                height: 8,
                borderRadius: tokens.radius.full,
                backgroundColor: i < safeCurrent ? colors.primary : track,
              }}
            />
          ))}
        </View>
      ) : null}
    </View>
  );
}
