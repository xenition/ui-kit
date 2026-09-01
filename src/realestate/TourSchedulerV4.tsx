import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button } from '../primitives';
import { EmptyState } from '../commerce';
import type { TourSchedulerProps, TourSlot } from './TourScheduler';

/** Drop-in for {@link TourSchedulerProps} — same props, the V4 "listing" design. */
export type TourSchedulerV4Props = TourSchedulerProps;

/**
 * TourScheduler — **V4** "listing" design (web parity of the native V4). The
 * editorial take on the tour scheduler: an elevated, rounded card with a date
 * line, a grid (or list) of soft-primary time-slot pills — the selected pill
 * fills solid primary — sized to a ≥44px tap target, plus a request/confirm
 * button. Same props/behavior as {@link TourSchedulerProps}: works controlled
 * (`selectedId`) or uncontrolled; the confirm button stays disabled until an
 * available slot is chosen, then fires `onSchedule` with it. Empty `slots`
 * degrades to the shared `EmptyState`. Selection is conveyed via `aria-pressed`,
 * not color alone. All colors come from the `--xen-*` tokens — no literal colors.
 */
export const TourSchedulerV4 = React.forwardRef<HTMLDivElement, TourSchedulerV4Props>(
  function TourSchedulerV4(
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
          'flex flex-col gap-3 rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-lg)] text-on-surface shadow-md',
          className
        )}
        {...rest}
      >
        <span className="flex flex-col gap-0.5">
          <span className="text-base font-bold text-on-surface">{title}</span>
          {dateLabel ? <span className="text-sm text-muted">{dateLabel}</span> : null}
        </span>
        {children}
      </div>
    );

    if (slots.length === 0) {
      return shell(
        <EmptyState title="No tour times available" description="Check back soon or request a custom time." />
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
                  'inline-flex min-h-[44px] items-center justify-center rounded-[var(--xen-radius-md)] border px-4 py-2 text-sm font-semibold',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                  variant === 'grid' && 'min-w-[88px] text-center',
                  disabled && 'opacity-40',
                  isSelected
                    ? 'border-primary bg-primary text-on-primary'
                    : 'border-primary/20 bg-primary/10 text-on-surface'
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
