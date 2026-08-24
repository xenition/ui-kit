import * as React from 'react';
import {
  PanResponder,
  View,
  type LayoutChangeEvent,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useXenitionTheme } from '../theme';

export interface RangeSliderProps {
  /** Controlled `[low, high]` pair. */
  value: [number, number];
  min?: number;
  max?: number;
  step?: number;
  /** Fires with the new `[low, high]` pair (always low ≤ high). */
  onChange?: (value: [number, number]) => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

const THUMB = 20;
const TRACK_H = 4;

/**
 * Two-thumb range slider — a two-handle extension of the native `Slider`. A
 * token-styled rail carries a `primary` fill between two draggable thumbs driven
 * by a single `PanResponder` that grabs whichever thumb is nearer the touch;
 * values snap to `step` in `[min, max]` and the pair is kept ordered. No literal
 * colors.
 */
export function RangeSlider({
  value,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  disabled = false,
  style,
}: RangeSliderProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const [width, setWidth] = React.useState(0);
  const widthRef = React.useRef(0);
  const valueRef = React.useRef(value);
  valueRef.current = value;
  const activeRef = React.useRef<0 | 1>(0);

  const clampSnap = (v: number): number => {
    const clamped = Math.max(min, Math.min(max, v));
    const snapped = Math.round((clamped - min) / step) * step + min;
    return Math.max(min, Math.min(max, snapped));
  };

  const ratioOf = (v: number): number =>
    max > min ? Math.max(0, Math.min(1, (v - min) / (max - min))) : 0;

  const valueAt = (x: number): number => {
    const usable = Math.max(0, widthRef.current - THUMB);
    const ratio = usable > 0 ? Math.max(0, Math.min(1, (x - THUMB / 2) / usable)) : 0;
    return clampSnap(min + ratio * (max - min));
  };

  const pickThumb = (x: number): void => {
    const usable = Math.max(0, widthRef.current - THUMB);
    const [lo, hi] = valueRef.current;
    const loX = ratioOf(lo) * usable + THUMB / 2;
    const hiX = ratioOf(hi) * usable + THUMB / 2;
    activeRef.current = Math.abs(x - loX) <= Math.abs(x - hiX) ? 0 : 1;
  };

  const update = (x: number): void => {
    if (disabled) return;
    const next = valueAt(x);
    const [lo, hi] = valueRef.current;
    if (activeRef.current === 0) {
      onChange?.([Math.min(next, hi), hi]);
    } else {
      onChange?.([lo, Math.max(next, lo)]);
    }
  };

  const responder = React.useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: (e) => {
          pickThumb(e.nativeEvent.locationX);
          update(e.nativeEvent.locationX);
        },
        onPanResponderMove: (e) => update(e.nativeEvent.locationX),
      }),
    []
  );

  const usable = Math.max(0, width - THUMB);
  const loRatio = ratioOf(value[0]);
  const hiRatio = ratioOf(value[1]);

  const thumb = (ratio: number, label: string, now: number): React.ReactElement => (
    <View
      accessibilityRole="adjustable"
      accessibilityLabel={label}
      accessibilityValue={{ min, max, now }}
      style={{
        position: 'absolute',
        top: 0,
        left: ratio * usable,
        width: THUMB,
        height: THUMB,
        borderRadius: tokens.radius.full,
        backgroundColor: colors.primary,
        borderWidth: 1,
        borderColor: colors.surface,
      }}
    />
  );

  return (
    <View
      {...responder.panHandlers}
      onLayout={(e: LayoutChangeEvent) => {
        const w = e.nativeEvent.layout.width;
        widthRef.current = w;
        setWidth(w);
      }}
      style={[
        { width: '100%', height: THUMB, justifyContent: 'center', opacity: disabled ? 0.5 : 1 },
        style,
      ]}
    >
      {/* Rail */}
      <View
        style={{ height: TRACK_H, borderRadius: tokens.radius.full, backgroundColor: colors.border }}
      />
      {/* Selected span */}
      <View
        style={{
          position: 'absolute',
          top: (THUMB - TRACK_H) / 2,
          left: THUMB / 2 + loRatio * usable,
          width: Math.max(0, (hiRatio - loRatio) * usable),
          height: TRACK_H,
          borderRadius: tokens.radius.full,
          backgroundColor: colors.primary,
        }}
      />
      {thumb(loRatio, 'Range minimum', value[0])}
      {thumb(hiRatio, 'Range maximum', value[1])}
    </View>
  );
}
