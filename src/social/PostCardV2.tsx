import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar } from '../primitives/Avatar';
import { Icon } from '../primitives/Icon';
import { MentionText } from './MentionText';
import { EngagementBar } from './EngagementBar';
import type { PostCardProps } from './PostCard';

/** Drop-in for {@link PostCard} — identical props, a different design. */
export type PostCardV2Props = PostCardProps;

/**
 * PostCard, design V2 — an **elevated, media-forward** post. The media leads
 * (big imagery, no border), the engagement bar **floats** in a shadowed pill
 * bridging the media and the body, and the author sits beneath. Text-only posts
 * get a tinted hero block. Same props as {@link PostCard} (all four `variant`s),
 * token-only.
 */
export const PostCardV2 = React.forwardRef<HTMLDivElement, PostCardV2Props>(function PostCardV2(
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
    'flex flex-col gap-sm rounded-lg bg-surface p-md shadow-lg',
    className
  );

  if (loading) {
    return (
      <div ref={ref} aria-busy="true" aria-label="Loading post" className={containerClass} {...rest}>
        <div className="h-48 animate-pulse rounded-md bg-neutral-100" />
        <div className="flex animate-pulse items-center gap-sm">
          <div className="h-10 w-10 rounded-full bg-neutral-100" />
          <div className="flex flex-1 flex-col gap-xs">
            <div className="h-2.5 w-2/5 rounded-sm bg-neutral-100" />
            <div className="h-2 w-1/4 rounded-sm bg-neutral-100" />
          </div>
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
        className="flex-1 justify-between"
      />
    ) : null;

  let media: React.ReactNode = null;
  if (variant === 'image' && imageUrl) {
    media = (
      <img
        src={imageUrl}
        alt={imageAlt ?? 'Post image'}
        loading="lazy"
        className="aspect-[4/5] w-full rounded-md bg-neutral-100 object-cover"
      />
    );
  } else if (variant === 'video') {
    media = (
      <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-md bg-neutral-100">
        {video?.thumbnailUrl ? (
          <img src={video.thumbnailUrl} alt="Video thumbnail" loading="lazy" className="h-full w-full object-cover" />
        ) : null}
        <span
          className="absolute flex h-16 w-16 items-center justify-center rounded-full bg-on-surface text-2xl text-surface opacity-60"
          aria-hidden="true"
        >
          ▶
        </span>
        {video?.duration ? (
          <span className="absolute right-sm top-sm rounded-full bg-on-surface px-sm py-px text-xs font-bold text-surface opacity-70">
            {video.duration}
          </span>
        ) : null}
      </div>
    );
  } else if (variant === 'link' && link) {
    media = (
      <div className="overflow-hidden rounded-md bg-primary/10">
        {link.imageUrl ? (
          <img
            src={link.imageUrl}
            alt={link.title ?? 'Link preview'}
            loading="lazy"
            className="aspect-[2/1] w-full bg-neutral-100 object-cover"
          />
        ) : null}
        <div className="flex flex-col gap-0.5 p-md">
          {link.domain ? <span className="text-xs font-bold text-primary">{link.domain}</span> : null}
          <span className="line-clamp-2 text-base font-bold text-on-surface">{link.title ?? link.url}</span>
          {link.description ? (
            <span className="line-clamp-2 text-xs text-muted">{link.description}</span>
          ) : null}
        </div>
      </div>
    );
  } else if (variant === 'text' && text) {
    media = (
      <div className="rounded-md bg-primary/10 p-lg">
        <MentionText text={text} size="lg" onPressMention={onPressMention} onPressHashtag={onPressHashtag} />
      </div>
    );
  }

  const header = (
    <div className="flex items-center gap-sm">
      {onPressAuthor ? (
        <button type="button" aria-label={author.name} onClick={onPressAuthor} className="shrink-0">
          <Avatar src={author.avatarUrl} name={author.name} size="md" ring />
        </button>
      ) : (
        <Avatar src={author.avatarUrl} name={author.name} size="md" ring className="shrink-0" />
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

  const caption =
    text && variant !== 'text' ? (
      <MentionText text={text} onPressMention={onPressMention} onPressHashtag={onPressHashtag} />
    ) : null;

  const inner = (
    <>
      {media ? (
        <div className={cn('relative', footer && 'mb-lg')}>
          {media}
          {footer ? (
            <div className="absolute inset-x-md -bottom-md flex items-center rounded-full bg-surface px-md py-xs shadow-md">
              {footer}
            </div>
          ) : null}
        </div>
      ) : null}
      {header}
      {caption}
      {!media && footer ? footer : null}
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
        className={cn(
          containerClass,
          'cursor-pointer transition hover:-translate-y-0.5 hover:shadow-lg',
          'motion-reduce:transition-none motion-reduce:hover:transform-none'
        )}
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
