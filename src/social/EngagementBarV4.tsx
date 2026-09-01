import * as React from 'react';
import { cn } from '../primitives/cn';
import { formatCount, type EngagementBarProps } from './EngagementBar';

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

/** Drop-in for {@link EngagementBarProps} — same props, the V4 "feed" design. */
export type EngagementBarV4Props = EngagementBarProps;

/**
 * EngagementBar — **V4** "feed" design (web parity of the native V4). A clean,
 * airy row of like / comment / share (+ optional bookmark) pill actions with big
 * ≥44px tap targets. The `liked` heart fills `danger`, the `bookmarked` flag
 * fills `primary`; inactive actions read `muted`, counts stay `muted`, and a
 * pressed action gets a soft-primary tint. Same props/behavior as
 * {@link EngagementBarProps}; all colors from `--xen-*` token classes (no
 * literals). State is announced via `aria-pressed`, not color alone.
 */
export const EngagementBarV4 = React.forwardRef<HTMLDivElement, EngagementBarV4Props>(
  function EngagementBarV4(
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
      <div ref={ref} className={cn('flex items-center gap-sm', className)} {...rest}>
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
                'inline-flex min-h-[44px] items-center gap-xs rounded-full px-md transition-colors',
                'hover:bg-primary/10 active:bg-primary/20',
                'disabled:pointer-events-none',
                tint
              )}
            >
              <span className="text-lg leading-none" aria-hidden="true">
                {a.active && a.activeGlyph ? a.activeGlyph : a.glyph}
              </span>
              {showCount ? (
                <span className="text-sm font-semibold text-muted">{formatCount(a.count as number)}</span>
              ) : null}
            </button>
          );
        })}
      </div>
    );
  }
);
