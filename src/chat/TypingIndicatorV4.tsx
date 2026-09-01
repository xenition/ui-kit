import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { V4_MOTION } from '../primitives/internal/v4-motion';
import { CHAT_SIZE, type ChatSize } from './internal/thread-v4';
import type { TypingIndicatorProps } from './TypingIndicator';

export interface TypingIndicatorV4Props extends TypingIndicatorProps {
  /** A named size. Prefer this over the raw pixel `size`, kept for parity. */
  scale?: ChatSize;
  /** Build the spoken sentence. Default `'Ada is typing'` / `'Typing'`. */
  formatLabel?: (name?: string) => string;
}

const STYLE_ID = 'xen-v4-typing-styles';

/** M3: one bounce, three dots, 150ms apart. */
const STAGGER = 150;

const CSS = `
@keyframes xen-v4-typing {
  0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
  30% { transform: translateY(-25%); opacity: 1; }
}
[data-xen-typing-dot] {
  animation: xen-v4-typing ${V4_MOTION.standard}ms ${STAGGER * 4}ms infinite;
}
@media (prefers-reduced-motion: reduce) {
  [data-xen-typing-dot] { animation: none; opacity: 0.7; }
}
`;

/**
 * **V4 typing indicator** — the web twin of the native `TypingIndicatorV4`,
 * same props as {@link TypingIndicator} plus `scale` and `formatLabel`.
 *
 * ## Four changes
 *
 * 1. **It announces itself once, politely.** The base was three animated dots
 *    and no text at all, so a screen-reader user was never told the other
 *    person was replying.
 * 2. **The dots are hidden from the reader.** Three bouncing spans are three
 *    stops on a tab-through and carry nothing the label does not.
 * 3. **The bounce is M3's standard duration and stagger.**
 * 4. **`prefers-reduced-motion` settles the dots** rather than stopping them
 *    dead — a still indicator still has to read as "in progress".
 */
export const TypingIndicatorV4 = React.forwardRef<HTMLDivElement, TypingIndicatorV4Props>(
  function TypingIndicatorV4(
    { name, bubble = true, size, scale = 'sm', formatLabel, className, ...rest },
    ref
  ) {
    React.useEffect(() => injectStyleOnce(STYLE_ID, CSS), []);

    const label = (formatLabel ?? ((who?: string) => (who ? `${who} is typing` : 'Typing')))(name);

    return (
      <div
        ref={ref}
        role="status"
        aria-live="polite"
        aria-label={label}
        data-xen-typing=""
        className={cn(
          'inline-flex items-center gap-xs',
          bubble &&
            'rounded-[var(--xen-radius-lg)] rounded-bl-[var(--xen-radius-sm)] border border-border bg-card px-md py-sm',
          className
        )}
        {...rest}
      >
        {/* Three bouncing spans carry nothing the label does not. */}
        <span aria-hidden className="inline-flex items-center gap-[3px]">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              data-xen-typing-dot=""
              className={cn('inline-block rounded-full bg-muted', size == null && CHAT_SIZE[scale])}
              style={{
                animationDelay: `${i * STAGGER}ms`,
                ...(size != null ? { width: size, height: size } : null),
              }}
            />
          ))}
        </span>
      </div>
    );
  }
);
