import * as React from 'react';
import { Image, Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Badge } from '../primitives/Badge';
import { Icon } from '../primitives/Icon';
import { CampaignProgress } from './CampaignProgress';

/** Visual density of a {@link CauseCard}. */
export type CauseCardVariant = 'default' | 'compact' | 'featured';

export interface CauseCardProps {
  /** Cause / program name. */
  title: string;
  /** Short description of the cause. */
  description?: string;
  /** Cover image URL; a token-filled placeholder is drawn when absent. */
  imageUrl?: string;
  /** Alt text for the cover (defaults to the title). */
  imageAlt?: string;
  /** Category label rendered as a badge (e.g. `Education`). */
  category?: string;
  /** Amount raised so far, integer **cents** (enables the mini progress meter). */
  raisedCents?: number;
  /** Goal, integer **cents**. */
  goalCents?: number;
  /** ISO 4217 currency (default `USD`). */
  currency?: string;
  /** Density / emphasis. `featured` enlarges the cover and title. */
  variant?: CauseCardVariant;
  /** Press handler for the whole card. */
  onPress?: () => void;
  /** Show a skeleton placeholder instead of content. */
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * A browse tile for a single cause / program: cover (image or token
 * placeholder), a category badge, title, blurb, and an optional inline
 * `CampaignProgress` meter when a goal is supplied. `variant` switches between a
 * full card, a `compact` cover-less row, and a larger `featured` treatment; the
 * whole card is pressable via `onPress`. All colors come from the compiled theme
 * tokens — no literal colors.
 */
export function CauseCard({
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
}: CauseCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const isCompact = variant === 'compact';
  const isFeatured = variant === 'featured';

  const containerStyle: StyleProp<ViewStyle> = [
    {
      overflow: 'hidden',
      borderRadius: tokens.radius.lg,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surface,
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
    <View style={{ height: isFeatured ? 180 : 130, width: '100%', backgroundColor: tokens.ramps.neutral[100] }}>
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} accessible accessibilityLabel={imageAlt ?? title} resizeMode="cover" style={{ width: '100%', height: '100%' }} />
      ) : (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Icon glyph="🤝" size="2xl" />
        </View>
      )}
      {category ? (
        <View style={{ position: 'absolute', top: tokens.spacing.sm, left: tokens.spacing.sm }}>
          <Badge tone="primary">{category}</Badge>
        </View>
      ) : null}
    </View>
  ) : null;

  const body = (
    <View style={{ flex: 1, gap: tokens.spacing.xs, padding: tokens.spacing.md }}>
      {isCompact && category ? <Badge tone="primary">{category}</Badge> : null}
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
          <CampaignProgress raisedCents={raisedCents as number} goalCents={goalCents as number} currency={currency} />
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
