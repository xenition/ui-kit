import * as React from 'react';
import { type StatCardProps } from './StatCard';
export interface KpiRowProps extends React.HTMLAttributes<HTMLDivElement> {
    /** The stat cards to lay out; each wraps to the next row as space allows. */
    items: StatCardProps[];
}
/**
 * A wrapping row of {@link StatCard}s — the KPI strip at the top of a dashboard.
 * Cards flex to at least ~44% width so two sit per row on a phone and wrap
 * gracefully on wider screens. Token-only spacing.
 */
export declare const KpiRow: React.ForwardRefExoticComponent<KpiRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=KpiRow.d.ts.map