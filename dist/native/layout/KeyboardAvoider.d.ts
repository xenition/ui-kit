import * as React from 'react';
import { type KeyboardAvoidingViewProps, type StyleProp, type ViewStyle } from 'react-native';
export interface KeyboardAvoiderProps extends KeyboardAvoidingViewProps {
    style?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
}
/**
 * Wraps `KeyboardAvoidingView` with the platform-correct `behavior` (`padding`
 * on iOS, `height` on Android) so content lifts above the on-screen keyboard.
 * Pure layout — no theme colors; callers can still override `behavior`/`style`.
 */
export declare function KeyboardAvoider({ behavior, style, children, ...rest }: KeyboardAvoiderProps): React.ReactElement;
//# sourceMappingURL=KeyboardAvoider.d.ts.map