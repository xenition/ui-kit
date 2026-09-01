import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme, Rating } from '../primitives';
import { GradientSurface } from './internal/GradientSurface';
import { journeyDisc, journeyInk } from './internal/journey';
import type { ReviewStarsProps } from './ReviewStars';

/** Drop-in for {@link ReviewStarsProps} — same props, the V4 "journey" design. */
export type ReviewStarsV4Props = ReviewStarsProps;

/**
 * ReviewStars — **V4** "journey" design. The boarding-pass take on an aggregate
 * review: the average sits large in near-white ink on a brand-gradient rating
 * badge (the signature V4 touch), the star row and count ride beside it, and the
 * optional per-star distribution is drawn as thin token proportion bars. Bar
 * widths are guarded against a zero total. Same props/behavior as
 * {@link ReviewStarsProps}; token-only colors via `useXenitionTheme()`. Pass
 * `compact` for a single-line layout that hides the distribution.
 */
export function ReviewStarsV4({
  average,
  total,
  distribution = [],
  summary,
  compact = false,
  style,
}: ReviewStarsV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const r = tokens.ramps;
  const maxCount = distribution.reduce((m, b) => Math.max(m, b.count), 0);

  return (
    <View
      accessible
      accessibilityLabel={`${average} out of 5${typeof total === 'number' ? `, ${total} reviews` : ''}`}
      style={[{ gap: tokens.spacing.sm }, style]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
        {/* Signature V4 touch: brand-gradient rating badge in near-white ink. */}
        <GradientSurface
          colors={journeyDisc(r)}
          style={{
            width: 56,
            height: 56,
            borderRadius: tokens.radius.lg,
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <Text style={{ color: journeyInk(r), fontSize: tokens.typography.scale['2xl'], fontWeight: '800' }}>
            {average.toFixed(1)}
          </Text>
        </GradientSurface>
        <View style={{ gap: 2 }}>
          <Rating value={average} size="sm" />
          {summary || typeof total === 'number' ? (
            <Text style={{ color: colors.mutedText, fontSize: tokens.typography.scale.xs }}>
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
                <Text style={{ width: 16, color: colors.mutedText, fontSize: tokens.typography.scale.xs }}>{b.stars}</Text>
                <View style={{ flex: 1, height: 6, borderRadius: tokens.radius.full, backgroundColor: colors.border, overflow: 'hidden' }}>
                  <GradientSurface
                    colors={journeyDisc(r)}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{ width: `${pct}%`, height: 6, borderRadius: tokens.radius.full }}
                  />
                </View>
                <Text style={{ width: 32, textAlign: 'right', color: colors.mutedText, fontSize: tokens.typography.scale.xs }}>
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
