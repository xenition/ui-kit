import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon, type IconColor } from '../primitives/Icon';

export type TrialBannerTone = 'info' | 'warn' | 'success';

export interface TrialBannerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Headline (e.g. `'7 days of Pro, on us'`). */
  title: string;
  /** Optional supporting line (e.g. `'No charge until Aug 30'`). */
  subtitle?: string;
  /** Days remaining — when set, renders a `'N days left'` chip. */
  daysLeft?: number;
  /** Tone → primary/warn/success surface. Default `'info'`. */
  tone?: TrialBannerTone;
  /** Inline action copy (e.g. `'Manage'`). Hidden without `onAction`. */
  actionLabel?: string;
  /** Fires on the inline action. */
  onAction?: () => void;
  /** Leading glyph. Default `'✨'`. */
  icon?: string;
}

const TONE: Record<TrialBannerTone, { bg: string; fg: string; iconColor: IconColor }> = {
  // The web `Icon` exposes no `accent` slot, so the `info` tone maps to the
  // primary token pair (design guidance: accent → primary).
  info: { bg: 'bg-primary', fg: 'text-on-primary', iconColor: 'onPrimary' },
  warn: { bg: 'bg-warn', fg: 'text-on-warn', iconColor: 'onWarn' },
  success: { bg: 'bg-success', fg: 'text-on-success', iconColor: 'onSuccess' },
};

/**
 * Free-trial status strip — a tinted banner that advertises an active or
 * available trial and, optionally, a countdown chip and an inline action. Sits
 * atop the paywall (value-first framing, design.md §27) or in-app once a trial
 * is running. Tone maps to the primary/warn/success token pairs. No literal
 * colors.
 */
export const TrialBanner = React.forwardRef<HTMLDivElement, TrialBannerProps>(
  function TrialBanner(
    { title, subtitle, daysLeft, tone = 'info', actionLabel, onAction, icon = '✨', className, ...rest },
    ref
  ) {
    const t = TONE[tone];
    const days = typeof daysLeft === 'number' ? Math.max(0, daysLeft) : null;

    return (
      <div
        ref={ref}
        className={cn('flex items-center gap-2 rounded-[var(--xen-radius-md)] px-4 py-2', t.bg, className)}
        {...rest}
      >
        <Icon glyph={icon} size="lg" color={t.iconColor} />
        <div className="min-w-0 flex-1">
          <p className={cn('text-base font-bold', t.fg)}>{title}</p>
          {subtitle ? <p className={cn('text-sm opacity-90', t.fg)}>{subtitle}</p> : null}
        </div>

        {days != null ? (
          <span className="rounded-full bg-surface px-2 py-0.5 text-xs font-bold text-on-surface">
            {days} {days === 1 ? 'day' : 'days'} left
          </span>
        ) : null}

        {actionLabel && onAction ? (
          <button
            type="button"
            aria-label={actionLabel}
            onClick={onAction}
            className={cn('text-sm font-bold underline', t.fg)}
          >
            {actionLabel}
          </button>
        ) : null}
      </div>
    );
  }
);
