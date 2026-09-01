import * as React from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';

/**
 * A token-fed gradient ground for the wellness module.
 *
 * `expo-linear-gradient` is an **optional** peer of the kit — resolved lazily so
 * a bare React Native app without it degrades to a solid fill of the gradient's
 * last (deepest) stop rather than crashing. Every color is a compiled theme
 * token passed in by the caller — no literal colors here.
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
  /** Gradient stops, deepest last. Always compiled theme-token colors. */
  colors: string[];
  /** Start point (0–1). Default top-left. */
  start?: { x: number; y: number };
  /** End point (0–1). Default bottom-right (a soft diagonal, calmer than vertical). */
  end?: { x: number; y: number };
  locations?: number[];
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

/** Diagonal by default — a softer, calmer wash than a hard vertical. */
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
