import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar } from '../primitives/Avatar';
import { Icon } from '../primitives/Icon';
import { MentionText } from './MentionText';
import { EngagementBar } from './EngagementBar';

export type PostVariant = 'text' | 'image' | 'link' | 'video';

export interface PostAuthor {
  name: string;
  /** @handle without the `@`. */
  handle?: string;
  avatarUrl?: string;
  verified?: boolean;
}

export interface PostLink {
  url: string;
  title?: string;
  description?: string;
  /** Domain shown as the source line (e.g. `nytimes.com`). */
  domain?: string;
  imageUrl?: string;
}

export interface PostVideo {
  thumbnailUrl?: string;
  /** Duration overlay (e.g. `1:24`). */
  duration?: string;
}

export interface PostCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Media kind. `text` (no media), `image`, `link` preview, or `video`. */
  variant?: PostVariant;
  author: PostAuthor;
  /** Relative timestamp (e.g. `3h`). */
  timestamp?: string;
  /** Post body — `@mentions`/`#hashtags` are highlighted + clickable. */
  text?: string;
  /** `image` variant source. */
  imageUrl?: string;
  imageAlt?: string;
  /** `link` variant preview data. */
  link?: PostLink;
  /** `video` variant data. */
  video?: PostVideo;

  // ── engagement (footer) ──
  showEngagement?: boolean;
  likeCount?: number;
  commentCount?: number;
  shareCount?: number;
  liked?: boolean;
  bookmarked?: boolean;
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
  onBookmark?: () => void;

  // ── navigation ──
  onClick?: () => void;
  onPressAuthor?: () => void;
  onPressMenu?: () => void;
  onPressMention?: (handle: string) => void;
  onPressHashtag?: (tag: string) => void;

  /** Skeleton placeholder while the post loads. */
  loading?: boolean;
}

/**
 * The feed post — one component, four media variants (`text` / `image` /
 * `link` / `video`) sharing an author header, a mention-aware body, and an
 * optional {@link EngagementBar} footer. Has a `loading` skeleton and clickable
 * author/menu/body affordances. Web parity of the native `PostCard`; token-only.
 * When `onClick` is set the root is a keyboard-operable `role="button"` so the
 * nested action buttons remain independently focusable.
 */
