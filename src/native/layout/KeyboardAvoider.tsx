import * as React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  type KeyboardAvoidingViewProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

export interface KeyboardAvoiderProps extends KeyboardAvoidingViewProps {
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

/**
 * Wraps `KeyboardAvoidingView` with the platform-correct `behavior` (`padding`
 * on iOS, `height` on Android) so content lifts above the on-screen keyboard.
 * Pure layout — no theme colors; callers can still override `behavior`/`style`.
 */
export function KeyboardAvoider({
  behavior,
  style,
  children,
  ...rest
}: KeyboardAvoiderProps): React.ReactElement {
  return (
    <KeyboardAvoidingView
      behavior={behavior ?? (Platform.OS === 'ios' ? 'padding' : 'height')}
      style={[{ flex: 1 }, style]}
      {...rest}
    >
      {children}
    </KeyboardAvoidingView>
  );
}
