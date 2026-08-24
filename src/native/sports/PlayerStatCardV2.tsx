import * as React from 'react';
import { Animated, Pressable, Text, View, type ViewStyle } from 'react-native';
import { useXenitionTheme, Avatar, Icon } from '../primitives';
import { usePressScale, useEnter } from '../primitives/internal/motion';
import { shadow } from '../primitives/internal/elevation';
import { withAlpha } from '../primitives/internal/color';
import type { PlayerStatCardProps } from './PlayerStatCard';

/** Drop-in replacement for {@link PlayerStatCardProps} — identical shape. */
export type PlayerStatCardV2Props = PlayerStatCardProps;

const STATUS_META: Record<
  NonNullable<PlayerStatCardProps['status']>,
  { label: string; glyph: string; slot: 'success' | 'danger' | 'warn' }
> = {
  available: { label: 'Available', glyph: '✓', slot: 'success' },
  injured: { label: 'Injured', glyph: '＋', slot: 'danger' },
  suspended: { label: 'Suspended', glyph: '⛔', slot: 'warn' },
};

/**
 * PlayerStatCard, design variant 2 — a **profile card**. A large ringed avatar
 * sits centered above the shirt number, name, and position/team caption, with
 * an availability chip (glyph + text, never color alone) and a bordered stat
 * grid below. Highlighted stats draw in the primary text accent. Same props as
 * `PlayerStatCard`; token-pure (`shadow`, `withAlpha`), reduced-motion aware.
 */
export function PlayerStatCardV2({
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
}: PlayerStatCardV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const enter = useEnter();
  const press = usePressScale();

  const container: ViewStyle = {
    backgroundColor: colors.surface,
    borderRadius: tokens.radius.lg,
    padding: tokens.spacing.lg,
    gap: tokens.spacing.md,
    alignItems: 'center',
    ...shadow('md', tokens),
  };

  if (loading) {
    return (
      <View accessibilityState={{ busy: true }} accessibilityLabel="Loading player" style={[container, style]}>
        <View style={{ width: 72, height: 72, borderRadius: tokens.radius.full, backgroundColor: tokens.ramps.neutral[200] }} />
        <View style={{ height: tokens.typography.scale.lg, width: '55%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[200] }} />
        <View style={{ height: tokens.typography.scale.sm, width: '35%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[100] }} />
      </View>
    );
  }

  const meta = status ? STATUS_META[status] : undefined;
  const metaColor =
    meta?.slot === 'success' ? colors.successText : meta?.slot === 'danger' ? colors.dangerText : colors.warnText;
  const metaAccent =
    meta?.slot === 'success' ? colors.success : meta?.slot === 'danger' ? colors.danger : colors.warn;

  const a11y = `${name}${position ? `, ${position}` : ''}${meta ? `, ${meta.label}` : ''}`;

  const hero = (
    <>
      <Avatar src={photo} name={name} size="xl" ring />
      <View style={{ alignItems: 'center', gap: 2 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          {number !== undefined ? (
            <Text style={{ color: colors.primaryText, fontSize: tokens.typography.scale.lg, fontWeight: '800' }}>
              {number}
            </Text>
          ) : null}
          <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xl, fontWeight: '700' }}>
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
            borderWidth: 1,
            borderColor: metaAccent,
            backgroundColor: withAlpha(metaAccent, 0.1),
          }}
        >
          <Icon glyph={meta.glyph} size="xs" style={{ color: metaColor }} />
          <Text style={{ color: metaColor, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>{meta.label}</Text>
        </View>
      ) : null}
    </>
  );

  const grid =
    stats.length > 0 ? (
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignSelf: 'stretch',
          borderTopWidth: 1,
          borderColor: colors.border,
          paddingTop: tokens.spacing.sm,
        }}
      >
        {stats.map((s, i) => (
          <View
            key={`${s.label}-${i}`}
            style={{
              width: '33.33%',
              paddingVertical: tokens.spacing.sm,
              alignItems: 'center',
            }}
          >
            <Text style={{ color: s.highlight ? colors.primaryText : colors.onSurface, fontSize: tokens.typography.scale.xl, fontWeight: '800' }}>
              {s.value}
            </Text>
            <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
              {s.label}
            </Text>
          </View>
        ))}
      </View>
    ) : (
      <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>No stats recorded</Text>
    );

  const body = (
    <View style={[container, style]}>
      {hero}
      {grid}
    </View>
  );

  if (onPress) {
    return (
      <Animated.View style={{ opacity: enter.opacity, transform: [...enter.transform, { scale: press.scale }] }}>
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
    <Animated.View style={{ opacity: enter.opacity, transform: enter.transform }}>
      <View accessible accessibilityLabel={a11y}>
        {body}
      </View>
    </Animated.View>
  );
}
