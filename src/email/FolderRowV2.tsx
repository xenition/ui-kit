import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon, Badge } from '../primitives';
import type { FolderRowProps } from './FolderRow';

/** Same public contract as {@link FolderRow} — a drop-in alternate design. */
export type FolderRowV2Props = FolderRowProps;

/**
 * FolderRow — design **V2**. A **tile**: a large folder glyph on a soft tinted
 * chip, the name beneath, and the unread count as a corner `Badge`. The
 * `selected` state raises the tile (shadow + primary border + primary label) and
 * reports `aria-current` so it isn't signalled by color alone. Lifts on hover.
 * The `depth` indent still applies. Same props as `FolderRow`. No literal colors.
 */
export const FolderRowV2 = React.forwardRef<HTMLButtonElement, FolderRowV2Props>(function FolderRowV2(
  { name, glyph, count = 0, selected = false, depth = 0, onClick, className },
  ref
) {
  const indent = Math.max(0, depth);
  return (
    <button
      ref={ref}
      type="button"
      aria-label={`${name}${count > 0 ? `, ${count} unread` : ''}`}
      aria-current={selected ? 'page' : undefined}
      onClick={onClick}
      style={{ marginLeft: `calc(var(--xen-space-xs) + ${indent} * var(--xen-space-lg))` }}
      className={cn(
        'flex w-full flex-col gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)] border p-[var(--xen-space-md)] text-left transition duration-200',
        'hover:-translate-y-0.5 hover:shadow-md active:scale-[.98]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        'motion-reduce:transition-none motion-reduce:hover:transform-none',
        selected ? 'border-primary bg-primary/10 shadow-md' : 'border-border bg-surface',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <span
          className={cn(
            'inline-flex h-10 w-10 items-center justify-center rounded-[var(--xen-radius-md)]',
            selected ? 'bg-primary/20' : 'bg-neutral-100'
          )}
        >
          <Icon glyph={glyph ?? '📁'} size="lg" color={selected ? 'primary' : 'muted'} />
        </span>
        {count > 0 ? (
          <Badge tone={selected ? 'primary' : 'neutral'} variant={selected ? 'solid' : 'soft'} size="sm">
            {count > 999 ? '999+' : String(count)}
          </Badge>
        ) : null}
      </div>

      <span
        className={cn(
          'min-w-0 truncate text-base',
          selected ? 'font-bold text-primary' : 'font-semibold text-on-surface'
        )}
      >
        {name}
      </span>
    </button>
  );
});
