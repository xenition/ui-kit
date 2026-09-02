import * as React from 'react';
import type { ETABarProps } from './ETABar';
/** Drop-in for {@link ETABarProps} — same props, the V4 "dispatch" design. */
export type ETABarV4Props = ETABarProps;
/**
 * ETABar — **V4** "dispatch" design (native twin of the web V4). The confident,
 * operations-desk take on a journey/ETA bar: an elevated rounded card with a soft
 * shadow, a labelled glyph + word punctuality badge (never color alone), a big
 * legible **tabular-nums** ETA, a token fill sized to `progress`, and an
 * origin→destination label row. Exposes a `progressbar` role with
 * `accessibilityValue` so completion is announced, not inferred from the fill
 * color. Token-only colors via `useXenitionTheme()`.
 */
export declare function ETABarV4({ progress, status, eta, origin, destination, loading, style, }: ETABarV4Props): React.ReactElement;
//# sourceMappingURL=ETABarV4.d.ts.map