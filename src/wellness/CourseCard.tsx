import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';

export interface CourseCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Program title. */
  title: string;
  /** Secondary line — a short description. */
  subtitle?: string;
  /** Small uppercase category kicker. */
  category?: string;
  /** Total number of days in the program. */
  totalDays: number;
  /** Days completed so far. Default `0`. */
  completedDays?: number;
  /** Glyph shown on the gradient cover tile. Default `'🌿'`. */
  coverGlyph?: string;
  /** Fires when the card is tapped; the card is a button only when set. */
  onPress?: () => void;
  className?: string;
}

/**
 * CourseCard (web parity) — a multi-day program on a calm, clean surface card. A
 * single small gradient cover tile and a slim gradient progress fill are the
 * only color; the rest stays on the neutral surface with `on-surface`/`muted`
 * type, in the spirit of restraint. Progress is stated in words ("Day 3 of 10")
 * as well as the bar (`bg-neutral-200` track, gradient fill via inline width %),
 * so it never depends on color alone. Token-only colors.
 */
export const CourseCard = React.forwardRef<HTMLDivElement, CourseCardProps>(function CourseCard(
  { title, subtitle, category, totalDays, completedDays = 0, coverGlyph = '🌿', onPress, className, ...rest },
  ref
) {
  const safeTotal = totalDays > 0 ? totalDays : 0;
  const done = Math.max(0, Math.min(completedDays, safeTotal));
  const pct = safeTotal > 0 ? (done / safeTotal) * 100 : 0;
  const a11y = `${category ? category + ', ' : ''}${title}${subtitle ? ', ' + subtitle : ''}, day ${done} of ${safeTotal}`;

  const body = (
    <>
      <div className="flex items-center gap-[var(--xen-space-md)]">
        <div
          aria-hidden="true"
          className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-[var(--xen-radius-md)] bg-gradient-to-br from-primary-400 to-primary-700"
        >
          <Icon glyph={coverGlyph} size={24} color="onPrimary" />
        </div>

        <div className="min-w-0 flex-1">
          {category ? (
            <p className="text-xs font-bold uppercase tracking-wide text-muted">{category}</p>
          ) : null}
          <p className="truncate text-lg font-bold text-on-surface">{title}</p>
          {subtitle ? <p className="truncate text-sm text-muted">{subtitle}</p> : null}
        </div>
      </div>

      <div className="mt-[var(--xen-space-md)] flex flex-col gap-[var(--xen-space-xs)]">
        <div className="h-1.5 overflow-hidden rounded-full bg-neutral-200">
          <div
            className="h-1.5 rounded-full bg-gradient-to-br from-primary-400 to-primary-700"
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="text-xs text-muted">{`Day ${done} of ${safeTotal}`}</p>
      </div>
    </>
  );

  const shell = 'rounded-[var(--xen-radius-lg)] bg-surface border border-border shadow-sm p-5';

  if (onPress) {
    return (
      <div
        ref={ref}
        role="button"
        tabIndex={0}
        aria-label={a11y}
        onClick={onPress}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onPress();
          }
        }}
        data-xen-course-card=""
        className={cn(
          shell,
          'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
          className
        )}
        {...rest}
      >
        {body}
      </div>
    );
  }

  return (
    <div ref={ref} aria-label={a11y} data-xen-course-card="" className={cn(shell, className)} {...rest}>
      {body}
    </div>
  );
});
