import * as React from 'react';
/** Document kind — drives the leading glyph. */
export type DocumentKind = 'policy' | 'declaration' | 'id-card' | 'invoice' | 'letter';
export interface PolicyDocumentRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
    /** Document title (e.g. "Auto policy declarations"). */
    title: string;
    /** Document kind (default `policy`). */
    kind?: DocumentKind;
    /** Human-readable size (e.g. "1.2 MB"), already formatted by the caller. */
    size?: string;
    /** Localized date string (already formatted by the caller). */
    date?: string;
    /** Download button label (default "Download"). Hidden when no `onDownload`. */
    downloadLabel?: string;
    /** Fires when the row is clicked (open/preview). */
    onClick?: () => void;
    /** Fires when the download action is pressed. */
    onDownload?: () => void;
}
/**
 * One document in a policy's document list: a tinted kind glyph, a title with a
 * kind · size · date meta line, and an optional download action. The row opens
 * on click when `onClick` is supplied (keyboard-operable); the download action
 * is a real `<button>` (via `Button`) that only renders with `onDownload` and
 * stops propagation so it never also triggers the row. Token-bound throughout —
 * no literal colors. Web parity of the native `PolicyDocumentRow`.
 */
export declare const PolicyDocumentRow: React.ForwardRefExoticComponent<PolicyDocumentRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PolicyDocumentRow.d.ts.map