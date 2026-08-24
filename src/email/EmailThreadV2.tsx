import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar, Spinner } from '../primitives';
import { EmptyState } from '../commerce';
import { StarButton } from './StarButton';
import { AttachmentChip } from './AttachmentChip';
import { MailLabelChip } from './MailLabelChip';
import type { EmailThreadProps } from './EmailThread';

/** Same public contract as {@link EmailThread} — a drop-in alternate design. */
export type EmailThreadV2Props = EmailThreadProps;

/**
 * EmailThread — design **V2**. The conversation as a stack of **elevated, rounded
 * message cards** floating on the surface with clear gaps between them. Each card
 * header is a `role="button"` toggle: expanded shows the body + attachments over
 * a hairline divider, collapsed shows sender + a one-line snippet. Handles
 * `loading` (spinner) and empty (no messages) states. Same props as
 * `EmailThread`. No literal colors.
 */
export const EmailThreadV2 = React.forwardRef<HTMLDivElement, EmailThreadV2Props>(
  function EmailThreadV2(
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
      <div
        ref={ref}
        className={cn('flex flex-col gap-[var(--xen-space-md)] bg-surface p-[var(--xen-space-md)]', className)}
      >
        <div className="flex flex-col gap-[var(--xen-space-sm)]">
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
          safeMessages.map((m) => {
            const isOpen = expanded.has(m.id);
            const atts = m.attachments ?? [];
            return (
              <div
                key={m.id}
                className={cn(
                  'rounded-[var(--xen-radius-lg)] bg-surface p-[var(--xen-space-md)] transition-shadow duration-200',
                  isOpen ? 'shadow-md' : 'shadow-sm'
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
                  <Avatar size="md" src={m.avatarUri} name={m.sender} />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-base font-bold text-on-surface">{m.sender}</div>
                    {!isOpen ? <div className="truncate text-sm text-muted">{m.body}</div> : null}
                  </div>
                  {m.timestamp ? <span className="text-xs text-muted">{m.timestamp}</span> : null}
                  <StarButton
                    starred={m.starred ?? false}
                    onToggle={onToggleStar ? (s) => onToggleStar(m.id, s) : undefined}
                    size="base"
                  />
                </div>

                {isOpen ? (
                  <div className="mt-[var(--xen-space-md)] flex flex-col gap-[var(--xen-space-sm)] border-t border-border pt-[var(--xen-space-md)]">
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
