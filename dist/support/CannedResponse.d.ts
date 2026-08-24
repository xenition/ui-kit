import * as React from 'react';
export interface CannedResponseData {
    /** Stable id, returned to `onInsert`. */
    id: string;
    /** Short human title (e.g. "Password reset"). */
    title: string;
    /** The saved reply body. */
    body: string;
    /** Optional typed shortcut (e.g. `/reset`). Rendered as a token chip. */
    shortcut?: string;
    /** Optional grouping/category tag. */
    category?: string;
}
export interface CannedResponseProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
    /** The saved reply to display. */
    response: CannedResponseData;
    /** How many body lines to show before truncating (default 2). */
    previewLines?: number;
    /** Fires with the response when "Insert" is pressed. */
    onInsert?: (response: CannedResponseData) => void;
    /** Fires when the card body (not the button) is activated — e.g. to expand. */
    onClick?: (response: CannedResponseData) => void;
    /** Insert-button label (default "Insert"). */
    insertLabel?: string;
}
/**
 * A saved/canned reply card for agents — title, an optional shortcut + category
 * chip, a truncated body preview, and an "Insert" action that reports the full
 * response back to the composer via `onInsert`. Activating the body fires
 * `onClick` (e.g. to preview the whole thing) with click + keyboard support.
 * All colors/spacing come from the `--xen-*` token classes — no literal hex.
 */
export declare const CannedResponse: React.ForwardRefExoticComponent<CannedResponseProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CannedResponse.d.ts.map