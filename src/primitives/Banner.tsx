import * as React from 'react';
import { cn } from './cn';

export type BannerTone = 'info' | 'success' | 'warn' | 'danger';

export interface BannerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  tone?: BannerTone;
  /** Leading icon node. */
  icon?: React.ReactNode;
  /** Optional trailing action button label. */
  actionLabel?: string;
  onAction?: () => void;
  /** Renders a dismiss (×) control that calls this. */
  onClose?: () => void;
}

const TONE: Record<BannerTone, string> = {
  info: 'bg-primary text-on-primary',
  success: 'bg-success text-on-success',
  warn: 'bg-warn text-on-warn',
  danger: 'bg-danger text-on-danger',
};

/**
 * Full-width banner — a solid, edge-to-edge notice keyed to a semantic tone:
 * the background is the tone token and all content uses the paired `on-*`
 * token. Distinct from `Alert` (surface card + left rule) by its solid,
 * full-bleed fill. Optional trailing action + dismiss. `danger` announces via
 * the `alert` role; other tones via `status`. No literal colors.
 */
export const Banner = React.forwardRef<HTMLDivElement, BannerProps>(function Banner(
  { tone = 'info', icon, actionLabel, onAction, onClose, className, children, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      role={tone === 'danger' ? 'alert' : 'status'}
      className={cn('flex w-full items-center gap-3 px-4 py-3', TONE[tone], className)}
      {...rest}
    >
      {icon != null && <span className="inline-flex shrink-0">{icon}</span>}
      <div className="min-w-0 flex-1 text-sm font-medium">{children}</div>
      {actionLabel && (
        <button
          type="button"
          onClick={onAction}
          className="shrink-0 text-sm font-bold underline underline-offset-2 hover:opacity-90"
        >
          {actionLabel}
        </button>
      )}
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss"
          className="shrink-0 text-base leading-none hover:opacity-80"
        >
          ×
        </button>
      )}
    </div>
  );
});
