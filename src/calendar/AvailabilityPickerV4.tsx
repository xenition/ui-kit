import * as React from 'react';
import { cn } from '../primitives/cn';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import { SKELETON_CLASS } from './internal/grid-v4';
import type { AvailabilityPickerProps } from './AvailabilityPicker';

export interface AvailabilityPickerV4Props extends AvailabilityPickerProps {
  /** Locale for the slot times. Default: the browser's. */
  locale?: string;
  /** Announced for a slot that cannot be taken. Default `'Unavailable'`. */
  unavailableLabel?: string;
}

/** Whole class names — Tailwind's scanner cannot follow `grid-cols-${n}`. */
const COLS: Record<number, string> = {
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
};

/**
 * **V4 availability picker** — the web twin of the native
 * `AvailabilityPickerV4`, same props as {@link AvailabilityPicker} plus
 * `locale` and `unavailableLabel`.
 *
 * ## Four changes
 *
 * 1. **Every chip clears 44** — on the one control this component is.
 * 2. **A disabled slot is a `disabled` button**, not a greyed live one.
 * 3. **The times are localized and tabular.**
 * 4. **Multi-select announces itself** — the chips become checkboxes rather
 *    than buttons, so a reader hears what selecting does.
 */
export const AvailabilityPickerV4 = React.forwardRef<HTMLDivElement, AvailabilityPickerV4Props>(
  function AvailabilityPickerV4(
    {
      slots = [],
      value,
      multiple = false,
      columns = 3,
      locale,
      unavailableLabel = 'Unavailable',
      onSelect,
      loading = false,
      emptyLabel = 'No times available.',
      className,
      ...rest
    },
    ref
  ) {
    const grid = COLS[Math.max(2, Math.min(6, Math.floor(columns)))] ?? COLS[3]!;
    const timeFmt = React.useMemo(
      () => new Intl.DateTimeFormat(locale, { hour: 'numeric', minute: '2-digit' }),
      [locale]
    );

    if (loading) {
      return (
        <div ref={ref} className={cn('grid gap-sm', grid, className)} {...rest}>
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className={cn('h-11', SKELETON_CLASS)} />
          ))}
        </div>
      );
    }

    if (slots.length === 0) {
      return (
        <p ref={ref as React.Ref<HTMLDivElement>} className={cn('p-md text-sm text-muted-text', className)} {...rest}>
          {emptyLabel}
        </p>
      );
    }

    const chosen = Array.isArray(value) ? value : value ? [value] : [];
    const isChosen = (start: Date): boolean => chosen.some((d) => d.getTime() === start.getTime());

    return (
      <div
        ref={ref}
        role={multiple ? 'group' : 'radiogroup'}
        data-xen-availability-picker=""
        className={cn('grid gap-sm', grid, className)}
        {...rest}
      >
        {slots.map((slot) => {
          const selected = isChosen(slot.start);
          const blocked = slot.disabled === true;
          const label = slot.label ?? timeFmt.format(slot.start);

          return (
            <button
              key={slot.start.toISOString()}
              type="button"
              role={multiple ? 'checkbox' : 'radio'}
              aria-checked={selected}
              aria-label={[label, blocked ? unavailableLabel : null].filter(Boolean).join(', ')}
              disabled={blocked}
              onClick={() => onSelect?.(slot.start, slot)}
              data-xen-v4-chrome={selected ? 'filled-primary' : 'on-surface'}
              className={cn(
                'flex items-center justify-center rounded-[var(--xen-radius-md)] border px-sm text-sm font-semibold [font-variant-numeric:tabular-nums]',
                MIN_TAP_CLASS,
                selected
                  ? 'border-primary bg-primary text-on-primary'
                  : 'border-border bg-card text-on-card',
                blocked && 'opacity-[0.38]'
              )}
            >
              {label}
            </button>
          );
        })}
      </div>
    );
  }
);
