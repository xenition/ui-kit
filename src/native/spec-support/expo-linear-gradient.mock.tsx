/**
 * Jest mock for the optional `expo-linear-gradient` peer. Renders a plain
 * `View` that forwards `colors` (as a prop the specs can read) plus style and
 * children, so gradient components can be asserted on without an Expo native
 * runtime.
 */
import * as React from 'react';
import { View, ViewProps } from 'react-native';

export interface LinearGradientProps extends ViewProps {
  colors: readonly string[];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  locations?: readonly number[];
}

export function LinearGradient({
  colors,
  start,
  end,
  locations,
  children,
  ...rest
}: LinearGradientProps): React.ReactElement {
  // `colors` is intentionally forwarded as a plain prop (invisible to a real
  // View, visible to the test renderer) so specs can assert on the stops.
  return (
    <View accessibilityLabel="linear-gradient" {...({ colors } as ViewProps)} {...rest}>
      {children}
    </View>
  );
}

export default { LinearGradient };
