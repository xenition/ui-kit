import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { AvatarV4 } from '../primitives/AvatarV4';
import { BadgeV4 } from '../primitives/BadgeV4';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import {
  stateGroundVars,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../primitives/internal/v4-state';
import { formatMoney } from '../commerce/money';
import { BADGE_V4, clampPercent, spokenLine, TABULAR_CLASS, toneInkClass } from './internal/crm-v4';
import { TEMPERATURE_META } from './internal';
import type { LeadRowProps } from './LeadRow';

export interface LeadRowV4Props extends LeadRowProps {
  /** The unit in front of the score. Default `'Score'`. */
  scoreLabel?: string;
  /** How the score is spelled. Defaults to the whole number. */
  formatScore?: (score: number) => string;
}

/**
 * **V4 lead row** — the web twin of the native `LeadRowV4`, same props as
 * {@link LeadRow} plus `scoreLabel` and `formatScore`.
 *
 * ## Six changes
 *
 * 1. **The score badge stops being coloured by temperature.** It took its tone
 *    from `TEMPERATURE_META`, so a lead scored **5** rendered a `danger` badge
 *    purely because the lead was `hot` — the colour said nothing whatever about
 *    the number inside it, and it spent a status tone on an identity. The badge
 *    is neutral; temperature keeps its own glyph and its own word.
 * 2. **The score carries a unit.** `72` on its own is not a quantity of
 *    anything; the reader hears "Score 72".
 * 3. **`selected` is announced and drawn as more than a border colour.** A 1px
 *    accent edge is exactly the colour-alone signal the line forbids, and
 *    nothing reached assistive tech at all.
 * 4. **The row is a `button` only when it is interactive.** Native announced a
 *    plain row as a **disabled button**, because the role was unconditional and
 *    `disabled` was tied to the missing handler.
 * 5. **The temperature label fits.** "Warm" at 12px does not fit a 28px column
 *    and nothing truncated it, so it spilled. The column is the 44 target
 *    width and the label is allowed to sit in it.
 * 6. **One accessible name, money is tabular, and a press is a state layer.**
 */
export const LeadRowV4 = React.forwardRef<HTMLDivElement, LeadRowV4Props>(function LeadRowV4(
  {
    name,
    company,
    temperature,
    valueCents,
    currency = 'USD',
    score,
    avatarUrl,
    selected = false,
    scoreLabel = 'Score',
    formatScore,
    onClick,
    className,
    ...rest
  },
  ref
) {
  injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);

  if (!name) return null;

  const meta = TEMPERATURE_META[temperature];
  const clamped = clampPercent(score);
  const points = clamped != null ? Math.round(clamped) : undefined;
  const scoreText = points != null ? (formatScore ?? String)(points) : undefined;
  const money = valueCents != null ? formatMoney(valueCents, currency) : undefined;

  const label = spokenLine([
    meta.label,
    name,
    company,
    money,
    scoreText != null ? `${scoreLabel} ${scoreText}` : undefined,
  ]);

  const body = (
    <>
      {/*
        The temperature column is the 44 target width, not 28 — the width the
        label actually needs. The tone is reinforcement; the glyph and the word
        carry the meaning.
      */}
      <span
        className={cn(
          'flex w-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))] shrink-0 flex-col items-center',
          toneInkClass(meta.tone)
        )}
      >
        <span aria-hidden="true" className="text-lg leading-none">
          {meta.glyph}
        </span>
        <span className="text-xs font-bold">{meta.label}</span>
      </span>

      <AvatarV4 size="sm" name={name} src={avatarUrl} alt="" />

      <span className="flex min-w-0 flex-1 flex-col gap-xs text-left">
        <span className="truncate text-sm font-semibold text-on-surface">{name}</span>
        {company ? <span className="truncate text-xs text-muted-text">{company}</span> : null}
      </span>

      <span className="flex shrink-0 flex-col items-end gap-xs">
        {money ? (
          <span className={cn('text-sm font-bold text-on-surface', TABULAR_CLASS)}>{money}</span>
        ) : null}
        {scoreText != null ? (
          // Neutral: the badge prints a number, and the number's own colour has
          // to mean nothing.
          <BadgeV4 {...BADGE_V4} tone="neutral" aria-hidden="true">
            {scoreText}
          </BadgeV4>
        ) : null}
      </span>
    </>
  );

  const ground = selected ? 'bg-selected text-on-selected border-primary' : 'bg-surface border-border';

  return (
    <div ref={ref} className={cn('flex w-full', className)} {...rest}>
      {onClick ? (
        <button
          type="button"
          aria-label={label}
          aria-selected={selected}
          onClick={onClick}
          data-xen-v4-state=""
          style={
            // The opaque pair the row actually wears, selected or not.
            stateGroundVars(
              selected ? 'var(--xen-selected)' : 'var(--xen-surface)',
              selected ? 'var(--xen-on-selected)' : 'var(--xen-on-surface)'
            ) as React.CSSProperties
          }
          className={cn(
            'flex w-full items-center gap-sm rounded-[var(--xen-radius-md)] border px-sm py-sm text-left',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
            MIN_TAP_CLASS,
            ground
          )}
        >
          {body}
        </button>
      ) : (
        <div
          className={cn(
            'flex w-full items-center gap-sm rounded-[var(--xen-radius-md)] border px-sm py-sm',
            ground
          )}
        >
          {/* No button to carry the name, so the score's unit goes direct. */}
          {body}
          {scoreText != null ? (
            <span className="sr-only">{`${scoreLabel} ${scoreText}`}</span>
          ) : null}
        </div>
      )}
    </div>
  );
});
