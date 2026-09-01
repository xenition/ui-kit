import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon, Badge, Button } from '../primitives';
import { BORDER_TINT, TEXT_TINT } from './internal/format';
import { outageState, utilityKind } from './internal/status';
import type { OutageAlertProps } from './OutageAlert';

/** Drop-in for {@link OutageAlertProps} — same props, a different design. */
export type OutageAlertV4Props = OutageAlertProps;

/**
 * OutageAlert — **V4** design. A cleaner elevated card that keeps the severity
 * signal (active → danger, scheduled → warn, resolved → success via
 * `outageState`) carried by glyph + heading + a semantic tint (never color
 * alone): a thin tinted top rail and a tinted status pill + ETA line. The kind
 * glyph (or the outage glyph when no `kind`) sits in the signature brand-gradient
 * disc. ETA is surfaced for active/scheduled and suppressed once resolved; the
 * details `Button` renders only when `onDetails` is supplied. Same props/behavior
 * as {@link OutageAlertProps}; token-only colors.
 */
export const OutageAlertV4 = React.forwardRef<HTMLDivElement, OutageAlertV4Props>(function OutageAlertV4(
  { state = 'active', kind, area, eta, message, detailsLabel = 'View details', onDetails, className, ...rest },
  ref
) {
  const od = outageState(state);
  const kd = kind != null ? utilityKind(kind) : null;
  const heading = kd != null ? `${kd.label} ${od.heading.toLowerCase()}` : od.heading;
  const showEta = eta != null && state !== 'resolved';
  const discGlyph = kd != null ? kd.glyph : od.glyph;

  return (
    <div
      ref={ref}
      role="status"
      aria-label={`${heading}${area != null ? `, ${area}` : ''}`}
      className={cn(
        'flex flex-col gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] bg-surface border border-border border-t-[3px] shadow-lg p-5',
        BORDER_TINT[od.color],
        className
      )}
      {...rest}
    >
      <div className="flex items-start gap-[var(--xen-space-md)]">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-[var(--xen-radius-md)] bg-gradient-to-br from-primary-400 to-primary-700">
          <Icon glyph={discGlyph} size="xl" color="onPrimary" aria-label={od.label} />
        </span>
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <div>
            <Badge tone={od.tone} variant="soft" size="sm">{`${od.glyph} ${od.label}`}</Badge>
          </div>
          <span className="mt-0.5 text-base font-bold text-on-surface">{heading}</span>
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
