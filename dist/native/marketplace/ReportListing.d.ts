import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface ReportReason {
    /** Stable reason id passed back on submit. */
    id: string;
    /** Human-readable reason label. */
    label: string;
    /** When true, the details field becomes required for this reason. */
    requiresDetails?: boolean;
}
export interface ReportListingProps {
    /** Selectable report reasons. */
    reasons: ReportReason[];
    /** Heading text (default "Report this listing"). */
    title?: string;
    /** Submit button label (default "Submit report"). */
    submitLabel?: string;
    /** Show a spinner and block submission. */
    loading?: boolean;
    /** Fires with the chosen reason id and any details once valid. */
    onSubmit?: (reasonId: string, details?: string) => void;
    /** Fires when the cancel action is pressed. Omit to hide cancel. */
    onCancel?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A report-a-listing form — a single-select list of reasons plus a details
 * field that becomes required when the chosen reason sets `requiresDetails`.
 * Reasons render as radios (selection carried by an accent ring, a filled dot,
 * and the a11y `selected` state — not color alone); submit is disabled until a
 * valid reason (and any required details) is present, and an empty `reasons`
 * list degrades to a token-styled empty note. Presentational: a valid submit
 * calls `onSubmit(reasonId, details?)`. Reuses `Input`/`Button`; token-only
 * colors with a token-derived alpha tint.
 */
export declare function ReportListing({ reasons, title, submitLabel, loading, onSubmit, onCancel, style, }: ReportListingProps): React.ReactElement;
//# sourceMappingURL=ReportListing.d.ts.map