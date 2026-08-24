import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { Avatar, Icon } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import type { DriverCardProps } from './DriverCard';

/**
 * Alternate design (v3) of {@link DriverCard} — a drop-in with the **same
 * props**. The *compact single row*: a small avatar with an online status dot,
 * the name + inline star rating, the plate chip, the ETA pinned to the trailing
 * edge, and a single call icon-tap. Availability is spelled out in the a11y
 * label (never color alone). Token-pure: semantic slots and `withAlpha` only.
 */
export type DriverCardV3Props = DriverCardProps;

export function DriverCardV3({
  name,
  avatarUrl,
  rating,
  tripCount,
  vehicle,
  plate,
  etaLabel,
  online,
  onCall,
  onPress,
  loading = false,
  style,
}: DriverCardV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const rowStyle = {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: tokens.spacing.sm,
    borderRadius: tokens.radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingVertical: tokens.spacing.sm,
    paddingHorizontal: tokens.spacing.md,
  };

  if (loading) {
    return (
      <View accessibilityLabel="Loading driver" style={[rowStyle, style]}>
        <View style={{ width: 32, height: 32, borderRadius: tokens.radius.full, backgroundColor: withAlpha(colors.muted, 0.25) }} />
        <View style={{ flex: 1, height: 14, borderRadius: tokens.radius.sm, backgroundColor: withAlpha(colors.muted, 0.18) }} />
      </View>
    );
  }

  const statusWord = online === undefined ? undefined : online ? 'Online' : 'Offline';
  const a11y = `Driver ${name}${typeof rating === 'number' ? `, rated ${rating} stars` : ''}${vehicle ? `, ${vehicle}` : ''}${
    typeof tripCount === 'number' ? `, ${tripCount} trips` : ''
  }${etaLabel ? `, ETA ${etaLabel}` : ''}${statusWord ? `, ${statusWord}` : ''}`;

  const Container: React.ElementType = onPress ? Pressable : View;

  return (
    <Container
      accessible
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityLabel={a11y}
      onPress={onPress}
      style={onPress ? ({ pressed }: { pressed: boolean }) => [rowStyle, style, { opacity: pressed ? 0.92 : 1 }] : [rowStyle, style]}
    >
      <View>
        <Avatar src={avatarUrl} name={name} size="sm" />
        {statusWord ? (
          <View
            style={{
              position: 'absolute',
              right: -1,
              bottom: -1,
              width: 10,
              height: 10,
              borderRadius: tokens.radius.full,
              backgroundColor: online ? colors.success : colors.muted,
              borderWidth: 1.5,
              borderColor: colors.surface,
            }}
          />
        ) : null}
      </View>

      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          <Text numberOfLines={1} style={{ flexShrink: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
            {name}
          </Text>
          {typeof rating === 'number' ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>★ {rating.toFixed(1)}</Text>
          ) : null}
        </View>
        {plate ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, letterSpacing: 1 }}>
            {plate}
          </Text>
        ) : null}
      </View>

      {etaLabel ? (
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={{ color: colors.primary, fontSize: tokens.typography.scale.sm, fontWeight: '800' }}>{etaLabel}</Text>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>ETA</Text>
        </View>
      ) : null}

      {onCall ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Call ${name}`}
          onPress={onCall}
          style={({ pressed }) => ({
            width: 32,
            height: 32,
            borderRadius: tokens.radius.full,
            backgroundColor: withAlpha(colors.primary, 0.14),
            alignItems: 'center',
            justifyContent: 'center',
            opacity: pressed ? 0.6 : 1,
          })}
        >
          <Icon glyph="📞" size="sm" />
        </Pressable>
      ) : null}
    </Container>
  );
}
