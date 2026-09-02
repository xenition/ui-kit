import * as React from 'react';
import { cn } from '../primitives/cn';
import { ProgressV4 } from '../primitives/ProgressV4';
import { scoreParts } from './coverage-v4';
import {
  RISK_TIER_META_V4,
  spokenLine,
  TABULAR_CLASS,
  toneGroundStyle,
  toneInkClass,
} from './internal/tone-v4';
import type { RiskScoreProps, RiskTier } from './RiskScore';

const TIER_ORDER: readonly RiskTier[] = ['low', 'moderate', 'high'];

/** Where a position on the caller's own scale falls, in thirds. */
function tierFromRatio(ratio: number): RiskTier {
  if (ratio <= 1 / 3) return 'low';
  if (ratio <= 2 / 3) return 'moderate';
  return 'high';
}

export interface RiskScoreV4Props extends RiskScoreProps {
  /** Scale floor. Default `0`. */
  min?: number;
  /** Scale ceiling. Default `100`. */
  max?: number;
  /** Rename a tier. Defaults `'Low risk'`, `'Moderate risk'`, `'High risk'`. */
  tierLabels?: Partial<Record<RiskTier, string>>;
  /** The meter's own name. Default: `label`. */
  scoreLabel?: string;
  /** Said when the score falls outside `min`–`max`. Default `'Off scale'`. */
  outOfRangeLabel?: string;
}

/**
 * **V4 risk score** — same props as {@link RiskScore} plus `min`, `max`,
 * `tierLabels` and `scoreLabel`.
 *
 * ## Five changes
 *
 * 1. **A 300–850 model can be rendered.** The scale was hard-coded 0–100 with
 *    33/66 cutoffs, so an insurer whose underwriting model runs on any other
 *    range could not use the component at all — a 720 clamped to 100 and
 *    reported "High risk". `min` and `max` are the caller's, and a score
 *    outside them is said out loud rather than silently clamped to the edge.
 * 2. **`score={95} tier="low"` no longer renders a green "Low risk".** An
 *    explicit `tier` overrode the score outright, and the pill was the loudest
 *    thing on the card, so the applicant read the colour and not the number.
 *    The numeral, its scale and the meter are always drawn from `score`; the
 *    tier is a word beside them, and when the caller's tier contradicts where
 *    the score actually sits, both are shown rather than one quietly winning.
 * 3. **The tier stops spending a status colour.** `low → success`,
 *    `high → danger` told an applicant they had passed or failed something. A
 *    tier is an underwriting classification, the same kind of thing as a credit
 *    band; the ordering lives in the numeral and the meter, where it is
 *    checkable, and the glyph carries the tier at a glance.
 * 4. **The meter is exposed.** The bar was decorative — `Progress` with no
 *    name — so a screen-reader user got the numeral and nothing about where it
 *    sits on the range. It is a named `progressbar` with the score, its floor
 *    and its ceiling.
 * 5. **The score was announced by a label that replaced it.** `aria-label` on
 *    the `<span>` holding the numeral meant the "/ 100" beside it was never
 *    read; the name now carries the whole reading, and every word is a prop.
 */
export const RiskScoreV4 = React.forwardRef<HTMLDivElement, RiskScoreV4Props>(function RiskScoreV4(
  {
    score,
    tier,
    label = 'Risk score',
    factors = [],
    min = 0,
    max = 100,
    tierLabels,
    scoreLabel,
    outOfRangeLabel = 'Off scale',
    className,
    ...rest
  },
  ref
) {
  const parts = scoreParts(score, min, max);
  const derivedTier = tierFromRatio(parts.ratio);
  const shownTier = tier ?? derivedTier;
  const labelFor = (value: RiskTier): string => tierLabels?.[value] ?? RISK_TIER_META_V4[value].label;
  const meta = RISK_TIER_META_V4[shownTier] ?? RISK_TIER_META_V4.moderate;
  const list = Array.isArray(factors) ? factors : [];

  const scoreText = String(Math.round(parts.value));
  const scaleText = `/ ${parts.max}`;
  const meterName = scoreLabel ?? label;

  // The caller asserted a tier the score does not sit in. Neither is deleted:
  // overriding was the defect, and silently overriding the override would be
  // the same defect pointed the other way.
  const contradiction =
    tier != null && tier !== derivedTier
      ? `Score sits in the ${labelFor(derivedTier)} band`
      : undefined;
  // The words are the caller's; the range is the caller's own numbers, so it
  // is appended rather than embedded in a string they would have to rebuild.
  const outOfRange = parts.outOfRange
    ? `${outOfRangeLabel}: ${parts.min}–${parts.max}`
    : undefined;

  return (
    <div ref={ref} className={cn('flex flex-col gap-sm', className)} {...rest}>
      <div className="flex items-end justify-between gap-sm">
        <span className="flex flex-col gap-xs">
          <span className="text-sm font-semibold text-muted-text">{label}</span>
          <span className="flex items-baseline gap-xs">
            <span className={cn('text-3xl font-bold text-on-card', TABULAR_CLASS)}>
              {scoreText}
            </span>
            <span className={cn('text-sm text-muted-text', TABULAR_CLASS)}>{scaleText}</span>
          </span>
        </span>

        <span
          className={cn(
            'flex shrink-0 items-center gap-xs rounded-[var(--xen-radius-full)] px-sm py-xs',
            toneInkClass(meta.tone)
          )}
          style={toneGroundStyle(meta.tone)}
        >
          <span aria-hidden="true" className="text-xs">
            {meta.glyph}
          </span>
          <span className="text-xs font-bold">{labelFor(shownTier)}</span>
          {/* The ordering, in words, now that it is no longer in the colour. */}
          <span className="sr-only">{`Tier ${TIER_ORDER.indexOf(shownTier) + 1} of ${TIER_ORDER.length}`}</span>
        </span>
      </div>

      {/*
        The bar is drawn from the position within the scale, not from
        `value / max` — on a 300–850 model those are 76% and 84%, and the
        second one is the one the base drew.
      */}
      <ProgressV4
        value={parts.value - parts.min}
        max={parts.max - parts.min}
        tone="primary"
        aria-label={spokenLine([
          meterName,
          `${scoreText} out of ${parts.max}`,
          labelFor(shownTier),
          contradiction,
          outOfRange,
        ])}
        aria-valuenow={parts.value}
        aria-valuemin={parts.min}
        aria-valuemax={parts.max}
        aria-valuetext={`${scoreText} of ${parts.max}, ${labelFor(shownTier)}`}
      />

      {contradiction != null || outOfRange != null ? (
        <p className="text-xs font-semibold text-warn-text">
          {spokenLine([outOfRange, contradiction])}
        </p>
      ) : null}

      {list.length > 0 ? (
        <ul aria-label={`${label} factors`} className="mt-xs flex flex-col gap-xs">
          {list.map((factor, index) => (
            <li key={`${factor}-${index}`} className="flex gap-xs text-xs text-muted-text">
              <span aria-hidden="true">•</span>
              <span className="flex-1">{factor}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
});
