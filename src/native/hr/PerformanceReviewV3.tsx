import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { usePressScale } from '../primitives/internal/motion';
import { clampPct, clampRating, REVIEW_STATUS_META, toneColor } from './internal';
import type { PerformanceReviewProps } from './PerformanceReview';

/** Drop-in alternate design for {@link PerformanceReview} — identical Props. */
export type PerformanceReviewV3Props = PerformanceReviewProps;

/**
 * PerformanceReview, design **V3** — a compact single row. Cycle + reviewer on
 * the left, a condensed star meter and goal percentage on the right, and the
 * review status carried by a leading tone glyph + word (never color alone).
 * Rating is still announced numerically via a11y. Same Props as
 * {@link PerformanceReview}; the goal ring/bar is dropped for density.
 * Press-scales on tap; token-pure.
 */
export function PerformanceReviewV3({
  cycle,
  reviewer,
  rating,
  ratingMax = 5,
  status,
  goalCompletion,
  onPress,
  testID,
  style,
}: PerformanceReviewV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const press = usePressScale();
  const max = Math.max(1, Math.floor(ratingMax));
  const rated = clampRating(rating, max);
  const hasRating = rating != null && Number.isFinite(rating);
  const hasGoals = goalCompletion != null;
  const pct = clampPct(goalCompletion);
  const statusMeta = status ? REVIEW_STATUS_META[status] : undefined;
  const stars = Array.from({ length: max }, (_, i) => (i < Math.round(rated) ? '★' : '☆'));

  const row = (
    <Animated.View
      style={[
        {
          transform: [{ scale: press.scale }],
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.sm,
          paddingVertical: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.sm,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
          backgroundColor: colors.surface,
        },
        style,
      ]}
    >
      <View style={{ flex: 1, minWidth: 0 }}>
        <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>{cycle}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs / 2 }}>
          {statusMeta ? (
            <Text accessibilityLabel={statusMeta.label} style={{ color: toneColor(colors, statusMeta.tone), fontSize: tokens.typography.scale.xs }}>
              {statusMeta.glyph} {statusMeta.label}
            </Text>
          ) : null}
          {reviewer ? <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>· {reviewer}</Text> : null}
        </View>
      </View>

      <View style={{ alignItems: 'flex-end', gap: 2 }}>
        {hasRating ? (
          <View accessibilityRole="text" accessibilityLabel={`Rating ${rated} of ${max}`}>
            <Text style={{ color: colors.accent, fontSize: tokens.typography.scale.sm, letterSpacing: 1 }}>{stars.join('')}</Text>
          </View>
        ) : null}
        {hasGoals ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>{pct}% goals</Text>
        ) : null}
      </View>
    </Animated.View>
  );

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Review ${cycle}`}
        onPress={onPress}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
        testID={testID}
      >
        {row}
      </Pressable>
    );
  }
  return <View testID={testID}>{row}</View>;
}
