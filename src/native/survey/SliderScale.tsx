import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Slider } from '../primitives';

export interface SliderScaleProps {
  /** Current numeric value. Kept controlled — always render what you're told. */
  value: number;
  /** Fires with the new value after clamping and snapping to `step`. */
  onChange: (value: number) => void;
  /** Low end of the range. Default `0`. */
  min?: number;
  /** High end of the range. Default `10`. */
  max?: number;
  /** Snap increment between stops. Default `1`. */
  step?: number;
  /** Anchor caption under the `min` end (e.g. `'Not at all'`). */
  minLabel?: string;
  /** Anchor caption under the `max` end (e.g. `'Completely'`). */
  maxLabel?: string;
  /** Show the big current-value numeral above the track. Default `true`. */
  showValue?: boolean;
  /** Accessible name for the slider. Default `'Rating'`. */
  accessibilityLabel?: string;
  /** Non-interactive + dimmed when `true`. Default `false`. */
  disabled?: boolean;
  /** Extra style on the root. */
  style?: StyleProp<ViewStyle>;
}

/** Clamp `v` into `[min, max]` then snap to the nearest `step` stop. */
function clampSnap(v: number, min: number, max: number, step: number): number {
  const clamped = Math.max(min, Math.min(max, v));
  const snapped = Math.round((clamped - min) / step) * step + min;
  return Math.max(min, Math.min(max, snapped));
}

/**
 * SliderScale — **V4** "clean form / focus" numeric slider question. A calm,
 * legible take: a big current-value numeral sits above a primary-filled track
 * with a large draggable thumb (the token-styled `Slider` primitive), flanked
 * by min/max anchor captions. The single accent is `primary`; the rail is
 * `border`. The `Slider` reports `accessibilityRole="adjustable"` with
 * min/max/now for VoiceOver/TalkBack. Controlled via `value` + `onChange`;
 * token-only colors via `useXenitionTheme()`.
 */
export function SliderScale({
  value,
  onChange,
  min = 0,
  max = 10,
  step = 1,
  minLabel,
  maxLabel,
  showValue = true,
  accessibilityLabel = 'Rating',
  disabled = false,
  style,
}: SliderScaleProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const safe = clampSnap(value, min, max, step);

  return (
    <View style={[{ gap: tokens.spacing.sm, opacity: disabled ? 0.5 : 1 }, style]}>
      {showValue ? (
        <Text
          style={{
            alignSelf: 'center',
            color: colors.primary,
            fontSize: tokens.typography.scale['3xl'],
            fontWeight: '800',
          }}
        >
          {safe}
        </Text>
      ) : null}

      {/* The `Slider` primitive is the adjustable element (role + min/max/now);
          this wrapper carries the human name for it. */}
      <View accessibilityLabel={accessibilityLabel}>
        <Slider
          value={safe}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          onChange={(v) => {
            if (!disabled) onChange(clampSnap(v, min, max, step));
          }}
        />
      </View>

      {minLabel || maxLabel ? (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, flexShrink: 1 }}>
            {minLabel}
          </Text>
          <Text
            style={{
              color: colors.muted,
              fontSize: tokens.typography.scale.xs,
              flexShrink: 1,
              textAlign: 'right',
            }}
          >
            {maxLabel}
          </Text>
        </View>
      ) : null}
    </View>
  );
}
