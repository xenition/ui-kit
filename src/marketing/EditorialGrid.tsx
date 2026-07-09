import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';

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

/** Provided by `EditorialGrid` so items can derive their default z-order. */
const EditorialIndexContext = React.createContext(0);
const EditorialCountContext = React.createContext(1);

/**
 * Geometry lives in per-item custom properties consumed only inside the `lg`
 * media block, so the asymmetric layout collapses to a clean single column on
 * small screens. The caption backing is the only color rule (surface token).
 */
const EDITORIAL_CSS = `
[data-xen-editorial-grid] {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  column-gap: var(--xen-space-lg);
  row-gap: var(--xen-space-2xl);
}
[data-xen-editorial-item] { position: relative; min-width: 0; }
[data-xen-editorial-caption] {
  position: relative;
  background-color: var(--xen-surface);
}
@media (min-width: 1024px) {
  [data-xen-editorial-grid] {
    grid-template-columns: repeat(var(--xen-editorial-cols, 12), minmax(0, 1fr));
    row-gap: 0;
  }
  [data-xen-editorial-item] {
    grid-column: var(--xen-editorial-col, auto / span 6);
    margin-top: var(--xen-editorial-offset, 0px);
  }
}
`;

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
export const EditorialGrid = React.forwardRef<HTMLDivElement, EditorialGridProps>(
  function EditorialGrid({ columns = 12, className, children, style, ...rest }, ref) {
    injectStyleOnce('xen-editorial-styles', EDITORIAL_CSS);
    const items = React.Children.toArray(children);
    return (
      <div
        ref={ref}
        data-xen-editorial-grid=""
        className={cn(className)}
        style={{ ['--xen-editorial-cols' as string]: columns, ...style }}
        {...rest}
      >
        <EditorialCountContext.Provider value={items.length}>
          {items.map((child, index) => (
            <EditorialIndexContext.Provider key={index} value={index}>
              {child}
            </EditorialIndexContext.Provider>
          ))}
        </EditorialCountContext.Provider>
      </div>
    );
  }
);

/** One cell of the editorial grid — media plus a surface-backed caption. */
export const EditorialItem = React.forwardRef<HTMLElement, EditorialItemProps>(
  function EditorialItem(
    { span = 6, start, offset = 0, z, caption, className, children, style, ...rest },
    ref
  ) {
    injectStyleOnce('xen-editorial-styles', EDITORIAL_CSS);
    const index = React.useContext(EditorialIndexContext);
    const count = React.useContext(EditorialCountContext);
    const zIndex = z ?? count - index;

    return (
      <article
        ref={ref as React.Ref<HTMLElement>}
        data-xen-editorial-item=""
        className={cn(className)}
        style={{
          zIndex,
          ['--xen-editorial-col' as string]:
            start !== undefined ? `${start} / span ${span}` : `span ${span} / span ${span}`,
          ['--xen-editorial-offset' as string]: `${offset}px`,
          ...style,
        }}
        {...rest}
      >
        {children}
        {caption !== undefined ? (
          <div data-xen-editorial-caption="" style={{ zIndex: count + 1 }}>
            {caption}
          </div>
        ) : null}
      </article>
    );
  }
);
