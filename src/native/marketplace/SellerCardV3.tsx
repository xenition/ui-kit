import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme, Avatar, Rating } from '../primitives';
import { withAlpha } from './internal';
import type { SellerCardProps } from './SellerCard';

/** Drop-in alternate of {@link SellerCardProps} — identical prop contract. */
export type SellerCardV3Props = SellerCardProps;

/**
 * SellerCard — Design V3: a **minimal trust-line**. No card chrome — just a
 * leading avatar, the name with an inline verified check, a single condensed
 * meta line (rating · sales · location), and the contact action rendered as a
 * quiet text link on the trailing edge. A hairline underline is the only
 * separator. Deliberately lightweight for dense lists — the opposite of the V2
 * profile banner. Same props as `SellerCard`; the contact link stays outside
 * the profile press target; token-pure colors.
 */
export function SellerCardV3({
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
  style,
}: SellerCardV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const meta: string[] = [];
  if (typeof salesCount === 'number') meta.push(`${salesCount.toLocaleString()} sales`);
  if (location) meta.push(location);

  const identity = (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, flex: 1 }}>
      <Avatar src={avatarUrl} name={name} size="md" />
      <View style={{ flex: 1, gap: 2 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          <Text
            numberOfLines={1}
            style={{ flexShrink: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}
          >
            {name}
          </Text>
          {verified ? (
            <Text
              accessibilityRole="image"
              accessibilityLabel="Verified seller"
              style={{ color: colors.accentText, fontSize: tokens.typography.scale.sm }}
            >
              ✓
            </Text>
          ) : null}
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, flexWrap: 'wrap' }}>
          {typeof rating === 'number' ? <Rating value={rating} size="sm" showValue /> : null}
          {typeof rating === 'number' && typeof reviewCount === 'number' ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{`(${reviewCount.toLocaleString()})`}</Text>
          ) : null}
          {meta.length > 0 ? (
            <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm, flexShrink: 1 }}>
              {(typeof rating === 'number' ? '· ' : '') + meta.join(' · ')}
            </Text>
          ) : null}
        </View>
      </View>
    </View>
  );

  const action = onContact ? (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={actionLabel}
      onPress={onContact}
      hitSlop={8}
      style={({ pressed }) => ({ paddingHorizontal: tokens.spacing.xs, paddingVertical: tokens.spacing.xs, opacity: pressed ? 0.6 : 1 })}
    >
      <Text style={{ color: colors.primaryText, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>{actionLabel}</Text>
    </Pressable>
  ) : null;

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.sm,
          paddingVertical: tokens.spacing.md,
          paddingHorizontal: tokens.spacing.xs,
          borderBottomWidth: 1,
          borderBottomColor: withAlpha(colors.border, 0.6),
          backgroundColor: 'transparent',
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
}
