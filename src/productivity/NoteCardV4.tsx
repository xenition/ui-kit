import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card } from '../primitives';
import type { NoteCardProps } from './NoteCard';

/** Drop-in for {@link NoteCardProps} — same props, the V4 "flow" design. */
export type NoteCardV4Props = NoteCardProps;

/**
 * NoteCard — **V4** "flow" design (web parity of the native V4). The
 * focused-workspace take on a sticky note: a clean, softly-elevated
 * {@link Card} with a legible title and a clamped body preview. When
 * `pinned`, a soft **primary** wash + a left accent edge lift the note and a
 * pin marker appears. One primary accent, generous whitespace. Same
 * props/behavior as {@link NoteCardProps}; all colors from `--xen-*` token
 * classes (no literals).
 */
export const NoteCardV4 = React.forwardRef<HTMLDivElement, NoteCardV4Props>(function NoteCardV4(
  { title, body, timestamp, pinned = false, labels, onClick, className },
  ref
) {
  const inner = (
    <Card
      className={cn(
        'flex flex-col gap-2 rounded-[var(--xen-radius-lg)] border-l shadow-sm transition-colors',
        pinned ? 'border-l-[3px] border-l-primary bg-primary/[0.06]' : 'border-l-border bg-surface'
      )}
    >
      <div className="flex items-center gap-1">
        {pinned ? (
          <span aria-label="Pinned" className="text-sm text-primary">
            📌
          </span>
        ) : null}
        <span className="line-clamp-1 flex-1 text-base font-bold text-on-surface">{title}</span>
      </div>

      {body ? <span className="line-clamp-3 text-sm leading-relaxed text-muted">{body}</span> : null}

      {labels ? <div className="flex flex-wrap gap-1">{labels}</div> : null}

      {timestamp ? <span className="text-xs text-muted">{timestamp}</span> : null}
    </Card>
  );

  if (onClick) {
    return (
      <button
        ref={ref as unknown as React.Ref<HTMLButtonElement>}
        type="button"
        aria-label={title}
        onClick={onClick}
        className={cn('block w-full text-left transition-opacity hover:opacity-90', className)}
      >
        {inner}
      </button>
    );
  }
  return (
    <div ref={ref} className={className}>
      {inner}
    </div>
  );
});
