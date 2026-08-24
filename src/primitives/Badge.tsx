import * as React from 'react';
import { cn } from './cn';

export type BadgeTone = 'neutral' | 'muted' | 'primary' | 'success' | 'warn' | 'danger';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
}

const TONE: Record<BadgeTone, string> = {
  neutral: 'bg-neutral-100 text-on-surface',
  muted: 'bg-neutral-100 text-muted',
  primary: 'bg-primary-50 text-primary',
  success: 'bg-success text-on-success',
  warn: 'bg-warn text-on-warn',
  danger: 'bg-danger text-on-danger',
};

/** Small status/label pill bound to the theme tokens — for statuses, tags, counts. */
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { className, tone = 'neutral', ...rest },
  ref
) {
  return (
    <span
      ref={ref}
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium',
        TONE[tone],
        className
      )}
      {...rest}
    />
  );
});
