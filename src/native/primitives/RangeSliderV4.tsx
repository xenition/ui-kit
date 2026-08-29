import * as React from 'react';
import {
  PanResponder,
  View,
  type LayoutChangeEvent,
  type PanResponderGestureState,
} from 'react-native';
import { useXenitionTheme } from '../theme';
import type { RangeSliderProps } from './RangeSlider';
import { withAlpha } from './internal/color';
import { elevationStyle, tapTarget } from './internal/picker-v4';

export type { RangeSliderProps as RangeSliderV4Props };

/**
 * **V4 two-thumb slider** — the same props as {@link RangeSlider}, a different
 * design line.
 *
 * ## Same §36.4 rule as `SliderV4`, twice over
 *
 * No `Animated` value, no timing function: both thumbs are drawn where their
 * values are, on every render, and the values are emitted from the gesture on
 * every move. A range slider is the control where a canned animation is most
 * obviously wrong — you are usually adjusting one end while watching the span
 * between them change.
 *
 * ## Grab the nearer thumb, then move by delta
 *
 * The base picks the nearer thumb at grant (right) and then reads
 * `nativeEvent.locationX` on every move (wrong): `locationX` is relative to the
 * view under the touch, which once the drag begins is usually a thumb rather
 * than the track, so the value is measured from the wrong origin and the thumb
 * slides away from the finger.
 *
 * V4 keeps the nearer-thumb rule and switches the tracking to
 * `gestureState.dx` on top of the value that thumb was grabbed at. Delta is
 * screen-space and cannot be knocked off by which child the finger is over.
 *
 * ## The two thumbs stay distinguishable
 *
 * Each carries its own `adjustable` role, its own label, and its own
 * increment/decrement actions, so a screen-reader user can move either end —
 * the base exposes the pair with no way to operate them at all. The low thumb
 * can never pass the high one, and vice versa, so a crossed range is not
 * representable.
 *
 * Everything visual is `SliderV4`'s: the grab strip at `tapTarget()`, a rail
 * with weight so the span reads as a quantity (§33), thumbs at `spacing.lg`
 * with a `surface` collar and `elevation.card` — the one honest use of depth
 * here, already zeroed by the compiler for a flat seed.
 */
