import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
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
export declare function Marquee({ speed, gap, style, children, }: MarqueeProps): React.ReactElement;
//# sourceMappingURL=Marquee.d.ts.map