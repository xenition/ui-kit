import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Card, Avatar } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import { StatusPill } from './StatusPill';
import {
  clampRating,
  clampPct,
  REVIEW_STATUS_META,
  type ReviewStatus,
} from './internal';

export type PerformanceReviewVariant = 'default' | 'compact';

export interface PerformanceReviewProps {
  /** Review cycle label (e.g. "H1 2026"). */
  cycle: string;
  /** Reviewer / manager name. */
  reviewer?: string;
  /** Reviewer avatar. */
  reviewerAvatarUrl?: string;
  /** Overall rating 0…`ratingMax`. Rendered as a star meter. */
  rating?: number;
  /** Rating scale ceiling (default 5). */
  ratingMax?: number;
  /** Review lifecycle status — glyph + word pill. */
  status?: ReviewStatus;
  /** Goal-completion percentage 0–100 (rendered as a meter). */
  goalCompletion?: number;
  /** Number of goals under review. */
  goalCount?: number;
  /** Pre-formatted due / meeting date. */
  dueDate?: string;
  /** Density. */
  variant?: PerformanceReviewVariant;
  /** Tap handler (open the review). */
  onPress?: () => void;
  testID?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * Performance-review summary: cycle, reviewer, a star rating meter, review
 * status, and an optional goal-completion meter. Status is a glyph + word pill
 * (never color alone) and the rating is announced numerically via a11y as well
 * as drawn with filled/empty stars. `compact` drops the goal meter. All colors
 * are theme tokens — no literals.
 */
export function PerformanceReview({
  cycle,
  reviewer,
  reviewerAvatarUrl,
  rating,
  ratingMax = 5,
  status,
  goalCompletion,
  goalCount,
  dueDate,
  variant = 'default',
  onPress,
  testID,
  style,
}: PerformanceReviewProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const compact = variant === 'compact';
  const max = Math.max(1, Math.floor(ratingMax));
  const rated = clampRating(rating, max);
  const hasRating = rating != null && Number.isFinite(rating);
  const pct = clampPct(goalCompletion);
  const showGoals = !compact && goalCompletion != null;
  const stars = Array.from({ length: max }, (_, i) => (i < Math.round(rated) ? '★' : '☆'));

  const body = (
    <Card variant="outlined" padding={compact ? 'sm' : 'md'} style={[{ gap: tokens.spacing.sm }, style]}>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: tokens.spacing.sm }}>
        <View style={{ flex: 1, gap: 2 }}>
          <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
            {cycle}
          </Text>
          {reviewer ? (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
              <Avatar size="xs" name={reviewer} src={reviewerAvatarUrl} />
              <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
                {reviewer}
              </Text>
            </View>
          ) : null}
        </View>
        {status ? <StatusPill meta={REVIEW_STATUS_META[status]} size="sm" /> : null}
      </View>

      {hasRating ? (
        <View
          accessibilityRole="text"
          accessibilityLabel={`Rating ${rated} of ${max}`}
          style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}
        >
          <Text style={{ color: colors.accent, fontSize: tokens.typography.scale.base, letterSpacing: 2 }}>
            {stars.join('')}
          </Text>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
            {rated}/{max}
          </Text>
        </View>
      ) : null}

      {showGoals ? (
        <View style={{ gap: tokens.spacing.xs / 2 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
              Goals{goalCount != null ? ` (${goalCount})` : ''}
            </Text>
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>{pct}%</Text>
          </View>
          <View
            accessibilityRole="progressbar"
            accessibilityValue={{ min: 0, max: 100, now: pct }}
            style={{ height: 6, borderRadius: tokens.radius.full, backgroundColor: withAlpha(colors.onSurface, 0.1), overflow: 'hidden' }}
          >
            <View style={{ width: `${pct}%`, height: '100%', backgroundColor: colors.primary }} />
          </View>
        </View>
      ) : null}

      {dueDate ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>Due {dueDate}</Text>
      ) : null}
    </Card>
  );

  if (onPress) {
    return (
      <Pressable accessibilityRole="button" accessibilityLabel={`Review ${cycle}`} onPress={onPress} testID={testID}>
        {body}
      </Pressable>
    );
  }
  return <View testID={testID}>{body}</View>;
}
