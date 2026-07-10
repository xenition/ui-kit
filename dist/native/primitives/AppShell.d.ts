import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface AppShellProps {
    /** The nav rail (typically a `<Sidebar />`). Shown in a slide-in drawer. */
    sidebar: React.ReactNode;
    /** Optional top-bar slot: title or actions. A string renders as the title. */
    header?: React.ReactNode;
    /** Main content area. */
    children: React.ReactNode;
    /** Accessible label for the drawer toggle. */
    menuLabel?: string;
    /** Drawer width in px. */
    sidebarWidth?: number;
    style?: StyleProp<ViewStyle>;
}
/**
 * Dashboard layout — the native mirror of the web `AppShell`. Renders a top bar
 * (with a hamburger that opens the `sidebar` in a slide-in drawer `Modal`) above
 * a content area. This is the simplified phone form: the sidebar is always a
 * drawer rather than a persistent rail. No literal colors.
 */
export declare function AppShell({ sidebar, header, children, menuLabel, sidebarWidth, style, }: AppShellProps): React.ReactElement;
//# sourceMappingURL=AppShell.d.ts.map