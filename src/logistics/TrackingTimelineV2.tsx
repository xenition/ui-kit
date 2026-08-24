import * as React from 'react';
import { cn } from '../primitives/cn';
import {
  TRACKING_ORDER,
  TRACKING_META,
  trackingIndex,
  TONE_BG,
  TONE_ON_TEXT,
  TONE_SOFT_BG,
  type TrackingStage,
} from './internal';
import type { TrackingTimelineProps, TrackingEvent } from './TrackingTimeline';

/** Drop-in for {@link TrackingTimeline}: identical props, a distinct design. */
export type TrackingTimelineV2Props = TrackingTimelineProps;

/**
 * TrackingTimeline, alternate design **V2** — a *big vertical rail*. Larger
 * (32px) tone-filled nodes over a thick connector, with each stage's event
 * (time + detail) rendered inside its own tinted card beside the node so the
 * lifecycle **picked → in-transit → out-for-delivery → delivered** reads like a
 * courier tracking screen. Reached stages fill and carry a `✓`/glyph, current is
 * ringed and bold, upcoming are muted — always glyph + word, never color alone
 * (each node carries a redundant a11y label). An `exception` current stage
 * surfaces a danger head card. Empty/loading supported. No literal colors.
 */
export const TrackingTimelineV2 = React.forwardRef<HTMLDivElement, TrackingTimelineV2Props>(
  function TrackingTimelineV2({ current, events, loading = false, className, ...rest }, ref) {
    if (loading) {
      return (
        <div
          ref={ref}
          aria-busy="true"
          aria-label="Loading tracking"
          className={cn('flex flex-col gap-[var(--xen-space-lg)]', className)}
          {...rest}
        >
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-[var(--xen-space-md)]">
              <div className="h-8 w-8 animate-pulse rounded-full bg-neutral-200" />
              <div className="h-10 flex-1 animate-pulse rounded-[var(--xen-radius-md)] bg-neutral-100" />
            </div>
          ))}
        </div>
      );
    }

    const isException = current === 'exception';
    const currentIdx = isException ? -1 : trackingIndex(current);
    const eventFor = (stage: TrackingStage): TrackingEvent | undefined =>
      Array.isArray(events) ? events.find((e) => e.stage === stage) : undefined;

    return (
      <div ref={ref} className={cn('flex flex-col', className)} {...rest}>
        {isException ? (
          <div
            role="text"
            aria-label={`${TRACKING_META.exception.label}: needs attention`}
            className="mb-[var(--xen-space-md)] flex items-center gap-[var(--xen-space-md)] rounded-[var(--xen-radius-md)] bg-danger/10 p-[var(--xen-space-md)]"
          >
            <span
              aria-hidden="true"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-danger text-sm text-on-danger"
            >
              {TRACKING_META.exception.glyph}
            </span>
            <span className="text-base font-bold text-danger">{TRACKING_META.exception.label}</span>
          </div>
        ) : null}

        {TRACKING_ORDER.map((stage, i) => {
          const meta = TRACKING_META[stage];
          const reached = currentIdx >= 0 && i <= currentIdx;
          const isCurrent = i === currentIdx;
          const last = i === TRACKING_ORDER.length - 1;
          const connectorFilled = currentIdx >= 0 && i < currentIdx;
          const ev = eventFor(stage);

          return (
            <div
              key={stage}
              role="text"
              aria-label={`${meta.label}: ${reached ? (isCurrent ? 'current' : 'done') : 'upcoming'}`}
              className={cn('flex gap-[var(--xen-space-md)]', !last && 'pb-[var(--xen-space-md)]')}
            >
              <div className="flex flex-col items-center">
                <span
                  aria-hidden="true"
                  className={cn(
                    'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm',
                    reached
                      ? cn(TONE_BG[meta.tone], TONE_ON_TEXT[meta.tone])
                      : cn('border-2 text-muted', isCurrent ? 'border-primary' : 'border-border')
                  )}
                >
                  {reached ? (last ? '✓' : meta.glyph) : i + 1}
                </span>
                {!last ? (
                  <span
                    className={cn('mt-0.5 w-[3px] flex-1 rounded-full', connectorFilled ? TONE_BG[meta.tone] : 'bg-border')}
                  />
                ) : null}
              </div>

              <div className={cn('min-w-0 flex-1 rounded-[var(--xen-radius-md)] p-[var(--xen-space-sm)]', reached ? TONE_SOFT_BG[meta.tone] : 'bg-neutral-100')}>
                <div className="flex items-center justify-between gap-[var(--xen-space-sm)]">
                  <span
                    className={cn(
                      'text-sm',
                      isCurrent ? 'font-bold' : 'font-semibold',
                      reached ? 'text-on-surface' : 'text-muted'
                    )}
                  >
                    {meta.label}
                  </span>
                  {ev?.time ? <span className="text-xs text-muted">{ev.time}</span> : null}
                </div>
                {ev?.detail ? <p className="mt-0.5 line-clamp-2 text-xs text-muted">{ev.detail}</p> : null}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
);
