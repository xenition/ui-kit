import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { BadgeV4 } from '../primitives/BadgeV4';
import { IconV4 } from '../primitives/IconV4';
import {
  stateGroundVars,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../primitives/internal/v4-state';
import {
  ROW_V4_BASE_CLASS,
  ROW_V4_LEADING_CLASS,
  ROW_V4_TEXT_CLASS,
  ROW_V4_TRAILING_CLASS,
  rowHeightClass,
} from '../dashboard/internal/row-v4';
import { BADGE_V4, discGround, discInkClass, spokenLine, type ToneV4 } from './internal/job-v4';
import type { InspectionResult, InspectionRowProps } from './InspectionRow';

export interface InspectionRowV4Props extends InspectionRowProps {
  /** Override the result words — four English labels lived inside. */
  resultLabels?: Partial<Record<InspectionResult, string>>;
}

/**
 * Result → word, glyph and tone.
 *
 * `pending` is `neutral`, not `primary`: "nobody has inspected this yet" is an
 * absence of a result, and a brand-coloured pill beside a green Pass and a red
 * Fail reads as a third verdict.
 */
const RESULT_V4: Record<InspectionResult, { label: string; glyph: string; tone: ToneV4 }> = {
  pass: { label: 'Pass', glyph: '✓', tone: 'success' },
  fail: { label: 'Fail', glyph: '✕', tone: 'danger' },
  na: { label: 'N/A', glyph: '–', tone: 'neutral' },
  pending: { label: 'Pending', glyph: '○', tone: 'neutral' },
};

/**
 * **V4 inspection row** — the web twin of the native `InspectionRowV4`, same
 * props as {@link InspectionRow} plus `resultLabels`.
 *
 * ## Four changes
 *
 * 1. **The defect note is announced.** On a failed checkpoint the note *is*
 *    the reason for the failure — and it was exactly what the row's
 *    `` `${label}, ${result}` `` name replaced. The code goes into the name
 *    too.
 * 2. **The result is announced once.** The glyph disc carried the result as
 *    its accessible label and the pill carried it again, so a reader walking
 *    an inspection sheet heard "Fail, Fail" on every failing line.
 * 3. **An interactive row is a real `<button>`** that clears 44 and answers
 *    with a state layer, not a `div` with `role="button"` and a hand-written
 *    key handler at 36px.
 * 4. **It joins the shared row family**, so an inspection sheet, an equipment
 *    register and a materials list are one row height and one rhythm.
 */
export const InspectionRowV4 = React.forwardRef<HTMLDivElement, InspectionRowV4Props>(
  function InspectionRowV4({ label, result, code, note, onClick, resultLabels, className, style }, ref) {
    injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);

    const rd = RESULT_V4[result] ?? RESULT_V4.pending;
    const word = resultLabels?.[result] ?? rd.label;
    const rowClass = cn(ROW_V4_BASE_CLASS, rowHeightClass(code != null || note != null));

    const body = (
      <>
        <span
          aria-hidden
          className={cn(ROW_V4_LEADING_CLASS, 'rounded-[var(--xen-radius-full)]')}
          style={{ background: discGround(rd.tone) }}
        >
          <IconV4 glyph={rd.glyph} className={discInkClass(rd.tone)} />
        </span>
        <span className={ROW_V4_TEXT_CLASS}>
          <span className="line-clamp-2 text-base font-semibold text-on-card">{label}</span>
          {code != null ? <span className="text-xs text-muted-text">{code}</span> : null}
          {note != null ? <span className="text-xs text-muted-text">{note}</span> : null}
        </span>
        <span className={ROW_V4_TRAILING_CLASS}>
          <BadgeV4 tone={rd.tone} {...BADGE_V4}>
            {`${rd.glyph} ${word}`}
          </BadgeV4>
        </span>
      </>
    );

    if (onClick == null) {
      return (
        <div ref={ref} style={style} className={cn(rowClass, className)}>
          {body}
        </div>
      );
    }

    return (
      <div ref={ref} style={style} className={cn('w-full', className)}>
        <button
          type="button"
          onClick={onClick}
          aria-label={spokenLine([label, code, word, note])}
          data-xen-v4-state=""
          style={stateGroundVars('var(--xen-card)', 'var(--xen-on-card)') as React.CSSProperties}
          className={cn(rowClass, 'rounded-[var(--xen-radius-md)]')}
        >
          {body}
        </button>
      </div>
    );
  }
);
