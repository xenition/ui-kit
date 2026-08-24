import * as React from 'react';
import { Image, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Avatar } from '../primitives/Avatar';
import { Button } from '../primitives/Button';
import { Icon } from '../primitives/Icon';
import { CampaignProgress } from './CampaignProgress';

/** Visual density of a {@link FundraiserCard}. */
export type FundraiserCardVariant = 'default' | 'compact' | 'featured';

export interface FundraiserCardProps {
  /** Fundraiser title. */
  title: string;
  /** Name of the person / team organizing. */
  organizerName: string;
  /** Organizer avatar URL (initials fallback otherwise). */
  organizerAvatarUrl?: string;
  /** Cover image URL; a token placeholder is drawn when absent. */
  imageUrl?: string;
  /** Alt text for the cover (defaults to the title). */
  imageAlt?: string;
  /** Amount raised so far, integer **cents**. */
  raisedCents: number;
  /** Goal, integer **cents** (divide-by-zero guarded downstream). */
  goalCents: number;
  /** ISO 4217 currency (default `USD`). */
  currency?: string;
  /** Donor count shown in the meta row. */
  donorCount?: number;
  /** Density / emphasis. `featured` enlarges the cover and title. */
  variant?: FundraiserCardVariant;
  /** Fires when the donate CTA is pressed. */
  onDonate?: () => void;
  /** Fires when the share action is pressed (rendered when provided). */
  onShare?: () => void;
  /** Show a skeleton placeholder instead of content. */
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * A peer-to-peer fundraiser card: organizer identity, an optional cover, the
 * title, a `CampaignProgress` meter (raised/goal in integer cents), and donate /
 * share actions. `variant` switches density; `compact` drops the cover. All
 * colors come from the compiled theme tokens — no literal colors.
 */
export function FundraiserCard({
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
}: FundraiserCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const isCompact = variant === 'compact';
  const isFeatured = variant === 'featured';

  const containerStyle: StyleProp<ViewStyle> = [
    { overflow: 'hidden', borderRadius: tokens.radius.lg, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface },
    style,
  ];

  if (loading) {
    return (
      <View accessibilityLabel="Loading fundraiser" style={containerStyle}>
        <View style={{ height: isFeatured ? 180 : 140, backgroundColor: tokens.ramps.neutral[200] }} />
        <View style={{ padding: tokens.spacing.md, gap: tokens.spacing.sm }}>
          <View style={{ height: tokens.spacing.lg, width: '70%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[200] }} />
          <View style={{ height: tokens.spacing.md, width: '50%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[100] }} />
        </View>
      </View>
    );
  }

  return (
    <View style={containerStyle}>
      {!isCompact ? (
        <View style={{ height: isFeatured ? 180 : 140, width: '100%', backgroundColor: tokens.ramps.neutral[100] }}>
          {imageUrl ? (
            <Image source={{ uri: imageUrl }} accessible accessibilityLabel={imageAlt ?? title} resizeMode="cover" style={{ width: '100%', height: '100%' }} />
          ) : (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Icon glyph="🎗️" size="2xl" />
            </View>
          )}
        </View>
      ) : null}

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

        <CampaignProgress raisedCents={raisedCents} goalCents={goalCents} currency={currency} donorCount={donorCount} />

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
