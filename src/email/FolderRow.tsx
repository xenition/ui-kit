import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives';

export interface FolderRowProps {
  /** Folder / mailbox name (e.g. "Inbox", "Sent"). */
  name: string;
  /** Leading glyph (emoji / symbol). */
  glyph?: string;
  /** Unread / item count; > 0 renders a trailing count. */
  count?: number;
  /** Selected/active folder — tinted background + accent text. */
  selected?: boolean;
  /** Nesting depth for sub-folders (indents the row). */
  depth?: number;
  /** Open the folder. */
  onClick?: () => void;
  className?: string;
}

/**
 * A navigation row for a mailbox / folder in the mail sidebar — leading glyph,
 * name, and an optional unread count. A real `<button>`. The `selected` state
 * tints the row with a token-derived primary wash and colors the label with the
 * primary slot, and reports `aria-current` so it isn't signalled by color
 * alone. Indents by `depth` for nested folders. No literal colors.
 */
export const FolderRow = React.forwardRef<HTMLButtonElement, FolderRowProps>(function FolderRow(
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
      style={{ paddingLeft: `calc(var(--xen-space-md) + ${indent} * var(--xen-space-lg))` }}
      className={cn(
        'flex w-full items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-md)] py-[var(--xen-space-sm)] pr-[var(--xen-space-md)] text-left transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        selected ? 'bg-primary-50' : 'bg-transparent hover:bg-neutral-100',
        className
      )}
    >
      {glyph ? <Icon glyph={glyph} size="base" color={selected ? 'primary' : 'muted'} /> : null}
      <span
        className={cn(
          'min-w-0 flex-1 truncate text-base',
          selected ? 'font-bold text-primary' : 'font-medium text-on-surface'
        )}
      >
        {name}
      </span>
      {count > 0 ? (
        <span
          className={cn(
            'inline-flex min-w-[22px] items-center justify-center rounded-full px-[var(--xen-space-xs)] py-px text-xs font-bold',
            selected ? 'bg-primary text-on-primary' : 'bg-neutral-100 text-muted'
          )}
        >
          {count > 999 ? '999+' : String(count)}
        </span>
      ) : null}
    </button>
  );
});
