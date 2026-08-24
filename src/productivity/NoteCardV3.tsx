import * as React from 'react';
import { cn } from '../primitives/cn';
import type { NoteCardProps } from './NoteCard';

/** Same public contract as {@link NoteCard} — a drop-in alternate design. */
export type NoteCardV3Props = NoteCardProps;

/**
 * NoteCard, redesigned (v3): a **dense note line**. A pin dot (when pinned), the
 * title over a body-preview·timestamp subtitle, and labels folded in — a hairline
 * row for a notes list. The opposite of v2's sticky note. Same props, token-only.
 */
export const NoteCardV3 = React.forwardRef<HTMLDivElement, NoteCardV3Props>(function NoteCardV3(
  { title, body, timestamp, pinned = false, labels, onClick, className },
  ref
) {
  const interactive = typeof onClick === 'function';
  return (
    <div
      ref={ref}
      data-xen-note-card=""
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={title}
      onClick={interactive ? () => onClick?.() : undefined}
      onKeyDown={interactive ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick?.(); } } : undefined}
      className={cn('flex items-start gap-2.5 border-b border-border py-2.5', pinned && 'border-l-2 border-l-primary pl-2', interactive && 'cursor-pointer transition-colors hover:bg-neutral-50', className)}
    >
      {pinned ? <span className="text-xs" aria-label="Pinned">📌</span> : null}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-on-surface">{title}</p>
        {body ? <p className="truncate text-xs text-muted">{body}</p> : null}
        {labels ? <div className="mt-1 flex flex-wrap gap-1">{labels}</div> : null}
      </div>
      {timestamp ? <span className="shrink-0 text-xs text-muted">{timestamp}</span> : null}
    </div>
  );
});
