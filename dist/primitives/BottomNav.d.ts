import * as React from 'react';
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
    className?: string;
}
/**
 * Fixed bottom tab bar — the primary mobile navigation pattern. A full-width
 * row of tappable items on a `surface` background with a top hairline in the
 * `border` token; the active item renders in the `primary` tone while inactive
 * items use `muted`. Exposes `tablist`/`tab` roles with the selected state.
 * `position: fixed` to the viewport bottom. No literal colors.
 */
export declare function BottomNav({ items, active, onChange, className }: BottomNavProps): React.ReactElement;
//# sourceMappingURL=BottomNav.d.ts.map