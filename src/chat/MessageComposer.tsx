import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives';
import { AttachmentBar, type StagedAttachment } from './AttachmentBar';

export interface MessageComposerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Controlled draft text. */
  value?: string;
  /** Fired on every keystroke with the new text. */
  onChangeText?: (text: string) => void;
  /**
   * Fired when the send affordance is clicked (or Enter submits). Receives the
   * current draft text; the parent is expected to clear `value`.
   */
  onSend?: (text: string) => void;
  /** Fired when the attach (plus) button is clicked. */
  onAttach?: () => void;
  /** Staged attachments to preview above the input. */
  attachments?: StagedAttachment[];
  /** Remove a staged attachment by id. */
  onRemoveAttachment?: (id: string) => void;
  /** Placeholder text (default "Message"). */
  placeholder?: string;
  /** Disable input + actions. */
  disabled?: boolean;
}

/**
 * Message input bar — an attach button, a growing multiline field, and a send
 * button that is disabled until there's something to send (text or a staged
 * attachment). Staged attachments preview above via `AttachmentBar`. Controlled
 * via `value`/`onChangeText`; emits `onSend`/`onAttach`. Enter sends (Shift+Enter
 * inserts a newline). No literal colors.
 */
export const MessageComposer = React.forwardRef<HTMLDivElement, MessageComposerProps>(
  function MessageComposer(
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
      <div
        ref={ref}
        className={cn('border-t border-border bg-surface py-2', className)}
        {...rest}
      >
        {hasAttachments ? (
          <AttachmentBar attachments={attachments ?? []} onRemove={onRemoveAttachment} />
        ) : null}
        <div className="flex items-end gap-2 px-4">
          <button
            type="button"
            aria-label="Add attachment"
            aria-disabled={disabled || undefined}
            disabled={disabled}
            onClick={onAttach}
            className="pb-2 disabled:opacity-50"
          >
            <Icon glyph="＋" color="muted" />
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
              'max-h-[120px] flex-1 resize-none bg-surface text-on-surface placeholder:text-muted',
              'rounded-[var(--xen-radius-lg)] border border-border px-3 py-2 text-base',
              'focus:outline-none focus:ring-1 focus:ring-primary',
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
              'flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary',
              'transition-opacity hover:opacity-85 disabled:opacity-40',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300'
            )}
          >
            <Icon glyph="➤" color="onPrimary" />
          </button>
        </div>
      </div>
    );
  }
);
