import * as React from 'react';
import { cn } from '../primitives/cn';

export interface SurveyCompleteProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Headline — the celebratory payoff. Default `'All done!'`. */
  title?: string;
  /** Optional supporting line under the title (a thank-you note). */
  message?: string;
  /** Big celebratory glyph over the title (an emoji or a check). Default `'🎉'`. */
  emoji?: string;
  /**
   * Optional single highlight stat rendered as a frosted glass tile
   * (e.g. `{ label: 'Completed in', value: '2:14' }`).
   */
  stat?: { label: string; value: string };
  /** Primary CTA label. Default `'Done'`. */
  primaryLabel?: string;
  /** Fires on the primary CTA. The button is hidden when unset. */
  onPrimary?: () => void;
  /** Optional secondary CTA label (e.g. `'View results'`). */
  secondaryLabel?: string;
  /** Fires on the secondary CTA. The secondary button is hidden when unset. */
  onSecondary?: () => void;
}

/**
 * SurveyComplete — the survey's peak-end **celebration hero** (V4 "focus" line).
 * A full two-hue celebratory gradient ground (`bg-gradient-to-br from-accent-400
 * to-primary-600`) carries near-white ink (`text-primary-50` / `text-primary-100`):
 * a big emoji/check mark, the headline, an optional thank-you message, and an
 * optional highlight stat as a frosted glass tile (`bg-primary-50/15 border
 * border-primary-50/30`). Big ≥44px CTAs sit in the thumb zone — a near-white
 * primary pill and an optional ghost secondary. Presentational only (shaped data
 * + callbacks). All colors from `--xen-*` token classes + gradient utilities (no
 * literal colors), dark-mode safe.
 */
export const SurveyComplete = React.forwardRef<HTMLDivElement, SurveyCompleteProps>(function SurveyComplete(
  {
    title = 'All done!',
    message,
    emoji = '🎉',
    stat,
    primaryLabel = 'Done',
    onPrimary,
    secondaryLabel,
    onSecondary,
    className,
    ...rest
  },
  ref
) {
  return (
    <div
      ref={ref}
      data-xen-survey-complete=""
      role="status"
      aria-live="polite"
      className={cn(
        'flex flex-col items-center overflow-hidden rounded-[var(--xen-radius-lg)] bg-gradient-to-br from-accent-400 to-primary-600 p-[var(--xen-space-xl)]',
        className
      )}
      {...rest}
    >
      {/* Celebratory mark on a frosted disc. */}
      <span
        role="img"
        aria-label={title}
        className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-50/15 border border-primary-50/30 text-3xl"
      >
        {emoji}
      </span>

      <h2 className="mt-[var(--xen-space-md)] text-center text-2xl font-extrabold text-primary-50">{title}</h2>

      {message ? (
        <p className="mt-[var(--xen-space-xs)] text-center text-base leading-relaxed text-primary-100">{message}</p>
      ) : null}

      {stat ? (
        <div className="mt-[var(--xen-space-lg)] flex w-full flex-col items-center gap-0.5 rounded-[var(--xen-radius-md)] bg-primary-50/15 border border-primary-50/30 px-[var(--xen-space-md)] py-[var(--xen-space-md)]">
          <span className="text-2xl font-extrabold text-primary-50">{stat.value}</span>
          <span className="text-xs text-primary-100">{stat.label}</span>
        </div>
      ) : null}

      {onPrimary || onSecondary ? (
        <div className="mt-[var(--xen-space-lg)] flex w-full flex-col gap-[var(--xen-space-sm)]">
          {onPrimary ? (
            <button
              type="button"
              aria-label={primaryLabel}
              onClick={onPrimary}
              className="flex min-h-[44px] w-full items-center justify-center rounded-[var(--xen-radius-md)] bg-primary-50 py-[var(--xen-space-md)] text-base font-extrabold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
            >
              {primaryLabel}
            </button>
          ) : null}
          {onSecondary && secondaryLabel ? (
            <button
              type="button"
              aria-label={secondaryLabel}
              onClick={onSecondary}
              className="flex min-h-[44px] w-full items-center justify-center rounded-[var(--xen-radius-md)] border border-primary-50/30 py-[var(--xen-space-md)] text-base font-bold text-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
            >
              {secondaryLabel}
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
});
