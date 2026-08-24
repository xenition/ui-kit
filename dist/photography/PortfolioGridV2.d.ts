import * as React from 'react';
import type { PortfolioGridProps } from './PortfolioGrid';
/** Same public contract as {@link PortfolioGrid} — a drop-in alternate design. */
export type PortfolioGridV2Props = PortfolioGridProps;
/**
 * PortfolioGrid, redesigned (v2): a **masonry wall**. Photos flow in CSS columns
 * at their natural aspect ratios, each a tappable tile that reveals its caption
 * on a hover scrim. A gallery-wall feel distinct from v1's uniform grid. Same
 * props, token-only.
 */
export declare const PortfolioGridV2: React.ForwardRefExoticComponent<PortfolioGridProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PortfolioGridV2.d.ts.map