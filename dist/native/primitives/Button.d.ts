import * as React from 'react';
import { type PressableProps, type StyleProp, type ViewStyle } from 'react-native';
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'soft' | 'link' | 'elevated';
export type ButtonSize = 'sm' | 'md' | 'lg';
/** Recolors the button's accent. `default`/`primary` share the primary slot. */
export type ButtonTone = 'default' | 'primary' | 'danger' | 'success';
export interface ButtonProps extends Omit<PressableProps, 'children' | 'style'> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    /** Semantic accent for the button (danger/success paths). */
    tone?: ButtonTone;
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
 * and a `loading` flag renders a spinner. Additive `variant`s (`outline`,
 * `soft`, `link`, `elevated`) and a `tone` (`danger`/`success`) layer on top;
 * the defaults (`primary`/`secondary`/`ghost`, tone `default`) render exactly
 * as before. All colors/radii come from the compiled theme tokens via
 * `useXenitionTheme()` — no literal colors.
 */
export declare function Button({ variant, size, tone, onPress, disabled, loading, style, children, ...rest }: ButtonProps): React.ReactElement;
//# sourceMappingURL=Button.d.ts.map