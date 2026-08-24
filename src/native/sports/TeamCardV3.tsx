import * as React from 'react';
import { Animated, Pressable, Text, View, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { usePressScale } from '../primitives/internal/motion';
import { withAlpha } from '../primitives/internal/color';
import type { TeamCardProps, TeamForm } from './TeamCard';

/** Drop-in replacement for {@link TeamCardProps} — identical shape. */
export type TeamCardV3Props = TeamCardProps;

const FORM_LABEL: Record<TeamForm, string> = { W: 'win', D: 'draw', L: 'loss' };

/**
 * TeamCard, design variant 3 — a **compact row**. A crest disc leads, the name
 * and league stack in the middle, and the rank plus a small form-dot strip trail
 * on the right. Sized for tight lists and pickers. Results read by letter +
 * a11y label, not color alone. Same props as `TeamCard`; token-pure, reduced
 * -motion press scale.
 */
export function TeamCardV3({
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
}: TeamCardV3Props): React.ReactElement {
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
    borderWidth: selected ? 2 : 1,
    borderColor: selected ? colors.primary : colors.border,
  };

  if (loading) {
    return (
      <View accessibilityState={{ busy: true }} accessibilityLabel="Loading team" style={[container, style]}>
        <View style={{ width: 32, height: 32, borderRadius: tokens.radius.full, backgroundColor: tokens.ramps.neutral[200] }} />
        <View style={{ flex: 1, height: tokens.typography.scale.base, borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[100] }} />
      </View>
    );
  }

  const hasRecord = won !== undefined || drawn !== undefined || lost !== undefined;
  const recordLabel = `${won ?? 0}W · ${drawn ?? 0}D · ${lost ?? 0}L`;
  const a11y = `${name}${rank !== undefined ? `, rank ${rank}` : ''}${hasRecord ? `, ${recordLabel}` : ''}`;

  const body = (
    <View style={[container, style]}>
      <View
        style={{
          width: 32,
          height: 32,
          borderRadius: tokens.radius.full,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: withAlpha(colors.primary, 0.08),
        }}
      >
        <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.base }}>
          {crest ?? '🛡'}
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
          {name}
        </Text>
        {league ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {league}
          </Text>
        ) : null}
      </View>
      {form.length > 0 ? (
        <View style={{ flexDirection: 'row', gap: 2 }}>
          {form.slice(-5).map((f, i) => {
            const c = f === 'W' ? colors.success : f === 'L' ? colors.danger : colors.muted;
            return (
              <View
                key={i}
                accessibilityLabel={FORM_LABEL[f]}
                style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: c }}
              />
            );
          })}
        </View>
      ) : null}
      {rank !== undefined ? (
        <Text style={{ color: colors.primaryText, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
          {`#${rank}`}
        </Text>
      ) : null}
    </View>
  );

  if (onPress) {
    return (
      <Animated.View style={{ transform: [{ scale: press.scale }] }}>
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
    <View accessible accessibilityLabel={a11y}>
      {body}
    </View>
  );
}
