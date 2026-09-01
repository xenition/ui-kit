import * as React from 'react';
import type { ConsumptionChartProps } from './ConsumptionChart';
/** Drop-in for {@link ConsumptionChartProps} — same props, a different design. */
export type ConsumptionChartV4Props = ConsumptionChartProps;
/**
 * ConsumptionChart — **V4** design. A clean, elevated card that **reuses** the
 * same token-bound `BarChart` / `LineChart` primitives (same data, same series
 * color) rather than drawing its own geometry. A refined header pairs the kind
 * glyph in the signature brand-gradient disc with a derived period total (via
 * `formatUsage`, so it never renders `NaN`) and a small legend. Preserves the
 * loading skeleton and the empty state. Same props/behavior as
 * {@link ConsumptionChartProps}; token-only colors.
 */
export declare const ConsumptionChartV4: React.ForwardRefExoticComponent<ConsumptionChartProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ConsumptionChartV4.d.ts.map