import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { Icon, useXenitionTheme } from '../primitives';
import { clamp, withAlpha } from './types';

export type MetronomeBarVariant = 'dots' | 'bars';

export interface MetronomeBarProps {
  /** Beats per bar (default `4`). Clamped to `1`…`16`. */
  beatsPerBar?: number;
  /** The currently sounding beat (1-based); `0`/undefined = none lit. */
  currentBeat?: number;
  /** Whether the transport is running. */
  playing?: boolean;
  /** Optional tempo shown alongside, in BPM. */
  bpm?: number;
  /**
   * - `dots` — a row of beat dots (default).
   * - `bars` — a row of taller bars.
   */
  variant?: MetronomeBarVariant;
  disabled?: boolean;
  /** Fires with the next playing state when the transport toggle is pressed. */
  onToggle?: (playing: boolean) => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A metronome / beat indicator — a UI shell only, it keeps no clock. Renders
 * `beatsPerBar` beat markers with the downbeat (beat 1) emphasized in size and
 * ring, and lights `currentBeat` via fill **and** scale (never color alone).
 * The optional transport toggle reports through `onToggle`; its state is in
 * the a11y `selected`/label. Token-only styling.
 */
export function MetronomeBar({
  beatsPerBar = 4,
  currentBeat,
  playing = false,
  bpm,
  variant = 'dots',
  disabled = false,
  onToggle,
  style,
}: MetronomeBarProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const beats = clamp(Math.trunc(Number.isFinite(beatsPerBar) ? beatsPerBar : 4), 1, 16);
  const current = currentBeat == null ? 0 : clamp(Math.trunc(currentBeat), 0, beats);
  const isDots = variant === 'dots';

  return (
    <View style={[{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, style]}>
      {onToggle ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={playing ? 'Stop metronome' : 'Start metronome'}
          accessibilityState={{ selected: playing, disabled }}
          disabled={disabled}
          onPress={() => onToggle(!playing)}
          style={({ pressed }) => ({
            width: 36,
            height: 36,
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
        accessibilityLabel={
          current > 0 ? `Beat ${current} of ${beats}${playing ? ', playing' : ''}` : `${beats} beats per bar`
        }
        style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, flex: 1 }}
      >
        {Array.from({ length: beats }).map((_, i) => {
          const beat = i + 1;
          const downbeat = beat === 1;
          const lit = playing && beat === current;
          const base = isDots ? 10 : 14;
          const size = lit ? base + 6 : downbeat ? base + 2 : base;
          return (
            <View
              key={beat}
              style={{
                width: isDots ? size : Math.max(6, size - 6),
                height: isDots ? size : size + 8,
                borderRadius: isDots ? tokens.radius.full : tokens.radius.sm,
                borderWidth: downbeat ? 2 : 0,
                borderColor: colors.accent,
                backgroundColor: lit ? colors.primary : downbeat ? withAlpha(colors.primary, 0.3) : colors.border,
              }}
            />
          );
        })}
      </View>

      {bpm != null ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>
          {Math.round(bpm)} BPM
        </Text>
      ) : null}
    </View>
  );
}
