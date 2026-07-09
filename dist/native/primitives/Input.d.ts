import * as React from 'react';
import { type StyleProp, type TextInputProps, type ViewStyle } from 'react-native';
export interface InputProps extends TextInputProps {
    /** Renders the danger border state (mirrors the web `invalid`). */
    invalid?: boolean;
    /**
     * Optional field label rendered above the input. Native-only additive prop
     * (web composes labels externally); optional, so parity is preserved.
     */
    label?: string;
    /** Wrapper style override. */
    containerStyle?: StyleProp<ViewStyle>;
}
/**
 * Themed text input — the native mirror of the web `Input`. Token-bound
 * background/border/text; `invalid` swaps the border to the danger token. No
 * literal colors; placeholder uses the `muted` token.
 */
export declare function Input({ invalid, label, containerStyle, style, editable, ...rest }: InputProps): React.ReactElement;
//# sourceMappingURL=Input.d.ts.map