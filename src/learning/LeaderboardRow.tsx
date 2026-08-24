import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar } from '../primitives';

/** Medal glyph + token `text-*` tone for the top three ranks. */
const MEDAL: Record<number, { glyph: string; colorClass: string }> = {
  1: { glyph: '🥇', colorClass: 'text-accent' },
  2: { glyph: '🥈', colorClass: 'text-muted' },
  3: { glyph: '🥉', colorClass: 'text-warn' },
};

export interface LeaderboardRowProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 1-based rank. */
  rank: number;
  /** Participant name. */
  name?: string;
  /** Avatar image URL (initials fallback from `name`). */
  avatar?: string;
  /** Score / points. */
  score?: number;
  /** Unit label after the score (default "pts"). */
  scoreUnit?: string;
  /** Highlight this row as the current user. */
  highlighted?: boolean;
  /** Renders a muted empty placeholder slot (unfilled rank). */
  empty?: boolean;
  /** Optional short delta/trend note, e.g. "▲2". */
  trend?: string;
  /** Fires when the row is clicked. */
  onSelect?: () => void;
}

/**
 * A leaderboard entry row: rank (medal glyph for the top three), avatar, name,
 * and score. `highlighted` marks the current user; `empty` renders a muted
 * placeholder for an unfilled slot. Interactive rows are a `role="button"`
 * element with Enter/Space activation. Token-only colors (`--xen-*`).
 */
export const LeaderboardRow = React.forwardRef<HTMLDivElement, LeaderboardRowProps>(
  function LeaderboardRow(
    { rank, name, avatar, score, scoreUnit = 'pts', highlighted = false, empty = false, trend, onSelect, className, ...rest },
    ref
  ) {
    const medal = MEDAL[rank];
    const base = cn(
      'flex items-center gap-3 rounded-[var(--xen-radius-md)] border px-3 py-2',
      highlighted ? 'border-primary bg-primary' : 'border-border bg-surface',
      className
    );

    if (empty || !name) {
      return (
        <div ref={ref} aria-label={`Rank ${rank}, empty`} className={base} {...rest}>
          <span className="w-7 text-center text-sm font-bold text-muted">{rank}</span>
          <span className="h-8 w-8 rounded-full bg-border" />
          <span className="flex-1 text-sm text-muted">—</span>
        </div>
      );
    }

    const fgClass = highlighted ? 'text-on-primary' : 'text-on-surface';
    const mutedClass = highlighted ? 'text-on-primary' : 'text-muted';
    const rankClass = medal ? medal.colorClass : fgClass;
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
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        aria-label={a11y}
        onClick={interactive ? onSelect : undefined}
        onKeyDown={handleKeyDown}
        className={cn(
          base,
          interactive && 'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary'
        )}
        {...rest}
      >
        <span className={cn('w-7 text-center text-base font-extrabold', rankClass)}>
          {medal ? medal.glyph : rank}
        </span>
        <Avatar src={avatar} name={name} size="sm" />
        <span className={cn('min-w-0 flex-1 truncate text-sm', highlighted ? 'font-bold' : 'font-semibold', fgClass)}>
          {name}
        </span>
        {trend ? <span className={cn('text-xs', mutedClass)}>{trend}</span> : null}
        {score != null ? (
          <span className={cn('text-sm font-bold', fgClass)}>
            {score} {scoreUnit}
          </span>
        ) : null}
      </div>
    );
  }
);
