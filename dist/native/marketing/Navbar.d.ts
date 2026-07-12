import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface NavbarLink {
    label: string;
    /** Fires on press (RN equivalent of the web link `href`). */
    onPress?: () => void;
    /** Marks the link as the current page (bolder tint). */
    active?: boolean;
}
export interface NavbarProps {
    /** Brand slot (logo image, wordmark, …). */
    logo?: React.ReactNode;
    /** Nav links — the web `children` become a data array (idiomatic for RN). */
    links?: NavbarLink[];
    /** Right-side slot (sign-in button, theme toggle, …), rendered as-is. */
    actions?: React.ReactNode;
    /** Accessible label for the mobile menu toggle (default `Menu`). */
    menuLabel?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * Marketing navbar — the native mirror of the web `Navbar`.
 *
 * The web version is a sticky `<header>` that gains a translucent
 * backdrop-blur bar once the page scrolls (a passive `scroll` listener +
 * `color-mix`). React Native has no page-scroll chrome, `backdrop-filter`, or
 * `color-mix`, so native **drops the sticky/scroll-blur behavior** and renders
 * a plain top bar over a translucent `surface` token. Web link `children`
 * become a `links` data array (`href`→`onPress`). On narrow layouts the links
 * collapse behind a disclosure toggle (a `Pressable` flipping a `View`), the
 * native equivalent of the web mobile menu. Token-only.
 */
export declare function Navbar({ logo, links, actions, menuLabel, style, }: NavbarProps): React.ReactElement;
//# sourceMappingURL=Navbar.d.ts.map