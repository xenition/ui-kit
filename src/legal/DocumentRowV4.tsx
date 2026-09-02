import * as React from 'react';
import { cn } from '../primitives/cn';
import { StatusPill } from './StatusPill';
import { DOCUMENT_KIND_META, DOCUMENT_STATUS_META, activateOnKey } from './internal';
import type { DocumentRowProps } from './DocumentRow';

/** Drop-in for {@link DocumentRowProps} — same props, the V4 "chambers" design. */
export type DocumentRowV4Props = DocumentRowProps;

/**
 * DocumentRow — **V4** "chambers" design (web parity of the native V4). The
 * distinguished, chambers take on a document in a matter's file: an elevated
 * rounded row with a soft shadow, the kind glyph tucked in a soft-primary well,
 * the title, a version · size · modified meta line, a labelled glyph + word
 * status pill (never color alone), and an optional trailing download `<button>`.
 * `compact` collapses the metadata line. When `onClick` is set the row is a
 * keyboard-activable `role="button"`. Reuses the base `variant`
 * (`default` / `compact`). All colors from `--xen-*` token classes (no literals).
 */
export const DocumentRowV4 = React.forwardRef<HTMLDivElement, DocumentRowV4Props>(function DocumentRowV4(
  { title, kind = 'other', status, modified, version, size, author, variant = 'default', onClick, onDownload, testID, className, ...rest },
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
      data-xen-document-row=""
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={interactive ? `Document ${title}` : undefined}
      onClick={interactive ? onClick : undefined}
      onKeyDown={interactive ? activateOnKey(onClick) : undefined}
      className={cn(
        'flex items-center gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface shadow-sm px-[var(--xen-space-md)] py-[var(--xen-space-sm)]',
        compact ? 'min-h-[44px]' : 'min-h-[56px]',
        interactive && 'cursor-pointer transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
        className
      )}
      {...rest}
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--xen-radius-md)] bg-primary/10 text-lg leading-none">
        <span aria-hidden="true">{kindMeta.glyph}</span>
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="truncate text-sm font-semibold text-on-surface">{title}</span>
        {!compact && meta ? <span className="truncate text-xs text-muted">{meta}</span> : null}
      </div>
      {status ? <StatusPill meta={DOCUMENT_STATUS_META[status]} variant="soft" size="sm" /> : null}
      {onDownload ? (
        <button
          type="button"
          aria-label={`Download ${title}`}
          onClick={(e) => {
            e.stopPropagation();
            onDownload();
          }}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[var(--xen-radius-md)] bg-primary/10 text-base text-primary hover:bg-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
        >
          ⤓
        </button>
      ) : null}
    </div>
  );
});
