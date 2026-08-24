import * as React from 'react';
import { cn } from '../primitives/cn';

/** Availability of a single seat. */
export type SeatStatus = 'available' | 'occupied' | 'selected';

/** A seat in the cabin map. */
export interface Seat {
  /** Stable id, typically the seat label, e.g. `'12A'`. */
  id: string;
  /** Visible/announced label (defaults to `id`). */
  label?: string;
  /** Whether the seat can be booked. Occupied seats are never selectable. */
  occupied?: boolean;
}

export interface SeatPickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /** Rows of seats; each inner array is one row across the aisle. */
  rows: readonly (readonly Seat[])[];
  /** Ids of the currently selected seats. */
  selectedIds?: readonly string[];
  /** Row-label letters/numbers shown on the left gutter (optional, per row). */
  rowLabels?: readonly string[];
  /** Fires with the pressed seat when an available seat is toggled. */
  onSelect?: (seat: Seat) => void;
  /** Max simultaneously selectable seats (informational; enforcement is caller-side). */
  maxSelectable?: number;
}

/** [background, foreground, border] token classes per resolved status. */
const STATUS_CLASS: Record<SeatStatus, string> = {
  available: 'bg-surface text-on-surface border-border',
  occupied: 'bg-border text-muted border-border',
  selected: 'bg-primary text-on-primary border-primary',
};

/** Glyph reinforces status so it is never conveyed by color alone. */
const STATUS_GLYPH: Record<SeatStatus, string> = {
  available: '',
  occupied: '✕',
  selected: '✓',
};

/**
 * Web parity of the native `SeatPicker`: a cabin seat map — a grid of `<button>`
 * seats. Each seat announces its label and status via `aria-label`,
 * `aria-pressed` (selected) and `aria-disabled` (occupied) and carries a glyph
 * (`✓` selected, `✕` occupied), so state never depends on color alone. Occupied
 * seats are disabled and never fire `onSelect`. Selection is controlled via
 * `selectedIds`. Token-only colors.
 */
export const SeatPicker = React.forwardRef<HTMLDivElement, SeatPickerProps>(function SeatPicker(
  { rows, selectedIds = [], rowLabels, onSelect, maxSelectable, className, ...rest },
  ref
) {
  const selected = React.useMemo(() => new Set(selectedIds), [selectedIds]);

  const statusOf = (seat: Seat): SeatStatus => {
    if (seat.occupied) return 'occupied';
    return selected.has(seat.id) ? 'selected' : 'available';
  };

  return (
    <div
      ref={ref}
      data-xen-seat-picker=""
      className={cn('inline-flex flex-col gap-[var(--xen-space-sm)]', className)}
      {...rest}
    >
      {rows.map((seats, r) => {
        const rowLabel = rowLabels && r < rowLabels.length ? rowLabels[r] : String(r + 1);
        return (
          <div key={`row-${r}`} className="flex items-center gap-[var(--xen-space-xs)]">
            <span className="w-5 text-center text-xs text-muted">{rowLabel}</span>
            {seats.map((seat, c) => {
              const status = statusOf(seat);
              const label = seat.label ?? seat.id;
              const disabled = status === 'occupied';
              const glyph = STATUS_GLYPH[status];
              return (
                <button
                  key={seat.id || `seat-${r}-${c}`}
                  type="button"
                  aria-label={`Seat ${label}, ${status === 'selected' ? 'selected' : status}`}
                  aria-pressed={status === 'selected'}
                  aria-disabled={disabled}
                  disabled={disabled}
                  onClick={disabled ? undefined : () => onSelect?.(seat)}
                  className={cn(
                    'flex h-9 w-9 items-center justify-center rounded-[var(--xen-radius-sm)] border text-xs font-semibold',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
                    STATUS_CLASS[status],
                    disabled ? 'cursor-not-allowed opacity-60' : 'hover:opacity-90'
                  )}
                >
                  {glyph || label}
                </button>
              );
            })}
          </div>
        );
      })}
      {typeof maxSelectable === 'number' ? (
        <span className="text-xs text-muted">{`Selected ${selected.size} of ${maxSelectable}`}</span>
      ) : null}
    </div>
  );
});
