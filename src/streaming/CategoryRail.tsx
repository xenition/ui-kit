import * as React from 'react';
import { cn } from '../primitives/cn';

/** One browse category — a genre or mood tile in a {@link CategoryRail}. */
export interface CategoryRailItem {
  /** Stable unique id (used as the list key and passed to `onSelect`). */
  id: string;
  /** Human label rendered on the tile, e.g. `'Chill'`. */
  label: string;
  /** Optional decorative glyph shown when there's no artwork. */
  glyph?: string;
  /** Optional cover artwork URL; replaces the gradient glow when present. */
  artworkUrl?: string;
}

export interface CategoryRailProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect' | 'title'> {
  /** The browse categories, rendered left→right in a horizontally-scrolling rail. */
  categories: readonly CategoryRailItem[];
  /** Optional header label above the rail. */
  title?: string;
  /** Called with a category `id` when its tile is tapped. */
  onSelect?: (id: string) => void;
}

/**
 * CategoryRail — **V4** "spotlight" design (web parity of the native V4). A
 * horizontally-scrolling rail of rounded browse tiles (genres / moods). Each
 * tile is a gradient-glow cover — the V4 accent→primary wash — or the category
 * artwork when supplied, with the label set in near-white `onPrimary` ink over a
 * legibility scrim. Tiles are ≥44px tap targets. Presentational only; all colors
 * from `--xen-*` token classes and gradient utilities (no literal hex).
 * Dark-mode safe.
 */
export const CategoryRail = React.forwardRef<HTMLDivElement, CategoryRailProps>(function CategoryRail(
  { categories, title, onSelect, className, ...rest },
  ref
) {
  if (categories.length === 0) return null;

  return (
    <div ref={ref} data-xen-category-rail="" className={cn('flex flex-col gap-[var(--xen-space-sm)]', className)} {...rest}>
      {title ? (
        <span className="px-[var(--xen-space-xs)] text-xs font-bold uppercase tracking-wide text-muted">{title}</span>
      ) : null}

      <ul
        role="list"
        className="flex gap-[var(--xen-space-md)] overflow-x-auto pb-[var(--xen-space-xs)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {categories.map((cat) => {
          const interactive = !!onSelect;
          return (
            <li key={cat.id} role="listitem" className="shrink-0">
              <button
                type="button"
                disabled={!interactive}
                aria-label={cat.label}
                onClick={interactive ? () => onSelect!(cat.id) : undefined}
                className={cn(
                  'relative flex h-24 w-32 min-h-[44px] min-w-[44px] items-end overflow-hidden rounded-[var(--xen-radius-lg)] p-[var(--xen-space-sm)] text-left',
                  'bg-gradient-to-br from-accent-400 to-primary-600',
                  'transition-transform',
                  interactive &&
                    'hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
                  !interactive && 'cursor-default'
                )}
              >
                {cat.artworkUrl ? (
                  <img
                    src={cat.artworkUrl}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : null}

                {/* Legibility scrim so the ink reads on any cover. */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-primary-700/70 to-transparent"
                />

                <span className="relative flex items-center gap-[var(--xen-space-xs)]">
                  {cat.glyph ? <span className="text-lg text-on-primary">{cat.glyph}</span> : null}
                  <span className="text-sm font-bold text-on-primary">{cat.label}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
});
