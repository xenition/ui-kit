import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { AvatarV4 } from '../primitives/AvatarV4';
import { EmptyStateV4 } from '../primitives/EmptyStateV4';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import { toneGround } from '../primitives/internal/tone-v4';
import {
  stateGroundVars,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../primitives/internal/v4-state';
import type { LeaderboardPodiumProps } from './LeaderboardPodium';
import { formatCount } from './types';
import { IDENTITY_TONE, TABULAR_CLASS, spokenLine } from './internal/arcade-v4';

export interface LeaderboardPodiumV4Props extends LeaderboardPodiumProps {
  /** Format a podium score. Default {@link formatCount} — `1234` → `'1.2K'`. */
  formatScore?: (score: number) => string;
}

const CARD_STATE = stateGroundVars('var(--xen-card)', 'var(--xen-on-card)') as React.CSSProperties;

/**
 * Render order (2nd · 1st · 3rd) with each pillar's height **off the spacing
 * scale**, so a denser or a roomier seed rescales the podium instead of
 * leaving three hand-picked pixel heights sitting in the middle of it.
 */
const PLACES: ReadonlyArray<{ index: number; height: string; medal: string }> = [
  { index: 1, height: 'h-[calc(var(--xen-space-2xl)_*_1.5)]', medal: '🥈' },
  { index: 0, height: 'h-[calc(var(--xen-space-2xl)_*_2)]', medal: '🥇' },
  { index: 2, height: 'h-2xl', medal: '🥉' },
];

/**
 * **V4 leaderboard podium** — same props as {@link LeaderboardPodium} plus
 * `formatScore`.
 *
 * ## Four changes
 *
 * 1. **A podium place is identity, not status.** Gold was `warn` and bronze
 *    `accent` — so the winner of a leaderboard was drawn in the colour the kit
 *    uses to warn you about something, and third place in the brand's
 *    secondary. Second place was worse: it spent `border` — the **hairline**
 *    colour, which has no contrast promise at all — as a tier accent, so on
 *    some seeds it simply vanished. The medal, the `#1`/`#2`/`#3` and the
 *    pillar height say which place it is; all three pillars share one neutral
 *    ground and one hairline.
 * 2. **A place that is not a button still has a name.** The static form put
 *    `aria-label` on a bare `<div>`, where ARIA forbids it — so the rank, the
 *    name and the score were discarded, while the native twin announced all
 *    three. It is a `group` now, and the interactive form keeps the score in
 *    its name the way the V2 and V3 lines already did.
 * 3. **Scores are formatted once, by `formatScore`.** The base printed
 *    `formatCount(score)` on the pillar and announced the raw integer, so a
 *    reader heard "1247 points" where the screen said "1.2K" — two different
 *    numbers for the same fact, and no way for an app to change either.
 * 4. **The pillar ground is a token mix and the press is a state layer.**
 *    `bg-neutral-100` inverts under `[data-theme="dark"]`; `hover:opacity-90`
 *    dims the podium's own content, which is M3's disabled signal. Each place
 *    clears 44 and rings in the kit's one `ring` colour.
 */
export const LeaderboardPodiumV4 = React.forwardRef<HTMLDivElement, LeaderboardPodiumV4Props>(
  function LeaderboardPodiumV4(
    { entries, emptyLabel = 'No rankings yet', onClick, formatScore = formatCount, className },
    ref
  ) {
    injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);

    const list = entries ?? [];
    if (list.length === 0) {
      return <EmptyStateV4 ref={ref} title={emptyLabel} className={className} />;
    }

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-end justify-center gap-sm rounded-[var(--xen-radius-lg)] border border-border',
          'bg-card p-lg text-on-card',
          className
        )}
      >
        {PLACES.map((place) => {
          const entry = list[place.index];
          if (!entry) return <div key={place.index} className="flex-1" />;

          const rank = place.index + 1;
          const scoreText = formatScore(entry.score);
          const name = spokenLine([`Rank ${rank}`, entry.name, scoreText]);

          const column = (
            <span className="flex w-full flex-col items-center gap-xs">
              <span aria-hidden="true" className="text-xl leading-none">
                {place.medal}
              </span>
              <AvatarV4
                src={entry.avatarUrl}
                name={entry.name}
                alt=""
                size={place.index === 0 ? 'lg' : 'md'}
              />
              <span className="max-w-full truncate text-sm font-bold text-on-card">
                {entry.name}
              </span>
              <span
                className={cn(
                  'flex w-full flex-col items-center rounded-t-[var(--xen-radius-md)]',
                  'border-t border-border pt-xs',
                  place.height
                )}
                style={{ background: toneGround(IDENTITY_TONE) }}
              >
                <span className={cn('text-base font-bold text-on-card', TABULAR_CLASS)}>
                  {`#${rank}`}
                </span>
                <span className={cn('text-xs text-on-card', TABULAR_CLASS)}>{scoreText}</span>
              </span>
            </span>
          );

          if (!onClick) {
            return (
              <div key={entry.id} role="group" aria-label={name} className="flex-1">
                {column}
              </div>
            );
          }
          return (
            <button
              key={entry.id}
              type="button"
              aria-label={name}
              onClick={() => onClick(entry, rank)}
              data-xen-v4-state=""
              style={CARD_STATE}
              className={cn(
                'flex-1 rounded-[var(--xen-radius-md)]',
                MIN_TAP_CLASS,
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
              )}
            >
              {column}
            </button>
          );
        })}
      </div>
    );
  }
);
