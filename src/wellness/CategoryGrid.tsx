import * as React from 'react';
import { cn } from '../primitives/cn';
import { SLOT_TEXT, SLOT_TINT } from './_tokens';

export type WellnessCategoryTone = 'primary' | 'accent' | 'success' | 'warn' | 'danger';

export interface WellnessCategory {
  id: string;
  label: string;
  glyph: string;
  tone?: WellnessCategoryTone;
}

export interface CategoryTileProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /** The category this tile represents. */
  category: WellnessCategory;
  /** Fires with the category when the tile is tapped. */
  onSelect?: (category: WellnessCategory) => void;
}

export interface CategoryGridProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  categories: WellnessCategory[];
  onSelect?: (category: WellnessCategory) => void;
}

/**
 * CategoryTile — one browse tile: a soft, color-coded card in its category's
 * tone. A glyph sits in a slightly deeper tint circle over a lighter tinted
 * ground, with the label in `on-surface`. This is the one wellness surface where
 * per-card color is the point — the grid reads as a palette of categories. The
 * tints are `SLOT_TINT[tone]`, so every color traces to a token and restyles
 * from the seed, light + dark.
 */
export const CategoryTile = React.forwardRef<HTMLDivElement, CategoryTileProps>(function CategoryTile(
  { category, onSelect, className, ...rest },
  ref
) {
  const tone = category.tone ?? 'primary';

  return (
    <div ref={ref} className={cn('flex', className)} {...rest}>
      <button
        type="button"
        aria-label={category.label}
        onClick={() => onSelect?.(category)}
        className={cn(
          'flex w-full flex-col gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] p-[var(--xen-space-lg)] text-left',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
          SLOT_TINT[tone]
        )}
      >
        <span
          aria-hidden="true"
          className={cn('flex h-11 w-11 items-center justify-center rounded-full text-xl', SLOT_TINT[tone])}
        >
          {category.glyph}
        </span>
        <span className="text-base font-bold text-on-surface">{category.label}</span>
      </button>
    </div>
  );
});

/**
 * CategoryGrid — the browse surface: a grid of color-coded {@link CategoryTile}s,
 * two per row. Color lives on the tiles (each in its category tone); the grid
 * itself is a plain layout. Token-only colors.
 */
export const CategoryGrid = React.forwardRef<HTMLDivElement, CategoryGridProps>(function CategoryGrid(
  { categories, onSelect, className, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      role="menu"
      className={cn('grid gap-3', className)}
      style={{ gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}
      {...rest}
    >
      {categories.map((category) => (
        <CategoryTile key={category.id} category={category} onSelect={onSelect} />
      ))}
    </div>
  );
});
