import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar } from '../primitives/Avatar';
import type { StoryRingProps } from './StoryRing';

/** Drop-in for {@link StoryRingProps} — same props, the V4 "feed" design. */
export type StoryRingV4Props = StoryRingProps;

/**
 * StoryRing — **V4** "feed" design (web parity of the native V4). The one place
 * in the feed line that carries a gradient: an unseen story wears an
 * accent→primary gradient ring (`bg-gradient-to-br from-accent-400
 * to-primary-600`), a seen one falls back to a muted ring, `live` keeps the
 * danger ring + LIVE tag, and `add` renders a dashed ring with a primary `⊕`.
 * Keeps `size`, `state`, `label` and the caption behavior. Same props/behavior
 * as {@link StoryRingProps}; all colors from `--xen-*` token classes /
 * gradient utilities (no literals).
 */
const AVATAR_BOX: Record<NonNullable<StoryRingProps['size']>, string> = {
  xs: 'h-8 w-8',
  sm: 'h-11 w-11',
  md: 'h-14 w-14',
  lg: 'h-[4.75rem] w-[4.75rem]',
  xl: 'h-24 w-24',
};

export const StoryRingV4 = React.forwardRef<HTMLDivElement | HTMLButtonElement, StoryRingV4Props>(
  function StoryRingV4({ src, name, state = 'unseen', size = 'md', label, onClick, className }, ref) {
    const caption = label ?? (state === 'add' ? 'Your story' : name);

    // The gradient/tone ring is a padded backing; the avatar sits on a surface
    // gap so the ring reads as a stroke.
    const ringTone =
      state === 'unseen'
        ? 'bg-gradient-to-br from-accent-400 to-primary-600'
        : state === 'live'
          ? 'bg-danger'
          : state === 'add'
            ? 'border-2 border-dashed border-border bg-surface'
            : 'bg-border';

    const ring = (
      <span className={cn('relative inline-flex items-center justify-center rounded-full p-[3px]', ringTone)}>
        <span className="inline-flex items-center justify-center rounded-full bg-surface p-0.5">
          {state === 'add' ? (
            <span
              className={cn(
                'inline-flex items-center justify-center rounded-full text-2xl font-bold text-primary',
                AVATAR_BOX[size]
              )}
              aria-hidden="true"
            >
              ⊕
            </span>
          ) : (
            <Avatar src={src} name={name} size={size} />
          )}
        </span>
        {state === 'live' ? (
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full bg-danger px-xs py-px text-xs font-bold text-on-danger">
            LIVE
          </span>
        ) : null}
      </span>
    );

    const body = (
      <>
        {ring}
        {caption ? (
          <span
            className={cn(
              'block max-w-[5rem] truncate text-center text-xs',
              state === 'seen' ? 'text-muted' : 'font-medium text-on-surface'
            )}
          >
            {caption}
          </span>
        ) : null}
      </>
    );

    if (onClick) {
      return (
        <button
          ref={ref as React.Ref<HTMLButtonElement>}
          type="button"
          aria-label={
            state === 'add' ? 'Add to your story' : `${name ?? 'Story'}${state === 'live' ? ', live' : ''}`
          }
          onClick={onClick}
          className={cn('inline-flex flex-col items-center gap-xs transition-opacity hover:opacity-90', className)}
        >
          {body}
        </button>
      );
    }
    return (
      <div ref={ref as React.Ref<HTMLDivElement>} className={cn('inline-flex flex-col items-center gap-xs', className)}>
        {body}
      </div>
    );
  }
);
