import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button } from '../primitives/Button';
import { EmptyState } from '../commerce';

/** Which side of the conversation a message is from. */
export type MessageAuthor = 'agent' | 'customer' | 'system';

export interface ConversationMessage {
  /** Stable id. */
  id: string;
  /** Who sent it. */
  author: MessageAuthor;
  /** Message body text. */
  body: string;
  /** Optional display name. */
  authorName?: string;
  /** Optional timestamp hint (e.g. `"09:41"`). */
  timeLabel?: string;
  /** Optional flag for internal-only notes (rendered distinctly). */
  internal?: boolean;
}

export interface ConversationPanelProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Ordered messages (oldest → newest). */
  messages: ConversationMessage[];
  /** Show a loading state instead of the thread. */
  loading?: boolean;
  /** Text shown when there are no messages. */
  emptyText?: string;
  /** Controlled reply draft. */
  replyValue?: string;
  /** Fires as the reply draft changes. */
  onChangeReply?: (text: string) => void;
  /** Fires with the trimmed reply text when "Reply" is pressed. */
  onReply?: (text: string) => void;
  /** Send-button label (default "Reply"). */
  sendLabel?: string;
  /** Hide the reply composer (read-only transcript). */
  hideComposer?: boolean;
  /** Disable the composer (e.g. ticket closed). */
  disabled?: boolean;
}

interface BubbleSpec {
  role: string;
  align: string;
  cls: string;
}

function bubbleSpec(m: ConversationMessage): BubbleSpec {
  if (m.internal) {
    return { role: 'Internal note', align: 'self-end', cls: 'border border-warn bg-neutral-100' };
  }
  if (m.author === 'agent') return { role: 'Agent', align: 'self-end', cls: 'bg-primary-50' };
  if (m.author === 'system') return { role: 'System', align: 'self-center', cls: 'bg-neutral-100' };
  return { role: 'Customer', align: 'self-start', cls: 'border border-border bg-surface' };
}

/**
 * A support-ticket conversation thread with an inline reply composer. Renders
 * customer / agent / system / internal-note bubbles (aligned + tinted by author,
 * with the author role in text so it's not color-only), plus a textarea and a
 * "Reply" button that reports the trimmed draft via `onReply`. Handles the
 * `loading` and empty-thread (`EmptyState`) states. The composer can be
 * controlled (`replyValue` + `onChangeReply`) or uncontrolled. Token colors only.
 */
export const ConversationPanel = React.forwardRef<HTMLDivElement, ConversationPanelProps>(
  function ConversationPanel(
    {
      messages,
      loading = false,
      emptyText = 'No messages yet.',
      replyValue,
      onChangeReply,
      onReply,
      sendLabel = 'Reply',
      hideComposer = false,
      disabled = false,
      className,
      ...rest
    },
    ref
  ) {
    const controlled = replyValue !== undefined;
    const [draft, setDraft] = React.useState('');
    const text = controlled ? (replyValue as string) : draft;

    const setText = (next: string): void => {
      if (!controlled) setDraft(next);
      onChangeReply?.(next);
    };

    const submit = (): void => {
      const trimmed = text.trim();
      if (!trimmed) return;
      onReply?.(trimmed);
      if (!controlled) setDraft('');
    };

    let body: React.ReactNode;
    if (loading) {
      body = (
        <div aria-label="Loading conversation" aria-busy="true" className="flex animate-pulse flex-col gap-2 p-4">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={cn('h-10 rounded-[var(--xen-radius-md)] bg-neutral-100', i % 2 === 0 ? 'w-[60%] self-start' : 'w-[75%] self-end')}
            />
          ))}
        </div>
      );
    } else if (messages.length === 0) {
      body = <EmptyState title={emptyText} className="border-0" />;
    } else {
      body = (
        <div className="flex flex-col gap-2 overflow-y-auto p-3">
          {messages.map((m) => {
            const spec = bubbleSpec(m);
            return (
              <div
                key={m.id}
                aria-label={`${spec.role}${m.authorName ? ` ${m.authorName}` : ''}: ${m.body}`}
                className={cn(
                  'rounded-[var(--xen-radius-md)] px-3 py-2',
                  spec.align,
                  spec.cls,
                  m.author === 'system' ? 'max-w-[90%]' : 'max-w-[82%]'
                )}
              >
                <div className="mb-0.5 flex gap-1 text-xs font-semibold text-muted">
                  <span>
                    {m.internal ? '🔒 ' : ''}
                    {m.authorName ?? spec.role}
                  </span>
                  {m.timeLabel ? <span className="font-normal">{m.timeLabel}</span> : null}
                </div>
                <p className="text-sm text-on-surface">{m.body}</p>
              </div>
            );
          })}
        </div>
      );
    }

    return (
      <div ref={ref} className={cn('flex flex-col', className)} {...rest}>
        <div className="flex-1">{body}</div>
        {hideComposer ? null : (
          <div className="flex items-end gap-2 border-t border-border p-2">
            <textarea
              aria-label="Reply message"
              value={text}
              onChange={(e) => setText(e.target.value)}
              disabled={disabled}
              placeholder="Write a reply…"
              rows={2}
              className="max-h-[120px] min-h-[40px] flex-1 rounded-[var(--xen-radius-md)] border border-border bg-surface px-2 py-1 text-sm text-on-surface placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 disabled:opacity-50"
            />
            <Button size="sm" onClick={submit} disabled={disabled || text.trim().length === 0}>
              {sendLabel}
            </Button>
          </div>
        )}
      </div>
    );
  }
);
