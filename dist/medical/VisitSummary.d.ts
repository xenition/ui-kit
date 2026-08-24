import * as React from 'react';
export interface VisitSummarySection {
    /** Section heading, e.g. "Assessment". */
    heading: string;
    /** Section body text. */
    body: string;
}
export interface VisitSummaryProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
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
}
/**
 * A visit / encounter summary card — the web mirror of the native
 * `VisitSummary`. Shows the title, provider + date, a highlighted diagnosis
 * chip, and any number of structured note sections (assessment, plan,
 * instructions). Renders loading and empty (`EmptyState`) states. Composes
 * `Card`; token-only colors. Informational UI only — not a medical device.
 */
export declare const VisitSummary: React.ForwardRefExoticComponent<VisitSummaryProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=VisitSummary.d.ts.map