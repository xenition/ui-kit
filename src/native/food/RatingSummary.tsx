import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Rating } from '../primitives/Rating';

export type RatingSummaryVariant = 'compact' | 'detailed';

export interface RatingSummaryProps {
  /** Average rating (0–5). */
  average: number;
  /** Total number of ratings. */
  count: number;
  /**
   * Optional star-bucket counts, highest star first: `[5★, 4★, 3★, 2★, 1★]`.
   * When provided and `variant` is `detailed`, a distribution bar chart shows.
   */
  distribution?: number[];
  /** Presentation (default `compact`). */
  variant?: RatingSummaryVariant;
  /** Copy shown when `count` is 0 (default `No ratings yet`). */
  emptyLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * Aggregate rating block — a large average, a `Rating` star row, and the total
 * count. In `detailed` mode with a `distribution` it also draws a five-row bar
 * chart (5★→1★) using token-tinted fills. When `count` is 0 it shows a muted
 * empty label instead. Bar widths are guarded against a zero denominator.
 * Token-only.
 */
export function RatingSummary({
  average,
  count,
  distribution,
  variant = 'compact',
  emptyLabel = 'No ratings yet',
  style,
}: RatingSummaryProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  if (count <= 0) {
    return (
      <View style={[{ gap: tokens.spacing.xs }, style]}>
        <Rating value={0} size="sm" />
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{emptyLabel}</Text>
      </View>
    );
  }

  const header = (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
      <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale['3xl'], fontWeight: '800' }}>
        {average.toFixed(1)}
      </Text>
      <View style={{ gap: 2 }}>
        <Rating value={average} size="md" />
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
          {count} {count === 1 ? 'rating' : 'ratings'}
        </Text>
      </View>
    </View>
  );

  if (variant !== 'detailed' || !distribution || distribution.length === 0) {
    return (
      <View accessibilityLabel={`${average.toFixed(1)} out of 5, ${count} ratings`} style={style}>
        {header}
      </View>
    );
  }

  const maxBucket = Math.max(1, ...distribution);

  return (
    <View
      accessibilityLabel={`${average.toFixed(1)} out of 5, ${count} ratings`}
      style={[{ gap: tokens.spacing.md }, style]}
    >
      {header}
      <View style={{ gap: tokens.spacing.xs }}>
        {distribution.map((bucket, i) => {
          const stars = distribution.length - i; // first entry = highest star
          const pct = Math.max(0, Math.min(1, bucket / maxBucket));
          return (
            <View key={stars} style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
              <Text style={{ width: 16, color: colors.muted, fontSize: tokens.typography.scale.xs, textAlign: 'right' }}>
                {stars}
              </Text>
              <View
                style={{
                  flex: 1,
                  height: 8,
                  borderRadius: tokens.radius.full,
                  overflow: 'hidden',
                  backgroundColor: tokens.ramps.neutral[200],
                }}
              >
                <View style={{ width: `${pct * 100}%`, height: '100%', backgroundColor: colors.accent }} />
              </View>
              <Text style={{ width: 32, color: colors.muted, fontSize: tokens.typography.scale.xs }}>{bucket}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}
