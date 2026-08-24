import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface VisitSummarySection {
    /** Section heading, e.g. "Assessment". */
    heading: string;
    /** Section body text. */
    body: string;
}
export interface VisitSummaryProps {
    /** Visit title, e.g. "Follow-up visit". */
    title: string;
    /** Provider name. */
    provider?: string;
    /** Visit date line. */
    date?: string;
    /** Primary diagnosis / reason, highlighted at the top. */
    diagnosis?: string;
    /** Structured note sections (assessment, plan, instructions, …). */
    sections?: VisitSummarySection[];
    /** Skeleton placeholder while the summary loads. */
    loading?: boolean;
    /** Message shown when there is no content. */
    emptyLabel?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * A visit / encounter summary card: title, provider + date, a highlighted
 * diagnosis chip, and any number of structured note sections (assessment, plan,
 * instructions). Renders loading and empty states. Informational UI only — not
 * a medical device. Token-only colors.
 */
export declare function VisitSummary({ title, provider, date, diagnosis, sections, loading, emptyLabel, style, }: VisitSummaryProps): React.ReactElement;
//# sourceMappingURL=VisitSummary.d.ts.map