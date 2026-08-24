import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge } from '../primitives/Badge';
import { Button } from '../primitives/Button';
import { Card } from '../primitives/Card';
import { Icon } from '../primitives/Icon';
import { clamp, type GameLobby } from './types';

export type LobbyRowVariant = 'default' | 'compact';

export interface LobbyRowProps {
  /** The lobby / room to render. */
  lobby: GameLobby;
  /** Variant — `compact` drops the mode line + slot bar. */
  variant?: LobbyRowVariant;
  /** Show the join button as busy + block it (join in flight). */
  joining?: boolean;
  /** Called when the join button is clicked. Renders the button when set. */
  onJoin?: (lobby: GameLobby) => void;
  /** Extra classes on the root card. */
  className?: string;
}

/**
 * One joinable lobby / room row — name, host, mode, a filled/total slot meter,
 * and a Join button. The button disables (with a "Full" / "In progress" label,
 * not color alone) when the room can't be joined. `onJoin(lobby)` fires the
 * intent. Composes `Card`, `Button`, `Badge`, `Icon`. Token-only.
 */
export function LobbyRow({
  lobby,
  variant = 'default',
  joining = false,
  onJoin,
  className,
}: LobbyRowProps): React.ReactElement {
  const compact = variant === 'compact';

  const cap = Math.max(0, lobby.capacity);
  const filled = clamp(lobby.players, 0, cap || lobby.players);
  const isFull = cap > 0 && filled >= cap;
  const joinable = !isFull && !lobby.inProgress;
  const joinLabel = lobby.inProgress ? 'In progress' : isFull ? 'Full' : 'Join';

  const slots = cap > 0 ? Array.from({ length: cap }, (_, i) => i < filled) : [];
  const subline = [lobby.host ? `Host ${lobby.host}` : undefined, !compact ? lobby.mode : undefined]
    .filter(Boolean)
    .join(' · ');

  return (
    <Card className={cn('flex flex-col', compact ? 'gap-[var(--xen-space-xs)]' : 'gap-[var(--xen-space-sm)]', className)}>
      <div className="flex items-center gap-[var(--xen-space-md)]">
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <div className="flex items-center gap-[var(--xen-space-xs)]">
            {lobby.locked ? <Icon glyph="🔒" size="sm" color="muted" aria-label="Locked" /> : null}
            <span className="min-w-0 truncate text-base font-bold text-on-surface">{lobby.name}</span>
          </div>
          <span className="truncate text-xs text-muted">{subline || ' '}</span>
        </div>
        <Badge tone={isFull ? 'danger' : 'neutral'}>{`${filled}/${cap || lobby.players}`}</Badge>
        {onJoin ? (
          <Button
            variant={joinable ? 'primary' : 'secondary'}
            size="sm"
            disabled={!joinable || joining}
            aria-busy={joining || undefined}
            onClick={() => onJoin(lobby)}
            aria-label={`${joinLabel} ${lobby.name}`}
          >
            {joinLabel}
          </Button>
        ) : null}
      </div>

      {!compact && slots.length > 0 ? (
        <div className="flex gap-[3px]" aria-label={`${filled} of ${cap} slots filled`}>
          {slots.map((on, i) => (
            <span
              key={i}
              className={cn('h-1 flex-1 rounded-full', on ? 'bg-primary' : 'bg-border')}
            />
          ))}
        </div>
      ) : null}
    </Card>
  );
}
