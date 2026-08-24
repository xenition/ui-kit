import * as React from 'react';
import type { HourlyRowProps } from './HourlyRow';
/** Same public contract as {@link HourlyRow} — a drop-in alternate design. */
export type HourlyRowV3Props = HourlyRowProps;
/**
 * HourlyRow, redesigned (v3): a **tight hour ticker**. Very small columns — time,
 * glyph, temperature, and an optional precip hint — pack into a horizontal scroll
 * for a compact strip. The minimal counterpart to v2's bar chart. Same props,
 * token-only.
 */
export declare const HourlyRowV3: React.ForwardRefExoticComponent<HourlyRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=HourlyRowV3.d.ts.map