import * as React from 'react';
import { cn } from '../primitives/cn';
import { EmptyState } from '../commerce';
import { clockLabel } from './format';
import type { AvailabilitySlot } from './types';
import type { AvailabilityPickerProps } from './AvailabilityPicker';

/** Same public contract as {@link AvailabilityPicker} — a drop-in alternate design. */
export type AvailabilityPickerV3Props = AvailabilityPickerProps;

/**
 * AvailabilityPicker, redesigned (v3): a **compact time-chip wrap**. Small rounded
 * time pills flow inline; disabled slots dim, and the chosen pill(s) fill primary —
 * dense for tight layouts. The opposite of v2's big tiles. Same props, token-only.
 * (`columns` is accepted for parity.)
 */
export const AvailabilityPickerV3 = React.forwardRef<HTMLDivElement, AvailabilityPickerV3Props>(
  function AvailabilityPickerV3({ slots, value, multiple = false, columns, onSelect, loading = false, emptyLabel = 'No times available', className, ...rest }, ref) {
    void columns;
    if (loading) {
      return <div ref={ref} data-xen-availability-picker="" aria-busy="true" className={cn('flex flex-wrap gap-1.5', className)} {...rest}>{Array.from({ length: 8 }).map((_, i) => <div key={i} className="h-8 w-16 animate-pulse rounded-full bg-neutral-100" />)}</div>;
    }
    if (!slots || slots.length === 0) {
      return <EmptyState ref={ref} icon={<span className="text-3xl">🕐</span>} title={emptyLabel} className={className} {...rest} />;
    }
    const selectedTimes = new Set((Array.isArray(value) ? value : value ? [value] : []).map((d) => d.getTime()));

    return (
      <div ref={ref} data-xen-availability-picker="" role="group" aria-label="Available times" className={cn('flex flex-wrap gap-1.5', className)} {...rest}>
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
              className={cn('rounded-full border px-3 py-1.5 text-sm font-semibold transition-colors', slot.disabled ? 'border-border text-muted opacity-50' : selected ? 'border-primary bg-primary text-on-primary' : 'border-border text-on-surface hover:bg-neutral-50')}
            >
              {label}
            </button>
          );
        })}
      </div>
    );
  }
);
