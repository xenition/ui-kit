import * as React from 'react';
import { Animated, Pressable, Text, View, type ViewStyle } from 'react-native';
import { useXenitionTheme, Badge, Statistic } from '../primitives';
import { usePressScale, useEnter } from '../primitives/internal/motion';
import { shadow } from '../primitives/internal/elevation';
import { withAlpha } from '../primitives/internal/color';
import type { TeamCardProps, TeamForm } from './TeamCard';

/** Drop-in replacement for {@link TeamCardProps} — identical shape. */
export type TeamCardV2Props = TeamCardProps;

const FORM_LABEL: Record<TeamForm, string> = { W: 'win', D: 'draw', L: 'loss' };

/**
 * TeamCard, design variant 2 — a **crest hero card**. A large crest sits in a
 * tinted disc above the centered team name and league, an optional rank badge,
 * a three-up W / D / L record (built from the `Statistic` primitive), and a
 * centered recent-form strip whose results read by letter + a11y label, never
 * color alone. Same props as `TeamCard`; token-pure (elevation via `shadow`,
 * tint via `withAlpha`), reduced-motion aware.
 */
export function TeamCardV2({
  name,
  crest,
  league,
  won,
  drawn,
  lost,
  rank,
  form = [],
  selected = false,
  loading = false,
  onPress,
  style,
}: TeamCardV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const enter = useEnter();
  const press = usePressScale();

  const container: ViewStyle = {
    backgroundColor: colors.surface,
    borderColor: selected ? colors.primary : 'transparent',
    borderWidth: selected ? 2 : 0,
    borderRadius: tokens.radius.lg,
    padding: tokens.spacing.lg,
    gap: tokens.spacing.md,
    alignItems: 'center',
    ...shadow('md', tokens),
  };

  if (loading) {
    return (
      <View accessibilityState={{ busy: true }} accessibilityLabel="Loading team" style={[container, style]}>
        <View style={{ width: 72, height: 72, borderRadius: tokens.radius.full, backgroundColor: tokens.ramps.neutral[200] }} />
        <View style={{ height: tokens.typography.scale.lg, width: '60%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[200] }} />
        <View style={{ height: tokens.typography.scale.base, width: '40%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[100] }} />
      </View>
    );
  }

  const hasRecord = won !== undefined || drawn !== undefined || lost !== undefined;
  const recordLabel = `${won ?? 0}W · ${drawn ?? 0}D · ${lost ?? 0}L`;
  const a11y = `${name}${rank !== undefined ? `, rank ${rank}` : ''}${hasRecord ? `, ${recordLabel}` : ''}`;

  const hero = (
    <>
      <View
        style={{
          width: 72,
          height: 72,
          borderRadius: tokens.radius.full,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: withAlpha(colors.primary, 0.08),
        }}
      >
        <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale['3xl'] }}>
          {crest ?? '🛡'}
        </Text>
      </View>
      <View style={{ alignItems: 'center', gap: 2 }}>
        <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xl, fontWeight: '700', textAlign: 'center' }}>
          {name}
        </Text>
        {league ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {league}
          </Text>
        ) : null}
      </View>
      {rank !== undefined ? (
        <Badge tone="primary" variant="soft">{`Rank #${rank}`}</Badge>
      ) : null}
    </>
  );

  const record = hasRecord ? (
    <View
      style={{
        flexDirection: 'row',
        alignSelf: 'stretch',
        justifyContent: 'space-around',
        paddingTop: tokens.spacing.sm,
        borderTopWidth: 1,
        borderColor: colors.border,
      }}
    >
      <Statistic label="Won" value={won ?? 0} style={{ alignItems: 'center' }} />
      <Statistic label="Drawn" value={drawn ?? 0} style={{ alignItems: 'center' }} />
      <Statistic label="Lost" value={lost ?? 0} style={{ alignItems: 'center' }} />
    </View>
  ) : null;

  const formStrip = form.length > 0 ? (
    <View style={{ flexDirection: 'row', gap: tokens.spacing.xs }}>
      {form.slice(-5).map((f, i) => {
        const c = f === 'W' ? colors.success : f === 'L' ? colors.danger : colors.muted;
        return (
          <View
            key={i}
            accessibilityLabel={FORM_LABEL[f]}
            style={{
              width: 24,
              height: 24,
              borderRadius: tokens.radius.full,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: withAlpha(c, 0.12),
              borderWidth: 1,
              borderColor: c,
            }}
          >
            <Text style={{ color: c, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>{f}</Text>
          </View>
        );
      })}
    </View>
  ) : null;

  const body = (
    <View style={[container, style]}>
      {hero}
      {record}
      {formStrip}
    </View>
  );

  if (onPress) {
    return (
      <Animated.View style={{ opacity: enter.opacity, transform: [...enter.transform, { scale: press.scale }] }}>
        <Pressable
          accessibilityRole="button"
          accessibilityState={{ selected }}
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
