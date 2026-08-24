import * as React from 'react';
import { cn } from '../primitives/cn';
import type { StoryBarProps } from './StoryBar';
import type { StoryState } from './StoryRing';

/** Drop-in for {@link StoryBar} — identical props, a different design. */
export type StoryBarV3Props = StoryBarProps;

function initials(name?: string): string {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((w) => w[0]?.toUpperCase() ?? '').join('') || '?';
}

/**
 * StoryBar, design V3 — **compact rounded-square tiles**. Each story is a small
 * cover tile (image or tinted initials) with a scrim-backed name at the bottom;
 * ring state maps to the tile border (`unseen` primary, `seen` hairline, `live`
 * a badge, `add` a dashed `+`). Minimal/structural. Same props as
 * {@link StoryBar}, token-only.
 */
export const StoryBarV3 = React.forwardRef<HTMLDivElement, StoryBarV3Props>(function StoryBarV3(
  { stories, onPressStory, showAdd = true, onPressAdd, addLabel = 'Your story', className, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      role="list"
      className={cn('flex gap-sm overflow-x-auto px-sm py-xs', className)}
      {...rest}
    >
      {showAdd ? (
        <div role="listitem">
          <Tile state="add" name={addLabel} onClick={onPressAdd} />
        </div>
      ) : null}
      {stories.map((s) => (
        <div role="listitem" key={s.id}>
          <Tile
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

function Tile({
  src,
  name,
  state,
  onClick,
}: {
  src?: string;
  name?: string;
  state: StoryState;
  onClick?: () => void;
}): React.ReactElement {
  const borderClass =
    state === 'add'
      ? 'border-2 border-dashed border-border'
      : state === 'seen'
        ? 'border border-border'
        : state === 'live'
          ? 'border-2 border-danger'
          : 'border-2 border-primary';

  const tile = (
    <div
      className={cn(
        'relative flex h-[92px] w-[68px] items-center justify-center overflow-hidden rounded-lg bg-primary/10',
        borderClass
      )}
    >
      {state === 'add' ? (
        <span className="text-xl font-bold text-muted" aria-hidden="true">
          +
        </span>
      ) : src ? (
        <img src={src} alt={name ?? 'Story'} loading="lazy" className="h-full w-full object-cover" />
      ) : (
        <span className="text-lg font-bold text-primary">{initials(name)}</span>
      )}

      {state === 'live' ? (
        <span className="absolute top-xs rounded-full bg-danger px-xs py-px text-xs font-bold text-on-danger">
          LIVE
        </span>
      ) : null}

      {name ? (
        <span className="absolute inset-x-0 bottom-0 truncate bg-on-surface/60 px-xs py-px text-center text-xs font-semibold text-surface">
          {name}
        </span>
      ) : null}
    </div>
  );

  if (!onClick) return tile;
  return (
    <button
      type="button"
      aria-label={
        state === 'add' ? 'Add to your story' : `${name ?? 'Story'}${state === 'live' ? ', live' : ''}`
      }
      onClick={onClick}
      className="transition-transform hover:scale-[1.03] active:scale-[.98] motion-reduce:transition-none motion-reduce:hover:transform-none"
    >
      {tile}
    </button>
  );
}
