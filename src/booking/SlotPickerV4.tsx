import * as React from 'react';
import { cn } from '../primitives/cn';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import { formatTimeInTz } from './datetime';
import { PERIOD_LABEL, groupSlotsByPeriod, type SlotPeriod } from './schedule-v4';
import type { BookingSlot } from './types';
import type { SlotPickerProps } from './SlotPicker';

export interface SlotPickerV4Props extends SlotPickerProps {
  /**
   * Group the slots under Morning / Afternoon / Evening headings. Default
   * `true`.
   *
   * A busy day is thirty chips in one undifferentiated wall, and a user
   * looking for "something after work" has to read all thirty. The buckets are
   * computed in the slot's **own** timezone, not the device's — a 9am
   * appointment in Lisbon is not an evening slot for a user in Tokyo.
   *
   * `false` restores the base's flat grid.
   */
  grouped?: boolean;
  /** Override the three bucket headings — they are English by default. */
  periodLabels?: Partial<Record<SlotPeriod, string>>;
  /**
   * Build the spots hint. Defaults to `'3 left'` under the threshold and
   * `'8 open'` above it; the base hard-coded both inside the component.
   */
  formatSpots?: (spotsLeft: number, low: boolean) => string;
  /** Copy for the empty state. Default `'No times available.'`. */
  emptyMessage?: string;
}

/** Whole class names per column count — Tailwind cannot follow `grid-cols-${n}`. */
const COLUMN_CLASS: Record<2 | 3 | 4, string> = {
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
};

/**
 * **V4 slot picker** — the web twin of the native `SlotPickerV4`, same props as
 * {@link SlotPicker} plus `grouped`, `periodLabels`, `formatSpots` and
 * `emptyMessage`.
 *
 * ## Five changes
 *
 * 1. **A day of slots has structure.** See `grouped`.
 * 2. **A full slot is disabled at M3's 0.38**, the number the whole kit uses
 *    for "you cannot have this", rather than this component's own 0.5.
 * 3. **Hover and press are the shared chrome layers** over the chip's own
 *    fill, not a ramp step that is near-white on a dark page.
 * 4. **Chips clear 44 and the type steps come from the scale.**
 * 5. **The copy is the host's** — `formatSpots`, `periodLabels`,
 *    `emptyMessage`, on top of the `fullLabel` the base already had.
 *
 * An empty `slots` renders the message, never a blank grid.
 */
export const SlotPickerV4 = React.forwardRef<HTMLDivElement, SlotPickerV4Props>(
  function SlotPickerV4(
    {
      slots,
      onPick,
      selected,
      formatTime,
      timeZone,
      columns = 3,
      lowSpotsThreshold = 3,
      fullLabel = 'Full',
      grouped = true,
      periodLabels,
      formatSpots,
      emptyMessage = 'No times available.',
      className,
      ...rest
    },
    ref
  ) {
    const format = formatTime ?? ((iso: string) => formatTimeInTz(iso, timeZone));
    const selectedStart = typeof selected === 'string' ? selected : (selected?.startsAt ?? null);
    const spots = formatSpots ?? ((n: number, low: boolean) => (low ? `${n} left` : `${n} open`));

    const list = slots ?? [];
    if (list.length === 0) {
      return (
        <div ref={ref} className={cn('p-md text-sm text-muted-text', className)} {...rest}>
          {emptyMessage}
        </div>
      );
    }

    const groups = grouped
      ? groupSlotsByPeriod(list, timeZone)
      : [{ period: 'morning' as SlotPeriod, slots: list }];

    const chip = (slot: BookingSlot): React.ReactElement => {
      const full = slot.spotsLeft <= 0;
      const isSelected = selectedStart === slot.startsAt;
      const low = !full && slot.spotsLeft <= lowSpotsThreshold;
      const hint = full ? fullLabel : spots(slot.spotsLeft, low);
      const timeLabel = format(slot.startsAt);

      return (
        <button
          key={slot.startsAt}
          type="button"
          aria-pressed={isSelected}
          aria-label={`${timeLabel}, ${hint}`}
          disabled={full}
          onClick={() => onPick?.(slot)}
          data-xen-v4-chrome={isSelected ? 'filled-primary' : 'on-surface'}
          className={cn(
            'flex flex-col items-center justify-center rounded-[var(--xen-radius-md)] border px-sm py-sm',
            MIN_TAP_CLASS,
            isSelected
              ? 'border-primary bg-primary text-on-primary'
              : 'border-border bg-card text-on-card'
          )}
        >
          <span className="text-sm font-semibold [font-variant-numeric:tabular-nums]">
            {timeLabel}
          </span>
          <span
            className={cn(
              'text-xs',
              isSelected
                ? 'text-on-primary'
                : // A low-spots hint is genuinely a caution — it is the fact
                  // that makes a user hurry — so it keeps `warn`. A plain
                  // count does not.
                  low && !full
                  ? 'text-warn-text'
                  : 'text-muted-text'
            )}
          >
            {hint}
          </span>
        </button>
      );
    };

    return (
      <div ref={ref} className={cn('flex flex-col gap-md', className)} {...rest}>
        {groups.map((group) => (
          <div key={group.period} className="flex flex-col gap-sm">
            {grouped ? (
              <h3 className="text-sm font-semibold text-muted-text">
                {periodLabels?.[group.period] ?? PERIOD_LABEL[group.period]}
              </h3>
            ) : null}
            <div className={cn('grid gap-sm', COLUMN_CLASS[columns])}>
              {group.slots.map(chip)}
            </div>
          </div>
        ))}
      </div>
    );
  }
);
