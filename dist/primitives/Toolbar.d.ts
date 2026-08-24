import * as React from 'react';
export interface ToolbarAction {
    key: string;
    label: React.ReactNode;
    /** Click handler (web parity of the native `onPress`). */
    onClick?: () => void;
    disabled?: boolean;
    /** Tint the label with the `danger` token (destructive). */
    destructive?: boolean;
}
export interface ToolbarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    /** Optional leading title. */
    title?: React.ReactNode;
    /** Inline action buttons (left→right). */
    actions?: ToolbarAction[];
    /** Actions collapsed behind a `⋯` overflow toggle. */
    overflowActions?: ToolbarAction[];
}
/**
 * Web parity of the native `Toolbar`: a horizontal action bar — an optional
 * title, a row of inline action buttons, and an optional `⋯` overflow that
 * reveals extra actions in a dropdown panel. Uses the ARIA `toolbar` role. All
 * colors/radii/spacing come from the `--xen-*` tokens via Tailwind classes — no
 * literal colors.
 */
export declare const Toolbar: React.ForwardRefExoticComponent<ToolbarProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=Toolbar.d.ts.map