import * as React from 'react';
import { type ChatSize } from './internal/thread-v4';
import type { PresenceDotProps } from './PresenceDot';
export interface PresenceDotV4Props extends PresenceDotProps {
    /** A named size. Prefer this over the raw pixel `size`, kept for parity. */
    scale?: ChatSize;
    /**
     * Show the presence word beside the dot. Default `false`, so nothing
     * existing moves — but pass it wherever there is room. A coloured dot alone
     * says nothing to a colour-blind user and nothing to a screen reader.
     */
    showLabel?: boolean;
}
/**
 * **V4 presence dot** — the web twin of the native `PresenceDotV4`, same props
 * as {@link PresenceDot} plus `scale` and `showLabel`.
 *
 * ## Three changes
 *
 * 1. **It can carry its word.**
 * 2. **It always has a name.** The base announced nothing unless the caller
 *    passed `label`, so the default rendering was a decorative circle.
 * 3. **`away` stops borrowing `warn`.**
 */
export declare const PresenceDotV4: React.ForwardRefExoticComponent<PresenceDotV4Props & React.RefAttributes<HTMLSpanElement>>;
//# sourceMappingURL=PresenceDotV4.d.ts.map