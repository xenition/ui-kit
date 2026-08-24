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
    /** Actions shown after a right-click / long-press. */
    actions: ContextMenuAction[];
    /** The element to right-click (or long-press on touch). */
    children: React.ReactNode;
    className?: string;
    'aria-label'?: string;
}
/**
 * Right-click / long-press context menu — wraps `children` in a positioned host
 * whose `onContextMenu` (and touch long-press) opens a token-bound action list
 * anchored at the pointer. Distinct from `Menu` (tap-to-open) by the gesture.
 * Selecting an action fires `onSelect` and dismisses; closes on outside click
 * or Escape. Danger actions use the `danger` token. No literal colors.
 */
export declare function ContextMenu({ actions, children, className, 'aria-label': ariaLabel, }: ContextMenuProps): React.ReactElement;
//# sourceMappingURL=ContextMenu.d.ts.map