import * as React from 'react';
import { Animated, Image, Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Badge } from '../primitives/Badge';
import { Icon } from '../primitives/Icon';
import { usePressScale } from '../primitives/internal/motion';
import { formatMoney, goalPct, withAlpha } from './internal';
import type { CauseCardProps } from './CauseCard';

/** Drop-in alternate of {@link CauseCardProps} — identical prop contract. */
export type CauseCardV2Props = CauseCardProps;

/**
 * CauseCard — design variant **V2**: a **full-bleed cover hero**. The cover fills
 * the whole tile; a token-tinted scrim sits over its lower half so the category
 * badge, title, blurb, and a slim progress overlay read in light ink regardless
 * of the photo. Progress is sized to `raised/goal` (divide-by-zero guarded via
 * `goalPct`) and always paired with a printed percent — never color alone.
 * Pressable cards get a press-scale spring (reduced-motion aware). Same props as
 * {@link CauseCardProps}. Token-only; money is integer cents.
 */
export function CauseCardV2({
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
}: CauseCardV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const press = usePressScale();
  const isFeatured = variant === 'featured';
  const height = isFeatured ? 260 : 200;

  const containerStyle: StyleProp<ViewStyle> = [
    { overflow: 'hidden', borderRadius: tokens.radius.lg, backgroundColor: tokens.ramps.neutral[100] ?? colors.surface },
    style,
  ];

  if (loading) {
    return (
      <View accessibilityLabel="Loading cause" style={containerStyle}>
        <View style={{ height, backgroundColor: tokens.ramps.neutral[200] ?? colors.border }} />
      </View>
    );
  }

  const hasProgress = typeof raisedCents === 'number' && typeof goalCents === 'number';
  const pct = hasProgress ? goalPct(raisedCents as number, goalCents as number) : 0;
  const pctLabel = `${Math.round(pct)}%`;
  const fillWidth = `${pct}%` as `${number}%`;
  const light = tokens.ramps.neutral[50] ?? colors.onPrimary;

  const inner = (
    <View style={{ height }}>
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} accessible accessibilityLabel={imageAlt ?? title} resizeMode="cover" style={{ width: '100%', height: '100%' }} />
      ) : (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Icon glyph="🤝" size="3xl" />
        </View>
      )}

      {category ? (
        <View style={{ position: 'absolute', top: tokens.spacing.sm, left: tokens.spacing.sm }}>
          <Badge tone="primary">{category}</Badge>
        </View>
      ) : null}

      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          padding: tokens.spacing.md,
          gap: tokens.spacing.xs,
          backgroundColor: withAlpha(tokens.ramps.neutral[950] ?? tokens.ramps.neutral[900] ?? colors.onSurface, 0.55),
        }}
      >
        <Text numberOfLines={2} style={{ color: light, fontSize: isFeatured ? tokens.typography.scale.xl : tokens.typography.scale.lg, fontWeight: '800' }}>
          {title}
        </Text>
        {description ? (
          <Text numberOfLines={2} style={{ color: withAlpha(light, 0.85), fontSize: tokens.typography.scale.sm }}>
            {description}
          </Text>
        ) : null}
        {hasProgress ? (
          <View style={{ gap: tokens.spacing.xs, marginTop: tokens.spacing.xs }}>
            <View style={{ height: 6, borderRadius: tokens.radius.full, backgroundColor: withAlpha(light, 0.3), overflow: 'hidden' }}>
              <View style={{ height: '100%', width: fillWidth, backgroundColor: colors.primary, borderRadius: tokens.radius.full }} />
            </View>
            <Text style={{ color: light, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>
              {`${formatMoney(raisedCents as number, currency)} raised · ${pctLabel} of goal`}
            </Text>
          </View>
        ) : null}
      </View>
    </View>
  );

  if (onPress) {
    return (
      <Animated.View style={{ transform: [{ scale: press.scale }] }}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={title}
          onPress={onPress}
          onPressIn={press.onPressIn}
          onPressOut={press.onPressOut}
          style={containerStyle}
        >
          {inner}
        </Pressable>
      </Animated.View>
    );
  }

  return <View style={containerStyle}>{inner}</View>;
}
