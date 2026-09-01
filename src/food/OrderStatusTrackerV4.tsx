import * as React from 'react';
import { cn } from '../primitives/cn';
import { ORDER_STAGES, stageIndex, spokenLine } from './internal/menu-v4';
import type { OrderStage, OrderStatusTrackerProps } from './OrderStatusTracker';

export interface OrderStatusTrackerV4Props extends OrderStatusTrackerProps {
  /**
   * Override the per-stage words. The same shape as the base's `labels`, which
   * still works and is consulted after this one.
   */
  stageLabels?: Partial<Record<OrderStage, string>>;
  /** Copy for a status that is not one of the four. Default `'Order status unavailable'`. */
  unknownLabel?: string;
}

/** Per-stage completion relative to the current stage. */
type StepState = 'complete' | 'current' | 'upcoming';

/**
 * The four stages, in the order they are drawn — the shared list, not a copy.
 * The two spellings were out of step until `order-v4.ts` was corrected, and a
 * local duplicate is how they would drift again.
 */
const ORDER: readonly OrderStage[] = ORDER_STAGES;

const DEFAULT_LABELS: Record<OrderStage, string> = {
  placed: 'Order placed',
  preparing: 'Preparing',
  'out-for-delivery': 'Out for delivery',
  delivered: 'Delivered',
};

/** Announced words per state — status is never carried by colour alone. */
const STATE_WORD: Record<StepState, string> = {
  complete: 'completed',
  current: 'in progress',
  upcoming: 'upcoming',
};

/** Token marker classes per state — a glyph is ALSO drawn, never colour alone. */
function markerClass(state: StepState, failed: boolean): string {
  if (failed) return 'border-danger bg-danger text-on-danger';
  if (state === 'complete') return 'border-success bg-success text-on-success';
  if (state === 'current') return 'border-primary bg-primary text-on-primary';
  return 'border-border bg-card text-muted-text';
}

/**
 * **V4 order status tracker** — the web twin of the native
 * `OrderStatusTrackerV4`, same props as {@link OrderStatusTracker} plus
 * `stageLabels` and `unknownLabel`.
 *
 * ## Four changes
 *
 * 1. **The tracker stops silencing itself.** `role="progressbar"` sat on the
 *    root, and that role is children-presentational — so every stage label,
 *    every timestamp and every per-step state word inside it was pruned. With
 *    no `aria-label` or `aria-valuetext` either, the whole component announced
 *    as an unnamed "1 of 4". The value now lives on an element that contains
 *    nothing, the steps are a real ordered list, and both are read.
 * 2. **An unrecognised status says so.** `Math.max(0, indexOf(status))` mapped
 *    a `-1` miss onto stage 1, so a typo — or a backend that adds a stage —
 *    rendered a confident, entirely wrong "Order placed, in progress".
 *    `stageIndex()` returns `undefined` and `unknownLabel` is what a user
 *    sees.
 * 3. **A cancelled order does not report as progressing.** It kept counting up
 *    through the progressbar's value while the step beside it read "cancelled".
 *    Cancelled drops the meter and says the word.
 * 4. **The upcoming marker is inked with the corrected slots** — `text-muted`
 *    is a fill, and `bg-surface` is the page, under a component that lives on
 *    a card.
 */
