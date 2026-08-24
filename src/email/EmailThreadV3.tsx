import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar, Spinner } from '../primitives';
import { EmptyState } from '../commerce';
import { StarButton } from './StarButton';
import { AttachmentChip } from './AttachmentChip';
import { MailLabelChip } from './MailLabelChip';
import type { EmailThreadProps } from './EmailThread';

/** Same public contract as {@link EmailThread} — a drop-in alternate design. */
export type EmailThreadV3Props = EmailThreadProps;

/**
 * EmailThread — design **V3**. A **flat, quoted-style conversation**: each
 * message hangs off a colored vertical **sender rail** (like a quote block)
 * instead of a card, with no elevation — a calm, document-like read. The rail
 * tint alternates primary / accent per message so adjacent replies read
 * distinctly, and dims to a neutral hairline when the message is collapsed. Each
 * message is a `role="button"` toggle (body + attachments when open, snippet when
 * closed). Handles loading and empty states. Same props as `EmailThread`. No
 * literal colors.
 */
export const EmailThreadV3 = React.forwardRef<HTMLDivElement, EmailThreadV3Props>(
  function EmailThreadV3(
    { subject, messages, labels, expandedIds, onToggleMessage, onToggleStar, onPressAttachment, loading = false, className },
    ref
  ) {
    const safeMessages = messages ?? [];
    const safeLabels = labels ?? [];
    const lastId = safeMessages.length > 0 ? safeMessages[safeMessages.length - 1]!.id : undefined;
    const expanded = new Set(expandedIds ?? (lastId ? [lastId] : []));

    if (loading) {
      return (
        <div
          ref={ref}
          role="status"
          aria-label="Loading messages"
          className={cn('flex items-center justify-center bg-surface p-[var(--xen-space-xl)]', className)}
        >
          <Spinner />
        </div>
      );
    }

    return (
      <div ref={ref} className={cn('bg-surface', className)}>
        <div className="flex flex-col gap-[var(--xen-space-sm)] px-[var(--xen-space-md)] py-[var(--xen-space-md)]">
          <h2 className="text-xl font-bold text-on-surface">{subject}</h2>
          {safeLabels.length > 0 ? (
            <div className="flex flex-wrap gap-[var(--xen-space-xs)]">
              {safeLabels.map((l) => (
                <MailLabelChip key={l.id} label={l.label} tone={l.tone ?? 'neutral'} />
              ))}
            </div>
          ) : null}
        </div>

        {safeMessages.length === 0 ? (
          <div className="p-[var(--xen-space-xl)]">
            <EmptyState title="No messages" description="This conversation is empty." />
          </div>
        ) : (
          safeMessages.map((m, i) => {
            const isOpen = expanded.has(m.id);
            const atts = m.attachments ?? [];
            // Alternate the rail tint per message so adjacent replies read distinctly.
            const railColor = !isOpen ? 'border-l-border' : i % 2 === 0 ? 'border-l-primary' : 'border-l-accent';
            return (
              <div
                key={m.id}
                className={cn(
                  'mx-[var(--xen-space-md)] my-[var(--xen-space-xs)] border-l-4 pl-[var(--xen-space-md)] transition-colors duration-200',
                  railColor
                )}
              >
                <div
                  role="button"
                  tabIndex={0}
                  aria-label={`${isOpen ? 'Collapse' : 'Expand'} message from ${m.sender}`}
                  aria-expanded={isOpen}
                  onClick={() => onToggleMessage?.(m.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onToggleMessage?.(m.id);
                    }
                  }}
                  className="flex cursor-pointer items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-sm)] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <Avatar size="sm" src={m.avatarUri} name={m.sender} />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-bold text-on-surface">{m.sender}</div>
                    {!isOpen ? <div className="truncate text-xs text-muted">{m.body}</div> : null}
                  </div>
                  {m.timestamp ? <span className="text-xs text-muted">{m.timestamp}</span> : null}
                  <StarButton
                    starred={m.starred ?? false}
                    onToggle={onToggleStar ? (s) => onToggleStar(m.id, s) : undefined}
                    size="sm"
                  />
                </div>

                {isOpen ? (
                  <div className="mt-[var(--xen-space-sm)] flex flex-col gap-[var(--xen-space-sm)] pb-[var(--xen-space-sm)]">
                    <p className="text-base leading-relaxed text-on-surface">{m.body}</p>
                    {atts.length > 0 ? (
                      <div className="flex flex-wrap gap-[var(--xen-space-xs)]">
                        {atts.map((a) => (
                          <AttachmentChip
                            key={a.id}
                            name={a.name}
                            kind={a.kind ?? 'file'}
                            size={a.size}
                            onClick={onPressAttachment ? () => onPressAttachment(m.id, a.id) : undefined}
                          />
                        ))}
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </div>
            );
          })
        )}
      </div>
    );
  }
);
