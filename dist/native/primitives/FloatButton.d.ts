import * as React from 'react';
import { type PressableProps, type StyleProp, type ViewStyle } from 'react-native';
export type FloatButtonPlacement = 'bottom-right' | 'bottom-left' | 'bottom-center';
export interface FloatButtonProps extends Omit<PressableProps, 'children' | 'style'> {
    /** Fires on press. */
    onPress?: PressableProps['onPress'];
    /** Leading glyph/icon node (e.g. an `<Icon glyph="+" />`). */
    icon?: React.ReactNode;
    /** Optional text — when present the FAB expands into a pill. */
    label?: string;
    /** Where the FAB anchors over its parent (default `bottom-right`). */
    placement?: FloatButtonPlacement;
    disabled?: boolean;
    accessibilityLabel?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * Floating action button — a circular (or pill, when `label` is set) primary
 * affordance anchored to a screen corner. Background is the `primary` token,
 * content the `onPrimary` token, with a token-derived shadow (the darkest
 * neutral ramp step as `shadowColor`). Absolutely positioned by `placement`;
 * override via `style`. No literal colors.
 */
export declare function FloatButton({ onPress, icon, label, placement, disabled, accessibilityLabel, style, ...rest }: FloatButtonProps): React.ReactElement;
//# sourceMappingURL=FloatButton.d.ts.map