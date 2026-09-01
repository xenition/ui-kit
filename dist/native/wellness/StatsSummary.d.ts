import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface WellnessStat {
    label: string;
    value: React.ReactNode;
    unit?: string;
    glyph?: string;
}
export interface StatsSummaryProps {
    stats: WellnessStat[];
    style?: StyleProp<ViewStyle>;
}
/**
 * StatsSummary — an overview row of headline numbers on a clean card, split by
 * thin border dividers. Each stat shows an optional glyph, a big value with a
 * muted unit, and a muted label. Restraint is the point: the card stays surface
 * + border, and only the first stat's value picks up the primary accent — one
 * colored number, not a rainbow. Token-only colors.
 */
export declare function StatsSummary({ stats, style }: StatsSummaryProps): React.ReactElement;
//# sourceMappingURL=StatsSummary.d.ts.map