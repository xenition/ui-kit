import * as React from 'react';
import type { EnergyUsageProps } from './EnergyUsage';
/** Drop-in for {@link EnergyUsageProps} — same props, the V4 "ambient" design. */
export type EnergyUsageV4Props = EnergyUsageProps;
/**
 * EnergyUsage — **V4** "ambient" design (web parity of the native V4). The calm
 * take on an energy panel: a **big kWh/cost numeral** leads, a **trend
 * indicator** reads the series (rising usage → danger, falling → success, by
 * arrow + label so it is legible without color), a soft breakdown
 * {@link BarChart} keeps the base's per-period data, and the `title` sits as the
 * period caption. When `data` is empty the card shows a muted "No usage data
 * yet" line instead of an axis. Same props/behavior as {@link EnergyUsageProps};
 * all colors from `--xen-*` token classes (no literals).
 */
export declare const EnergyUsageV4: React.ForwardRefExoticComponent<EnergyUsageProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=EnergyUsageV4.d.ts.map