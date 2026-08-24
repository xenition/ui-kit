import * as React from 'react';
import type { MonthViewProps } from './MonthView';
/** Same public contract as {@link MonthView} — a drop-in alternate design. */
export type MonthViewV2Props = MonthViewProps;
/**
 * MonthView, redesigned (v2): a **spacious month grid**. Larger day cells show up
 * to three tone-colored event dots (or a "+N" overflow); today is outlined and the
 * selected day fills primary. Bolder than v1. Same props, token-only.
 */
export declare const MonthViewV2: React.ForwardRefExoticComponent<MonthViewProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MonthViewV2.d.ts.map