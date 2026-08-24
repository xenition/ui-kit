import * as React from 'react';
import type { PortfolioGridProps } from './PortfolioGrid';
/** Same public contract as {@link PortfolioGrid} — a drop-in alternate design. */
export type PortfolioGridV3Props = PortfolioGridProps;
/**
 * PortfolioGrid, redesigned (v3): a **dense contact sheet**. Uniform square
 * thumbnails pack tight in a fixed grid with a thin gap and no captions — a
 * scan-everything proof-sheet. The opposite of v2's masonry wall. Same props,
 * token-only.
 */
export declare const PortfolioGridV3: React.ForwardRefExoticComponent<PortfolioGridProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PortfolioGridV3.d.ts.map