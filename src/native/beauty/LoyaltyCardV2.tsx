import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import type { LoyaltyCardProps, LoyaltyTier } from './LoyaltyCard';

/** Drop-in alternate of {@link LoyaltyCardProps} — identical prop contract. */
export type LoyaltyCardV2Props = LoyaltyCardProps;

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

/**
 * LoyaltyCard — design variant **V2**: a **gradient membership card**. A tall,
 * rounded card whose accent-tinted surface is layered with two translucent
 * `withAlpha` sheens to read as a diagonal gradient (no gradient dependency),
 * with a "MEMBER" eyebrow + tier badge up top, the member name and spaced-out
 * id styled like an embossed card face, a large points balance, and a progress
 * bar toward the next tier. Where V1 is a flat info card, V2 is the wallet
 * artifact. Same props as {@link LoyaltyCardProps}. Token-only colors.
 */
export function LoyaltyCardV2({
  memberName,
  points,
  tier = 'bronze',
  nextTierAt,
  nextTierLabel,
  memberId,
  style,
}: LoyaltyCardV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = TIER_META[tier] ?? TIER_META.bronze;
  const accent = colors[meta.color];

  const hasTarget = typeof nextTierAt === 'number' && nextTierAt > 0 && nextTierAt > points;
  const pct = hasTarget ? Math.max(0, Math.min(1, points / (nextTierAt as number))) : 1;
  const remaining = hasTarget ? (nextTierAt as number) - points : 0;

  const container: StyleProp<ViewStyle> = [
    {
      borderRadius: tokens.radius.lg,
      overflow: 'hidden',
      padding: tokens.spacing.lg,
      gap: tokens.spacing.md,
      backgroundColor: withAlpha(accent, 0.18),
    },
    style,
  ];

  return (
    <View
      accessibilityLabel={`${meta.label} member ${memberName}, ${points} points${
        hasTarget ? `, ${remaining} to ${nextTierLabel ?? 'next tier'}` : ''
      }`}
      style={container}
    >
      {/* Gradient sheen — two token-tinted diagonal bands, no gradient dependency. */}
      <View
        pointerEvents="none"
        style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '55%', backgroundColor: withAlpha(accent, 0.12) }}
      />
      <View
        pointerEvents="none"
        style={{ position: 'absolute', bottom: 0, right: 0, width: '70%', height: '60%', backgroundColor: withAlpha(colors.onSurface, 0.05) }}
      />

      <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700', letterSpacing: 2 }}>MEMBER</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.xs,
            borderRadius: tokens.radius.full,
            paddingHorizontal: tokens.spacing.sm,
            paddingVertical: 2,
            backgroundColor: withAlpha(accent, 0.24),
          }}
        >
          <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.sm }}>
            {meta.glyph}
          </Text>
          <Text style={{ color: accent, fontSize: tokens.typography.scale.xs, fontWeight: '800' }}>{meta.label}</Text>
        </View>
      </View>

      <View style={{ gap: 4 }}>
        <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '800' }}>
          {memberName}
        </Text>
        {memberId ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm, letterSpacing: 3 }}>{memberId}</Text>
        ) : null}
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }}>
        <Text style={{ color: accent, fontSize: tokens.typography.scale['3xl'], fontWeight: '800' }}>{points}</Text>
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>points</Text>
      </View>

      {hasTarget ? (
        <View style={{ gap: tokens.spacing.xs }}>
          <View style={{ height: 8, borderRadius: tokens.radius.full, backgroundColor: withAlpha(colors.onSurface, 0.14), overflow: 'hidden' }}>
            <View style={{ width: `${pct * 100}%`, height: '100%', borderRadius: tokens.radius.full, backgroundColor: accent }} />
          </View>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {remaining} points to {nextTierLabel ?? 'next tier'}
          </Text>
        </View>
      ) : (
        <Text style={{ color: colors.success, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>Top tier reached</Text>
      )}
    </View>
  );
}
