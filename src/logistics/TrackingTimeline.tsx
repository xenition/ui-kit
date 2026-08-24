import * as React from 'react';
import { cn } from '../primitives/cn';
import {
  TRACKING_ORDER,
  TRACKING_META,
  trackingIndex,
  TONE_BG,
  TONE_ON_TEXT,
  type TrackingStage,
} from './internal';

export interface TrackingEvent {
  /** Which lifecycle stage this event belongs to. */
  stage: TrackingStage;
  /** Human timestamp (e.g. `Mon 9:14 AM`). */
  time?: string;
  /** Location / note line under the stage title. */
  detail?: string;
}

export interface TrackingTimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The current stage reached: picked → in-transit → out-for-delivery → delivered. */
  current: TrackingStage;
  /** Optional per-stage events (timestamps / locations) to annotate the rail. */
  events?: TrackingEvent[];
  /** Muted skeleton rail while the tracking record loads. */
  loading?: boolean;
}

/**
 * Vertical delivery tracking rail over the canonical stages
 * **picked → in-transit → out-for-delivery → delivered**. Reached stages fill
 * with their tone token and are marked with a `✓`/glyph; the current stage is
 * ringed; upcoming stages are muted. Status is carried by glyph + stage word
 * (and a redundant `aria-label` per node), never color alone. An `exception`
 * current stage recolors the reached head to danger. Empty/loading states
 * supported. No literal colors. Web parity of the native `TrackingTimeline`.
 */
export const TrackingTimeline = React.forwardRef<HTMLDivElement, TrackingTimelineProps>(
  function TrackingTimeline({ current, events, loading = false, className, ...rest }, ref) {
    if (loading) {
      return (
        <div
          ref={ref}
          aria-busy="true"
          aria-label="Loading tracking"
          className={cn('flex flex-col gap-[var(--xen-space-md)]', className)}
          {...rest}
        >
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-[var(--xen-space-md)]">
              <div className="h-3.5 w-3.5 animate-pulse rounded-full bg-neutral-200" />
              <div className="h-2.5 flex-1 animate-pulse rounded-[var(--xen-radius-sm)] bg-neutral-100" />
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
            className="flex items-center gap-[var(--xen-space-md)] pb-[var(--xen-space-lg)]"
          >
            <span
              aria-hidden="true"
              className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-danger text-xs text-on-danger"
            >
              {TRACKING_META.exception.glyph}
            </span>
            <span className="text-sm font-bold text-danger">{TRACKING_META.exception.label}</span>
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
              className={cn('flex gap-[var(--xen-space-md)]', !last && 'pb-[var(--xen-space-lg)]')}
            >
              <div className="flex flex-col items-center">
                <span
                  aria-hidden="true"
                  className={cn(
                    'flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full text-xs',
                    reached
                      ? cn(TONE_BG[meta.tone], TONE_ON_TEXT[meta.tone])
                      : cn('border-2 text-muted', isCurrent ? 'border-primary' : 'border-border')
                  )}
                >
                  {reached ? (last ? '✓' : meta.glyph) : i + 1}
                </span>
                {!last ? (
                  <span
                    className={cn('mt-0.5 w-0.5 flex-1', connectorFilled ? TONE_BG[meta.tone] : 'bg-border')}
                  />
                ) : null}
              </div>

              <div className="min-w-0 flex-1 pb-[var(--xen-space-xs)]">
                <div className="flex items-center justify-between">
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
                {ev?.detail ? <p className="line-clamp-2 text-xs text-muted">{ev.detail}</p> : null}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
);
