import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/**
 * Native reveal effects. On mobile the norm is a **mount** entrance rather than
 * a scroll-triggered one, so the web's scroll/slide variants collapse to the
 * three that read well as an entrance: `fade`, `fade-up` (fade + small
 * translateY), and `zoom` (fade + scale).
 */
export type RevealEffect = 'fade' | 'fade-up' | 'zoom';
export interface RevealProps {
    children?: React.ReactNode;
    /** Entrance effect (default `fade-up`). */
    effect?: RevealEffect;
    /** Delay before the entrance starts, in ms (added to any surrounding `Stagger`). */
    delay?: number;
    /** Entrance duration, in ms (default 500). */
    duration?: number;
    /** Style override on the wrapper. */
    style?: StyleProp<ViewStyle>;
}
/**
 * Mount-entrance wrapper — the native mirror of the web `Reveal`, adapted to
 * mobile: content animates **in on mount** via `Animated` (no
 * IntersectionObserver / scroll trigger — those are web-only). Under the OS
 * "Reduce Motion" setting the animation is skipped entirely and children render
 * immediately in their final state. A surrounding `Stagger` adds
 * `base + index * interval` to the `delay`. No literal colors (motion only).
 */
export declare function Reveal({ children, effect, delay, duration, style, }: RevealProps): React.ReactElement;
//# sourceMappingURL=Reveal.d.ts.map