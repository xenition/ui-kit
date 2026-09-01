import * as React from 'react';
import { cn } from '../primitives/cn';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import { AttachmentBarV4 } from './AttachmentBarV4';
import type { MessageComposerProps } from './MessageComposer';

export interface MessageComposerV4Props extends MessageComposerProps {
  /** Copy on the two controls. */
  sendLabel?: string;
  attachLabel?: string;
  /**
   * How tall the field may grow before it scrolls. Default `5`.
   *
   * The base grew without bound, so a pasted paragraph pushed the send button
   * off the bottom of the screen with no way back to it.
   */
  maxLines?: number;
}

/**
 * **V4 message composer** — the web twin of the native `MessageComposerV4`,
 * same props as {@link MessageComposer} plus `sendLabel`, `attachLabel` and
 * `maxLines`.
 *
 * ## Four changes
 *
 * 1. **Send is dead on an empty message.** The base fired `onSend('')` on a
 *    blank field and on whitespace, so an app either sent an empty bubble or
 *    had to re-check the same condition at every call site.
 * 2. **The field stops growing.** See `maxLines`.
 * 3. **Both controls clear 44 and carry names.** They were bare glyphs.
 * 4. **Enter sends, Shift+Enter breaks the line** — the convention every chat
 *    client shares, which the base left to the caller.
 */
export const MessageComposerV4 = React.forwardRef<HTMLDivElement, MessageComposerV4Props>(
  function MessageComposerV4(
    {
      value = '',
      onChangeText,
      onSend,
      onAttach,
      attachments,
      onRemoveAttachment,
      placeholder = 'Message',
      disabled = false,
      sendLabel = 'Send',
      attachLabel = 'Add attachment',
      maxLines = 5,
      className,
      ...rest
    },
    ref
  ) {
    // Empty — or whitespace-only — is not a message. The base sent it anyway.
    const canSend = value.trim().length > 0 && !disabled;

    const send = () => {
      if (!canSend) return;
      onSend?.(value);
    };

    return (
      <div
        ref={ref}
        data-xen-composer=""
        className={cn('flex flex-col gap-xs border-t border-border bg-surface px-md py-sm', className)}
        {...rest}
      >
        <AttachmentBarV4 attachments={attachments ?? []} onRemove={onRemoveAttachment} />

        <div className="flex items-end gap-sm">
          {onAttach && (
            <button
              type="button"
              aria-label={attachLabel}
              disabled={disabled}
              onClick={onAttach}
              data-xen-v4-chrome="on-surface"
              className={cn(
                'inline-flex aspect-square shrink-0 items-center justify-center rounded-full text-lg text-muted-text disabled:opacity-[0.38]',
                MIN_TAP_CLASS
              )}
            >
              ＋
            </button>
          )}

          <textarea
            rows={1}
            value={value}
            disabled={disabled}
            placeholder={placeholder}
            aria-label={placeholder}
            onChange={(event) => onChangeText?.(event.target.value)}
            onKeyDown={(event) => {
              // Enter sends, Shift+Enter breaks the line.
              if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                send();
              }
            }}
            className={cn(
              'min-h-0 flex-1 resize-none rounded-[var(--xen-radius-lg)] border border-border bg-card px-md py-sm text-sm text-on-card',
              'placeholder:text-muted-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              'disabled:opacity-[0.38]',
              MIN_TAP_CLASS
            )}
            // Bounded growth: a pasted paragraph scrolls inside the field
            // rather than pushing send off the screen.
            style={{ maxHeight: `calc(${maxLines} * 1.5rem + var(--xen-space-md))` }}
          />

          <button
            type="button"
            aria-label={sendLabel}
            // Dead on an empty message, rather than sending one.
            disabled={!canSend}
            onClick={send}
            data-xen-v4-chrome="on-primary"
            className={cn(
              'inline-flex aspect-square shrink-0 items-center justify-center rounded-full bg-primary text-lg text-on-primary',
              'disabled:opacity-[0.38]',
              MIN_TAP_CLASS
            )}
          >
            ↑
          </button>
        </div>
      </div>
    );
  }
);
