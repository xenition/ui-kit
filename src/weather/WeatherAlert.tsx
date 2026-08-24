import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';
import { Badge, type BadgeTone } from '../primitives/Badge';

/** Severity of a weather advisory, low → high. */
export type WeatherAlertSeverity = 'advisory' | 'watch' | 'warning' | 'emergency';

type Tone = Extract<BadgeTone, 'warn' | 'danger'>;

interface SeverityMeta {
  tone: Tone;
  glyph: string;
  label: string;
}

const SEVERITY: Record<WeatherAlertSeverity, SeverityMeta> = {
  advisory: { tone: 'warn', glyph: 'ℹ️', label: 'Advisory' },
  watch: { tone: 'warn', glyph: '⚠️', label: 'Watch' },
  warning: { tone: 'danger', glyph: '⚠️', label: 'Warning' },
  emergency: { tone: 'danger', glyph: '🚨', label: 'Emergency' },
};

/** Left-rail border color, keyed by severity tone (token classes only). */
const TONE_RAIL: Record<Tone, string> = {
  warn: 'border-l-warn',
  danger: 'border-l-danger',
};

/** Translucent surface tint derived from the tone token via `color-mix` (no literal color). */
const TONE_TINT: Record<Tone, string> = {
  warn: 'bg-[color-mix(in_srgb,var(--xen-warn)_12%,transparent)]',
  danger: 'bg-[color-mix(in_srgb,var(--xen-danger)_12%,transparent)]',
};

export interface WeatherAlertProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title' | 'aria-label'> {
  /** Alert headline (e.g. `'Flash Flood Warning'`). */
  title: string;
  /** Longer description / instructions. */
  description?: string;
  /** Severity → tone + glyph. Default `'advisory'`. */
  severity?: WeatherAlertSeverity;
  /** Effective-through caption. */
  until?: string;
  /** Fired when the dismiss affordance is pressed; omit to hide it. */
  onDismiss?: () => void;
}

/**
 * Banner for a weather advisory (web parity of the native `WeatherAlert`). The
 * severity drives the token tone (warn for advisory/watch, danger for
 * warning/emergency) but is ALSO spelled out with a glyph + a text severity
 * `Badge`, so it never relies on color alone. The surface is a token tint with a
 * matching left rail. Pass `onClick` to make the banner tappable
 * (keyboard-activatable) and `onDismiss` to render a separate dismiss button.
 * All colors come from the `--xen-*` tokens via Tailwind classes.
 */
export const WeatherAlert = React.forwardRef<HTMLDivElement, WeatherAlertProps>(function WeatherAlert(
  { title, description, severity = 'advisory', until, onDismiss, className, onKeyDown, ...rest },
  ref
) {
  const meta = SEVERITY[severity];
  const clickable = rest.onClick != null;

  const interactive = clickable
    ? {
        role: 'button' as const,
        tabIndex: 0,
        onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => {
          onKeyDown?.(e);
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            (rest.onClick as React.MouseEventHandler<HTMLDivElement>)?.(
              e as unknown as React.MouseEvent<HTMLDivElement>
            );
          }
        },
      }
    : { role: 'alert' as const, onKeyDown };

  return (
    <div
      ref={ref}
      aria-label={`${meta.label}: ${title}`}
      className={cn(
        'flex flex-row gap-2 rounded-[var(--xen-radius-md)] border-l-4 p-[var(--xen-space-md)]',
        TONE_RAIL[meta.tone],
        TONE_TINT[meta.tone],
        clickable && 'cursor-pointer',
        className
      )}
      {...interactive}
      {...rest}
    >
      <Icon glyph={meta.glyph} size="lg" aria-label={meta.label} />
      <div className="flex-1">
        <Badge tone={meta.tone} className="uppercase">
          {meta.label}
        </Badge>
        <p className="mt-0.5 text-base font-bold text-on-surface">{title}</p>
        {description ? <p className="mt-1 text-sm text-on-surface">{description}</p> : null}
        {until ? <p className="mt-1 text-xs text-muted">Until {until}</p> : null}
      </div>
      {onDismiss ? (
        <button
          type="button"
          aria-label="Dismiss alert"
          onClick={(e) => {
            e.stopPropagation();
            onDismiss();
          }}
          className="shrink-0 rounded-[var(--xen-radius-sm)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
        >
          <Icon glyph="✕" size="sm" color="muted" aria-label="Dismiss" />
        </button>
      ) : null}
    </div>
  );
});
