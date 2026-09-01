import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar } from '../primitives/Avatar';
import { MentionText } from './MentionText';
import { EngagementBar } from './EngagementBar';
import type { PostCardProps } from './PostCard';

/** Drop-in for {@link PostCardProps} — same props, the V4 "feed" design. */
export type PostCardV4Props = PostCardProps;

/**
 * PostCard — **V4** "feed" design (web parity of the native V4). The clean, airy
 * take on a feed post: an elevated rounded card with generous whitespace, a
 * larger avatar, a bold name with a primary verified tick, a mention-aware body,
 * rounded media, and the {@link EngagementBar} footer. Same props/behavior as
 * {@link PostCardProps}; all colors from `--xen-*` token classes (no literals).
 * `loading` shows a skeleton.
 */
export const PostCardV4 = React.forwardRef<HTMLDivElement, PostCardV4Props>(function PostCardV4(
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
    'flex flex-col gap-md rounded-[var(--xen-radius-lg)] border border-border bg-surface p-lg shadow-sm',
    className
  );

  if (loading) {
    return (
      <div ref={ref} aria-label="Loading post" className={containerClass} {...rest}>
        <div className="flex animate-pulse items-center gap-sm">
          <div className="h-12 w-12 rounded-full bg-on-surface/10" />
          <div className="flex flex-1 flex-col gap-xs">
            <div className="h-2.5 w-2/5 rounded-sm bg-on-surface/10" />
            <div className="h-2 w-1/4 rounded-sm bg-on-surface/10" />
          </div>
        </div>
        <div className="h-2.5 w-11/12 rounded-sm bg-on-surface/10" />
        <div className="h-2.5 w-3/4 rounded-sm bg-on-surface/10" />
        <div className="h-44 rounded-[var(--xen-radius-lg)] bg-on-surface/10" />
      </div>
    );
  }

  const header = (
    <div className="flex items-center gap-sm">
      {onPressAuthor ? (
        <button type="button" aria-label={author.name} onClick={onPressAuthor} className="shrink-0">
          <Avatar src={author.avatarUrl} name={author.name} size="lg" />
        </button>
      ) : (
        <Avatar src={author.avatarUrl} name={author.name} size="lg" className="shrink-0" />
      )}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center gap-xs">
          <span className="truncate text-base font-extrabold text-on-surface">{author.name}</span>
          {author.verified ? (
            <span aria-label="Verified" className="text-sm text-primary">
              ✓
            </span>
          ) : null}
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

  const body = text ? <MentionText text={text} onPressMention={onPressMention} onPressHashtag={onPressHashtag} /> : null;

  let media: React.ReactNode = null;
  if (variant === 'image' && imageUrl) {
    media = (
      <img
        src={imageUrl}
        alt={imageAlt ?? 'Post image'}
        loading="lazy"
        className="aspect-[16/10] w-full rounded-[var(--xen-radius-lg)] bg-on-surface/10 object-cover"
      />
    );
  } else if (variant === 'video') {
    media = (
      <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-[var(--xen-radius-lg)] bg-on-surface/10">
        {video?.thumbnailUrl ? <img src={video.thumbnailUrl} alt="Video thumbnail" loading="lazy" className="h-full w-full object-cover" /> : null}
        <span className="absolute flex h-14 w-14 items-center justify-center rounded-full bg-primary text-xl text-on-primary">▶</span>
        {video?.duration ? (
          <span className="absolute bottom-sm right-sm rounded-sm bg-on-surface px-xs py-px text-xs font-semibold text-surface">{video.duration}</span>
        ) : null}
      </div>
    );
  } else if (variant === 'link' && link) {
    media = (
      <div className="overflow-hidden rounded-[var(--xen-radius-lg)] border border-border">
        {link.imageUrl ? <img src={link.imageUrl} alt={link.title ?? 'Link preview'} loading="lazy" className="aspect-[2/1] w-full bg-on-surface/10 object-cover" /> : null}
        <div className="flex flex-col gap-0.5 p-sm">
          {link.domain ? <span className="text-xs text-muted">{link.domain}</span> : null}
          <span className="line-clamp-2 text-sm font-bold text-on-surface">{link.title ?? link.url}</span>
          {link.description ? <span className="line-clamp-2 text-xs text-muted">{link.description}</span> : null}
        </div>
      </div>
    );
  }

  const footer =
    showEngagement && (onLike || onComment || onShare || onBookmark || likeCount != null || commentCount != null || shareCount != null) ? (
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
