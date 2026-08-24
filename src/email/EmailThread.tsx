import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar, Spinner } from '../primitives';
import { EmptyState } from '../commerce';
import { StarButton } from './StarButton';
import { AttachmentChip, type AttachmentKind } from './AttachmentChip';
import { MailLabelChip, type MailLabelTone } from './MailLabelChip';

export interface ThreadAttachment {
  id: string;
  name: string;
  kind?: AttachmentKind;
  size?: string;
}

export interface ThreadMessage {
  id: string;
  /** Sender name. */
  sender: string;
  /** Sender avatar URL. */
  avatarUri?: string;
  /** Timestamp label. */
  timestamp?: string;
  /** Full body text (shown when expanded). */
  body: string;
  /** Starred state for this message. */
  starred?: boolean;
  /** Attachments on this message. */
  attachments?: ThreadAttachment[];
}

export interface ThreadLabelRef {
  id: string;
  label: string;
  tone?: MailLabelTone;
}

export interface EmailThreadProps {
  /** Thread subject line. */
  subject: string;
  /** Ordered messages in the conversation. */
  messages?: ThreadMessage[];
  /** Labels applied to the thread. */
  labels?: ThreadLabelRef[];
  /** Ids of expanded messages; others render collapsed (sender + snippet). */
  expandedIds?: string[];
  /** Toggle a message open/closed. */
  onToggleMessage?: (id: string) => void;
  /** Star toggle for a specific message. */
  onToggleStar?: (id: string, starred: boolean) => void;
  /** Click an attachment. */
  onPressAttachment?: (messageId: string, attachmentId: string) => void;
  /** Loading state → spinner. */
  loading?: boolean;
  className?: string;
}

/**
 * A full email conversation view — the subject header with thread labels, then
 * a stack of message cards. Each card header is an interactive `role="button"`
 * toggle: expanded shows the body + attachments, collapsed shows just sender +
 * a one-line snippet. Handles `loading` (spinner) and empty (no messages via
 * `EmptyState`) states. Data + callbacks only; every color from token classes.
 * No literal colors.
 */
export const EmailThread = React.forwardRef<HTMLDivElement, EmailThreadProps>(function EmailThread(
  {
    subject,
    messages,
    labels,
    expandedIds,
    onToggleMessage,
    onToggleStar,
    onPressAttachment,
    loading = false,
    className,
  },
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
      <div className="flex flex-col gap-[var(--xen-space-sm)] border-b border-border px-[var(--xen-space-md)] py-[var(--xen-space-md)]">
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
            <div key={m.id} className="border-b border-border px-[var(--xen-space-md)] py-[var(--xen-space-md)]">
              <div className="flex items-center gap-[var(--xen-space-sm)]">
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
                  className="flex min-w-0 flex-1 cursor-pointer items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-sm)] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <Avatar size="md" src={m.avatarUri} name={m.sender} />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-base font-semibold text-on-surface">{m.sender}</div>
                    {!isOpen ? <div className="truncate text-sm text-muted">{m.body}</div> : null}
                  </div>
                </div>
                {m.timestamp ? <span className="text-xs text-muted">{m.timestamp}</span> : null}
                <StarButton
                  starred={m.starred ?? false}
                  onToggle={onToggleStar ? (s) => onToggleStar(m.id, s) : undefined}
                  size="base"
                />
              </div>

              {isOpen ? (
                <div className="mt-[var(--xen-space-sm)] flex flex-col gap-[var(--xen-space-sm)]">
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
});
