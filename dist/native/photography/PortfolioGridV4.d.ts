import * as React from 'react';
import type { PortfolioGridProps } from './PortfolioGrid';
/** Drop-in for {@link PortfolioGridProps} — same props, the V4 "studio" design. */
export type PortfolioGridV4Props = PortfolioGridProps;
/**
 * PortfolioGrid — **V4** "studio" design. The matted, image-forward take on a
 * portfolio: the body of work floats inside an elevated **mat** — a token
 * surface with a thin border and soft shadow — while the media {@link Gallery}
 * lays the photos out. Honors both `variant` layouts — `grid` (uniform square
 * tiles) and `masonry` (intrinsic ratios), tappable when `onOpen` is set — and
 * renders a token skeleton while `loading` and an {@link EmptyState} when there
 * are no photos. Identical props/behavior to {@link PortfolioGridProps};
 * token-only colors via `useXenitionTheme()`.
 */
export declare function PortfolioGridV4({ items, columns, variant, title, onOpen, loading, loadingCount, emptyLabel, emptyDescription, scrollEnabled, style, }: PortfolioGridV4Props): React.ReactElement;
//# sourceMappingURL=PortfolioGridV4.d.ts.map