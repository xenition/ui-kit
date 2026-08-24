import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives';
import { AttachmentBar } from './AttachmentBar';
import type { MessageComposerProps } from './MessageComposer';

/** Drop-in alternate design for {@link MessageComposer} — identical props. */
export type MessageComposerV2Props = MessageComposerProps;

/**
 * MessageComposer — **pill + FAB** variant. The attach button and the growing
 * field share one fully-rounded, primary-tinted capsule; the send affordance is
 * a separate prominent circular **FAB** that floats to the right of the pill and
 * lifts on a drop shadow once there's something to send. A softer, more modern
 * silhouette than the v1 bordered box + inline send. Same props as
 * `MessageComposer`. No literal colors.
 */
export const MessageComposerV2 = React.forwardRef<HTMLDivElement, MessageComposerV2Props>(
  function MessageComposerV2(
    {
      value = '',
      onChangeText,
      onSend,
      onAttach,
      attachments,
      onRemoveAttachment,
      placeholder = 'Message',
      disabled = false,
      className,
      ...rest
    },
    ref
  ) {
    const hasAttachments = (attachments?.length ?? 0) > 0;
    const canSend = !disabled && (value.trim().length > 0 || hasAttachments);

    const submit = (): void => {
      if (!canSend) return;
      onSend?.(value);
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        submit();
      }
    };

    return (
      <div ref={ref} className={cn('bg-surface py-2', className)} {...rest}>
        {hasAttachments ? (
          <AttachmentBar attachments={attachments ?? []} onRemove={onRemoveAttachment} />
        ) : null}
        <div className="flex items-end gap-2 px-4">
          {/* The pill: attach + field share one fully-rounded, tinted capsule. */}
          <div
            className={cn(
              'flex flex-1 items-end gap-1 rounded-full border border-primary/10 bg-primary/5',
              'py-1 pl-2 pr-3',
              disabled && 'opacity-50'
            )}
          >
            <button
              type="button"
              aria-label="Add attachment"
              aria-disabled={disabled || undefined}
              disabled={disabled}
              onClick={onAttach}
              className="pb-2 disabled:pointer-events-none"
            >
              <Icon glyph="＋" color="primary" />
            </button>
            <textarea
              aria-label="Message input"
              rows={1}
              disabled={disabled}
              value={value}
              onChange={(e) => onChangeText?.(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder={placeholder}
              className={cn(
                'max-h-[120px] flex-1 resize-none bg-transparent py-1.5 text-base',
                'text-on-surface placeholder:text-muted focus:outline-none',
                'disabled:pointer-events-none'
              )}
            />
          </div>

          {/* The FAB: a distinct floating circular send button. */}
          <button
            type="button"
            aria-label="Send message"
            aria-disabled={!canSend}
            disabled={!canSend}
            onClick={submit}
            className={cn(
              'flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary',
              'transition hover:opacity-90 disabled:opacity-40',
              canSend && 'shadow-md hover:-translate-y-0.5',
              'motion-reduce:transition-none motion-reduce:hover:transform-none',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300'
            )}
          >
            <Icon glyph="➤" color="onPrimary" size="lg" />
          </button>
        </div>
      </div>
    );
  }
);
