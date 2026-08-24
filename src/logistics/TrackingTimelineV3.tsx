import * as React from 'react';
import { cn } from '../primitives/cn';
import { TRACKING_ORDER, TRACKING_META, trackingIndex, TONE_BG, TONE_ON_TEXT } from './internal';
import type { TrackingTimelineProps } from './TrackingTimeline';

/** Drop-in for {@link TrackingTimeline}: identical props, a distinct design. */
export type TrackingTimelineV3Props = TrackingTimelineProps;

/**
 * TrackingTimeline, alternate design **V3** — a *compact horizontal step bar*.
 * The four lifecycle stages **picked → in-transit → out-for-delivery →
 * delivered** sit left-to-right as small nodes joined by connector segments that
 * fill with tone once passed; each stage's glyph sits in the node and its word
 * sits below, with the current stage bolded — glyph + word, never color alone
 * (each node carries a redundant a11y label). The current stage's event
 * time/detail is summarised in a caption underneath. An `exception` current
 * stage collapses to a danger strip. Empty/loading supported. No literal colors.
 */
export const TrackingTimelineV3 = React.forwardRef<HTMLDivElement, TrackingTimelineV3Props>(
  function TrackingTimelineV3({ current, events, loading = false, className, ...rest }, ref) {
    if (loading) {
      return (
        <div
          ref={ref}
          aria-busy="true"
          aria-label="Loading tracking"
          className={cn('flex flex-col gap-[var(--xen-space-sm)]', className)}
          {...rest}
        >
          <div className="h-6 w-full animate-pulse rounded-full bg-neutral-100" />
          <div className="h-2.5 w-[60%] animate-pulse rounded-[var(--xen-radius-sm)] bg-neutral-100" />
        </div>
      );
    }

    if (current === 'exception') {
      const meta = TRACKING_META.exception;
      return (
        <div
          ref={ref}
          role="text"
          aria-label={`${meta.label}: needs attention`}
          className={cn(
            'flex items-center gap-[var(--xen-space-sm)] rounded-full bg-danger/10 px-[var(--xen-space-sm)] py-[var(--xen-space-sm)]',
            className
          )}
          {...rest}
        >
          <span aria-hidden="true" className="text-sm text-danger">
            {meta.glyph}
          </span>
          <span className="text-sm font-bold text-danger">{meta.label}</span>
        </div>
      );
    }

    const currentIdx = trackingIndex(current);
    const currentEvent = Array.isArray(events) ? events.find((e) => e.stage === current) : undefined;
    const caption = [currentEvent?.time, currentEvent?.detail].filter(Boolean).join(' · ');

    return (
      <div ref={ref} className={cn('flex flex-col gap-[var(--xen-space-sm)]', className)} {...rest}>
        <div className="flex items-start">
          {TRACKING_ORDER.map((stage, i) => {
            const meta = TRACKING_META[stage];
            const reached = currentIdx >= 0 && i <= currentIdx;
            const isCurrent = i === currentIdx;
            const last = i === TRACKING_ORDER.length - 1;
            const connectorFilled = currentIdx >= 0 && i < currentIdx;

            return (
              <div key={stage} className="flex flex-1 flex-col items-center">
                <div className="flex w-full items-center">
                  <span
                    className={cn(
                      'h-[3px] flex-1 rounded-full',
                      i === 0 ? 'bg-transparent' : reached ? TONE_BG[meta.tone] : 'bg-border'
                    )}
                  />
                  <span
                    role="text"
                    aria-label={`${meta.label}: ${reached ? (isCurrent ? 'current' : 'done') : 'upcoming'}`}
                    className={cn(
                      'flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full text-xs',
                      reached
                        ? cn(TONE_BG[meta.tone], TONE_ON_TEXT[meta.tone])
                        : cn('border-2 text-muted', isCurrent ? 'border-primary' : 'border-border')
                    )}
                  >
                    <span aria-hidden="true">{reached ? (last ? '✓' : meta.glyph) : i + 1}</span>
                  </span>
                  <span
                    className={cn(
                      'h-[3px] flex-1 rounded-full',
                      last ? 'bg-transparent' : connectorFilled ? TONE_BG[meta.tone] : 'bg-border'
                    )}
                  />
                </div>
                <span
                  className={cn(
                    'mt-[var(--xen-space-xs)] line-clamp-2 text-center text-xs',
                    isCurrent ? 'font-bold' : 'font-medium',
                    reached ? 'text-on-surface' : 'text-muted'
                  )}
                >
                  {meta.label}
                </span>
              </div>
            );
          })}
        </div>

        {caption ? <span className="truncate text-xs text-muted">{caption}</span> : null}
      </div>
    );
  }
);
