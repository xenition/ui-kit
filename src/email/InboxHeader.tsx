import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives';

export interface InboxHeaderAction {
  id: string;
  /** Glyph rendered in the click target. */
  glyph: string;
  /** Accessible label. */
  label: string;
  onClick?: () => void;
}

export interface InboxHeaderProps {
  /** Mailbox / folder title (e.g. "Inbox"). */
  title: string;
  /** Unread count shown next to the title. */
  unreadCount?: number;
  /** Back affordance (a real `<button>`); shown when provided. */
  onBack?: () => void;
  /** Trailing action buttons (search, compose, refresh…). */
  actions?: InboxHeaderAction[];
  /** Syncing state → shows a "Syncing…" caption under the title. */
  syncing?: boolean;
  className?: string;
}

/**
 * Top bar for an inbox / mailbox screen — optional back button, the folder
 * title with an unread count, an optional "Syncing…" caption, and a row of
 * trailing icon actions (each a real `<button>`). Rendered as a semantic
 * `<header>` with token-bound surface/border. Data + callbacks only. No literal
 * colors.
 */
export const InboxHeader = React.forwardRef<HTMLElement, InboxHeaderProps>(function InboxHeader(
  { title, unreadCount = 0, onBack, actions, syncing = false, className },
  ref
) {
  const safeActions = actions ?? [];
  return (
    <header
      ref={ref}
      className={cn(
        'flex items-center gap-[var(--xen-space-sm)] border-b border-border bg-surface px-[var(--xen-space-md)] py-[var(--xen-space-sm)]',
        className
      )}
    >
      {onBack ? (
        <button
          type="button"
          aria-label="Back"
          onClick={onBack}
          className="inline-flex shrink-0 items-center p-[var(--xen-space-xs)] transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <Icon glyph="‹" size="2xl" color="onSurface" />
        </button>
      ) : null}

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-[var(--xen-space-xs)]">
          <h1 className="truncate text-xl font-bold text-on-surface">{title}</h1>
          {unreadCount > 0 ? (
            <span className="text-base font-semibold text-muted">
              {unreadCount > 999 ? '999+' : String(unreadCount)}
            </span>
          ) : null}
        </div>
        {syncing ? <p className="text-xs text-muted">Syncing…</p> : null}
      </div>

      <div className="flex items-center gap-[var(--xen-space-xs)]">
        {safeActions.map((a) => (
          <button
            key={a.id}
            type="button"
            aria-label={a.label}
            onClick={a.onClick}
            className="inline-flex items-center p-[var(--xen-space-xs)] transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <Icon glyph={a.glyph} size="xl" color="onSurface" />
          </button>
        ))}
      </div>
    </header>
  );
});
