import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';
import { Badge } from '../primitives/Badge';
import { activateOnKey } from './internal';

/** Publication state of a knowledge-base article. */
export type KBStatus = 'published' | 'draft' | 'archived';

export interface KBArticle {
  /** Stable id, returned to `onClick`. */
  id: string;
  /** Article title. */
  title: string;
  /** Optional category / section label. */
  category?: string;
  /** Optional view count. */
  views?: number;
  /** Optional helpful-vote count. */
  helpful?: number;
  /** Publication status (default treated as `published`). */
  status?: KBStatus;
  /** Optional updated hint (e.g. `"Updated 3d ago"`). */
  updatedLabel?: string;
}

export interface KBArticleRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** The article to render. */
  article: KBArticle;
  /** Fires with the article id when the row is activated (click / Enter / Space). */
  onClick?: (id: string) => void;
  /** Fires when the "Insert link" affordance is pressed (agent linking a KB doc). */
  onInsertLink?: (article: KBArticle) => void;
  /** Loading placeholder row. */
  loading?: boolean;
}

const STATUS_LABEL: Record<KBStatus, string> = {
  published: 'Published',
  draft: 'Draft',
  archived: 'Archived',
};

/**
 * A knowledge-base article row for search results / suggested-answers panels —
 * a leading doc glyph, title, category + status, and view/helpful counts.
 * Activating fires `onClick(id)` (click + keyboard); an optional `onInsertLink`
 * lets an agent drop the article link into a reply (its own button, click does
 * not bubble to the row). Non-published articles carry a text status badge (never
 * color-only). Handles a `loading` placeholder. Token colors only.
 */
export const KBArticleRow = React.forwardRef<HTMLDivElement, KBArticleRowProps>(function KBArticleRow(
  { article, onClick, onInsertLink, loading = false, className, ...rest },
  ref
) {
  if (loading) {
    return (
      <div
        ref={ref}
        aria-label="Loading article"
        aria-busy="true"
        className={cn('flex animate-pulse items-center gap-3 border-b border-border p-3', className)}
        {...rest}
      >
        <span className="h-6 w-6 rounded-md bg-neutral-100" />
        <span className="flex flex-1 flex-col gap-1.5">
          <span className="h-3 w-[65%] rounded bg-neutral-100" />
          <span className="h-2.5 w-[35%] rounded bg-neutral-100" />
        </span>
      </div>
    );
  }

  const status = article.status ?? 'published';
  const views = typeof article.views === 'number' && article.views >= 0 ? article.views : undefined;
  const helpful = typeof article.helpful === 'number' && article.helpful >= 0 ? article.helpful : undefined;

  const metaParts: string[] = [];
  if (article.category) metaParts.push(article.category);
  if (views !== undefined) metaParts.push(`${views} views`);
  if (helpful !== undefined) metaParts.push(`${helpful} helpful`);
  if (article.updatedLabel) metaParts.push(article.updatedLabel);

  const interactive = typeof onClick === 'function';
  const activate = interactive ? () => onClick!(article.id) : undefined;

  return (
    <div
      ref={ref}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={interactive ? `Article: ${article.title}${status !== 'published' ? `, ${STATUS_LABEL[status]}` : ''}` : undefined}
      onClick={activate}
      onKeyDown={activate ? activateOnKey(activate) : undefined}
      className={cn(
        'flex items-center gap-3 border-b border-border p-3',
        interactive && 'cursor-pointer hover:bg-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
        className
      )}
      {...rest}
    >
      <Icon glyph="📄" size="lg" />
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="flex items-center gap-1">
          <span className="min-w-0 shrink truncate text-base font-semibold text-on-surface">{article.title}</span>
          {status !== 'published' ? (
            <Badge tone="muted">{STATUS_LABEL[status]}</Badge>
          ) : null}
        </span>
        {metaParts.length > 0 ? (
          <span className="truncate text-xs text-muted">{metaParts.join(' · ')}</span>
        ) : null}
      </span>
      {onInsertLink ? (
        <button
          type="button"
          aria-label={`Insert link to ${article.title}`}
          onClick={(e) => {
            e.stopPropagation();
            onInsertLink(article);
          }}
          className="shrink-0 rounded p-1 hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
        >
          <Icon glyph="🔗" size="sm" color="primary" aria-label="Insert link" />
        </button>
      ) : null}
    </div>
  );
});
