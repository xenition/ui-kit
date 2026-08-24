import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives';
import { AttachmentChip } from './AttachmentChip';
import type { ComposeBarProps } from './ComposeBar';

/** Same public contract as {@link ComposeBar} — a drop-in alternate design. */
export type ComposeBarV2Props = ComposeBarProps;

/**
 * ComposeBar — design **V2**. A **rounded pill** carries the attach button and a
 * growing body field, paired with a **floating circular send button** that lifts
 * on a soft shadow and press-scales on tap. Optional To/Subject fields appear
 * only when their controlled value is supplied. Send stays disabled until there
 * is a body or an attachment (and while `sending`). Same props as `ComposeBar`.
 * No literal colors.
 */
export const ComposeBarV2 = React.forwardRef<HTMLDivElement, ComposeBarV2Props>(function ComposeBarV2(
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
      className={cn('bg-surface pb-[var(--xen-space-md)] pt-[var(--xen-space-sm)]', className)}
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
        {/* The rounded pill: attach + growing body. */}
        <div className="flex min-w-0 flex-1 items-end gap-[var(--xen-space-xs)] rounded-full border border-border bg-surface pl-[var(--xen-space-sm)] pr-[var(--xen-space-md)]">
          <button
            type="button"
            aria-label="Attach file"
            disabled={disabled}
            onClick={onAttach}
            className="inline-flex shrink-0 items-center py-[var(--xen-space-sm)] transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50"
          >
            <Icon glyph="📎" color="muted" />
          </button>
          <textarea
            aria-label="Message body"
            rows={1}
            disabled={disabled}
            value={body}
            onChange={(e) => onChangeBody?.(e.target.value)}
            placeholder={placeholder}
            className="max-h-[140px] min-w-0 flex-1 resize-none bg-transparent py-[var(--xen-space-sm)] text-base text-on-surface placeholder:text-muted focus:outline-none disabled:opacity-50"
          />
        </div>

        {/* Floating circular send button. */}
        <button
          type="button"
          aria-label="Send email"
          aria-busy={sending || undefined}
          disabled={!canSend}
          onClick={submit}
          className={cn(
            'inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary shadow-md transition duration-200',
            'hover:-translate-y-0.5 hover:shadow-lg active:scale-[.96]',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
            'disabled:pointer-events-none disabled:opacity-40 disabled:shadow-none',
            'motion-reduce:transition-none motion-reduce:hover:transform-none'
          )}
        >
          <Icon glyph={sending ? '…' : '➤'} color="onPrimary" size="lg" />
        </button>
      </div>
    </div>
  );
});
