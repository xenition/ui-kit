import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon, type IconColor } from '../primitives/Icon';
import { Text, type TextTone } from '../primitives/Text';

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

const TONE: Record<TrialBannerTone, { bg: string; fg: TextTone; iconColor: IconColor }> = {
  // The web `Icon` exposes no `accent` slot, so the `info` tone maps to the
  // primary token pair (design guidance: accent → primary).
  info: { bg: 'bg-primary', fg: 'onPrimary', iconColor: 'onPrimary' },
  warn: { bg: 'bg-warn', fg: 'onWarn', iconColor: 'onWarn' },
  success: { bg: 'bg-success', fg: 'onSuccess', iconColor: 'onSuccess' },
};

/**
 * Free-trial status strip — a tinted banner that advertises an active or
 * available trial and, optionally, a countdown chip and an inline action. Sits
 * atop the paywall (value-first framing, design.md §27) or in-app once a trial
 * is running. Tone maps to the primary/warn/success token pairs. No literal
 * colors.
 *
 * **There is deliberately no `TrialBannerV2`/`V3`.** A strip this small has one
 * correct shape, so the base component *is* its whole design line — which is
 * why a v2 or v3 paywall composing this base banner is correct rather than a
 * cross-line leak. `design-line-composition.spec.tsx` documents the same
 * conclusion from the other side.
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
        <div className="flex min-w-0 flex-1 flex-col">
          <Text size="base" weight="bold" tone={t.fg}>
            {title}
          </Text>
          {subtitle ? (
            <Text size="sm" tone={t.fg} className="opacity-90">
              {subtitle}
            </Text>
          ) : null}
        </div>

        {days != null ? (
          <span className="rounded-full bg-surface px-2 py-0.5">
            <Text size="xs" weight="bold">
              {days} {days === 1 ? 'day' : 'days'} left
            </Text>
          </span>
        ) : null}

        {actionLabel && onAction ? (
          <button type="button" aria-label={actionLabel} onClick={onAction} className="underline">
            <Text size="sm" weight="bold" tone={t.fg}>
              {actionLabel}
            </Text>
          </button>
        ) : null}
      </div>
    );
  }
);
