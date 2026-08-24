import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon, Button } from '../primitives';
import { DISC_TINT, BORDER_TINT, TEXT_TINT } from './internal/format';
import { outageState, utilityKind, type OutageState, type UtilityKind } from './internal/status';

export type { OutageState };

export interface OutageAlertProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Outage lifecycle — drives glyph + heading + tint (default `active`). */
  state?: OutageState;
  /** Optional affected utility line (adds its glyph/label to the heading). */
  kind?: UtilityKind;
  /** Affected area / description (e.g. "Downtown · ~1,200 customers"). */
  area?: string;
  /** Localized estimated-restoration string (shown for active/scheduled). */
  eta?: string;
  /** Longer message body. */
  message?: string;
  /** Details button label (default "View details"). Hidden when no `onDetails`. */
  detailsLabel?: string;
  /** Fires when the details action is pressed. */
  onDetails?: () => void;
}

/**
 * A prominent banner for a service outage / planned-maintenance event. Severity
 * is conveyed by **glyph + heading + a tint that traces to a semantic token**
 * (active → danger, scheduled → warn, resolved → success) — never color alone.
 * The estimated restoration is surfaced for active/scheduled events and
 * suppressed once resolved. An optional details `Button` renders only when
 * `onDetails` is supplied. Token-bound throughout. Web parity of the native
 * `OutageAlert`.
 */
export const OutageAlert = React.forwardRef<HTMLDivElement, OutageAlertProps>(function OutageAlert(
  { state = 'active', kind, area, eta, message, detailsLabel = 'View details', onDetails, className, ...rest },
  ref
) {
  const od = outageState(state);
  const kd = kind != null ? utilityKind(kind) : null;
  const heading = kd != null ? `${kd.label} ${od.heading.toLowerCase()}` : od.heading;
  const showEta = eta != null && state !== 'resolved';

  return (
    <div
      ref={ref}
      role="status"
      aria-label={`${heading}${area != null ? `, ${area}` : ''}`}
      className={cn(
        'flex flex-col gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border p-[var(--xen-space-lg)]',
        BORDER_TINT[od.color],
        DISC_TINT[od.color],
        className
      )}
      {...rest}
    >
      <div className="flex items-start gap-[var(--xen-space-md)]">
        <Icon glyph={od.glyph} size="xl" aria-label={od.label} />
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="text-base font-bold text-on-surface">{heading}</span>
          {area != null ? <span className="text-sm text-muted">{area}</span> : null}
          {message != null ? <p className="mt-0.5 text-sm text-on-surface">{message}</p> : null}
          {showEta ? (
            <span className={cn('mt-0.5 text-sm font-semibold', TEXT_TINT[od.color])}>
              Estimated restoration: {eta}
            </span>
          ) : null}
        </div>
      </div>
      {onDetails != null ? (
        <Button variant="outline" onClick={onDetails}>
          {detailsLabel}
        </Button>
      ) : null}
    </div>
  );
});
