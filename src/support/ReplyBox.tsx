import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button } from '../primitives';

/** A saved reply the agent can drop into the composer with one tap. */
export interface CannedReply {
  /** Stable identifier, reported to `onPickCanned`. */
  id: string;
  /** Short chip label (e.g. "Greeting", "Refund policy"). */
  label: string;
  /** Full reply text this chip represents (for the consumer to insert). */
  body: string;
}

export interface ReplyBoxProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Controlled composer text. */
  value: string;
  /** Fires with the next text on every keystroke (controlled). */
  onChangeText: (text: string) => void;
  /** Web alias for `onChangeText`, wired to the native `<textarea onChange>`. */
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  /** Fires when the agent submits the reply (Send button or ⌘/Ctrl+Enter). */
  onSend?: () => void;
  /** Placeholder shown while empty. Defaults to "Write a reply…". */
  placeholder?: string;
  /** In-flight state — shows a busy Send and blocks submits. */
  sending?: boolean;
  /** Disable the whole composer (input + Send + chips). */
  disabled?: boolean;
  /** Optional quick-pick chips shown above the input. */
  cannedReplies?: readonly CannedReply[];
  /** Fires with the picked chip's `id` when a canned reply is tapped. */
  onPickCanned?: (id: string) => void;
  /** Label for the Send button. Defaults to "Send". */
  sendLabel?: string;
}

/**
 * ReplyBox — **V4** "calm console" agent reply composer. A controlled,
 * rounded composer: an optional row of soft-primary quick-pick chips (canned
 * replies) above a multiline input, with a single primary **Send** button
 * (≥44px tap target) that disables when empty or sending. One accent = primary.
 * ⌘/Ctrl+Enter submits. Fully controlled — `value` in, `onChangeText`/`onChange`
 * + `onSend` out; nothing fetches. All colors from `--xen-*` token classes
 * (no literal hex). Dark-mode safe.
 */
export const ReplyBox = React.forwardRef<HTMLDivElement, ReplyBoxProps>(function ReplyBox(
  {
    value,
    onChangeText,
    onChange,
    onSend,
    placeholder = 'Write a reply…',
    sending = false,
    disabled = false,
    cannedReplies,
    onPickCanned,
    sendLabel = 'Send',
    className,
    ...rest
  },
  ref
) {
  const canSend = !disabled && !sending && value.trim().length > 0 && typeof onSend === 'function';

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    onChange?.(event);
    onChangeText(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if ((event.metaKey || event.ctrlKey) && event.key === 'Enter' && canSend) {
      event.preventDefault();
      onSend!();
    }
  };

  const hasChips = Array.isArray(cannedReplies) && cannedReplies.length > 0;

  return (
    <div
      ref={ref}
      className={cn(
        'flex flex-col gap-2 rounded-[var(--xen-radius-lg)] border border-border bg-surface p-3 shadow-sm',
        className
      )}
      {...rest}
    >
      {hasChips ? (
        <div role="group" aria-label="Quick replies" className="flex flex-wrap gap-2">
          {cannedReplies!.map((reply) => (
            <button
              key={reply.id}
              type="button"
              disabled={disabled || sending}
              onClick={onPickCanned ? () => onPickCanned(reply.id) : undefined}
              aria-label={`Insert quick reply: ${reply.label}`}
              className={cn(
                'inline-flex min-h-[32px] items-center rounded-full bg-primary/10 px-3 text-xs font-bold text-primary',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
                disabled || sending ? 'cursor-not-allowed opacity-50' : 'hover:opacity-90'
              )}
            >
              {reply.label}
            </button>
          ))}
        </div>
      ) : null}

      <div className="flex items-end gap-2">
        <textarea
          aria-label="Write a reply"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={disabled || sending}
          placeholder={placeholder}
          rows={2}
          className={cn(
            'min-h-[44px] flex-1 resize-y rounded-[var(--xen-radius-md)] border border-border bg-surface px-3 py-2 text-sm text-on-surface',
            'placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
            'disabled:opacity-50'
          )}
        />
        <Button
          type="button"
          variant="primary"
          size="md"
          aria-label={sendLabel}
          disabled={!canSend}
          onClick={canSend ? () => onSend!() : undefined}
          className="min-h-[44px] font-bold"
        >
          {sending ? 'Sending…' : sendLabel}
        </Button>
      </div>
    </div>
  );
});
