import * as React from 'react';
import { View, type StyleProp, type ViewProps, type ViewStyle } from 'react-native';

export interface CenterProps extends ViewProps {
  /** Fill the parent (`flex: 1`) so children center within all available space. */
  fill?: boolean;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

/**
 * Centers its children on both axes. Optionally fills the parent so the
 * centering happens across all available space. Pure layout — no theme colors,
 * so nothing to token-bind beyond the shared numeric flex values.
 */
export function Center({ fill = false, style, children, ...rest }: CenterProps): React.ReactElement {
  return (
    <View
      style={[
        {
          alignItems: 'center',
          justifyContent: 'center',
          flex: fill ? 1 : undefined,
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
}
