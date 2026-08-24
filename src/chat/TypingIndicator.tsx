import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';

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
 * The bounce keyframe + reduced-motion guard. Colors stay in the token classes;
 * this sheet only animates transform/opacity, so the token-only rule holds.
 */
const TYPING_CSS = `
@keyframes xen-typing-bounce {
  0%, 80%, 100% { transform: translateY(0); opacity: 0.35; }
  40% { transform: translateY(-60%); opacity: 1; }
}
[data-xen-typing-dot] { animation: xen-typing-bounce 1.2s ease-in-out infinite; }
@media (prefers-reduced-motion: reduce) {
  [data-xen-typing-dot] { animation: none; opacity: 0.6; }
}
`;

const DELAYS = [0, 150, 300];

/**
 * Animated "someone is typing" indicator — three bouncing dots, optionally in a
 * surface bubble with a leading name caption. The animation is disabled under
 * `prefers-reduced-motion`. Marked as a polite live region so assistive tech
 * announces when typing starts. No literal colors.
 */
export const TypingIndicator = React.forwardRef<HTMLDivElement, TypingIndicatorProps>(
  function TypingIndicator({ name, bubble = true, size = 6, className, ...rest }, ref) {
    injectStyleOnce('xen-typing-indicator-styles', TYPING_CSS);

    const dots = (
      <span className="inline-flex items-end" style={{ gap: size * 0.6 }}>
        {DELAYS.map((delay) => (
          <span
            key={delay}
            data-xen-typing-dot=""
            className="inline-block rounded-full bg-muted"
            style={{ width: size, height: size, animationDelay: `${delay}ms` }}
          />
        ))}
      </span>
    );

    return (
      <div
        ref={ref}
        aria-live="polite"
        aria-label={name ? `${name} is typing` : 'Typing'}
        className={cn('flex items-center gap-2', className)}
        {...rest}
      >
        {name ? <span className="text-xs text-muted">{name}</span> : null}
        {bubble ? (
          <span className="inline-flex rounded-[var(--xen-radius-lg)] border border-border bg-surface px-3 py-2">
            {dots}
          </span>
        ) : (
          dots
        )}
      </div>
    );
  }
);
