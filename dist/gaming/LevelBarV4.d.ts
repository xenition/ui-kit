import * as React from 'react';
import type { LevelBarProps } from './LevelBar';
export interface LevelBarV4Props extends LevelBarProps {
}
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
export declare const LevelBarV4: React.ForwardRefExoticComponent<LevelBarV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=LevelBarV4.d.ts.map