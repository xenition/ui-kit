import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar } from '../primitives';

export interface ListRowProps {
  title: string;
  /** Secondary line under the title. */
  meta?: string;
  /** Optional avatar image URL; when omitted, initials from `title` are shown. */
  avatarUrl?: string;
  /** Set false to omit the avatar entirely (plain text row). */
  showAvatar?: boolean;
  /** Custom leading slot; overrides the avatar. */
  leading?: React.ReactNode;
  /** Trailing slot: value text, badge, chevron, control, … */
  action?: React.ReactNode;
  /** When set, the row renders as a button. */
  onClick?: () => void;
  className?: string;
}

/**
 * A generic list row: leading avatar/slot, title + meta, and a trailing action
 * slot. The workhorse row for lists of people, files, items, etc. Renders as a
 * `<button>` when `onClick` is provided. Token-only.
 */
export const ListRow = React.forwardRef<HTMLElement, ListRowProps>(function ListRow(
  { title, meta, avatarUrl, showAvatar = true, leading, action, onClick, className },
  ref
) {
  const inner = (
    <>
      {leading ?? (showAvatar ? <Avatar src={avatarUrl} name={title} size="md" /> : null)}
      <span className="flex min-w-0 flex-1 flex-col gap-0.5 text-left">
        <span className="truncate text-base font-semibold text-on-surface">{title}</span>
        {meta ? <span className="truncate text-sm text-muted">{meta}</span> : null}
      </span>
      {action ? <span className="shrink-0">{action}</span> : null}
    </>
  );

  const classes = cn('flex min-h-[56px] w-full items-center gap-md px-md py-sm', className);

  if (!onClick) {
    return (
      <div ref={ref as React.Ref<HTMLDivElement>} aria-label={title} className={classes}>
        {inner}
      </div>
    );
  }
  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type="button"
      aria-label={title}
      onClick={onClick}
      className={cn(classes, 'text-left transition-colors hover:bg-neutral-100')}
    >
      {inner}
    </button>
  );
});
