import * as React from 'react';
export interface QuickAction {
    key: string;
    label: string;
    /** Optional glyph/icon slot rendered above the label. */
    icon?: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
}
export interface QuickActionsProps extends React.HTMLAttributes<HTMLDivElement> {
    actions: QuickAction[];
    /** Optional section heading. */
    title?: string;
    /** Number of columns in the grid. */
    columns?: number;
}
/**
 * A grid of labelled quick-action buttons — the shortcut launcher on a
 * dashboard home. Each tile is a square-ish token-bound button with an optional
 * icon above the label. Token-only.
 */
export declare const QuickActions: React.ForwardRefExoticComponent<QuickActionsProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=QuickActions.d.ts.map