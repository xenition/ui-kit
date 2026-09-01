import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Icon } from '../primitives/Icon';
import { withAlpha } from '../primitives/internal/color';
import { GradientSurface } from './internal/GradientSurface';
import { calmGradient, calmInk } from './internal/calm';
import type { SessionTimerProps } from './SessionTimer';

export type SessionTimerV4Props = SessionTimerProps;

function fmt(totalSeconds: number): string {
  const s = Math.max(0, Math.floor(totalSeconds));
  const m = Math.floor(s / 60);
  const rem = s % 60;
  return `${m}:${rem < 10 ? '0' : ''}${rem}`;
}

/**
 * SessionTimerV4 — the "calm" restyle of {@link SessionTimer}. Same props,
 * defaults, labels, a11y and behavior (`onToggle`/`onReset`, the `Complete`
 * state, the clamped remaining/total); only the surface changes: a clean neutral
 * card with a large mm:ss readout, a slim gradient progress bar showing elapsed,
 * a gradient play/pause button, and a reset control.
 */
export function SessionTimerV4({
  totalSec,
  remainingSec,
  running = false,
  phaseLabel,
  // tone retained for parity; the calm ground is single-hue.
  tone = 'primary',
  onToggle,
  onReset,
  style,
}: SessionTimerV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const r = tokens.ramps;
  void tone;

  const total = Math.max(0, totalSec);
  const remaining = Math.min(Math.max(remainingSec, 0), total || remainingSec);
  const elapsed = Math.max(0, total - remaining);
  const complete = total > 0 && remaining <= 0;
  const pct = total > 0 ? Math.max(0, Math.min(1, elapsed / total)) * 100 : 0;

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
        <Text
          style={{
            color: colors.mutedText,
            fontSize: tokens.typography.scale.xs,
            fontWeight: '700',
            letterSpacing: 1,
            textTransform: 'uppercase',
          }}
        >
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
        <View
          style={{
            width: '100%',
            height: 6,
            borderRadius: tokens.radius.full,
            backgroundColor: withAlpha(colors.onSurface, 0.1),
            overflow: 'hidden',
          }}
        >
          <GradientSurface
            colors={calmGradient(r)}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ width: `${pct}%`, height: 6, borderRadius: tokens.radius.full }}
          />
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
            style={({ pressed }) => ({ borderRadius: tokens.radius.full, opacity: pressed ? 0.9 : 1 })}
          >
            <GradientSurface
              colors={calmGradient(r)}
              style={{
                width: 56,
                height: 56,
                borderRadius: tokens.radius.full,
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}
            >
              <Icon glyph={running ? '⏸' : '▶'} size={tokens.typography.scale.lg} style={{ color: calmInk(r) }} />
            </GradientSurface>
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
              backgroundColor: withAlpha(colors.onSurface, 0.08),
              borderWidth: 1,
              borderColor: colors.border,
              alignItems: 'center',
              justifyContent: 'center',
              opacity: pressed ? 0.75 : 1,
            })}
          >
            <Icon glyph="↺" size={tokens.typography.scale.base} style={{ color: colors.onSurface }} />
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}
