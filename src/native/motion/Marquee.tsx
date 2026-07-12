import * as React from 'react';
import { Animated, Easing, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { useReducedMotion } from '../primitives/internal/useReducedMotion';

export interface MarqueeProps {
  /** Scroll speed in px/s (loop duration is derived from the content width). */
  speed?: number;
  /** Gap between the repeated copies (default the theme's `lg` spacing). */
  gap?: number;
  /** Style override on the clipping container. */
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

/**
 * Infinite horizontal loop — the native mirror of the web `Marquee`. The web
 * version is a scroll-independent CSS keyframe loop, which maps directly onto
 * React Native's `Animated` (no scroll position / `IntersectionObserver`
 * needed), so unlike the pointer/scroll-driven `Parallax`/`TiltCard` this one
 * *does* have a native form. The content is rendered twice; the track
 * translates by one copy's width so the second copy seamlessly takes the
 * first's place. Under the OS "Reduce Motion" setting it renders as a single
 * static row. Motion-only — no literal colors.
 */
export function Marquee({
  speed = 40,
  gap,
  style,
  children,
}: MarqueeProps): React.ReactElement {
  const { tokens } = useXenitionTheme();
  const reduced = useReducedMotion();
  const trackGap = gap ?? tokens.spacing.lg;

  const [width, setWidth] = React.useState(0);
  const x = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (reduced || width === 0 || speed <= 0) return undefined;
    const distance = width + trackGap;
    const duration = (distance / speed) * 1000;
    x.setValue(0);
    const loop = Animated.loop(
      Animated.timing(x, {
        toValue: -distance,
        duration,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    loop.start();
    return () => loop.stop();
  }, [reduced, width, speed, trackGap, x]);

  // Reduced motion: a single static row (still clipped so it can't overflow).
  if (reduced) {
    return (
      <View style={[{ overflow: 'hidden' }, style]}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: trackGap }}>
          {children}
        </View>
      </View>
    );
  }

  return (
    <View style={[{ overflow: 'hidden' }, style]}>
      <Animated.View
        style={{ flexDirection: 'row', alignItems: 'center', transform: [{ translateX: x }] }}
      >
        <View
          onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
          style={{ flexDirection: 'row', alignItems: 'center', gap: trackGap }}
        >
          {children}
        </View>
        <View
          style={{ flexDirection: 'row', alignItems: 'center', gap: trackGap, marginLeft: trackGap }}
        >
          {children}
        </View>
      </Animated.View>
    </View>
  );
}
