import * as React from 'react';
import { type StyleProp, type TextStyle } from 'react-native';
export interface AnimatedCounterProps {
    /** Final value. */
    to: number;
    /** Starting value (default 0). */
    from?: number;
    /** Count duration in ms (default 1500). */
    duration?: number;
    /** Formats the current value for display. Defaults to rounded `toLocaleString()`. */
    format?: (value: number) => string;
    style?: StyleProp<TextStyle>;
}
/**
 * Counts up (or down) on mount — the native mirror of the web `AnimatedCounter`.
 * On mobile the norm is a **mount** entrance (like the native `Reveal`), so
 * instead of the web's scroll-into-view trigger this counts as soon as it
 * mounts, driven by the RN `Animated` clock with an ease-out curve. Under the
 * OS "Reduce Motion" setting the final value renders immediately. The animated
 * value is read on the JS thread (to format each frame), so this uses
 * `useNativeDriver: false`. Motion-only — inherit color via `style`.
 */
export declare function AnimatedCounter({ to, from, duration, format, style, }: AnimatedCounterProps): React.ReactElement;
//# sourceMappingURL=AnimatedCounter.d.ts.map