import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { MIN_TAP_SQUARE_CLASS } from '../primitives/internal/nav-v4';
import {
  V4_DISABLED_CLASS,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../primitives/internal/v4-state';
import type { IconColor } from '../primitives/Icon';
import { nextAward, starParts } from './family-v4';
import type { RewardStarProps, RewardStarSize } from './RewardStar';
import { FOCUS_RING_CLASS, spokenLine, surfaceStateVars } from './internal/tone-v4';

export interface RewardStarV4Props extends RewardStarProps {
  /** Build the count's spoken form. Default `'3 of 5 stars'`. */
  formatCount?: (filled: number, max: number) => string;
  /** Verb the per-star buttons are named with. Default `'Award'`. */
  awardLabel?: string;
}

/** The star glyph's size, from the type scale. */
const GLYPH_SIZE: Record<RewardStarSize, string> = {
  sm: 'text-lg',
  md: 'text-xl',
  lg: 'text-2xl',
};

/**
 * The **ink** each colour slot takes.
 *
 * The base handed `color` to `Icon`, whose table inks with the *fill* tokens —
 * `text-warn` is `var(--xen-warn)` and measures as low as 1.3:1 as text. A star
 * is a glyph, which is text, so it takes the contrast-corrected `*Text` slot.
 */
const STAR_INK: Record<IconColor, string> = {
  onSurface: 'text-on-surface',
  onPrimary: 'text-on-primary',
  primary: 'text-primary-text',
  muted: 'text-muted-text',
  success: 'text-success-text',
  onSuccess: 'text-on-success',
  warn: 'text-warn-text',
  onWarn: 'text-on-warn',
  danger: 'text-danger-text',
  onDanger: 'text-on-danger',
};

/**
 * **V4 reward star** — same props as {@link RewardStar} plus `formatCount` and
 * `awardLabel`.
 *
 * ## Six changes
 *
 * 1. **Awarding never takes stars away.** `RewardStarV2` fired
 *    `onReward(filled >= total ? 1 : filled + 1)`, so a parent at five of five
 *    who tapped once more silently dropped the child to **one** star, with no
 *    undo and no confirmation. The "one more" gesture is `nextAward` now: at
 *    the maximum it is a disabled control rather than a destructive one.
 * 2. **The stars are targets a child can hit.** They were roughly 20px, with
 *    `hitSlop={6}` on native and nothing at all on web — in the one module of
 *    the kit whose users have small hands and poor aim. Every star clears 44.
 * 3. **One interaction model on both twins.** Native declared
 *    `accessibilityRole="adjustable"` with no `accessibilityActions`, so
 *    VoiceOver's swipe-up and swipe-down did nothing; web was a `role="group"`
 *    of buttons or a `role="img"`, depending on a prop. Both twins are now a
 *    named group of real, individually-named buttons, and a display-only row is
 *    a single `role="img"` carrying the count.
 * 4. **The count is a string a caller owns.** `Reward: 3 of 5 stars` was
 *    assembled inline in English, including the plural. Every award control —
 *    each star, and the "one more" shortcut beside them — is named
 *    `` `${awardLabel}: ${formatCount(n, max)}` ``, the same composition the
 *    native twin uses, so the two twins say the same sentence for the same
 *    props. `awardLabel` is the **verb** in that sentence and is never drawn
 *    as prose on its own; a button reading only "Award" tells a parent
 *    nothing about what it will award.
 * 5. **A star is inked with the corrected slot.** `Icon`'s colour table maps
 *    `warn` to the *fill* token, which measures as low as 1.3:1 drawn as a
 *    glyph — and `warn` is this component's default.
 * 6. **Press is a state layer.** `hover:opacity-70` is inside M3's *disabled*
 *    band, so a hovered star and a dead star looked alike.
 */
export const RewardStarV4 = React.forwardRef<HTMLDivElement, RewardStarV4Props>(
  function RewardStarV4(
    {
      value,
      max = 5,
      size = 'md',
      label,
      color = 'warn',
      readOnly = false,
      formatCount,
      awardLabel = 'Award',
      onReward,
      className,
      ...rest
    },
    ref
  ) {
    React.useEffect(() => {
      injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);
    }, []);

    const parts = starParts(value, max);
    if (!parts.hasScale) return null;

    const count = formatCount ?? ((filled: number, total: number) => `${filled} of ${total} stars`);
    const countText = count(parts.filled, parts.max);
    const name = spokenLine([countText, label]);
    const interactive = !readOnly && typeof onReward === 'function';
    const next = nextAward(parts.filled, parts.max);

    /**
     * The one sentence every award control announces — `awardLabel` as the
     * verb, `formatCount` as the object, exactly as the native twin composes
     * it. `awardLabel` is a verb, not prose: it is never drawn on its own,
     * because "Award" by itself is not a label a parent can act on and it read
     * as one only because this twin used the prop for two different jobs.
     */
    const awardName = (value: number): string => `${awardLabel}: ${count(value, parts.max)}`;

    const glyphClass = cn('leading-none', GLYPH_SIZE[size]);

    const stars = Array.from({ length: parts.max }).map((_, index) => {
      const filled = index < parts.filled;
      const glyph = (
        <span
          aria-hidden="true"
          className={cn(glyphClass, filled ? STAR_INK[color] : 'text-muted-text')}
        >
          {filled ? '★' : '☆'}
        </span>
      );

      if (!interactive) {
        return (
          <span key={index} className="inline-flex items-center justify-center">
            {glyph}
          </span>
        );
      }

      return (
        <button
          key={index}
          type="button"
          aria-label={awardName(index + 1)}
          onClick={() => onReward?.(index + 1)}
          data-xen-v4-state=""
          style={surfaceStateVars()}
          className={cn(
            'inline-flex items-center justify-center rounded-[var(--xen-radius-md)] bg-transparent',
            MIN_TAP_SQUARE_CLASS,
            FOCUS_RING_CLASS
          )}
        >
          {glyph}
        </button>
      );
    });

    return (
      <div
        {...rest}
        ref={ref}
        data-xen-reward-star=""
        role={interactive ? 'group' : 'img'}
        aria-label={name}
        className={cn('flex flex-col items-start gap-xs', className)}
      >
        <div className="flex flex-wrap items-center gap-xs">{stars}</div>

        {interactive ? (
          <button
            type="button"
            // At the maximum `nextAward` returns `undefined` and the gesture is
            // a no-op — which is the whole fix. A disabled control says so.
            disabled={next === undefined}
            // The same sentence a star announces, off the same two props — a
            // shortcut to the next star has no business being named
            // differently from the star it stands in for. At the maximum there
            // is no next value, so it names the count it is stuck at and says
            // "dimmed" rather than naming a star it cannot award.
            aria-label={awardName(next ?? parts.filled)}
            onClick={() => {
              if (next !== undefined) onReward?.(next);
            }}
            data-xen-v4-state=""
            style={surfaceStateVars()}
            className={cn(
              'inline-flex items-center justify-center bg-transparent',
              'rounded-[var(--xen-radius-md)] font-semibold text-primary-text',
              V4_DISABLED_CLASS,
              MIN_TAP_SQUARE_CLASS,
              FOCUS_RING_CLASS
            )}
          >
            {/* Decoration. The verb lives in the name above, never in prose. */}
            <span aria-hidden="true" className={glyphClass}>
              ＋
            </span>
          </button>
        ) : null}

        {label ? <span className="text-sm text-muted-text">{label}</span> : null}
      </div>
    );
  }
);
