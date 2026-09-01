import * as React from 'react';
import { Image, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Avatar } from '../primitives/Avatar';
import { Button } from '../primitives/Button';
import { Icon } from '../primitives/Icon';
import { withAlpha } from '../primitives/internal/color';
import { CampaignProgressV4 } from './CampaignProgressV4';
import type { FundraiserCardProps } from './FundraiserCard';

/** Drop-in for {@link FundraiserCardProps} — same props, the V4 "rally" design. */
export type FundraiserCardV4Props = FundraiserCardProps;

/**
 * FundraiserCard — **V4** "rally" design. The warm, mission-driven peer-to-peer
 * fundraiser card: an elevated rounded card with a soft shadow, an organizer
 * identity row, a cover (image or a friendly glyph in a soft-primary well), a
 * bold title, an inline `CampaignProgressV4` meter (raised/goal in integer cents,
 * with the donor meta), and donate / share actions. Honors all three `variant`s —
 * `default` (cover on top), `compact` (cover-less dense row), and `featured`
 * (larger cover + title) — identical props/behavior to {@link FundraiserCardProps}.
 * Token-only colors via `useXenitionTheme()`.
 */
export function FundraiserCardV4({
  title,
  organizerName,
  organizerAvatarUrl,
  imageUrl,
  imageAlt,
  raisedCents,
  goalCents,
  currency = 'USD',
  donorCount,
  variant = 'default',
  onDonate,
  onShare,
  loading = false,
  style,
}: FundraiserCardV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const isCompact = variant === 'compact';
  const isFeatured = variant === 'featured';

  const containerStyle: StyleProp<ViewStyle> = [
    {
      overflow: 'hidden',
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

  if (loading) {
    return (
      <View accessibilityLabel="Loading fundraiser" style={containerStyle}>
        <View style={{ height: isFeatured ? 180 : 140, backgroundColor: withAlpha(colors.primary, 0.1) }} />
        <View style={{ padding: tokens.spacing.md, gap: tokens.spacing.sm }}>
          <View style={{ height: tokens.spacing.lg, width: '70%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[200] }} />
          <View style={{ height: tokens.spacing.md, width: '50%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[100] }} />
        </View>
      </View>
    );
  }

  const cover = !isCompact ? (
    <View style={{ height: isFeatured ? 180 : 140, width: '100%', backgroundColor: withAlpha(colors.primary, 0.1) }}>
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} accessible accessibilityLabel={imageAlt ?? title} resizeMode="cover" style={{ width: '100%', height: '100%' }} />
      ) : (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Icon glyph="🎗️" size="2xl" />
        </View>
      )}
    </View>
  ) : null;

  return (
    <View style={containerStyle}>
      {cover}

      <View style={{ padding: tokens.spacing.md, gap: tokens.spacing.sm }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
          <Avatar name={organizerName} src={organizerAvatarUrl} size="xs" />
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{`by ${organizerName}`}</Text>
        </View>

        <Text
          numberOfLines={2}
          style={{ color: colors.onSurface, fontSize: isFeatured ? tokens.typography.scale.xl : tokens.typography.scale.base, fontWeight: '700' }}
        >
          {title}
        </Text>

        <CampaignProgressV4 raisedCents={raisedCents} goalCents={goalCents} currency={currency} donorCount={donorCount} />

        <View style={{ flexDirection: 'row', gap: tokens.spacing.sm, marginTop: tokens.spacing.xs }}>
          <View style={{ flex: 1 }}>
            <Button variant="primary" onPress={onDonate}>Donate</Button>
          </View>
          {onShare ? (
            <Button variant="outline" onPress={onShare} accessibilityLabel="Share fundraiser">
              <Icon glyph="↗" size="base" accessibilityLabel="Share" />
            </Button>
          ) : null}
        </View>
      </View>
    </View>
  );
}
