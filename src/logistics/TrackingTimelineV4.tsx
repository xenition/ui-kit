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
import type { TrackingTimelineProps, TrackingEvent } from './TrackingTimeline';

/** Drop-in for {@link TrackingTimelineProps} — same props, the V4 "dispatch" design. */
export type TrackingTimelineV4Props = TrackingTimelineProps;

/**
 * TrackingTimeline — **V4** "dispatch" design (web parity of the native V4), and
 * the ONE reserved gradient moment of the logistics V4 "dispatch" line: the
 * header (current stage glyph + word, and a frosted "N of 4" progress chip) rides
 * a brand-gradient ground (`bg-gradient-to-br from-primary-500 to-primary-700`)
 * in near-white ink (`text-primary-50` / `text-primary-100`). The body — the
 * canonical **picked → in-transit → out-for-delivery → delivered** rail — stays
 * on the plain surface: reached stages fill with their tone token + a glyph,
 * the current stage is ringed, upcoming stages are muted. Status is carried by
 * glyph + stage word (+ a redundant per-node `aria-label`), never color alone;
 * an `exception` current stage flags the hero with a danger word. Empty/loading
 * states supported. Identical props/behavior to {@link TrackingTimelineProps}.
 * All colors from `--xen-*` token classes / gradient utilities (no literals).
 */
export const TrackingTimelineV4 = React.forwardRef<HTMLDivElement, TrackingTimelineV4Props>(
  function TrackingTimelineV4({ current, events, loading = false, className, ...rest }, ref) {
    const shell = 'flex flex-col overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface shadow-sm';

    if (loading) {
      return (
        <div
          ref={ref}
          data-xen-tracking-timeline=""
          aria-label="Loading tracking"
          aria-busy="true"
          className={cn(shell, className)}
          {...rest}
        >
          <div className="flex flex-col gap-[var(--xen-space-sm)] bg-gradient-to-br from-primary-500 to-primary-700 p-[var(--xen-space-lg)]">
            <div className="h-4 w-1/2 rounded-[var(--xen-radius-sm)] bg-primary-50/25" />
            <div className="h-3 w-1/3 rounded-[var(--xen-radius-sm)] bg-primary-50/20" />
          </div>
          <div className="flex flex-col gap-[var(--xen-space-md)] p-[var(--xen-space-lg)]">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-[var(--xen-space-md)]">
                <div className="h-[22px] w-[22px] rounded-full bg-neutral-100" />
                <div className="h-2.5 flex-1 rounded-[var(--xen-radius-sm)] bg-neutral-100" />
              </div>
            ))}
          </div>
        </div>
      );
    }

    const isException = current === 'exception';
    const currentIdx = isException ? -1 : trackingIndex(current);
    const headMeta = TRACKING_META[current] ?? TRACKING_META.picked;
    const reachedCount = isException ? 0 : currentIdx + 1;
    const eventFor = (stage: TrackingStage): TrackingEvent | undefined =>
      Array.isArray(events) ? events.find((e) => e.stage === stage) : undefined;

    return (
      <div ref={ref} data-xen-tracking-timeline="" aria-label={`Tracking: ${headMeta.label}`} className={cn(shell, className)} {...rest}>
        {/* Reserved gradient moment: the tracking hero header. */}
        <div className="flex items-center justify-between gap-[var(--xen-space-sm)] bg-gradient-to-br from-primary-500 to-primary-700 p-[var(--xen-space-lg)] text-primary-50">
          <div className="flex min-w-0 flex-col gap-0.5">
            <span className="text-xs font-semibold uppercase tracking-wide text-primary-100">Tracking</span>
            <span className="flex items-center gap-[var(--xen-space-xs)] text-xl font-bold text-primary-50">
              <span aria-hidden="true">{headMeta.glyph}</span>
              {headMeta.label}
            </span>
          </div>
          <span
            className={cn(
              'inline-flex shrink-0 items-center gap-[var(--xen-space-xs)] rounded-full border border-primary-50/30 bg-primary-50/15 px-[var(--xen-space-md)] py-[var(--xen-space-xs)] text-sm font-bold text-primary-50',
              'tabular-nums'
            )}
          >
            {isException ? '⚠ Exception' : `${reachedCount} of ${TRACKING_ORDER.length}`}
          </span>
        </div>

        {/* Clean body: the vertical stage rail on the plain surface. */}
        <div className="flex flex-col p-[var(--xen-space-lg)]">
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
                    <span className={cn('mt-0.5 w-0.5 flex-1', connectorFilled ? TONE_BG[meta.tone] : 'bg-border')} />
                  ) : null}
                </div>

                <div className="min-w-0 flex-1 pb-[var(--xen-space-xs)]">
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
                    {ev?.time ? <span className="whitespace-nowrap text-xs tabular-nums text-muted">{ev.time}</span> : null}
                  </div>
                  {ev?.detail ? <p className="line-clamp-2 text-xs text-muted">{ev.detail}</p> : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);
