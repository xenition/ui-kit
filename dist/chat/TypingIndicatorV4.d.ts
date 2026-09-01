import * as React from 'react';
import { type ChatSize } from './internal/thread-v4';
import type { TypingIndicatorProps } from './TypingIndicator';
export interface TypingIndicatorV4Props extends TypingIndicatorProps {
    /** A named size. Prefer this over the raw pixel `size`, kept for parity. */
    scale?: ChatSize;
    /** Build the spoken sentence. Default `'Ada is typing'` / `'Typing'`. */
    formatLabel?: (name?: string) => string;
}
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
export declare const TypingIndicatorV4: React.ForwardRefExoticComponent<TypingIndicatorV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=TypingIndicatorV4.d.ts.map