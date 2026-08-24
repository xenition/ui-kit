import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar } from '../primitives';
import { ReadReceipt } from './ReadReceipt';
import type { MessageGroupProps } from './MessageGroup';

/** Drop-in alternate design for {@link MessageGroup} — identical props. */
export type MessageGroupV2Props = MessageGroupProps;

/**
 * MessageGroup — **tailed bubbles** variant (iMessage feel). Rather than the v1
 * stack of uniform rounded `ChatBubble`s, this draws its own bubbles where the
 * *last* bubble in the run grows a directional tail (a squared-off bottom
 * corner) toward the author's side, and the group's avatar sits inline beside
 * the run. Outgoing bubbles use the primary fill; incoming use a bordered
 * surface fill. Same props as `MessageGroup`. No literal colors.
 */
export const MessageGroupV2 = React.forwardRef<HTMLDivElement, MessageGroupV2Props>(
  function MessageGroupV2(
    { side = 'them', messages, authorName, avatarUri, showAvatar, receipt, className, ...rest },
    ref
  ) {
    const me = side === 'me';
    const withAvatar = showAvatar ?? !me;
    const lastIndex = messages.length - 1;

    return (
      <div
        ref={ref}
        aria-live={me ? 'off' : 'polite'}
        className={cn('flex items-end gap-2', me ? 'justify-end' : 'justify-start', className)}
        {...rest}
      >
        {withAvatar && !me ? <Avatar size="sm" src={avatarUri} name={authorName} /> : null}

        <div className={cn('flex min-w-0 max-w-[78%] flex-col gap-1', me ? 'items-end' : 'items-start')}>
          {authorName && !me ? (
            <span className="ml-2 text-xs font-bold text-accent">{authorName}</span>
          ) : null}

          {messages.map((msg, i) => {
            const isLast = i === lastIndex;
            // The tail is a single squared-off bottom corner on the last bubble,
            // pointing toward the speaker's edge — the iMessage silhouette.
            return (
              <div
                key={msg.id}
                className={cn(
                  'rounded-lg px-4 py-2',
                  me ? 'bg-primary text-on-primary' : 'border border-border bg-surface text-on-surface',
                  isLast && (me ? 'rounded-br-sm' : 'rounded-bl-sm')
                )}
              >
                <span className="block whitespace-pre-wrap break-words text-base">{msg.text}</span>
                {isLast && msg.time ? (
                  <span
                    className={cn(
                      'mt-0.5 block text-right text-xs',
                      me ? 'text-on-primary opacity-80' : 'text-muted'
                    )}
                  >
                    {msg.time}
                  </span>
                ) : null}
              </div>
            );
          })}

          {me && receipt ? <ReadReceipt status={receipt} /> : null}
        </div>
      </div>
    );
  }
);
