import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon, Textarea } from '../primitives';
import { AttachmentChip, type AttachmentKind } from './AttachmentChip';

export interface ComposeStagedAttachment {
  id: string;
  name: string;
  kind?: AttachmentKind;
  size?: string;
}

export interface ComposeBarProps {
  /** Controlled recipient string. When provided, a "To" field is shown. */
  to?: string;
  onChangeTo?: (text: string) => void;
  /** Controlled subject. When provided, a "Subject" field is shown. */
  subject?: string;
  onChangeSubject?: (text: string) => void;
  /** Controlled body text. */
  body?: string;
  onChangeBody?: (text: string) => void;
  /**
   * Fired when send is clicked. Receives the assembled draft; the parent clears
   * the fields.
   */
  onSend?: (draft: { to?: string; subject?: string; body: string }) => void;
  /** Attach button handler. */
  onAttach?: () => void;
  /** Staged attachments previewed above the body. */
  attachments?: ComposeStagedAttachment[];
  /** Remove a staged attachment by id. */
  onRemoveAttachment?: (id: string) => void;
  /** Body placeholder. Default "Write a message". */
  placeholder?: string;
  /** Sending in flight → send button shows a busy state and is blocked. */
  sending?: boolean;
  /** Disable the whole bar. */
  disabled?: boolean;
  className?: string;
}

/**
 * A mail compose surface — optional "To"/"Subject" fields (shown only when
 * their controlled value is supplied), a growing body `Textarea`, staged
 * attachment chips, an attach button, and a send button that stays disabled
 * until there's something to send (body text or an attachment) and while
 * `sending`. Every interactive element is a real `<button>`/field. Controlled;
 * emits an assembled `{ to, subject, body }` on send. No literal colors.
 */
export const ComposeBar = React.forwardRef<HTMLDivElement, ComposeBarProps>(function ComposeBar(
  {
    to,
    onChangeTo,
    subject,
    onChangeSubject,
    body = '',
    onChangeBody,
    onSend,
    onAttach,
    attachments,
    onRemoveAttachment,
    placeholder = 'Write a message',
    sending = false,
    disabled = false,
    className,
  },
  ref
) {
  const staged = attachments ?? [];
  const hasAttachments = staged.length > 0;
  const canSend = !disabled && !sending && (body.trim().length > 0 || hasAttachments);

  const submit = (): void => {
    if (!canSend) return;
    onSend?.({ to, subject, body });
  };

  const fieldClass =
    'w-full border-b border-border bg-surface px-[var(--xen-space-md)] py-[var(--xen-space-sm)] text-base text-on-surface placeholder:text-muted focus:outline-none disabled:opacity-50';

  return (
    <div
      ref={ref}
      className={cn('border-t border-border bg-surface pb-[var(--xen-space-sm)]', className)}
    >
      {to !== undefined ? (
        <input
          aria-label="To"
          type="email"
          autoCapitalize="none"
          disabled={disabled}
          value={to}
          onChange={(e) => onChangeTo?.(e.target.value)}
          placeholder="To"
          className={fieldClass}
        />
      ) : null}
      {subject !== undefined ? (
        <input
          aria-label="Subject"
          disabled={disabled}
          value={subject}
          onChange={(e) => onChangeSubject?.(e.target.value)}
          placeholder="Subject"
          className={fieldClass}
        />
      ) : null}

      {hasAttachments ? (
        <div className="flex flex-wrap gap-[var(--xen-space-xs)] p-[var(--xen-space-sm)]">
          {staged.map((a) => (
            <AttachmentChip
              key={a.id}
              name={a.name}
              kind={a.kind ?? 'file'}
              size={a.size}
              onRemove={onRemoveAttachment ? () => onRemoveAttachment(a.id) : undefined}
            />
          ))}
        </div>
      ) : null}

      <div className="flex items-end gap-[var(--xen-space-sm)] px-[var(--xen-space-md)] pt-[var(--xen-space-sm)]">
        <button
          type="button"
          aria-label="Attach file"
          disabled={disabled}
          onClick={onAttach}
          className="inline-flex shrink-0 items-center pb-[var(--xen-space-sm)] transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50"
        >
          <Icon glyph="📎" color="muted" />
        </button>
        <Textarea
          aria-label="Message body"
          rows={1}
          disabled={disabled}
          value={body}
          onChange={(e) => onChangeBody?.(e.target.value)}
          placeholder={placeholder}
          className="max-h-[140px] flex-1 rounded-[var(--xen-radius-lg)]"
        />
        <button
          type="button"
          aria-label="Send email"
          aria-busy={sending || undefined}
          disabled={!canSend}
          onClick={submit}
          className={cn(
            'inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary transition-opacity',
            'hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
            'disabled:pointer-events-none disabled:opacity-40'
          )}
        >
          <Icon glyph={sending ? '…' : '➤'} color="onPrimary" />
        </button>
      </div>
    </div>
  );
});
