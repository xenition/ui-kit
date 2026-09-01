import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar, Button, Card } from '../primitives';
import { LiveBadge } from './LiveBadge';
import { formatCount } from './types';
import type { ChannelCardProps } from './ChannelCard';

/** Drop-in for {@link ChannelCardProps} — same props, the V4 "spotlight" design. */
export type ChannelCardV4Props = ChannelCardProps;

/**
 * ChannelCard — **V4** "spotlight" design (web parity of the native V4). A rounded,
 * elevated live/creator card: the avatar sits inside a subtle brand-gradient glow
 * ring (the V4 signature — gradient reserved for the cover glow), with the name,
 * category, and — when `channel.live` — a `LiveBadge` plus a `formatCount` viewer
 * label. `onFollowToggle(next)` renders a **primary** follow `Button` (the one
 * accent, secondary once following) that stops propagation. `onClick(channel)`
 * opens the card, rendered as a `role="button"` `Card` with Enter/Space support
 * and a ≥44px tap target. Composes `Card` / `Avatar` / `Button`. Same
 * props/behavior as {@link ChannelCardProps}; all colors from `--xen-*` token
 * classes (no literal hex).
 */
export const ChannelCardV4 = React.forwardRef<HTMLDivElement, ChannelCardV4Props>(function ChannelCardV4(
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

  /* Avatar wrapped in a soft brand-gradient glow ring — the V4 cover glow. */
  const glowAvatar = (
    <span className="inline-flex shrink-0 rounded-full bg-gradient-to-br from-accent-400 to-primary-600 p-0.5">
      <span className="inline-flex rounded-full bg-surface p-0.5">
        <Avatar src={channel.avatarUrl} name={channel.name} size={avatarSize} />
      </span>
    </span>
  );

  const nameRow = (
    <div className="flex flex-wrap items-center gap-[var(--xen-space-sm)]">
      <span className="text-base font-bold text-on-surface">{channel.name}</span>
      {channel.live ? <LiveBadge variant={featured ? 'solid' : 'dot'} /> : null}
    </div>
  );

  const meta = subtitle ? <span className="truncate text-xs text-muted">{subtitle}</span> : null;

  const inner = grid ? (
    <div className="flex flex-col items-center gap-[var(--xen-space-sm)]">
      {glowAvatar}
      {nameRow}
      {meta}
      {followBtn}
    </div>
  ) : (
    <div className="flex items-center gap-[var(--xen-space-md)]">
      {glowAvatar}
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
        'flex flex-col gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)]',
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
