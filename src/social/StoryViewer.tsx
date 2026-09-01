import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar } from '../primitives/Avatar';

/** The story's author identity shown in the top overlay. */
export interface StoryAuthor {
  /** Display name in near-white ink. */
  name: string;
  /** Avatar image URL; falls back to initials from `name`. */
  avatarUrl?: string;
}

export interface StoryViewerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onReset'> {
  /** Total number of segments (progress bars) in this story reel. */
  segments: number;
  /** Zero-based index of the segment currently playing. */
  activeIndex: number;
  /** Story author shown in the top overlay. */
  author: StoryAuthor;
  /** Relative time label for the active segment (e.g. `2h`). */
  timeLabel?: string;
  /** Full-bleed media URL for the active segment; a brand-gradient ground shows when absent. */
  imageUrl?: string;
  /** Caption overlaid near the bottom of the frame. */
  caption?: string;
  /** Placeholder for the reply field (default `Send message`). */
  replyPlaceholder?: string;
  /** Fires when the right tap-zone (advance) is pressed. */
  onNext?: () => void;
  /** Fires when the left tap-zone (rewind) is pressed. */
  onPrev?: () => void;
  /** Fires when the close (✕) affordance is pressed. */
  onClose?: () => void;
  /** Fires when the reply affordance is pressed. */
  onReply?: () => void;
}

/**
 * StoryViewer — the immersive, full-screen story view for the social V4 "feed"
 * line. A full-bleed frame (the `imageUrl` under a brand-gradient scrim, or the
 * gradient itself) carries a top row of segment progress bars — played/active in
 * near-white, upcoming in a frosted track — an author header + close control in
 * near-white ink, invisible left/right tap-zones for rewind/advance, an optional
 * caption, and a frosted reply affordance. Token-only colors via `--xen-*`
 * classes + gradient utilities; dark-mode safe.
 */
export const StoryViewer = React.forwardRef<HTMLDivElement, StoryViewerProps>(function StoryViewer(
  { segments, activeIndex, author, timeLabel, imageUrl, caption, replyPlaceholder = 'Send message', onNext, onPrev, onClose, onReply, className, ...rest },
  ref
) {
  const count = Math.max(0, Math.trunc(segments));
  const bars = Array.from({ length: count }, (_, i) => i);

  return (
    <div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label={`Story by ${author.name}`}
      className={cn(
        'relative flex aspect-[9/16] w-full flex-col overflow-hidden rounded-[var(--xen-radius-lg)] bg-gradient-to-br from-primary-500 to-primary-700',
        className
      )}
      {...rest}
    >
      {imageUrl ? (
        <>
          <img src={imageUrl} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-700/60 via-transparent to-primary-700/70" aria-hidden="true" />
        </>
      ) : null}

      {/* Segment progress bars */}
      <div className="relative z-10 flex gap-[var(--xen-space-xs)] p-[var(--xen-space-md)]" role="progressbar" aria-valuemin={0} aria-valuemax={count} aria-valuenow={activeIndex + 1}>
        {bars.map((i) => (
          <span key={i} className="h-1 flex-1 overflow-hidden rounded-full bg-primary-50/30">
            <span className={cn('block h-full rounded-full bg-primary-50', i <= activeIndex ? 'w-full' : 'w-0')} />
          </span>
        ))}
      </div>

      {/* Author header */}
      <div className="relative z-10 flex items-center gap-[var(--xen-space-sm)] px-[var(--xen-space-md)]">
        <Avatar src={author.avatarUrl} name={author.name} size="sm" />
        <div className="flex min-w-0 flex-1 items-baseline gap-[var(--xen-space-xs)]">
          <span className="truncate text-sm font-bold text-primary-50">{author.name}</span>
          {timeLabel ? <span className="text-xs text-primary-100">{timeLabel}</span> : null}
        </div>
        {onClose ? (
          <button
            type="button"
            aria-label="Close story"
            onClick={onClose}
            className="flex h-11 w-11 items-center justify-center text-xl font-bold text-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
          >
            ✕
          </button>
        ) : null}
      </div>

      {/* Tap zones */}
      <div className="relative z-0 flex flex-1">
        <button type="button" aria-label="Previous" onClick={onPrev} className="h-full flex-1 focus:outline-none" tabIndex={-1} />
        <button type="button" aria-label="Next" onClick={onNext} className="h-full flex-[2] focus:outline-none" tabIndex={-1} />
      </div>

      {/* Caption + reply */}
      <div className="relative z-10 flex flex-col gap-[var(--xen-space-sm)] p-[var(--xen-space-md)]">
        {caption ? <p className="text-sm leading-relaxed text-primary-50">{caption}</p> : null}
        {onReply ? (
          <button
            type="button"
            aria-label={replyPlaceholder}
            onClick={onReply}
            className="flex min-h-[44px] items-center rounded-full border border-primary-50/30 bg-primary-50/15 px-[var(--xen-space-lg)] text-sm font-semibold text-primary-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
          >
            {replyPlaceholder}
          </button>
        ) : null}
      </div>
    </div>
  );
});
