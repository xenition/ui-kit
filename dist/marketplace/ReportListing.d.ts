import * as React from 'react';
export interface ReportReason {
    /** Stable reason id passed back on submit. */
    id: string;
    /** Human-readable reason label. */
    label: string;
    /** When true, the details field becomes required for this reason. */
    requiresDetails?: boolean;
}
export interface ReportListingProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSubmit'> {
    /** Selectable report reasons. */
    reasons: ReportReason[];
    /** Heading text (default "Report this listing"). */
    title?: string;
    /** Submit button label (default "Submit report"). */
    submitLabel?: string;
    /** Block submission and show a pending label (web `Button` has no spinner). */
    loading?: boolean;
    /** Fires with the chosen reason id and any details once valid. */
    onSubmit?: (reasonId: string, details?: string) => void;
    /** Fires when the cancel action is clicked. Omit to hide cancel. */
    onCancel?: () => void;
}
/**
 * A report-a-listing form — a single-select list of reasons plus a details field
 * that becomes required when the chosen reason sets `requiresDetails`. Reasons
 * render as real `<button role="radio">`s (selection carried by an accent ring,
 * a filled dot, and `aria-checked` — not color alone); submit is disabled until
 * a valid reason (and any required details) is present, and an empty `reasons`
 * list degrades to an `EmptyState`. Presentational: a valid submit calls
 * `onSubmit(reasonId, details?)`. Reuses `Input`/`Button`/`EmptyState`;
 * token-only colors.
 */
export declare const ReportListing: React.ForwardRefExoticComponent<ReportListingProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ReportListing.d.ts.map