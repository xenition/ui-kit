import * as React from 'react';
import { cn } from './cn';

export interface PaginationProps {
  /** Current 1-based page. */
  page: number;
  /** Total number of pages. */
  pageCount: number;
  onPageChange: (page: number) => void;
  /** How many pages to show either side of the current one (default 1). */
  siblingCount?: number;
  className?: string;
}

/** Page navigation bound to the theme tokens, with ellipsis truncation. */
export function Pagination({
  page,
  pageCount,
  onPageChange,
  siblingCount = 1,
  className,
}: PaginationProps): React.ReactElement | null {
  if (pageCount <= 1) return null;

  const wanted = new Set<number>([1, pageCount]);
  for (let i = page - siblingCount; i <= page + siblingCount; i++) {
    if (i >= 1 && i <= pageCount) wanted.add(i);
  }
  const sorted = Array.from(wanted).sort((a, b) => a - b);
  const items: (number | 'ellipsis')[] = [];
  let prev = 0;
  for (const p of sorted) {
    if (p - prev > 1) items.push('ellipsis');
    items.push(p);
    prev = p;
  }

  const btn =
    'inline-flex h-8 min-w-8 items-center justify-center rounded-[var(--xen-radius-sm)] px-2 text-sm transition-colors';
  const nav = cn(btn, 'text-on-surface hover:bg-neutral-100 disabled:pointer-events-none disabled:opacity-40');

  return (
    <nav className={cn('flex items-center gap-1', className)} aria-label="Pagination">
      <button type="button" className={nav} disabled={page <= 1} onClick={() => onPageChange(page - 1)} aria-label="Previous">
        ‹
      </button>
      {items.map((it, i) =>
        it === 'ellipsis' ? (
          <span key={`e${i}`} className="px-1 text-muted">
            …
          </span>
        ) : (
          <button
            key={it}
            type="button"
            aria-current={it === page ? 'page' : undefined}
            className={cn(btn, it === page ? 'bg-primary text-on-primary' : 'text-on-surface hover:bg-neutral-100')}
            onClick={() => onPageChange(it)}
          >
            {it}
          </button>
        )
      )}
      <button type="button" className={nav} disabled={page >= pageCount} onClick={() => onPageChange(page + 1)} aria-label="Next">
        ›
      </button>
    </nav>
  );
}
