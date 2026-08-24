import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives';

export type AttachmentKind = 'image' | 'pdf' | 'doc' | 'sheet' | 'audio' | 'video' | 'zip' | 'file';

const KIND_GLYPH: Record<AttachmentKind, string> = {
  image: '🖼️',
  pdf: '📕',
  doc: '📄',
  sheet: '📊',
  audio: '🎵',
  video: '🎬',
  zip: '🗜️',
  file: '📎',
};

export interface AttachmentChipProps {
  /** File name shown as the label. */
  name: string;
  /** File kind → leading glyph. Default `'file'`. */
  kind?: AttachmentKind;
  /** Human-readable size (e.g. "1.2 MB"). */
  size?: string;
  /** Uploading progress 0–1; renders a loading state and suppresses actions. */
  uploadProgress?: number;
  /** Click the chip (preview / open). Renders the main cell as a real button. */
  onClick?: () => void;
  /** Download affordance (a real `<button>`); shown when provided. */
  onDownload?: () => void;
  /** Remove affordance (compose staging, a real `<button>`); shown when provided. */
  onRemove?: () => void;
  className?: string;
}

/**
 * A single mail attachment as a compact chip — kind glyph, file name, optional
 * size, and optional download / remove affordances (each a real `<button>`).
 * While `uploadProgress` is between 0 and 1 it reads as loading (`aria-busy`)
 * and suppresses the trailing actions. Surface, border, and the soft icon well
 * all resolve from token classes. No literal colors.
 */
export const AttachmentChip = React.forwardRef<HTMLDivElement, AttachmentChipProps>(
  function AttachmentChip(
    { name, kind = 'file', size, uploadProgress, onClick, onDownload, onRemove, className },
    ref
  ) {
    const glyph = KIND_GLYPH[kind] ?? KIND_GLYPH.file;
    const uploading = uploadProgress != null && uploadProgress >= 0 && uploadProgress < 1;
    const pct = uploading ? Math.round((uploadProgress ?? 0) * 100) : null;

    const well = (
      <span
        aria-hidden="true"
        className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[var(--xen-radius-sm)] bg-primary-50"
      >
        <Icon glyph={glyph} size="base" color="primary" />
      </span>
    );
    const meta = (
      <span className="min-w-0 flex-1 text-left">
        <span className="block truncate text-sm font-semibold text-on-surface">{name}</span>
        {uploading ? (
          <span className="block truncate text-xs text-muted">{`Uploading… ${pct}%`}</span>
        ) : size ? (
          <span className="block truncate text-xs text-muted">{size}</span>
        ) : null}
      </span>
    );

    return (
      <div
        ref={ref}
        aria-busy={uploading || undefined}
        className={cn(
          'inline-flex max-w-[260px] items-center gap-[var(--xen-space-sm)] self-start rounded-[var(--xen-radius-md)] border border-border bg-surface px-[var(--xen-space-sm)] py-[var(--xen-space-xs)]',
          className
        )}
      >
        {onClick ? (
          <button
            type="button"
            aria-label={`Attachment ${name}${size ? `, ${size}` : ''}${uploading ? ', uploading' : ''}`}
            onClick={onClick}
            className="inline-flex min-w-0 flex-1 items-center gap-[var(--xen-space-sm)] transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {well}
            {meta}
          </button>
        ) : (
          <span className="inline-flex min-w-0 flex-1 items-center gap-[var(--xen-space-sm)]">
            {well}
            {meta}
          </span>
        )}
        {!uploading && onDownload ? (
          <button
            type="button"
            aria-label={`Download ${name}`}
            onClick={onDownload}
            className="inline-flex shrink-0 items-center transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <Icon glyph="⤓" size="base" color="muted" />
          </button>
        ) : null}
        {!uploading && onRemove ? (
          <button
            type="button"
            aria-label={`Remove ${name}`}
            onClick={onRemove}
            className="inline-flex shrink-0 items-center transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <Icon glyph="×" size="base" color="muted" />
          </button>
        ) : null}
      </div>
    );
  }
);
