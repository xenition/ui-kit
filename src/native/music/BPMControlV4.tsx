import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Icon, useXenitionTheme } from '../primitives';
import { clamp, formatBpm, withAlpha } from './types';
import type { BPMControlProps } from './BPMControl';

/** Drop-in for {@link BPMControlProps} — same props, the V4 "session" design. */
export type BPMControlV4Props = BPMControlProps;

/**
 * BPMControl — **V4** "session" design (native parity of the web V4). The
 * tactile take on a tempo control: big **bold tabular numerals** on a rounded
 * token surface, flanked by satisfying ≥44px round −/＋ steppers. Honors every
 * `variant` — `stepper` (readout + steppers), `inline` (compact single-row),
 * and `tap` (adds a soft-primary "Tap" tempo button firing `onTap`). Steps
 * clamp to `[min, max]` via `clamp` and render through `formatBpm`; `playing`
 * lights a non-color `♪` marker. No gradient — transport controls stay
 * clean/tactile. Token-only colors via `useXenitionTheme()`.
 */
export function BPMControlV4({
  value,
  min = 40,
  max = 300,
  step = 1,
  variant = 'stepper',
  playing = false,
  disabled = false,
  onChange,
  onTap,
  style,
}: BPMControlV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const safe = clamp(value, min, max);
  const compact = variant === 'inline';

  const bump = (delta: number): void => {
    if (disabled) return;
    onChange?.(clamp(safe + delta, min, max));
  };

  const valueSize = compact ? tokens.typography.scale.xl : tokens.typography.scale['3xl'];

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: tokens.spacing.sm,
          padding: tokens.spacing.sm,
          borderRadius: tokens.radius.lg,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.surface,
          opacity: disabled ? 0.6 : 1,
          alignSelf: 'flex-start',
        },
        style,
      ]}
    >
      <StepButton glyph="−" a11y="Decrease tempo" disabled={disabled || safe <= min} onPress={() => bump(-step)} />

      <View style={{ alignItems: 'center', minWidth: compact ? 64 : 104 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          {playing ? <Icon glyph="♪" size="sm" color="primary" accessibilityLabel="playing" /> : null}
          <Text
            accessibilityRole="text"
            accessibilityLabel={`Tempo ${formatBpm(safe)} beats per minute${playing ? ', playing' : ''}`}
            style={{ color: colors.onSurface, fontSize: valueSize, fontWeight: '800', fontVariant: ['tabular-nums'] }}
          >
            {formatBpm(safe)}
          </Text>
        </View>
        {!compact ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700', letterSpacing: 0.5 }}>
            BPM
          </Text>
        ) : null}
      </View>

      <StepButton glyph="＋" a11y="Increase tempo" disabled={disabled || safe >= max} onPress={() => bump(step)} />

      {variant === 'tap' ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Tap tempo"
          disabled={disabled}
          onPress={onTap}
          style={({ pressed }) => ({
            minHeight: 44,
            justifyContent: 'center',
            paddingVertical: tokens.spacing.xs,
            paddingHorizontal: tokens.spacing.md,
            borderRadius: tokens.radius.md,
            backgroundColor: withAlpha(colors.primary, pressed ? 0.28 : 0.16),
            opacity: disabled ? 0.4 : 1,
          })}
        >
          <Text style={{ color: colors.primary, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>Tap</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

function StepButton({
  glyph,
  a11y,
  disabled,
  onPress,
}: {
  glyph: string;
  a11y: string;
  disabled: boolean;
  onPress: () => void;
}): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={a11y}
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => ({
        width: 44,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: tokens.radius.full,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: pressed ? withAlpha(colors.primary, 0.1) : colors.surface,
        opacity: disabled ? 0.4 : 1,
      })}
    >
      <Icon glyph={glyph} size="lg" color="onSurface" />
    </Pressable>
  );
}
