import * as React from 'react';
export interface ScreenTimeBarProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Minutes (or `unit`s) used so far. */
    used: number;
    /** Daily limit. `<= 0` renders a "no limit set" state. */
    limit: number;
    /** Unit suffix for the readout. */
    unit?: string;
    /** Section label. */
    label?: string;
    /** Loading placeholder state. */
    loading?: boolean;
    /** Copy shown when no limit is configured. */
    emptyLabel?: string;
}
/**
 * Screen-time usage against a daily limit: a labelled readout plus a progress
 * bar that shifts tone as usage climbs (primary → warn near the cap → danger
 * once over). The over/near state is conveyed in the readout text + a11y label,
 * not by color alone. Renders the shared {@link EmptyState} when `limit <= 0`.
 * Token-bound throughout — no literal colors.
 */
export declare const ScreenTimeBar: React.ForwardRefExoticComponent<ScreenTimeBarProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ScreenTimeBar.d.ts.map