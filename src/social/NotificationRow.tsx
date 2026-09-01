import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar } from '../primitives/Avatar';
import { FollowButton } from './FollowButton';

/** The kind of activity — drives the default text template and the glyph badge. */
export type NotificationKind = 'like' | 'comment' | 'follow' | 'mention' | 'repost';

/** The person who triggered the notification. */
export interface NotificationActor {
  /** Display name (shown bold at the start of the action line). */
  name: string;
  /** Avatar image; falls back to initials from `name`. */
  avatarUrl?: string;
  /** Show the primary verified tick after the name. */
  verified?: boolean;
}

export interface NotificationRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Activity kind — picks the badge glyph/tint and the default action phrase. */
  kind: NotificationKind;
  /** Who triggered it (avatar + name). */
  actor: NotificationActor;
  /** Action text after the actor name; when omitted it is derived from `kind`. */
  text?: string;
  /** Relative timestamp shown muted at the end (e.g. `2h`). */
  time?: string;
  /** Unread state — adds a soft-primary row tint and a leading primary dot. */
  unread?: boolean;
  /** Thumbnail of the post the activity refers to, shown at the trailing edge. */
  thumbnailUrl?: string;
  /** Fires when the row is activated (keyboard + pointer). */
  onPress?: () => void;
  /**
   * For `kind="follow"`: whether the viewer already follows the actor back.
   * When defined (with `onFollow`) a trailing Follow/Following button replaces
   * the thumbnail.
   */
  following?: boolean;
  /** For `kind="follow"`: fires with the *next* desired state when the button is tapped. */
  onFollow?: (next: boolean) => void;
}

/** Default action phrase per kind, appended after the actor's name. */
const DEFAULT_TEXT: Record<NotificationKind, string> = {
  like: 'liked your post',
  comment: 'commented on your post',
  follow: 'started following you',
  mention: 'mentioned you',
  repost: 'reposted your post',
};

/** Small kind glyph shown as a badge overlapping the avatar. */
const KIND_GLYPH: Record<NotificationKind, string> = {
  like: '❤',
  comment: '💬',
  follow: '＋',
  mention: '@',
  repost: '🔁',
};

/**
 * A semantic token class for the badge fill per kind — one accent (primary) for
 * the connective kinds, with `like` on danger to read as a heart.
 */
const KIND_BADGE_CLASS: Record<NotificationKind, string> = {
  like: 'bg-danger text-on-danger',
  comment: 'bg-primary text-on-primary',
  follow: 'bg-primary text-on-primary',
  mention: 'bg-primary text-on-primary',
  repost: 'bg-success text-on-success',
};

/**
 * NotificationRow — **V4** "feed" design. A single activity/notification item:
 * the actor's big avatar carries a small kind-glyph badge (❤ / 💬 / ＋ / @ / 🔁)
 * tinted by a semantic token, followed by a bold-name action line and a muted
 * time. `unread` paints a soft-primary row tint and a leading primary dot. A
 * trailing slot shows either the referenced post's `thumbnailUrl` or — for the
 * follow kind — a {@link FollowButton}. Presentational; token-only colors via
 * `--xen-*` classes. Web parity of the native `NotificationRow`. When `onPress`
 * is set the root is a keyboard-operable `role="button"`.
 */
export const NotificationRow = React.forwardRef<HTMLDivElement, NotificationRowProps>(
  function NotificationRow(
    { kind, actor, text, time, unread = false, thumbnailUrl, onPress, following, onFollow, className, ...rest },
    ref
  ) {
    const body = text ?? DEFAULT_TEXT[kind];

    const showFollow = kind === 'follow' && (onFollow != null || following != null);

    const trailing = showFollow ? (
      <FollowButton
        state={following ? 'following' : 'follow'}
        size="sm"
        onClick={onFollow ? () => onFollow(!following) : undefined}
      />
    ) : thumbnailUrl ? (
      <img
        src={thumbnailUrl}
        alt=""
        loading="lazy"
        className="h-11 w-11 shrink-0 rounded-[var(--xen-radius-md)] bg-on-surface/10 object-cover"
      />
    ) : null;

    const inner = (
      <>
        {unread ? (
          <span aria-hidden="true" className="h-2 w-2 shrink-0 self-center rounded-full bg-primary" />
        ) : (
          <span aria-hidden="true" className="h-2 w-2 shrink-0 self-center" />
        )}

        <div className="relative shrink-0">
          <Avatar src={actor.avatarUrl} name={actor.name} size="lg" />
          <span
            aria-hidden="true"
            className={cn(
              'absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-surface text-xs leading-none',
              KIND_BADGE_CLASS[kind]
            )}
          >
            {KIND_GLYPH[kind]}
          </span>
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          <p className="text-sm text-on-surface">
            <span className="font-extrabold">{actor.name}</span>
            {actor.verified ? (
              <span aria-label="Verified" className="pl-xs text-xs text-primary">
                ✓
              </span>
            ) : null}
            <span className="text-muted"> {body}</span>
          </p>
          {time ? <span className="text-xs text-muted">{time}</span> : null}
        </div>

        {trailing}
      </>
    );

    const rowClass = cn(
      'flex items-center gap-sm rounded-[var(--xen-radius-lg)] p-md',
      unread ? 'bg-primary/10' : 'bg-surface',
      className
    );

    const a11yLabel = `${actor.name} ${body}${time ? `, ${time}` : ''}${unread ? ', unread' : ''}`;

    if (onPress) {
      return (
        <div
          ref={ref}
          role="button"
          tabIndex={0}
          aria-label={a11yLabel}
          onClick={onPress}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onPress();
            }
          }}
          className={cn(rowClass, 'min-h-[44px] cursor-pointer transition-colors hover:bg-primary/10')}
          {...rest}
        >
          {inner}
        </div>
      );
    }

    return (
      <div ref={ref} role="listitem" aria-label={a11yLabel} className={cn(rowClass, 'min-h-[44px]')} {...rest}>
        {inner}
      </div>
    );
  }
);
