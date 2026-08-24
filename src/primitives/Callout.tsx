import * as React from 'react';
import { cn } from './cn';

export type CalloutTone = 'info' | 'success' | 'warn' | 'danger' | 'neutral';

export interface CalloutProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  tone?: CalloutTone;
  /** Leading icon node (e.g. an `<Icon glyph="💡" />`). */
  icon?: React.ReactNode;
  /** Bold heading above the body. */
  title?: React.ReactNode;
}

const EDGE: Record<CalloutTone, string> = {
  info: 'border-primary',
  success: 'border-success',
  warn: 'border-warn',
  danger: 'border-danger',
  neutral: 'border-border',
};

const TITLE: Record<CalloutTone, string> = {
  info: 'text-primary',
  success: 'text-success',
  warn: 'text-warn',
  danger: 'text-danger',
  neutral: 'text-muted',
};

/**
 * Callout — a lightweight boxed emphasis block for asides and tips, lighter
 * than `Banner` (no solid fill). A `surface` card with a full 1px border tinted
 * to the tone token and a tone-tinted title, plus an optional leading icon.
 * Body copy stays `on-surface`. No literal colors.
 */
export const Callout = React.forwardRef<HTMLDivElement, CalloutProps>(function Callout(
  { tone = 'info', icon, title, className, children, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      role="note"
      className={cn(
        'flex gap-3 rounded-[var(--xen-radius-md)] border bg-surface p-3',
        EDGE[tone],
        className
      )}
      {...rest}
    >
      {icon != null && <span className="mt-0.5 inline-flex shrink-0">{icon}</span>}
      <div className="min-w-0 flex-1">
        {title != null && (
          <div className={cn('text-sm font-bold', TITLE[tone])}>{title}</div>
        )}
        {children != null && <div className="text-sm text-on-surface">{children}</div>}
      </div>
    </div>
  );
});
