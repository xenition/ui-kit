import * as React from 'react';
export interface AppShellProps extends React.HTMLAttributes<HTMLDivElement> {
    /** The left nav rail (typically a `<Sidebar />`). */
    sidebar: React.ReactNode;
    /** Optional top-bar slot: page title, actions, search, … */
    header?: React.ReactNode;
    /** Main content area. */
    children: React.ReactNode;
    /** Rail width in px on wide screens. */
    sidebarWidth?: number;
    /** Accessible label for the mobile sidebar toggle. */
    menuLabel?: string;
}
/**
 * Responsive dashboard layout: a fixed-width left `Sidebar` beside a main
 * column of an optional top bar (`header`) and a scrolling content area
 * (`children`). On narrow screens the rail collapses behind a hamburger and
 * slides in over a scrim. All colors/spacing come from `--xen-*` tokens — no
 * literal colors.
 */
export declare const AppShell: React.ForwardRefExoticComponent<AppShellProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=AppShell.d.ts.map