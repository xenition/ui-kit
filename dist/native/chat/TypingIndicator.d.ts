import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type Appearance } from '../primitives/internal/appearance';
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
/**
 * Animated "someone is typing" indicator — three bouncing dots, optionally in a
 * surface bubble with a leading name caption. The animation is gated on the OS
 * "Reduce Motion" setting. Marked as a polite live region so assistive tech
 * announces when typing starts. No literal colors.
 */
export declare function TypingIndicator({ name, bubble, size, appearance, style, }: TypingIndicatorProps): React.ReactElement;
//# sourceMappingURL=TypingIndicator.d.ts.map