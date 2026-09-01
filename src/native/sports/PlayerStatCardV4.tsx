import * as React from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';
import { useXenitionTheme, Avatar, type SemanticColors } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import type { PlayerStatCardProps, PlayerStat } from './PlayerStatCard';

/** Drop-in for {@link PlayerStatCardProps} — same props, the V4 "broadcast" design. */
export type PlayerStatCardV4Props = PlayerStatCardProps;

const STATUS_META: Record<
  NonNullable<PlayerStatCardV4Props['status']>,
  { label: string; glyph: string; slot: keyof SemanticColors }
> = {
  available: { label: 'Available', glyph: '✓', slot: 'success' },
  injured: { label: 'Injured', glyph: '＋', slot: 'danger' },
  suspended: { label: 'Suspended', glyph: '⛔', slot: 'warn' },
};

/**
 * PlayerStatCard — **V4** "broadcast" design. The matchday take on a player
 * profile: an elevated card with a shirt-number chip in a soft-primary tint,
 * name/position/team, an availability pill that reads by glyph + text (never color
 * alone), and the key stats as big bold numerals over muted labels — the leading
 * `highlight` stat sits on a soft-primary tile. Same props/behavior as
 * {@link PlayerStatCardProps}; token-only colors via `useXenitionTheme()`.
 * `loading` swaps in a token skeleton.
 */
export function PlayerStatCardV4({
  name,
  position,
  number,
  photo,
  team,
  stats = [],
  variant = 'full',
  status,
  loading = false,
  onPress,
  style,
}: PlayerStatCardV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const compact = variant === 'compact';

  const container: ViewStyle = {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: tokens.radius.lg,
    padding: tokens.spacing.md,
    gap: tokens.spacing.md,
    shadowColor: colors.onSurface,
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  };

  if (loading) {
    return (
      <View accessibilityState={{ busy: true }} accessibilityLabel="Loading player" style={[container, style]}>
        <View style={{ flexDirection: 'row', gap: tokens.spacing.sm, alignItems: 'center' }}>
          <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: withAlpha(colors.onSurface, 0.1) }} />
          <View style={{ flex: 1, gap: tokens.spacing.xs }}>
            <View style={{ height: tokens.typography.scale.base, borderRadius: tokens.radius.sm, backgroundColor: withAlpha(colors.onSurface, 0.1) }} />
            <View style={{ height: tokens.typography.scale.sm, width: '50%', borderRadius: tokens.radius.sm, backgroundColor: withAlpha(colors.onSurface, 0.1) }} />
          </View>
        </View>
      </View>
    );
  }

  const meta = status ? STATUS_META[status] : undefined;
  const metaColor = meta ? colors[meta.slot] : colors.muted;

  const header = (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
      <Avatar src={photo} name={name} size={compact ? 'sm' : 'lg'} />
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          {number !== undefined ? (
            <View
              style={{
                minWidth: 24,
                height: 24,
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 4,
                borderRadius: tokens.radius.md,
                backgroundColor: withAlpha(colors.primary, 0.12),
              }}
            >
              <Text style={{ color: colors.primary, fontSize: tokens.typography.scale.sm, fontWeight: '800' }}>
                {number}
              </Text>
            </View>
          ) : null}
          <Text
            numberOfLines={1}
            style={{ flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '800' }}
          >
            {name}
          </Text>
        </View>
        <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
          {[position, team].filter(Boolean).join(' · ') || 'Player'}
        </Text>
      </View>
      {meta ? (
        <View
          accessibilityLabel={meta.label}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.xs,
            paddingHorizontal: tokens.spacing.sm,
            paddingVertical: 2,
            borderRadius: tokens.radius.full,
            backgroundColor: withAlpha(metaColor, 0.12),
          }}
        >
          <Text allowFontScaling={false} style={{ color: metaColor, fontSize: tokens.typography.scale.xs }}>
            {meta.glyph}
          </Text>
          <Text style={{ color: metaColor, fontSize: tokens.typography.scale.xs, fontWeight: '800' }}>
            {meta.label}
          </Text>
        </View>
      ) : null}
    </View>
  );

  const renderStat = (s: PlayerStat, i: number): React.ReactElement => (
    <View
      key={`${s.label}-${i}`}
      style={{
        minWidth: 72,
        flexGrow: 1,
        flexBasis: '28%',
        padding: tokens.spacing.sm,
        borderRadius: tokens.radius.md,
        backgroundColor: s.highlight ? withAlpha(colors.primary, 0.12) : withAlpha(colors.onSurface, 0.05),
      }}
    >
      <Text
        style={{
          color: s.highlight ? colors.primary : colors.onSurface,
          fontSize: tokens.typography.scale['2xl'],
          fontWeight: '800',
        }}
      >
        {s.value}
      </Text>
      <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
        {s.label}
      </Text>
    </View>
  );

  const grid =
    !compact && stats.length > 0 ? (
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }}>
        {stats.map(renderStat)}
      </View>
    ) : !compact ? (
      <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>No stats recorded</Text>
    ) : null;

  const body = (
    <View style={[container, style]}>
      {header}
      {grid}
    </View>
  );

  const a11y = `${name}${position ? `, ${position}` : ''}${meta ? `, ${meta.label}` : ''}`;

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={a11y}
        onPress={onPress}
        style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
      >
        {body}
      </Pressable>
    );
  }
  return (
    <View accessible accessibilityLabel={a11y}>
      {body}
    </View>
  );
}
