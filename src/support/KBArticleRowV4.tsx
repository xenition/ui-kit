import * as React from 'react';
import { cn } from '../primitives/cn';
import { activateOnKey } from './internal';
import type { KBArticleRowProps, KBStatus } from './KBArticleRow';

/** Drop-in for {@link KBArticleRowProps} — same props, the V4 "calm console" design. */
export type KBArticleRowV4Props = KBArticleRowProps;

interface StatusSpec {
  glyph: string;
  label: string;
  /** Soft-tint pill classes (bg + text) — status is never color-only. */
  pill: string;
}

// published → success, draft → warn, archived → muted. Each has a distinct glyph
// so status is never color-only.
const STATUS: Record<KBStatus, StatusSpec> = {
  published: { glyph: '✓', label: 'Published', pill: 'bg-success/10 text-success' },
  draft: { glyph: '✎', label: 'Draft', pill: 'bg-warn/10 text-warn' },
  archived: { glyph: '⌷', label: 'Archived', pill: 'bg-muted/10 text-muted' },
};

/**
 * KBArticleRow — **V4** "calm console" design (web parity of the native V4). A
 * knowledge-base article row as an elevated rounded card: a leading doc glyph,
 * title, a soft-tint status pill carrying glyph + label (published→success,
 * draft→warn, archived→muted — never color alone), and a category · views ·
 * helpful meta hint. Activating fires `onClick(id)` (click + keyboard); an
 * optional `onInsertLink` gets its own ≥44px button that does not bubble to the
 * row. Hover/focus paints a soft-primary tint. Same props/behavior as
 * {@link KBArticleRowProps}; all colors from `--xen-*` token classes (no literal
 * hex). Dark-mode safe.
 */
export const KBArticleRowV4 = React.forwardRef<HTMLDivElement, KBArticleRowV4Props>(function KBArticleRowV4(
  { article, onClick, onInsertLink, loading = false, className, ...rest },
  ref
) {
  if (loading) {
    return (
      <div
        ref={ref}
        aria-label="Loading article"
        aria-busy="true"
        className={cn('flex animate-pulse items-center gap-3 rounded-[var(--xen-radius-lg)] border border-border bg-surface p-3 shadow-sm', className)}
        {...rest}
      >
        <span className="h-9 w-9 shrink-0 rounded-full bg-on-surface/10" />
        <span className="flex flex-1 flex-col gap-1.5">
          <span className="h-3 w-[65%] rounded bg-on-surface/10" />
          <span className="h-2.5 w-[35%] rounded bg-on-surface/10" />
        </span>
      </div>
    );
  }

  const status = article.status ?? 'published';
  const spec = STATUS[status] ?? STATUS.published;
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
      aria-label={interactive ? `Article: ${article.title}, ${spec.label}` : undefined}
      onClick={activate}
      onKeyDown={activate ? activateOnKey(activate) : undefined}
      className={cn(
        'flex min-h-[44px] items-center gap-3 rounded-[var(--xen-radius-lg)] border border-border bg-surface p-3 shadow-sm',
        interactive && 'cursor-pointer hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
        className
      )}
      {...rest}
    >
      <span
        aria-hidden="true"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-base text-primary"
      >
        📄
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="flex flex-wrap items-center gap-2">
          <span className="min-w-0 shrink truncate text-base font-semibold text-on-surface">{article.title}</span>
          {/* Soft-tint status pill — glyph + label, never color-only. */}
          <span className={cn('inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-bold', spec.pill)}>
            <span aria-hidden="true">{spec.glyph}</span>
            {spec.label}
          </span>
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
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-primary hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
        >
          <span aria-hidden="true">🔗</span>
        </button>
      ) : null}
    </div>
  );
});
