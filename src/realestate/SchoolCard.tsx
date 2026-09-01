import * as React from 'react';
import { cn } from '../primitives/cn';
import { clickableProps } from './internal';

/** Score tiers → the semantic accent that tints the rating disc/text. */
type ScoreTier = 'success' | 'warn' | 'danger';

/**
 * Map a 0–10 rating to its tier: high (≥7) → success, mid (≥4) → warn,
 * low (<4) → danger. The score reads by BOTH number and color.
 */
function scoreTier(rating: number): ScoreTier {
  if (rating >= 7) return 'success';
  if (rating >= 4) return 'warn';
  return 'danger';
}

const DISC_BG: Record<ScoreTier, string> = {
  success: 'bg-success/15',
  warn: 'bg-warn/15',
  danger: 'bg-danger/15',
};
const DISC_TEXT: Record<ScoreTier, string> = {
  success: 'text-success',
  warn: 'text-warn',
  danger: 'text-danger',
};

export interface SchoolCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** School name (e.g. `'Lincoln Elementary'`). The card's headline. */
  name: string;
  /**
   * Rating on a 0–10 scale. Shown as a big numeral inside a score-tinted disc
   * (high ≥7 → success, mid ≥4 → warn, low <4 → danger). Clamped to `0–10`.
   */
  rating: number;
  /** Optional education level (e.g. `'Elementary'`, `'High'`). Shown beside the distance. */
  level?: string;
  /** Optional distance label (e.g. `'0.4 mi'`). Shown beside the level. */
  distanceLabel?: string;
  /** Optional grade span (e.g. `'K–5'`, `'9–12'`). Shown as a muted footnote. */
  gradesLabel?: string;
  /**
   * Optional click handler. When set the whole card becomes a
   * keyboard-activatable button (Enter/Space) with an accessible summary label.
   */
  onPress?: React.MouseEventHandler<HTMLDivElement>;
}

/**
 * SchoolCard — **V4** "listing" design. A nearby-school rating card: the 0–10
 * rating in a score-tinted disc (high → success, mid → warn, low → danger) on
 * the left, the school name as the headline, the level + distance beneath, and
 * an optional grades footnote. The score is legible by BOTH its big numeral and
 * its color. Editorial, rounded elevated card, 8-pt spacing. Presentational
 * only — all colors from `--xen-*` token classes, no literals; dark-mode safe.
 * When `onPress` is set the card is a keyboard-activatable button.
 */
export const SchoolCard = React.forwardRef<HTMLDivElement, SchoolCardProps>(function SchoolCard(
  { name, rating, level, distanceLabel, gradesLabel, onPress, className, ...rest },
  ref
) {
  const clamped = Math.max(0, Math.min(10, rating));
  const tier = scoreTier(clamped);
  const scoreText = Number.isInteger(clamped) ? String(clamped) : clamped.toFixed(1);

  const meta = [level, distanceLabel].filter(Boolean).join(' · ');
  const label = `${name}, rated ${scoreText} out of 10${meta ? `, ${meta}` : ''}${gradesLabel ? `, grades ${gradesLabel}` : ''}`;

  return (
    <div
      ref={ref}
      onClick={onPress}
      className={cn(
        'flex items-center gap-3 rounded-[var(--xen-radius-lg)] border border-border bg-surface p-2 text-on-surface shadow-md',
        onPress &&
          'cursor-pointer transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        className
      )}
      {...clickableProps(onPress as React.MouseEventHandler | undefined, label)}
      {...rest}
    >
      {/* Score-tinted rating disc — number + color both encode the rating. */}
      <div
        className={cn(
          'flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-[var(--xen-radius-md)]',
          DISC_BG[tier]
        )}
      >
        <span className={cn('text-2xl font-bold leading-none tabular-nums', DISC_TEXT[tier])}>{scoreText}</span>
        <span className={cn('text-[10px] font-semibold leading-none', DISC_TEXT[tier])}>/ 10</span>
      </div>

      <div className="flex min-w-0 flex-col gap-0.5">
        <span className="truncate text-base font-bold text-on-surface">{name}</span>
        {meta ? <span className="truncate text-sm text-muted">{meta}</span> : null}
        {gradesLabel ? <span className="truncate text-xs text-muted">Grades {gradesLabel}</span> : null}
      </div>
    </div>
  );
});
