import * as React from 'react';
import { Avatar } from '../primitives';
import { cn } from '../primitives/cn';
import type { RecruiterMessagePayload } from './types';
import { formatRelative } from './format';

export interface RecruiterMessageProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** The message to render. */
  message: RecruiterMessagePayload;
  /** Fired when the message is pressed (open thread). `onPress` → `onClick`. */
  onClick?: (message: RecruiterMessagePayload) => void;
  /** Fired when the reply affordance is pressed. */
  onReply?: (message: RecruiterMessagePayload) => void;
}

/**
 * An inbox row for a recruiter message: sender avatar, name + company, a
 * one-line preview, sent age, and an unread state. Unread is signalled by BOTH
 * a token dot and bold text (never color alone) and announced in the accessible
 * label. Data + callbacks only; tokens only.
 */
export const RecruiterMessage = React.forwardRef<HTMLDivElement, RecruiterMessageProps>(
  function RecruiterMessage({ message, onClick, onReply, className, ...rest }, ref) {
    const sent = formatRelative(message.sentAt);
    const unread = !!message.unread;
    const interactive = onClick != null;

    return (
      <div
        ref={ref}
        data-xen-recruiter-message=""
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        aria-label={`${unread ? 'Unread. ' : ''}Message from ${message.senderName}${
          message.company ? ` at ${message.company}` : ''
        }`}
        onClick={interactive ? () => onClick!(message) : undefined}
        onKeyDown={
          interactive
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onClick!(message);
                }
              }
            : undefined
        }
        className={cn(
          'flex items-start gap-md border-b border-border bg-surface px-md py-md',
          interactive && 'cursor-pointer transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
          className
        )}
        {...rest}
      >
        <div className="relative">
          <Avatar src={message.senderAvatarUrl} name={message.senderName} size="md" />
          {unread ? (
            <span
              aria-hidden="true"
              data-xen-unread-dot=""
              className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-surface bg-primary"
            />
          ) : null}
        </div>

        <div className="flex flex-1 flex-col gap-0.5">
          <div className="flex justify-between gap-sm">
            <span
              className={cn(
                'flex-1 truncate text-sm text-on-surface',
                unread ? 'font-bold' : 'font-semibold'
              )}
            >
              {message.senderName}
              {message.company ? (
                <span className="font-normal text-muted">{`  ·  ${message.company}`}</span>
              ) : null}
            </span>
            {sent ? <span className="text-xs text-muted">{sent}</span> : null}
          </div>

          <span
            className={cn(
              'line-clamp-2 text-sm',
              unread ? 'font-medium text-on-surface' : 'font-normal text-muted'
            )}
          >
            {message.preview}
          </span>

          {onReply ? (
            <button
              type="button"
              aria-label={`Reply to ${message.senderName}`}
              onClick={(e) => {
                e.stopPropagation();
                onReply(message);
              }}
              className="mt-xs self-start text-xs font-semibold text-primary"
            >
              Reply
            </button>
          ) : null}
        </div>
      </div>
    );
  }
);
