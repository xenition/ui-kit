import * as React from 'react';
import { type StyleProp, type TextInputProps, type ViewStyle } from 'react-native';
export interface TextareaProps extends TextInputProps {
    /** Renders the danger border state (mirrors the web `invalid`). */
    invalid?: boolean;
    /**
     * Optional field label rendered above the control. Native-only additive prop
     * (web composes labels externally); optional, so parity is preserved.
     */
    label?: string;
    /** Visible line count → drives the min height (mirrors the web `rows`). */
    rows?: number;
    /** Wrapper style override. */
    containerStyle?: StyleProp<ViewStyle>;
}
/**
 * Themed multi-line text input — the native mirror of the web `Textarea`.
 * `multiline` TextInput, token-bound background/border/text; `invalid` swaps the
 * border to the danger token. No literal colors; placeholder uses the `muted`
 * token.
 */
export declare function Textarea({ invalid, label, rows, containerStyle, style, editable, ...rest }: TextareaProps): React.ReactElement;
//# sourceMappingURL=Textarea.d.ts.map