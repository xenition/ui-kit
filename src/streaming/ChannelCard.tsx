import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar, Button, Card } from '../primitives';
import { LiveBadge } from './LiveBadge';
import { formatCount, type StreamChannel } from './types';

export type ChannelCardVariant = 'row' | 'grid' | 'featured';

export interface ChannelCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** The channel / creator to render. */
  channel: StreamChannel;
  /** Whether the user follows this channel (controlled) — toggles the action. */
  following?: boolean;
  /**
   * - `row`      — avatar left, meta right, single row (default).
   * - `grid`     — centered avatar + name + follow, tile-friendly.
   * - `featured` — larger avatar + category + live badge + follow.
   */
  variant?: ChannelCardVariant;
  /** Card click — open the channel (maps native `onPress`). */
  onClick?: (channel: StreamChannel) => void;
  /** Called with the next following state; shows a follow control when set. */
  onFollowToggle?: (next: boolean) => void;
}

/**
 * A channel / creator card (web) — avatar, name, category, a `LiveBadge` (with
 * viewer count) when `channel.live`, and an optional follow button.
 * `onClick(channel)` opens it (rendered as a `role="button"` `Card` with
 * Enter/Space support); `onFollowToggle(next)` flips the follow state via a
 * `Button` (stops propagation) with the label + a11y reflecting `following`.
 * Composes `Card` / `Avatar` / `Button`. Token-only — no literal hex.
 */
export const ChannelCard = React.forwardRef<HTMLDivElement, ChannelCardProps>(function ChannelCard(
  { channel, following = false, variant = 'row', onClick, onFollowToggle, className, ...rest },
  ref
) {
  const grid = variant === 'grid';
  const featured = variant === 'featured';
  const avatarSize = featured || grid ? 'lg' : 'md';
  const interactive = !!onClick;

  const followBtn = onFollowToggle ? (
    <Button
      variant={following ? 'secondary' : 'primary'}
      size="sm"
      onClick={(e) => {
        e.stopPropagation();
        onFollowToggle(!following);
      }}
      aria-label={following ? `Unfollow ${channel.name}` : `Follow ${channel.name}`}
    >
      {following ? 'Following' : 'Follow'}
    </Button>
  ) : null;

  const subtitle = [
    channel.category,
    channel.live && channel.viewers != null ? `${formatCount(channel.viewers)} watching` : undefined,
  ]
    .filter(Boolean)
    .join(' · ');

  const nameRow = (
    <div className="flex flex-wrap items-center gap-[var(--xen-space-sm)]">
      <span className="text-base font-bold text-on-surface">{channel.name}</span>
      {channel.live ? <LiveBadge variant={featured ? 'solid' : 'dot'} /> : null}
    </div>
  );

  const meta = subtitle ? <span className="truncate text-xs text-muted">{subtitle}</span> : null;

  const inner = grid ? (
    <div className="flex flex-col items-center gap-[var(--xen-space-sm)]">
      <Avatar src={channel.avatarUrl} name={channel.name} size={avatarSize} />
      {nameRow}
      {meta}
      {followBtn}
    </div>
  ) : (
    <div className="flex items-center gap-[var(--xen-space-md)]">
      <Avatar src={channel.avatarUrl} name={channel.name} size={avatarSize} />
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        {nameRow}
        {meta}
      </div>
      {followBtn}
    </div>
  );

  return (
    <Card
      ref={ref}
      data-xen-channel-card=""
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={interactive ? channel.name : undefined}
      onClick={interactive ? () => onClick!(channel) : undefined}
      onKeyDown={
        interactive
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick!(channel);
              }
            }
          : undefined
      }
      className={cn(
        'flex flex-col gap-[var(--xen-space-sm)]',
        interactive &&
          'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
        className
      )}
      {...rest}
    >
      {inner}
    </Card>
  );
});
