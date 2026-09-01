import * as React from 'react';
import { cn } from '../primitives/cn';
import { ProgressV4 } from '../primitives/ProgressV4';
import type { LevelBarProps } from './LevelBar';
import { formatCount } from './types';
import { TABULAR_CLASS, questParts, spokenLine } from './internal/arcade-v4';

export interface LevelBarV4Props extends LevelBarProps {}

/**
 * **V4 level bar** — the same props as {@link LevelBar}.
 *
 * ## Four changes
 *
 * 1. **The fraction is announced.** The base's JSDoc claims it is, and on the
 *    native twin it is not: the `Progress` primitive supplies a real
 *    `progressbar` value and the labelled container above it swallows the
 *    whole subtree, so the one number the component exists to communicate was
 *    unreachable. Nothing wraps or renames the bar here; its own value and its
 *    own name are what a reader gets, and the name carries the level as well
 *    as the percentage, because the level chip beside it is decorative.
 * 2. **The drawn fill and the announced value cannot disagree.** Both come out
 *    of `questParts()` — one clamp, shared with `QuestCard` and with both
 *    native twins. The base clamped `xp` for the fill and passed `max || 1` to
 *    the bar, which meant an `xpMax` of 0 produced a bar whose range was a lie
 *    and whose caption read `0 / 0 XP`.
 * 3. **The XP readout is tabular.** A level bar that ticks up during play
 *    reflowed on every frame, because proportional digits are different widths
 *    and `1,199 / 1,200` is not the same length as `1,200 / 1,200`.
 * 4. **The level chip comes off the spacing scale.** It was `h-10 w-10` and
 *    `h-[30px] w-[30px]` — two hand-picked pixel sizes that ignore a denser or
 *    a roomier seed entirely.
 */
export const LevelBarV4 = React.forwardRef<HTMLDivElement, LevelBarV4Props>(function LevelBarV4(
  { level, xp, xpMax, variant = 'default', tone = 'primary', className },
  ref
) {
  const compact = variant === 'compact';
  const parts = questParts(xp, xpMax);
  // `xpMax <= 0` is "no next level", not "a goal of one XP" — the bar reads
  // empty and the caption says so, rather than jumping to 100%.
  const known = Number.isFinite(xpMax) && xpMax > 0;
  const pct = known ? Math.round(parts.ratio * 100) : 0;

  return (
    <div ref={ref} className={cn('flex items-center gap-md', className)}>
      <span
        aria-hidden="true"
        className={cn(
          'flex shrink-0 items-center justify-center rounded-full bg-primary font-bold text-on-primary',
          TABULAR_CLASS,
          compact ? 'h-xl w-xl text-sm' : 'h-2xl w-2xl text-sm'
        )}
      >
        {level}
      </span>
      <div className="flex flex-1 flex-col gap-xs">
        <ProgressV4
          value={known ? parts.value : 0}
          max={known ? parts.goal : 1}
          tone={tone}
          size={compact ? 'sm' : 'md'}
          aria-label={spokenLine([`Level ${level}`, `${pct}% to next level`])}
        />
        {compact ? null : (
          <div className="flex justify-between">
            <span className={cn('text-xs text-muted-text', TABULAR_CLASS)}>
              {`${formatCount(known ? parts.value : 0)} / ` +
                `${formatCount(known ? parts.goal : 0)} XP`}
            </span>
            <span className={cn('text-xs font-semibold text-muted-text', TABULAR_CLASS)}>
              {`${pct}%`}
            </span>
          </div>
        )}
      </div>
    </div>
  );
});
