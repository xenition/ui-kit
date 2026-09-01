import * as React from 'react';
import { Text, View } from 'react-native';
import { Slider, useXenitionTheme } from '../primitives';
import { clamp, withAlpha } from './types';
import type { VolumeFaderProps } from './VolumeFader';

/** Drop-in for {@link VolumeFaderProps} — same props, the V4 "session" design. */
export type VolumeFaderV4Props = VolumeFaderProps;

/**
 * VolumeFader — **V4** "session" design. The tactile DAW take on a fader: a
 * token well (`withAlpha(colors.primary, 0.15)`) wrapping the `Slider` primitive
 * so the track reads like a real mixing surface, with the name and a **bold
 * tabular read-out** framing it. `muted` is surfaced in both the dimming *and*
 * the a11y label plus a `(muted)` marker (never color alone). Honors both
 * `variant`s (`labeled` / `bare`) and mirrors the base's drop-in behavior
 * exactly: it owns no audio and reports drags through the same `onValueChange` /
 * `onChange` callbacks (the original spelling wins when both are passed).
 * Token-only colors via `useXenitionTheme()`.
 */
export function VolumeFaderV4({
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
  onChange,
  style,
}: VolumeFaderV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  // Two spellings, one callback: the original wins when both are passed, so a
  // caller who has migrated half a file never gets the change reported twice.
  const emit = onValueChange ?? onChange;
  const safe = clamp(value, min, max);
  const readout = `${Math.round(safe)}${unit ? ` ${unit}` : ''}`;

  return (
    <View
      accessible
      accessibilityLabel={
        label ? `${label} volume ${Math.round(safe)}${muted ? ', muted' : ''}` : undefined
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
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>
            {readout}
          </Text>
        </View>
      ) : null}
      {/* Token well — a tactile fader track that houses the Slider primitive. */}
      <View
        style={{
          justifyContent: 'center',
          paddingHorizontal: tokens.spacing.sm,
          paddingVertical: tokens.spacing.xs,
          borderRadius: tokens.radius.md,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: withAlpha(colors.primary, 0.15),
        }}
      >
        <Slider value={safe} min={min} max={max} step={step} disabled={disabled} onValueChange={emit} />
      </View>
    </View>
  );
}
