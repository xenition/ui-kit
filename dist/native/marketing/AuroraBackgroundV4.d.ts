import * as React from 'react';
import type { AuroraBackgroundProps } from './AuroraBackground';
/** Drop-in for {@link AuroraBackgroundProps} — same props, the V4 "showcase" design. */
export type AuroraBackgroundV4Props = AuroraBackgroundProps;
/**
 * AuroraBackground — **V4** "showcase" design (native mirror of the web V4).
 *
 * Same technique as the native base {@link AuroraBackground}: a static,
 * token-styled layered background of absolutely-positioned, fully-rounded
 * ramp-color Views — React Native has no CSS `filter: blur`, keyframes or
 * `mix-blend-mode`, so nothing animates and there is nothing to honor for
 * reduced motion (it is already the rest state). The V4 *refines* the look:
 * each blob is drawn as a soft **radial `Gradient`** (bright ramp core →
 * translucent edge via `withAlpha`) instead of a flat alpha disc, giving the
 * smoother, more confident falloff the web V4 gets from multi-stop radials.
 * The blob compositions match the base per `variant`, so `aurora`/`mesh`/
 * `radial` read the same, only cleaner.
 *
 * `grain` and `pattern` remain **inert** on native (no SVG-filter / CSS
 * tiling equivalent), accepted for API parity exactly as in the base.
 * `children` render in an absolute-fill layer above the blobs. Token-only.
 */
export declare function AuroraBackgroundV4({ variant, grain: _grain, pattern: _pattern, children, style, }: AuroraBackgroundV4Props): React.ReactElement;
//# sourceMappingURL=AuroraBackgroundV4.d.ts.map