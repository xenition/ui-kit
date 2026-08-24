import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar } from '../primitives/Avatar';
import type { StoryBarProps } from './StoryBar';
import type { StoryState } from './StoryRing';

/** Drop-in for {@link StoryBar} — identical props, a different design. */
export type StoryBarV2Props = StoryBarProps;

/**
 * StoryBar, design V2 — **large gradient-ring circles**. Each tile is an
 * oversized avatar inside a token-ramp gradient ring (`unseen` primary→accent
 * sweep, `live` a danger ring with a LIVE badge, `seen` a muted ring, `add` a
 * dashed ring with a `+`). Bold, media-forward. Same props as {@link StoryBar},
 * token-only; scrolls without a visible scrollbar.
 */
export const StoryBarV2 = React.forwardRef<HTMLDivElement, StoryBarV2Props>(function StoryBarV2(
  { stories, onPressStory, showAdd = true, onPressAdd, addLabel = 'Your story', className, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      role="list"
      className={cn('flex gap-md overflow-x-auto px-sm py-xs', className)}
      {...rest}
    >
      {showAdd ? (
        <div role="listitem">
          <Ring state="add" label={addLabel} onClick={onPressAdd} />
        </div>
      ) : null}
      {stories.map((s) => (
        <div role="listitem" key={s.id}>
          <Ring
            src={s.src}
            name={s.name}
            state={s.state ?? 'unseen'}
            onClick={onPressStory ? () => onPressStory(s.id) : undefined}
          />
        </div>
      ))}
    </div>
  );
});

function Ring({
  src,
  name,
  state,
  label,
  onClick,
}: {
  src?: string;
  name?: string;
  state: StoryState;
  label?: string;
  onClick?: () => void;
}): React.ReactElement {
  const caption = label ?? (state === 'add' ? 'Your story' : name);

  const ringClass = cn(
    'flex h-[84px] w-[84px] items-center justify-center rounded-full p-0.5',
    state === 'unseen' && 'bg-gradient-to-tr from-primary via-accent to-primary-300',
    state === 'live' && 'bg-danger',
    state === 'seen' && 'bg-border',
    state === 'add' && 'border-2 border-dashed border-border'
  );

  const ring = (
    <div className="relative flex flex-col items-center gap-xs">
      <div className={ringClass}>
        <div className="flex h-full w-full items-center justify-center rounded-full bg-surface">
          {state === 'add' ? (
            <span className="text-2xl font-bold text-muted" aria-hidden="true">
              +
            </span>
          ) : (
            <Avatar src={src} name={name} size="lg" />
          )}
        </div>
      </div>
      {state === 'live' ? (
        <span className="absolute -bottom-1 rounded-full bg-danger px-sm py-px text-xs font-bold text-on-danger">
          LIVE
        </span>
      ) : null}
      {caption ? (
        <span
          className={cn(
            'max-w-[96px] truncate text-center text-xs',
            state === 'seen' ? 'text-muted' : 'text-on-surface'
          )}
        >
          {caption}
        </span>
      ) : null}
    </div>
  );

  if (!onClick) return ring;
  return (
    <button
      type="button"
      aria-label={
        state === 'add' ? 'Add to your story' : `${name ?? 'Story'}${state === 'live' ? ', live' : ''}`
      }
      onClick={onClick}
      className="transition-transform hover:scale-[1.03] active:scale-[.98] motion-reduce:transition-none motion-reduce:hover:transform-none"
    >
      {ring}
    </button>
  );
}
