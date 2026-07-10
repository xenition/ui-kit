import * as React from 'react';
import { cn } from './cn';

export type ProgressTone = 'primary' | 'success' | 'warn' | 'danger';

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Current value. */
  value: number;
  /** Maximum value (default 100). */
  max?: number;
  tone?: ProgressTone;
  /** Bar thickness. */
  size?: 'sm' | 'md';
}

const FILL: Record<ProgressTone, string> = {
  primary: 'bg-primary',
  success: 'bg-success',
  warn: 'bg-warn',
  danger: 'bg-danger',
};

/** Linear progress bar bound to the theme tokens. Clamps to [0, max]. */
export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(function Progress(
  { className, value, max = 100, tone = 'primary', size = 'md', ...rest },
  ref
) {
  const pct = Math.max(0, Math.min(100, max > 0 ? (value / max) * 100 : 0));
  return (
    <div
      ref={ref}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      className={cn(
        'w-full overflow-hidden rounded-full bg-neutral-200',
        size === 'sm' ? 'h-1.5' : 'h-2.5',
        className
      )}
      {...rest}
    >
      <div
        className={cn('h-full rounded-full transition-[width] duration-300', FILL[tone])}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
});
