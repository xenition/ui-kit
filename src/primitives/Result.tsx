import * as React from 'react';
import { cn } from './cn';
import { Icon, type IconColor } from './Icon';

export type ResultStatus = 'success' | 'error' | 'empty' | '404';

export interface ResultProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  status?: ResultStatus;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Primary action button label. */
  actionLabel?: string;
  onAction?: () => void;
  /** Override the default status glyph. */
  icon?: React.ReactNode;
}

const GLYPH: Record<ResultStatus, string> = {
  success: '✓',
  error: '✕',
  empty: '∅',
  '404': '?',
};

const ICON_COLOR: Record<ResultStatus, IconColor> = {
  success: 'success',
  error: 'danger',
  empty: 'muted',
  '404': 'muted',
};

/**
 * Full-page result state — a centered status glyph, title, description, and
 * optional primary action for success / error / empty / 404 outcomes. The glyph
 * tone maps to a semantic token (`success`→success, `error`→danger, `empty` and
 * `404`→muted); title is `on-surface`, description `muted`. The action reuses
 * the primary/`on-primary` button convention. No literal colors.
 */
export const Result = React.forwardRef<HTMLDivElement, ResultProps>(function Result(
  { status = 'success', title, description, actionLabel, onAction, icon, className, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      role="status"
      className={cn(
        'flex w-full flex-col items-center justify-center gap-4 bg-surface p-8 text-center',
        className
      )}
      {...rest}
    >
      {icon != null ? (
        <span className="inline-flex">{icon}</span>
      ) : (
        <Icon glyph={GLYPH[status]} size="3xl" color={ICON_COLOR[status]} aria-label={status} />
      )}
      <h2 className="text-xl font-bold text-on-surface">{title}</h2>
      {description != null && <p className="text-base text-muted">{description}</p>}
      {actionLabel && (
        <button
          type="button"
          onClick={onAction}
          className={cn(
            'mt-2 inline-flex items-center justify-center rounded-[var(--xen-radius-md)] px-6 py-2.5',
            'bg-primary text-base font-semibold text-on-primary transition hover:opacity-90',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300'
          )}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
});
