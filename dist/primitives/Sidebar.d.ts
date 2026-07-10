import * as React from 'react';
export interface SidebarItem {
    /** Row label (also the accessible name). */
    label: string;
    /** Optional leading icon slot. */
    icon?: React.ReactNode;
    /** Render the row as a link when provided. */
    href?: string;
    /** Marks the row as the current destination. */
    active?: boolean;
    /** Fires on click/activation (in addition to any `href` navigation). */
    onSelect?: () => void;
}
export interface SidebarGroup {
    /** Optional section heading rendered above the rows. */
    label?: string;
    items: SidebarItem[];
}
export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
    /** Brand slot pinned to the top (logo, wordmark, …). */
    brand?: React.ReactNode;
    /** Flat list of nav rows (mutually exclusive with `groups`). */
    items?: SidebarItem[];
    /** Grouped nav rows, each with an optional section heading. */
    groups?: SidebarGroup[];
    /** Optional footer slot pinned to the bottom (account, sign-out, …). */
    footer?: React.ReactNode;
}
/**
 * Vertical nav rail: a `brand` slot on top, one or more groups of token-styled
 * nav rows with an active state, and an optional `footer`. Pass either a flat
 * `items` array or grouped `groups`. Rows with an `href` render as links,
 * otherwise as buttons; both call `onSelect`. All colors come from `--xen-*`
 * tokens — no literal colors.
 */
export declare const Sidebar: React.ForwardRefExoticComponent<SidebarProps & React.RefAttributes<HTMLElement>>;
//# sourceMappingURL=Sidebar.d.ts.map