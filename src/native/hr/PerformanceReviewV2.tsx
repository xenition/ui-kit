import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Avatar } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import { shadow } from '../primitives/internal/elevation';
import { useEnter } from '../primitives/internal/motion';
import { StatusPill } from './StatusPill';
import { clampPct, clampRating, REVIEW_STATUS_META } from './internal';
import type { PerformanceReviewProps } from './PerformanceReview';

/** Drop-in alternate design for {@link PerformanceReview} — identical Props. */
export type PerformanceReviewV2Props = PerformanceReviewProps;

/**
 * PerformanceReview, design **V2** — a card pairing a prominent star meter with
 * a circular goal-completion ring. The ring is a four-arc gauge whose lit
 * segments track the percentage, with the number in its centre (so progress is
 * read by both position and text, never color alone). Rating is announced
 * numerically via a11y as well as drawn. Same Props as {@link PerformanceReview}.
 * Elevated + mount-fade, token-pure.
 */
export function PerformanceReviewV2({
  cycle,
  reviewer,
  reviewerAvatarUrl,
  rating,
  ratingMax = 5,
  status,
  goalCompletion,
  goalCount,
  dueDate,
  onPress,
  testID,
  style,
}: PerformanceReviewV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const enter = useEnter();
  const max = Math.max(1, Math.floor(ratingMax));
  const rated = clampRating(rating, max);
  const hasRating = rating != null && Number.isFinite(rating);
  const pct = clampPct(goalCompletion);
  const hasGoals = goalCompletion != null;
  const stars = Array.from({ length: max }, (_, i) => (i < Math.round(rated) ? '★' : '☆'));

  // Four-arc ring: each border side lights once its threshold is passed.
  const track = withAlpha(colors.onSurface, 0.12);
  const lit = colors.primary;
  const arc = (threshold: number): string => (pct >= threshold ? lit : track);

  const card = (
    <Animated.View
      style={[
        {
          opacity: enter.opacity,
          transform: enter.transform,
          borderRadius: tokens.radius.lg,
          backgroundColor: colors.surface,
          padding: tokens.spacing.md,
          gap: tokens.spacing.sm,
          ...shadow('md', tokens),
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: tokens.spacing.sm }}>
        <View style={{ flex: 1, minWidth: 0, gap: 2 }}>
          <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>{cycle}</Text>
          {reviewer ? (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
              <Avatar size="xs" name={reviewer} src={reviewerAvatarUrl} />
              <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{reviewer}</Text>
            </View>
          ) : null}
        </View>
        {status ? <StatusPill meta={REVIEW_STATUS_META[status]} size="sm" /> : null}
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
        {/* Star meter */}
        <View style={{ flex: 1, minWidth: 0, gap: tokens.spacing.xs }}>
          {hasRating ? (
            <View accessibilityRole="text" accessibilityLabel={`Rating ${rated} of ${max}`} style={{ gap: 2 }}>
              <Text style={{ color: colors.accent, fontSize: tokens.typography.scale.xl, letterSpacing: 3 }}>{stars.join('')}</Text>
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>{rated}/{max} overall</Text>
            </View>
          ) : (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>Not yet rated</Text>
          )}
          {dueDate ? <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>Due {dueDate}</Text> : null}
        </View>

        {/* Goal-completion ring */}
        {hasGoals ? (
          <View
            accessibilityRole="progressbar"
            accessibilityLabel={`Goals ${pct}%`}
            accessibilityValue={{ min: 0, max: 100, now: pct }}
            style={{
              width: 72,
              height: 72,
              borderRadius: tokens.radius.full,
              borderWidth: 6,
              borderTopColor: arc(76),
              borderRightColor: arc(1),
              borderBottomColor: arc(26),
              borderLeftColor: arc(51),
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>{pct}%</Text>
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
              {goalCount != null ? `${goalCount} goals` : 'goals'}
            </Text>
          </View>
        ) : null}
      </View>
    </Animated.View>
  );

  if (onPress) {
    return (
      <Pressable accessibilityRole="button" accessibilityLabel={`Review ${cycle}`} onPress={onPress} testID={testID}>
        {card}
      </Pressable>
    );
  }
  return <View testID={testID}>{card}</View>;
}
