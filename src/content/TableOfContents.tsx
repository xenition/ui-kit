import * as React from 'react';
import { cn } from '../primitives/cn';
import type { TocItem } from './types';

export interface TableOfContentsProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'onSelect' | 'title'> {
  /** The document headings, in reading order. */
  items: TocItem[];
  /** Id of the currently in-view heading (highlighted). */
  activeId?: string;
  /** Called with a heading id when clicked (scroll the reader to it). Domain callback — `Omit`s the DOM `onSelect`. */
  onSelect?: (id: string) => void;
  /** Optional heading above the list. Pass `null` to hide. */
  title?: string | null;
  /** Text shown when there are no headings. */
  emptyLabel?: string;
}

/** Per-nesting-level indent in px (guards against undefined `level`). */
function indentFor(level: number | undefined): number {
  const depth = Math.max(0, (level ?? 1) - 1);
  return depth * 16;
}

/**
 * An in-article table of contents — the jump-list of headings for a long read.
 * Web (React DOM) mirror of the native `TableOfContents`. Data-driven via
 * `items` (each a `{ id, label, level }` heading); indents by nesting `level`
 * and highlights the `activeId` in the accent color. Clicking a row fires
 * `onSelect(id)`. Renders an `emptyLabel` when there are no headings. All colors
 * from `--xen-*` token classes.
 */
export const TableOfContents = React.forwardRef<HTMLElement, TableOfContentsProps>(
  function TableOfContents(
    { items, activeId, onSelect, title = 'Contents', emptyLabel = 'No sections', className, ...rest },
    ref
  ) {
    return (
      <nav
        ref={ref}
        aria-label={typeof title === 'string' ? title : 'Contents'}
        className={cn(
          'flex flex-col gap-[var(--xen-space-xs)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-md)]',
          className
        )}
        {...rest}
      >
        {title != null ? (
          <p className="mb-[var(--xen-space-xs)] text-xs font-bold uppercase tracking-wide text-muted">
            {title}
          </p>
        ) : null}

        {items.length === 0 ? (
          <p className="text-sm text-muted">{emptyLabel}</p>
        ) : (
          items.map((item) => {
            const active = item.id === activeId;
            return (
              <button
                key={item.id}
                type="button"
                aria-current={active ? 'true' : undefined}
                disabled={!onSelect}
                onClick={onSelect ? () => onSelect(item.id) : undefined}
                style={{ paddingLeft: indentFor(item.level) }}
                className={cn(
                  'py-[var(--xen-space-xs)] text-left text-sm line-clamp-2',
                  active ? 'font-bold text-accent' : 'font-normal text-on-surface',
                  onSelect && 'cursor-pointer'
                )}
              >
                {item.label}
              </button>
            );
          })
        )}
      </nav>
    );
  }
);
