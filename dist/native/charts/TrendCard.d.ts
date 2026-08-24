import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type SemanticColors } from '../theme';
export type TrendCardColor = keyof SemanticColors;
export interface TrendCardProps {
    /** Metric label, e.g. "Revenue". */
    label: string;
    /** Primary stat value shown large. */
    value: string | number;
    /** Optional delta caption, e.g. "+12%". */
    delta?: string;
    /** Trend series rendered as an inline sparkline. */
    data?: number[];
    /** Theme color key for the sparkline + accents. */
    color?: TrendCardColor;
    style?: StyleProp<ViewStyle>;
}
/**
 * A labelled stat paired with an inline {@link Sparkline} — token-bound,
 * View-based (no SVG). Surfaces a headline metric with an at-a-glance trend.
 */
export declare function TrendCard({ label, value, delta, data, color, style, }: TrendCardProps): React.ReactElement;
//# sourceMappingURL=TrendCard.d.ts.map