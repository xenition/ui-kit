import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Slider } from '../primitives';
import { withAlpha } from '../primitives/internal/color';

export type Soundscape =
  | 'rain'
  | 'ocean'
  | 'forest'
  | 'fire'
  | 'wind'
  | 'stream'
  | 'thunder'
  | 'white-noise';

interface SoundMeta {
  glyph: string;
  label: string;
  color: keyof SemanticColors;
}

const SOUND_META: Record<Soundscape, SoundMeta> = {
  rain: { glyph: '🌧️', label: 'Rain', color: 'primary' },
  ocean: { glyph: '🌊', label: 'Ocean', color: 'primary' },
  forest: { glyph: '🌲', label: 'Forest', color: 'success' },
  fire: { glyph: '🔥', label: 'Fireplace', color: 'danger' },
  wind: { glyph: '🍃', label: 'Wind', color: 'accent' },
  stream: { glyph: '🏞️', label: 'Stream', color: 'success' },
  thunder: { glyph: '⛈️', label: 'Thunder', color: 'accent' },
  'white-noise': { glyph: '📻', label: 'White noise', color: 'muted' },
};

export interface SoundscapeRowProps {
  /** Which soundscape — drives the icon, label, and accent tone. */
  variant: Soundscape;
  /** Override the default display name. */
  name?: string;
  /** Whether this soundscape is playing. */
  playing?: boolean;
  /** Volume 0–1; shows a slider when `onVolumeChange` is provided. */
  volume?: number;
  /** Fires when the play toggle is tapped, with the next playing state. */
  onToggle?: (next: boolean) => void;
  /** Fires as the volume slider moves. */
  onVolumeChange?: (volume: number) => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A soundscape mixer row: icon + name, a round play / pause toggle, and an
 * optional volume slider that appears only while playing. `playing` fills the
 * toggle and updates its a11y state + label (state, not color alone). Token-only
 * colors (semantic slots + a `withAlpha` tint).
 */
export function SoundscapeRow({
  variant,
  name,
  playing = false,
  volume = 0.5,
  onToggle,
  onVolumeChange,
  style,
}: SoundscapeRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = SOUND_META[variant] ?? SOUND_META.rain;
  const accent = colors[meta.color];
  const displayName = name ?? meta.label;

  return (
    <View
      style={[
        {
          backgroundColor: colors.surface,
          borderColor: playing ? accent : colors.border,
          borderWidth: 1,
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.md,
          gap: tokens.spacing.sm,
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: tokens.radius.full,
            backgroundColor: withAlpha(accent, 0.16),
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.lg }}>
            {meta.glyph}
          </Text>
        </View>
        <Text
          style={{ flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}
        >
          {displayName}
        </Text>
        <Pressable
          accessibilityRole="button"
          accessibilityState={{ selected: playing }}
          accessibilityLabel={`${playing ? 'Stop' : 'Play'} ${displayName}`}
          onPress={() => onToggle?.(!playing)}
          style={({ pressed }) => ({
            width: 40,
            height: 40,
            borderRadius: tokens.radius.full,
            backgroundColor: playing ? accent : withAlpha(accent, 0.16),
            alignItems: 'center',
            justifyContent: 'center',
            opacity: pressed ? 0.75 : 1,
          })}
        >
          <Text
            allowFontScaling={false}
            style={{ fontSize: tokens.typography.scale.base, color: playing ? colors.onPrimary : accent }}
          >
            {playing ? '⏸' : '▶'}
          </Text>
        </Pressable>
      </View>

      {playing && onVolumeChange ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
          <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.sm }}>
            🔉
          </Text>
          <View style={{ flex: 1 }}>
            <Slider value={volume} min={0} max={1} step={0.05} onValueChange={onVolumeChange} />
          </View>
        </View>
      ) : null}
    </View>
  );
}
