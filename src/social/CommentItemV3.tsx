import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar } from '../primitives/Avatar';
import { MentionText } from './MentionText';
import type { CommentItemProps } from './CommentItem';

/** Drop-in for {@link CommentItem} — identical props, a different design. */
export type CommentItemV3Props = CommentItemProps;

/**
 * CommentItem, design V3 — **flat & threaded** with a thin **indent rail**. No
 * bubble: a tiny inline avatar, a single author line, a tight body, and a
 * compact action row. Nested replies (`depth` > 0) draw a hairline vertical rail
 * on the left to show the thread. Same props as {@link CommentItem}; token-only,
 * minimal/structural idiom.
 */
export const CommentItemV3 = React.forwardRef<HTMLDivElement, CommentItemV3Props>(
  function CommentItemV3(
    {
      author,
      handle,
      avatarUrl,
      text,
      timestamp,
      likeCount = 0,
      liked = false,
      depth = 0,
      pinned = false,
      onLike,
      onReply,
      onPressAuthor,
      onPressMention,
      onPressHashtag,
      children,
      className,
      ...rest
    },
    ref
  ) {
    const nested = Math.max(0, depth) > 0;

    return (
      <div ref={ref} className={cn('flex', className)} {...rest}>
        {nested ? (
          <div className="flex w-lg shrink-0 justify-center" aria-hidden="true">
            <div className="w-0.5 flex-1 rounded-full bg-border" />
          </div>
        ) : null}
        <div
          className={cn(
            'flex min-w-0 flex-1 flex-col gap-xs rounded-sm',
            pinned && 'border-l-2 border-primary bg-primary/10 p-sm'
          )}
        >
          <div className="flex flex-wrap items-center gap-xs">
            {onPressAuthor ? (
              <button type="button" aria-label={author} onClick={onPressAuthor} className="shrink-0">
                <Avatar src={avatarUrl} name={author} size="xs" />
              </button>
            ) : (
              <Avatar src={avatarUrl} name={author} size="xs" className="shrink-0" />
            )}
            <span className="text-sm font-bold text-on-surface">{author}</span>
            {handle ? <span className="text-xs text-muted">@{handle}</span> : null}
            {timestamp ? <span className="text-xs text-muted">· {timestamp}</span> : null}
            {pinned ? <span className="text-xs font-semibold text-primary">· Pinned</span> : null}
          </div>

          <MentionText
            text={text}
            size="sm"
            onPressMention={onPressMention}
            onPressHashtag={onPressHashtag}
          />

          <div className="flex items-center gap-lg">
            <button
              type="button"
              aria-label={`Like, ${likeCount}`}
              aria-pressed={liked}
              disabled={!onLike}
              onClick={onLike}
              className={cn(
                'inline-flex items-center gap-xs text-sm transition-opacity hover:opacity-70',
                'disabled:pointer-events-none',
                liked ? 'text-danger' : 'text-muted'
              )}
            >
              <span aria-hidden="true">{liked ? '♥' : '♡'}</span>
              {likeCount > 0 ? <span className="text-xs font-semibold">{likeCount}</span> : null}
            </button>
            {onReply ? (
              <button
                type="button"
                aria-label="Reply"
                onClick={onReply}
                className="text-xs font-semibold text-muted transition-opacity hover:opacity-70"
              >
                Reply
              </button>
            ) : null}
          </div>

          {children ? <div className="mt-sm flex flex-col gap-sm">{children}</div> : null}
        </div>
      </div>
    );
  }
);
