import * as React from 'react';
import { cn } from '../primitives/cn';

export interface QuickReply {
  /** Stable identifier passed back to `onSelect`. */
  id: string;
  /** Chip label. */
  label: string;
}

export interface QuickRepliesProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /** Suggested replies to render as tappable chips. */
  replies: QuickReply[];
  /** Called with the reply id when a chip is clicked. */
  onSelect?: (id: string) => void;
}

/**
 * Horizontal strip of suggested-reply chips (smart replies / canned responses).
 * Scrolls horizontally when the suggestions overflow. Each chip is a button.
 * Renders nothing when `replies` is empty. No literal colors.
 */
export const QuickReplies = React.forwardRef<HTMLDivElement, QuickRepliesProps>(
  function QuickReplies({ replies, onSelect, className, ...rest }, ref) {
    if (replies.length === 0) return null;
    return (
      <div
        ref={ref}
        aria-label="Suggested replies"
        className={cn('flex gap-2 overflow-x-auto px-4', className)}
        {...rest}
      >
        {replies.map((reply) => (
          <button
            key={reply.id}
            type="button"
            aria-label={reply.label}
            onClick={() => onSelect?.(reply.id)}
            className={cn(
              'shrink-0 whitespace-nowrap rounded-full border border-primary bg-surface px-3 py-1',
              'text-sm font-medium text-primary transition-colors hover:bg-primary-50',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300'
            )}
          >
            {reply.label}
          </button>
        ))}
      </div>
    );
  }
);
