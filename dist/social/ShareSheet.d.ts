import * as React from 'react';
export interface ShareTarget {
    id: string;
    /** Target name (e.g. `Messages`, `Copy link`). */
    label: string;
    /** Emoji/glyph icon. */
    icon?: string;
}
export interface ShareSheetProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
    /** Controls mount — the sheet renders nothing when `false`. */
    visible: boolean;
    /** Sheet heading. Default `Share`. */
    title?: string;
    /** Optional subtitle (e.g. the URL/permalink being shared). */
    subtitle?: string;
    /** Share destinations shown in a wrapping grid. */
    targets: ReadonlyArray<ShareTarget>;
    /** Fires with the chosen target id. */
    onSelect?: (id: string) => void;
    /** Dismiss (backdrop click or Cancel). */
    onClose?: () => void;
    /** Message shown when `targets` is empty. */
    emptyLabel?: string;
}
/**
 * A bottom share sheet: a dimmed backdrop and a rounded panel holding a grid of
 * share destinations plus a Cancel action. Self-contained overlay (renders
 * `null` while hidden) — the parent owns `visible`. Handles an empty target
 * list. Web parity of the native `ShareSheet`; token-only, `role="dialog"`.
 */
export declare const ShareSheet: React.ForwardRefExoticComponent<ShareSheetProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ShareSheet.d.ts.map