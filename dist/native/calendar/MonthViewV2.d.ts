import * as React from 'react';
import type { MonthViewProps } from './MonthView';
/** Same public contract as {@link MonthView} — a drop-in alternate design. */
export type MonthViewV2Props = MonthViewProps;
/**
 * MonthView, redesigned (v2): a **large, elevated month grid**. The card floats
 * on a drop shadow (no border) and mounts with a gentle fade-in; each day is a
 * roomy square carrying its number plus a row of tone dots (up to three, then a
 * "+n"). Selected days fill; today gets a ring **and** a bold weight (never
 * color-alone). Same props, token-pure.
 */
export declare function MonthViewV2({ month, events, selected, today, weekStartsOn, density, onSelectDate, style, }: MonthViewV2Props): React.ReactElement;
//# sourceMappingURL=MonthViewV2.d.ts.map