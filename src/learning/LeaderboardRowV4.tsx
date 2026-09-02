import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar } from '../primitives';
import type { LeaderboardRowProps } from './LeaderboardRow';

/** V4 layout choices for the "campus" design. */
export type LeaderboardRowLayout = 'full' | 'compact';

/** Drop-in for {@link LeaderboardRowProps} — same props, the V4 "campus" design. */
export interface LeaderboardRowV4Props extends LeaderboardRowProps {
  /** V4 layout: `full` (default) or `compact` (denser single line). */
  variant?: LeaderboardRowLayout;
}

const MEDAL: Record<number, { glyph: string; text: string }> = {
  1: { glyph: '🥇', text: 'text-accent' },
  2: { glyph: '🥈', text: 'text-muted' },
  3: { glyph: '🥉', text: 'text-warn' },
};

/**
 * LeaderboardRow — **V4** "campus" design (web parity of the native V4). An
 * elevated rounded row with a soft shadow: rank (a medal glyph for the top three),
 * avatar, name, an optional trend note, and a big legible **tabular-nums** score.
 * `highlighted` marks the current user with a primary ring; `empty` renders a
 * muted placeholder for an unfilled slot. Interactive rows are a keyboard-operable
 * `role="button"`. Honors the V4 `variant` — `full` (default) and `compact` (a
 * denser single line). All colors from `--xen-*` token classes (no literals).
 */
export const LeaderboardRowV4 = React.forwardRef<HTMLDivElement, LeaderboardRowV4Props>(function LeaderboardRowV4(
  { rank, name, avatar, score, scoreUnit = 'pts', highlighted = false, empty = false, trend, variant = 'full', onSelect, className, ...rest },
  ref
) {
  const medal = MEDAL[rank];
  const compact = variant === 'compact';
  const shell = cn(
    'flex items-center gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface shadow-sm px-[var(--xen-space-md)]',
    compact ? 'py-[var(--xen-space-xs)]' : 'py-[var(--xen-space-sm)]',
    highlighted && 'ring-2 ring-primary',
    className
  );

  if (empty || !name) {
    return (
      <div ref={ref} data-xen-leaderboard-row="" aria-label={`Rank ${rank}, empty`} className={shell} {...rest}>
        <span className="w-7 text-center text-sm font-bold tabular-nums text-muted">{rank}</span>
        <span className="h-8 w-8 rounded-full bg-neutral-100" />
        <span className="flex-1 text-sm text-muted">—</span>
      </div>
    );
  }

  const rankClass = medal ? medal.text : 'text-on-surface';
  const a11y = `Rank ${rank}, ${name}${score != null ? `, ${score} ${scoreUnit}` : ''}${highlighted ? ', you' : ''}`;
  const interactive = !!onSelect;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    if (!interactive) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect?.();
    }
  };

  return (
    <div
      ref={ref}
      data-xen-leaderboard-row=""
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={a11y}
      onClick={interactive ? onSelect : undefined}
      onKeyDown={handleKeyDown}
      className={cn(shell, interactive && 'cursor-pointer transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary')}
      {...rest}
    >
      <span className={cn('w-7 shrink-0 text-center text-lg font-extrabold tabular-nums', rankClass)}>{medal ? medal.glyph : rank}</span>
      <Avatar src={avatar} name={name} size="sm" />
      <span className={cn('min-w-0 flex-1 truncate text-sm', highlighted ? 'font-bold' : 'font-semibold', 'text-on-surface')}>{name}</span>
      {trend ? <span className="text-xs tabular-nums text-muted">{trend}</span> : null}
      {score != null ? <span className="shrink-0 text-sm font-bold tabular-nums text-on-surface">{score} {scoreUnit}</span> : null}
    </div>
  );
});
