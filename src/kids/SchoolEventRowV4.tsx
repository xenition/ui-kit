import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { BadgeV4 } from '../primitives/BadgeV4';
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
import type { SchoolEventRowProps, SchoolEventType } from './SchoolEventRow';
import { captionLine, FOCUS_RING_CLASS, spokenLine, type IdentityTone } from './internal/tone-v4';

export interface SchoolEventRowV4Props extends SchoolEventRowProps {
  /** Replace the seven type words. They were hard-coded English. */
  typeLabels?: Partial<Record<SchoolEventType, string>>;
}

/**
 * Glyph, default word and chip tone per event type.
 *
 * The base spent three status colours on what an event *is*: `exam → danger`,
 * `holiday → success`, `deadline → warn`. A calendar item's type is identity —
 * it is the same category tomorrow as it is today — and an exam is not a system
 * failure. The mapping here keeps the two brand slots the base already used and
 * folds the three status tones onto them: `success → accent`, `danger →
 * primary`, `warn → neutral`. Every type still carries a glyph and a word, so
 * nothing about it was ever riding on colour anyway.
 */
const TYPE_META_V4: Record<SchoolEventType, { glyph: string; label: string; tone: IdentityTone }> =
  {
    holiday: { glyph: '🏖️', label: 'Holiday', tone: 'accent' },
    exam: { glyph: '📝', label: 'Exam', tone: 'primary' },
    meeting: { glyph: '👥', label: 'Meeting', tone: 'primary' },
    trip: { glyph: '🚌', label: 'Trip', tone: 'accent' },
    activity: { glyph: '⚽', label: 'Activity', tone: 'primary' },
    deadline: { glyph: '⏳', label: 'Deadline', tone: 'neutral' },
    other: { glyph: '🏫', label: 'Event', tone: 'neutral' },
  };

/**
 * **V4 school event row** — same props as {@link SchoolEventRow} plus
 * `typeLabels`.
 *
 * ## Six changes
 *
 * 1. **An exam is not an error and a holiday is not a success.** `exam →
 *    danger`, `holiday → success` and `deadline → warn` spent three status
 *    colours on an event's *type*, which is identity. See
 *    {@link TYPE_META_V4} for the mapping that replaced them.
 * 2. **`trip` is `accent` again**, matching the native twin. A comment in this
 *    file said the web `Badge` had no `accent` tone; it has had one for a
 *    while, and the note had flattened `trip` onto `primary` on web only.
 * 3. **The row's accessible name reached nobody.** It was an `aria-label` on a
 *    plain `div` for every non-interactive row, which browsers ignore — and it
 *    dropped the time, the location and the child's name, which is most of why
 *    the row exists. The full name now belongs to a real `<button>`.
 * 4. **`{...rest}` is spread first.** It was spread after `onClick`, so a
 *    caller passing any handler through silently replaced the row's own.
 * 5. **It joins the shared row family** — one height, one 44 leading slot, one
 *    state layer — so a school calendar and a conversation list are one
 *    product. Press is that state layer, not `hover:bg-neutral-50`, a
 *    light-scheme ramp step that paints a near-white slab on a dark page.
 * 6. **The type words are replaceable**, in a component that ships to every
 *    locale.
 */
export const SchoolEventRowV4 = React.forwardRef<HTMLDivElement, SchoolEventRowV4Props>(
  function SchoolEventRowV4(
    { title, type = 'other', date, time, location, childName, typeLabels, onClick, className, ...rest },
    ref
  ) {
    React.useEffect(() => {
      injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);
      injectStyleOnce(ROW_V4_STYLE_ID, ROW_V4_CSS);
    }, []);

    if (!title) return null;

    const meta = TYPE_META_V4[type];
    const typeWord = typeLabels?.[type] ?? meta.label;
    const caption = captionLine([date, time, location]);
    const label = spokenLine([typeWord, title, date, time, location, childName]);

    const body = (
      <>
        <span className={cn(ROW_V4_LEADING_CLASS, 'text-xl leading-none')} aria-hidden="true">
          {meta.glyph}
        </span>
        <span className={ROW_V4_TEXT_CLASS}>
          <span className="truncate text-base font-semibold text-on-card">{title}</span>
          {caption ? <span className="truncate text-xs text-muted-text">{caption}</span> : null}
          {childName ? (
            <span className="truncate text-xs text-muted-text">
              <span aria-hidden="true">👶 </span>
              {childName}
            </span>
          ) : null}
        </span>
        <span className={ROW_V4_TRAILING_CLASS}>
          <BadgeV4 tone={meta.tone} variant="soft" size="sm">
            {typeWord}
          </BadgeV4>
        </span>
      </>
    );

    const shell = cn(
      ROW_V4_BASE_CLASS,
      rowHeightClass(caption !== '' || childName != null),
      rowGroundClass(false),
      className
    );

    if (!onClick) {
      return (
        <div {...rest} ref={ref} data-xen-school-event-row="" className={shell}>
          {body}
        </div>
      );
    }

    return (
      <button
        // Spread first: the base spread `{...rest}` after `onClick`.
        {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
        ref={ref as unknown as React.Ref<HTMLButtonElement>}
        type="button"
        data-xen-school-event-row=""
        aria-label={label}
        onClick={() => onClick()}
        data-xen-v4-row=""
        data-interactive="true"
        data-xen-v4-state=""
        style={rowStateVars()}
        className={cn(shell, FOCUS_RING_CLASS)}
      >
        {body}
      </button>
    );
  }
);
