import * as React from 'react';
import { View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { RatingV4 } from '../primitives/RatingV4';
import { TextV4 } from '../primitives/TextV4';
import { ratingParts } from '../primitives/internal/tone-v4';
import { placeholderGround, spokenLine, TABULAR } from './internal/menu-v4';
import type { RatingSummaryProps } from './RatingSummary';

export interface RatingSummaryV4Props extends RatingSummaryProps {
  /**
   * The top of the scale. Defaults to `distribution.length` when a
   * distribution is given, and to 5 otherwise — never a hard-coded 5 beside
   * bucket labels derived from something else.
   */
  maxStars?: number;
  /** Build the ratings phrase. Default `'1 rating'` / `'128 ratings'`. */
  formatCount?: (count: number) => string;
  /** Name a bucket. Default `'5 stars'` / `'1 star'`. */
  formatStars?: (stars: number) => string;
}

/** The scale when nothing else names one. */
const FALLBACK_MAX = 5;

/** The distribution bar's height. `xs` — a rule, not a block. */
function barHeight(spacing: { xs: number }): number {
  return spacing.xs;
}

/**
 * **V4 rating summary** — same props as {@link RatingSummary} plus `maxStars`,
 * `formatCount` and `formatStars`.
 *
 * ## Five changes
 *
 * 1. **The scale is no longer hard-coded to 5.** The name said "out of 5"
 *    while the bucket labels were derived from `distribution.length`, so a
 *    10-bucket distribution announced the wrong scale beside ten rows of
 *    correct ones. `maxStars` names it, defaulting to the distribution's own
 *    length.
 * 2. **The bars are exposed.** They were drawn `View`s with no role and no
 *    value, so the shape of the distribution — the whole reason the detailed
 *    variant exists — reached only the eye. Each bucket is a `progressbar`
 *    with its count as the value.
 * 3. **A bucket says "5 stars", not "5".** A naked digit in a 16px column
 *    announces as a number with no unit.
 * 4. **Every figure is tabular.** The average, the bucket labels and the
 *    counts stack in fixed-width columns and were set proportionally, so the
 *    column of counts did not line up with itself.
 * 5. **The track survives dark mode and the average drops to a real weight.**
 *    The track was `tokens.ramps.neutral[200]`, which native copies without
 *    inverting, and the average was `fontWeight: '800'` — a step off the end
 *    of the kit's scale, which stops at bold.
 */
export function RatingSummaryV4({
  average,
  count,
  distribution,
  variant = 'compact',
  emptyLabel = 'No ratings yet',
  maxStars,
  formatCount,
  formatStars,
  style,
}: RatingSummaryV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;

  const buckets = distribution ?? [];
  const scale = maxStars ?? (buckets.length > 0 ? buckets.length : FALLBACK_MAX);
  const countWords = formatCount ?? ((n: number) => `${n} ${n === 1 ? 'rating' : 'ratings'}`);
  const starWords = formatStars ?? ((n: number) => `${n} ${n === 1 ? 'star' : 'stars'}`);

  if (count <= 0) {
    return (
      <View accessible accessibilityLabel={emptyLabel} style={[{ gap: tokens.spacing.xs }, style]}>
        <RatingV4 value={0} max={scale} size="sm" label={emptyLabel} />
        <TextV4 size="sm" tone="mutedText">
          {emptyLabel}
        </TextV4>
      </View>
    );
  }

  const stars = ratingParts({ value: average, max: scale, count });
  const name = stars.label;

  const header = (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
      <TextV4 size="3xl" weight="bold" tone="onSurface" style={TABULAR}>
        {stars.text ?? average.toFixed(1)}
      </TextV4>
      <View style={{ gap: tokens.spacing.xs / 2 }}>
        <RatingV4 value={average} max={scale} size="md" label={stars.label} />
        <TextV4 size="sm" tone="mutedText" style={TABULAR}>
          {countWords(count)}
        </TextV4>
      </View>
    </View>
  );

  if (variant !== 'detailed' || buckets.length === 0) {
    return (
      <View accessible accessibilityLabel={name} style={style}>
        {header}
      </View>
    );
  }

  const maxBucket = Math.max(1, ...buckets);

  return (
    <View style={[{ gap: tokens.spacing.md }, style]}>
      <View accessible accessibilityLabel={name}>
        {header}
      </View>
      <View style={{ gap: tokens.spacing.xs }}>
        {buckets.map((bucket, index) => {
          // The first entry is the highest star, which is the order the base
          // documents and every review UI draws.
          const star = buckets.length - index;
          const value = Number.isFinite(bucket) ? Math.max(0, bucket) : 0;
          const fraction = Math.max(0, Math.min(1, value / maxBucket));

          return (
            <View
              key={star}
              accessible
              accessibilityRole="progressbar"
              accessibilityLabel={spokenLine([starWords(star), countWords(value)])}
              accessibilityValue={{ min: 0, max: maxBucket, now: value }}
              style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}
            >
              <TextV4
                size="xs"
                tone="mutedText"
                align="right"
                style={[{ width: tokens.spacing.md }, TABULAR]}
              >
                {star}
              </TextV4>
              <View
                style={{
                  flex: 1,
                  height: barHeight(tokens.spacing),
                  borderRadius: tokens.radius.full,
                  overflow: 'hidden',
                  backgroundColor: placeholderGround(theme),
                }}
              >
                <View
                  style={{
                    width: `${fraction * 100}%`,
                    height: '100%',
                    backgroundColor: colors.accent,
                  }}
                />
              </View>
              <TextV4
                size="xs"
                tone="mutedText"
                style={[{ width: tokens.spacing.xl }, TABULAR]}
              >
                {value}
              </TextV4>
            </View>
          );
        })}
      </View>
    </View>
  );
}
