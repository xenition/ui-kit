import * as React from 'react';
import { cn } from '../primitives/cn';

interface ActionSpec {
  key: string;
  glyph: string;
  activeGlyph?: string;
  label: string;
  count?: number;
  active?: boolean;
  /** Tailwind text-color class used when `active`. Default primary. */
  activeClass?: string;
  onClick?: () => void;
}

export interface EngagementBarProps extends React.HTMLAttributes<HTMLDivElement> {
  likeCount?: number;
  commentCount?: number;
  shareCount?: number;
  /** Whether the viewer has liked / bookmarked this item. */
  liked?: boolean;
  bookmarked?: boolean;
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
  /** When provided, a trailing bookmark toggle is rendered. */
  onBookmark?: () => void;
  /** Hide zero counts, showing icon only. Default `true`. */
  hideZero?: boolean;
}

export function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, '')}k`;
  return String(n);
}

/**
 * The like / comment / share (+ optional bookmark) action row under a post.
 * Each action is a glyph with an optional count; `liked` turns the heart
 * `danger`, `bookmarked` turns the flag `primary`. Only the handlers you pass
 * become interactive. Web parity of the native `EngagementBar`; token-only.
 * State is announced via `aria-pressed`, not color alone.
 */
export const EngagementBar = React.forwardRef<HTMLDivElement, EngagementBarProps>(
  function EngagementBar(
    {
      likeCount = 0,
      commentCount = 0,
      shareCount = 0,
      liked = false,
      bookmarked = false,
      onLike,
      onComment,
      onShare,
      onBookmark,
      hideZero = true,
      className,
      ...rest
    },
    ref
  ) {
    const actions: ActionSpec[] = [
      { key: 'like', glyph: '♡', activeGlyph: '♥', label: 'Like', count: likeCount, active: liked, activeClass: 'text-danger', onClick: onLike },
      { key: 'comment', glyph: '💬', label: 'Comment', count: commentCount, onClick: onComment },
      { key: 'share', glyph: '↗', label: 'Share', count: shareCount, onClick: onShare },
    ];
    if (onBookmark) {
      actions.push({ key: 'bookmark', glyph: '🔖', label: 'Bookmark', active: bookmarked, activeClass: 'text-primary', onClick: onBookmark });
    }

    return (
      <div ref={ref} className={cn('flex items-center gap-lg', className)} {...rest}>
        {actions.map((a) => {
          const tint = a.active ? a.activeClass ?? 'text-primary' : 'text-muted';
          const showCount = a.count != null && !(hideZero && a.count === 0);
          return (
            <button
              key={a.key}
              type="button"
              aria-label={a.count != null ? `${a.label}, ${a.count}` : a.label}
              aria-pressed={a.active ? true : undefined}
              disabled={!a.onClick}
              onClick={a.onClick}
              className={cn(
                'inline-flex items-center gap-xs transition-opacity hover:opacity-70',
                'disabled:pointer-events-none',
                tint
              )}
            >
              <span className="text-lg leading-none" aria-hidden="true">
                {a.active && a.activeGlyph ? a.activeGlyph : a.glyph}
              </span>
              {showCount ? (
                <span className="text-sm font-semibold">{formatCount(a.count as number)}</span>
              ) : null}
            </button>
          );
        })}
      </div>
    );
  }
);
