import * as React from 'react';

export type PointerHaloMode = 'idle' | 'link' | 'grow';

export interface PointerHaloProps {
  /** Halo diameter at rest, px (web only). */
  size?: number;
  /** Diameter when hovering interactive elements (web only). */
  linkSize?: number;
  /** Diameter over `[data-halo="grow"]` targets (web only). */
  growSize?: number;
  /** Caption shown inside the grown halo (web only). */
  label?: React.ReactNode;
}

/**
 * Native mirror of the web `PointerHalo`. The web component renders a custom
 * cursor halo that trails a fine (mouse) pointer. Touch devices have **no
 * cursor**, so on React Native this is a permanent no-op: it always renders
 * `null` — exactly like the web version does under `prefers-reduced-motion` or
 * a coarse pointer. The component and its props are kept only for cross-platform
 * API parity; every prop is **inert** on native.
 */
export function PointerHalo(_props: PointerHaloProps): React.ReactElement | null {
  return null;
}
