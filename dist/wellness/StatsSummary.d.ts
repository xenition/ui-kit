import * as React from 'react';
export interface WellnessStat {
    label: string;
    value: React.ReactNode;
    unit?: string;
    glyph?: string;
}
export interface StatsSummaryProps extends React.HTMLAttributes<HTMLDivElement> {
    stats: WellnessStat[];
}
/**
 * StatsSummary — an overview row of headline numbers on a clean card, split by
 * thin border dividers. Each stat shows an optional glyph, a big value with a
 * muted unit, and a muted label. Restraint is the point: the card stays surface
 * + border, and only the first stat's value picks up the primary accent — one
 * colored number, not a rainbow. Token-only colors.
 */
export declare const StatsSummary: React.ForwardRefExoticComponent<StatsSummaryProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=StatsSummary.d.ts.map