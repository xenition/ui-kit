import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Progress } from '../primitives';
import { withAlpha } from '../primitives/internal/color';

export type SessionTimerTone = 'primary' | 'accent' | 'success';

export interface SessionTimerProps {
  /** Total session length in seconds. */
  totalSec: number;
  /** Seconds remaining; clamped to `[0, totalSec]`. */
  remainingSec: number;
  /** Whether the timer is currently counting down. */
  running?: boolean;
  /** Optional phase caption, e.g. "Body scan". */
  phaseLabel?: string;
  /** Accent tone. Default `'primary'`. */
  tone?: SessionTimerTone;
  /** Fires when the play / pause control is tapped, with the next running state. */
  onToggle?: (next: boolean) => void;
  /** Fires when the reset control is tapped (omit to hide it). */
  onReset?: () => void;
  style?: StyleProp<ViewStyle>;
}

const TONE_KEY: Record<SessionTimerTone, keyof SemanticColors> = {
  primary: 'primary',
  accent: 'accent',
  success: 'success',
};

function fmt(totalSeconds: number): string {
  const s = Math.max(0, Math.floor(totalSeconds));
  const m = Math.floor(s / 60);
  const rem = s % 60;
  return `${m}:${rem < 10 ? '0' : ''}${rem}`;
}

/**
 * A meditation session countdown: a large mm:ss readout, an elapsed progress
 * bar, a play / pause toggle, and an optional reset. When `remainingSec` hits 0
 * it shows a "Complete" state instead of the toggle. Play state drives the
 * toggle glyph and its a11y label (state, not color alone). Guards a
 * non-positive `totalSec`. Token-only colors (semantic slots + a `withAlpha`
 * tint).
 */
export function SessionTimer({
  totalSec,
  remainingSec,
  running = false,
  phaseLabel,
  tone = 'primary',
  onToggle,
  onReset,
  style,
}: SessionTimerProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const accent = colors[TONE_KEY[tone] ?? 'primary'];

  const total = Math.max(0, totalSec);
  const remaining = Math.min(Math.max(remainingSec, 0), total || remainingSec);
  const elapsed = Math.max(0, total - remaining);
  const complete = total > 0 && remaining <= 0;
  const progressTone = tone === 'accent' ? 'primary' : tone;

  return (
    <View
      accessibilityLabel={`Session timer, ${fmt(remaining)} remaining${
        phaseLabel ? `, ${phaseLabel}` : ''
      }${complete ? ', complete' : running ? ', running' : ', paused'}`}
      style={[
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.lg,
          gap: tokens.spacing.md,
          alignItems: 'center',
        },
        style,
      ]}
    >
      {phaseLabel ? (
        <Text style={{ color: accent, fontSize: tokens.typography.scale.xs, fontWeight: '700', textTransform: 'uppercase' }}>
          {phaseLabel}
        </Text>
      ) : null}

      <Text
        style={{
          color: complete ? colors.success : colors.onSurface,
          fontSize: tokens.typography.scale['3xl'],
          fontWeight: '800',
          fontFamily: tokens.typography.fontHeading,
        }}
      >
        {fmt(remaining)}
      </Text>

      {total > 0 ? (
        <View style={{ width: '100%' }}>
          <Progress value={elapsed} max={total} tone={progressTone} size="sm" />
        </View>
      ) : null}

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
        {complete ? (
          <Text style={{ color: colors.success, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
            ✓ Complete
          </Text>
        ) : (
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ selected: running }}
            accessibilityLabel={running ? 'Pause' : 'Play'}
            onPress={() => onToggle?.(!running)}
            style={({ pressed }) => ({
              width: 56,
              height: 56,
              borderRadius: tokens.radius.full,
              backgroundColor: accent,
              alignItems: 'center',
              justifyContent: 'center',
              opacity: pressed ? 0.8 : 1,
            })}
          >
            <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.lg, color: colors.onPrimary }}>
              {running ? '⏸' : '▶'}
            </Text>
          </Pressable>
        )}
        {onReset ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Reset"
            onPress={onReset}
            style={({ pressed }) => ({
              width: 44,
              height: 44,
              borderRadius: tokens.radius.full,
              backgroundColor: withAlpha(colors.muted, 0.14),
              alignItems: 'center',
              justifyContent: 'center',
              opacity: pressed ? 0.75 : 1,
            })}
          >
            <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.base, color: colors.onSurface }}>
              ↺
            </Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}
