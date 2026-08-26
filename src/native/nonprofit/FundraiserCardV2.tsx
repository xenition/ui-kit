import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Avatar } from '../primitives/Avatar';
import { Button } from '../primitives/Button';
import { Icon } from '../primitives/Icon';
import { shadow } from '../primitives/internal/elevation';
import { CampaignProgressV2 } from './CampaignProgressV2';
import { withAlpha } from './internal';
import type { FundraiserCardProps } from './FundraiserCard';

/** Drop-in alternate of {@link FundraiserCardProps} — identical prop contract. */
export type FundraiserCardV2Props = FundraiserCardProps;

/**
 * FundraiserCard — design variant **V2**: an **organizer-forward profile card**.
 * Instead of a cover photo up top, V2 leads with the organizer's identity — a
 * large avatar over a tinted banner, an "Organized by" line, the title, the
 * progress meter (raised/goal in integer cents, divide-by-zero guarded
 * downstream), and donate / share actions. Floats on a drop shadow (no border).
 * Same props as {@link FundraiserCardProps}. Token-only.
 * Stays inside its own design line: the meter is {@link CampaignProgressV2}, not
 * the base one, because an app that picks V2 picks it for every surface it sees.
 */
export function FundraiserCardV2({
  title,
  organizerName,
  organizerAvatarUrl,
  raisedCents,
  goalCents,
  currency = 'USD',
  donorCount,
  variant = 'default',
  onDonate,
  onShare,
  loading = false,
  style,
}: FundraiserCardV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const isFeatured = variant === 'featured';

  const containerStyle: StyleProp<ViewStyle> = [
    { overflow: 'hidden', borderRadius: tokens.radius.lg, backgroundColor: colors.surface, ...shadow('md', tokens) },
    style,
  ];

  if (loading) {
    return (
      <View accessibilityLabel="Loading fundraiser" style={containerStyle}>
        <View style={{ height: 64, backgroundColor: tokens.ramps.neutral[200] ?? colors.border }} />
        <View style={{ padding: tokens.spacing.md, gap: tokens.spacing.sm }}>
          <View style={{ height: tokens.spacing.lg, width: '70%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[200] ?? colors.border }} />
          <View style={{ height: tokens.spacing.md, width: '50%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[100] ?? colors.border }} />
        </View>
      </View>
    );
  }

  return (
    <View style={containerStyle}>
      <View style={{ height: 56, backgroundColor: withAlpha(colors.primary, 0.12) }} />
      <View style={{ paddingHorizontal: tokens.spacing.lg, paddingBottom: tokens.spacing.lg, gap: tokens.spacing.sm }}>
        <View style={{ marginTop: -28, gap: tokens.spacing.xs }}>
          <Avatar name={organizerName} src={organizerAvatarUrl} size={isFeatured ? 'xl' : 'lg'} />
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
            {`Organized by ${organizerName}`}
          </Text>
        </View>

        <Text
          numberOfLines={2}
          style={{ color: colors.onSurface, fontSize: isFeatured ? tokens.typography.scale.xl : tokens.typography.scale.lg, fontWeight: '800' }}
        >
          {title}
        </Text>

        <CampaignProgressV2 raisedCents={raisedCents} goalCents={goalCents} currency={currency} donorCount={donorCount} />

        <View style={{ flexDirection: 'row', gap: tokens.spacing.sm, marginTop: tokens.spacing.xs }}>
          <View style={{ flex: 1 }}>
            <Button variant="primary" size="lg" onPress={onDonate}>Donate</Button>
          </View>
          {onShare ? (
            <Button variant="outline" size="lg" onPress={onShare} accessibilityLabel="Share fundraiser">
              <Icon glyph="↗" size="lg" accessibilityLabel="Share" />
            </Button>
          ) : null}
        </View>
      </View>
    </View>
  );
}
