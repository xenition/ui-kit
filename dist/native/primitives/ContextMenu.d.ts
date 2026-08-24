import * as React from 'react';
export interface ContextMenuAction {
    label: string;
    /** Fires on select; the menu closes afterwards. */
    onSelect?: () => void;
    icon?: React.ReactNode;
    disabled?: boolean;
    /** Render in the danger tone (e.g. Delete). */
    danger?: boolean;
}
export interface ContextMenuProps {
    /** Actions shown after a long-press. */
    actions: ContextMenuAction[];
    /** The element to long-press. */
    children: React.ReactNode;
    accessibilityLabel?: string;
}
/**
 * Long-press context menu — wraps `children` in a `Pressable` whose
 * `onLongPress` opens a centered, token-bound action list in a `Modal` over a
 * translucent `onSurface` scrim (RN has no anchored DOM portal). Distinct from
 * `Menu` (tap-to-open) by the long-press gesture. Selecting an action fires
 * `onSelect` and dismisses. Danger actions use the `danger` token. No literals.
 */
export declare function ContextMenu({ actions, children, accessibilityLabel }: ContextMenuProps): React.ReactElement;
//# sourceMappingURL=ContextMenu.d.ts.map