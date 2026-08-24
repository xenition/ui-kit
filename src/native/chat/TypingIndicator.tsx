import * as React from 'react';
import { Animated, Easing, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { useReducedMotion } from '../primitives/internal/useReducedMotion';
import { appearanceStyle, type Appearance } from '../primitives/internal/appearance';
import { useEnter } from '../primitives/internal/motion';

export interface TypingIndicatorProps {
  /**
   * Who is typing. Renders as a leading caption (e.g. "Ada is typing"). Omit for
   * a bare three-dot indicator inside a bubble.
   */
  name?: string;
  /** Bubble-style container (surface fill, rounded) vs. bare dots. Default true. */
  bubble?: boolean;
  /** Dot diameter in px (default 6). */
  size?: number;
  /**
   * Visual treatment for the bubble surface (diversity system). Defaults to
   * `classic` — the historical surface fill with a hairline border.
   */
  appearance?: Appearance;
  style?: StyleProp<ViewStyle>;
}

function Dot({ delay, size, animate }: { delay: number; size: number; animate: boolean }): React.ReactElement {
  const { colors } = useXenitionTheme();
  const anim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (!animate) {
      anim.setValue(0);
      return;
    }
    const loop = Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(anim, {
          toValue: 1,
          duration: 400,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(anim, {
          toValue: 0,
          duration: 400,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [anim, animate, delay]);

  return (
    <Animated.View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: colors.muted,
        opacity: animate ? anim.interpolate({ inputRange: [0, 1], outputRange: [0.35, 1] }) : 0.6,
        transform: [
          {
            translateY: animate
              ? anim.interpolate({ inputRange: [0, 1], outputRange: [0, -size * 0.6] })
              : 0,
          },
        ],
      }}
    />
  );
}

/**
 * Animated "someone is typing" indicator — three bouncing dots, optionally in a
 * surface bubble with a leading name caption. The animation is gated on the OS
 * "Reduce Motion" setting. Marked as a polite live region so assistive tech
 * announces when typing starts. No literal colors.
 */
export function TypingIndicator({
  name,
  bubble = true,
  size = 6,
  appearance = 'classic',
  style,
}: TypingIndicatorProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const reduced = useReducedMotion();
  const animate = !reduced;
  const enter = useEnter();

  const dots = (
    <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: size * 0.6 }}>
      <Dot delay={0} size={size} animate={animate} />
      <Dot delay={150} size={size} animate={animate} />
      <Dot delay={300} size={size} animate={animate} />
    </View>
  );

  return (
    <Animated.View
      accessibilityLiveRegion="polite"
      accessibilityLabel={name ? `${name} is typing` : 'Typing'}
      style={[
        { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, opacity: enter.opacity, transform: enter.transform },
        style,
      ]}
    >
      {name ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{name}</Text>
      ) : null}
      {bubble ? (
        <View
          style={{
            // Appearance FIRST (fill/border/elevation); classic == surface + hairline border.
            ...appearanceStyle(appearance, colors, tokens),
            borderRadius: tokens.radius.lg,
            paddingVertical: tokens.spacing.sm,
            paddingHorizontal: tokens.spacing.md,
          }}
        >
          {dots}
        </View>
      ) : (
        dots
      )}
    </Animated.View>
  );
}
