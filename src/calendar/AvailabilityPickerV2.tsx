import * as React from 'react';
import { cn } from '../primitives/cn';
import { EmptyState } from '../commerce';
import { clockLabel } from './format';
import type { AvailabilitySlot } from './types';
import type { AvailabilityPickerProps } from './AvailabilityPicker';

/** Same public contract as {@link AvailabilityPicker} — a drop-in alternate design. */
export type AvailabilityPickerV2Props = AvailabilityPickerProps;

/**
 * AvailabilityPicker, redesigned (v2): **big time tiles**. Each slot is a large
 * rounded button; disabled slots dim, and the chosen slot(s) fill primary. Bolder
 * than v1. Same props, token-only.
 */
export const AvailabilityPickerV2 = React.forwardRef<HTMLDivElement, AvailabilityPickerV2Props>(
  function AvailabilityPickerV2({ slots, value, multiple = false, columns = 3, onSelect, loading = false, emptyLabel = 'No times available', className, ...rest }, ref) {
    const cols = Math.max(1, Math.trunc(columns));
    const colClass = cols === 2 ? 'grid-cols-2' : cols === 4 ? 'grid-cols-4' : 'grid-cols-3';
    if (loading) {
      return <div ref={ref} data-xen-availability-picker="" aria-busy="true" className={cn('grid gap-2', colClass, className)} {...rest}>{Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-11 animate-pulse rounded-lg bg-neutral-100" />)}</div>;
    }
    if (!slots || slots.length === 0) {
      return <EmptyState ref={ref} icon={<span className="text-3xl">🕐</span>} title={emptyLabel} className={className} {...rest} />;
    }
    const selectedTimes = new Set((Array.isArray(value) ? value : value ? [value] : []).map((d) => d.getTime()));

    return (
      <div ref={ref} data-xen-availability-picker="" role="group" aria-label="Available times" className={cn('grid gap-2', colClass, className)} {...rest}>
        {slots.map((slot: AvailabilitySlot, i) => {
          const selected = selectedTimes.has(slot.start.getTime());
          const label = slot.label ?? clockLabel(slot.start);
          return (
            <button
              key={`${slot.start.getTime()}-${i}`}
              type="button"
              role={multiple ? 'checkbox' : 'radio'}
              aria-checked={selected}
              aria-label={label}
              disabled={slot.disabled}
              onClick={() => onSelect?.(slot.start, slot)}
              className={cn('flex h-11 items-center justify-center rounded-lg border-2 text-sm font-semibold transition-colors', slot.disabled ? 'border-border text-muted opacity-50' : selected ? 'border-primary bg-primary text-on-primary' : 'border-border bg-surface text-on-surface hover:bg-primary/10')}
            >
              {label}
            </button>
          );
        })}
      </div>
    );
  }
);
