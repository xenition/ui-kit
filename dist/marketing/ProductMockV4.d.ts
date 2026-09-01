import * as React from 'react';
import type { ProductMockProps } from './ProductMock';
/** Drop-in for {@link ProductMockProps} — same props, the V4 "showcase" design. */
export type ProductMockV4Props = ProductMockProps;
/**
 * ProductMock — **V4** "showcase" design (web parity of the native V4). A crisp,
 * refined device/browser frame on a clean surface (NO brand gradient, no glass
 * blur, no glow): an elevated `rounded-lg border border-border bg-surface
 * shadow-sm` frame with a soft browser chrome bar (three neutral dots + the
 * `title` and an optional `LIVE` badge). The KPIs render as bold **tabular-nums**
 * numerals in soft-primary wells, and the main pane draws the same
 * variant/`chart` visual token-driven (equalizer bars, sparkline, progress rings,
 * chat thread, month grid). The base's looping CSS animation and 3D `tilt`
 * entrance are dropped for a still, reduced-motion-safe showcase (the `tilt` prop
 * is still accepted). Honors every base prop
 * (`variant`/`title`/`kpis`/`chart`/`feed`/`live`/`footnote`); it is decorative
 * scenery (`aria-hidden`). Token-only colors, no literals.
 */
export declare const ProductMockV4: React.ForwardRefExoticComponent<ProductMockProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ProductMockV4.d.ts.map