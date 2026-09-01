import * as React from 'react';
import { type ChatSize } from './internal/thread-v4';
import type { TypingIndicatorProps } from './TypingIndicator';
export interface TypingIndicatorV4Props extends TypingIndicatorProps {
    /** A named size. Prefer this over the raw pixel `size`, kept for parity. */
    scale?: ChatSize;
    /** Build the spoken line. Default `'Ada is typing'` / `'Typing'`. */
    formatLabel?: (name?: string) => string;
}
/**
 * **V4 typing indicator** — same props as {@link TypingIndicator} plus
 * `scale` and `formatLabel`.
 *
 * ## Three changes
 *
 * 1. **The loop is on the M3 motion scale.** The base timed its own dots; a
 *    breathing dot is a state change, so it takes `standard`.
 * 2. **The name line is a prop.** `'Ada is typing'` was assembled inside the
 *    component, out of a localizing host's reach — and the word order is not
 *    universal.
 * 3. **The dots are hidden from the reader.** The live region carries the
 *    message; three unlabelled circles beside it are three extra stops.
 *
 * `useReducedMotion()` still collapses the animation entirely — the base did
 * this correctly and it is kept.
 */
export declare function TypingIndicatorV4({ name, bubble, size, scale, appearance, formatLabel, style, }: TypingIndicatorV4Props): React.ReactElement;
//# sourceMappingURL=TypingIndicatorV4.d.ts.map