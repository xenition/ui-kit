import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon, type IconColor } from '../primitives/Icon';

/** Severity of a home alert — drives the accent, glyph + announced label. */
export type AlertSeverity = 'info' | 'warning' | 'critical';

interface SeverityMeta {
  /** Default glyph when none is supplied. */
  glyph: string;
  /** Word announced before the title so severity never rides on color alone. */
  word: string;
  /** Tailwind token classes for the left bar, disc, icon + soft tint. */
  bar: string;
  disc: string;
  iconColor: IconColor;
  tint: string;
  border: string;
}

/** info→primary, warning→warn, critical→danger — accent by icon + label, not color alone. */
const SEVERITY_META: Record<AlertSeverity, SeverityMeta> = {
  info: {
    glyph: 'ℹ️',
    word: 'Info',
    bar: 'bg-primary',
    disc: 'border-primary/40 bg-primary/15',
    iconColor: 'primary',
    tint: 'bg-primary/[0.06]',
    border: 'border-primary/40',
  },
  warning: {
    glyph: '⚠️',
    word: 'Warning',
    bar: 'bg-warn',
    disc: 'border-warn/40 bg-warn/15',
    iconColor: 'warn',
    tint: 'bg-warn/10',
    border: 'border-warn/40',
  },
  critical: {
    glyph: '🚨',
    word: 'Critical',
    bar: 'bg-danger',
    disc: 'border-danger/40 bg-danger/15',
    iconColor: 'danger',
    tint: 'bg-danger/10',
    border: 'border-danger/40',
  },
};

export interface AlertCardProps {
  /** Alert severity — `info`→primary, `warning`→warn, `critical`→danger. */
  severity: AlertSeverity;
  /** Headline of the alert (e.g. "Front door left open"). */
  title: string;
  /** Optional supporting detail line(s). */
  message?: string;
  /** Optional relative/absolute time, shown muted (e.g. "2m ago"). */
  time?: string;
  /** Optional device or zone the alert came from (e.g. "Front Door"). */
  deviceName?: string;
  /** Override the severity's default glyph/emoji. */
  icon?: string;
  /** When set, renders a dismiss (✕) control that fires this. */
  onDismiss?: () => void;
  /** When set, renders a primary "view" action that fires this. */
  onView?: () => void;
  /** Label for the `onView` action. Defaults to `'View'`. */
  viewLabel?: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * AlertCard — **V4** "ambient" home alert. A calm notification card with a
 * **left severity-accent bar**, a severity glyph in a soft-tint disc, and a
 * soft (not saturated) severity-tinted background — `info`→primary,
 * `warning`→warn, `critical`→danger. Severity is spelled out as a word in the
 * accessible label so it never rides on color alone. Optional dismiss (✕) and
 * view actions are ≥44px targets. Exposed as `role="status"` (or `alert` when
 * critical). Presentational only; all colors from `--xen-*` token classes
 * (no literals), dark-mode safe.
 */
export const AlertCard = React.forwardRef<HTMLDivElement, AlertCardProps>(function AlertCard(
  { severity, title, message, time, deviceName, icon, onDismiss, onView, viewLabel = 'View', className, style, ...rest },
  ref
) {
  const meta = SEVERITY_META[severity] ?? SEVERITY_META.info;
  const hasActions = typeof onView === 'function' || typeof onDismiss === 'function';

  return (
    <div
      ref={ref}
      role={severity === 'critical' ? 'alert' : 'status'}
      aria-label={`${meta.word} alert: ${title}`}
      style={style}
      className={cn(
        'relative overflow-hidden rounded-[var(--xen-radius-lg)] border shadow-sm',
        meta.border,
        meta.tint,
        className
      )}
      {...rest}
    >
      {/* Left severity-accent bar. */}
      <span aria-hidden="true" className={cn('absolute inset-y-0 left-0 w-1', meta.bar)} />
      <div className="flex items-start gap-[var(--xen-space-sm)] p-[var(--xen-space-md)] pl-[calc(var(--xen-space-md)+4px)]">
        {/* Severity glyph in a soft-tint disc. */}
        <span
          className={cn(
            'flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--xen-radius-md)] border',
            meta.disc
          )}
        >
          <Icon glyph={icon ?? meta.glyph} color={meta.iconColor} size="lg" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-[var(--xen-space-sm)]">
            <p className="text-base font-bold text-on-surface">{title}</p>
            {onDismiss ? (
              <button
                type="button"
                onClick={onDismiss}
                aria-label="Dismiss alert"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--xen-radius-md)] text-muted hover:bg-on-surface/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Icon glyph="✕" color="muted" size="base" />
              </button>
            ) : null}
          </div>
          {message != null ? <p className="mt-[var(--xen-space-xs)] text-sm text-on-surface/80">{message}</p> : null}
          {deviceName != null || time != null ? (
            <p className="mt-[var(--xen-space-xs)] text-xs text-muted">
              {deviceName != null ? deviceName : null}
              {deviceName != null && time != null ? ' · ' : null}
              {time != null ? time : null}
            </p>
          ) : null}
          {hasActions && onView ? (
            <div className="mt-[var(--xen-space-md)] flex items-center gap-[var(--xen-space-sm)]">
              <button
                type="button"
                onClick={onView}
                className="inline-flex min-h-[44px] items-center justify-center rounded-[var(--xen-radius-md)] border border-primary bg-primary px-[var(--xen-space-md)] text-sm font-semibold text-on-primary hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {viewLabel}
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
});
