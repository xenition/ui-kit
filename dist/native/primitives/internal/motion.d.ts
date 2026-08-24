import { Animated } from 'react-native';
/**
 * A press-scale spring for tap targets. Returns the animated `scale` value plus
 * `onPressIn`/`onPressOut` handlers to spread onto a `Pressable`. Under reduced
 * motion the scale stays at 1 and the handlers are no-ops.
 *
 * ```tsx
 * const press = usePressScale();
 * <Animated.View style={{ transform: [{ scale: press.scale }] }}>
 *   <Pressable onPressIn={press.onPressIn} onPressOut={press.onPressOut} …/>
 * </Animated.View>
 * ```
 */
export declare function usePressScale(to?: number): {
    scale: Animated.Value;
    onPressIn: () => void;
    onPressOut: () => void;
};
/**
 * A mount enter transition: fade in (and optionally rise a few px). Returns a
 * style object to spread onto an `Animated.View`. Under reduced motion the
 * element is simply visible from the first frame.
 *
 * `translateY` defaults to 6px (a gentle rise); pass 0 for a pure fade.
 */
export declare function useEnter(opts?: {
    translateY?: number;
    duration?: number;
}): {
    opacity: Animated.Value;
    transform: {
        translateY: Animated.AnimatedInterpolation<number>;
    }[];
};
//# sourceMappingURL=motion.d.ts.map