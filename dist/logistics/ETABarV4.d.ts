import * as React from 'react';
import type { ETABarProps } from './ETABar';
/** Drop-in for {@link ETABarProps} — same props, the V4 "dispatch" design. */
export type ETABarV4Props = ETABarProps;
/**
 * ETABar — **V4** "dispatch" design (web parity of the native V4). The confident,
 * operations-desk take on a journey/ETA bar: an elevated rounded card with a soft
 * shadow, a labelled glyph + word punctuality badge (never color alone), a big
 * legible **tabular-nums** ETA, a token fill sized to `progress`, and an
 * origin→destination label row. Exposes a `progressbar` role with `aria-valuenow`
 * so completion is announced, not inferred from the fill color. Identical
 * props/behavior to {@link ETABarProps}. The fill and track come from theme
 * tokens — no literals.
 */
export declare const ETABarV4: React.ForwardRefExoticComponent<ETABarProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ETABarV4.d.ts.map