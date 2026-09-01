import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { formatDuration, withAlpha } from './types';
import type { RecordButtonProps, RecordButtonSize } from './RecordButton';

/** Drop-in for {@link RecordButtonProps} — same props, the V4 "session" design. */
export type RecordButtonV4Props = RecordButtonProps;

/** RecordButton's OWN size scale (sm/md/lg) — distinct from Icon sizes. */
const DIAM: Record<RecordButtonSize, number> = { sm: 44, md: 56, lg: 72 };

/**
 * RecordButton — **V4** "session" design (native parity of the web V4). The
 * tactile arm/record control: a round `danger`-token button whose glyph
 * **morphs from a ● dot (idle) to a rounded ■ square (recording)** and adds a
 * leading `●` marker + "Rec"/"Stop" label in the `labeled` variant — the state
 * is surfaced by shape, marker and label, **never color alone**. Honors every
 * `variant` (`ring` outlined, `solid` filled, `labeled` ring + text/timer) and
 * `size` (`sm`/`md`/`lg`, its own ≥44px scale). Pressing fires `onToggle(next)`;
 * the `labeled` variant shows the `elapsedSeconds` timer while recording. No
 * gradient — clean/tactile. Token-only colors via `useXenitionTheme()`.
 */
export function RecordButtonV4({
  recording,
  variant = 'ring',
  size = 'md',
  elapsedSeconds,
  disabled = false,
  onToggle,
  style,
}: RecordButtonV4Props): React.ReactElement {
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
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          {/* A ● marker rides the label so state never rests on color alone. */}
          <View style={{ width: 8, height: 8, borderRadius: tokens.radius.full, backgroundColor: accent }} />
          <Text style={{ color: recording ? accent : colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
            {recording ? 'Stop' : 'Rec'}
          </Text>
        </View>
        {recording ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600', fontVariant: ['tabular-nums'] }}>
            {formatDuration(elapsedSeconds ?? 0)}
          </Text>
        ) : null}
      </View>
    </View>
  );
}
