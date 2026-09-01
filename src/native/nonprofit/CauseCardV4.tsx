import * as React from 'react';
import { Image, Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Badge } from '../primitives/Badge';
import { Icon } from '../primitives/Icon';
import { withAlpha } from '../primitives/internal/color';
import { CampaignProgressV4 } from './CampaignProgressV4';
import type { CauseCardProps } from './CauseCard';

/** Drop-in for {@link CauseCardProps} — same props, the V4 "rally" design. */
export type CauseCardV4Props = CauseCardProps;

/**
 * CauseCard — **V4** "rally" design. The warm, mission-driven browse tile for a
 * cause: an elevated rounded card with a soft shadow, a cover (image or a
 * friendly glyph in a soft-primary well), a soft-primary category chip, a bold
 * title + blurb, and an inline `CampaignProgressV4` meter when a goal is
 * supplied. Honors all three `variant`s — `default`, `compact`, `featured` —
 * identical props/behavior to {@link CauseCardProps}; the whole card is pressable
 * via `onPress`. Token-only colors via `useXenitionTheme()`.
 */
export function CauseCardV4({
  title,
  description,
  imageUrl,
  imageAlt,
  category,
  raisedCents,
  goalCents,
  currency = 'USD',
  variant = 'default',
  onPress,
  loading = false,
  style,
}: CauseCardV4Props): React.ReactElement {
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
      <View accessibilityLabel="Loading cause" style={containerStyle}>
        <View style={{ height: isFeatured ? 180 : 130, backgroundColor: tokens.ramps.neutral[200] }} />
        <View style={{ padding: tokens.spacing.md, gap: tokens.spacing.sm }}>
          <View style={{ height: tokens.spacing.lg, width: '70%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[200] }} />
          <View style={{ height: tokens.spacing.md, width: '90%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[100] }} />
        </View>
      </View>
    );
  }

  const hasProgress = typeof raisedCents === 'number' && typeof goalCents === 'number';

  const cover = !isCompact ? (
    <View style={{ height: isFeatured ? 180 : 130, width: '100%', backgroundColor: withAlpha(colors.primary, 0.1) }}>
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} accessible accessibilityLabel={imageAlt ?? title} resizeMode="cover" style={{ width: '100%', height: '100%' }} />
      ) : (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Icon glyph="🤝" size="2xl" />
        </View>
      )}
      {category ? (
        <View style={{ position: 'absolute', top: tokens.spacing.sm, left: tokens.spacing.sm }}>
          <Badge tone="primary" variant="soft">{category}</Badge>
        </View>
      ) : null}
    </View>
  ) : null;

  const body = (
    <View style={{ flex: 1, gap: tokens.spacing.xs, padding: tokens.spacing.md }}>
      {isCompact && category ? <Badge tone="primary" variant="soft">{category}</Badge> : null}
      <Text
        numberOfLines={2}
        style={{ color: colors.onSurface, fontSize: isFeatured ? tokens.typography.scale.xl : tokens.typography.scale.base, fontWeight: '700' }}
      >
        {title}
      </Text>
      {description ? (
        <Text numberOfLines={isCompact ? 2 : 3} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
          {description}
        </Text>
      ) : null}
      {hasProgress ? (
        <View style={{ marginTop: tokens.spacing.xs }}>
          <CampaignProgressV4 raisedCents={raisedCents as number} goalCents={goalCents as number} currency={currency} />
        </View>
      ) : null}
    </View>
  );

  const inner = isCompact ? body : (
    <>
      {cover}
      {body}
    </>
  );

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={title}
        onPress={onPress}
        style={({ pressed }) => [containerStyle, { flexDirection: isCompact ? 'row' : 'column', opacity: pressed ? 0.9 : 1 }]}
      >
        {inner}
      </Pressable>
    );
  }

  return <View style={[containerStyle, { flexDirection: isCompact ? 'row' : 'column' }]}>{inner}</View>;
}
