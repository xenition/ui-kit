import * as React from 'react';
import type { MonthViewProps } from './MonthView';
/** Same public contract as {@link MonthView} — a drop-in alternate design. */
export type MonthViewV3Props = MonthViewProps;
/**
 * MonthView, redesigned (v3): a **mini month**. Tiny square cells with a single
 * event dot, narrow weekday initials, an outlined today and a filled selected day —
 * a compact date picker for a sidebar. The opposite of v2's spacious grid. Same
 * props, token-only.
 */
export declare const MonthViewV3: React.ForwardRefExoticComponent<MonthViewProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MonthViewV3.d.ts.map