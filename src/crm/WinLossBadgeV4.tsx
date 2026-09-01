import * as React from 'react';
import { cn } from '../primitives/cn';
import { BadgeV4 } from '../primitives/BadgeV4';
import { BADGE_V4, toneInkClass } from './internal/crm-v4';
import { OUTCOME_META, type DealOutcome } from './internal';
import type { WinLossBadgeProps } from './WinLossBadge';

export interface WinLossBadgeV4Props extends WinLossBadgeProps {
  /** Override the four outcome words — they were hard-coded English. */
  outcomeLabels?: Partial<Record<DealOutcome, string>>;
}

/**
 * **V4 win/loss badge** — the web twin of the native `WinLossBadgeV4`, same
 * props as {@link WinLossBadge} plus `outcomeLabels`.
 *
 * ## Four changes
 *
 * 1. **`size` is honoured.** It was destructured, read only in the `inline`
 *    branch and never forwarded to `Badge`, so `DealCard` passing `size="sm"`
 *    got an `sm` badge on native and an `md` one on web — from one prop, on
 *    one call.
 * 2. **The pill is the same pill on both twins.** Web took `Badge`'s `solid`
 *    default while native passed `variant="soft"`, so a won deal was a
 *    saturated green pill on one platform and a tinted chip on the other. This
 *    is the module's most repeated element; {@link BADGE_V4} decides it once.
 * 3. **The ink is the contrast-corrected slot.** The `inline` variant coloured
 *    its glyph and word with `text-${tone}` — a **fill** token spent as ink,
 *    which the theme makes no contrast promise about at all.
 * 4. **The four words are overridable.** `Won` / `Lost` / `Open` / `Pending`
 *    shipped as English inside the component.
 *
 * The outcome is still carried by a glyph **and** a word, so it survives
 * greyscale and colour blindness — that part of the base was right.
 */
export const WinLossBadgeV4 = React.forwardRef<HTMLSpanElement, WinLossBadgeV4Props>(
  function WinLossBadgeV4(
    { outcome, variant = 'badge', size = 'md', hideLabel = false, outcomeLabels, className, ...rest },
    ref
  ) {
    const meta = OUTCOME_META[outcome];
    // An outcome the table does not know is a frame around nothing.
    if (!meta) return null;

    const word = outcomeLabels?.[outcome] ?? meta.label;
    const label = `${word} deal`;

    if (variant === 'inline') {
      return (
        <span
          ref={ref}
          role="img"
          aria-label={label}
          className={cn(
            'inline-flex items-center gap-xs',
            toneInkClass(meta.tone),
            size === 'sm' ? 'text-xs' : 'text-sm',
            className
          )}
          {...rest}
        >
          <span aria-hidden="true">{meta.glyph}</span>
          {hideLabel ? null : <span className="font-semibold">{word}</span>}
        </span>
      );
    }

    return (
      <BadgeV4
        ref={ref}
        // `BADGE_V4` decides the *shape* — a soft chip on both twins — and the
        // caller's `size` still wins, which is the whole point of change 1.
        {...BADGE_V4}
        size={size}
        tone={meta.tone}
        role="img"
        aria-label={label}
        className={cn('align-middle', className)}
        {...rest}
      >
        <span aria-hidden="true">{meta.glyph}</span>
        {hideLabel ? null : <span>{word}</span>}
      </BadgeV4>
    );
  }
);
