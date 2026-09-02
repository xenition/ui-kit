import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { ButtonV4 } from '../primitives/ButtonV4';
import {
  ROW_V4_BASE_CLASS,
  ROW_V4_CSS,
  ROW_V4_LEADING_CLASS,
  ROW_V4_STYLE_ID,
  ROW_V4_TEXT_CLASS,
  ROW_V4_TRAILING_CLASS,
  rowGroundClass,
  rowHeightClass,
  rowStateVars,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../dashboard/internal/row-v4';
import {
  DOCUMENT_KIND_META_V4,
  FOCUS_RING_CLASS,
  formatBytes,
  metaLine,
  MIN_TAP_CLASS,
  spokenLine,
  toneGroundStyle,
} from './internal/tone-v4';
import type { PolicyDocumentRowProps } from './PolicyDocumentRow';

export interface PolicyDocumentRowV4Props extends PolicyDocumentRowProps {
  /**
   * File size in **bytes**, formatted by {@link formatSize}.
   *
   * The base took `size` as a pre-formatted string, so `formatSize` would have
   * had nothing to format. Both are accepted: a caller already passing `size`
   * keeps exactly today's output, and `sizeBytes` wins when both are given.
   */
  sizeBytes?: number;
  /** Render `sizeBytes`. Default `'1.2 MB'` — base-1000, as carriers quote. */
  formatSize?: (bytes: number) => string;
}

/**
 * **V4 policy document row** — same props as {@link PolicyDocumentRow} plus
 * `sizeBytes` and `formatSize`.
 *
 * ## Five changes
 *
 * 1. **Download is reachable from the keyboard.** This is the module's
 *    headline structural defect and this row is where it does the most damage.
 *    The Download `<Button>` sat *inside* a `div` carrying `role="button"`,
 *    `tabIndex` and a hand-written Enter/Space handler. Its click was guarded
 *    with `stopPropagation`; its keydown was not. Tab to Download, press
 *    Enter, and the row's handler catches the bubbled keydown, calls
 *    `preventDefault()` — which cancels the button's own activation, because
 *    Enter's default action on a button **is** that click — and fires the
 *    row's `onClick` instead. The document opens; nothing downloads; nothing
 *    says so. A mouse user never sees it. The row is now a plain container,
 *    the activation is a real `<button>` around the title and its meta line,
 *    and Download is its **sibling**. No guard, because there is nothing left
 *    to guard against.
 * 2. **Nesting a button inside `role="button"` was invalid ARIA anyway**, and
 *    it cost the row its own content: `aria-label="Auto declarations
 *    document"` replaced the subtree, so the kind, the size and the date were
 *    never announced. All three are folded into the name.
 * 3. **Download has a name that says what it downloads.** A documents list
 *    presents five identically-named "Download" buttons; a reader tabbing
 *    through them hears "Download, button" five times and cannot tell which
 *    file each one is.
 * 4. **The meta line has words.** It was built from
 *    `kind.replace('-', ' ')`, so every row read "id card" or "declaration" in
 *    lower case regardless of locale.
 * 5. **It joins the row family**, presses with a state layer rather than
 *    `hover:opacity-80`, clears 44 on both the row and the Download button,
 *    and focuses with `ring-ring` rather than the `ring-primary-300` ramp
 *    step.
 */
export const PolicyDocumentRowV4 = React.forwardRef<HTMLDivElement, PolicyDocumentRowV4Props>(
  function PolicyDocumentRowV4(
    {
      title,
      kind = 'policy',
      size,
      sizeBytes,
      date,
      downloadLabel = 'Download',
      formatSize = formatBytes,
      onClick,
      onDownload,
      className,
      ...rest
    },
    ref
  ) {
    React.useEffect(() => {
      injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);
      injectStyleOnce(ROW_V4_STYLE_ID, ROW_V4_CSS);
    }, []);

    if (!title) return null;

    const kd = DOCUMENT_KIND_META_V4[kind] ?? DOCUMENT_KIND_META_V4.policy;
    const sizeText = sizeBytes != null ? formatSize(sizeBytes) : size;
    const meta = metaLine([kd.label, sizeText, date]);
    const interactive = onClick != null;

    const content = (
      <>
        <span className={ROW_V4_LEADING_CLASS}>
          <span
            aria-hidden="true"
            className="flex h-full w-full items-center justify-center rounded-[var(--xen-radius-md)] text-base"
            style={toneGroundStyle('primary')}
          >
            {kd.glyph}
          </span>
        </span>
        <span className={ROW_V4_TEXT_CLASS}>
          <span className="truncate text-base font-semibold text-on-card">{title}</span>
          {meta !== '' ? <span className="truncate text-xs text-muted-text">{meta}</span> : null}
        </span>
      </>
    );

    return (
      <div
        ref={ref}
        data-xen-v4-row=""
        className={cn(ROW_V4_BASE_CLASS, rowHeightClass(meta !== ''), rowGroundClass(false), className)}
        {...rest}
      >
        {interactive ? (
          <button
            type="button"
            aria-label={spokenLine([title, kd.label, sizeText, date])}
            onClick={onClick}
            data-interactive="true"
            data-xen-v4-state=""
            style={rowStateVars()}
            className={cn(
              'flex min-w-0 flex-1 items-center gap-md rounded-[var(--xen-radius-md)] text-left',
              MIN_TAP_CLASS,
              FOCUS_RING_CLASS
            )}
          >
            {content}
          </button>
        ) : (
          <div className="flex min-w-0 flex-1 items-center gap-md">{content}</div>
        )}

        {/*
          A sibling of the activation. The visible word stays "Download" so the
          column reads as one action repeated; the accessible name says which
          document, and contains the visible label (WCAG 2.5.3).
        */}
        {onDownload != null ? (
          <span className={ROW_V4_TRAILING_CLASS}>
            <ButtonV4
              variant="ghost"
              size="sm"
              aria-label={`${downloadLabel} ${title}`}
              onClick={onDownload}
              className={MIN_TAP_CLASS}
            >
              {downloadLabel}
            </ButtonV4>
          </span>
        ) : null}
      </div>
    );
  }
);
