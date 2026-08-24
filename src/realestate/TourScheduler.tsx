import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button } from '../primitives';
import { EmptyState } from '../commerce';

/** A bookable tour time slot. */
export interface TourSlot {
  /** Stable identifier. */
  id: string;
  /** Display label (e.g. "10:00 AM"). */
  label: string;
  /** Availability; defaults to `true`. Unavailable slots are disabled. */
  available?: boolean;
}

/** Presentation density for the {@link TourScheduler} slot grid. */
export type TourSchedulerVariant = 'grid' | 'list';

export interface TourSchedulerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional heading line above the slots. */
  title?: string;
  /** Human-readable date the slots belong to (e.g. "Sat, Aug 24"). */
  dateLabel?: string;
  /** Selectable time slots. Empty renders the shared `EmptyState`. */
  slots: TourSlot[];
  /** Controlled selected slot id; falls back to internal state. */
  selectedId?: string;
  /** Fires when a slot is tapped. */
  onSelectSlot?: (slot: TourSlot) => void;
  /** Fires when the confirm button is pressed with the chosen slot. */
  onSchedule?: (slot: TourSlot) => void;
  /** Confirm button label (default "Schedule tour"). */
  confirmLabel?: string;
  /** Layout of the slot chips. */
  variant?: TourSchedulerVariant;
  /** Disables the confirm button while a request is in flight. */
  loading?: boolean;
}

/**
 * Web parity of the native `TourScheduler`: a grid (or list) of selectable time
 * slots plus a confirm button. Works controlled (`selectedId`) or uncontrolled;
 * the confirm button stays disabled until an available slot is chosen, then fires
 * `onSchedule` with it. Presentational: slots in, callbacks out, nothing fetches.
 * Empty `slots` degrades to the shared `EmptyState`. Selection is conveyed via
 * `aria-pressed`, not color alone. All colors come from the `--xen-*` tokens —
 * no literal colors.
 */
export const TourScheduler = React.forwardRef<HTMLDivElement, TourSchedulerProps>(
  function TourScheduler(
    {
      title = 'Schedule a tour',
      dateLabel,
      slots,
      selectedId,
      onSelectSlot,
      onSchedule,
      confirmLabel = 'Schedule tour',
      variant = 'grid',
      loading = false,
      className,
      ...rest
    },
    ref
  ) {
    const [internal, setInternal] = React.useState<string | undefined>(undefined);
    const active = selectedId ?? internal;

    const shell = (children: React.ReactNode): React.ReactElement => (
      <div
        ref={ref}
        className={cn(
          'flex flex-col gap-3 border border-border bg-surface p-[var(--xen-space-lg)]',
          'rounded-[var(--xen-radius-lg)]',
          className
        )}
        {...rest}
      >
        <span className="flex flex-col gap-0.5">
          <span className="text-base font-semibold text-on-surface">{title}</span>
          {dateLabel ? <span className="text-sm text-muted">{dateLabel}</span> : null}
        </span>
        {children}
      </div>
    );

    if (slots.length === 0) {
      return shell(
        <EmptyState
          title="No tour times available"
          description="Check back soon or request a custom time."
        />
      );
    }

    const selectedSlot = slots.find((s) => s.id === active);

    const handleSelect = (slot: TourSlot): void => {
      if (slot.available === false) return;
      setInternal(slot.id);
      onSelectSlot?.(slot);
    };

    return shell(
      <>
        <div className={cn('flex gap-2', variant === 'grid' ? 'flex-wrap' : 'flex-col')}>
          {slots.map((slot) => {
            const disabled = slot.available === false;
            const isSelected = slot.id === active;
            return (
              <button
                key={slot.id}
                type="button"
                disabled={disabled}
                aria-pressed={isSelected}
                aria-label={`${slot.label}${disabled ? ', unavailable' : isSelected ? ', selected' : ''}`}
                onClick={() => handleSelect(slot)}
                className={cn(
                  'border px-3 py-2 text-sm font-semibold rounded-[var(--xen-radius-md)]',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                  variant === 'grid' && 'min-w-[88px] text-center',
                  disabled && 'opacity-40',
                  isSelected
                    ? 'border-primary bg-primary text-on-primary'
                    : 'border-border bg-surface text-on-surface'
                )}
              >
                {slot.label}
              </button>
            );
          })}
        </div>

        <Button
          variant="primary"
          disabled={!selectedSlot || loading}
          onClick={() => {
            if (selectedSlot) onSchedule?.(selectedSlot);
          }}
        >
          {confirmLabel}
        </Button>
      </>
    );
  }
);
