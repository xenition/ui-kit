import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives';
import { AttachmentBar } from './AttachmentBar';
import type { MessageComposerProps } from './MessageComposer';

/** Drop-in alternate design for {@link MessageComposer} — identical props. */
export type MessageComposerV3Props = MessageComposerProps;

/**
 * MessageComposer — **flat toolbar** variant. No pill and no circular button: a
 * borderless field flanked by a flat inline attach button on the left and a
 * plain **"Send"** text button on the right that lights up in the primary token
 * once there's something to send. The utilitarian, desktop-messenger
 * counterpart to the v1 bordered box and the v2 pill+FAB. Same props as
 * `MessageComposer`. Enter sends (Shift+Enter inserts a newline). No literal
 * colors.
 */
export const MessageComposerV3 = React.forwardRef<HTMLDivElement, MessageComposerV3Props>(
  function MessageComposerV3(
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
      <div ref={ref} className={cn('border-t border-border bg-surface py-1', className)} {...rest}>
        {hasAttachments ? (
          <AttachmentBar attachments={attachments ?? []} onRemove={onRemoveAttachment} />
        ) : null}
        <div className="flex items-center gap-1 px-2">
          <button
            type="button"
            aria-label="Add attachment"
            aria-disabled={disabled || undefined}
            disabled={disabled}
            onClick={onAttach}
            className="p-1 disabled:pointer-events-none disabled:opacity-50"
          >
            <Icon glyph="＋" color="muted" size="lg" />
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
              'max-h-[120px] flex-1 resize-none border-0 bg-transparent px-1 py-2 text-base',
              'text-on-surface placeholder:text-muted focus:outline-none focus:ring-0',
              'disabled:pointer-events-none disabled:opacity-50'
            )}
          />

          <button
            type="button"
            aria-label="Send message"
            aria-disabled={!canSend}
            disabled={!canSend}
            onClick={submit}
            className={cn(
              'shrink-0 px-2 py-1 text-base font-bold transition-opacity',
              canSend ? 'text-primary hover:opacity-70' : 'text-muted opacity-40'
            )}
          >
            Send
          </button>
        </div>
      </div>
    );
  }
);
