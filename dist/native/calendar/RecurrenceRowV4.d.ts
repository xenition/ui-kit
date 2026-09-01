import * as React from 'react';
import type { RecurrenceFreq, RecurrenceRowProps } from './RecurrenceRow';
export interface RecurrenceRowV4Props extends RecurrenceRowProps {
    /** Override the frequency words — five English words lived inside. */
    freqLabels?: Partial<Record<RecurrenceFreq, string>>;
}
/**
 * **V4 recurrence row** — same props as {@link RecurrenceRow} plus
 * `freqLabels`.
 *
 * ## Three changes
 *
 * 1. **The inline variant is `SegmentedV4`**, not five hand-rolled chips, so
 *    it announces itself as one control with a selected option rather than as
 *    five independent buttons.
 * 2. **The summary variant is a row from the shared row line**, with a
 *    chevron that says it opens something — the base rendered a bare line of
 *    text that happened to be pressable.
 * 3. **All five words are props**, and the row is announced as
 *    "Repeats, Weekly" rather than as two loose fragments.
 */
export declare function RecurrenceRowV4({ value, onChange, label, variant, onPress, options, freqLabels, style, }: RecurrenceRowV4Props): React.ReactElement;
//# sourceMappingURL=RecurrenceRowV4.d.ts.map