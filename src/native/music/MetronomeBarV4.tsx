import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Icon, useXenitionTheme } from '../primitives';
import { clamp, withAlpha } from './types';
import type { MetronomeBarProps } from './MetronomeBar';

/** Drop-in for {@link MetronomeBarProps} — same props, the V4 "session" design. */
export type MetronomeBarV4Props = MetronomeBarProps;

/**
 * MetronomeBar — **V4** "session" design (native parity of the web V4). The
 * tactile beat strip: `beatsPerBar` cells sit on a rounded token surface, each
 * 44px tall in the `bars` variant / a chunky dot in `dots`. The downbeat
 * (beat 1) is emphasized with an accent ring, and the `currentBeat` lights via
 * a primary fill **and** an inset marker dot (never color alone) — only while
 * `playing`. The optional transport toggle reports through `onToggle`; state is
 * in the a11y `selected`/label. The optional `bpm` shows in bold tabular
 * numerals. No gradient — clean/tactile. Token-only colors via
 * `useXenitionTheme()`.
 */
export function MetronomeBarV4({
  beatsPerBar = 4,
  currentBeat,
  playing = false,
  bpm,
  variant = 'dots',
  disabled = false,
  onToggle,
  style,
}: MetronomeBarV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const beats = clamp(Math.trunc(Number.isFinite(beatsPerBar) ? beatsPerBar : 4), 1, 16);
  const current = currentBeat == null ? 0 : clamp(Math.trunc(currentBeat), 0, beats);
  const isDots = variant === 'dots';

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.sm,
          padding: tokens.spacing.sm,
          borderRadius: tokens.radius.lg,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.surface,
        },
        style,
      ]}
    >
      {onToggle ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={playing ? 'Stop metronome' : 'Start metronome'}
          accessibilityState={{ selected: playing, disabled }}
          disabled={disabled}
          onPress={() => onToggle(!playing)}
          style={({ pressed }) => ({
            width: 44,
            height: 44,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: tokens.radius.full,
            backgroundColor: playing ? colors.primary : withAlpha(colors.primary, 0.16),
            opacity: disabled ? 0.5 : pressed ? 0.85 : 1,
          })}
        >
          <Icon glyph={playing ? '⏸' : '▶'} size="sm" color={playing ? 'onPrimary' : 'primary'} />
        </Pressable>
      ) : null}

      <View
        accessibilityRole="image"
        accessibilityLabel={current > 0 ? `Beat ${current} of ${beats}${playing ? ', playing' : ''}` : `${beats} beats per bar`}
        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: tokens.spacing.xs, flex: 1 }}
      >
        {Array.from({ length: beats }).map((_, i) => {
          const beat = i + 1;
          const downbeat = beat === 1;
          const lit = playing && beat === current;
          return (
            <View
              key={beat}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: isDots ? (lit ? 22 : downbeat ? 18 : 14) : lit ? 16 : 12,
                height: isDots ? (lit ? 22 : downbeat ? 18 : 14) : 44,
                borderRadius: isDots ? tokens.radius.full : tokens.radius.sm,
                borderWidth: downbeat ? 2 : 0,
                borderColor: colors.accent,
                backgroundColor: lit ? colors.primary : downbeat ? withAlpha(colors.primary, 0.3) : colors.border,
              }}
            >
              {/* Inset marker dot on the lit beat — a shape cue, never color alone. */}
              {lit ? (
                <View style={{ width: 6, height: 6, borderRadius: tokens.radius.full, backgroundColor: colors.onPrimary }} />
              ) : null}
            </View>
          );
        })}
      </View>

      {bpm != null ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700', fontVariant: ['tabular-nums'] }}>
          {Math.round(bpm)} BPM
        </Text>
      ) : null}
    </View>
  );
}
