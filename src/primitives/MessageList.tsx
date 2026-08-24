import * as React from 'react';
import { cn } from './cn';

export type MessageListProps = React.HTMLAttributes<HTMLDivElement>;

/** Scrollable vertical stack for ChatBubble children — the chat/thread viewport. */
export const MessageList = React.forwardRef<HTMLDivElement, MessageListProps>(function MessageList(
  { className, children, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn('flex flex-1 flex-col gap-3 overflow-y-auto p-4', className)}
      {...rest}
    >
      {children}
    </div>
  );
});
