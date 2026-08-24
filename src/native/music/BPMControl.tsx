import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { Icon, useXenitionTheme } from '../primitives';
import { clamp, formatBpm, withAlpha } from './types';

export type BPMControlVariant = 'stepper' | 'inline' | 'tap';

export interface BPMControlProps {
  /** Current tempo in BPM. */
  value: number;
  /** Range bounds (default `40`…`300`). */
  min?: number;
  max?: number;
  /** Increment per step press (default `1`). */
  step?: number;
  /**
   * - `stepper` — big read-out with −/＋ buttons (default).
   * - `inline` — compact single-row −/＋.
   * - `tap` — stepper plus a "Tap" tempo button.
   */
  variant?: BPMControlVariant;
  /** Whether the transport is playing (pulses the read-out affordance). */
  playing?: boolean;
  disabled?: boolean;
  /** Fires with the new BPM when stepped. */
  onChange?: (bpm: number) => void;
  /** Fires each time the "Tap" button is pressed (tap-tempo intent). */
  onTap?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A tempo (BPM) control — a UI shell only, it drives no clock. Shows the tempo
 * read-out with −/＋ steppers (clamped to `[min, max]`) and, in the `tap`
 * variant, a "Tap" button that fires `onTap` for an app to time. The `playing`
 * flag adds a non-color "playing" dot beside the value. Token-only styling.
 */
export function BPMControl({
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
}: BPMControlProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const safe = clamp(value, min, max);

  const bump = (delta: number): void => {
    if (disabled) return;
    onChange?.(clamp(safe + delta, min, max));
  };

  const compact = variant === 'inline';
  const valueSize = compact ? tokens.typography.scale.lg : tokens.typography.scale['3xl'];

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: tokens.spacing.sm,
        },
        style,
      ]}
    >
      <StepButton
        glyph="−"
        a11y="Decrease tempo"
        disabled={disabled || safe <= min}
        onPress={() => bump(-step)}
      />
      <View style={{ alignItems: 'center', minWidth: compact ? 56 : 96 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          {playing ? (
            <View
              style={{
                width: 8,
                height: 8,
                borderRadius: tokens.radius.full,
                backgroundColor: colors.success,
              }}
            />
          ) : null}
          <Text
            accessibilityRole="text"
            accessibilityLabel={`Tempo ${formatBpm(safe)} beats per minute${playing ? ', playing' : ''}`}
            style={{ color: colors.onSurface, fontSize: valueSize, fontWeight: '800' }}
          >
            {formatBpm(safe)}
          </Text>
        </View>
        {!compact ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>BPM</Text>
        ) : null}
      </View>
      <StepButton
        glyph="＋"
        a11y="Increase tempo"
        disabled={disabled || safe >= max}
        onPress={() => bump(step)}
      />
      {variant === 'tap' ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Tap tempo"
          disabled={disabled}
          onPress={onTap}
          style={({ pressed }) => ({
            paddingVertical: tokens.spacing.xs,
            paddingHorizontal: tokens.spacing.md,
            borderRadius: tokens.radius.md,
            backgroundColor: withAlpha(colors.primary, pressed ? 0.28 : 0.16),
            opacity: disabled ? 0.5 : 1,
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
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: tokens.radius.full,
        borderWidth: 1,
        borderColor: colors.border,
        opacity: disabled ? 0.4 : pressed ? 0.8 : 1,
      })}
    >
      <Icon glyph={glyph} size="lg" color="onSurface" />
    </Pressable>
  );
}
