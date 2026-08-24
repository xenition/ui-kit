import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, Avatar, Button, Icon } from '../primitives';

/** Layout density for an {@link AgentCard}. */
export type AgentCardVariant = 'default' | 'compact';

export interface AgentCardProps {
  /** Agent's full name. */
  name: string;
  /** Role / title (e.g. "Listing Agent"). */
  title?: string;
  /** Brokerage / agency name. */
  agency?: string;
  /** Avatar image URI; falls back to initials. */
  avatarUrl?: string;
  /** Star rating, 0–5. */
  rating?: number;
  /** Number of reviews backing the rating. */
  reviewCount?: number;
  /** Primary action label (default "Contact"). */
  contactLabel?: string;
  /** Fires when the primary action is pressed. */
  onContact?: () => void;
  /** Fires when the card body is pressed (e.g. open the agent profile). */
  onPress?: () => void;
  /** Density variant. */
  variant?: AgentCardVariant;
  style?: StyleProp<ViewStyle>;
}

/**
 * A listing agent summary — avatar (initials fallback), name/title/agency, an
 * optional star rating with review count, and a contact action. Data +
 * callbacks only; nothing fetches. `variant="compact"` drops the rating row for
 * dense lists. Reuses the shared `Avatar`, `Button`, and `Icon` primitives;
 * token-only colors and an a11y label describing the agent.
 */
export function AgentCard({
  name,
  title,
  agency,
  avatarUrl,
  rating,
  reviewCount,
  contactLabel = 'Contact',
  onContact,
  onPress,
  variant = 'default',
  style,
}: AgentCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const compact = variant === 'compact';
  const hasRating = typeof rating === 'number';
  const fullStars = hasRating ? Math.round(Math.min(Math.max(rating!, 0), 5)) : 0;

  const meta = [title, agency].filter(Boolean).join(' · ');

  const body = (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          borderRadius: tokens.radius.lg,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.surface,
          padding: compact ? tokens.spacing.md : tokens.spacing.lg,
        },
        style,
      ]}
    >
      <Avatar src={avatarUrl} name={name} size={compact ? 'md' : 'lg'} />
      <View style={{ flex: 1, gap: 2 }}>
        <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>
          {name}
        </Text>
        {meta ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
            {meta}
          </Text>
        ) : null}
        {hasRating && !compact ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
            <View style={{ flexDirection: 'row' }}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Icon key={i} glyph={i < fullStars ? '★' : '☆'} size="sm" color={i < fullStars ? 'warn' : 'muted'} />
              ))}
            </View>
            {typeof reviewCount === 'number' ? (
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{`(${reviewCount})`}</Text>
            ) : null}
          </View>
        ) : null}
      </View>
      {onContact ? (
        <Button variant="secondary" size="sm" onPress={onContact}>
          {contactLabel}
        </Button>
      ) : null}
    </View>
  );

  if (!onPress) return body;

  const ratingLabel = hasRating ? `, rated ${rating} of 5` : '';
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${name}${meta ? `, ${meta}` : ''}${ratingLabel}`}
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.9 : 1 })}
    >
      {body}
    </Pressable>
  );
}
