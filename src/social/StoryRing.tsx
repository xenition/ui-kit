import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar, type AvatarSize } from '../primitives/Avatar';

export type StoryState = 'unseen' | 'seen' | 'live' | 'add';

export interface StoryRingProps {
  /** Avatar image URL. */
  src?: string;
  /** Name used for initials fallback + the caption. */
  name?: string;
  /**
   * Ring appearance: `unseen` (primary ring), `seen` (muted ring), `live`
   * (danger ring + LIVE tag), or `add` (dashed ring with a `+` — your own
   * "add story" tile).
   */
  state?: StoryState;
  size?: AvatarSize;
  /** Caption under the ring (defaults to `name`; `'Your story'` for `add`). */
  label?: string;
  onClick?: () => void;
  className?: string;
}

const RING_TONE: Record<StoryState, string> = {
  unseen: 'border-primary',
  seen: 'border-border',
  live: 'border-danger',
  add: 'border-border border-dashed',
};

/**
 * An avatar wrapped in a story ring. The ring color encodes state — unseen
 * (primary), seen (muted), live (danger with a LIVE badge) — and an `add`
 * variant renders a dashed ring with a `+` for the viewer's own tile. Web
 * parity of the native `StoryRing`; token-only.
 */
export const StoryRing = React.forwardRef<HTMLDivElement | HTMLButtonElement, StoryRingProps>(
  function StoryRing({ src, name, state = 'unseen', size = 'md', label, onClick, className }, ref) {
    const caption = label ?? (state === 'add' ? 'Your story' : name);

    const ring = (
      <span
        className={cn(
          'relative inline-flex items-center justify-center rounded-full border-2 bg-surface p-0.5',
          RING_TONE[state]
        )}
      >
        {state === 'add' ? (
          <span
            className={cn(
              'inline-flex items-center justify-center rounded-full text-xl font-bold text-muted',
              size === 'sm' ? 'h-8 w-8' : size === 'lg' ? 'h-14 w-14' : 'h-10 w-10'
            )}
            aria-hidden="true"
          >
            +
          </span>
        ) : (
          <Avatar src={src} name={name} size={size} />
        )}
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
              state === 'seen' ? 'text-muted' : 'text-on-surface'
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
          className={cn('inline-flex flex-col items-center gap-xs transition-opacity hover:opacity-80', className)}
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
