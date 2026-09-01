import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import { toneGround } from '../primitives/internal/tone-v4';
import {
  stateGroundVars,
  V4_DISABLED_CLASS,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../primitives/internal/v4-state';
import type { AchievementUnlockProps } from './AchievementUnlock';
import { IDENTITY_TONE, TABULAR_CLASS, spokenLine } from './internal/arcade-v4';

export interface AchievementUnlockV4Props extends AchievementUnlockProps {
  /** The overline while the achievement is not unlocked. Default `'Locked'`. */
  lockedLabel?: string;
  /** The unit after the point value. Default `'G'`. */
  pointsUnit?: string;
}

const CARD_STATE = stateGroundVars('var(--xen-card)', 'var(--xen-on-card)') as React.CSSProperties;

/**
 * **V4 achievement unlock** — same props as {@link AchievementUnlock} plus
 * `lockedLabel` and `pointsUnit`.
 *
 * ## Four changes
 *
 * 1. **A locked achievement no longer opens.** Its own JSDoc promised "a real
 *    `<button>`; disabled while locked", and what shipped was
 *    `aria-disabled={!unlocked}` on a fully live button — an attribute that
 *    *describes* a disabled control without being one, so every click and
 *    every Enter still ran `onClick` and pushed the user into a trophy they
 *    have not earned. It is `disabled` now. (The native twin tells the same
 *    lie the other way: it sets `accessibilityState` and not `disabled`.)
 * 2. **A trophy is identity, not a warning.** The medallion, its ring and the
 *    overline were all `warn` — the colour the kit reserves for "something
 *    needs your attention" — spent on the single most celebratory surface in
 *    the module. Unlocked reads in the brand ink, locked in muted, and the
 *    padlock and the `lockedLabel` overline say which it is in words.
 * 3. **The medallion's ground is a token mix.** `bg-neutral-100` is a step on
 *    the web neutral ramp, which mirrors under `[data-theme="dark"]` — so the
 *    disc that was a pale grey in light mode became a near-black in dark and
 *    the glyph on it went with it.
 * 4. **The point value carries a unit that is a prop.** `` `${points} G` ``
 *    hard-coded Xbox's gamerscore suffix into every app that ships this kit;
 *    `pointsUnit` names it, the figure is tabular, and press is a state layer
 *    on a target that clears 44 rather than `hover:opacity-90`.
 */
export const AchievementUnlockV4 = React.forwardRef<HTMLDivElement, AchievementUnlockV4Props>(
  function AchievementUnlockV4(
    {
      achievement,
      variant = 'toast',
      unlocked = true,
      label = 'Achievement unlocked',
      lockedLabel = 'Locked',
      pointsUnit = 'G',
      onClick,
      className,
    },
    ref
  ) {
    injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);

    if (!achievement?.title) return null;

    const inline = variant === 'inline';
    const overline = unlocked ? label : lockedLabel;
    const pointsText =
      achievement.points != null ? `${achievement.points} ${pointsUnit}` : undefined;

    const medallion = (
      <span
        aria-hidden="true"
        className={cn(
          'flex h-2xl w-2xl shrink-0 items-center justify-center rounded-full border-2 text-2xl',
          unlocked ? 'border-primary' : 'border-border'
        )}
        style={{ background: toneGround(IDENTITY_TONE) }}
      >
        {unlocked ? (achievement.glyph ?? '🏆') : '🔒'}
      </span>
    );

    const text = (
      <span
        className={cn(
          'flex flex-col gap-xs',
          inline ? 'items-center text-center' : 'flex-1 items-start'
        )}
      >
        <span
          className={cn(
            'text-xs font-bold uppercase tracking-wide',
            unlocked ? 'text-primary-text' : 'text-muted-text'
          )}
        >
          {overline}
        </span>
        <span className="line-clamp-2 font-heading text-lg font-bold text-on-card">
          {achievement.title}
        </span>
        {achievement.description ? (
          <span className={cn('text-sm text-muted-text', inline ? 'line-clamp-3' : 'line-clamp-2')}>
            {achievement.description}
          </span>
        ) : null}
        {pointsText ? (
          <span className={cn('text-xs font-semibold text-muted-text', TABULAR_CLASS)}>
            {pointsText}
          </span>
        ) : null}
      </span>
    );

    const bodyClass = cn(
      'flex w-full gap-md',
      inline ? 'flex-col items-center' : 'flex-row items-center'
    );
    const cardClass = cn(
      'rounded-[var(--xen-radius-lg)] border border-border bg-card p-lg text-on-card',
      className
    );
    const name = spokenLine([overline, achievement.title, achievement.description, pointsText]);

    if (!onClick) {
      return (
        <div ref={ref} role="group" aria-label={name} className={cn(bodyClass, cardClass)}>
          {medallion}
          {text}
        </div>
      );
    }

    return (
      <div ref={ref} className={className}>
        <button
          type="button"
          // A real disabled button, not an attribute that only says so.
          disabled={!unlocked}
          aria-label={name}
          onClick={() => onClick(achievement)}
          data-xen-v4-state=""
          style={CARD_STATE}
          className={cn(
            bodyClass,
            'rounded-[var(--xen-radius-lg)] border border-border bg-card p-lg text-left text-on-card',
            MIN_TAP_CLASS,
            // M3's disabled band, from the theme, rather than the base's
            // hand-picked `opacity-60`.
            V4_DISABLED_CLASS,
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
          )}
        >
          {medallion}
          {text}
        </button>
      </div>
    );
  }
);
