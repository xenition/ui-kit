import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface SidebarItem {
    /** Row label (also the accessible name). */
    label: string;
    /** Optional leading icon slot. */
    icon?: React.ReactNode;
    /** Marks the row as the current destination. */
    active?: boolean;
    /** Fires on press. */
    onSelect?: () => void;
}
export interface SidebarGroup {
    /** Optional section heading rendered above the rows. */
    label?: string;
    items: SidebarItem[];
}
export interface SidebarProps {
    /** Brand slot pinned to the top (logo, wordmark, …). */
    brand?: React.ReactNode;
    /** Flat list of nav rows (mutually exclusive with `groups`). */
    items?: SidebarItem[];
    /** Grouped nav rows, each with an optional section heading. */
    groups?: SidebarGroup[];
    /** Optional footer slot pinned to the bottom. */
    footer?: React.ReactNode;
    style?: StyleProp<ViewStyle>;
}
/**
 * Vertical nav rail — the native mirror of the web `Sidebar`. A `brand` slot on
 * top, one or more groups of token-styled `Pressable` nav rows with an active
 * state, and an optional `footer`. Used as a persistent rail on tablet or inside
 * the `AppShell` drawer on phones. No literal colors.
 */
export declare function Sidebar({ brand, items, groups, footer, style, }: SidebarProps): React.ReactElement;
//# sourceMappingURL=Sidebar.d.ts.map