import * as React from 'react';
import { Animated, Easing, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { useReducedMotion } from './internal/useReducedMotion';

export type StatusDotTone = 'success' | 'warn' | 'danger' | 'primary' | 'accent' | 'muted';

export interface StatusDotProps {
  /** Semantic color slot for the dot (default `success` — "live"). */
  tone?: StatusDotTone;
  /** Emit the expanding echo pulse (default true; reduced motion disables it). */
  pulse?: boolean;
  /**
   * Accessible name (e.g. "Live"). When provided the dot is announced via an
   * `image` role; when omitted it is decorative.
   */
  label?: string;
  /** Dot diameter in px (default 8). */
  size?: number;
  style?: StyleProp<ViewStyle>;
}

/**
 * Pulsing semantic status dot — the native mirror of the web `StatusDot`. A
 * solid token-colored dot with an expanding, fading echo driven by `Animated`.
 * The echo is disabled under the OS "Reduce Motion" setting (the solid dot
 * still communicates state). No literal colors.
 */
export function StatusDot({
  tone = 'success',
  pulse = true,
  label,
  size = 8,
  style,
}: StatusDotProps): React.ReactElement {
  const { colors } = useXenitionTheme();
  const reduced = useReducedMotion();
  const color = colors[tone];

  const anim = React.useRef(new Animated.Value(0)).current;
  const animate = pulse && !reduced;

  React.useEffect(() => {
    if (!animate) {
      anim.setValue(0);
      return;
    }
    const loop = Animated.loop(
      Animated.timing(anim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      })
    );
    loop.start();
    return () => loop.stop();
  }, [animate, anim]);

  const echoStyle = {
    position: 'absolute' as const,
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: color,
    opacity: anim.interpolate({ inputRange: [0, 0.7, 1], outputRange: [0.75, 0, 0] }),
    transform: [
      { scale: anim.interpolate({ inputRange: [0, 0.7, 1], outputRange: [1, 2.4, 2.4] }) },
    ],
  };

  return (
    <View
      accessible={label !== undefined}
      accessibilityRole={label !== undefined ? 'image' : undefined}
      accessibilityLabel={label}
      importantForAccessibility={label === undefined ? 'no-hide-descendants' : 'yes'}
      style={[{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }, style]}
    >
      {animate ? (
        <Animated.View testID="xen-status-echo" pointerEvents="none" style={echoStyle} />
      ) : null}
      <View
        style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: color }}
      />
    </View>
  );
}