export const OrderStatusTrackerV4 = React.forwardRef<HTMLDivElement, OrderStatusTrackerV4Props>(
  function OrderStatusTrackerV4(
    {
      status,
      variant = 'horizontal',
      labels,
      stageLabels,
      timestamps,
      cancelled = false,
      unknownLabel = 'Order status unavailable',
      className,
      ...rest
    },
    ref
  ) {
    const vertical = variant === 'vertical';
    const currentIndex = stageIndex(status);
    const known = currentIndex !== undefined;

    const labelFor = (stage: OrderStage): string =>
      stageLabels?.[stage] ?? labels?.[stage] ?? DEFAULT_LABELS[stage];

    const stepState = (index: number): StepState => {
      if (currentIndex === undefined) return 'upcoming';
      if (index < currentIndex) return 'complete';
      if (index === currentIndex) return 'current';
      return 'upcoming';
    };

    const currentStage = known ? ORDER[currentIndex as number] : undefined;
    const groupLabel = known
      ? spokenLine([
          currentStage ? labelFor(currentStage) : undefined,
          cancelled ? 'cancelled' : `step ${(currentIndex as number) + 1} of ${ORDER.length}`,
        ])
      : unknownLabel;

    return (
      <div ref={ref} role="group" aria-label={groupLabel} className={cn('flex flex-col', className)} {...rest}>
        {/*
          The value, on an element that contains nothing. Inside `progressbar`
          every label below would be presentational again — which is the whole
          defect. A cancelled order carries no meter at all: it is not
          progressing, and a bar counting up beside the word "cancelled" is the
          component contradicting itself.
        */}
        {known && !cancelled ? (
          <span
            role="progressbar"
            aria-label={groupLabel}
            aria-valuemin={1}
            aria-valuemax={ORDER.length}
            aria-valuenow={(currentIndex as number) + 1}
            aria-valuetext={groupLabel}
            className="sr-only"
          />
        ) : null}

        {!known ? (
          <p role="status" className="text-sm text-muted-text">
            {unknownLabel}
          </p>
        ) : null}

        <ol className={cn(vertical ? 'flex flex-col' : 'flex flex-row items-start')}>
          {ORDER.map((stage, index) => {
            const state = stepState(index);
            const failed = cancelled && state === 'current';
            const label = labelFor(stage);
            const time = timestamps?.[stage];
            const glyph = failed
              ? '✕'
              : state === 'complete'
                ? '✓'
                : state === 'current'
                  ? '●'
                  : '○';
            const stateWord = failed ? 'cancelled' : STATE_WORD[state];
            const isLast = index === ORDER.length - 1;
            const leftFilled = known && index <= (currentIndex as number);
            const rightFilled = known && index < (currentIndex as number);

            const marker = (
              <span
                aria-hidden="true"
                className={cn(
                  'inline-flex h-xl w-xl shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold leading-none',
                  markerClass(state, failed)
                )}
              >
                {glyph}
              </span>
            );

            const textBlock = (
              <span className={cn('flex flex-col gap-xs', !vertical && 'items-center text-center')}>
                <span
                  className={cn(
                    'text-xs',
                    state === 'current' ? 'font-bold' : 'font-medium',
                    state === 'upcoming' ? 'text-muted-text' : 'text-on-card'
                  )}
                >
                  {label}
                </span>
                {time ? <span className="text-xs text-muted-text">{time}</span> : null}
                {/* The state is a word, not just a marker colour. */}
                <span className="sr-only">{stateWord}</span>
              </span>
            );

            if (vertical) {
              return (
                <li key={stage} className="flex flex-row gap-sm">
                  <span className="flex flex-col items-center">
                    {marker}
                    {!isLast ? (
                      <span
                        aria-hidden="true"
                        className={cn(
                          'w-[calc(var(--xen-space-xs)_/_2)] flex-1',
                          'min-h-[var(--xen-space-lg)]',
                          rightFilled ? 'bg-success' : 'bg-border'
                        )}
                      />
                    ) : null}
                  </span>
                  <span className={cn('flex-1', !isLast && 'pb-lg')}>{textBlock}</span>
                </li>
              );
            }

            return (
              <li key={stage} className="flex flex-1 flex-col items-center">
                <span className="flex w-full items-center">
                  <span
                    aria-hidden="true"
                    className={cn(
                      'h-[calc(var(--xen-space-xs)_/_2)] flex-1',
                      index === 0 ? 'bg-transparent' : leftFilled ? 'bg-success' : 'bg-border'
                    )}
                  />
                  {marker}
                  <span
                    aria-hidden="true"
                    className={cn(
                      'h-[calc(var(--xen-space-xs)_/_2)] flex-1',
                      isLast ? 'bg-transparent' : rightFilled ? 'bg-success' : 'bg-border'
                    )}
                  />
                </span>
                <span className="mt-xs px-xs">{textBlock}</span>
              </li>
            );
          })}
        </ol>
      </div>
    );
  }
);
