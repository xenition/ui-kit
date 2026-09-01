import * as React from 'react';
import { cn } from '../primitives/cn';
import type { Seat, SeatStatus, SeatPickerProps } from './SeatPicker';

/** Drop-in for {@link SeatPickerProps} — same props, the V4 "journey" design. */
export type SeatPickerV4Props = SeatPickerProps;

/** Per-status cell classes for the boarding-pass seat map (token-only). */
const STATUS_CLASS: Record<SeatStatus, string> = {
  // Available seats read as clean surface tiles with a hairline edge.
  available: 'bg-surface text-on-surface border border-border hover:opacity-90',
  // Occupied seats are muted and non-interactive.
  occupied: 'bg-muted/40 text-muted border border-border cursor-not-allowed opacity-60',
  // Selected seats get the signature journey gradient with near-white ink.
  selected:
    'bg-gradient-to-br from-primary-400 to-primary-700 text-primary-50 border border-primary-600 shadow-sm',
};

/** Glyph reinforces status so it is never conveyed by color alone. */
const STATUS_GLYPH: Record<SeatStatus, string> = {
  available: '',
  occupied: '✕',
  selected: '✓',
};

/** Legend swatch classes mirror the seat states above. */
const LEGEND: readonly { status: SeatStatus; label: string }[] = [
  { status: 'available', label: 'Available' },
  { status: 'selected', label: 'Selected' },
  { status: 'occupied', label: 'Taken' },
];

/**
 * SeatPicker — **V4** "journey" design (web parity of the native V4). A refined
 * cabin seat map for the boarding-pass line: a grid of `<button>` seats where
 * the chosen seat is filled with the brand journey gradient
 * (`from-primary-400 to-primary-700`) and near-white glyph (the signature V4
 * touch), available seats sit as clean `surface` tiles, and occupied seats read
 * muted and disabled. A legend row explains the states. Same props/behavior as
 * {@link SeatPickerProps}: each seat announces its label and status via
 * `aria-label`, `aria-pressed` (selected) and `aria-disabled` (occupied) and
 * carries a glyph (`✓` selected, `✕` occupied), so state never depends on color
 * alone. Occupied seats never fire `onSelect`. Selection is controlled via
 * `selectedIds`. All colors from `--xen-*` token classes (no literal colors).
 */
export const SeatPickerV4 = React.forwardRef<HTMLDivElement, SeatPickerV4Props>(function SeatPickerV4(
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
                    'flex h-9 w-9 items-center justify-center rounded-[var(--xen-radius-md)] text-xs font-semibold',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
                    STATUS_CLASS[status]
                  )}
                >
                  {glyph || label}
                </button>
              );
            })}
          </div>
        );
      })}

      {/* Legend — the seat states, mirrored from the grid above. */}
      <div className="mt-[var(--xen-space-xs)] flex flex-wrap items-center gap-[var(--xen-space-md)]">
        {LEGEND.map(({ status, label }) => (
          <span key={status} className="flex items-center gap-[var(--xen-space-xs)] text-xs text-muted">
            <span
              aria-hidden="true"
              className={cn(
                'flex h-4 w-4 items-center justify-center rounded-[var(--xen-radius-sm)] text-[10px] leading-none',
                STATUS_CLASS[status]
              )}
            >
              {STATUS_GLYPH[status]}
            </span>
            {label}
          </span>
        ))}
      </div>

      {typeof maxSelectable === 'number' ? (
        <span className="text-xs text-muted">{`Selected ${selected.size} of ${maxSelectable}`}</span>
      ) : null}
    </div>
  );
});
