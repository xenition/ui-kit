import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface PinInputProps {
    /** Number of digit boxes (default 6). */
    length?: number;
    value: string;
    /** Fires with the joined value (kept as `onChange` for web parity). */
    onChange?: (value: string) => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * OTP / PIN entry — the native mirror of the web `PinInput`. One single-char
 * `TextInput` box per character with ref-driven focus advance and backspace
 * retreat. No literal colors.
 */
export declare function PinInput({ length, value, onChange, style, }: PinInputProps): React.ReactElement;
//# sourceMappingURL=PinInput.d.ts.map