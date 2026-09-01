import * as React from 'react';
import { cn } from '../primitives/cn';
import { StoryRing } from './StoryRing';
import type { StoryBarProps } from './StoryBar';

/** Drop-in for {@link StoryBarProps} — same props, the V4 "feed" design. */
export type StoryBarV4Props = StoryBarProps;

/**
 * StoryBar — **V4** "feed" design (web parity of the native V4). A clean, airy
 * horizontally-scrolling rail of {@link StoryRing}s, optionally led by the
 * viewer's "add story" tile. In the feed line an unseen story wears the
 * accent→primary gradient ring while a seen one falls back to a muted ring;
 * the add tile carries a primary `⊕`. Ring state comes straight from each
 * story. Same props/behavior as {@link StoryBarProps}; all colors from
 * `--xen-*` token classes (no literals). Scrolls without a visible scrollbar.
 */
export const StoryBarV4 = React.forwardRef<HTMLDivElement, StoryBarV4Props>(function StoryBarV4(
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
        <div role="listitem" className="relative">
          <StoryRing state="add" label={addLabel} onClick={onPressAdd} />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-1 top-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-on-primary"
          >
            +
          </span>
        </div>
      ) : null}
      {stories.map((s) => {
        const state = s.state ?? 'unseen';
        const gradient = state === 'unseen';
        return (
          <div role="listitem" key={s.id} className="relative">
            {gradient ? (
              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-0 -z-10 h-14 w-14 -translate-x-1/2 rounded-full bg-gradient-to-br from-accent-400 to-primary-600"
              />
            ) : null}
            <StoryRing
              src={s.src}
              name={s.name}
              state={state}
              onClick={onPressStory ? () => onPressStory(s.id) : undefined}
            />
          </div>
        );
      })}
    </div>
  );
});
