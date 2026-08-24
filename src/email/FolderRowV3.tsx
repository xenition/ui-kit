import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives';
import type { FolderRowProps } from './FolderRow';

/** Same public contract as {@link FolderRow} — a drop-in alternate design. */
export type FolderRowV3Props = FolderRowProps;

/**
 * FolderRow — design **V3**. A **compact, indented list line** for a deep folder
 * tree: a leading accent rail, a small glyph, the name, and a plain right-aligned
 * count — no pill, no fill, tight vertical rhythm. The `selected` state lights the
 * rail + bolds the primary label and reports `aria-current` (never color-alone).
 * Indents by `depth`. Same props as `FolderRow`. No literal colors.
 */
export const FolderRowV3 = React.forwardRef<HTMLButtonElement, FolderRowV3Props>(function FolderRowV3(
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
      style={{ paddingLeft: `calc(var(--xen-space-sm) + ${indent} * var(--xen-space-md))` }}
      className={cn(
        'flex w-full items-center gap-[var(--xen-space-sm)] py-[var(--xen-space-xs)] pr-[var(--xen-space-md)] text-left transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        selected ? 'bg-neutral-100' : 'bg-transparent hover:bg-neutral-100',
        className
      )}
    >
      {/* Leading accent rail marks the selected row (paired with bold label + aria-current). */}
      <span
        aria-hidden="true"
        className={cn(
          'inline-block w-0.5 shrink-0 self-stretch rounded-full',
          selected ? 'bg-primary' : 'bg-transparent'
        )}
      />
      {glyph ? <Icon glyph={glyph} size="sm" color={selected ? 'primary' : 'muted'} /> : null}
      <span
        className={cn(
          'min-w-0 flex-1 truncate text-sm',
          selected ? 'font-bold text-primary' : 'font-medium text-on-surface'
        )}
      >
        {name}
      </span>
      {count > 0 ? (
        <span className={cn('text-xs font-bold', selected ? 'text-primary' : 'text-muted')}>
          {count > 999 ? '999+' : String(count)}
        </span>
      ) : null}
    </button>
  );
});