export function RangeSliderV4({
  value,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  disabled = false,
  style,
}: RangeSliderProps): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;

  const strip = tapTarget(theme);
  const thumb = tokens.spacing.lg;
  const rail = tokens.spacing.sm;
  const halo = tokens.spacing.xs;

  const [width, setWidth] = React.useState(0);
  const [dragging, setDragging] = React.useState<0 | 1 | null>(null);

  const widthRef = React.useRef(0);
  const valueRef = React.useRef(value);
  valueRef.current = value;
  const onChangeRef = React.useRef(onChange);
  onChangeRef.current = onChange;
  const disabledRef = React.useRef(disabled);
  disabledRef.current = disabled;
  const rangeRef = React.useRef({ min, max, step });
  rangeRef.current = { min, max, step };

  /** Which thumb the gesture grabbed, and the value it started from. */
  const grabRef = React.useRef<{ index: 0 | 1; from: number }>({ index: 0, from: 0 });

  const clampSnap = React.useCallback((v: number): number => {
    const r = rangeRef.current;
    const clamped = Math.max(r.min, Math.min(r.max, v));
    const snapped = Math.round((clamped - r.min) / r.step) * r.step + r.min;
    return Math.max(r.min, Math.min(r.max, snapped));
  }, []);

  const ratioOf = React.useCallback((v: number): number => {
    const r = rangeRef.current;
    return r.max > r.min ? Math.max(0, Math.min(1, (v - r.min) / (r.max - r.min))) : 0;
  }, []);

  const usableOf = (w: number): number => Math.max(0, w - thumb);

  /** Emit an ordered pair: the moving end can never pass the other. */
  const emitAt = React.useCallback(
    (index: 0 | 1, next: number): void => {
      const [lo, hi] = valueRef.current;
      if (index === 0) onChangeRef.current?.([Math.min(next, hi), hi]);
      else onChangeRef.current?.([lo, Math.max(next, lo)]);
    },
    []
  );

  const responder = React.useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: (e) => {
          if (disabledRef.current) return;
          const r = rangeRef.current;
          const usable = usableOf(widthRef.current);
          const x = e.nativeEvent.locationX;
          const [lo, hi] = valueRef.current;

          // Whichever thumb is nearer the tap is the one that moves.
          const loX = ratioOf(lo) * usable + thumb / 2;
          const hiX = ratioOf(hi) * usable + thumb / 2;
          const index: 0 | 1 = Math.abs(x - loX) <= Math.abs(x - hiX) ? 0 : 1;

          const ratio = usable > 0 ? Math.max(0, Math.min(1, (x - thumb / 2) / usable)) : 0;
          const next = clampSnap(r.min + ratio * (r.max - r.min));
          grabRef.current = { index, from: next };
          setDragging(index);
          emitAt(index, next);
        },
        onPanResponderMove: (_e, g: PanResponderGestureState) => {
          if (disabledRef.current) return;
          const r = rangeRef.current;
          const usable = usableOf(widthRef.current);
          if (usable <= 0) return;
          const { index, from } = grabRef.current;
          const delta = (g.dx / usable) * (r.max - r.min);
          emitAt(index, clampSnap(from + delta));
        },
        onPanResponderRelease: () => setDragging(null),
        onPanResponderTerminate: () => setDragging(null),
      }),
    [clampSnap, emitAt, ratioOf, thumb]
  );

  const usable = usableOf(width);
  const loRatio = ratioOf(value[0]);
  const hiRatio = ratioOf(value[1]);

  const nudge = (index: 0 | 1, direction: number): void => {
    if (disabled) return;
    emitAt(index, clampSnap(value[index] + direction * step));
  };

  const handle = (index: 0 | 1, ratio: number, label: string): React.ReactElement => (
    <React.Fragment key={label}>
      {/*
        The halo. Reserved whether or not it is showing, so grabbing a thumb
        never changes the strip's geometry, and painted in the same render as
        the position — never faded in behind it.
      */}
      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          top: (strip - thumb) / 2 - halo,
          left: ratio * usable - halo,
          width: thumb + halo * 2,
          height: thumb + halo * 2,
          borderRadius: tokens.radius.full,
          backgroundColor:
            dragging === index ? withAlpha(colors.primary, 0.18) : 'transparent',
        }}
      />
      <View
        accessibilityRole="adjustable"
        accessibilityLabel={label}
        accessibilityValue={{ min, max, now: value[index] }}
        accessibilityState={{ disabled }}
        accessibilityActions={[{ name: 'increment' }, { name: 'decrement' }]}
        onAccessibilityAction={(event) => {
          if (event.nativeEvent.actionName === 'increment') nudge(index, 1);
          if (event.nativeEvent.actionName === 'decrement') nudge(index, -1);
        }}
        style={[
          elevationStyle(theme.elevation.card),
          {
            position: 'absolute',
            top: (strip - thumb) / 2,
            left: ratio * usable,
            width: thumb,
            height: thumb,
            borderRadius: tokens.radius.full,
            backgroundColor: colors.primary,
            // A surface-coloured collar, so a thumb reads on top of the span.
            borderWidth: 2,
            borderColor: colors.surface,
          },
        ]}
      />
    </React.Fragment>
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
        {
          width: '100%',
          height: strip,
          justifyContent: 'center',
          opacity: disabled ? theme.state.disabledContent : 1,
        },
        style,
      ]}
    >
      {/* Rail */}
      <View
        style={{
          height: rail,
          borderRadius: tokens.radius.full,
          backgroundColor: colors.border,
        }}
      />
      {/* The span between the thumbs */}
      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          top: (strip - rail) / 2,
          left: thumb / 2 + loRatio * usable,
          width: Math.max(0, (hiRatio - loRatio) * usable),
          height: rail,
          borderRadius: tokens.radius.full,
          backgroundColor: colors.primary,
        }}
      />
      {handle(0, loRatio, 'Range minimum')}
      {handle(1, hiRatio, 'Range maximum')}
    </View>
  );
}
