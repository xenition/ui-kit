import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Avatar } from '../primitives/Avatar';
import { Button } from '../primitives/Button';
import { formatMoney, goalPct } from './internal';
import type { FundraiserCardProps } from './FundraiserCard';

/** Drop-in alternate of {@link FundraiserCardProps} — identical prop contract. */
export type FundraiserCardV3Props = FundraiserCardProps;

/**
 * FundraiserCard — design variant **V3**: a **compact list row**. Organizer
 * avatar on the left, title + a hairline progress bar with a raised/percent line
 * in the middle, and a small Donate button on the right — a dense row for feeds
 * and search results. Progress is sized via `goalPct` (divide-by-zero guarded)
 * and always paired with a printed percent, never color alone. Same props as
 * {@link FundraiserCardProps}. Token-only; money is integer cents.
 */
export function FundraiserCardV3({
  title,
  organizerName,
  organizerAvatarUrl,
  raisedCents,
  goalCents,
  currency = 'USD',
  donorCount,
  onDonate,
  loading = false,
  style,
}: FundraiserCardV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const containerStyle: StyleProp<ViewStyle> = [
    {
      flexDirection: 'row',
      alignItems: 'center',
      gap: tokens.spacing.md,
      padding: tokens.spacing.md,
      borderRadius: tokens.radius.lg,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surface,
    },
    style,
  ];

  if (loading) {
    return (
      <View accessibilityLabel="Loading fundraiser" style={containerStyle}>
        <View style={{ width: 40, height: 40, borderRadius: tokens.radius.full, backgroundColor: tokens.ramps.neutral[200] ?? colors.border }} />
        <View style={{ flex: 1, gap: tokens.spacing.sm }}>
          <View style={{ height: tokens.spacing.md, width: '70%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[200] ?? colors.border }} />
          <View style={{ height: tokens.spacing.sm, width: '90%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[100] ?? colors.border }} />
        </View>
      </View>
    );
  }

  const pct = goalPct(raisedCents, goalCents);
  const pctLabel = `${Math.round(pct)}%`;
  const fillWidth = `${pct}%` as `${number}%`;
  const donors = typeof donorCount === 'number' ? ` · ${donorCount} donors` : '';

  return (
    <View style={containerStyle}>
      <Avatar name={organizerName} src={organizerAvatarUrl} size="md" />

      <View style={{ flex: 1, minWidth: 0, gap: tokens.spacing.xs }}>
        <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
          {title}
        </Text>
        <View style={{ height: 4, borderRadius: tokens.radius.full, backgroundColor: tokens.ramps.neutral[200] ?? colors.border, overflow: 'hidden' }}>
          <View style={{ height: '100%', width: fillWidth, backgroundColor: colors.primary, borderRadius: tokens.radius.full }} />
        </View>
        <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
          {`${formatMoney(raisedCents, currency)} · ${pctLabel}${donors}`}
        </Text>
      </View>

      <Button variant="primary" size="sm" onPress={onDonate}>Donate</Button>
    </View>
  );
}
