import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { formatDuration, withAlpha } from './types';

export type RecordButtonVariant = 'ring' | 'solid' | 'labeled';
export type RecordButtonSize = 'sm' | 'md' | 'lg';

export interface RecordButtonProps {
  /** Whether recording is in progress. */
  recording: boolean;
  /**
   * - `ring` — circular record button, dot ⟷ square morph (default).
   * - `solid` — filled danger circle.
   * - `labeled` — `ring` plus a "Rec"/"Stop" label + optional timer.
   */
  variant?: RecordButtonVariant;
  /** Button size (default `md`). */
  size?: RecordButtonSize;
  /** Elapsed record time in seconds (shown in the `labeled` variant). */
  elapsedSeconds?: number;
  disabled?: boolean;
  /** Fires with the next recording state when pressed. */
  onToggle?: (recording: boolean) => void;
  style?: StyleProp<ViewStyle>;
}

const DIAM: Record<RecordButtonSize, number> = { sm: 40, md: 56, lg: 72 };

/**
 * A record toggle button — a UI shell only, it captures nothing. Shows a
 * record affordance that morphs from a dot (idle) to a rounded square
 * (recording); the state is surfaced in the a11y label + `selected` state and
 * the shape change, never color alone. Pressing fires `onToggle(next)`. The
 * `labeled` variant adds a "Rec"/"Stop" label and an elapsed timer. Uses the
 * `danger` token for the record accent; no literal colors.
 */
export function RecordButton({
  recording,
  variant = 'ring',
  size = 'md',
  elapsedSeconds,
  disabled = false,
  onToggle,
  style,
}: RecordButtonProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const diam = DIAM[size];
  const accent = colors.danger;
  const solid = variant === 'solid';

  const button = (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={recording ? 'Stop recording' : 'Start recording'}
      accessibilityState={{ selected: recording, disabled }}
      disabled={disabled}
      onPress={() => onToggle?.(!recording)}
      style={({ pressed }) => ({
        width: diam,
        height: diam,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: tokens.radius.full,
        borderWidth: solid ? 0 : 3,
        borderColor: accent,
        backgroundColor: solid ? accent : withAlpha(accent, recording ? 0.18 : 0),
        opacity: disabled ? 0.5 : pressed ? 0.85 : 1,
      })}
    >
      <View
        style={{
          // Dot when idle, rounded square when recording (shape = state).
          width: recording ? diam * 0.36 : diam * 0.5,
          height: recording ? diam * 0.36 : diam * 0.5,
          borderRadius: recording ? tokens.radius.sm : tokens.radius.full,
          backgroundColor: solid ? colors.onDanger : accent,
        }}
      />
    </Pressable>
  );

  if (variant !== 'labeled') {
    return <View style={style}>{button}</View>;
  }

  return (
    <View style={[{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, style]}>
      {button}
      <View style={{ gap: 2 }}>
        <Text style={{ color: recording ? accent : colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
          {recording ? 'Stop' : 'Rec'}
        </Text>
        {recording ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
            {formatDuration(elapsedSeconds ?? 0)}
          </Text>
        ) : null}
      </View>
    </View>
  );
}
