import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge } from '../primitives/Badge';
import { Button } from '../primitives/Button';
import { Card } from '../primitives/Card';
import { Icon } from '../primitives/Icon';
import { Rating } from '../primitives/Rating';
import type { GameRecord } from './types';

export type GameCardVariant = 'grid' | 'list' | 'featured';

export interface GameCardProps {
  /** The game to render. */
  game: GameRecord;
  /**
   * - `grid`     — cover above stacked meta (default).
   * - `list`     — cover left, meta right, single row.
   * - `featured` — large cover + rating + prominent action.
   */
  variant?: GameCardVariant;
  /** Show the action as busy + block it (e.g. install in flight). */
  loading?: boolean;
  /** Called when the card body is clicked — open the store page. */
  onClick?: (game: GameRecord) => void;
  /**
   * Called by the primary action. Shows a Play / Install button when set; the
   * label + a11y reflect `game.installed`.
   */
  onPlay?: (game: GameRecord) => void;
  /** Extra classes on the root card. */
  className?: string;
}

/**
 * A game / store title card — key art, title, genre, star rating, and a
 * Play/Install action. `onClick(game)` opens the title (the card becomes a
 * keyboard-operable `role="button"`); `onPlay(game)` runs the primary action
 * (a real `<button>`) with its label bound to `game.installed`. Composes `Card`,
 * `Button`, `Badge`, `Rating`. Token-only — no literal colors.
 */
export function GameCard({
  game,
  variant = 'grid',
  loading = false,
  onClick,
  onPlay,
  className,
}: GameCardProps): React.ReactElement {
  const list = variant === 'list';
  const featured = variant === 'featured';
  const aspect = list ? '' : featured ? 'aspect-video' : 'aspect-[3/4]';

  const cover = game.coverUrl ? (
    <img
      src={game.coverUrl}
      alt=""
      loading="lazy"
      className={cn(
        'rounded-[var(--xen-radius-md)] bg-neutral-200 object-cover',
        list ? 'h-[72px] w-[72px]' : cn('w-full', aspect)
      )}
    />
  ) : (
    <div
      aria-hidden="true"
      className={cn(
        'flex items-center justify-center rounded-[var(--xen-radius-md)] bg-primary',
        list ? 'h-[72px] w-[72px]' : cn('w-full', aspect)
      )}
    >
      <Icon glyph="🎮" size="2xl" color="onPrimary" />
    </div>
  );

  const action = onPlay ? (
    <Button
      variant={game.installed ? 'secondary' : 'primary'}
      size="sm"
      disabled={loading}
      aria-busy={loading || undefined}
      onClick={(e) => {
        e.stopPropagation();
        onPlay(game);
      }}
      aria-label={`${game.installed ? 'Play' : 'Install'} ${game.title}`}
    >
      {game.installed ? 'Play' : game.price ?? 'Install'}
    </Button>
  ) : null;

  const meta = (
    <div className={cn('flex flex-col gap-1', list && 'min-w-0 flex-1')}>
      <p className="line-clamp-2 text-base font-bold text-on-surface">{game.title}</p>
      <div className="flex flex-wrap items-center gap-[var(--xen-space-xs)]">
        {game.genre ? <Badge tone="primary">{game.genre}</Badge> : null}
        {game.installed ? <Badge tone="success">Installed</Badge> : null}
      </div>
      {game.rating != null && Number.isFinite(game.rating) ? (
        <Rating value={game.rating} size="sm" />
      ) : null}
    </div>
  );

  const inner = list ? (
    <div className="flex items-center gap-[var(--xen-space-md)]">
      {cover}
      {meta}
      {action ? <div>{action}</div> : null}
    </div>
  ) : (
    <div className="flex flex-col gap-[var(--xen-space-sm)]">
      {cover}
      {meta}
      {action ? <div className={featured ? 'self-stretch [&>*]:w-full' : 'self-start'}>{action}</div> : null}
    </div>
  );

  const interactive = Boolean(onClick);
  return (
    <Card
      className={cn(
        'flex flex-col gap-[var(--xen-space-sm)]',
        interactive && 'cursor-pointer transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
        className
      )}
      {...(interactive
        ? {
            role: 'button',
            tabIndex: 0,
            'aria-label': game.title,
            onClick: () => onClick!(game),
            onKeyDown: (e: React.KeyboardEvent) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick!(game);
              }
            },
          }
        : {})}
    >
      {inner}
    </Card>
  );
}
