import * as React from 'react';
import { cn } from '../primitives/cn';
import { StatusPill } from './StatusPill';
import { DOCUMENT_KIND_META, DOCUMENT_STATUS_META, activateOnKey } from './internal';
import type { DocumentRowProps } from './DocumentRow';

/** Same public contract as {@link DocumentRow} — a drop-in alternate design. */
export type DocumentRowV3Props = DocumentRowProps;

/**
 * DocumentRow, redesigned (v3): a **compact file line**. The kind glyph, the title
 * over a version·modified subtitle, an inline status word, and a small download —
 * the tightest possible file row. The opposite of v2's card. Same props,
 * token-only.
 */
export const DocumentRowV3 = React.forwardRef<HTMLDivElement, DocumentRowV3Props>(function DocumentRowV3(
  { title, kind = 'other', status, modified, version, size, author, variant, onClick, onDownload, testID, className, ...rest },
  ref
) {
  void variant;
  void size;
  void author;
  const interactive = typeof onClick === 'function';
  const sub = [version, modified].filter((s): s is string => !!s).join(' · ');

  return (
    <div
      ref={ref}
      data-xen-document-row=""
      data-testid={testID}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={title}
      onClick={interactive ? () => onClick?.() : undefined}
      onKeyDown={interactive ? activateOnKey(() => onClick?.()) : undefined}
      className={cn('flex items-center gap-2.5 border-b border-border py-2', interactive && 'cursor-pointer transition-colors hover:bg-neutral-50', className)}
      {...rest}
    >
      <span aria-hidden>{DOCUMENT_KIND_META[kind].glyph}</span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm text-on-surface">{title}</p>
        {sub ? <p className="truncate text-xs text-muted">{sub}</p> : null}
      </div>
      {status ? <StatusPill meta={DOCUMENT_STATUS_META[status]} variant="inline" size="sm" /> : null}
      {onDownload ? <button type="button" aria-label="Download" onClick={(e) => { e.stopPropagation(); onDownload(); }} className="text-base text-muted hover:text-primary">⤓</button> : null}
    </div>
  );
});
