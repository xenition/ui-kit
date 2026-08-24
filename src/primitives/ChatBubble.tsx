import * as React from 'react';
import { cn } from './cn';

export interface ChatBubbleProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 'me' aligns right with the primary fill; 'them' aligns left with a surface fill. */
  side?: 'me' | 'them';
  /** Optional author / timestamp shown above the bubble. */
  meta?: React.ReactNode;
}

/** A single themed chat message bubble — for chat, support threads, comments. */
export const ChatBubble = React.forwardRef<HTMLDivElement, ChatBubbleProps>(function ChatBubble(
  { className, side = 'them', meta, children, ...rest },
  ref
) {
  const me = side === 'me';
  return (
    <div
      ref={ref}
      className={cn('flex flex-col gap-1', me ? 'items-end' : 'items-start', className)}
      {...rest}
    >
      {meta != null && <span className="px-1 text-xs text-muted">{meta}</span>}
      <div
        className={cn(
          'max-w-[75%] rounded-[var(--xen-radius-lg)] px-3.5 py-2 text-sm',
          me ? 'bg-primary text-on-primary' : 'bg-neutral-100 text-on-surface'
        )}
      >
        {children}
      </div>
    </div>
  );
});
