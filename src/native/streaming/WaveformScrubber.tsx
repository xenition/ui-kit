import * as React from 'react';
import {
  View,
  type GestureResponderEvent,
  type LayoutChangeEvent,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { Pressable } from 'react-native';
import { useXenitionTheme } from '../primitives';

export type WaveformScrubberVariant = 'bars' | 'mirror';

export interface WaveformScrubberProps {
  /**
   * Per-bar amplitudes in `[0, 1]`. Values are clamped; an empty array renders
   * a flat rail (no bars) so an unanalyzed track still shows something tappable.
   */
  peaks?: number[];
  /** Played fraction in `[0, 1]` — how much of the bar row is colored. */
  progress?: number;
  /**
   * - `bars`   — bottom-anchored amplitude bars (default).
   * - `mirror` — bars mirrored around the vertical center.
   */
  variant?: WaveformScrubberVariant;
  /** Row height in px (default 40). */
  height?: number;
  /** Fires with the new fraction `[0, 1]` when the row is tapped to seek. */
  onSeek?: (fraction: number) => void;
  disabled?: boolean;
  /** Announced label (default `'Seek'`). */
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
}

const clamp01 = (n: number): number => (n < 0 ? 0 : n > 1 ? 1 : n);

/**
 * A token-bar waveform scrubber — renders `peaks` as amplitude bars, tints the
 * played portion `primary` and the rest `border`, and seeks by tap: the tap's x
 * position maps to a `[0, 1]` fraction reported through `onSeek`. Exposed to
 * screen readers as an `adjustable` control with a percentage value. Pure UI —
 * no audio analysis or playback here; feed it precomputed `peaks`. Token-only.
 */
export function WaveformScrubber({
  peaks = [],
  progress = 0,
  variant = 'bars',
  height = 40,
  onSeek,
  disabled = false,
  accessibilityLabel = 'Seek',
  style,
}: WaveformScrubberProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const widthRef = React.useRef(0);
  const frac = clamp01(progress);

  const onLayout = (e: LayoutChangeEvent): void => {
    widthRef.current = e.nativeEvent.layout.width;
  };

  const handlePress = (e: GestureResponderEvent): void => {
    if (disabled || !onSeek) return;
    const w = widthRef.current;
    if (w <= 0) return;
    onSeek(clamp01(e.nativeEvent.locationX / w));
  };

  const count = peaks.length;
  // How many bars fall inside the played region (guarded against empty peaks).
  const playedBars = count > 0 ? Math.round(frac * count) : 0;

  return (
    <Pressable
      accessibilityRole="adjustable"
      accessibilityLabel={accessibilityLabel}
      accessibilityValue={{ min: 0, max: 100, now: Math.round(frac * 100) }}
      accessibilityState={{ disabled }}
      disabled={disabled || !onSeek}
      onPress={handlePress}
      onLayout={onLayout}
      style={[{ width: '100%', height, opacity: disabled ? 0.5 : 1 }, style]}
    >
      {count === 0 ? (
        // Empty / unanalyzed: a single flat rail with a played fill.
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <View
            style={{
              height: 4,
              borderRadius: tokens.radius.full,
              backgroundColor: colors.border,
            }}
          >
            <View
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: `${frac * 100}%`,
                borderRadius: tokens.radius.full,
                backgroundColor: colors.primary,
              }}
            />
          </View>
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: variant === 'mirror' ? 'center' : 'flex-end',
            gap: 2,
          }}
        >
          {peaks.map((raw, i) => {
            const amp = clamp01(raw);
            const barHeight = Math.max(2, amp * height);
            const played = i < playedBars;
            return (
              <View
                key={i}
                style={{
                  flex: 1,
                  height: barHeight,
                  borderRadius: tokens.radius.sm,
                  backgroundColor: played ? colors.primary : colors.border,
                }}
              />
            );
          })}
        </View>
      )}
    </Pressable>
  );
}
