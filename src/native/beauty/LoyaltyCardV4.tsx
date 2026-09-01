import * as React from 'react';
import { View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { BadgeV4 } from '../primitives/BadgeV4';
import { CardV4 } from '../primitives/CardV4';
import { IconV4 } from '../primitives/IconV4';
import { ProgressV4 } from '../primitives/ProgressV4';
import { TextV4 } from '../primitives/TextV4';
import { metaLine, toneInk, type ToneV4 } from './internal/salon-v4';
import type { LoyaltyCardProps, LoyaltyTier } from './LoyaltyCard';

export interface LoyaltyCardV4Props extends LoyaltyCardProps {
  /** Override the tier names — four English words lived inside. */
  tierLabels?: Partial<Record<LoyaltyTier, string>>;
  /** Format the points figure. Default `'1,240 points'`. */
  formatPoints?: (points: number) => string;
  /** Build the to-next-tier line. Default `'260 to Gold'`. */
  formatRemaining?: (remaining: number, nextTier: string) => string;
  /** Shown when the member is at the top tier. Default `'Top tier'`. */
  topTierLabel?: string;
}

/**
 * Tier → tone, glyph and default word.
 *
 * `silver` takes `neutral` rather than the base's `muted`: both mean "no
 * status", but `muted` is a ramp step with no contrast promise and this is a
 * *label*, not a wash.
 */
const TIER_META: Record<LoyaltyTier, { label: string; glyph: string; tone: ToneV4 }> = {
  bronze: { label: 'Bronze', glyph: '🥉', tone: 'warn' },
  silver: { label: 'Silver', glyph: '🥈', tone: 'neutral' },
  gold: { label: 'Gold', glyph: '🥇', tone: 'accent' },
  platinum: { label: 'Platinum', glyph: '💎', tone: 'primary' },
};

/**
 * **V4 loyalty card** — same props as {@link LoyaltyCard} plus `tierLabels`,
 * `formatPoints`, `formatRemaining` and `topTierLabel`.
 *
 * ## Four changes
 *
 * 1. **The progress bar is `ProgressV4`.** The base drew its own track and
 *    fill, so the one meter on this card did not match the meters everywhere
 *    else — different height, different radius, no announced value.
 * 2. **The points figure is tabular and formatted.** `1240` is not `1,240` is
 *    not `1.240`, and a loyalty balance is a number a member compares against
 *    a target.
 * 3. **The tier ink is contrast-corrected**, where the base put the fill slot
 *    on text — including `muted`, which promises nothing at all.
 * 4. **A top-tier member is told so** rather than silently getting a full bar
 *    with no explanation.
 *
 * **Renders nothing without a `memberName`** (§4.5).
 */
export function LoyaltyCardV4({
  memberName,
  points,
  tier = 'bronze',
  nextTierAt,
  nextTierLabel,
  memberId,
  tierLabels,
  formatPoints,
  formatRemaining,
  topTierLabel = 'Top tier',
  style,
}: LoyaltyCardV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { tokens } = theme;
  if (!memberName) return null;

  const meta = TIER_META[tier] ?? TIER_META.bronze;
  const word = tierLabels?.[tier] ?? meta.label;
  const total = Number.isFinite(points) ? points : 0;
  const pointsText = (formatPoints ?? ((n: number) => `${n.toLocaleString()} points`))(total);

  const hasTarget = typeof nextTierAt === 'number' && nextTierAt > 0 && nextTierAt > total;
  const pct = hasTarget ? Math.max(0, Math.min(100, (total / (nextTierAt as number)) * 100)) : 100;
  const remaining = hasTarget ? (nextTierAt as number) - total : 0;
  const remainingText = hasTarget
    ? (formatRemaining ?? ((n: number, t: string) => `${n.toLocaleString()} to ${t}`))(
        remaining,
        nextTierLabel ?? 'next tier'
      )
    : topTierLabel;

  return (
    <CardV4
      accessible
      accessibilityLabel={metaLine([word, memberName, pointsText, remainingText])}
      style={[{ gap: tokens.spacing.md }, style]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        <View style={{ flex: 1, gap: tokens.spacing.xs }}>
          <TextV4 face="heading" size="base" weight="bold" tone="onCard" numberOfLines={1}>
            {memberName}
          </TextV4>
          {memberId ? (
            <TextV4 size="xs" tone="mutedText" numeric="tabular">
              {memberId}
            </TextV4>
          ) : null}
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          <IconV4 glyph={meta.glyph} size="lg" />
          <BadgeV4 tone={meta.tone} variant="soft" size="sm">
            {word}
          </BadgeV4>
        </View>
      </View>

      <View style={{ gap: tokens.spacing.xs }}>
        <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <TextV4
            face="heading"
            size="2xl"
            weight="bold"
            numeric="tabular"
            style={{ color: toneInk(theme, meta.tone) }}
          >
            {pointsText}
          </TextV4>
          <TextV4 size="xs" tone="mutedText" numeric="tabular">
            {remainingText}
          </TextV4>
        </View>
        <ProgressV4 value={pct} tone={meta.tone === 'accent' ? 'primary' : 'primary'} />
      </View>
    </CardV4>
  );
}
