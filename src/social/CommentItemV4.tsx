import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar } from '../primitives/Avatar';
import { MentionText } from './MentionText';
import type { CommentItemProps } from './CommentItem';

/** Drop-in for {@link CommentItemProps} — same props, the V4 "feed" design. */
export type CommentItemV4Props = CommentItemProps;

/**
 * CommentItem — **V4** "feed" design (web parity of the native V4). The clean,
 * airy take on a comment: a larger avatar, a bold name with a primary verified
 * tick space, a muted handle/timestamp, a mention-aware body, and a like +
 * reply action row. Threaded replies keep their `depth` indent and nested
 * `children`; a `pinned` comment gets a soft-primary tinted rounded surface.
 * Same props/behavior as {@link CommentItemProps}; all colors from `--xen-*`
 * token classes (no literals). The indent uses a `--xen-space-xl`-derived
 * `calc()` so it stays token-pure.
 */
export const CommentItemV4 = React.forwardRef<HTMLDivElement, CommentItemV4Props>(function CommentItemV4(
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
      <div
        className={cn(
          'flex gap-sm rounded-[var(--xen-radius-lg)]',
          pinned && 'bg-primary/10 p-sm'
        )}
      >
        {onPressAuthor ? (
          <button type="button" aria-label={author} onClick={onPressAuthor} className="shrink-0">
            <Avatar src={avatarUrl} name={author} size="md" />
          </button>
        ) : (
          <Avatar src={avatarUrl} name={author} size="md" className="shrink-0" />
        )}
        <div className="flex min-w-0 flex-1 flex-col gap-xs">
          <div className="flex flex-wrap items-center gap-xs">
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
                liked ? 'text-primary' : 'text-muted'
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
                className="text-xs font-semibold text-primary transition-opacity hover:opacity-70"
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
});
