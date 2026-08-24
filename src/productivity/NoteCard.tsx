import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card } from '../primitives';

export interface NoteCardProps {
  /** Note title / heading. */
  title: string;
  /** Body preview text (clamped to a few lines). */
  body?: string;
  /** Pre-formatted timestamp (e.g. `'2h ago'`). */
  timestamp?: string;
  /** Shows a pin marker and a primary accent edge. */
  pinned?: boolean;
  /** Optional trailing slot — e.g. a row of {@link LabelChip}s. */
  labels?: React.ReactNode;
  /** Fires when the card is clicked. */
  onClick?: () => void;
  className?: string;
}

/**
 * A note preview built on the primitive {@link Card}: title, a clamped body,
 * a footer timestamp, an optional pin marker (primary), and a labels slot. When
 * `pinned`, a left accent edge in the primary token highlights it. Web parity of
 * the native `NoteCard` (`onPress` → `onClick`). No literal colors.
 */
export const NoteCard = React.forwardRef<HTMLDivElement, NoteCardProps>(function NoteCard(
  { title, body, timestamp, pinned = false, labels, onClick, className },
  ref
) {
  const inner = (
    <Card
      className={cn(
        'flex flex-col gap-2 border-l',
        pinned ? 'border-l-[3px] border-l-primary' : 'border-l-border'
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

      {body ? <span className="line-clamp-3 text-sm text-muted">{body}</span> : null}

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
