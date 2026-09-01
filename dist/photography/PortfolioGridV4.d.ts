import * as React from 'react';
import type { PortfolioGridProps } from './PortfolioGrid';
/** Drop-in for {@link PortfolioGridProps} — same props, the V4 "studio" design. */
export type PortfolioGridV4Props = PortfolioGridProps;
/**
 * PortfolioGrid — **V4** "studio" design (web parity of the native V4). The
 * matted, image-forward take on a portfolio: the body of work floats inside an
 * elevated **mat** — a token surface with a thin border and soft shadow — while
 * the media {@link Gallery} lays the photos out. Honors both `variant` layouts —
 * `grid` (uniform square tiles) and `masonry` (intrinsic ratios), tappable when
 * `onOpen` is set — and renders a token-only skeleton while `loading` and an
 * {@link EmptyState} when there are no photos. Identical props/behavior to
 * {@link PortfolioGridProps}; all colors trace to `--xen-*` tokens (no literals).
 */
export declare const PortfolioGridV4: React.ForwardRefExoticComponent<PortfolioGridProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PortfolioGridV4.d.ts.map