import * as React from 'react';
import { Animated, Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import { shadow } from '../primitives/internal/elevation';
import { usePressScale, useEnter } from '../primitives/internal/motion';
import { SHIPMENT_META, formatWeight, toneColor } from './internal';
import type { PackageRowProps } from './PackageRow';

/** Drop-in for {@link PackageRow}: identical props, a distinct design. */
export type PackageRowV2Props = PackageRowProps;

/**
 * PackageRow, alternate design **V2** — an *elevated package card*. Where the
 * classic is a flat dense row, V2 is a shadowed card: a large rounded package
 * glyph tile on the left, the id + contents stacked beside it, and the
 * weight/dimensions promoted into two labelled metric pills on their own row.
 * The status is a glyph + word badge in the header corner. Selection is a full
 * primary ring (plus a token scan-bar accent), never color alone. Springs on
 * press; fades in on mount. Same props. No literal colors.
 */
export function PackageRowV2({
  packageId,
  contents,
  weight,
  weightUnit = 'kg',
  dimensions,
  status,
  selected = false,
  onPress,
  testID,
  style,
}: PackageRowV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = status ? SHIPMENT_META[status] : undefined;
  const accent = meta ? toneColor(colors, meta.tone) : colors.muted;
  const enter = useEnter({ translateY: 6 });
  const press = usePressScale();

  const containerStyle: StyleProp<ViewStyle> = [
    {
      borderRadius: tokens.radius.lg,
      backgroundColor: colors.surface,
      padding: tokens.spacing.md,
      gap: tokens.spacing.sm,
      borderWidth: selected ? 2 : 0,
      borderColor: selected ? colors.primary : 'transparent',
      ...shadow('sm', tokens),
    },
    style,
  ];

  const metric = (label: string, value: string): React.ReactElement => (
    <View
      style={{
        flex: 1,
        gap: 1,
        paddingHorizontal: tokens.spacing.sm,
        paddingVertical: tokens.spacing.xs,
        borderRadius: tokens.radius.md,
        backgroundColor: tokens.ramps.neutral[100],
      }}
    >
      <Text style={{ fontSize: tokens.typography.scale.xs, color: colors.muted }}>{label}</Text>
      <Text numberOfLines={1} style={{ fontSize: tokens.typography.scale.sm, fontWeight: '700', color: colors.onSurface }}>
        {value}
      </Text>
    </View>
  );

  const hasMetrics = weight != null || dimensions;

  const content = (
    <>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
        {/* Package glyph tile with a token scan-bar strip. */}
        <View
          style={{
            width: 44,
            height: 44,
            borderRadius: tokens.radius.md,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: withAlpha(accent, 0.14),
          }}
        >
          <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.lg, color: accent }}>
            📦
          </Text>
        </View>

        <View style={{ flex: 1, minWidth: 0, gap: 1 }}>
          <Text numberOfLines={1} style={{ fontSize: tokens.typography.scale.base, fontWeight: '700', color: colors.onSurface }}>
            {packageId}
          </Text>
          {contents ? (
            <Text numberOfLines={1} style={{ fontSize: tokens.typography.scale.xs, color: colors.muted }}>
              {contents}
            </Text>
          ) : null}
        </View>

        {meta ? (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: tokens.spacing.xs,
              paddingHorizontal: tokens.spacing.sm,
              paddingVertical: tokens.spacing.xs,
              borderRadius: tokens.radius.full,
              backgroundColor: withAlpha(accent, 0.16),
            }}
          >
            <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.xs, color: accent }}>
              {meta.glyph}
            </Text>
            <Text style={{ fontSize: tokens.typography.scale.xs, fontWeight: '700', color: accent }}>
              {meta.label}
            </Text>
          </View>
        ) : null}
      </View>

      {hasMetrics ? (
        <View style={{ flexDirection: 'row', gap: tokens.spacing.sm }}>
          {weight != null ? metric('Weight', formatWeight(weight, weightUnit)) : null}
          {dimensions ? metric('Dimensions', dimensions) : null}
        </View>
      ) : null}
    </>
  );

  if (onPress) {
    return (
      <Animated.View style={[enter, { transform: [...enter.transform, { scale: press.scale }] }]}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Package ${packageId}${meta ? `, ${meta.label}` : ''}`}
          accessibilityState={{ selected }}
          onPress={onPress}
          onPressIn={press.onPressIn}
          onPressOut={press.onPressOut}
          testID={testID}
          style={containerStyle}
        >
          {content}
        </Pressable>
      </Animated.View>
    );
  }

  return (
    <Animated.View
      accessibilityLabel={`Package ${packageId}${meta ? `, ${meta.label}` : ''}`}
      accessibilityState={{ selected }}
      testID={testID}
      style={[containerStyle, enter]}
    >
      {content}
    </Animated.View>
  );
}
