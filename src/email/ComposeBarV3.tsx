import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives';
import { AttachmentChip } from './AttachmentChip';
import type { ComposeBarProps } from './ComposeBar';

/** Same public contract as {@link ComposeBar} — a drop-in alternate design. */
export type ComposeBarV3Props = ComposeBarProps;

/**
 * ComposeBar — design **V3**. A **flat, full-width bar**: an edge-to-edge body
 * field sits above a hairline-divided row of **inline text actions** (Attach ·
 * Send) — no pill, no floating button, no elevation. Optional To/Subject fields
 * appear only when their controlled value is supplied. Send stays disabled until
 * there is a body or an attachment (and while `sending`), reading "Sending…" in
 * flight. Same props as `ComposeBar`. No literal colors.
 */
export const ComposeBarV3 = React.forwardRef<HTMLDivElement, ComposeBarV3Props>(function ComposeBarV3(
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
    <div ref={ref} className={cn('border-t border-border bg-surface', className)}>
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

      <textarea
        aria-label="Message body"
        rows={2}
        disabled={disabled}
        value={body}
        onChange={(e) => onChangeBody?.(e.target.value)}
        placeholder={placeholder}
        className="max-h-[160px] min-h-[44px] w-full resize-none bg-surface px-[var(--xen-space-md)] py-[var(--xen-space-sm)] text-base text-on-surface placeholder:text-muted focus:outline-none disabled:opacity-50"
      />

      {/* Inline action row. */}
      <div className="flex items-center border-t border-border">
        <button
          type="button"
          aria-label="Attach file"
          disabled={disabled}
          onClick={onAttach}
          className="inline-flex items-center gap-[var(--xen-space-xs)] px-[var(--xen-space-md)] py-[var(--xen-space-sm)] text-sm font-semibold text-muted transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50"
        >
          <Icon glyph="📎" color="muted" size="base" />
          <span>Attach</span>
        </button>

        <div className="flex-1" />

        <button
          type="button"
          aria-label="Send email"
          aria-busy={sending || undefined}
          disabled={!canSend}
          onClick={submit}
          className="inline-flex items-center gap-[var(--xen-space-xs)] px-[var(--xen-space-lg)] py-[var(--xen-space-sm)] text-base font-bold text-primary transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-40"
        >
          <span>{sending ? 'Sending…' : 'Send'}</span>
          <Icon glyph="➤" color="primary" size="base" />
        </button>
      </div>
    </div>
  );
});
