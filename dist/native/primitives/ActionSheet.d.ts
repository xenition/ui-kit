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
}
/**
 * iOS-style action sheet — a bottom-anchored `Modal` presenting a token-bound
 * list of choices plus a separated Cancel affordance, over a translucent
 * `onSurface` scrim. Distinct from `Drawer(side="bottom")` (arbitrary content)
 * and `Menu` (tap-anchored list) by the iOS grouped list + destructive/cancel
 * convention. Destructive actions use the `danger` token. No literal colors.
 */
export declare function ActionSheet({ open, onClose, title, actions, cancelLabel, }: ActionSheetProps): React.ReactElement;
//# sourceMappingURL=ActionSheet.d.ts.map