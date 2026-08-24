import * as React from 'react';
import type { HourlyRowProps } from './HourlyRow';
/** Same public contract as {@link HourlyRow} — a drop-in alternate design. */
export type HourlyRowV2Props = HourlyRowProps;
/**
 * HourlyRow, redesigned (v2): an **hourly bar chart**. Each hour is a column with
 * the temperature, a proportional bar (taller = warmer across the window), the
 * condition glyph, and a precip hint. A visual trend vs. v1's flat list. Same
 * props, token-only.
 */
export declare const HourlyRowV2: React.ForwardRefExoticComponent<HourlyRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=HourlyRowV2.d.ts.map