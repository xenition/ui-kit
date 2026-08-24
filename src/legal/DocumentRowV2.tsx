import * as React from 'react';
import { cn } from '../primitives/cn';
import { StatusPill } from './StatusPill';
import { DOCUMENT_KIND_META, DOCUMENT_STATUS_META, activateOnKey } from './internal';
import type { DocumentRowProps } from './DocumentRow';

/** Same public contract as {@link DocumentRow} — a drop-in alternate design. */
export type DocumentRowV2Props = DocumentRowProps;

/**
 * DocumentRow, redesigned (v2): an **elevated document card**. A kind glyph tile
 * leads the title and a status pill; version·size·modified·author sit as meta, with
 * a download affordance. Distinct from v1's flat row. Same props, token-only.
 */
export const DocumentRowV2 = React.forwardRef<HTMLDivElement, DocumentRowV2Props>(function DocumentRowV2(
  { title, kind = 'other', status, modified, version, size, author, variant, onClick, onDownload, testID, className, ...rest },
  ref
) {
  void variant;
  const interactive = typeof onClick === 'function';
  const meta = [version, size, author, modified].filter((s): s is string => !!s).join(' · ');

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
      className={cn('flex items-center gap-3 rounded-lg bg-surface p-3 shadow-sm', interactive && 'cursor-pointer transition-colors hover:bg-neutral-50', className)}
      {...rest}
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-neutral-100 text-xl" aria-hidden>{DOCUMENT_KIND_META[kind].glyph}</span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-on-surface">{title}</p>
        {meta ? <p className="truncate text-xs text-muted">{meta}</p> : null}
      </div>
      {status ? <StatusPill meta={DOCUMENT_STATUS_META[status]} size="sm" /> : null}
      {onDownload ? <button type="button" aria-label="Download" onClick={(e) => { e.stopPropagation(); onDownload(); }} className="text-lg text-muted hover:text-primary">⤓</button> : null}
    </div>
  );
});
