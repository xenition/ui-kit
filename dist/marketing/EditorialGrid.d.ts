import * as React from 'react';
export interface EditorialGridProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Column count at the `lg` breakpoint (default 12). Below it, one column. */
    columns?: number;
}
export interface EditorialItemProps extends React.HTMLAttributes<HTMLElement> {
    /** Column span at `lg` (default 6). */
    span?: number;
    /** 1-based start column at `lg`; omitted, the grid auto-places. */
    start?: number;
    /**
     * Vertical offset at `lg`, in px. Negative values pull the item up into the
     * previous row — the deliberate overlap of the portfolio grid.
     */
    offset?: number;
    /**
     * Explicit stacking order. Omitted, earlier items stack ABOVE later ones,
     * so an overlapping item slides UNDER its neighbour's caption.
     */
    z?: number;
    /**
     * Caption slot rendered below the media. Backed with the `surface` token
     * and raised, so overlapping neighbours slide beneath the type.
     */
    caption?: React.ReactNode;
}
/**
 * Asymmetric editorial layout generalized from the portfolio template's
 * overlap grid: a 12-column canvas where items take uneven spans, uneven
 * starts, and negative offsets so covers overlap each other's rows like
 * proofs pinned to a wall — with z-order managed so captions stay readable.
 * Static layout (pair items with `Reveal`/`Parallax` for motion).
 *
 * ```tsx
 * <EditorialGrid>
 *   <EditorialItem span={7} caption={<h3>Alpha</h3>}><GenerativeCover seed="alpha" /></EditorialItem>
 *   <EditorialItem span={4} start={9} offset={176} caption={<h3>Beta</h3>}>…</EditorialItem>
 *   <EditorialItem span={5} start={2} offset={-96} caption={<h3>Gamma</h3>}>…</EditorialItem>
 * </EditorialGrid>
 * ```
 */
export declare const EditorialGrid: React.ForwardRefExoticComponent<EditorialGridProps & React.RefAttributes<HTMLDivElement>>;
/** One cell of the editorial grid — media plus a surface-backed caption. */
export declare const EditorialItem: React.ForwardRefExoticComponent<EditorialItemProps & React.RefAttributes<HTMLElement>>;
//# sourceMappingURL=EditorialGrid.d.ts.map