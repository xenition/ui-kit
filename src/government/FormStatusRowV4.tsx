import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { BadgeV4 } from '../primitives/BadgeV4';
import { IconV4 } from '../primitives/IconV4';
import {
  ROW_V4_BASE_CLASS,
  ROW_V4_LEADING_CLASS,
  ROW_V4_TEXT_CLASS,
  ROW_V4_TRAILING_CLASS,
  rowHeightClass,
} from '../dashboard/internal/row-v4';
import { metaLine } from '../primitives/internal/tone-v4';
import {
  stateGroundVars,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../primitives/internal/v4-state';
import type { FormStatusRowProps, FormStatusValue } from './FormStatusRow';
import { formStatus } from './internal/status';
import {
  BADGE_V4,
  isAdverse,
  labelledId,
  spokenLine,
  tintGround,
  tintInkClass,
} from './internal/civic-v4';

export interface FormStatusRowV4Props extends FormStatusRowProps {
  /** Why the form was rejected, or what action it needs. Rendered when adverse. */
  reason?: string;
  /** Override the six status words — `'Action needed'`, `'Rejected'`, … */
  statusLabels?: Partial<Record<FormStatusValue, string>>;
}

/**
 * **V4 form status row** — the web twin of the native `FormStatusRowV4`, same
 * props as {@link FormStatusRow} plus `reason` and `statusLabels`.
 *
 * ## Five changes
 *
 * 1. **"Action needed" can say what action.** `action-needed` and `rejected`
 *    are the two states this row exists to communicate and the prop interface
 *    had no field for why — the status that stops an application was a pill and
 *    nothing else. `reason` renders under the title and joins the row's name
 *    whenever {@link isAdverse} is true.
 * 2. **An interactive row is a real `<button>`.** The base was a `div` with
 *    `role="button"`, `tabIndex` and a hand-written Enter/Space handler: three
 *    approximations of what a button already does, and the mechanism behind the
 *    Space bug on `ServiceCard`.
 * 3. **One name carrying the agency and the date.** The fixed
 *    `` `Form ${n}, ${title}, ${status}` `` template dropped the agency that
 *    owns the form and the date it was filed — and `role="button"` makes the
 *    subtree presentational, so nothing else was reachable either.
 * 4. **The form number is labelled**, so a reader hears what "APP-77412"
 *    identifies rather than a string of digits, and the agency stops being
 *    glued on with a bare `·` span.
 * 5. **It joins the shared row family** — one height, one 44 leading slot, one
 *    state layer — so a form list, a complaint list and a settings list are one
 *    rhythm. `hover:opacity-80` is M3's *disabled* signal, `ring-primary-300`
 *    is a ramp step, and the leading disc's ink was the `success` / `danger`
 *    **fill** used as a glyph on a tint of itself.
 *
 * The reason is **not** put in a live region here, deliberately: this is a list
 * row, and twenty rejected forms queueing twenty announcements is the failure
 * mode `role="alert"` warnings exist to prevent. `PermitStatusV4` — one permit,
 * one screen — is where the announcement belongs.
 */
export const FormStatusRowV4 = React.forwardRef<HTMLDivElement, FormStatusRowV4Props>(
  function FormStatusRowV4(
    { formNumber, title, status, agency, date, onClick, reason, statusLabels, className, ...rest },
    ref
  ) {
    injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);

    if (!title) return null;

    const sd = formStatus(status);
    const word = statusLabels?.[status] ?? sd.label;
    const reference = labelledId('Form', formNumber);
    const adverse = isAdverse(status);
    const why = adverse ? reason : undefined;
    const caption = metaLine([reference, agency]);

    const rowClass = cn(ROW_V4_BASE_CLASS, rowHeightClass(true));

    const body = (
      <>
        <span
          aria-hidden
          className={cn(ROW_V4_LEADING_CLASS, 'rounded-[var(--xen-radius-full)]')}
          style={{ background: tintGround(sd.tone) }}
        >
          <IconV4 glyph={sd.glyph} className={tintInkClass(sd.tone)} />
        </span>
        <span className={ROW_V4_TEXT_CLASS}>
          <span className="truncate text-base font-semibold text-on-surface">{title}</span>
          {caption !== '' ? <span className="text-xs text-muted-text">{caption}</span> : null}
          {why != null ? (
            // The reason takes the state's contrast-corrected ink, so it reads
            // as part of the verdict rather than as another muted caption.
            <span className={cn('line-clamp-2 text-xs font-medium', tintInkClass(sd.tone))}>
              {why}
            </span>
          ) : null}
        </span>
        <span className={cn(ROW_V4_TRAILING_CLASS, 'flex-col items-end gap-xs')}>
          <BadgeV4 tone={sd.tone} {...BADGE_V4}>
            {`${sd.glyph} ${word}`}
          </BadgeV4>
          {date != null ? <span className="text-xs text-muted-text">{date}</span> : null}
        </span>
      </>
    );

    if (onClick == null) {
      return (
        <div ref={ref} className={cn(rowClass, className)} {...rest}>
          {body}
        </div>
      );
    }

    return (
      <div ref={ref} className={cn('w-full', className)} {...rest}>
        <button
          type="button"
          onClick={onClick}
          aria-label={spokenLine([title, reference, agency, word, why, date])}
          data-xen-v4-state=""
          style={stateGroundVars('var(--xen-surface)', 'var(--xen-on-surface)') as React.CSSProperties}
          className={cn(
            rowClass,
            'rounded-[var(--xen-radius-md)]',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
          )}
        >
          {body}
        </button>
      </div>
    );
  }
);