export const PostCard = React.forwardRef<HTMLDivElement, PostCardProps>(function PostCard(
  {
    variant = 'text',
    author,
    timestamp,
    text,
    imageUrl,
    imageAlt,
    link,
    video,
    showEngagement = true,
    likeCount,
    commentCount,
    shareCount,
    liked,
    bookmarked,
    onLike,
    onComment,
    onShare,
    onBookmark,
    onClick,
    onPressAuthor,
    onPressMenu,
    onPressMention,
    onPressHashtag,
    loading = false,
    className,
    ...rest
  },
  ref
) {
  const containerClass = cn(
    'flex flex-col gap-sm rounded-lg border border-border bg-surface p-md',
    className
  );

  if (loading) {
    return (
      <div
        ref={ref}
        aria-busy="true"
        aria-label="Loading post"
        className={containerClass}
        {...rest}
      >
        <div className="flex animate-pulse items-center gap-sm">
          <div className="h-10 w-10 rounded-full bg-neutral-100" />
          <div className="flex flex-1 flex-col gap-xs">
            <div className="h-2.5 w-2/5 rounded-sm bg-neutral-100" />
            <div className="h-2 w-1/4 rounded-sm bg-neutral-100" />
          </div>
        </div>
        <div className="h-2.5 w-11/12 rounded-sm bg-neutral-100" />
        <div className="h-2.5 w-3/4 rounded-sm bg-neutral-100" />
        <div className="h-40 rounded-md bg-neutral-100" />
      </div>
    );
  }

  const header = (
    <div className="flex items-center gap-sm">
      {onPressAuthor ? (
        <button type="button" aria-label={author.name} onClick={onPressAuthor} className="shrink-0">
          <Avatar src={author.avatarUrl} name={author.name} size="md" />
        </button>
      ) : (
        <Avatar src={author.avatarUrl} name={author.name} size="md" className="shrink-0" />
      )}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center gap-xs">
          <span className="truncate text-base font-bold text-on-surface">{author.name}</span>
          {author.verified ? <Icon glyph="✓" size="sm" color="primary" aria-label="Verified" /> : null}
        </div>
        <span className="truncate text-xs text-muted">
          {[author.handle ? `@${author.handle}` : null, timestamp].filter(Boolean).join(' · ')}
        </span>
      </div>
      {onPressMenu ? (
        <button
          type="button"
          aria-label="More options"
          onClick={onPressMenu}
          className="px-xs text-lg font-bold text-muted transition-opacity hover:opacity-60"
        >
          ⋯
        </button>
      ) : null}
    </div>
  );

  const body = text ? (
    <MentionText text={text} onPressMention={onPressMention} onPressHashtag={onPressHashtag} />
  ) : null;

  let media: React.ReactNode = null;
  if (variant === 'image' && imageUrl) {
    media = (
      <img
        src={imageUrl}
        alt={imageAlt ?? 'Post image'}
        loading="lazy"
        className="aspect-[16/10] w-full rounded-md bg-neutral-100 object-cover"
      />
    );
  } else if (variant === 'video') {
    media = (
      <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-md bg-neutral-100">
        {video?.thumbnailUrl ? (
          <img src={video.thumbnailUrl} alt="Video thumbnail" loading="lazy" className="h-full w-full object-cover" />
        ) : null}
        <span
          className="absolute flex h-14 w-14 items-center justify-center rounded-full bg-on-surface text-xl text-surface opacity-80"
          aria-hidden="true"
        >
          ▶
        </span>
        {video?.duration ? (
          <span className="absolute bottom-sm right-sm rounded-sm bg-on-surface px-xs py-px text-xs font-semibold text-surface">
            {video.duration}
          </span>
        ) : null}
      </div>
    );
  } else if (variant === 'link' && link) {
    media = (
      <div className="overflow-hidden rounded-md border border-border">
        {link.imageUrl ? (
          <img
            src={link.imageUrl}
            alt={link.title ?? 'Link preview'}
            loading="lazy"
            className="aspect-[2/1] w-full bg-neutral-100 object-cover"
          />
        ) : null}
        <div className="flex flex-col gap-0.5 p-sm">
          {link.domain ? <span className="text-xs text-muted">{link.domain}</span> : null}
          <span className="line-clamp-2 text-sm font-bold text-on-surface">{link.title ?? link.url}</span>
          {link.description ? (
            <span className="line-clamp-2 text-xs text-muted">{link.description}</span>
          ) : null}
        </div>
      </div>
    );
  }

  const hasFooterData =
    onLike || onComment || onShare || onBookmark || likeCount != null || commentCount != null || shareCount != null;
  const footer =
    showEngagement && hasFooterData ? (
      <EngagementBar
        likeCount={likeCount}
        commentCount={commentCount}
        shareCount={shareCount}
        liked={liked}
        bookmarked={bookmarked}
        onLike={onLike}
        onComment={onComment}
        onShare={onShare}
        onBookmark={onBookmark}
        className="mt-xs"
      />
    ) : null;

  const inner = (
    <>
      {header}
      {body}
      {media}
      {footer}
    </>
  );

  if (onClick) {
    return (
      <div
        ref={ref}
        role="button"
        tabIndex={0}
        aria-label={`Post by ${author.name}`}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick();
          }
        }}
        className={cn(containerClass, 'cursor-pointer transition-opacity hover:opacity-[0.98]')}
        {...rest}
      >
        {inner}
      </div>
    );
  }
  return (
    <div ref={ref} className={containerClass} {...rest}>
      {inner}
    </div>
  );
});
