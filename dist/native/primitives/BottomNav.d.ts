import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface BottomNavItem {
    key: string;
    label: string;
    /** Optional icon node (e.g. an `<Icon glyph="🏠" />`). */
    icon?: React.ReactNode;
}
export interface BottomNavProps {
    items: BottomNavItem[];
    /** Key of the active tab. */
    active: string;
    /** Fires with the selected tab key. */
    onChange: (key: string) => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * Fixed bottom tab bar — the primary mobile navigation pattern. A full-width
 * row of tappable items on a `surface` background with a top hairline in the
 * `border` token; the active item's label renders in the `primary` tone while
 * inactive items use `muted`. Exposes `tablist`/`tab` a11y roles with the
 * selected state. No literal colors.
 */
export declare function BottomNav({ items, active, onChange, style }: BottomNavProps): React.ReactElement;
//# sourceMappingURL=BottomNav.d.ts.map