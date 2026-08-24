import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { Avatar, Icon, formatMoney } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import type { RideRequestCardProps } from './RideRequestCard';

/**
 * Alternate design (v3) of {@link RideRequestCard} — a drop-in with the **same
 * props**. This is the *compact single line* treatment: a small rider avatar, an
 * inline `pickup → drop-off` route, the fare on the trailing edge, and a pair of
 * icon-only accept/decline taps. Built for tight lists / notification rows. The
 * accept/decline glyphs carry text a11y labels so intent never rests on color.
 * Token-pure: semantic slots and `withAlpha` tints only.
 */
export type RideRequestCardV3Props = RideRequestCardProps;

export function RideRequestCardV3({
  riderName,
  riderAvatarUrl,
  riderRating,
  pickup,
  dropoff,
  fareCents,
  currency = 'USD',
  surgeMultiplier,
  onAccept,
  onDecline,
  loading = false,
  style,
}: RideRequestCardV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const hasSurge = typeof surgeMultiplier === 'number' && surgeMultiplier > 1;

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
      <View accessibilityLabel="Loading ride request" style={[rowStyle, style]}>
        <View style={{ width: 32, height: 32, borderRadius: tokens.radius.full, backgroundColor: withAlpha(colors.muted, 0.25) }} />
        <View style={{ flex: 1, height: 14, borderRadius: tokens.radius.sm, backgroundColor: withAlpha(colors.muted, 0.18) }} />
      </View>
    );
  }

  return (
    <View
      accessible
      accessibilityLabel={`Ride request from ${riderName}, ${pickup.address} to ${dropoff.address}${hasSurge ? `, ${surgeMultiplier}x surge` : ''}`}
      style={[rowStyle, style]}
    >
      <Avatar src={riderAvatarUrl} name={riderName} size="sm" />
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          <Text numberOfLines={1} style={{ flexShrink: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
            {riderName}
          </Text>
          {typeof riderRating === 'number' ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>★ {riderRating.toFixed(1)}</Text>
          ) : null}
          {hasSurge ? (
            <Text style={{ color: colors.warn, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>⚡{surgeMultiplier}x</Text>
          ) : null}
        </View>
        <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
          {pickup.label} → {dropoff.label}
        </Text>
      </View>

      {typeof fareCents === 'number' ? (
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '800' }}>{formatMoney(fareCents, currency)}</Text>
      ) : null}

      {onDecline ? <IconTap glyph="✕" tone="danger" label={`Decline ride from ${riderName}`} onPress={onDecline} /> : null}
      {onAccept ? <IconTap glyph="✓" tone="success" label={`Accept ride from ${riderName}`} onPress={onAccept} /> : null}
    </View>
  );
}

function IconTap({ glyph, tone, label, onPress }: { glyph: string; tone: 'success' | 'danger'; label: string; onPress: () => void }): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => ({
        width: 32,
        height: 32,
        borderRadius: tokens.radius.full,
        backgroundColor: withAlpha(colors[tone], 0.14),
        alignItems: 'center',
        justifyContent: 'center',
        opacity: pressed ? 0.6 : 1,
      })}
    >
      <Icon glyph={glyph} size="sm" color={tone} />
    </Pressable>
  );
}
