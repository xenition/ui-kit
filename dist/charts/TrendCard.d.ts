import * as React from 'react';
import { ChartColor } from './internal';
export interface TrendCardProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Metric label, e.g. "Revenue". */
    label: string;
    /** Primary stat value shown large. */
    value: string | number;
    /** Optional delta caption, e.g. "+12%". */
    delta?: string;
    /** Trend series rendered as an inline sparkline. */
    data?: number[];
    /** Theme color token for the sparkline + delta accent. */
    color?: ChartColor;
}
/**
 * A labelled stat paired with an inline {@link Sparkline}. Token-bound surface:
 * `bg-surface` / `border-border` container, `text-muted` label, `text-on-surface`
 * value, and the delta tinted by the chosen color token. No literal colors.
 */
export declare const TrendCard: React.ForwardRefExoticComponent<TrendCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=TrendCard.d.ts.map