import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon, Badge, Button } from '../primitives';
import type { BadgeTone, ButtonVariant, IconColor } from '../primitives';

/** Pressure / threat level — colors the alert and is stated as a text chip. */
export type PestSeverity = 'low' | 'moderate' | 'high' | 'critical';

export interface PestAlertProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Pest / disease name (e.g. "Aphid infestation"). */
  pest: string;
  /** Threat level. Default `'moderate'` — colors banner + text chip. */
  severity?: PestSeverity;
  /** Affected crop or field (e.g. "Tomatoes · Greenhouse 2"). */
  affected?: string;
  /** Recommended action / note. */
  recommendation?: string;
  /** Detection hint (e.g. "Detected 2h ago"). */
  detectedAt?: string;
  /** Leading glyph/emoji. Default `'🐛'`. */
  icon?: string;
  /** Label for the primary action button; omit to hide it. */
  actionLabel?: string;
  /** Fires when the action button is activated. */
  onAction?: () => void;
}

const SEVERITY_META: Record<
  PestSeverity,
  { label: string; iconColor: IconColor; edge: string; tone: BadgeTone; button: ButtonVariant }
> = {
  low: { label: 'Low', iconColor: 'success', edge: 'border-success', tone: 'success', button: 'primary' },
  moderate: { label: 'Moderate', iconColor: 'warn', edge: 'border-warn', tone: 'warn', button: 'primary' },
  high: { label: 'High', iconColor: 'danger', edge: 'border-danger', tone: 'danger', button: 'danger' },
  critical: { label: 'Critical', iconColor: 'danger', edge: 'border-danger', tone: 'danger', button: 'danger' },
};

/**
 * A pest / disease alert — a token-tinted, accent-barred callout with a bug
 * glyph, the pest name, affected crop/field, an optional recommendation +
 * detection time, and an optional action {@link Button}. Severity drives the
 * accent color, but the text {@link Badge} states it too, so the alert never
 * relies on color alone. Announced via `role="alert"`. The tint and left edge
 * come from token classes (`bg-neutral-50` + `border-<tone>`) — no literal
 * colors.
 */
export const PestAlert = React.forwardRef<HTMLDivElement, PestAlertProps>(function PestAlert(
  {
    pest,
    severity = 'moderate',
    affected,
    recommendation,
    detectedAt,
    icon = '🐛',
    actionLabel,
    onAction,
    className,
    ...rest
  },
  ref
) {
  const meta = SEVERITY_META[severity];

  return (
    <div
      ref={ref}
      role="alert"
      data-xen-pest-alert=""
      aria-label={`${meta.label} pest alert: ${pest}${affected ? ` on ${affected}` : ''}`}
      className={cn(
        'rounded-[var(--xen-radius-md)] border-l-4 bg-neutral-50 p-3',
        meta.edge,
        className
      )}
      {...rest}
    >
      <div className="flex items-center gap-2">
        <Icon glyph={icon} size="xl" color={meta.iconColor} />
        <div className="min-w-0 flex-1">
          <p className="text-base font-bold text-on-surface">{pest}</p>
          {affected != null ? (
            <p className="truncate text-xs text-muted">{affected}</p>
          ) : null}
        </div>
        <Badge tone={meta.tone}>{meta.label}</Badge>
      </div>

      {recommendation != null ? (
        <p className="mt-2 text-sm text-on-surface">{recommendation}</p>
      ) : null}

      {detectedAt != null ? <p className="mt-1 text-xs text-muted">🕓 {detectedAt}</p> : null}

      {actionLabel != null ? (
        <div className="mt-3">
          <Button size="sm" variant={meta.button} onClick={onAction}>
            {actionLabel}
          </Button>
        </div>
      ) : null}
    </div>
  );
});
