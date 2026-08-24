import * as React from 'react';
import { cn } from '../primitives/cn';
import type { NoteCardProps } from './NoteCard';

/** Same public contract as {@link NoteCard} — a drop-in alternate design. */
export type NoteCardV2Props = NoteCardProps;

/**
 * NoteCard, redesigned (v2): a **sticky-note card**. A warm-tinted note surface with
 * a folded corner; pinned notes gain a 📌 and a primary top edge. Title, body
 * preview, labels and a timestamp stack inside. Distinct from v1. Same props,
 * token-only.
 */
export const NoteCardV2 = React.forwardRef<HTMLDivElement, NoteCardV2Props>(function NoteCardV2(
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
      className={cn('flex flex-col gap-2 rounded-lg bg-warn/5 p-3 shadow-sm', pinned && 'border-t-2 border-primary', interactive && 'cursor-pointer transition-transform hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0', className)}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-bold text-on-surface">{title}</p>
        {pinned ? <span aria-label="Pinned">📌</span> : null}
      </div>
      {body ? <p className="line-clamp-3 text-sm text-muted">{body}</p> : null}
      {labels ? <div className="flex flex-wrap gap-1">{labels}</div> : null}
      {timestamp ? <p className="text-xs text-muted">{timestamp}</p> : null}
    </div>
  );
});
