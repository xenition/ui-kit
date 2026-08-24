import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import type { LoyaltyCardProps, LoyaltyTier } from './LoyaltyCard';

/** Drop-in alternate of {@link LoyaltyCardProps} — identical prop contract. */
export type LoyaltyCardV3Props = LoyaltyCardProps;

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
 * LoyaltyCard — design variant **V3**: a **minimal points row**. A single
 * hairline-ruled line — a tier glyph + label chip and the member name on the
 * left, the points balance on the right, with a tiny "N to next" caption
 * underneath when a target is set. Where V1 is an info card and V2 a wallet
 * artifact, V3 is the compact status row for a header or list. Same props as
 * {@link LoyaltyCardProps}. Token-only colors.
 */
export function LoyaltyCardV3({
  memberName,
  points,
  tier = 'bronze',
  nextTierAt,
  nextTierLabel,
  memberId,
  style,
}: LoyaltyCardV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = TIER_META[tier] ?? TIER_META.bronze;
  const accent = colors[meta.color];

  const hasTarget = typeof nextTierAt === 'number' && nextTierAt > 0 && nextTierAt > points;
  const remaining = hasTarget ? (nextTierAt as number) - points : 0;

  const container: StyleProp<ViewStyle> = [
    {
      flexDirection: 'row',
      alignItems: 'center',
      gap: tokens.spacing.md,
      paddingVertical: tokens.spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
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

      <View style={{ flex: 1, minWidth: 0, gap: 1 }}>
        <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
          {memberName}
        </Text>
        {hasTarget ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {remaining} to {nextTierLabel ?? 'next tier'}
          </Text>
        ) : memberId ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {memberId}
          </Text>
        ) : null}
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }}>
        <Text style={{ color: accent, fontSize: tokens.typography.scale.lg, fontWeight: '800' }}>{points}</Text>
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>pts</Text>
      </View>
    </View>
  );
}
