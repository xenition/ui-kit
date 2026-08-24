import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar } from '../primitives';
import { ReadReceipt } from './ReadReceipt';
import type { MessageGroupProps } from './MessageGroup';

/** Drop-in alternate design for {@link MessageGroup} — identical props. */
export type MessageGroupV3Props = MessageGroupProps;

/**
 * MessageGroup — **flat channel row** variant (Slack feel). No bubbles and no
 * side-alignment: every group is a left-aligned block with the avatar in a
 * gutter, a bold sender name + time header, and the messages as plain flat text
 * lines. A thin vertical **sender rule** runs down the left edge — primary for
 * your own messages, a hairline border for others — so authorship reads without
 * color-filled bubbles. Same props as `MessageGroup`. No literal colors.
 */
export const MessageGroupV3 = React.forwardRef<HTMLDivElement, MessageGroupV3Props>(
  function MessageGroupV3(
    { side = 'them', messages, authorName, avatarUri, showAvatar, receipt, className, ...rest },
    ref
  ) {
    const me = side === 'me';
    const withAvatar = showAvatar ?? true;
    const lastIndex = messages.length - 1;
    const displayName = authorName ?? (me ? 'You' : undefined);
    const lastTime = messages[lastIndex]?.time;

    return (
      <div
        ref={ref}
        aria-live={me ? 'off' : 'polite'}
        className={cn(
          'flex items-start gap-2 border-l-2 py-1 pl-2',
          me ? 'border-l-primary' : 'border-l-border',
          className
        )}
        {...rest}
      >
        {withAvatar ? <Avatar size="sm" src={avatarUri} name={displayName} /> : null}

        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="flex items-baseline gap-2">
            {displayName ? (
              <span className={cn('text-sm font-bold', me ? 'text-primary' : 'text-on-surface')}>
                {displayName}
              </span>
            ) : null}
            {lastTime ? <span className="text-xs text-muted">{lastTime}</span> : null}
          </span>

          {messages.map((msg) => (
            <p key={msg.id} className="whitespace-pre-wrap break-words text-base leading-snug text-on-surface">
              {msg.text}
            </p>
          ))}

          {me && receipt ? <ReadReceipt status={receipt} /> : null}
        </div>
      </div>
    );
  }
);
