import * as React from 'react';
import { type PressableProps, type StyleProp, type ViewStyle } from 'react-native';
export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';
export interface ButtonProps extends Omit<PressableProps, 'children' | 'style'> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    /** Fires on press (RN equivalent of the web `onClick`). */
    onPress?: PressableProps['onPress'];
    disabled?: boolean;
    /** Show a spinner and block presses. */
    loading?: boolean;
    /** Container style override. */
    style?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
}
/**
 * Themed button — the native mirror of the web `Button`. Same
 * `variant`/`size`/`disabled` contract; `onPress` replaces the web `onClick`
 * and a `loading` flag renders a spinner. All colors/radii come from the
 * compiled theme tokens via `useXenitionTheme()` — no literal colors.
 */
export declare function Button({ variant, size, onPress, disabled, loading, style, children, ...rest }: ButtonProps): React.ReactElement;
//# sourceMappingURL=Button.d.ts.map