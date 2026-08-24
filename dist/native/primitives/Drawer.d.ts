import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type DrawerSide = 'left' | 'right' | 'top' | 'bottom';
export interface DrawerProps {
    open: boolean;
    onClose: () => void;
    /** Which edge the sheet slides in from (default `right`). */
    side?: DrawerSide;
    title?: React.ReactNode;
    children?: React.ReactNode;
    style?: StyleProp<ViewStyle>;
}
/**
 * Themed side sheet — the native mirror of the web `Drawer`. RN has no DOM
 * portal, so this is a full-screen `Modal` with the panel anchored to `side`
 * over a translucent backdrop (tap to dismiss). The panel slides in with
 * `Animated`; the scrim is the `onSurface` token faded via `opacity` so every
 * rendered color stays a pure theme token. No literal colors.
 */
export declare function Drawer({ open, onClose, side, title, children, style, }: DrawerProps): React.ReactElement;
//# sourceMappingURL=Drawer.d.ts.map