import * as React from 'react';
import type { MonthViewProps } from './MonthView';
/** Same public contract as {@link MonthView} — a drop-in alternate design. */
export type MonthViewV3Props = MonthViewProps;
/**
 * MonthView, redesigned (v3): a **compact month with a mini agenda preview**.
 * The grid is small and dense (single tone dot per day), and beneath it a short
 * agenda lists the focused day's events (the `selected` day, else `today`) as
 * time + tone-rail + title rows. Selected fills; today rings + bolds (never
 * color-alone). Same props, token-pure.
 */
export declare function MonthViewV3({ month, events, selected, today, weekStartsOn, density, onSelectDate, style, }: MonthViewV3Props): React.ReactElement;
//# sourceMappingURL=MonthViewV3.d.ts.map