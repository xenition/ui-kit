import * as React from 'react';
import { View, type StyleProp, type ViewProps, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from './internal/color';

export type GlassIntensity = 'soft' | 'regular' | 'strong';

export interface GlassPanelProps extends ViewProps {
  /**
   * How opaque the panel reads: `soft` (45% surface), `regular` (65%, default),
   * `strong` (82%) — mirrors the web `intensity` scale.
   */
  intensity?: GlassIntensity;
  /** Draw the translucent token border (default true). */
  bordered?: boolean;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

const SURFACE_ALPHA: Record<GlassIntensity, number> = {
  soft: 0.45,
  regular: 0.65,
  strong: 0.82,
};

/**
 * Translucent surface — the native mirror of the web `GlassPanel`. React
 * Native has no `color-mix()`/`backdrop-filter`, so the frosted look is
 * approximated by an `rgba()` derived from the **`surface` token** at the
 * intensity's alpha (plus a translucent `border` token edge). The color always
 * originates from a theme token — no literal colors. On iOS a
 * `blurRadius`-style backdrop would need a native blur view; this keeps the
 * kit dependency-free and restyle-by-seed.
 */
export function GlassPanel({
  intensity = 'regular',
  bordered = true,
  style,
  children,
  ...rest
}: GlassPanelProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  return (
    <View
      style={[
        {
          backgroundColor: withAlpha(colors.surface, SURFACE_ALPHA[intensity]),
          borderRadius: tokens.radius.lg,
          ...(bordered
            ? { borderWidth: 1, borderColor: withAlpha(colors.border, 0.6) }
            : null),
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
}
