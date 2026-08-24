import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, Rating } from '../primitives';
import { withAlpha } from './internal';

export interface RatingBreakdownProps {
  /**
   * Count of ratings per star, indexed by star value. Accepts either a 5-length
   * array ordered `[1★, 2★, 3★, 4★, 5★]` or a `{1..5: count}` map. Missing
   * entries are treated as 0.
   */
  counts: number[] | Partial<Record<1 | 2 | 3 | 4 | 5, number>>;
  /**
   * Optional pre-computed average; when omitted it is derived from `counts`.
   */
  average?: number;
  /** Hide the summary header (average + total). Default `false`. */
  hideSummary?: boolean;
  style?: StyleProp<ViewStyle>;
}

/** Normalize either input shape into a `[1★..5★]` count tuple. */
function toTuple(counts: RatingBreakdownProps['counts']): [number, number, number, number, number] {
  const get = (star: number): number => {
    const raw = Array.isArray(counts)
      ? counts[star - 1]
      : (counts as Record<number, number | undefined>)[star];
    return typeof raw === 'number' && raw > 0 ? raw : 0;
  };
  return [get(1), get(2), get(3), get(4), get(5)];
}

/**
 * A review-score distribution — a summary header (average + total count) over
 * five proportional bars, one per star level (5★ at the top). Accepts counts as
 * an ordered array or a `{1..5}` map, derives the average when not supplied, and
 * guards every lookup and the divide-by-zero empty case. Presentational, data
 * only. Reuses `Rating`; token-only colors with a token-derived alpha for the
 * bar track.
 */
export function RatingBreakdown({
  counts,
  average,
  hideSummary = false,
  style,
}: RatingBreakdownProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const tuple = toTuple(counts);
  const total = tuple.reduce((a, b) => a + b, 0);
  const derivedAvg =
    total > 0 ? tuple.reduce((sum, count, i) => sum + count * (i + 1), 0) / total : 0;
  const avg = typeof average === 'number' ? average : derivedAvg;

  return (
    <View
      style={[
        {
          gap: tokens.spacing.sm,
          borderRadius: tokens.radius.lg,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.surface,
          padding: tokens.spacing.lg,
        },
        style,
      ]}
    >
      {hideSummary ? null : (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale['2xl'], fontWeight: '700' }}>
            {avg.toFixed(1)}
          </Text>
          <View style={{ gap: 2 }}>
            <Rating value={avg} size="sm" />
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
              {`${total.toLocaleString()} ${total === 1 ? 'rating' : 'ratings'}`}
            </Text>
          </View>
        </View>
      )}
      <View style={{ gap: tokens.spacing.xs }}>
        {[5, 4, 3, 2, 1].map((star) => {
          const count = tuple[star - 1] ?? 0;
          const pct = total > 0 ? count / total : 0;
          return (
            <View
              key={star}
              accessibilityLabel={`${star} stars, ${count} ${count === 1 ? 'rating' : 'ratings'}`}
              style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}
            >
              <Text style={{ width: 16, color: colors.muted, fontSize: tokens.typography.scale.xs, textAlign: 'right' }}>
                {star}
              </Text>
              <View
                style={{
                  flex: 1,
                  height: 8,
                  borderRadius: tokens.radius.full,
                  backgroundColor: withAlpha(colors.muted, 0.2),
                  overflow: 'hidden',
                }}
              >
                <View
                  style={{
                    width: `${Math.round(pct * 100)}%`,
                    height: '100%',
                    borderRadius: tokens.radius.full,
                    backgroundColor: colors.accent,
                  }}
                />
              </View>
              <Text style={{ width: 32, color: colors.muted, fontSize: tokens.typography.scale.xs, textAlign: 'right' }}>
                {count}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}
