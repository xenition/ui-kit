import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import { clampPercent, toneGround } from '../primitives/internal/tone-v4';
import {
  stateGroundVars,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../primitives/internal/v4-state';
import { spokenLine, TONE_INK } from './internal/mail-v4';
import type { AttachmentChipProps, AttachmentKind } from './AttachmentChip';

export interface AttachmentChipV4Props extends AttachmentChipProps {
  /**
   * Abort an upload that is still in flight. Without it the interval in which
   * a user discovers they attached the wrong file is the one interval with no
   * way out of it.
   */
  onCancel?: () => void;
  /** Copy on the cancel control. Default `'Cancel upload'`. */
  cancelLabel?: string;
  /** Copy on the download control. Default `'Download'`. */
  downloadLabel?: string;
  /** Copy on the remove control. Default `'Remove'`. */
  removeLabel?: string;
}

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

/** 44 on both axes for a glyph control, composed from the spacing scale. */
const TAP_SQUARE = 'min-w-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))]';

/**
 * **V4 attachment chip** — same props as {@link AttachmentChip} plus
 * `onCancel`, `cancelLabel`, `downloadLabel` and `removeLabel`.
 *
 * ## Four changes
 *
 * 1. **An upload in flight can be stopped.** The base suppressed *every*
 *    trailing action while `uploadProgress` was running, so the one moment a
 *    user needs an escape — they have just watched the wrong file start
 *    uploading — was the one moment the chip offered none. `onCancel` fills it;
 *    remove stays out of the way until the upload lands.
 * 2. **The progress is a progress bar.** It was a sentence, "Uploading… 40%",
 *    and nothing else: no role, no value, no drawn bar, so a reader had to
 *    re-read the line to learn whether anything had moved.
 * 3. **The download and remove controls are real targets.** Both were bare
 *    glyphs with no box — around 20px — and both dimmed on hover at M3's
 *    *disabled* band. They now clear 44 and answer with a state layer.
 * 4. **The icon well stops being a light-mode ramp step.** `bg-primary-50`
 *    painted a near-white tile on a dark page; the well is now the tone mixed
 *    into the card, which follows the scheme.
 */
export const AttachmentChipV4 = React.forwardRef<HTMLDivElement, AttachmentChipV4Props>(
  function AttachmentChipV4(
    {
      name,
      kind = 'file',
      size,
      uploadProgress,
      onClick,
      onDownload,
      onRemove,
      onCancel,
      cancelLabel = 'Cancel upload',
      downloadLabel = 'Download',
      removeLabel = 'Remove',
      className,
    },
    ref
  ) {
    injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);

    const glyph = KIND_GLYPH[kind] ?? KIND_GLYPH.file;
    const uploading = uploadProgress != null && uploadProgress >= 0 && uploadProgress < 1;
    const pct = uploading ? (clampPercent((uploadProgress ?? 0) * 100) ?? 0) : null;
    const rounded = pct == null ? null : Math.round(pct);

    const actionStyle = stateGroundVars(
      'var(--xen-surface)',
      'var(--xen-on-surface)'
    ) as React.CSSProperties;
    const actionClass = cn(
      'inline-flex shrink-0 items-center justify-center rounded-full',
      MIN_TAP_CLASS,
      TAP_SQUARE,
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
    );

    const well = (
      <span
        aria-hidden="true"
        style={{ backgroundColor: toneGround('primary') }}
        className={cn(
          'inline-flex h-xl w-xl shrink-0 items-center justify-center rounded-[var(--xen-radius-sm)] text-base leading-none',
          TONE_INK.primary
        )}
      >
        {glyph}
      </span>
    );

    const meta = (
      <span className="min-w-0 flex-1 text-left">
        <span className="block truncate text-sm font-semibold text-on-surface">{name}</span>
        {rounded != null ? (
          // The sentence stays — it is what a low-vision user reads — and the
          // value it was only ever describing is now exposed and drawn.
          <span
            role="progressbar"
            aria-label={name}
            aria-valuenow={rounded}
            aria-valuemin={0}
            aria-valuemax={100}
            className="block"
          >
            <span className={cn('block truncate text-xs', TONE_INK.muted)}>
              {`Uploading… ${rounded}%`}
            </span>
            <span
              aria-hidden="true"
              className="mt-xs block h-xs w-full overflow-hidden rounded-full bg-muted"
            >
              <span style={{ width: `${rounded}%` }} className="block h-full bg-primary" />
            </span>
          </span>
        ) : size ? (
          <span className={cn('block truncate text-xs', TONE_INK.muted)}>{size}</span>
        ) : null}
      </span>
    );

    return (
      <div
        ref={ref}
        aria-busy={uploading || undefined}
        className={cn(
          'inline-flex max-w-[calc(var(--xen-space-2xl)_*_5)] items-center gap-sm self-start',
          'rounded-[var(--xen-radius-md)] border border-border bg-surface px-sm py-xs',
          className
        )}
      >
        {onClick ? (
          <button
            type="button"
            aria-label={spokenLine([
              `Attachment ${name}`,
              size,
              rounded != null ? `uploading ${rounded}%` : undefined,
            ])}
            onClick={onClick}
            data-xen-v4-state=""
            style={actionStyle}
            className={cn(
              'inline-flex min-w-0 flex-1 items-center gap-sm rounded-[var(--xen-radius-sm)] px-xs text-left',
              MIN_TAP_CLASS,
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
            )}
          >
            {well}
            {meta}
          </button>
        ) : (
          // No handler, so it is not announced as a button.
          <span className="inline-flex min-w-0 flex-1 items-center gap-sm">
            {well}
            {meta}
          </span>
        )}

        {uploading && onCancel ? (
          <button
            type="button"
            aria-label={`${cancelLabel}, ${name}`}
            onClick={onCancel}
            data-xen-v4-state=""
            style={actionStyle}
            className={actionClass}
          >
            <span aria-hidden="true" className={cn('text-base leading-none', TONE_INK.muted)}>
              ×
            </span>
          </button>
        ) : null}

        {!uploading && onDownload ? (
          <button
            type="button"
            aria-label={`${downloadLabel} ${name}`}
            onClick={onDownload}
            data-xen-v4-state=""
            style={actionStyle}
            className={actionClass}
          >
            <span aria-hidden="true" className={cn('text-base leading-none', TONE_INK.muted)}>
              ⤓
            </span>
          </button>
        ) : null}

        {!uploading && onRemove ? (
          <button
            type="button"
            aria-label={`${removeLabel} ${name}`}
            onClick={onRemove}
            data-xen-v4-state=""
            style={actionStyle}
            className={actionClass}
          >
            <span aria-hidden="true" className={cn('text-base leading-none', TONE_INK.muted)}>
              ×
            </span>
          </button>
        ) : null}
      </div>
    );
  }
);
