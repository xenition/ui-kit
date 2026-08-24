import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type StatCardProps } from './StatCard';
export interface KpiRowProps {
    /** The stat cards to lay out; each wraps to the next row as space allows. */
    items: StatCardProps[];
    style?: StyleProp<ViewStyle>;
}
/**
 * A wrapping row of {@link StatCard}s — the KPI strip at the top of a dashboard.
 * Cards flex to at least ~44% width so two sit per row on a phone and wrap
 * gracefully. Token-only spacing.
 */
export declare function KpiRow({ items, style }: KpiRowProps): React.ReactElement;
//# sourceMappingURL=KpiRow.d.ts.map