import * as React from 'react';
import { cn } from '../primitives/cn';
import { Gallery } from '../media';
import { EmptyState } from '../commerce';
import type { PortfolioGridProps } from './PortfolioGrid';

/** Drop-in for {@link PortfolioGridProps} — same props, the V4 "studio" design. */
export type PortfolioGridV4Props = PortfolioGridProps;

const GRID_COLS: Record<2 | 3 | 4, string> = {
  2: 'grid-cols-2',
  3: 'grid-cols-2 sm:grid-cols-3',
  4: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
};

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
export const PortfolioGridV4 = React.forwardRef<HTMLDivElement, PortfolioGridV4Props>(
  function PortfolioGridV4(
    {
      items,
      columns = 3,
      variant = 'grid',
      title,
      onOpen,
      loading = false,
      loadingCount = 6,
      emptyLabel = 'No photos yet',
      emptyDescription,
      className,
      ...rest
    },
    ref
  ) {
    const heading = title ? (
      <h3 data-xen-portfolio-title="" className="font-heading text-lg font-bold text-on-surface">
        {title}
      </h3>
    ) : null;

    // The matted surface: the whole body of work floats inside an elevated card.
    const wrap = (children: React.ReactNode): React.ReactElement => (
      <div
        ref={ref}
        data-xen-portfolio-grid={variant}
        className={cn(
          'flex flex-col gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-md)] text-on-surface shadow-md',
          className
        )}
        {...rest}
      >
        {heading}
        {children}
      </div>
    );

    if (loading) {
      const count = Math.max(1, loadingCount);
      return wrap(
        <div
          aria-label="Loading photos"
          aria-busy="true"
          className={cn('grid gap-[var(--xen-space-md)]', GRID_COLS[columns])}
        >
          {Array.from({ length: count }, (_, i) => i).map((i) => (
            <div
              key={i}
              className="aspect-square animate-pulse rounded-[var(--xen-radius-md)] bg-neutral-200 ring-1 ring-inset ring-border"
            />
          ))}
        </div>
      );
    }

    if (items.length === 0) {
      return wrap(<EmptyState title={emptyLabel} description={emptyDescription} />);
    }

    return wrap(<Gallery items={items} columns={columns} variant={variant} onOpen={onOpen} />);
  }
);
