import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar } from '../primitives/Avatar';
import { Icon } from '../primitives/Icon';
import { MentionText } from './MentionText';
import { EngagementBar } from './EngagementBar';
import type { PostCardProps } from './PostCard';

/** Drop-in for {@link PostCard} — identical props, a different design. */
export type PostCardV3Props = PostCardProps;

/**
 * PostCard, design V3 — **minimal & borderless** with a colored **left accent
 * rail**. No card fill or shadow: the post reads as a thread entry — header on
 * one line, a tight body, small inline media, and a flat engagement row. Link
 * previews collapse to a side-by-side chip. Same props as {@link PostCard} (all
 * four `variant`s), token-only.
 */
export const PostCardV3 = React.forwardRef<HTMLDivElement, PostCardV3Props>(function PostCardV3(
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
    'flex flex-col gap-sm rounded-sm border-l-[3px] border-primary bg-transparent py-sm pl-md',
    className
  );

  if (loading) {
    return (
      <div ref={ref} aria-busy="true" aria-label="Loading post" className={containerClass} {...rest}>
        <div className="flex animate-pulse items-center gap-sm">
          <div className="h-8 w-8 rounded-full bg-neutral-100" />
          <div className="h-2.5 w-2/5 rounded-sm bg-neutral-100" />
        </div>
        <div className="h-2.5 w-11/12 animate-pulse rounded-sm bg-neutral-100" />
        <div className="h-2.5 w-3/5 animate-pulse rounded-sm bg-neutral-100" />
      </div>
    );
  }

  const header = (
    <div className="flex items-center gap-sm">
      {onPressAuthor ? (
        <button type="button" aria-label={author.name} onClick={onPressAuthor} className="shrink-0">
          <Avatar src={author.avatarUrl} name={author.name} size="sm" />
        </button>
      ) : (
        <Avatar src={author.avatarUrl} name={author.name} size="sm" className="shrink-0" />
      )}
      <div className="flex min-w-0 flex-1 flex-wrap items-center gap-xs">
        <span className="truncate text-sm font-bold text-on-surface">{author.name}</span>
        {author.verified ? <Icon glyph="✓" size="sm" color="primary" aria-label="Verified" /> : null}
        <span className="truncate text-xs text-muted">
          {[author.handle ? `@${author.handle}` : null, timestamp].filter(Boolean).join(' · ')}
        </span>
      </div>
      {onPressMenu ? (
        <button
          type="button"
          aria-label="More options"
          onClick={onPressMenu}
          className="px-xs text-base font-bold text-muted transition-opacity hover:opacity-60"
        >
          ⋯
        </button>
      ) : null}
    </div>
  );

  const body = text ? (
    <MentionText text={text} size="sm" onPressMention={onPressMention} onPressHashtag={onPressHashtag} />
  ) : null;

  let media: React.ReactNode = null;
  if (variant === 'image' && imageUrl) {
    media = (
      <img
        src={imageUrl}
        alt={imageAlt ?? 'Post image'}
        loading="lazy"
        className="aspect-video w-full rounded-md bg-neutral-100 object-cover"
      />
    );
  } else if (variant === 'video') {
    media = (
      <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-md bg-neutral-100">
        {video?.thumbnailUrl ? (
          <img src={video.thumbnailUrl} alt="Video thumbnail" loading="lazy" className="h-full w-full object-cover" />
        ) : null}
        <span
          className="absolute flex h-11 w-11 items-center justify-center rounded-full bg-on-surface text-lg text-surface opacity-80"
          aria-hidden="true"
        >
          ▶
        </span>
        {video?.duration ? (
          <span className="absolute bottom-xs right-xs rounded-sm bg-on-surface px-xs py-px text-xs font-semibold text-surface">
            {video.duration}
          </span>
        ) : null}
      </div>
    );
  } else if (variant === 'link' && link) {
    media = (
      <div className="flex items-center gap-sm overflow-hidden rounded-md bg-surface pr-sm">
        {link.imageUrl ? (
          <img
            src={link.imageUrl}
            alt={link.title ?? 'Link preview'}
            loading="lazy"
            className="h-14 w-14 shrink-0 bg-neutral-100 object-cover"
          />
        ) : (
          <div className="h-14 w-14 shrink-0 bg-neutral-100" />
        )}
        <div className="flex min-w-0 flex-1 flex-col py-xs">
          <span className="truncate text-sm font-bold text-on-surface">{link.title ?? link.url}</span>
          {link.domain ? <span className="truncate text-xs text-muted">{link.domain}</span> : null}
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
