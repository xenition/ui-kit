import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon, Button } from '../primitives';
import { DISC_TINT, SOLID_TINT, TEXT_TINT, BORDER_TINT } from './internal/format';
import { outageState, type OutageState } from './internal/status';

export type { OutageState };

export interface OutageStep {
  label: string;
  time?: string;
  done?: boolean;
  current?: boolean;
}

export interface OutageTrackerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Outage lifecycle — drives heading, glyph, and tint (default `active`). */
  state?: OutageState;
  /** Affected area / description (e.g. "Downtown · ~1,200 customers"). */
  area?: string;
  /** Localized estimated-restoration string (hidden when resolved). */
  eta?: string;
  /** Timeline steps (default: Reported → Crew dispatched → Power restored). */
  steps?: OutageStep[];
  /** Fires when the details action is pressed; the button renders only then. */
  onDetails?: () => void;
}

const DEFAULT_STEPS: OutageStep[] = [
  { label: 'Reported', done: true },
  { label: 'Crew dispatched', current: true },
  { label: 'Power restored' },
];

/**
 * A clean-card outage progress timeline (web parity). The event state (active →
 * danger, scheduled → warn, resolved → success) is conveyed by **glyph + heading
 * + a tint that traces to a semantic token** — never color alone — over a soft
 * tinted header strip. A vertical timeline traces the restoration: a completed
 * step is a filled dot with a connector, the current step is ringed, and pending
 * steps are `border`-colored. The estimated restoration is shown for
 * active/scheduled events and suppressed once resolved. Token-bound throughout.
 */
export const OutageTracker = React.forwardRef<HTMLDivElement, OutageTrackerProps>(function OutageTracker(
  { state = 'active', area, eta, steps = DEFAULT_STEPS, onDetails, className, ...rest },
  ref
) {
  const od = outageState(state);
  const showEta = eta != null && state !== 'resolved';

  return (
    <div
      ref={ref}
      aria-label={`${od.heading}${area != null ? `, ${area}` : ''}`}
      className={cn('rounded-[var(--xen-radius-lg)] bg-surface border border-border shadow-lg p-5', className)}
      {...rest}
    >
      <div className={cn('flex items-start gap-[var(--xen-space-md)] rounded-[var(--xen-radius-md)] p-[var(--xen-space-md)]', DISC_TINT[od.color])}>
        <Icon glyph={od.glyph} size="xl" color={od.color} aria-label={od.label} />
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="text-base font-bold text-on-surface">{od.heading}</span>
          {area != null ? <span className="text-sm text-muted">{area}</span> : null}
          {showEta ? (
            <span className={cn('mt-0.5 text-sm font-semibold', TEXT_TINT[od.color])}>
              Estimated restoration: {eta}
            </span>
          ) : null}
        </div>
      </div>

      <div className="mt-[var(--xen-space-lg)] flex flex-col">
        {steps.map((step, i) => {
          const last = i === steps.length - 1;
          return (
            <div key={`${step.label}-${i}`} className="flex gap-[var(--xen-space-md)]">
              <div className="flex w-4 flex-col items-center">
                <span
                  aria-hidden="true"
                  className={cn(
                    'h-3.5 w-3.5 shrink-0 rounded-full border-2',
                    step.done
                      ? cn('border-transparent', SOLID_TINT[od.color])
                      : step.current
                        ? cn('bg-surface border-[3px]', BORDER_TINT[od.color])
                        : 'bg-surface border-border'
                  )}
                />
                {!last ? (
                  <span className={cn('w-0.5 flex-1 min-h-[var(--xen-space-lg)]', step.done ? SOLID_TINT[od.color] : 'bg-border')} />
                ) : null}
              </div>
              <div className={cn('flex flex-1 flex-col gap-0.5', last ? 'pb-0' : 'pb-[var(--xen-space-lg)]')}>
                <span className={cn('text-sm text-on-surface', step.current ? 'font-bold' : 'font-semibold')}>
                  {step.label}
                </span>
                {step.time != null ? <span className="text-xs text-muted">{step.time}</span> : null}
              </div>
            </div>
          );
        })}
      </div>

      {onDetails != null ? (
        <Button variant="outline" onClick={onDetails} className="mt-[var(--xen-space-md)]">
          View details
        </Button>
      ) : null}
    </div>
  );
});
