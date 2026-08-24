import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Badge, type BadgeTone } from '../primitives/Badge';
import { Avatar } from '../primitives/Avatar';
import { Icon } from '../primitives/Icon';
import { formatMoney } from './internal';

/** Recognition tier for a donor. */
export type DonorTier = 'bronze' | 'silver' | 'gold' | 'platinum';

export interface DonorRowProps {
  /** Donor name. */
  name: string;
  /** Avatar image URL (initials fallback otherwise). */
  avatarUrl?: string;
  /** Lifetime giving, integer **cents**. */
  totalCents: number;
  /** ISO 4217 currency (default `USD`). */
  currency?: string;
  /** Number of gifts made. */
  giftCount?: number;
  /** Recognition tier rendered as a badge. */
  tier?: DonorTier;
  /** Rank position shown as a leading number (e.g. leaderboard). */
  rank?: number;
  /** Mark this donor as anonymous (name is replaced with a generic label). */
  anonymous?: boolean;
  /** Fires when the row is pressed. */
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

const TIER: Record<DonorTier, { tone: BadgeTone; label: string }> = {
  bronze: { tone: 'warn', label: 'Bronze' },
  silver: { tone: 'neutral', label: 'Silver' },
  gold: { tone: 'warn', label: 'Gold' },
  platinum: { tone: 'primary', label: 'Platinum' },
};

/**
 * A donor list / leaderboard row: optional rank, avatar, name, an optional
 * recognition-tier badge, lifetime giving (integer cents → `formatMoney`), and a
 * gift count. Anonymous donors show a generic label and a placeholder avatar.
 * The row is optionally pressable. All colors come from the compiled theme
 * tokens — no literal colors.
 */
export function DonorRow({
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
}: DonorRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const displayName = anonymous ? 'Anonymous donor' : name;
  const tierMeta = tier ? TIER[tier] : null;

  const inner = (
    <>
      {typeof rank === 'number' ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.base, fontWeight: '800', minWidth: tokens.spacing.lg, textAlign: 'center' }}>
          {rank}
        </Text>
      ) : null}
      <Avatar name={anonymous ? undefined : name} src={anonymous ? undefined : avatarUrl} size="sm" />
      <View style={{ flex: 1, gap: 2 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, flexWrap: 'wrap' }}>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>{displayName}</Text>
          {tierMeta ? <Badge tone={tierMeta.tone} variant="soft">{tierMeta.label}</Badge> : null}
        </View>
        {typeof giftCount === 'number' ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
            <Icon glyph="🎁" size="xs" color="muted" />
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{`${giftCount} gifts`}</Text>
          </View>
        ) : null}
      </View>
      <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
        {formatMoney(totalCents, currency)}
      </Text>
    </>
  );

  const rowStyle: StyleProp<ViewStyle> = [
    {
      flexDirection: 'row',
      alignItems: 'center',
      gap: tokens.spacing.md,
      paddingVertical: tokens.spacing.sm,
      paddingHorizontal: tokens.spacing.md,
      borderRadius: tokens.radius.md,
      backgroundColor: colors.surface,
    },
    style,
  ];

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${displayName}, ${formatMoney(totalCents, currency)} donated`}
        onPress={onPress}
        style={({ pressed }) => [rowStyle, { opacity: pressed ? 0.9 : 1 }]}
      >
        {inner}
      </Pressable>
    );
  }

  return (
    <View accessibilityLabel={`${displayName}, ${formatMoney(totalCents, currency)} donated`} style={rowStyle}>
      {inner}
    </View>
  );
}
