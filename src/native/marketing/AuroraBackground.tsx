import * as React from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';

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

/** Which ramp role + step each blob draws from — token-only, never a literal. */
type BlobRole = 'primary' | 'accent';

interface BlobSpec {
  role: BlobRole;
  step: 400 | 500 | 600 | 700;
  /** Geometry as fractions of the container box. */
  top: string;
  left: string;
  size: string;
  opacity: number;
}

const AURORA_BLOBS: readonly BlobSpec[] = [
  { role: 'primary', step: 500, top: '-20%', left: '-10%', size: '55%', opacity: 0.4 },
  { role: 'accent', step: 400, top: '-10%', left: '55%', size: '50%', opacity: 0.32 },
  { role: 'primary', step: 700, top: '45%', left: '20%', size: '60%', opacity: 0.28 },
  { role: 'accent', step: 600, top: '55%', left: '65%', size: '45%', opacity: 0.28 },
];

const MESH_BLOBS: readonly BlobSpec[] = [
  { role: 'primary', step: 400, top: '-25%', left: '-15%', size: '70%', opacity: 0.36 },
  { role: 'accent', step: 500, top: '-20%', left: '60%', size: '65%', opacity: 0.32 },
  { role: 'primary', step: 600, top: '55%', left: '55%', size: '70%', opacity: 0.32 },
  { role: 'accent', step: 400, top: '60%', left: '-20%', size: '60%', opacity: 0.28 },
];

const RADIAL_BLOBS: readonly BlobSpec[] = [
  { role: 'primary', step: 600, top: '10%', left: '15%', size: '70%', opacity: 0.36 },
  { role: 'accent', step: 500, top: '25%', left: '30%', size: '40%', opacity: 0.28 },
];

const BLOBS: Record<AuroraVariant, readonly BlobSpec[]> = {
  aurora: AURORA_BLOBS,
  mesh: MESH_BLOBS,
  radial: RADIAL_BLOBS,
};

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
export function AuroraBackground({
  variant = 'aurora',
  grain: _grain = false,
  pattern: _pattern = 'none',
  children,
  style,
}: AuroraBackgroundProps): React.ReactElement {
  const { tokens } = useXenitionTheme();

  return (
    <View
      testID="xen-aurora-background"
      pointerEvents="none"
      style={[StyleSheet.absoluteFill, { overflow: 'hidden' }, style]}
    >
      {BLOBS[variant].map((blob, index) => {
        const base = tokens.ramps[blob.role][blob.step];
        return (
          <View
            key={index}
            style={{
              position: 'absolute',
              top: blob.top as ViewStyle['top'],
              left: blob.left as ViewStyle['left'],
              width: blob.size as ViewStyle['width'],
              aspectRatio: 1,
              borderRadius: 9999,
              backgroundColor: withAlpha(base, blob.opacity),
            }}
          />
        );
      })}
      {children !== undefined && children !== null ? (
        <View style={StyleSheet.absoluteFill}>{children}</View>
      ) : null}
    </View>
  );
}
