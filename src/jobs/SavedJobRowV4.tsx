import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { AvatarV4 } from '../primitives/AvatarV4';
import { BadgeV4 } from '../primitives/BadgeV4';
import { cn } from '../primitives/cn';
import {
  ROW_V4_BASE_CLASS,
  ROW_V4_CSS,
  ROW_V4_LEADING_CLASS,
  ROW_V4_STYLE_ID,
  ROW_V4_TEXT_CLASS,
  ROW_V4_TRAILING_CLASS,
  rowEdgeClass,
  rowHeightClass,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../dashboard/internal/row-v4';
import type { SavedJobRowProps } from './SavedJobRow';
import { EMPLOYMENT_LABEL } from './types';
import { SalaryRangeV4 } from './SalaryRangeV4';
import {
  cardStateVars,
  EMPLOYMENT_TONE_V4,
  FOCUS_RING_CLASS,
  MIN_TAP_CLASS,
  MIN_TAP_SQUARE_CLASS,
  relativeLabel,
  salaryLabelV4,
  spokenLine,
} from './internal/tone-v4';

export interface SavedJobRowV4Props extends SavedJobRowProps {
  /** Names the ★. Default `'Remove <title> from saved'`. */
  removeLabel?: string;
  /** Render the saved age. Default `'3d ago'`, floored. */
  formatRelative?: (iso: string) => string;
  /** The last row in a list — drops the separator that would hang off the end. */
  last?: boolean;
}

/**
 * **V4 saved job row** — same props as {@link SavedJobRow} plus `removeLabel`,
 * `formatRelative` and `last`.
 *
 * ## Six changes
 *
 * 1. **The ★ removes the job from the keyboard.** It was a `<button>` inside a
 *    `<div role="button">` whose Enter/Space handler ran `preventDefault()` on
 *    the bubbled keydown — which cancels the star's own activation and fires
 *    the row instead. So a keyboard user pressing Enter on "Remove from saved"
 *    removed nothing and opened the job. The row is now a plain container with
 *    a real `<button>` activation and the ★ as its **sibling**.
 * 2. **The ★ stops claiming to be a toggle.** It hard-coded
 *    `aria-pressed={true}`, so it announced "pressed" — a state the user can
 *    never change and that is not what the control does. Removing a job from a
 *    list is an action; it now announces as one.
 * 3. **The row is one accessible name.** The base's `aria-label` sat on a
 *    `generic` element, which ARIA forbids naming, so on Chrome and Firefox
 *    nothing carried the title at all and the pay and the saved age were
 *    separate stops.
 * 4. **Employment type stops spending a status colour** — `contract → warn`,
 *    `remote → success`. An arrangement is identity.
 * 5. **The saved age stops rounding up.** 25 days saved read "1mo ago".
 * 6. **It joins the shared row family** — one height, one 44 leading slot, one
 *    state layer, one separator — with `ListRow`, `NotificationItem` and
 *    `ConversationRow`, instead of its own `border-b` and `hover:opacity-95`.
 */
export const SavedJobRowV4 = React.forwardRef<HTMLDivElement, SavedJobRowV4Props>(
  function SavedJobRowV4(
    {
      job,
      savedAt,
      onClick,
      onRemove,
      removeLabel,
      formatRelative,
      last = false,
      className,
      ...rest
    },
    ref
  ) {
    React.useEffect(() => {
      injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);
      injectStyleOnce(ROW_V4_STYLE_ID, ROW_V4_CSS);
    }, []);

    const saved = relativeLabel(savedAt, formatRelative);
    const savedText = saved ? `Saved ${saved}` : undefined;
    const typeLabel = EMPLOYMENT_LABEL[job.type];
    const pay = salaryLabelV4(job.salary).text;

    const name = spokenLine([job.title, job.companyName, typeLabel, pay, savedText]);

    const summary = (
      <>
        <span className={ROW_V4_LEADING_CLASS}>
          <AvatarV4 src={job.companyLogoUrl} name={job.companyName} size="sm" alt="" />
        </span>
        <span className={ROW_V4_TEXT_CLASS}>
          <span className="truncate text-sm font-semibold text-on-card">{job.title}</span>
          <span className="truncate text-xs text-muted-text">{job.companyName}</span>
          {savedText ? <span className="text-xs text-muted-text">{savedText}</span> : null}
        </span>
      </>
    );

    return (
      <div
        ref={ref}
        data-xen-v4-saved-job-row=""
        data-xen-v4-row=""
        className={cn(ROW_V4_BASE_CLASS, rowHeightClass(true), !last && rowEdgeClass(), className)}
        {...rest}
      >
        {onClick ? (
          <button
            type="button"
            aria-label={name}
            onClick={() => onClick(job)}
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

        <span className={cn(ROW_V4_TRAILING_CLASS, 'gap-sm')}>
          {/*
            Drawn beside the row rather than inside its activation: a meter, a
            badge or a control inside `role="button"` is flattened to
            presentational, and the name above already carries both.
          */}
          <span aria-hidden="true" className="flex items-center gap-sm">
            <BadgeV4 tone={EMPLOYMENT_TONE_V4[job.type]} size="sm">
              {typeLabel}
            </BadgeV4>
            {job.salary ? <SalaryRangeV4 salary={job.salary} size="sm" glyph={null} /> : null}
          </span>

          {onRemove ? (
            <button
              type="button"
              aria-label={removeLabel ?? `Remove ${job.title} from saved`}
              onClick={() => onRemove(job)}
              data-xen-v4-state=""
              style={cardStateVars()}
              className={cn(
                'flex shrink-0 items-center justify-center rounded-[var(--xen-radius-full)]',
                'text-lg leading-none text-primary-text',
                MIN_TAP_SQUARE_CLASS,
                FOCUS_RING_CLASS
              )}
            >
              <span aria-hidden="true">★</span>
            </button>
          ) : null}
        </span>
      </div>
    );
  }
);
