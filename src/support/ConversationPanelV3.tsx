import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button } from '../primitives/Button';
import { EmptyState } from '../commerce';
import type { ConversationPanelProps, MessageAuthor } from './ConversationPanel';

/** Same public contract as {@link ConversationPanel} — a drop-in alternate design. */
export type ConversationPanelV3Props = ConversationPanelProps;

const AUTHOR_RAIL: Record<MessageAuthor, string> = { agent: 'border-l-primary', customer: 'border-l-border', system: 'border-l-transparent' };

/**
 * ConversationPanel, redesigned (v3): a **flat quoted transcript**. Each message
 * hangs off a colored left rail (agent primary, customer hairline) with an author
 * · time header and the body beneath; internal notes tint warn. A minimal
 * borderless composer trails. The opposite of v2's bubbles. Same props,
 * token-only.
 */
export const ConversationPanelV3 = React.forwardRef<HTMLDivElement, ConversationPanelV3Props>(
  function ConversationPanelV3(
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
          <div className="space-y-2" aria-busy="true"><div className="h-8 w-full animate-pulse rounded bg-neutral-100" /></div>
        ) : messages.length === 0 ? (
          <EmptyState icon={<span className="text-3xl">💬</span>} title={emptyText} />
        ) : (
          <div className="flex flex-col gap-2">
            {messages.map((m) => (
              <div key={m.id} className={cn('border-l-2 pl-3', AUTHOR_RAIL[m.author], m.internal && 'bg-warn/5')}>
                <p className="text-xs text-muted">{[m.authorName ?? m.author, m.timeLabel, m.internal ? 'internal' : null].filter(Boolean).join(' · ')}</p>
                <p className="text-sm text-on-surface">{m.body}</p>
              </div>
            ))}
          </div>
        )}

        {!hideComposer ? (
          <div className="flex items-center gap-2 border-t border-border pt-2">
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
            <Button size="sm" variant="ghost" disabled={disabled || !draft.trim()} onClick={send}>{sendLabel}</Button>
          </div>
        ) : null}
      </div>
    );
  }
);
