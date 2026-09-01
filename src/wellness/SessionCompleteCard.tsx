import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';

export interface SessionCompleteCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Headline for the celebration. Default `'Session complete'`. */
  title?: string;
  /** A supporting, encouraging line. */
  message?: string;
  /** Minutes practiced this session; shown as a frosted chip when set. */
  minutes?: number;
  /** Current streak in days; shown as a frosted chip when set. */
  streakDays?: number;
  /** Fires when the primary "Done" pill is tapped; the pill renders only when set. */
  onDone?: () => void;
  /** Fires when the ghost "Reflect" button is tapped; renders only when set. */
  onReflect?: () => void;
  className?: string;
}

/**
 * SessionCompleteCard (web parity) — the peak moment after a practice: a festive
 * brand gradient ground, a big frosted `bg-primary-500` check badge, and frosted
 * stat chips (minutes, streak). `Done` is a near-white `bg-on-primary
 * text-primary` pill; `Reflect` is a bordered ghost. Each action renders only
 * when its handler is set. Near-white ink and the gradient derive from the brand
 * ramp — token-only colors. The one screen allowed to feel like a reward.
 */
export const SessionCompleteCard = React.forwardRef<HTMLDivElement, SessionCompleteCardProps>(
  function SessionCompleteCard(
    { title = 'Session complete', message, minutes, streakDays, onDone, onReflect, className, ...rest },
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

    const a11y = `${title}${message ? ', ' + message : ''}${minutes != null ? ', ' + minutes + ' minutes' : ''}${
      streakDays != null ? ', ' + streakDays + ' day streak' : ''
    }`;

    return (
      <div
        ref={ref}
        data-xen-session-complete-card=""
        className={cn(
          'flex flex-col items-center gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] bg-gradient-to-br from-primary-400 to-primary-700 p-[var(--xen-space-lg)] overflow-hidden',
          className
        )}
        {...rest}
      >
        <div
          role="img"
          aria-label="Complete"
          className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-500"
        >
          <Icon glyph="✓" size="2xl" color="onPrimary" />
        </div>

        <div aria-label={a11y} className="flex flex-col items-center gap-0.5">
          <p className="text-center text-xl font-extrabold text-on-primary">{title}</p>
          {message ? <p className="text-center text-sm text-primary-100">{message}</p> : null}
        </div>

        {minutes != null || streakDays != null ? (
          <div className="flex flex-wrap justify-center gap-[var(--xen-space-sm)]">
            {minutes != null ? <Chip glyph="🧘" text={`${minutes} min`} /> : null}
            {streakDays != null ? <Chip glyph="🔥" text={`${streakDays} day streak`} /> : null}
          </div>
        ) : null}

        {onDone || onReflect ? (
          <div className="mt-[var(--xen-space-xs)] flex flex-wrap justify-center gap-[var(--xen-space-sm)]">
            {onDone ? (
              <button
                type="button"
                aria-label="Done"
                onClick={onDone}
                className="rounded-full bg-on-primary px-[var(--xen-space-xl)] py-[var(--xen-space-sm)] text-base font-extrabold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
              >
                Done
              </button>
            ) : null}

            {onReflect ? (
              <button
                type="button"
                aria-label="Reflect"
                onClick={onReflect}
                className="rounded-full border border-on-primary px-[var(--xen-space-xl)] py-[var(--xen-space-sm)] text-base font-bold text-on-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
              >
                Reflect
              </button>
            ) : null}
          </div>
        ) : null}
      </div>
    );
  }
);
