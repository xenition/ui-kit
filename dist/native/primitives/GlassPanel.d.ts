import * as React from 'react';
import { type StyleProp, type ViewProps, type ViewStyle } from 'react-native';
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
/**
 * Translucent surface — the native mirror of the web `GlassPanel`. React
 * Native has no `color-mix()`/`backdrop-filter`, so the frosted look is
 * approximated by an `rgba()` derived from the **`surface` token** at the
 * intensity's alpha (plus a translucent `border` token edge). The color always
 * originates from a theme token — no literal colors. On iOS a
 * `blurRadius`-style backdrop would need a native blur view; this keeps the
 * kit dependency-free and restyle-by-seed.
 */
export declare function GlassPanel({ intensity, bordered, style, children, ...rest }: GlassPanelProps): React.ReactElement;
//# sourceMappingURL=GlassPanel.d.ts.map