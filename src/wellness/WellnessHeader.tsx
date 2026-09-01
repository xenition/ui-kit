import * as React from 'react';
import { cn } from '../primitives/cn';

export interface WellnessHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Time-of-day greeting, e.g. `'Good morning'`. */
  greeting?: string;
  /** The person's name. */
  name?: string;
  /** A subtitle line (e.g. a date or an encouraging note). */
  subtitle?: string;
  /** Current practice streak in days; shown as a frosted chip when set. */
  streakDays?: number;
  /** Minutes practiced today; shown as a frosted chip when set. */
  minutes?: number;
  /** Optional avatar glyph/emoji for the profile button. Default `'🧘'`. */
  avatarGlyph?: string;
  /** Fires when the profile avatar is tapped. */
  onProfile?: () => void;
  className?: string;
}

/**
 * WellnessHeader (web parity) — the home-screen header: a soft brand gradient
 * ground with a greeting and name, an optional profile avatar, and frosted
 * "glass" stat chips (streak, minutes today). Near-white ink (`text-on-primary`
 * / `text-primary-100`) and the gradient both derive from the brand ramp; the
 * frosted chips are `bg-primary-500`. Token-only colors, the single vivid
 * surface on the screen.
 */
export const WellnessHeader = React.forwardRef<HTMLDivElement, WellnessHeaderProps>(function WellnessHeader(
  { greeting = 'Good morning', name, subtitle, streakDays, minutes, avatarGlyph = '🧘', onProfile, className, ...rest },
  ref
) {
  const Chip = ({ glyph, text }: { glyph: string; text: string }) => (
    <span className="inline-flex items-center gap-[var(--xen-space-xs)] rounded-full bg-primary-500 px-[var(--xen-space-md)] py-[var(--xen-space-xs)]">
      <span aria-hidden="true" className="text-sm">
        {glyph}
      </span>
      <span className="text-sm font-bold text-on-primary">{text}</span>
    </span>
  );

  return (
    <div
      ref={ref}
      data-xen-wellness-header=""
      className={cn(
        'rounded-[var(--xen-radius-lg)] bg-gradient-to-br from-primary-400 to-primary-700 p-[var(--xen-space-lg)] overflow-hidden',
        className
      )}
      {...rest}
    >
      <div className="flex items-start justify-between gap-[var(--xen-space-md)]">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-primary-100">{greeting}</p>
          {name ? <p className="mt-0.5 text-2xl font-extrabold text-on-primary">{name}</p> : null}
          {subtitle ? <p className="mt-0.5 text-sm text-primary-100">{subtitle}</p> : null}
        </div>

        {onProfile ? (
          <button
            type="button"
            aria-label="Open profile"
            onClick={onProfile}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-500 text-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
          >
            <span aria-hidden="true">{avatarGlyph}</span>
          </button>
        ) : null}
      </div>

      {streakDays != null || minutes != null ? (
        <div className="mt-[var(--xen-space-md)] flex flex-wrap gap-[var(--xen-space-sm)]">
          {streakDays != null ? <Chip glyph="🔥" text={`${streakDays} day streak`} /> : null}
          {minutes != null ? <Chip glyph="🧘" text={`${minutes} min today`} /> : null}
        </div>
      ) : null}
    </div>
  );
});
