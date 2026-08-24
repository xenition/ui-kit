import * as React from 'react';
/** Client decision on a proof. */
export type ProofDecision = 'pending' | 'approved' | 'rejected';
export interface ClientProofRowProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Photo / file name (e.g. "IMG_0421.jpg"). */
    filename: string;
    /** Thumbnail URL. When absent a token-tinted placeholder is drawn. */
    thumbUrl?: string;
    /** Client's decision (default `pending`). */
    decision?: ProofDecision;
    /** Whether the proof is selected for a batch action. */
    selected?: boolean;
    /** Toggles selection when the row body is pressed. */
    onToggleSelect?: () => void;
    /** Approve handler; renders an approve button when pending. */
    onApprove?: () => void;
    /** Reject handler; renders a reject button when pending. */
    onReject?: () => void;
    /** Approve button label (default `Approve`). */
    approveLabel?: string;
    /** Reject button label (default `Reject`). */
    rejectLabel?: string;
}
/**
 * A client-proofing row — thumbnail, filename, and a decision `Badge`, with
 * approve/reject actions while the proof is `pending`. The row body is a
 * keyboard-operable `checkbox` when `onToggleSelect` is provided (selection
 * carries an `aria-checked` state, never color alone). The action `<button>`s
 * stop propagation. Composes `Button` and `Badge`. Token-only colors.
 */
export declare const ClientProofRow: React.ForwardRefExoticComponent<ClientProofRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ClientProofRow.d.ts.map