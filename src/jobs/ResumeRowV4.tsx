import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { BadgeV4 } from '../primitives/BadgeV4';
import { ButtonV4 } from '../primitives/ButtonV4';
import { cn } from '../primitives/cn';
import { V4_STATE_CSS, V4_STATE_STYLE_ID } from '../primitives/internal/v4-state';
import type { ResumeRowProps } from './ResumeRow';
import {
  cardStateVars,
  FOCUS_RING_CLASS,
  metaLine,
  MIN_TAP_CLASS,
  MIN_TAP_SQUARE_CLASS,
  relativeLabel,
  spokenLine,
} from './internal/tone-v4';

export interface ResumeRowV4Props extends ResumeRowProps {
  /** The badge on the default résumé. Default `'Default'`. */
  defaultLabel?: string;
  /** Copy on the set-default action. Default `'Set default'`. */
  setDefaultLabel?: string;
  /** Names the ⬇. Default `'Download <name>'`. */
  downloadLabel?: string;
  /** Render the updated age. Default `'3d ago'`, floored. */
  formatRelative?: (iso: string) => string;
}

/**
 * **V4 résumé row** — same props as {@link ResumeRow} plus `defaultLabel`,
 * `setDefaultLabel`, `downloadLabel` and `formatRelative`.
 *
 * ## Five changes
 *
 * 1. **Download and Set default work from the keyboard.** Both were controls
 *    inside a `<div role="button">` carrying its own Enter/Space handler:
 *    their clicks were guarded with `stopPropagation`, their keydowns were
 *    not, so the row caught the bubbled key, called `preventDefault()` —
 *    which cancels the button's own activation — and opened the preview
 *    instead. Tab to Download, press Enter, download nothing. The row is a
 *    plain container now and both actions are **siblings** of the activation.
 * 2. **The row is announced.** The base's `aria-label` sat on a `generic`
 *    element, which ARIA forbids naming, so neither the file name nor the
 *    "default résumé" state reached a reader on Chrome or Firefox — and the
 *    updated age and file size were never in the label at all.
 * 3. **"Default" stops spending a status colour.** `<Badge tone="success">`
 *    said that one of three files being the default is *good news*. Which
 *    résumé is default is identity: a neutral chip says it, and the reader is
 *    not taught to ignore green.
 * 4. **The glyph controls are real tap targets.** ⬇ was a bare character —
 *    roughly 18 CSS pixels — in a row whose whole point is picking between
 *    files.
 * 5. **The tile and the meta line stop using tokens as something they are
 *    not.** The file tile was `bg-neutral-100`, a ramp step that inverts under
 *    a dark seed, and the meta line was `text-muted`, a fill slot with no
 *    contrast promise; press was `hover:opacity-95`, which is M3's *disabled*
 *    signal rather than a state layer.
 */
export const ResumeRowV4 = React.forwardRef<HTMLDivElement, ResumeRowV4Props>(function ResumeRowV4(
  {
    resume,
    onClick,
    onDownload,
    onSetDefault,
    defaultLabel = 'Default',
    setDefaultLabel = 'Set default',
    downloadLabel,
    formatRelative,
    className,
    ...rest
  },
  ref
) {
  React.useEffect(() => {
    injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);
  }, []);

  const updated = relativeLabel(resume.updatedAt, formatRelative);
  const meta = metaLine([updated, resume.sizeLabel]);
  const isDefault = !!resume.isDefault;

  const name = spokenLine([
    resume.name,
    isDefault ? defaultLabel : undefined,
    updated,
    resume.sizeLabel,
  ]);

  const summary = (
    <>
      <span
        aria-hidden="true"
        className={cn(
          'flex h-xl w-xl shrink-0 items-center justify-center',
          'rounded-[var(--xen-radius-sm)] border border-border bg-card text-lg'
        )}
      >
        📄
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-xs text-left">
        <span className="flex items-center gap-sm">
          <span className="min-w-0 shrink truncate text-sm font-semibold text-on-card">
            {resume.name}
          </span>
          {isDefault ? (
            // Identity, not status: which of three files is default is not
            // good news, it is a fact about the file.
            <BadgeV4 tone="neutral" size="sm">
              {defaultLabel}
            </BadgeV4>
          ) : null}
        </span>
        {meta ? <span className="text-xs text-muted-text">{meta}</span> : null}
      </span>
    </>
  );

  return (
    <div
      ref={ref}
      data-xen-v4-resume-row=""
      className={cn(
        'flex items-center gap-md rounded-[var(--xen-radius-md)] border border-border',
        'bg-card p-md text-on-card',
        className
      )}
      {...rest}
    >
      {onClick ? (
        <button
          type="button"
          aria-label={name}
          onClick={() => onClick(resume)}
          data-xen-v4-state=""
          style={cardStateVars()}
          className={cn(
            'flex min-w-0 flex-1 items-center gap-md rounded-[var(--xen-radius-md)] text-left',
            MIN_TAP_CLASS,
            FOCUS_RING_CLASS
          )}
        >
          {summary}
        </button>
      ) : (
        <div className="flex min-w-0 flex-1 items-center gap-md">{summary}</div>
      )}

      {/* Siblings of the row's activation, never descendants of it. */}
      <div className="flex shrink-0 items-center gap-xs">
        {!isDefault && onSetDefault ? (
          <ButtonV4
            variant="ghost"
            size="sm"
            onClick={() => onSetDefault(resume)}
            aria-label={spokenLine([setDefaultLabel, resume.name])}
            className={MIN_TAP_CLASS}
          >
            {setDefaultLabel}
          </ButtonV4>
        ) : null}
        {onDownload ? (
          <button
            type="button"
            aria-label={downloadLabel ?? `Download ${resume.name}`}
            onClick={() => onDownload(resume)}
            data-xen-v4-state=""
            style={cardStateVars()}
            className={cn(
              'flex items-center justify-center rounded-[var(--xen-radius-full)]',
              'text-lg leading-none text-primary-text',
              MIN_TAP_SQUARE_CLASS,
              FOCUS_RING_CLASS
            )}
          >
            <span aria-hidden="true">⬇</span>
          </button>
        ) : null}
      </div>
    </div>
  );
});
