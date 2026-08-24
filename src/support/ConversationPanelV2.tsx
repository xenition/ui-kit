import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button } from '../primitives/Button';
import { EmptyState } from '../commerce';
import type { ConversationPanelProps } from './ConversationPanel';

/** Same public contract as {@link ConversationPanel} — a drop-in alternate design. */
export type ConversationPanelV2Props = ConversationPanelProps;

/**
 * ConversationPanel, redesigned (v2): a **chat-bubble thread**. Agent replies sit
 * right in primary bubbles, customer messages left in bordered surface bubbles,
 * system lines center as quiet notes, and internal notes tint warn. A rounded
 * composer with a send button anchors the foot. Distinct from v1. Same props,
 * token-only.
 */
export const ConversationPanelV2 = React.forwardRef<HTMLDivElement, ConversationPanelV2Props>(
  function ConversationPanelV2(
    { messages, loading = false, emptyText = 'No messages yet', replyValue, onChangeReply, onReply, sendLabel = 'Reply', hideComposer = false, disabled = false, className, ...rest },
    ref
  ) {
    const [local, setLocal] = React.useState('');
    const draft = replyValue ?? local;
    const setDraft = (v: string): void => {
      if (replyValue === undefined) setLocal(v);
      onChangeReply?.(v);
    };
    const send = (): void => {
      const t = draft.trim();
      if (!t) return;
      onReply?.(t);
      if (replyValue === undefined) setLocal('');
    };

    return (
      <div ref={ref} data-xen-conversation-panel="" className={cn('flex flex-col gap-3', className)} {...rest}>
        {loading ? (
          <div className="space-y-2" aria-busy="true"><div className="h-10 w-2/3 animate-pulse rounded-lg bg-neutral-100" /><div className="ml-auto h-10 w-1/2 animate-pulse rounded-lg bg-neutral-100" /></div>
        ) : messages.length === 0 ? (
          <EmptyState icon={<span className="text-3xl">💬</span>} title={emptyText} />
        ) : (
          <div className="flex flex-col gap-2">
            {messages.map((m) => {
              if (m.author === 'system') {
                return <p key={m.id} className="mx-auto text-xs text-muted">{m.body}</p>;
              }
              const isAgent = m.author === 'agent';
              return (
                <div key={m.id} className={cn('flex flex-col', isAgent ? 'items-end' : 'items-start')}>
                  <div className={cn(
                    'max-w-[80%] rounded-2xl px-3 py-2 text-sm',
                    m.internal ? 'bg-warn/10 text-on-surface' : isAgent ? 'bg-primary text-on-primary' : 'border border-border bg-surface text-on-surface'
                  )}>
                    {m.body}
                  </div>
                  <span className="mt-0.5 text-[10px] text-muted">{[m.authorName, m.timeLabel, m.internal ? 'internal' : null].filter(Boolean).join(' · ')}</span>
                </div>
              );
            })}
          </div>
        )}

        {!hideComposer ? (
          <div className="flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5">
            <input
              type="text"
              value={draft}
              disabled={disabled}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); send(); } }}
              placeholder="Type a reply…"
              aria-label="Reply"
              className="min-w-0 flex-1 bg-transparent text-sm text-on-surface outline-none placeholder:text-muted"
            />
            <Button size="sm" variant="primary" disabled={disabled || !draft.trim()} onClick={send}>{sendLabel}</Button>
          </div>
        ) : null}
      </div>
    );
  }
);
