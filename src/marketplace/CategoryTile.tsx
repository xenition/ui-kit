import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives';
import { activateOnKey } from './internal';

export type CategoryTileVariant = 'tile' | 'chip';

export interface CategoryTileProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Category label. */
  label: string;
  /** Emoji/unicode glyph rendered in the icon slot. */
  glyph?: string;
  /** Optional listing count shown under the label. */
  count?: number;
  /** Marks the tile as the active/selected filter. */
  selected?: boolean;
  /** `tile` (default) is a square block; `chip` is a compact horizontal pill. */
  variant?: CategoryTileVariant;
  /**
   * Fires when the tile is activated. When set, the tile is a `role="button"`
   * with keyboard support and `aria-pressed` reflecting `selected`.
   */
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

/**
 * A tappable category entry for a marketplace browse grid — an icon glyph, a
 * label, and an optional listing count. `tile` (default) stacks the glyph over
 * the label as a square block; `chip` lays them out inline as a pill. The
 * `selected` state is carried by an accent ring + tinted surface and the
 * `aria-pressed` state (never color alone). Reuses `Icon`; token-only colors.
 */
export const CategoryTile = React.forwardRef<HTMLDivElement, CategoryTileProps>(function CategoryTile(
  { label, glyph, count, selected = false, variant = 'tile', onClick, className, ...rest },
  ref
) {
  const chip = variant === 'chip';
  const interactive = onClick != null;
  const countLabel = typeof count === 'number' ? `${count.toLocaleString()} items` : undefined;

  return (
    <div
      ref={ref}
      {...(interactive
        ? {
            role: 'button',
            tabIndex: 0,
            onClick,
            onKeyDown: activateOnKey,
            'aria-pressed': selected,
            'aria-label': `${label}${countLabel ? `, ${countLabel}` : ''}`,
          }
        : {})}
      className={cn(
        'flex items-center justify-center rounded-[var(--xen-radius-lg)] border',
        chip
          ? 'flex-row gap-[var(--xen-space-sm)] px-[var(--xen-space-md)] py-[var(--xen-space-sm)]'
          : 'min-h-24 flex-col gap-[var(--xen-space-xs)] px-[var(--xen-space-sm)] py-[var(--xen-space-lg)]',
        selected ? 'border-primary bg-primary-50' : 'border-border bg-surface',
        interactive && 'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        className
      )}
      {...rest}
    >
      {glyph ? (
        <Icon glyph={glyph} size={chip ? 'base' : '2xl'} color={selected ? 'primary' : 'onSurface'} />
      ) : null}
      <div className={cn('flex flex-col', chip ? 'items-start' : 'items-center')}>
        <span className={cn('text-sm font-semibold', selected ? 'text-primary' : 'text-on-surface')}>{label}</span>
        {countLabel ? <span className="text-xs text-muted">{countLabel}</span> : null}
      </div>
    </div>
  );
});
