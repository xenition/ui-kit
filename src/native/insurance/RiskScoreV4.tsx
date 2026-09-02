import * as React from 'react';
import { View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { ProgressV4 } from '../primitives/ProgressV4';
import { TextV4 } from '../primitives/TextV4';
import { scoreParts } from '../../insurance/coverage-v4';
import {
  DECORATIVE,
  RISK_TIER_V4,
  chipStyle,
  spokenLine,
  tierFromRatio,
  toneInk,
} from './internal/tone-v4';
import type { RiskScoreProps, RiskTier } from './RiskScore';

export interface RiskScoreV4Props extends RiskScoreProps {
  /** Floor of the caller's own scale. Default `0`. */
  min?: number;
  /** Ceiling of the caller's own scale. Default `100`. */
  max?: number;
  /** Override the three band words. */
  tierLabels?: Partial<Record<RiskTier, string>>;
  /**
   * The meter's spoken name. Defaults to
   * {@link RiskScoreProps.label} — pass it when the visible heading is a short
   * column title and the reader needs the longer form.
   */
  scoreLabel?: string;
  /** Announced when `score` falls outside `min`–`max`. Default `'Off scale'`. */
  outOfRangeLabel?: string;
}

/**
 * **V4 risk score** — same props as {@link RiskScore} plus `min`, `max`,
 * `tierLabels`, `scoreLabel` and `outOfRangeLabel`.
 *
 * ## Five changes
 *
 * 1. **A 300–850 model can be rendered at all.** The scale was hard-coded 0–100
 *    and the cutoffs hard-coded at 33 and 66, so an insurer whose underwriting
 *    model runs on any other range could not use the component: `score={720}`
 *    clamped to 100 and reported "high risk". `min` and `max` are the caller's
 *    now, the bands are thirds of *that* scale, and `scoreParts` clamps and
 *    reports rather than clamping silently.
 * 2. **The score and the tier can no longer contradict each other.**
 *    `score={95} tier="low"` rendered "95 / 100" beside a green "Low risk"
 *    pill, because an explicit `tier` overrode the number outright. The meter
 *    and the numeral always come from `score`; an explicit `tier` still chooses
 *    the *word*, because it is on the base and removing it would break
 *    callers — but with the tier no longer carrying a status colour, that word
 *    is the caller's label rather than the screen's verdict.
 * 3. **The tier stops spending the alarm palette.** `low → success`,
 *    `high → danger`, drawn as `🟢` / `🟡` / `🔴` — so a screen reader said
 *    "green circle" out loud, a colour-blind reader got three identical grey
 *    dots, and a benefits screen had already used red before anything was
 *    wrong. The band is an ordered glyph (a quarter, a half, a full disc) and a
 *    word on the neutral chip every other kind in this module wears.
 * 4. **The meter reports its value.** The base's bare `Progress` had no role,
 *    no name and no value, so the one number on the screen was invisible to a
 *    reader unless they found the numeral beside it. It is a `progressbar` on
 *    the caller's own scale, and the tier chip and the factor bullets are
 *    hidden because the meter's name already carries them.
 * 5. **A score off its own scale says so** instead of pinning the bar to an end
 *    and asserting a band.
 *
 * The factor bullets lose their `•` from the reader's path — the base drew a
 * `Text` node containing a bullet character beside every factor, and a screen
 * reader announces it.
 */
export function RiskScoreV4({
  score,
  tier,
  label = 'Risk score',
  factors = [],
  min = 0,
  max = 100,
  tierLabels,
  scoreLabel,
  outOfRangeLabel = 'Off scale',
  style,
}: RiskScoreV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { tokens } = theme;

  const parts = scoreParts(score, min, max);
  const band = tier ?? tierFromRatio(parts.ratio);
  const meta = RISK_TIER_V4[band] ?? RISK_TIER_V4.moderate;
  const word = tierLabels?.[band] ?? meta.label;

  const list = Array.isArray(factors) ? factors : [];
  const name = scoreLabel ?? label;
  const spoken = spokenLine([
    name,
    `${parts.value} / ${parts.max}`,
    word,
    parts.outOfRange ? outOfRangeLabel : null,
    ...list,
  ]);

  return (
    <View style={[{ gap: tokens.spacing.sm }, style]}>
      <View
        {...DECORATIVE}
        style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}
      >
        <View style={{ gap: tokens.spacing.xs / 2 }}>
          <TextV4 size="sm" weight="semibold" tone="mutedText">
            {label}
          </TextV4>
          <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }}>
            <TextV4 size="3xl" weight="bold" tone="onCard" numeric="tabular">
              {parts.value}
            </TextV4>
            <TextV4 size="sm" tone="mutedText" numeric="tabular">
              {`/ ${parts.max}`}
            </TextV4>
          </View>
        </View>
        {/* A band, not a verdict — see change 3. The glyph scales with the
            word; the base pinned it with `allowFontScaling={false}`, so at 200%
            Dynamic Type it was a 12pt mark beside a 24pt label. */}
        <View style={chipStyle(theme)}>
          <TextV4 size="xs" tone="onCard">
            {meta.glyph}
          </TextV4>
          <TextV4 size="xs" weight="bold" tone="onCard">
            {word}
          </TextV4>
        </View>
      </View>

      <View
        accessible
        accessibilityRole="progressbar"
        accessibilityLabel={spoken}
        accessibilityValue={{
          min: parts.min,
          max: parts.max,
          now: parts.value,
          text: `${parts.value} / ${parts.max}`,
        }}
      >
        <ProgressV4 value={parts.value - parts.min} max={parts.max - parts.min} tone="primary" />
      </View>

      {parts.outOfRange ? (
        <TextV4
          {...DECORATIVE}
          size="xs"
          weight="semibold"
          style={{ color: toneInk(theme, 'warn') }}
        >
          {outOfRangeLabel}
        </TextV4>
      ) : null}

      {list.length > 0 ? (
        <View {...DECORATIVE} style={{ gap: tokens.spacing.xs, marginTop: tokens.spacing.xs }}>
          {list.map((factor, i) => (
            <View
              key={`${factor}-${i}`}
              style={{ flexDirection: 'row', gap: tokens.spacing.xs }}
            >
              <TextV4 size="xs" tone="mutedText">
                •
              </TextV4>
              <TextV4 size="xs" tone="mutedText" style={{ flex: 1 }}>
                {factor}
              </TextV4>
            </View>
          ))}
        </View>
      ) : null}
    </View>
  );
}
