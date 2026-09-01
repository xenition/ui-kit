import * as React from 'react';
import { cn } from '../primitives/cn';
import { IconV4 } from '../primitives/IconV4';
import { TextV4 } from '../primitives/TextV4';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import type { TrialBannerProps, TrialBannerTone } from './TrialBanner';

export interface TrialBannerV4Props extends TrialBannerProps {
  /**
   * Total days in the trial. Supplying it *and* `daysLeft` draws a meter under
   * the copy, so "3 days left" also reads as **how far through** — a number
   * alone cannot say whether three is nearly over or barely started.
   */
  daysTotal?: number;
  /**
   * Build the countdown copy. Default `'N days left'` / `'1 day left'`.
   *
   * A prop rather than a string, because the base hard-coded English
   * pluralization inside the component where a host that localizes cannot
   * reach it — and this module's contract is that copy is caller-supplied.
   */
  formatDaysLeft?: (days: number) => string;
  /** Dismiss affordance. Hidden when omitted. */
  onDismiss?: () => void;
  /** Accessible name for the dismiss control. Default `'Dismiss'`. */
  dismissLabel?: string;
}

/**
 * The tone's fill variable and its contrast-corrected ink.
 *
 * The base filled the whole strip with the saturated slot. Above a paywall
 * that is a second loud coloured block arguing with the CTA — and §5 gives the
 * CTA that job alone.
 */
const TONE: Record<TrialBannerTone, { fill: string; ink: string }> = {
  info: { fill: 'var(--xen-accent)', ink: 'var(--xen-accent-text)' },
  warn: { fill: 'var(--xen-warn)', ink: 'var(--xen-warn-text)' },
  success: { fill: 'var(--xen-success)', ink: 'var(--xen-success-text)' },
};

/** How far the tinted ground travels from `surface` toward the tone. */
const GROUND_TINT = 12;
/** How solid the meter's unfilled track sits against that ground. */
const TRACK_TINT = 24;

/**
 * **V4 trial banner** — the web twin of the native `TrialBannerV4`, same props
 * as {@link TrialBanner} plus `daysTotal`, `formatDaysLeft`, `onDismiss` and
 * `dismissLabel`.
 *
 * ## Four changes
 *
 * 1. **Soft, not solid** (see {@link TONE}).
 * 2. **The subtitle is a tone, not an opacity.** `opacity: 0.9` on ink is a
 *    contrast reduction no measurement accounts for; `muted-text` is the slot
 *    that means "secondary" and carries a promise.
 * 3. **The countdown can show its position** — "2 days left" out of 3 and out
 *    of 30 are different facts and the base rendered them identically.
 * 4. **The copy is the host's** — `formatDaysLeft`, `dismissLabel`.
 *
 * **There is still no `TrialBannerV2`/`V3`** — a strip this small has one
 * correct shape. This V4 is that shape, corrected. Renders nothing without a
 * `title`.
 */
export const TrialBannerV4 = React.forwardRef<HTMLDivElement, TrialBannerV4Props>(
  function TrialBannerV4(
    {
      title,
      subtitle,
      daysLeft,
      daysTotal,
      tone = 'info',
      actionLabel,
      onAction,
      icon = '✨',
      formatDaysLeft,
      onDismiss,
      dismissLabel = 'Dismiss',
      className,
      style,
      ...rest
    },
    ref
  ) {
    if (!title) return null;

    const slot = TONE[tone];
    const ground = `color-mix(in srgb, ${slot.fill} ${GROUND_TINT}%, var(--xen-surface))`;
    const track = `color-mix(in srgb, ${slot.fill} ${TRACK_TINT}%, ${ground})`;

    const days = typeof daysLeft === 'number' ? Math.max(0, daysLeft) : null;
    const countdown =
      days === null
        ? null
        : (formatDaysLeft ?? ((n: number) => `${n} ${n === 1 ? 'day' : 'days'} left`))(days);

    // A meter only means something when both ends are known and the total is
    // real; `daysLeft` above `daysTotal` would draw an over-full bar.
    const total = typeof daysTotal === 'number' && daysTotal > 0 ? daysTotal : null;
    const fraction = days !== null && total !== null ? Math.min(1, days / total) : null;

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col gap-sm rounded-[var(--xen-radius-md)] px-md py-md',
          className
        )}
        style={{ backgroundColor: ground, ...style }}
        {...rest}
      >
        <div className="flex items-center gap-sm">
          <IconV4 glyph={icon} size="lg" style={{ color: slot.ink }} />

          <div className="flex min-w-0 flex-1 flex-col gap-xs">
            <TextV4 size="base" weight="semibold" tone="onSurface">
              {title}
            </TextV4>
            {subtitle ? (
              <TextV4 size="sm" tone="mutedText">
                {subtitle}
              </TextV4>
            ) : null}
          </div>

          {countdown ? (
            <span
              className="shrink-0 rounded-full bg-surface px-sm py-xs text-xs font-bold [font-variant-numeric:tabular-nums]"
              style={{ color: slot.ink }}
            >
              {countdown}
            </span>
          ) : null}

          {actionLabel && onAction ? (
            <button
              type="button"
              onClick={onAction}
              className="shrink-0 text-sm font-semibold underline"
              style={{ color: slot.ink }}
            >
              {actionLabel}
            </button>
          ) : null}

          {onDismiss ? (
            <button
              type="button"
              aria-label={dismissLabel}
              onClick={onDismiss}
              data-xen-v4-chrome="on-surface"
              className={cn(
                '-my-sm -mr-sm flex w-11 shrink-0 items-center justify-center rounded-full text-muted-text',
                MIN_TAP_CLASS
              )}
            >
              <IconV4 name="close" size="base" />
            </button>
          ) : null}
        </div>

        {fraction !== null ? (
          <div
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={total as number}
            aria-valuenow={days as number}
            className="h-[var(--xen-space-xs)] w-full overflow-hidden rounded-full"
            style={{ backgroundColor: track }}
          >
            <div
              className="h-full rounded-full"
              style={{ width: `${fraction * 100}%`, backgroundColor: slot.fill }}
            />
          </div>
        ) : null}
      </div>
    );
  }
);
