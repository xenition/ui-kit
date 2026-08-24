import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button } from '../primitives/Button';
import type { GameCardProps } from './GameCard';

/** Same public contract as {@link GameCard} — a drop-in alternate design. */
export type GameCardV2Props = GameCardProps;

/**
 * GameCard, redesigned (v2): a **cover-hero store card**. The key art fills the
 * card; a rating badge and price float over it, the title/genre sit on a scrim,
 * and a Play/Install button anchors the foot. Elevated, hover-lift. Distinct from
 * v1. Same props, token-only.
 */
export const GameCardV2 = React.forwardRef<HTMLDivElement, GameCardV2Props>(function GameCardV2(
  { game, variant, loading = false, onClick, onPlay, className },
  ref
) {
  void variant;
  const interactive = typeof onClick === 'function';
  return (
    <div ref={ref} data-xen-game-card="" className={cn('flex flex-col overflow-hidden rounded-lg bg-surface shadow-md transition-transform hover:-translate-y-0.5 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0', className)}>
      <button
        type="button"
        aria-label={interactive ? `Open ${game.title}` : game.title}
        onClick={interactive ? () => onClick?.(game) : undefined}
        disabled={!interactive}
        className="relative block aspect-[3/4] w-full overflow-hidden bg-neutral-100 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
      >
        {game.coverUrl ? <img src={game.coverUrl} alt="" className="h-full w-full object-cover" /> : <span className="flex h-full w-full items-center justify-center text-5xl">🎮</span>}
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-2">
          {typeof game.rating === 'number' ? <span className="rounded-full bg-neutral-900/60 px-2 py-0.5 text-xs font-bold text-neutral-50">★ {game.rating.toFixed(1)}</span> : <span />}
          {game.price ? <span className="rounded-full bg-surface/90 px-2 py-0.5 text-xs font-bold text-on-surface">{game.price}</span> : null}
        </div>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-neutral-900/75 to-transparent p-2 pt-8">
          <p className="truncate text-sm font-bold text-neutral-50">{game.title}</p>
          {game.genre ? <p className="truncate text-xs text-neutral-300">{game.genre}</p> : null}
        </div>
      </button>
      {onPlay ? (
        <div className="p-2">
          <Button size="md" variant="primary" className="w-full" disabled={loading} onClick={() => onPlay(game)}>
            {game.installed ? 'Play' : 'Install'}
          </Button>
        </div>
      ) : null}
    </div>
  );
});
