import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { Avatar, Badge, Button, Rating } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import { shadow } from '../primitives/internal/elevation';
import { usePressScale } from '../primitives/internal/motion';
import type { DriverCardProps } from './DriverCard';

/**
 * Alternate design (v2) of {@link DriverCard} — a drop-in with the **same
 * props**. Where the original is a left-aligned row, V2 is a *centered profile
 * card*: an elevated surface, a large **ringed avatar** with an online status
 * dot, the name and rating stacked centrally, the vehicle + plate as centered
 * chips, a hero'd **ETA block**, and full-width call / message actions.
 * Availability is a text-labelled badge (not color alone). Token-pure: semantic
 * slots and `withAlpha` tints only.
 */
export type DriverCardV2Props = DriverCardProps;

export function DriverCardV2({
  name,
  avatarUrl,
  rating,
  tripCount,
  vehicle,
  plate,
  etaLabel,
  online,
  onMessage,
  onCall,
  onPress,
  loading = false,
  style,
}: DriverCardV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const press = usePressScale();

  const surface = {
    borderRadius: tokens.radius.lg,
    backgroundColor: colors.surface,
    padding: tokens.spacing.lg,
    alignItems: 'center' as const,
    gap: tokens.spacing.sm,
    ...shadow('md', tokens),
  };

  if (loading) {
    return (
      <View accessibilityLabel="Loading driver" style={[surface, style]}>
        <View style={{ width: 64, height: 64, borderRadius: tokens.radius.full, backgroundColor: withAlpha(colors.muted, 0.25) }} />
        <View style={{ height: 16, width: '50%', borderRadius: tokens.radius.sm, backgroundColor: withAlpha(colors.muted, 0.25) }} />
        <View style={{ height: 12, width: '70%', borderRadius: tokens.radius.sm, backgroundColor: withAlpha(colors.muted, 0.18) }} />
      </View>
    );
  }

  const statusWord = online === undefined ? undefined : online ? 'Online' : 'Offline';
  const a11y = `Driver ${name}${typeof rating === 'number' ? `, rated ${rating} stars` : ''}${vehicle ? `, ${vehicle}` : ''}${
    etaLabel ? `, ETA ${etaLabel}` : ''
  }${statusWord ? `, ${statusWord}` : ''}`;

  const body = (
    <>
      <View>
        <View
          style={{
            padding: 4,
            borderRadius: tokens.radius.full,
            borderWidth: 2,
            borderColor: withAlpha(online ? colors.success : colors.primary, 0.55),
          }}
        >
          <Avatar src={avatarUrl} name={name} size="xl" />
        </View>
        {statusWord ? (
          <View style={{ position: 'absolute', right: 2, bottom: 2 }}>
            <Badge tone={online ? 'success' : 'neutral'} variant="soft" size="sm" dot>
              {statusWord}
            </Badge>
          </View>
        ) : null}
      </View>

      <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '800' }}>
        {name}
      </Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, flexWrap: 'wrap', justifyContent: 'center' }}>
        {typeof rating === 'number' ? <Rating value={rating} size="sm" showValue /> : null}
        {typeof tripCount === 'number' ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{tripCount.toLocaleString()} trips</Text>
        ) : null}
      </View>

      {vehicle || plate ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, flexWrap: 'wrap', justifyContent: 'center' }}>
          {vehicle ? (
            <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
              🚗 {vehicle}
            </Text>
          ) : null}
          {plate ? (
            <View
              style={{
                borderRadius: tokens.radius.sm,
                borderWidth: 1,
                borderColor: colors.border,
                paddingVertical: 2,
                paddingHorizontal: tokens.spacing.xs,
                backgroundColor: withAlpha(colors.muted, 0.1),
              }}
            >
              <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xs, fontWeight: '700', letterSpacing: 1 }}>{plate}</Text>
            </View>
          ) : null}
        </View>
      ) : null}

      {etaLabel ? (
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            backgroundColor: withAlpha(colors.primary, 0.1),
            borderRadius: tokens.radius.md,
            paddingVertical: tokens.spacing.sm,
          }}
        >
          <Text style={{ color: colors.primary, fontSize: tokens.typography.scale.xl, fontWeight: '800' }}>{etaLabel}</Text>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>ETA to pickup</Text>
        </View>
      ) : null}

      {onMessage || onCall ? (
        <View style={{ flexDirection: 'row', gap: tokens.spacing.sm, width: '100%' }}>
          {onMessage ? (
            <View style={{ flex: 1 }}>
              <Button variant="outline" size="sm" onPress={onMessage} accessibilityLabel={`Message ${name}`}>
                Message
              </Button>
            </View>
          ) : null}
          {onCall ? (
            <View style={{ flex: 1 }}>
              <Button variant="soft" size="sm" onPress={onCall} accessibilityLabel={`Call ${name}`}>
                Call
              </Button>
            </View>
          ) : null}
        </View>
      ) : null}
    </>
  );

  if (!onPress) {
    return (
      <View accessible accessibilityLabel={a11y} style={[surface, style]}>
        {body}
      </View>
    );
  }
  return (
    <Animated.View style={{ transform: [{ scale: press.scale }] }}>
      <Pressable
        accessible
        accessibilityRole="button"
        accessibilityLabel={a11y}
        onPress={onPress}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
        style={[surface, style]}
      >
        {body}
      </Pressable>
    </Animated.View>
  );
}
