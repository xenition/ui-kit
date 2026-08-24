import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar } from '../primitives/Avatar';
import { MentionText } from './MentionText';
import type { CommentItemProps } from './CommentItem';

/** Drop-in for {@link CommentItem} — identical props, a different design. */
export type CommentItemV2Props = CommentItemProps;

/**
 * CommentItem, design V2 — a **chat bubble**: the avatar sits outside a filled,
 * speech-bubble surface (one squared bottom-left corner) that carries the author
 * + body; timestamp and like/reply actions live below the bubble. Threads via
 * `depth` indentation; `pinned` tints the bubble. Same props as
 * {@link CommentItem}; token-only, media-forward bubble idiom.
 */
export const CommentItemV2 = React.forwardRef<HTMLDivElement, CommentItemV2Props>(
  function CommentItemV2(
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
      style,
      ...rest
    },
    ref
  ) {
    const safeDepth = Math.max(0, depth);
    const indentStyle: React.CSSProperties | undefined =
      safeDepth > 0 ? { paddingLeft: `calc(${safeDepth} * var(--xen-space-xl))` } : undefined;

    return (
      <div
        ref={ref}
        className={className}
        style={indentStyle ? { ...indentStyle, ...style } : style}
        {...rest}
      >
        <div className="flex items-end gap-sm">
          {onPressAuthor ? (
            <button type="button" aria-label={author} onClick={onPressAuthor} className="shrink-0">
              <Avatar src={avatarUrl} name={author} size="sm" />
            </button>
          ) : (
            <Avatar src={avatarUrl} name={author} size="sm" className="shrink-0" />
          )}
          <div className="flex min-w-0 flex-1 flex-col gap-xs">
            <div
              className={cn(
                'flex flex-col gap-xs rounded-lg rounded-bl-sm px-md py-sm',
                pinned ? 'bg-primary/10' : 'bg-neutral-100'
              )}
            >
              <div className="flex flex-wrap items-center gap-xs">
                <span className="text-sm font-bold text-on-surface">{author}</span>
                {handle ? <span className="text-xs text-muted">@{handle}</span> : null}
                {pinned ? (
                  <span className="text-xs font-semibold text-primary">· Pinned</span>
                ) : null}
              </div>
              <MentionText
                text={text}
                size="sm"
                onPressMention={onPressMention}
                onPressHashtag={onPressHashtag}
              />
            </div>

            <div className="flex items-center gap-lg px-sm">
              {timestamp ? <span className="text-xs text-muted">{timestamp}</span> : null}
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
          </div>
        </div>
        {children ? <div className="mt-sm flex flex-col gap-sm">{children}</div> : null}
      </div>
    );
  }
);
