import * as React from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';

/**
 * A token-fed gradient ground for the weather V4 line.
 *
 * `expo-linear-gradient` is an **optional** peer of the kit — every Expo app
 * already ships it, but a bare React Native app may not. So we resolve it
 * lazily: when present, a real vertical `LinearGradient`; when absent, a solid
 * fill of the gradient's last stop (the deepest color), so nothing crashes and
 * the surface still reads. Either way every color is a compiled theme token
 * passed in by the caller — no literal colors here.
 */

// Resolve the optional dep once, guarded — a missing module must not throw.
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
  /** Gradient stops, deepest last. Always compiled theme-token colors. */
  colors: string[];
  /** Start point (0–1). Default top. */
  start?: { x: number; y: number };
  /** End point (0–1). Default bottom. */
  end?: { x: number; y: number };
  /** Optional stop positions. */
  locations?: number[];
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

/** Vertical (top→bottom) by default — the sky look. */
export function GradientSurface({
  colors,
  start = { x: 0, y: 0 },
  end = { x: 0, y: 1 },
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
