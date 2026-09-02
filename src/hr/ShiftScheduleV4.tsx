import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { Card } from '../primitives/Card';
import { EmptyStateV4 } from '../primitives/EmptyStateV4';
import { V4_STATE_CSS, V4_STATE_STYLE_ID } from '../primitives/internal/v4-state';
import { StatusPillV4 } from './StatusPillV4';
import {
  cardStateVars,
  FOCUS_RING_CLASS,
  MIN_TAP_CLASS,
  spokenLine,
  toneGround,
} from './internal/tone-v4';
import { SHIFT_STATUS_META, type ShiftStatus } from './internal';
import type { Shift, ShiftScheduleProps } from './ShiftSchedule';

export interface ShiftScheduleV4Props extends ShiftScheduleProps {
  /** Copy in the assignee slot of an open shift. Default `'Unassigned'`. */
  unassignedLabel?: string;
  /** Next-step sentence under `emptyLabel`. Default `'Shifts you add will appear here.'` */
  emptyDescription?: string;
  /** Test hook. Every native `hr` component had one; no web one did. */
  testID?: string;
}

/** The sentence under the empty title — the base's, kept as the default. */
const EMPTY_DESCRIPTION = 'Shifts you add will appear here.';

/**
 * Resolve a shift's status from **one** source.
 *
 * The base asked two questions and believed both answers: `SHIFT_STATUS_META[
 * shift.status ?? …]` for the pill and `!shift.assignee` for the tint and the
 * body text. So `{ status: 'confirmed', assignee: undefined }` — an ordinary
 * shape for a roster where the assignment failed — drew a row tinted as open,
 * the words "Unassigned", and a "✓ Confirmed" pill, all at once. A shift with
 * nobody on it **is** open, whatever the caller passed.
 */
function shiftStatus(shift: Shift): { status: ShiftStatus; open: boolean } {
  const open = shift.assignee == null || shift.assignee === '';
  return { status: open ? 'open' : (shift.status ?? 'scheduled'), open };
}

/**
 * **V4 shift schedule** — the web twin of the native `ShiftScheduleV4`, same
 * props as {@link ShiftSchedule} plus `unassignedLabel`, `emptyDescription`
 * and `testID`.
 *
 * ## Five changes
 *
 * 1. **A row cannot be open and confirmed at once.** See {@link shiftStatus} —
 *    the tint, the body text and the pill now come from one derivation instead
 *    of two that disagreed.
 * 2. **A row's name carries who is on it and what state it is in.** `Shift
 *    09:00 to 17:00, Open` dropped the role, the location and the assignee, so
 *    a manager scanning a roster by ear could not tell two shifts apart.
 * 3. **The open-shift tint is the shared status ground.** Web used
 *    `bg-neutral-100` — a ramp step, which mirrors under `[data-theme="dark"]`
 *    and paints a near-white slab on a dark page — and native mixed its own
 *    tint, so an open shift was two different colours. Both are now the
 *    status's own tone at 10% over the card.
 * 4. **Press is a state layer**, not `hover:brightness-95`, which dims the
 *    row's own content the way M3 signals **disabled**.
 * 5. **The rows clear 44 and the empty state is the V4 one** — the base's
 *    `py-1.5` row was 30 tall on a roster whose rows are the only way to pick
 *    up a shift.
 */
export const ShiftScheduleV4 = React.forwardRef<HTMLDivElement, ShiftScheduleV4Props>(
  function ShiftScheduleV4(
    {
      shifts,
      dateLabel,
      variant = 'default',
      onSelectShift,
      emptyLabel = 'No shifts scheduled',
      unassignedLabel = 'Unassigned',
      emptyDescription = EMPTY_DESCRIPTION,
      testID,
      className,
    },
    ref
  ) {
    React.useEffect(() => {
      injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);
    }, []);

    const compact = variant === 'compact';
    const list = shifts?.filter((shift) => shift?.id != null) ?? [];

    if (list.length === 0) {
      return (
        <div ref={ref} data-testid={testID} className={className}>
          {dateLabel ? (
            <p className="mb-sm text-sm font-bold text-on-surface">{dateLabel}</p>
          ) : null}
          <EmptyStateV4 title={emptyLabel} description={emptyDescription} />
        </div>
      );
    }

    return (
      <Card ref={ref} data-testid={testID} className={cn('flex flex-col gap-sm', className)}>
        {dateLabel ? <p className="text-sm font-bold text-on-card">{dateLabel}</p> : null}
        <ul aria-label={dateLabel} className="flex flex-col gap-xs">
          {list.map((shift) => {
            const { status, open } = shiftStatus(shift);
            const meta = SHIFT_STATUS_META[status];
            const assignee = open ? unassignedLabel : shift.assignee;
            const rowClass = cn(
              'flex w-full items-center gap-sm rounded-[var(--xen-radius-md)] px-sm text-left',
              MIN_TAP_CLASS
            );
            // The status's own tone at 10% over the card — the same mix the
            // native twin makes, so an open shift is one colour on two
            // platforms. The state layer is mixed against that same ground, so
            // a hovered open shift does not tint as though it were on the card.
            const ground = open ? toneGround(meta.tone) : undefined;
            const rowStyle = ground ? { background: ground } : undefined;

            const inner = (
              <>
                <span className="w-[calc(var(--xen-space-2xl)*2)] shrink-0">
                  <span className="block text-sm font-semibold text-on-card">
                    {shift.start}–{shift.end}
                  </span>
                  {shift.role ? (
                    <span className="block truncate text-xs text-muted-text">{shift.role}</span>
                  ) : null}
                </span>
                <span className="min-w-0 flex-1">
                  <span
                    className={cn(
                      'block truncate text-sm',
                      open ? 'text-muted-text' : 'text-on-card'
                    )}
                  >
                    {assignee}
                  </span>
                  {!compact && shift.location ? (
                    <span className="block truncate text-xs text-muted-text">{shift.location}</span>
                  ) : null}
                </span>
              </>
            );

            const spoken = spokenLine([
              'Shift',
              `${shift.start} to ${shift.end}`,
              shift.role,
              assignee,
              shift.location,
              meta.label,
            ]);

            return (
              <li key={shift.id} className="flex items-center gap-sm" style={rowStyle}>
                {onSelectShift ? (
                  <button
                    type="button"
                    aria-label={spoken}
                    onClick={() => onSelectShift(shift)}
                    data-xen-v4-state=""
                    style={cardStateVars(ground)}
                    className={cn(rowClass, FOCUS_RING_CLASS)}
                  >
                    {inner}
                  </button>
                ) : (
                  <div className={rowClass}>{inner}</div>
                )}
                {/* Beside the activation, never inside it. */}
                <StatusPillV4
                  meta={meta}
                  size="sm"
                  className="mr-sm"
                  aria-hidden={onSelectShift ? true : undefined}
                />
              </li>
            );
          })}
        </ul>
      </Card>
    );
  }
);
