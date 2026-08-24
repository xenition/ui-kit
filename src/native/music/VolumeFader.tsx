import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { Slider, useXenitionTheme } from '../primitives';
import { clamp } from './types';

export type VolumeFaderVariant = 'labeled' | 'bare';

export interface VolumeFaderProps {
  /** Current fader position in `[min, max]`. */
  value: number;
  /** Range bounds (default `0`…`100`). */
  min?: number;
  max?: number;
  /** Snap step (default `1`). */
  step?: number;
  /** Channel / control name shown above the track. */
  label?: string;
  /**
   * - `labeled` — name + numeric read-out around the track (default).
   * - `bare` — just the track (for dense strips).
   */
  variant?: VolumeFaderVariant;
  /** Muted state — dims the fader and appends a muted note to a11y. */
  muted?: boolean;
  /** Suffix for the numeric read-out, e.g. `'dB'`, `'%'`. */
  unit?: string;
  disabled?: boolean;
  /** Fires with the new value as the user drags. */
  onValueChange?: (value: number) => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A labelled volume fader — a thin wrapper over the `Slider` primitive that
 * adds a name and a live numeric read-out, plus a `muted` state surfaced in
 * both the dimming *and* the a11y label (never color alone). It owns no audio;
 * drags report out through `onValueChange`. Token-only styling.
 */
export function VolumeFader({
  value,
  min = 0,
  max = 100,
  step = 1,
  label,
  variant = 'labeled',
  muted = false,
  unit,
  disabled = false,
  onValueChange,
  style,
}: VolumeFaderProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const safe = clamp(value, min, max);
  const readout = `${Math.round(safe)}${unit ? ` ${unit}` : ''}`;

  return (
    <View
      accessible
      accessibilityLabel={
        label
          ? `${label} volume ${Math.round(safe)}${muted ? ', muted' : ''}`
          : undefined
      }
      style={[{ gap: tokens.spacing.xs, opacity: muted || disabled ? 0.55 : 1 }, style]}
    >
      {variant === 'labeled' ? (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          {label ? (
            <Text
              numberOfLines={1}
              style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}
            >
              {muted ? `${label} (muted)` : label}
            </Text>
          ) : (
            <View />
          )}
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
            {readout}
          </Text>
        </View>
      ) : null}
      <Slider value={safe} min={min} max={max} step={step} disabled={disabled} onValueChange={onValueChange} />
    </View>
  );
}
