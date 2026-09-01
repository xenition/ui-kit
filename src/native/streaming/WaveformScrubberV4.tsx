import * as React from 'react';
import {
  View,
  Pressable,
  type GestureResponderEvent,
  type LayoutChangeEvent,
} from 'react-native';
import { useXenitionTheme } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import type { WaveformScrubberProps } from './WaveformScrubber';

/** Drop-in for {@link WaveformScrubberProps} — same props, the V4 "spotlight" design. */
export type WaveformScrubberV4Props = WaveformScrubberProps;

const clamp01 = (n: number): number => (n < 0 ? 0 : n > 1 ? 1 : n);

/**
 * WaveformScrubber — **V4** "spotlight" design. A refined, more tactile
 * waveform: played bars render in **primary**, unplayed bars in soft-muted
 * (`onSurface` at low alpha), and a clear primary playhead marks the current
 * position. Seeks by tap: the tap's x maps to a `[0, 1]` fraction reported
 * through `onSeek`, exposed to screen readers as an `adjustable` control with a
 * percentage value. Same `peaks`/`onSeek` contract and behavior as
 * {@link WaveformScrubberProps}; token-only colors via `useXenitionTheme()` —
 * no literal hex.
 */
export function WaveformScrubberV4({
  peaks = [],
  progress = 0,
  variant = 'bars',
  height = 48,
  onSeek,
  disabled = false,
  accessibilityLabel = 'Seek',
  style,
}: WaveformScrubberV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const widthRef = React.useRef(0);
  const frac = clamp01(progress);
  const softTrack = withAlpha(colors.onSurface, 0.16);

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
              height: 6,
              borderRadius: tokens.radius.full,
              backgroundColor: softTrack,
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
            const barHeight = Math.max(3, amp * height);
            const played = i < playedBars;
            return (
              <View
                key={i}
                style={{
                  flex: 1,
                  height: barHeight,
                  borderRadius: tokens.radius.full,
                  backgroundColor: played ? colors.primary : softTrack,
                }}
              />
            );
          })}
        </View>
      )}

      {/* Clear playhead at the current position. */}
      {!disabled && (onSeek || frac > 0) ? (
        <View
          pointerEvents="none"
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: `${frac * 100}%`,
            width: 2,
            marginLeft: -1,
            borderRadius: tokens.radius.full,
            backgroundColor: colors.primary,
          }}
        />
      ) : null}
    </Pressable>
  );
}
