import * as React from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import type { LineupFieldProps, LineupPlayer } from './LineupField';

/** Drop-in for {@link LineupFieldProps} — same props, the V4 "broadcast" design. */
export type LineupFieldV4Props = LineupFieldProps;

const clamp01 = (n: number): number => (n < 0 ? 0 : n > 1 ? 1 : n);

/**
 * LineupField — **V4** "broadcast" design. The starting XI as a matchday
 * graphic: the pitch is a soft, token-derived tinted surface (a `success` wash —
 * the grass token, never a literal green) carrying a halfway line + center
 * circle, and player tokens sit on it as bold **primary** (home) / accent (away)
 * dots with shirt number + name so a token is legible without color. Formation
 * caption and per-player tap are preserved. Same props/behavior as
 * {@link LineupFieldProps}; token-only colors via `useXenitionTheme()`.
 */
export function LineupFieldV4({
  players = [],
  formation,
  height = 320,
  onSelectPlayer,
  emptyLabel = 'Lineup not announced',
  style,
}: LineupFieldV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  // Grass — a soft-success wash derived from the token, not a literal green.
  const grassLine = withAlpha(colors.success, 0.3);
  const pitch: ViewStyle = {
    height,
    borderRadius: tokens.radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: withAlpha(colors.success, 0.1),
    overflow: 'hidden',
  };

  const token = (p: LineupPlayer): React.ReactElement => {
    const away = p.side === 'away';
    const bg = away ? colors.accent : colors.primary;
    const fg = away ? colors.onAccent : colors.onPrimary;
    const inner = (
      <View style={{ alignItems: 'center', width: 56 }}>
        <View
          style={{
            width: 32,
            height: 32,
            borderRadius: 16,
            backgroundColor: bg,
            borderWidth: 2,
            borderColor: colors.surface,
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: colors.onSurface,
            shadowOpacity: 0.15,
            shadowRadius: 3,
            shadowOffset: { width: 0, height: 1 },
            elevation: 2,
          }}
        >
          <Text allowFontScaling={false} style={{ color: fg, fontSize: tokens.typography.scale.xs, fontWeight: '800' }}>
            {p.number ?? '·'}
          </Text>
        </View>
        <Text
          numberOfLines={1}
          style={{
            marginTop: 2,
            paddingHorizontal: 4,
            borderRadius: tokens.radius.full,
            backgroundColor: withAlpha(colors.surface, 0.8),
            color: colors.onSurface,
            fontSize: tokens.typography.scale.xs,
            fontWeight: '700',
            textAlign: 'center',
            overflow: 'hidden',
          }}
        >
          {p.name}
        </Text>
      </View>
    );
    const wrapper: ViewStyle = {
      position: 'absolute',
      left: `${clamp01(p.x) * 100}%`,
      top: `${clamp01(p.y) * 100}%`,
      transform: [{ translateX: -28 }, { translateY: -16 }],
    };
    const a11y = `${p.name}${p.number !== undefined ? `, number ${p.number}` : ''}, ${p.side ?? 'home'}`;
    return onSelectPlayer ? (
      <Pressable key={p.id} accessibilityRole="button" accessibilityLabel={a11y} onPress={() => onSelectPlayer(p)} style={wrapper}>
        {inner}
      </Pressable>
    ) : (
      <View key={p.id} accessible accessibilityLabel={a11y} style={wrapper}>
        {inner}
      </View>
    );
  };

  return (
    <View style={[{ gap: tokens.spacing.sm }, style]}>
      {formation ? (
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '800' }}>
          Formation {formation}
        </Text>
      ) : null}
      <View accessibilityRole="image" accessibilityLabel={`Lineup pitch${formation ? `, ${formation}` : ''}`} style={pitch}>
        {/* Halfway line + center circle — pure View decoration, token-derived. */}
        <View style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1, backgroundColor: grassLine }} />
        <View
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: 64,
            height: 64,
            marginLeft: -32,
            marginTop: -32,
            borderRadius: 32,
            borderWidth: 1,
            borderColor: grassLine,
          }}
        />
        {players.length === 0 ? (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{emptyLabel}</Text>
          </View>
        ) : (
          players.map(token)
        )}
      </View>
    </View>
  );
}

export type { LineupPlayer };
