import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, Avatar, Badge, Button, Rating } from '../primitives';

export type SellerCardVariant = 'card' | 'inline';

export interface SellerCardProps {
  /** Seller display name / shop name. */
  name: string;
  /** Avatar image URI (falls back to initials). */
  avatarUrl?: string;
  /** Average rating (0–5). Renders a `Rating` row when provided. */
  rating?: number;
  /** Number of ratings/reviews backing the average. */
  reviewCount?: number;
  /** Total completed sales; shown in the meta line. */
  salesCount?: number;
  /** Optional location line. */
  location?: string;
  /** Verified/trusted seller flag → an accent badge. */
  verified?: boolean;
  /** Label for the primary action button (default "Contact"). */
  actionLabel?: string;
  /** Fires when the action button is pressed. Omit to hide the button. */
  onContact?: () => void;
  /** Fires when the card body is pressed (open the seller profile). */
  onPress?: () => void;
  /** Compact inline layout vs. the full card. Default `card`. */
  variant?: SellerCardVariant;
  style?: StyleProp<ViewStyle>;
}

/**
 * A seller / shop identity block — avatar, name, an optional verified badge,
 * a star rating with review count, and a sales/location meta line, plus an
 * optional contact action. Presentational: shaped data + callbacks only. The
 * contact `Button` is kept outside the card's press target so contacting never
 * also navigates. Reuses `Avatar`, `Rating`, `Badge`, `Button`; token-only
 * colors via `useXenitionTheme()`.
 */
export function SellerCard({
  name,
  avatarUrl,
  rating,
  reviewCount,
  salesCount,
  location,
  verified = false,
  actionLabel = 'Contact',
  onContact,
  onPress,
  variant = 'card',
  style,
}: SellerCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const inline = variant === 'inline';

  const meta: string[] = [];
  if (typeof salesCount === 'number') meta.push(`${salesCount.toLocaleString()} sales`);
  if (location) meta.push(location);

  const identity = (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md, flex: 1 }}>
      <Avatar src={avatarUrl} name={name} size={inline ? 'md' : 'lg'} />
      <View style={{ flex: 1, gap: 2 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
          <Text
            numberOfLines={1}
            style={{ flexShrink: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}
          >
            {name}
          </Text>
          {verified ? (
            <Badge tone="accent" variant="soft" size="sm">
              ✓ Verified
            </Badge>
          ) : null}
        </View>
        {typeof rating === 'number' ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
            <Rating value={rating} size="sm" showValue />
            {typeof reviewCount === 'number' ? (
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
                {`(${reviewCount.toLocaleString()})`}
              </Text>
            ) : null}
          </View>
        ) : null}
        {meta.length > 0 ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
            {meta.join(' · ')}
          </Text>
        ) : null}
      </View>
    </View>
  );

  const action = onContact ? (
    <Button variant="outline" size="sm" onPress={onContact}>
      {actionLabel}
    </Button>
  ) : null;

  const body = (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          borderRadius: tokens.radius.lg,
          borderWidth: inline ? 0 : 1,
          borderColor: colors.border,
          backgroundColor: inline ? 'transparent' : colors.surface,
          padding: inline ? 0 : tokens.spacing.lg,
        },
        style,
      ]}
    >
      {onPress ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`${name}${verified ? ', verified seller' : ''}${typeof rating === 'number' ? `, rated ${rating} of 5` : ''}`}
          onPress={onPress}
          style={({ pressed }) => ({ flex: 1, opacity: pressed ? 0.85 : 1 })}
        >
          {identity}
        </Pressable>
      ) : (
        identity
      )}
      {action}
    </View>
  );

  return body;
}
