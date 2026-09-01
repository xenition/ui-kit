import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button } from '../primitives/Button';
import { EmptyState } from '../commerce';
import type { ConversationPanelProps, ConversationMessage } from './ConversationPanel';

/** Drop-in for {@link ConversationPanelProps} — same props, the V4 "console" design. */
export type ConversationPanelV4Props = ConversationPanelProps;

interface BubbleSpec {
  role: string;
  align: string;
  cls: string;
}

// Calm threaded look: agent bubbles carry a soft-primary tint on the right,
// customer bubbles sit on the plain surface with a hairline border on the left,
// system notes center, internal notes wear a warn hairline. Role is always in
// text so the thread never reads by color alone.
function bubbleSpec(m: ConversationMessage): BubbleSpec {
  if (m.internal) {
    return { role: 'Internal note', align: 'self-end', cls: 'border border-warn/40 bg-warn/[0.08]' };
  }
  if (m.author === 'agent') return { role: 'Agent', align: 'self-end', cls: 'bg-primary/10' };
  if (m.author === 'system') return { role: 'System', align: 'self-center', cls: 'bg-on-surface/[0.05]' };
  return { role: 'Customer', align: 'self-start', cls: 'border border-border bg-surface' };
}

/**
 * ConversationPanel — **V4** "calm console" design (web parity of the native V4).
 * A quiet, legible support thread: agent replies as soft-primary bubbles aligned
 * right, customer messages as surface + hairline bubbles aligned left, system
 * notes centered, internal notes with a warn hairline — each aligned and tinted
 * by author with the role in text (never color-only). Muted timestamps, an
 * inline reply composer with a ≥44px send target, and the base's `loading` /
 * empty states. Same props/behavior as {@link ConversationPanelProps}; all colors
 * from `--xen-*` token classes (no literal hex).
 */
export const ConversationPanelV4 = React.forwardRef<HTMLDivElement, ConversationPanelV4Props>(
  function ConversationPanelV4(
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
        <div aria-label="Loading conversation" aria-busy="true" className="flex animate-pulse flex-col gap-3 p-4">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={cn(
                'h-10 rounded-[var(--xen-radius-lg)] bg-on-surface/10',
                i % 2 === 0 ? 'w-[60%] self-start' : 'w-[75%] self-end'
              )}
            />
          ))}
        </div>
      );
    } else if (messages.length === 0) {
      body = <EmptyState title={emptyText} className="border-0" />;
    } else {
      body = (
        <div className="flex flex-col gap-3 overflow-y-auto p-3">
          {messages.map((m) => {
            const spec = bubbleSpec(m);
            return (
              <div
                key={m.id}
                aria-label={`${spec.role}${m.authorName ? ` ${m.authorName}` : ''}: ${m.body}`}
                className={cn(
                  'rounded-[var(--xen-radius-lg)] px-3 py-2 shadow-sm',
                  spec.align,
                  spec.cls,
                  m.author === 'system' ? 'max-w-[90%]' : 'max-w-[82%]'
                )}
              >
                <div className="mb-0.5 flex gap-2 text-xs font-bold text-muted">
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
              className="max-h-[120px] min-h-[44px] flex-1 rounded-[var(--xen-radius-lg)] border border-border bg-surface px-3 py-2 text-sm text-on-surface placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 disabled:opacity-50"
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
