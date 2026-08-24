import * as React from 'react';
export interface TypingIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Who is typing. Renders as a leading caption (e.g. "Ada is typing"). Omit for
     * a bare three-dot indicator inside a bubble.
     */
    name?: string;
    /** Bubble-style container (surface fill, rounded) vs. bare dots. Default true. */
    bubble?: boolean;
    /** Dot diameter in px (default 6). */
    size?: number;
}
/**
 * Animated "someone is typing" indicator — three bouncing dots, optionally in a
 * surface bubble with a leading name caption. The animation is disabled under
 * `prefers-reduced-motion`. Marked as a polite live region so assistive tech
 * announces when typing starts. No literal colors.
 */
export declare const TypingIndicator: React.ForwardRefExoticComponent<TypingIndicatorProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=TypingIndicator.d.ts.map