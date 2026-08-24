import * as React from 'react';
import { cn } from './cn';

export type AlertTone = 'info' | 'success' | 'warn' | 'danger';
export type AlertVariant = 'subtle' | 'solid' | 'outline';

export interface AlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  tone?: AlertTone;
  /** Surface treatment. `subtle` (default) is the bordered left-rule card. */
  variant?: AlertVariant;
  /** Bold heading above the body. */
  title?: React.ReactNode;
  /** Renders a dismiss (×) button that calls this. */
  onClose?: () => void;
  /** Optional leading icon/glyph. */
  icon?: React.ReactNode;
  /** Optional trailing action (e.g. a button/link) rendered under the body. */
  action?: React.ReactNode;
}

/** Subtle look — `border-{tone} text-{tone}` for the left rule + title. Historical. */
const SUBTLE: Record<AlertTone, string> = {
  info: 'border-primary text-primary',
  success: 'border-success text-success',
  warn: 'border-warn text-warn',
  danger: 'border-danger text-danger',
};

/** Solid fill: tone background with on-tone text. */
const SOLID_CONTAINER: Record<AlertTone, string> = {
  info: 'bg-primary text-on-primary',
  success: 'bg-success text-on-success',
  warn: 'bg-warn text-on-warn',
  danger: 'bg-danger text-on-danger',
};
const SOLID_TEXT: Record<AlertTone, string> = {
  info: 'text-on-primary',
  success: 'text-on-success',
  warn: 'text-on-warn',
  danger: 'text-on-danger',
};

/** Outline: full ring in the tone color. */
const OUTLINE_BORDER: Record<AlertTone, string> = {
  info: 'border-primary',
  success: 'border-success',
  warn: 'border-warn',
  danger: 'border-danger',
};
const TONE_TEXT: Record<AlertTone, string> = {
  info: 'text-primary',
  success: 'text-success',
  warn: 'text-warn',
  danger: 'text-danger',
};

/**
 * Inline, optionally dismissible alert bound to the theme tokens —
 * info/success/warn/danger. The default (`subtle`) renders exactly as before;
 * `solid` (filled) and `outline` (full ring) variants and an optional trailing
 * `action` are additive opt-ins mirroring the native `Alert`. No literal colors.
 */
export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  { className, tone = 'info', variant = 'subtle', title, onClose, icon, action, children, ...rest },
  ref
) {
  const solid = variant === 'solid';

  const container =
    variant === 'solid'
      ? cn('flex gap-3 rounded-[var(--xen-radius-md)] p-3', SOLID_CONTAINER[tone])
      : variant === 'outline'
        ? cn('flex gap-3 rounded-[var(--xen-radius-md)] border bg-surface p-3', OUTLINE_BORDER[tone])
        : cn('flex gap-3 rounded-[var(--xen-radius-md)] border-l-4 bg-neutral-50 p-3', SUBTLE[tone]);

  const titleColor = solid ? SOLID_TEXT[tone] : variant === 'outline' ? TONE_TEXT[tone] : SUBTLE[tone];
  const bodyColor = solid ? SOLID_TEXT[tone] : 'text-on-surface';
  const closeColor = solid
    ? cn(SOLID_TEXT[tone], 'opacity-80 transition-opacity hover:opacity-100')
    : 'text-muted transition-colors hover:text-on-surface';

  return (
    <div
      ref={ref}
      role={tone === 'danger' ? 'alert' : 'status'}
      className={cn(container, className)}
      {...rest}
    >
      {icon != null && <span className="mt-0.5 shrink-0">{icon}</span>}
      <div className={cn('min-w-0 flex-1', bodyColor)}>
        {title != null && <div className={cn('text-sm font-semibold', titleColor)}>{title}</div>}
        {children != null && <div className="text-sm">{children}</div>}
        {action != null && <div className="mt-2">{action}</div>}
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss"
          className={cn('shrink-0', closeColor)}
        >
          ×
        </button>
      )}
    </div>
  );
});
