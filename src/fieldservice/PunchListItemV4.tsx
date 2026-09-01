import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { BadgeV4 } from '../primitives/BadgeV4';
import { CheckboxV4 } from '../primitives/CheckboxV4';
import { metaLine } from '../primitives/internal/tone-v4';
import {
  stateGroundVars,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../primitives/internal/v4-state';
import {
  ROW_V4_BASE_CLASS,
  ROW_V4_TEXT_CLASS,
  ROW_V4_TRAILING_CLASS,
  rowHeightClass,
} from '../dashboard/internal/row-v4';
import { BADGE_V4, spokenLine, type ToneV4 } from './internal/job-v4';
import type { PunchListItemProps, PunchSeverity } from './PunchListItem';

export interface PunchListItemV4Props extends PunchListItemProps {
  /** Override the severity words — three English words lived inside. */
  severityLabels?: Partial<Record<PunchSeverity, string>>;
}

const SEVERITY_V4: Record<PunchSeverity, { label: string; glyph: string; tone: ToneV4 }> = {
  minor: { label: 'Minor', glyph: '·', tone: 'neutral' },
  major: { label: 'Major', glyph: '▲', tone: 'warn' },
  critical: { label: 'Critical', glyph: '!', tone: 'danger' },
};

/**
 * **V4 punch-list item** — the web twin of the native `PunchListItemV4`, same
 * props as {@link PunchListItem} plus `severityLabels`.
 *
 * ## Four changes
 *
 * 1. **The whole row toggles, and it clears 44.** The target was a 16px
 *    checkbox on a surface used one-handed, outdoors, in gloves — while the
 *    description beside it, which is the part a thumb actually lands on, did
 *    nothing at all. The `<label>` now carries the row.
 * 2. **Severity, location and assignee join the control's name.** The
 *    checkbox announced the description alone, so a reader signing off a punch
 *    list heard the defect but never that it was critical, never where it was,
 *    and never whose it was.
 * 3. **An item with no `onToggle` is disabled, not enabled-and-inert.** The
 *    checkbox was fully controlled, so without a handler it could be clicked
 *    forever and never move.
 * 4. **It joins the shared row family** and takes the module's one badge
 *    shape, so a punch list and an inspection sheet read as one product.
 */
export const PunchListItemV4 = React.forwardRef<HTMLDivElement, PunchListItemV4Props>(
  function PunchListItemV4(
    { label, done, severity, location, assignee, onToggle, disabled = false, severityLabels, className, style },
    ref
  ) {
    injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);

    const sd = severity ? SEVERITY_V4[severity] : undefined;
    const severityWord = severity ? (severityLabels?.[severity] ?? sd?.label) : undefined;
    const meta = metaLine([location, assignee]);
    // A control nobody can move is disabled, not enabled-and-inert.
    const locked = disabled || onToggle == null;

    return (
      <div ref={ref} style={style} className={cn('w-full', className)}>
        <label
          data-xen-v4-state=""
          style={stateGroundVars('var(--xen-card)', 'var(--xen-on-card)') as React.CSSProperties}
          className={cn(
            ROW_V4_BASE_CLASS,
            rowHeightClass(meta !== ''),
            'rounded-[var(--xen-radius-md)]',
            locked ? 'cursor-default' : 'cursor-pointer'
          )}
        >
          <CheckboxV4
            checked={done}
            disabled={locked}
            onChange={(e) => onToggle?.(e.target.checked)}
            aria-label={spokenLine([label, severityWord, location, assignee])}
          />
          <span className={ROW_V4_TEXT_CLASS}>
            <span
              className={cn(
                'line-clamp-3 text-base font-semibold',
                done ? 'text-muted-text line-through' : 'text-on-card'
              )}
            >
              {label}
            </span>
            {meta !== '' ? <span className="text-xs text-muted-text">{meta}</span> : null}
          </span>
          {sd ? (
            <span className={ROW_V4_TRAILING_CLASS}>
              <BadgeV4 tone={sd.tone} {...BADGE_V4}>
                {`${sd.glyph} ${severityWord}`}
              </BadgeV4>
            </span>
          ) : null}
        </label>
      </div>
    );
  }
);
