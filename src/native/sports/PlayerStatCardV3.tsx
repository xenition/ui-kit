import * as React from 'react';
import { Animated, Pressable, Text, View, type ViewStyle } from 'react-native';
import { useXenitionTheme, Avatar, Icon } from '../primitives';
import { usePressScale } from '../primitives/internal/motion';
import type { PlayerStatCardProps } from './PlayerStatCard';

/** Drop-in replacement for {@link PlayerStatCardProps} — identical shape. */
export type PlayerStatCardV3Props = PlayerStatCardProps;

const STATUS_META: Record<
  NonNullable<PlayerStatCardProps['status']>,
  { label: string; glyph: string; slot: 'success' | 'danger' | 'warn' }
> = {
  available: { label: 'Available', glyph: '✓', slot: 'success' },
  injured: { label: 'Injured', glyph: '＋', slot: 'danger' },
  suspended: { label: 'Suspended', glyph: '⛔', slot: 'warn' },
};

/**
 * PlayerStatCard, design variant 3 — a **dense stat row**. A small avatar leads,
 * then shirt number + name + position stacked, and the stat cells run inline on
 * the right as tight value / label pairs. Availability is a leading glyph on the
 * name (glyph + a11y label, never color alone). Sized for tables and roster
 * lists. Same props as `PlayerStatCard`; token-pure, reduced-motion press scale.
 */
export function PlayerStatCardV3({
  name,
  position,
  number,
  photo,
  team,
  stats = [],
  status,
  loading = false,
  onPress,
  style,
}: PlayerStatCardV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const press = usePressScale();

  const container: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.spacing.sm,
    paddingVertical: tokens.spacing.sm,
    paddingHorizontal: tokens.spacing.md,
    backgroundColor: colors.surface,
    borderRadius: tokens.radius.md,
    borderWidth: 1,
    borderColor: colors.border,
  };

  if (loading) {
    return (
      <View accessibilityState={{ busy: true }} accessibilityLabel="Loading player" style={[container, style]}>
        <View style={{ width: 32, height: 32, borderRadius: tokens.radius.full, backgroundColor: tokens.ramps.neutral[200] }} />
        <View style={{ flex: 1, height: tokens.typography.scale.base, borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[100] }} />
      </View>
    );
  }

  const meta = status ? STATUS_META[status] : undefined;
  const metaColor =
    meta?.slot === 'success' ? colors.successText : meta?.slot === 'danger' ? colors.dangerText : colors.warnText;
  const a11y = `${name}${position ? `, ${position}` : ''}${meta ? `, ${meta.label}` : ''}`;

  const body = (
    <View style={[container, style]}>
      <Avatar src={photo} name={name} size="sm" />
      <View style={{ flexShrink: 1, minWidth: 96 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          {number !== undefined ? (
            <Text style={{ color: colors.primaryText, fontSize: tokens.typography.scale.sm, fontWeight: '800' }}>
              {number}
            </Text>
          ) : null}
          {meta ? <Icon glyph={meta.glyph} size="xs" style={{ color: metaColor }} accessibilityLabel={meta.label} /> : null}
          <Text numberOfLines={1} style={{ flexShrink: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
            {name}
          </Text>
        </View>
        <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
          {[position, team].filter(Boolean).join(' · ') || 'Player'}
        </Text>
      </View>
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', gap: tokens.spacing.md }}>
        {stats.length > 0 ? (
          stats.slice(0, 4).map((s, i) => (
            <View key={`${s.label}-${i}`} style={{ alignItems: 'center', minWidth: 34 }}>
              <Text style={{ color: s.highlight ? colors.primaryText : colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '800' }}>
                {s.value}
              </Text>
              <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
                {s.label}
              </Text>
            </View>
          ))
        ) : (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, alignSelf: 'center' }}>No stats</Text>
        )}
      </View>
    </View>
  );

  if (onPress) {
    return (
      <Animated.View style={{ transform: [{ scale: press.scale }] }}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={a11y}
          onPress={onPress}
          onPressIn={press.onPressIn}
          onPressOut={press.onPressOut}
        >
          {body}
        </Pressable>
      </Animated.View>
    );
  }

  return (
    <View accessible accessibilityLabel={a11y}>
      {body}
    </View>
  );
}
