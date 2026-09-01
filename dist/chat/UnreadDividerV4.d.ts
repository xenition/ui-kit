import * as React from 'react';
import type { UnreadDividerProps } from './UnreadDivider';
export interface UnreadDividerV4Props extends UnreadDividerProps {
    /** Build the label from the count. Default `'3 unread messages'`. */
    formatCount?: (count: number) => string;
}
/**
 * **V4 unread divider** — the web twin of the native `UnreadDividerV4`, same
 * props as {@link UnreadDivider} plus `formatCount`.
 *
 * ## Three changes
 *
 * 1. **The count reaches the label.** The base drew it beside a fixed
 *    `'Unread'`, so a reader heard the word and the number as two fragments.
 * 2. **It is a `separator` with a name**, which is exactly what it is — a
 *    landmark a reader can jump to.
 * 3. **The rule takes `danger`, the label its corrected ink.**
 */
export declare const UnreadDividerV4: React.ForwardRefExoticComponent<UnreadDividerV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=UnreadDividerV4.d.ts.map