import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar } from '../primitives/Avatar';
import { MentionText } from './MentionText';

export interface CommentItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Comment author display name. */
  author: string;
  /** @handle without the `@`. */
  handle?: string;
  avatarUrl?: string;
  /** Comment body — `@mentions`/`#hashtags` are auto-highlighted. */
  text: string;
  /** Relative time label (e.g. `2h`). */
  timestamp?: string;
  likeCount?: number;
  liked?: boolean;
  /** Nesting depth for threaded replies (indents the row). Default `0`. */
  depth?: number;
  /** Pinned/highlighted comment (e.g. author's pick) — tints the surface. */
  pinned?: boolean;
  onLike?: () => void;
  onReply?: () => void;
  onPressAuthor?: () => void;
  onPressMention?: (handle: string) => void;
  onPressHashtag?: (tag: string) => void;
  /** Nested reply items rendered beneath, already indented via their `depth`. */
  children?: React.ReactNode;
}

/**
 * A single comment: avatar, author + timestamp, body (with mention/hashtag
 * highlighting), and a like/reply action row. Supports threaded replies via
 * `depth` indentation and nested `children`, plus a `pinned` highlight. Web
 * parity of the native `CommentItem`; token-only. The indent uses a
 * `--xen-space-xl`-derived `calc()` so it stays token-pure.
 */
export const CommentItem = React.forwardRef<HTMLDivElement, CommentItemProps>(function CommentItem(
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
          'flex gap-sm rounded-md',
          pinned && 'border border-border bg-surface p-sm'
        )}
      >
        {onPressAuthor ? (
          <button type="button" aria-label={author} onClick={onPressAuthor} className="shrink-0">
            <Avatar src={avatarUrl} name={author} size="sm" />
          </button>
        ) : (
          <Avatar src={avatarUrl} name={author} size="sm" className="shrink-0" />
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
});
