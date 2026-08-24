import * as React from 'react';
import { cn } from '../primitives/cn';
import { EmptyState } from '../commerce';

export interface LookbookItem {
  /** Stable id (used as the React key and passed to `onSelect`). */
  id: string;
  /** Image URL; a token-tinted tile shows when absent. */
  imageUrl?: string;
  /** Caption / style name shown over the tile. */
  label?: string;
  /** Optional stylist / category tag. */
  tag?: string;
}

export interface LookbookGridProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /** Grid items. When empty, the `emptyLabel` state renders. */
  items: LookbookItem[];
  /** Column count (default 2). Clamped to at least 1. */
  columns?: number;
  /** Tile aspect ratio (width / height, default 0.8 = portrait). */
  aspectRatio?: number;
  /** Empty-state copy. */
  emptyLabel?: string;
  /** Fires with the tapped item's id. */
  onSelect?: (id: string) => void;
}

/**
 * A masonry-style lookbook / gallery grid of style photos. Renders `items` in a
 * flex-wrap grid of `columns`; each tile shows the image with a caption band and
 * optional tag, and calls `onSelect(id)` on activation (keyboard supported). An
 * empty `items` array renders the shared `EmptyState`. Indices are guarded and
 * missing images degrade to a tinted placeholder. Token-only colors.
 */
export const LookbookGrid = React.forwardRef<HTMLDivElement, LookbookGridProps>(
  function LookbookGrid(
    { items, columns = 2, aspectRatio = 0.8, emptyLabel = 'No looks yet', onSelect, className, ...rest },
    ref
  ) {
    const cols = Math.max(1, Math.floor(columns));
    const widthPct = `${100 / cols}%`;

    if (!items.length) {
      return (
        <EmptyState
          ref={ref}
          data-xen-lookbook-grid=""
          icon={<span className="text-2xl">📷</span>}
          title={emptyLabel}
          className={className}
          {...rest}
        />
      );
    }

    return (
      <div
        ref={ref}
        data-xen-lookbook-grid=""
        className={cn('flex flex-wrap', className)}
        {...rest}
      >
        {items.map((item, i) => {
          const interactive = !!onSelect;
          return (
            <div key={item.id ?? i} style={{ width: widthPct }} className="p-[var(--xen-space-xs)]">
              <div
                data-xen-look=""
                role={interactive ? 'button' : undefined}
                tabIndex={interactive ? 0 : undefined}
                aria-label={item.label ?? `Look ${i + 1}`}
                onClick={interactive ? () => onSelect(item.id) : undefined}
                onKeyDown={
                  interactive
                    ? (e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          onSelect(item.id);
                        }
                      }
                    : undefined
                }
                style={{ aspectRatio: String(aspectRatio) }}
                className={cn(
                  'relative flex flex-col justify-end overflow-hidden rounded-[var(--xen-radius-md)] border border-border bg-neutral-100',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
                  interactive && 'cursor-pointer transition-opacity hover:opacity-90'
                )}
              >
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.label ?? ''}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 flex items-center justify-center text-xl"
                  >
                    ✂️
                  </span>
                )}
                {item.tag ? (
                  <span className="absolute left-[var(--xen-space-xs)] top-[var(--xen-space-xs)] rounded-[var(--xen-radius-sm)] bg-on-surface px-[var(--xen-space-xs)] py-px text-xs font-bold text-surface opacity-80">
                    {item.tag}
                  </span>
                ) : null}
                {item.label ? (
                  <span className="relative bg-on-surface p-[var(--xen-space-sm)] opacity-70">
                    <span className="block truncate text-sm font-bold text-surface">{item.label}</span>
                  </span>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
);
