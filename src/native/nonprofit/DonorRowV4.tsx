import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Badge, type BadgeTone } from '../primitives/Badge';
import { Avatar } from '../primitives/Avatar';
import { Icon } from '../primitives/Icon';
import { withAlpha } from '../primitives/internal/color';
import { formatMoney } from './internal';
import type { DonorRowProps, DonorTier } from './DonorRow';

/** Drop-in for {@link DonorRowProps} — same props, the V4 "rally" design. */
export type DonorRowV4Props = DonorRowProps;

const TIER: Record<DonorTier, { tone: BadgeTone; label: string; glyph: string }> = {
  bronze: { tone: 'warn', label: 'Bronze', glyph: '🥉' },
  silver: { tone: 'neutral', label: 'Silver', glyph: '🥈' },
  gold: { tone: 'warn', label: 'Gold', glyph: '🥇' },
  platinum: { tone: 'primary', label: 'Platinum', glyph: '💎' },
};

/**
 * DonorRow — **V4** "rally" design. An elevated, rounded donor / leaderboard row
 * on a clean surface (no gradient): a leading avatar in a soft-primary well, an
 * optional rank, a bold donor name with a glyph + labelled recognition-tier
 * {@link Badge} (never color alone), an optional gift-count chip, and a trailing
 * bold lifetime-giving total (integer cents → `formatMoney`). Anonymous donors
 * show a generic label + placeholder avatar. The whole row is pressable via
 * `onPress`. Identical props/behavior to {@link DonorRowProps}. Token-only colors
 * via `useXenitionTheme()`.
 */
export function DonorRowV4({
  name,
  avatarUrl,
  totalCents,
  currency = 'USD',
  giftCount,
  tier,
  rank,
  anonymous = false,
  onPress,
  style,
}: DonorRowV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const displayName = anonymous ? 'Anonymous donor' : name;
  const tierMeta = tier ? TIER[tier] : null;
  const label = `${displayName}, ${formatMoney(totalCents, currency)} donated${tierMeta ? `, ${tierMeta.label}` : ''}`;

  const containerStyle: StyleProp<ViewStyle> = [
    {
      flexDirection: 'row',
      alignItems: 'center',
      gap: tokens.spacing.md,
      paddingVertical: tokens.spacing.sm,
      paddingHorizontal: tokens.spacing.md,
      minHeight: 44,
      borderRadius: tokens.radius.lg,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.card,
      shadowColor: colors.onSurface,
      shadowOpacity: 0.08,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 6 },
      elevation: 3,
    },
    style,
  ];

  const inner = (
    <>
      {typeof rank === 'number' ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.base, fontWeight: '800', minWidth: tokens.spacing.lg, textAlign: 'center' }}>
          {rank}
        </Text>
      ) : null}
      <View style={{ height: 44, width: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center', backgroundColor: withAlpha(colors.primary, 0.1) }}>
        <Avatar name={anonymous ? undefined : name} src={anonymous ? undefined : avatarUrl} size="sm" />
      </View>
      <View style={{ flex: 1, gap: tokens.spacing.xs }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, flexWrap: 'wrap' }}>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>{displayName}</Text>
          {tierMeta ? (
            <Badge tone={tierMeta.tone} variant="soft">
              {`${tierMeta.glyph} ${tierMeta.label}`}
            </Badge>
          ) : null}
        </View>
        {typeof giftCount === 'number' ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', gap: tokens.spacing.xs, paddingVertical: 2, paddingHorizontal: tokens.spacing.sm, borderRadius: tokens.radius.lg, backgroundColor: withAlpha(colors.primary, 0.1) }}>
            <Icon glyph="🎁" size="xs" />
            <Text style={{ color: colors.primary, fontSize: tokens.typography.scale.sm }}>{`${giftCount} gifts`}</Text>
          </View>
        ) : null}
      </View>
      <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
        {formatMoney(totalCents, currency)}
      </Text>
    </>
  );

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={label}
        onPress={onPress}
        style={({ pressed }) => [containerStyle, { opacity: pressed ? 0.9 : 1 }]}
      >
        {inner}
      </Pressable>
    );
  }

  return (
    <View accessibilityLabel={label} style={containerStyle}>
      {inner}
    </View>
  );
}
