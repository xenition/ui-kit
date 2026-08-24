/**
 * Thin wrapper over the OPTIONAL `expo-linear-gradient` peer, local to the
 * finance module so `CreditCardView`'s gradient face has no cross-module
 * `internal/` reach. Every consumer is an Expo app (so the real native gradient
 * is present), but the dependency is loaded lazily and degrades to a **solid
 * token color** if absent — the kit never hard-requires a native module. Colors
 * passed in always originate from theme tokens.
 */
import * as React from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';

export interface GradientProps {
  /** Gradient stops — token colors (2+). */
  colors: readonly string[];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

// Resolved once. Jest maps this specifier to a mock; Expo apps supply the real
// module; anything else falls back to a solid fill.
let LinearGradient: React.ComponentType<{
  colors: readonly string[];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}> | null = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  LinearGradient = require('expo-linear-gradient').LinearGradient ?? null;
} catch {
  LinearGradient = null;
}

export function Gradient({
  colors,
  start = { x: 0, y: 0 },
  end = { x: 1, y: 1 },
  style,
  children,
}: GradientProps): React.ReactElement {
  if (LinearGradient) {
    return (
      <LinearGradient colors={colors} start={start} end={end} style={style}>
        {children}
      </LinearGradient>
    );
  }
  return <View style={[{ backgroundColor: colors[0] }, style]}>{children}</View>;
}
