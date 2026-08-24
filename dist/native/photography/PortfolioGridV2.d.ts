import * as React from 'react';
import type { PortfolioGridProps } from './PortfolioGrid';
/** Drop-in alternate of {@link PortfolioGridProps} — identical prop contract. */
export type PortfolioGridV2Props = PortfolioGridProps;
/**
 * PortfolioGrid — design variant **V2**: a **masonry-feel** wall of photos.
 * Items are dealt round-robin into `columns` vertical stacks and each tile keeps
 * its own intrinsic aspect ratio (falling back to a cycled preset), so tiles
 * vary in height and read as a gallery wall rather than a uniform grid. A gentle
 * caption scrim rides the foot of any captioned tile. Same props as
 * {@link PortfolioGridProps}; token-only, guarded indexing, empty + loading.
 */
export declare function PortfolioGridV2({ items, columns, title, onOpen, loading, loadingCount, emptyLabel, emptyDescription, style, }: PortfolioGridV2Props): React.ReactElement;
//# sourceMappingURL=PortfolioGridV2.d.ts.map