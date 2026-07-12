import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type AuroraVariant = 'aurora' | 'mesh' | 'radial';
export type AuroraPattern = 'none' | 'dots' | 'grid';
export interface AuroraBackgroundProps {
    /** Blob composition: layered aurora, corner mesh, or a single radial glow. */
    variant?: AuroraVariant;
    /**
     * Web overlays an SVG feTurbulence grain texture. React Native has no
     * `mix-blend-mode`/SVG-filter equivalent, so this prop is **inert** on native.
     */
    grain?: boolean;
    /**
     * Web overlays a dot/grid pattern. Native has no CSS background-image tiling,
     * so this prop is **inert** on native.
     */
    pattern?: AuroraPattern;
    /** Decorative content layered above the blobs (rendered absolute-fill). */
    children?: React.ReactNode;
    style?: StyleProp<ViewStyle>;
}
/**
 * Native mirror of the web `AuroraBackground`. The web version paints blurred,
 * slowly drifting radial-gradient blobs (plus grain/pattern overlays) using CSS
 * `filter: blur()`, keyframes, and `mix-blend-mode` — none of which exist in
 * React Native. Native therefore renders a **static, token-styled** layered
 * background: a few absolutely-positioned, low-opacity, fully-rounded ramp-color
 * Views (primary/accent steps 400–700), softened with a translucent alpha
 * derived from the token so they read as glows rather than hard discs. No
 * continuous animation — nothing to honor for reduced motion. `children` render
 * in an absolute-fill layer above the blobs. `grain` and `pattern` are accepted
 * for API parity but are **inert** on native (see prop docs). Token-only.
 */
export declare function AuroraBackground({ variant, grain: _grain, pattern: _pattern, children, style, }: AuroraBackgroundProps): React.ReactElement;
//# sourceMappingURL=AuroraBackground.d.ts.map