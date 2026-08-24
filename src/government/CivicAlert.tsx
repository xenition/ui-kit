import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon, type IconColor } from '../primitives/Icon';
import { Button, type ButtonVariant } from '../primitives/Button';

/** Severity of a civic / emergency alert — drives glyph, label, and token slot. */
export type AlertSeverity = 'info' | 'advisory' | 'warning' | 'emergency';

interface SeverityDescriptor {
  label: string;
  glyph: string;
  /** Tinted border + background token classes for the banner container. */
  container: string;
  /** Foreground token class for the severity eyebrow. */
  text: string;
  /** Semantic Icon color slot (never color alone — always + glyph + label). */
  icon: IconColor;
  /** Primary-action button variant. */
  button: ButtonVariant;
}

const SEVERITY: Record<AlertSeverity, SeverityDescriptor> = {
  info: {
    label: 'Information',
    glyph: 'ℹ️',
    container: 'border-primary bg-primary-50',
    text: 'text-primary',
    icon: 'primary',
    button: 'primary',
  },
  // Native `accent` slot folds to `primary` on web (no `accent` token class).
  advisory: {
    label: 'Advisory',
    glyph: '📢',
    container: 'border-primary bg-primary-50',
    text: 'text-primary',
    icon: 'primary',
    button: 'primary',
  },
  warning: {
    label: 'Warning',
    glyph: '⚠️',
    container: 'border-warn bg-warn/10',
    text: 'text-warn',
    icon: 'warn',
    button: 'primary',
  },
  emergency: {
    label: 'Emergency',
    glyph: '🚨',
    container: 'border-danger bg-danger/10',
    text: 'text-danger',
    icon: 'danger',
    button: 'danger',
  },
};

export interface CivicAlertProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Alert severity — drives the glyph, label, and token color slot. */
  severity: AlertSeverity;
  /** Alert headline. */
  title: string;
  /** Body / detail message. */
  message?: string;
  /** Issuing agency / source. */
  source?: string;
  /** Localized issued time (already formatted). */
  time?: string;
  /** Label for the primary action (shown only with `onAction`). */
  actionLabel?: string;
  /** Fires the primary action (e.g. "View details", "Get directions"). */
  onAction?: () => void;
  /** Fires dismiss; a dismiss control is shown only when supplied. */
  onDismiss?: () => void;
}

/**
 * An emergency / civic alert banner. Severity is conveyed by **glyph + label +
 * a token color slot** (info → primary, warning → warn, emergency → danger) —
 * never color alone; the severity label is always rendered as text. Uses
 * `role="alert"` so screen readers announce it. Optional primary and dismiss
 * actions are real `<button>`s. Token-bound throughout — no literal colors. Web
 * parity of the native `CivicAlert`.
 */
export const CivicAlert = React.forwardRef<HTMLDivElement, CivicAlertProps>(function CivicAlert(
  {
    severity,
    title,
    message,
    source,
    time,
    actionLabel = 'View details',
    onAction,
    onDismiss,
    className,
    ...rest
  },
  ref
) {
  const sd = SEVERITY[severity] ?? SEVERITY.info;
  const meta = [source, time].filter((v) => v != null && v !== '').join(' · ');

  return (
    <div
      ref={ref}
      role="alert"
      aria-label={`${sd.label}: ${title}`}
      className={cn(
        'flex items-start gap-[var(--xen-space-md)] rounded-[var(--xen-radius-md)] border p-[var(--xen-space-md)]',
        sd.container,
        className
      )}
      {...rest}
    >
      <Icon glyph={sd.glyph} size="xl" color={sd.icon} aria-label={sd.label} />
      <div className="min-w-0 flex-1">
        <p className={cn('text-xs font-bold uppercase', sd.text)}>{sd.label}</p>
        <p className="text-base font-bold text-on-surface">{title}</p>
        {message != null ? <p className="text-sm text-on-surface">{message}</p> : null}
        {meta !== '' ? <p className="text-xs text-muted">{meta}</p> : null}
        {onAction != null ? (
          <div className="mt-[var(--xen-space-sm)]">
            <Button size="sm" variant={sd.button} onClick={onAction}>
              {actionLabel}
            </Button>
          </div>
        ) : null}
      </div>
      {onDismiss != null ? (
        <button
          type="button"
          aria-label="Dismiss alert"
          onClick={onDismiss}
          className="shrink-0 rounded-[var(--xen-radius-sm)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
        >
          <Icon glyph="✕" size="sm" color="muted" aria-label="Dismiss" />
        </button>
      ) : null}
    </div>
  );
});
