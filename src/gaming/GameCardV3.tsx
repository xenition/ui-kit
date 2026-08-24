import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button } from '../primitives/Button';
import type { GameCardProps } from './GameCard';

/** Same public contract as {@link GameCard} — a drop-in alternate design. */
export type GameCardV3Props = GameCardProps;

/**
 * GameCard, redesigned (v3): a **dense library row**. A small cover thumbnail, the
 * title over a genre·rating line, the price, and a compact Play/Install — hairline-
 * bordered for a list. The opposite of v2's cover hero. Same props, token-only.
 */
export const GameCardV3 = React.forwardRef<HTMLDivElement, GameCardV3Props>(function GameCardV3(
  { game, variant, loading = false, onClick, onPlay, className },
  ref
) {
  void variant;
  const interactive = typeof onClick === 'function';
  const meta = [game.genre, typeof game.rating === 'number' ? `★ ${game.rating.toFixed(1)}` : null, game.price].filter((s): s is string => !!s).join(' · ');

  return (
    <div ref={ref} data-xen-game-card="" className={cn('flex items-center gap-3 border-b border-border py-2.5', className)}>
      <button
        type="button"
        aria-label={interactive ? `Open ${game.title}` : game.title}
        onClick={interactive ? () => onClick?.(game) : undefined}
        disabled={!interactive}
        className="flex min-w-0 flex-1 items-center gap-3 text-left"
      >
        <span className="flex h-14 w-11 shrink-0 items-center justify-center overflow-hidden rounded-md bg-neutral-100 text-xl">
          {game.coverUrl ? <img src={game.coverUrl} alt="" className="h-full w-full object-cover" /> : '🎮'}
        </span>
        <span className="min-w-0">
          <span className="block truncate text-sm font-semibold text-on-surface">{game.title}</span>
          {meta ? <span className="block truncate text-xs text-muted">{meta}</span> : null}
        </span>
      </button>
      {onPlay ? (
        <Button size="sm" variant="outline" disabled={loading} onClick={() => onPlay(game)}>
          {game.installed ? 'Play' : 'Install'}
        </Button>
      ) : null}
    </div>
  );
});
