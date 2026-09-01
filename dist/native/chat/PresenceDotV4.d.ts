import * as React from 'react';
import { type ChatSize } from './internal/thread-v4';
import type { PresenceDotProps } from './PresenceDot';
export interface PresenceDotV4Props extends PresenceDotProps {
    /**
     * A named size. Prefer this over the raw pixel `size`, which stays for
     * parity — a number prop is an invitation to pick one off the scale.
     */
    scale?: ChatSize;
    /**
     * Show the presence word beside the dot. Default `false`, so nothing
     * existing moves — but pass it wherever there is room.
     *
     * A coloured dot alone says nothing to a colour-blind user and nothing at
     * all to a screen reader; the dot is the whole signal in `ChatHeader` and
     * `ConversationRow`.
     */
    showLabel?: boolean;
}
/**
 * **V4 presence dot** — same props as {@link PresenceDot} plus `scale` and
 * `showLabel`.
 *
 * ## Three changes
 *
 * 1. **It can carry its word.** See `showLabel`.
 * 2. **It always has a name.** The base announced nothing unless the caller
 *    passed `label`, so the default rendering was a decorative circle.
 * 3. **`away` stops borrowing `warn`.** Stepping away is not a caution;
 *    `busy` keeps `danger` because "do not disturb" is genuinely a stop.
 */
export declare function PresenceDotV4({ status, size, scale, ring, label, showLabel, style, }: PresenceDotV4Props): React.ReactElement;
//# sourceMappingURL=PresenceDotV4.d.ts.map