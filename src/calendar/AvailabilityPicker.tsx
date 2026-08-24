import * as React from 'react';
import { cn } from '../primitives/cn';
import { EmptyState } from '../commerce';
import { clockLabel } from './format';
import type { AvailabilitySlot } from './types';

export interface AvailabilityPickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /** The bookable slots to show. */
  slots?: AvailabilitySlot[];
  /** Selected slot start(s). A single `Date` or an array when `multiple`. */
  value?: Date | Date[] | null;
  /** Allow selecting more than one slot. */
  multiple?: boolean;
  /** Columns in the slot grid (default 3, clamped ≥ 1). */
  columns?: number;
  /** Fires with the tapped slot's start instant. */
  onSelect?: (start: Date, slot: AvailabilitySlot) => void;
  /** Renders skeleton tiles instead of content. */
  loading?: boolean;
  /** Message shown when there are no slots. */
  emptyLabel?: string;
}

function isSelected(value: AvailabilityPickerProps['value'], start: Date): boolean {
  if (value == null) return false;
  const list = Array.isArray(value) ? value : [value];
  return list.some((d) => d.getTime() === start.getTime());
}

/**
 * A tap-to-book availability grid — bookable time slots laid out in a wrapping
 * grid, with disabled (blocked) slots rendered but not selectable. Each slot is
 * a real `<button>`; selection is exposed via `aria-checked` and a filled tile
 * (never color-alone). Includes empty + loading states. Token colors only.
 */
export const AvailabilityPicker = React.forwardRef<HTMLDivElement, AvailabilityPickerProps>(
  function AvailabilityPicker(
    {
      slots = [],
      value = null,
      multiple = false,
      columns = 3,
      onSelect,
      loading = false,
      emptyLabel = 'No times available',
      className,
      ...rest
    },
    ref
  ) {
    const cols = Math.max(1, Math.floor(columns));
    const gridStyle: React.CSSProperties = {
      gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
    };

    if (loading) {
      return (
        <div
          ref={ref}
          aria-busy="true"
          aria-label="Loading times"
          className={cn('grid gap-1', className)}
          style={gridStyle}
          {...rest}
        >
          {Array.from({ length: cols * 2 }).map((_, i) => (
            <div key={i} className="h-9 animate-pulse rounded-[var(--xen-radius-sm)] bg-neutral-100" />
          ))}
        </div>
      );
    }

    if (slots.length === 0) {
      return (
        <div ref={ref} className={className} {...rest}>
          <EmptyState title={emptyLabel} />
        </div>
      );
    }

    return (
      <div
        ref={ref}
        role="group"
        className={cn('grid gap-1', className)}
        style={gridStyle}
        {...rest}
      >
        {slots.map((slot, i) => {
          const selected = isSelected(value, slot.start);
          const disabled = slot.disabled === true;
          const text = slot.label ?? clockLabel(slot.start);
          return (
            <button
              key={slot.start.toISOString() + i}
              type="button"
              role={multiple ? 'checkbox' : 'radio'}
              aria-label={text}
              aria-checked={selected}
              disabled={disabled}
              onClick={() => onSelect?.(slot.start, slot)}
              className={cn(
                'flex items-center justify-center rounded-[var(--xen-radius-sm)] border px-2 py-2 text-sm transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
                selected
                  ? 'border-primary bg-primary text-on-primary font-bold'
                  : 'border-border bg-surface text-on-surface font-medium enabled:hover:bg-primary-50',
                disabled ? 'cursor-not-allowed bg-neutral-100 text-muted line-through opacity-60' : ''
              )}
            >
              {text}
            </button>
          );
        })}
      </div>
    );
  }
);
