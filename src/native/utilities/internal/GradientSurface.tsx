import * as React from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';

/**
 * A token-fed gradient ground for the utilities module. `expo-linear-gradient`
 * is an optional peer, resolved lazily so a bare RN app degrades to a solid fill
 * of the gradient's deepest stop rather than crashing. Every color is a compiled
 * theme token passed in by the caller — no literals here. Used sparingly (the
 * account header and the payment confirmation) to keep the money-heavy surfaces
 * calm and trustworthy.
 */
let LinearGradient: React.ComponentType<{
  colors: string[];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  locations?: number[];
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}> | null = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  LinearGradient = require('expo-linear-gradient').LinearGradient;
} catch {
  LinearGradient = null;
}

export interface GradientSurfaceProps {
  colors: string[];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  locations?: number[];
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

/** Diagonal by default — a soft, calm wash. */
export function GradientSurface({
  colors,
  start = { x: 0, y: 0 },
  end = { x: 1, y: 1 },
  locations,
  style,
  children,
}: GradientSurfaceProps): React.ReactElement {
  if (LinearGradient) {
    return (
      <LinearGradient colors={colors} start={start} end={end} locations={locations} style={style}>
        {children}
      </LinearGradient>
    );
  }
  const fallback = colors[colors.length - 1];
  return <View style={[{ backgroundColor: fallback }, style]}>{children}</View>;
}
