import * as React from 'react';
import type { ProductMockProps } from './ProductMock';
/** Drop-in for {@link ProductMockProps} — same props, the V4 "showcase" design. */
export type ProductMockV4Props = ProductMockProps;
/**
 * ProductMock — **V4** "showcase" design (native mirror of the web V4). A crisp,
 * refined device/browser frame on the page ground (NO gradient, no glass): an
 * elevated card (`colors.card` + border + soft shadow) with a soft browser chrome
 * bar (three neutral dots + the `title` and an optional `LIVE` badge). The KPIs
 * render as bold numerals in soft-primary wells (`fontVariant: ['tabular-nums']`),
 * and the main pane draws the same variant/`chart` visual token-driven (bars,
 * stepped sparkline, concentric rings, chat thread, month grid). As on the native
 * base, there is no animation loop — a still, reduced-motion-safe showcase. Honors
 * every native base field (`variant`/`title`/`kpis`/`chart`/`feed`/`live`/
 * `footnote`); it is decorative scenery (`aria-hidden`). Token-only colors, no
 * literals.
 */
export declare function ProductMockV4({ variant, title, kpis, chart, feed, live, footnote, style, }: ProductMockV4Props): React.ReactElement;
//# sourceMappingURL=ProductMockV4.d.ts.map