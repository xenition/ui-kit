import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Slider } from '../primitives';
import { GradientSurface } from './internal/GradientSurface';
import { calmGradient, calmInk } from './internal/calm';
import { SoundscapeRow, type SoundscapeRowProps, type Soundscape } from './SoundscapeRow';

export type SoundscapeRowV4Props = SoundscapeRowProps;

interface SoundMeta {
  glyph: string;
  label: string;
}

const SOUND_META: Record<Soundscape, SoundMeta> = {
  rain: { glyph: '🌧️', label: 'Rain' },
  ocean: { glyph: '🌊', label: 'Ocean' },
  forest: { glyph: '🌲', label: 'Forest' },
  fire: { glyph: '🔥', label: 'Fireplace' },
  wind: { glyph: '🍃', label: 'Wind' },
  stream: { glyph: '🏞️', label: 'Stream' },
  thunder: { glyph: '⛈️', label: 'Thunder' },
  'white-noise': { glyph: '📻', label: 'White noise' },
};

/**
 * SoundscapeRowV4 — the calm redesign of {@link SoundscapeRow}. Same props,
 * defaults, toggle a11y state/label, and volume slider (shown only while playing
 * with `onVolumeChange`). Only the visuals change: a clean row with a gradient
 * icon badge and a round gradient play/pause toggle as the calm accents.
 */
export function SoundscapeRowV4({
  variant,
  name,
  playing = false,
  volume = 0.5,
  onToggle,
  onVolumeChange,
  style,
}: SoundscapeRowV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const r = tokens.ramps;
  const meta = SOUND_META[variant] ?? SOUND_META.rain;
  const displayName = name ?? meta.label;

  return (
    <View
      style={[
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.md,
          gap: tokens.spacing.sm,
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
        <GradientSurface
          colors={calmGradient(r)}
          style={{
            width: 44,
            height: 44,
            borderRadius: tokens.radius.full,
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.lg, color: calmInk(r) }}>
            {meta.glyph}
          </Text>
        </GradientSurface>
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
          style={({ pressed }) => ({ borderRadius: tokens.radius.full, opacity: pressed ? 0.75 : 1 })}
        >
          <GradientSurface
            colors={calmGradient(r)}
            style={{
              width: 44,
              height: 44,
              borderRadius: tokens.radius.full,
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            <Text
              allowFontScaling={false}
              style={{ fontSize: tokens.typography.scale.base, color: calmInk(r) }}
            >
              {playing ? '⏸' : '▶'}
            </Text>
          </GradientSurface>
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
