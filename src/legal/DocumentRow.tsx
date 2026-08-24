import * as React from 'react';
import { cn } from '../primitives/cn';
import { StatusPill } from './StatusPill';
import {
  DOCUMENT_KIND_META,
  DOCUMENT_STATUS_META,
  activateOnKey,
  type DocumentKind,
  type DocumentStatus,
} from './internal';

export type DocumentRowVariant = 'default' | 'compact';

export interface DocumentRowProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick' | 'title'> {
  /** Document title / filename. */
  title: string;
  /** Document kind — drives the leading glyph. */
  kind?: DocumentKind;
  /** Lifecycle state — glyph + word pill, never color alone. */
  status?: DocumentStatus;
  /** Pre-formatted last-modified label. */
  modified?: string;
  /** Version label (e.g. "v3"). */
  version?: string;
  /** File size label (e.g. "1.2 MB"). */
  size?: string;
  /** Author / owner. */
  author?: string;
  /** Density. */
  variant?: DocumentRowVariant;
  /** Click handler (open / preview the document). */
  onClick?: () => void;
  /** Optional download affordance. */
  onDownload?: () => void;
  testID?: string;
}

/**
 * One document in a matter's file: kind glyph, title, and a status pill (glyph +
 * word so state never rests on color alone), plus optional version / size /
 * modified metadata. `compact` collapses the metadata line. An optional
 * `onDownload` renders a trailing real `<button>`. When `onClick` is set the row
 * is an accessible `role="button"`. All colors are `--xen-*` token classes.
 */
export const DocumentRow = React.forwardRef<HTMLDivElement, DocumentRowProps>(
  function DocumentRow(
    {
      title,
      kind = 'other',
      status,
      modified,
      version,
      size,
      author,
      variant = 'default',
      onClick,
      onDownload,
      testID,
      className,
      ...rest
    },
    ref
  ) {
    const compact = variant === 'compact';
    const kindMeta = DOCUMENT_KIND_META[kind];
    const interactive = Boolean(onClick);

    const meta = [version, size, modified ? `Modified ${modified}` : undefined, author]
      .filter((s): s is string => Boolean(s))
      .join(' · ');

    return (
      <div
        ref={ref}
        data-testid={testID}
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        aria-label={interactive ? `Document ${title}` : undefined}
        onClick={interactive ? onClick : undefined}
        onKeyDown={interactive ? activateOnKey(onClick) : undefined}
        className={cn(
          'flex items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-md)] border border-border bg-surface px-[var(--xen-space-sm)] py-[var(--xen-space-sm)]',
          interactive && 'cursor-pointer hover:bg-neutral-100',
          className
        )}
        {...rest}
      >
        <span aria-hidden="true" className="text-lg leading-none">
          {kindMeta.glyph}
        </span>
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="truncate text-sm font-semibold text-on-surface">{title}</span>
          {!compact && meta ? <span className="truncate text-xs text-muted">{meta}</span> : null}
        </div>
        {status ? <StatusPill meta={DOCUMENT_STATUS_META[status]} variant="inline" size="sm" /> : null}
        {onDownload ? (
          <button
            type="button"
            aria-label={`Download ${title}`}
            onClick={(e) => {
              e.stopPropagation();
              onDownload();
            }}
            className="rounded-[var(--xen-radius-sm)] px-[var(--xen-space-xs)] text-base text-primary hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
          >
            ⤓
          </button>
        ) : null}
      </div>
    );
  }
);
