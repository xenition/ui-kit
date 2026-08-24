import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';

/** A player token placed on the pitch by fractional coordinates. */
export interface LineupPlayer {
  /** Stable key / player id. */
  id: string;
  /** Short name / surname shown under the token. */
  name: string;
  /** Shirt number shown inside the token. */
  number?: number;
  /** Left position, 0–1 of pitch width. */
  x: number;
  /** Top position, 0–1 of pitch height. */
  y: number;
  /** Side — tints the token from the primary (home) / accent (away) slot. */
  side?: 'home' | 'away';
}

export interface LineupFieldProps {
  /** Player tokens to place. Empty renders a labelled placeholder pitch. */
  players?: LineupPlayer[];
  /** Formation caption (e.g. `4-3-3`). */
  formation?: string;
  /** Pitch height in px. Default 320. */
  height?: number;
  /** Fires with the tapped player. */
  onSelectPlayer?: (player: LineupPlayer) => void;
  /** Empty-state label. */
  emptyLabel?: string;
  style?: StyleProp<ViewStyle>;
}

const clamp01 = (n: number): number => (n < 0 ? 0 : n > 1 ? 1 : n);

/**
 * A starting-XI pitch — a STATIC, dependency-free placeholder built entirely
 * from styled `View`s: a token-bordered field with a halfway line + center
 * circle, and player tokens positioned by fractional (x, y) coordinates. No
 * image / SVG / native dependency; it renders anywhere. Home/away tint from the
 * primary/accent slots, reinforced by the shirt number + name label so a token
 * is identifiable without color. Empty `players` shows a labelled empty pitch.
 * Token-only colors.
 */
export function LineupField({
  players = [],
  formation,
  height = 320,
  onSelectPlayer,
  emptyLabel = 'Lineup not announced',
  style,
}: LineupFieldProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const pitch: ViewStyle = {
    height,
    borderRadius: tokens.radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: tokens.ramps.neutral[50],
    overflow: 'hidden',
  };

  const token = (p: LineupPlayer): React.ReactElement => {
    const bg = p.side === 'away' ? colors.accent : colors.primary;
    const fg = p.side === 'away' ? colors.onAccent : colors.onPrimary;
    const inner = (
      <View style={{ alignItems: 'center', width: 56 }}>
        <View
          style={{
            width: 30,
            height: 30,
            borderRadius: 15,
            backgroundColor: bg,
            borderWidth: 1,
            borderColor: colors.surface,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text allowFontScaling={false} style={{ color: fg, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>
            {p.number ?? '·'}
          </Text>
        </View>
        <Text
          numberOfLines={1}
          style={{
            marginTop: 2,
            color: colors.onSurface,
            fontSize: tokens.typography.scale.xs,
            fontWeight: '600',
            textAlign: 'center',
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
      transform: [{ translateX: -28 }, { translateY: -15 }],
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
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
          Formation {formation}
        </Text>
      ) : null}
      <View accessibilityRole="image" accessibilityLabel={`Lineup pitch${formation ? `, ${formation}` : ''}`} style={pitch}>
        {/* Halfway line + center circle — pure View decoration. */}
        <View style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1, backgroundColor: colors.border }} />
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
            borderColor: colors.border,
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
