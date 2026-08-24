import * as React from 'react';
import { cn } from '../primitives/cn';

/** The four fulfilment stages, in order. */
export type OrderStage = 'placed' | 'preparing' | 'out-for-delivery' | 'delivered';

export type OrderStatusTrackerVariant = 'horizontal' | 'vertical';

/** Per-stage completion relative to the current stage. */
type StepState = 'complete' | 'current' | 'upcoming';

export interface OrderStatusTrackerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The stage the order is currently in. */
  status: OrderStage;
  /** Layout orientation (default `horizontal`). */
  variant?: OrderStatusTrackerVariant;
  /** Override the default per-stage labels. */
  labels?: Partial<Record<OrderStage, string>>;
  /** Optional per-stage timestamp/subtext (e.g. "12:04 PM"). */
  timestamps?: Partial<Record<OrderStage, string>>;
  /** Marks the order cancelled — the current step reads as failed. */
  cancelled?: boolean;
}

const ORDER: readonly OrderStage[] = ['placed', 'preparing', 'out-for-delivery', 'delivered'];

const DEFAULT_LABELS: Record<OrderStage, string> = {
  placed: 'Order placed',
  preparing: 'Preparing',
  'out-for-delivery': 'Out for delivery',
  delivered: 'Delivered',
};

/** Announced words per state — a11y must not rely on color alone. */
const STATE_WORD: Record<StepState, string> = {
  complete: 'completed',
  current: 'in progress',
  upcoming: 'upcoming',
};

/** Token marker classes per state — a glyph is ALSO drawn, never color-alone. */
function markerClass(state: StepState, failed: boolean): string {
  if (failed) return 'border-danger bg-danger text-on-danger';
  if (state === 'complete') return 'border-success bg-success text-on-success';
  if (state === 'current') return 'border-primary bg-primary text-on-primary';
  return 'border-border bg-surface text-muted';
}

/**
 * A four-stage delivery progress tracker: placed → preparing → out for delivery
 * → delivered. Completed steps show a check glyph, the current step a filled
 * dot, upcoming steps a hollow ring — and every step is *also* announced with
 * its state word ("completed" / "in progress" / "upcoming") so status is never
 * conveyed by color alone. `variant` switches horizontal vs. vertical. When
 * `cancelled`, the current step reads as failed. Web parity of the native
 * `OrderStatusTracker`; token-only, `role="progressbar"`.
 */
export const OrderStatusTracker = React.forwardRef<HTMLDivElement, OrderStatusTrackerProps>(
  function OrderStatusTracker(
    { status, variant = 'horizontal', labels, timestamps, cancelled = false, className, ...rest },
    ref
  ) {
    const currentIndex = Math.max(0, ORDER.indexOf(status));
    const vertical = variant === 'vertical';

    const stepState = (index: number): StepState => {
      if (index < currentIndex) return 'complete';
      if (index === currentIndex) return 'current';
      return 'upcoming';
    };

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={ORDER.length}
        aria-valuenow={currentIndex + 1}
        className={cn(vertical ? 'flex flex-col' : 'flex flex-row items-start', className)}
        {...rest}
      >
        {ORDER.map((stage, index) => {
          const state = stepState(index);
          const failed = cancelled && state === 'current';
          const label = labels?.[stage] ?? DEFAULT_LABELS[stage];
          const time = timestamps?.[stage];
          const glyph = failed ? '✕' : state === 'complete' ? '✓' : state === 'current' ? '●' : '○';
          const stateWord = failed ? 'cancelled' : STATE_WORD[state];
          const isLast = index === ORDER.length - 1;
          const leftFilled = index <= currentIndex;
          const rightFilled = index < currentIndex;

          const marker = (
            <span
              aria-hidden="true"
              className={cn(
                'inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold leading-none',
                markerClass(state, failed)
              )}
            >
              {glyph}
            </span>
          );

          const textBlock = (
            <span className={cn('flex flex-col gap-0.5', !vertical && 'items-center text-center')}>
              <span
                className={cn(
                  'text-xs',
                  state === 'current' ? 'font-bold text-on-surface' : 'font-medium',
                  state === 'upcoming' ? 'text-muted' : 'text-on-surface'
                )}
              >
                {label}
              </span>
              {time ? <span className="text-xs text-muted">{time}</span> : null}
            </span>
          );

          const a11y = `${label}: ${stateWord}${time ? `, ${time}` : ''}`;

          if (vertical) {
            return (
              <div key={stage} aria-label={a11y} className="flex flex-row gap-[var(--xen-space-sm)]">
                <div className="flex flex-col items-center">
                  {marker}
                  {!isLast ? (
                    <span
                      aria-hidden="true"
                      className={cn('w-0.5 flex-1', rightFilled ? 'bg-success' : 'bg-border')}
                      style={{ minHeight: 24 }}
                    />
                  ) : null}
                </div>
                <div className={cn('flex-1', !isLast && 'pb-[var(--xen-space-lg)]')}>{textBlock}</div>
              </div>
            );
          }

          return (
            <div key={stage} aria-label={a11y} className="flex flex-1 flex-col items-center">
              <div className="flex w-full items-center">
                <span
                  aria-hidden="true"
                  className={cn('h-0.5 flex-1', index === 0 ? 'bg-transparent' : leftFilled ? 'bg-success' : 'bg-border')}
                />
                {marker}
                <span
                  aria-hidden="true"
                  className={cn('h-0.5 flex-1', isLast ? 'bg-transparent' : rightFilled ? 'bg-success' : 'bg-border')}
                />
              </div>
              <div className="mt-[var(--xen-space-xs)] px-0.5">{textBlock}</div>
            </div>
          );
        })}
      </div>
    );
  }
);
