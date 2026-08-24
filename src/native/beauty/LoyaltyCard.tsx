import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { withAlpha } from '../primitives/internal/color';

export type LoyaltyTier = 'bronze' | 'silver' | 'gold' | 'platinum';

interface TierMeta {
  label: string;
  glyph: string;
  color: keyof SemanticColors;
}

const TIER_META: Record<LoyaltyTier, TierMeta> = {
  bronze: { label: 'Bronze', glyph: '🥉', color: 'warn' },
  silver: { label: 'Silver', glyph: '🥈', color: 'muted' },
  gold: { label: 'Gold', glyph: '🥇', color: 'accent' },
  platinum: { label: 'Platinum', glyph: '💎', color: 'primary' },
};

export interface LoyaltyCardProps {
  /** Member name shown on the card. */
  memberName: string;
  /** Current points balance. */
  points: number;
  /** Membership tier; drives label, glyph, and accent. Falls back to `bronze`. */
  tier?: LoyaltyTier;
  /** Points required to reach the next tier. Enables the progress bar. */
  nextTierAt?: number;
  /** Name of the next tier (for the progress caption). */
  nextTierLabel?: string;
  /** Optional membership id / code shown under the name. */
  memberId?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * A membership loyalty card: tier badge, member name/id, a large points balance,
 * and (when `nextTierAt` is set) a progress bar toward the next tier with a
 * remaining-points caption. `tier` drives the accent, glyph, and label — never
 * color alone. Progress is clamped and guards a zero/invalid target. Token-only
 * colors via semantic slots + `withAlpha` tints.
 */
export function LoyaltyCard({
  memberName,
  points,
  tier = 'bronze',
  nextTierAt,
  nextTierLabel,
  memberId,
  style,
}: LoyaltyCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = TIER_META[tier] ?? TIER_META.bronze;
  const accent = colors[meta.color];

  const hasTarget = typeof nextTierAt === 'number' && nextTierAt > 0 && nextTierAt > points;
  const pct = hasTarget ? Math.max(0, Math.min(1, points / (nextTierAt as number))) : 1;
  const remaining = hasTarget ? (nextTierAt as number) - points : 0;

  return (
    <View
      accessibilityLabel={`${meta.label} member ${memberName}, ${points} points${
        hasTarget ? `, ${remaining} to ${nextTierLabel ?? 'next tier'}` : ''
      }`}
      style={[
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.lg,
          gap: tokens.spacing.md,
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flex: 1, gap: 2 }}>
          <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
            {memberName}
          </Text>
          {memberId ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{memberId}</Text>
          ) : null}
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.xs,
            borderRadius: tokens.radius.full,
            paddingHorizontal: tokens.spacing.sm,
            paddingVertical: 2,
            backgroundColor: withAlpha(accent, 0.16),
          }}
        >
          <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.sm }}>
            {meta.glyph}
          </Text>
          <Text style={{ color: accent, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>{meta.label}</Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }}>
        <Text style={{ color: accent, fontSize: tokens.typography.scale['3xl'], fontWeight: '800' }}>{points}</Text>
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>points</Text>
      </View>

      {hasTarget ? (
        <View style={{ gap: tokens.spacing.xs }}>
          <View style={{ height: 8, borderRadius: tokens.radius.full, backgroundColor: withAlpha(colors.muted, 0.2), overflow: 'hidden' }}>
            <View style={{ width: `${pct * 100}%`, height: '100%', borderRadius: tokens.radius.full, backgroundColor: accent }} />
          </View>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {remaining} points to {nextTierLabel ?? 'next tier'}
          </Text>
        </View>
      ) : (
        <Text style={{ color: colors.success, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>Top tier reached</Text>
      )}
    </View>
  );
}
