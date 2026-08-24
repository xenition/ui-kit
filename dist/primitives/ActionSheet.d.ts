import * as React from 'react';
export interface ActionSheetAction {
    label: string;
    onSelect?: () => void;
    /** Render in the danger tone (destructive action). */
    destructive?: boolean;
    disabled?: boolean;
}
export interface ActionSheetProps {
    open: boolean;
    onClose: () => void;
    /** Optional heading above the action list. */
    title?: string;
    actions: ActionSheetAction[];
    /** Cancel-button label (default `Cancel`). */
    cancelLabel?: string;
    className?: string;
}
/**
 * iOS-style action sheet — a bottom-anchored dialog presenting a token-bound
 * list of choices plus a separated Cancel affordance, over a scrim. Portals to
 * `<body>`; closes on scrim click or Escape. Distinct from `Drawer(side="bottom")`
 * (arbitrary content) by the grouped list + destructive/cancel convention.
 * Destructive actions use the `danger` token. No literal colors.
 */
export declare function ActionSheet({ open, onClose, title, actions, cancelLabel, className, }: ActionSheetProps): React.ReactElement | null;
//# sourceMappingURL=ActionSheet.d.ts.map