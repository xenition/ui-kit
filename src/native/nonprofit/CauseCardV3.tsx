import * as React from 'react';
import { Image, Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Badge } from '../primitives/Badge';
import { Icon } from '../primitives/Icon';
import { formatMoney, goalPct } from './internal';
import type { CauseCardProps } from './CauseCard';

/** Drop-in alternate of {@link CauseCardProps} — identical prop contract. */
export type CauseCardV3Props = CauseCardProps;

/**
 * CauseCard — design variant **V3**: a **horizontal media-left row**. A square
 * cover thumbnail on the left, the category badge, title, blurb, and a compact
 * raised/goal line on the right — a dense list row instead of a stacked card.
 * When a goal is present a slim bar (sized via `goalPct`, divide-by-zero guarded)
 * appears with a printed percent, so progress never rests on color alone. Same
 * props as {@link CauseCardProps}. Token-only; money is integer cents.
 */
export function CauseCardV3({
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
}: CauseCardV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const thumb = variant === 'featured' ? 112 : 92;

  const containerStyle: StyleProp<ViewStyle> = [
    {
      flexDirection: 'row',
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
        <View style={{ width: thumb, height: thumb, backgroundColor: tokens.ramps.neutral[200] ?? colors.border }} />
        <View style={{ flex: 1, padding: tokens.spacing.md, gap: tokens.spacing.sm }}>
          <View style={{ height: tokens.spacing.lg, width: '70%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[200] ?? colors.border }} />
          <View style={{ height: tokens.spacing.md, width: '90%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[100] ?? colors.border }} />
        </View>
      </View>
    );
  }

  const hasProgress = typeof raisedCents === 'number' && typeof goalCents === 'number';
  const pct = hasProgress ? goalPct(raisedCents as number, goalCents as number) : 0;
  const pctLabel = `${Math.round(pct)}%`;
  const fillWidth = `${pct}%` as `${number}%`;

  const media = (
    <View style={{ width: thumb, height: thumb, backgroundColor: tokens.ramps.neutral[100] ?? colors.surface }}>
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} accessible accessibilityLabel={imageAlt ?? title} resizeMode="cover" style={{ width: '100%', height: '100%' }} />
      ) : (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Icon glyph="🤝" size="2xl" />
        </View>
      )}
    </View>
  );

  const body = (
    <View style={{ flex: 1, minWidth: 0, padding: tokens.spacing.md, gap: tokens.spacing.xs, justifyContent: 'center' }}>
      {category ? (
        <View style={{ alignSelf: 'flex-start' }}>
          <Badge tone="primary" variant="soft" size="sm">{category}</Badge>
        </View>
      ) : null}
      <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
        {title}
      </Text>
      {description ? (
        <Text numberOfLines={2} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
          {description}
        </Text>
      ) : null}
      {hasProgress ? (
        <View style={{ gap: tokens.spacing.xs, marginTop: tokens.spacing.xs }}>
          <View style={{ height: 4, borderRadius: tokens.radius.full, backgroundColor: tokens.ramps.neutral[200] ?? colors.border, overflow: 'hidden' }}>
            <View style={{ height: '100%', width: fillWidth, backgroundColor: colors.primary, borderRadius: tokens.radius.full }} />
          </View>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {`${formatMoney(raisedCents as number, currency)} · ${pctLabel} of ${formatMoney(goalCents as number, currency)}`}
          </Text>
        </View>
      ) : null}
    </View>
  );

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={title}
        onPress={onPress}
        style={({ pressed }) => [containerStyle, { opacity: pressed ? 0.9 : 1 }]}
      >
        {media}
        {body}
      </Pressable>
    );
  }

  return (
    <View style={containerStyle}>
      {media}
      {body}
    </View>
  );
}
