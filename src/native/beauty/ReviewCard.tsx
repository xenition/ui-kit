import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import { Avatar, Rating } from '../primitives';

export type ReviewCardVariant = 'default' | 'compact';

export interface ReviewCardProps {
  /** Reviewer name. */
  author: string;
  /** Star rating (0–5). */
  rating: number;
  /** Review body text. */
  text?: string;
  /** Human date string (e.g. "2 weeks ago"). */
  date?: string;
  /** Service the review is about (e.g. "Balayage"). Shown as a chip. */
  service?: string;
  /** Reviewer avatar URL; initials fall back. */
  avatarUrl?: string;
  /** Marks a verified booking with a success note. */
  verified?: boolean;
  /** Density. `compact` hides the body text. */
  variant?: ReviewCardVariant;
  /** Salon reply text, shown as a nested block. */
  reply?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * A customer review card: avatar + author, a star `Rating`, an optional service
 * chip and verified badge, the review body, and an optional salon reply block.
 * `variant="compact"` drops the body for dense lists. The verified state is a
 * spoken/labelled note (not color alone). Token-only colors — chips/reply use
 * `withAlpha` tints over semantic slots.
 */
export function ReviewCard({
  author,
  rating,
  text,
  date,
  service,
  avatarUrl,
  verified = false,
  variant = 'default',
  reply,
  style,
}: ReviewCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const compact = variant === 'compact';

  return (
    <View
      accessibilityLabel={`Review by ${author}, ${rating} out of 5 stars${verified ? ', verified' : ''}${service ? `, for ${service}` : ''}`}
      style={[
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.md,
          gap: tokens.spacing.sm,
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        <Avatar src={avatarUrl} name={author} size="sm" />
        <View style={{ flex: 1, gap: 2 }}>
          <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
            {author}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
            <Rating value={rating} size="sm" />
            {date ? <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>· {date}</Text> : null}
          </View>
        </View>
        {verified ? (
          <View style={{ borderRadius: tokens.radius.sm, paddingHorizontal: tokens.spacing.xs, paddingVertical: 1, backgroundColor: withAlpha(colors.success, 0.16) }}>
            <Text style={{ color: colors.success, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>✓ Verified</Text>
          </View>
        ) : null}
      </View>

      {service ? (
        <View style={{ alignSelf: 'flex-start', borderRadius: tokens.radius.full, paddingHorizontal: tokens.spacing.sm, paddingVertical: 2, backgroundColor: withAlpha(colors.primary, 0.12) }}>
          <Text style={{ color: colors.primary, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>{service}</Text>
        </View>
      ) : null}

      {!compact && text ? (
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, lineHeight: tokens.typography.scale.sm * 1.4 }}>
          {text}
        </Text>
      ) : null}

      {reply ? (
        <View style={{ gap: 2, borderRadius: tokens.radius.md, padding: tokens.spacing.sm, backgroundColor: withAlpha(colors.muted, 0.1) }}>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>Response from salon</Text>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm }}>{reply}</Text>
        </View>
      ) : null}
    </View>
  );
}
