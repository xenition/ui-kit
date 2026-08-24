import * as React from 'react';
import { cn } from '../primitives/cn';
import { activate, toneTextClass, ACTIVITY_META, type ActivityKind } from './internal';

export interface ActivityLogRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Activity type — drives the leading glyph badge (call/email/…). */
  kind: ActivityKind;
  /** One-line summary of what happened. */
  title: string;
  /** Optional detail / note snippet. */
  detail?: string;
  /** Who performed it. */
  actor?: string;
  /** Pre-formatted timestamp (e.g. "2h ago", "Mar 4"). */
  timestamp?: string;
  /** Marks the activity as pending/incomplete (dims the row). */
  pending?: boolean;
  /** Click handler (renders as a keyboard-accessible button). */
  onClick?: () => void;
}

/**
 * One entry in an activity feed. A tinted round badge carries the activity
 * **kind** as a glyph (📞 call, ✉ email, 👥 meeting, 📝 note, ✔ task, 💰 deal)
 * paired with a `kind`-derived tone — meaning is never color-only because the
 * glyph and the accessible label both name the kind. Optional actor + timestamp
 * meta line. The badge uses `bg-neutral-100` with the tone-colored glyph — token
 * classes only. When `onClick` is set the row is a `role="button"` div.
 */
export const ActivityLogRow = React.forwardRef<HTMLDivElement, ActivityLogRowProps>(function ActivityLogRow(
  { kind, title, detail, actor, timestamp, pending = false, onClick, className, ...rest },
  ref
) {
  const meta = ACTIVITY_META[kind];
  const metaLine = [actor, timestamp].filter(Boolean).join(' · ');
  const interactive = onClick ? activate(onClick) : {};

  return (
    <div
      ref={ref}
      aria-label={`${meta.label}: ${title}`}
      className={cn(
        'flex items-start gap-[var(--xen-space-sm)] py-[var(--xen-space-sm)]',
        pending && 'opacity-60',
        onClick && 'cursor-pointer rounded-[var(--xen-radius-md)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        className
      )}
      {...interactive}
      {...rest}
    >
      <span
        aria-hidden="true"
        className={cn('flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-sm', toneTextClass(meta.tone))}
      >
        {meta.glyph}
      </span>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-on-surface">{title}</p>
        {detail ? <p className="text-xs text-muted">{detail}</p> : null}
        {metaLine ? <p className="text-xs font-medium text-muted">{metaLine}</p> : null}
      </div>
    </div>
  );
});
