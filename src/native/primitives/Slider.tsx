import * as React from 'react';
import {
  PanResponder,
  View,
  type LayoutChangeEvent,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useXenitionTheme } from '../theme';

export interface SliderProps {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  /** Fires with the new value (web `onChange`, renamed for native). */
  onValueChange?: (value: number) => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

const THUMB = 20;
const TRACK_H = 4;

/**
 * Range slider — the native mirror of the web `Slider`. RN has no
 * `<input type=range>`, so this is a token-styled track with a draggable thumb
 * driven by `PanResponder`, snapping to `step` within `[min, max]`. No literal
 * colors.
 */
export function Slider({
  value,
  min = 0,
  max = 100,
  step = 1,
  onValueChange,
  disabled = false,
  style,
}: SliderProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const [width, setWidth] = React.useState(0);
  const widthRef = React.useRef(0);

  const clampSnap = (v: number): number => {
    const clamped = Math.max(min, Math.min(max, v));
    const snapped = Math.round((clamped - min) / step) * step + min;
    return Math.max(min, Math.min(max, snapped));
  };

  // Latest values live in a ref so the once-created PanResponder never goes stale.
  const updateRef = React.useRef<(x: number) => void>(() => undefined);
  updateRef.current = (x: number): void => {
    if (disabled) return;
    const usable = Math.max(0, widthRef.current - THUMB);
    const ratio = usable > 0 ? Math.max(0, Math.min(1, (x - THUMB / 2) / usable)) : 0;
    onValueChange?.(clampSnap(min + ratio * (max - min)));
  };

  const responder = React.useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: (e) => updateRef.current(e.nativeEvent.locationX),
        onPanResponderMove: (e) => updateRef.current(e.nativeEvent.locationX),
      }),
    []
  );

  const ratio = max > min ? Math.max(0, Math.min(1, (value - min) / (max - min))) : 0;
  const usable = Math.max(0, width - THUMB);

  return (
    <View
      {...responder.panHandlers}
      accessibilityRole="adjustable"
      accessibilityValue={{ min, max, now: value }}
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
      {/* Filled portion */}
      <View
        style={{
          position: 'absolute',
          left: 0,
          top: (THUMB - TRACK_H) / 2,
          height: TRACK_H,
          width: THUMB / 2 + ratio * usable,
          borderRadius: tokens.radius.full,
          backgroundColor: colors.primary,
        }}
      />
      {/* Thumb */}
      <View
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
    </View>
  );
}
