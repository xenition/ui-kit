import * as React from 'react';
import type { RecurrenceFreq, RecurrenceRowProps } from './RecurrenceRow';
export interface RecurrenceRowV4Props extends RecurrenceRowProps {
    /** Override the frequency words — five English words lived inside. */
    freqLabels?: Partial<Record<RecurrenceFreq, string>>;
}
/**
 * **V4 recurrence row** — the web twin of the native `RecurrenceRowV4`, same
 * props as {@link RecurrenceRow} plus `freqLabels`.
 *
 * ## Three changes
 *
 * 1. **The inline variant is `SegmentedV4`**, not five hand-rolled chips, so
 *    it announces itself as one control with a selection.
 * 2. **The summary variant is a row from the shared row line**, with a
 *    chevron that says it opens something.
 * 3. **All five words are props.**
 */
export declare const RecurrenceRowV4: React.ForwardRefExoticComponent<RecurrenceRowV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=RecurrenceRowV4.d.ts.map