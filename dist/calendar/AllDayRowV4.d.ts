import * as React from 'react';
import type { AllDayRowProps } from './AllDayRow';
export interface AllDayRowV4Props extends AllDayRowProps {
    /** Copy when the day has no all-day events and the row is shown. */
    emptyLabel?: string;
}
/**
 * **V4 all-day row** — the web twin of the native `AllDayRowV4`, same props as
 * {@link AllDayRow} plus `emptyLabel`.
 *
 * ## Three changes
 *
 * 1. **The label is a caption in `muted-text`**, and the row announces how
 *    many events it holds.
 * 2. **The empty case says so** when `hideWhenEmpty` is off — the base
 *    rendered an empty labelled strip, which reads as a loading state.
 * 3. **The scroll variant no longer clips its last chip**, because the blocks
 *    are laid out with the row's own gap rather than a margin on each.
 */
export declare const AllDayRowV4: React.ForwardRefExoticComponent<AllDayRowV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=AllDayRowV4.d.ts.map