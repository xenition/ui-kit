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
import type { ComplaintPriority, ComplaintRowProps, ComplaintStatus } from './ComplaintRow';
import {
  BADGE_V4,
  IDENTITY_TONE,
  labelledId,
  spokenLine,
  tintGround,
  tintInkClass,
  type ToneV4,
} from './internal/civic-v4';

export interface ComplaintRowV4Props extends ComplaintRowProps {
  /** Override the four priority words — `'Low'`, `'Normal'`, `'High'`, `'Urgent'`. */
  priorityLabels?: Partial<Record<ComplaintPriority, string>>;
  /** Override the five status words — `'Open'`, `'In progress'`, … */
  statusLabels?: Partial<Record<ComplaintStatus, string>>;
}

/**
 * Status → word, glyph and tone.
 *
 * `open` and `assigned` are `neutral`, not `primary`: a request nobody has
 * looked at yet and one that has an owner are *stages*, and a brand-coloured
 * pill beside a green Resolved reads as a third verdict. The two states that
 * carry a real signal — in progress, resolved — keep theirs.
 */
const STATUS_V4: Record<ComplaintStatus, { label: string; glyph: string; tone: ToneV4 }> = {
  open: { label: 'Open', glyph: '🆕', tone: IDENTITY_TONE },
  assigned: { label: 'Assigned', glyph: '👤', tone: IDENTITY_TONE },
  'in-progress': { label: 'In progress', glyph: '🔧', tone: 'warn' },
  resolved: { label: 'Resolved', glyph: '✓', tone: 'success' },
  closed: { label: 'Closed', glyph: '✕', tone: 'neutral' },
};

const PRIORITY_V4: Record<ComplaintPriority, { label: string; glyph: string; tone: ToneV4 }> = {
  low: { label: 'Low', glyph: '↓', tone: 'neutral' },
  normal: { label: 'Normal', glyph: '•', tone: 'neutral' },
  high: { label: 'High', glyph: '↑', tone: 'warn' },
  urgent: { label: 'Urgent', glyph: '!', tone: 'danger' },
};

/**
 * **V4 complaint row** — the web twin of the native `ComplaintRowV4`, same
 * props as {@link ComplaintRow} plus `priorityLabels` and `statusLabels`.
 *
 * ## Five changes
 *
 * 1. **"Urgent" reaches a reader.** Priority is the module's only triage
 *    escalation, and the row's fixed
 *    `` `Request ${n}, ${title}, ${status}` `` name omitted it — so an urgent
 *    pothole and a routine one announced identically. Priority, category and
 *    the filing date all join the name.
 * 2. **An interactive row is a real `<button>`** rather than a `div` with
 *    `role="button"` and a hand-written Enter/Space handler — which also makes
 *    the two pills reachable, since `role="button"` renders its subtree
 *    presentational.
 * 3. **The ticket number is labelled.** A reader heard "311-88214" with no idea
 *    what it identified, and the category was glued on with a bare `·` span.
 * 4. **Open and Assigned stop wearing the brand colour.** They are stages, not
 *    outcomes; identity gets the neutral chip so `resolved` → success and
 *    `urgent` → danger stay the only coloured signals on the row.
 * 5. **It joins the shared row family** — one height, one 44 leading slot, one
 *    state layer. `hover:opacity-80` is M3's *disabled* band applied as press
 *    feedback, `ring-primary-300` is a ramp step that inverts in dark, and the
 *    leading disc drew its glyph in the `success` / `danger` **fill** on a tint
 *    of itself.
 */
export const ComplaintRowV4 = React.forwardRef<HTMLDivElement, ComplaintRowV4Props>(
  function ComplaintRowV4(
    {
      ticketNumber,
      title,
      status,
      category,
      priority,
      date,
      onClick,
      priorityLabels,
      statusLabels,
      className,
      ...rest
    },
    ref
  ) {
    injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);

    if (!title) return null;

    const sd = STATUS_V4[status] ?? STATUS_V4.open;
    const word = statusLabels?.[status] ?? sd.label;
    const pr = priority ? (PRIORITY_V4[priority] ?? PRIORITY_V4.normal) : undefined;
    const prWord = priority ? (priorityLabels?.[priority] ?? pr?.label) : undefined;
    // Low and Normal are the absence of an escalation; drawing them is noise.
    const showPriority = pr != null && (priority === 'high' || priority === 'urgent');
    const reference = labelledId('Request', ticketNumber);
    const caption = metaLine([reference, category]);

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
          <span className="flex flex-wrap items-center gap-xs">
            <BadgeV4 tone={sd.tone} {...BADGE_V4}>
              {`${sd.glyph} ${word}`}
            </BadgeV4>
            {showPriority && prWord != null ? (
              <BadgeV4 tone={pr.tone} {...BADGE_V4}>
                {`${pr.glyph} ${prWord}`}
              </BadgeV4>
            ) : null}
          </span>
        </span>
        {date != null ? (
          <span className={ROW_V4_TRAILING_CLASS}>
            <span className="text-xs text-muted-text">{date}</span>
          </span>
        ) : null}
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
          aria-label={spokenLine([
            title,
            reference,
            category,
            word,
            showPriority ? prWord : undefined,
            date,
          ])}
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
