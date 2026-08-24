import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, Rating } from '../primitives';

/** One bar in the rating distribution (`stars` 1–5 → `count`). */
export interface ReviewBucket {
  stars: number;
  count: number;
}

export interface ReviewStarsProps {
  /** Average score, 0–5. */
  average: number;
  /** Total number of reviews. */
  total?: number;
  /** Per-star distribution; renders horizontal proportion bars when present. */
  distribution?: readonly ReviewBucket[];
  /** Qualitative summary word, e.g. `'Excellent'`. */
  summary?: string;
  /** Compact single-line layout (hides the distribution). */
  compact?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * An aggregate review widget — a large average, a star row, the review count,
 * and an optional per-star distribution drawn as token proportion bars. Bar
 * widths are guarded against a zero total. Token-only colors.
 */
export function ReviewStars({
  average,
  total,
  distribution = [],
  summary,
  compact = false,
  style,
}: ReviewStarsProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const maxCount = distribution.reduce((m, b) => Math.max(m, b.count), 0);

  return (
    <View
      accessible
      accessibilityLabel={`${average} out of 5${typeof total === 'number' ? `, ${total} reviews` : ''}`}
      style={[{ gap: tokens.spacing.sm }, style]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale['2xl'], fontWeight: '700' }}>
          {average.toFixed(1)}
        </Text>
        <View style={{ gap: 2 }}>
          <Rating value={average} size="sm" />
          {summary || typeof total === 'number' ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
              {[summary, typeof total === 'number' ? `${total} reviews` : undefined].filter(Boolean).join(' · ')}
            </Text>
          ) : null}
        </View>
      </View>

      {!compact && distribution.length > 0 ? (
        <View style={{ gap: tokens.spacing.xs }}>
          {distribution.map((b, i) => {
            const pct = maxCount > 0 ? Math.round((b.count / maxCount) * 100) : 0;
            return (
              <View key={`${b.stars}-${i}`} style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
                <Text style={{ width: 16, color: colors.muted, fontSize: tokens.typography.scale.xs }}>{b.stars}</Text>
                <View style={{ flex: 1, height: 6, borderRadius: tokens.radius.full, backgroundColor: colors.border }}>
                  <View
                    style={{ width: `${pct}%`, height: 6, borderRadius: tokens.radius.full, backgroundColor: colors.accent }}
                  />
                </View>
                <Text style={{ width: 32, textAlign: 'right', color: colors.muted, fontSize: tokens.typography.scale.xs }}>
                  {b.count}
                </Text>
              </View>
            );
          })}
        </View>
      ) : null}
    </View>
  );
}
