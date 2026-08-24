import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';
import { Button } from '../primitives/Button';
import { pressableProps } from './internal/pressable';

/** Document kind — drives the leading glyph. */
export type DocumentKind = 'policy' | 'declaration' | 'id-card' | 'invoice' | 'letter';

const KIND_GLYPH: Record<DocumentKind, string> = {
  policy: '📄',
  declaration: '📋',
  'id-card': '🪪',
  invoice: '🧾',
  letter: '✉️',
};

export interface PolicyDocumentRowProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Document title (e.g. "Auto policy declarations"). */
  title: string;
  /** Document kind (default `policy`). */
  kind?: DocumentKind;
  /** Human-readable size (e.g. "1.2 MB"), already formatted by the caller. */
  size?: string;
  /** Localized date string (already formatted by the caller). */
  date?: string;
  /** Download button label (default "Download"). Hidden when no `onDownload`. */
  downloadLabel?: string;
  /** Fires when the row is clicked (open/preview). */
  onClick?: () => void;
  /** Fires when the download action is pressed. */
  onDownload?: () => void;
}

/**
 * One document in a policy's document list: a tinted kind glyph, a title with a
 * kind · size · date meta line, and an optional download action. The row opens
 * on click when `onClick` is supplied (keyboard-operable); the download action
 * is a real `<button>` (via `Button`) that only renders with `onDownload` and
 * stops propagation so it never also triggers the row. Token-bound throughout —
 * no literal colors. Web parity of the native `PolicyDocumentRow`.
 */
export const PolicyDocumentRow = React.forwardRef<HTMLDivElement, PolicyDocumentRowProps>(
  function PolicyDocumentRow(
    { title, kind = 'policy', size, date, downloadLabel = 'Download', onClick, onDownload, className, ...rest },
    ref
  ) {
    const glyph = KIND_GLYPH[kind] ?? KIND_GLYPH.policy;
    const meta = [kind.replace('-', ' '), size, date].filter((v) => v != null && v !== '').join(' · ');
    const interactive = pressableProps(onClick);

    return (
      <div
        ref={ref}
        aria-label={interactive ? `${title} document` : undefined}
        className={cn(
          'flex items-center gap-[var(--xen-space-md)] py-[var(--xen-space-sm)]',
          interactive &&
            'cursor-pointer rounded-[var(--xen-radius-sm)] transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
          className
        )}
        {...interactive}
        {...rest}
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--xen-radius-md)] bg-primary-50">
          <Icon glyph={glyph} aria-label={`${kind} document`} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-base font-semibold text-on-surface">{title}</p>
          {meta !== '' ? <p className="truncate text-xs text-muted">{meta}</p> : null}
        </div>
        {onDownload != null ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={(event) => {
              event.stopPropagation();
              onDownload();
            }}
          >
            {downloadLabel}
          </Button>
        ) : null}
      </div>
    );
  }
);
