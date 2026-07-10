import * as React from 'react';
import { cn } from './cn';

export type AlertTone = 'info' | 'success' | 'warn' | 'danger';

export interface AlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  tone?: AlertTone;
  /** Bold heading above the body. */
  title?: React.ReactNode;
  /** Renders a dismiss (×) button that calls this. */
  onClose?: () => void;
  /** Optional leading icon/glyph. */
  icon?: React.ReactNode;
}

const TONE: Record<AlertTone, string> = {
  info: 'border-primary text-primary',
  success: 'border-success text-success',
  warn: 'border-warn text-warn',
  danger: 'border-danger text-danger',
};

/** Inline, optionally dismissible alert bound to the theme tokens — info/success/warn/danger. */
export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  { className, tone = 'info', title, onClose, icon, children, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      role={tone === 'danger' ? 'alert' : 'status'}
      className={cn(
        'flex gap-3 rounded-[var(--xen-radius-md)] border-l-4 bg-neutral-50 p-3',
        TONE[tone],
        className
      )}
      {...rest}
    >
      {icon != null && <span className="mt-0.5 shrink-0">{icon}</span>}
      <div className="min-w-0 flex-1 text-on-surface">
        {title != null && <div className={cn('text-sm font-semibold', TONE[tone])}>{title}</div>}
        {children != null && <div className="text-sm">{children}</div>}
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss"
          className="shrink-0 text-muted transition-colors hover:text-on-surface"
        >
          ×
        </button>
      )}
    </div>
  );
});
