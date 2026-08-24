import * as React from 'react';
import type { PortfolioGridProps } from './PortfolioGrid';
/** Drop-in alternate of {@link PortfolioGridProps} — identical prop contract. */
export type PortfolioGridV3Props = PortfolioGridProps;
/**
 * PortfolioGrid — design variant **V3**: a **uniform, tight contact-sheet grid**.
 * Every photo is a hard square packed with a 2px gutter and no per-tile radius,
 * so the wall reads as one dense sheet rather than spaced cards — the opposite
 * feel to V2's masonry. The whole sheet gets a single outer radius/clip. Same
 * props as {@link PortfolioGridProps}; token-only, guarded indexing, empty +
 * loading.
 */
export declare function PortfolioGridV3({ items, columns, title, onOpen, loading, loadingCount, emptyLabel, emptyDescription, style, }: PortfolioGridV3Props): React.ReactElement;
//# sourceMappingURL=PortfolioGridV3.d.ts.map