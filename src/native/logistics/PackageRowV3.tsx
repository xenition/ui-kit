import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import { SHIPMENT_META, formatWeight, toneColor } from './internal';
import type { PackageRowProps } from './PackageRow';

/** Drop-in for {@link PackageRow}: identical props, a distinct design. */
export type PackageRowV3Props = PackageRowProps;

/**
 * PackageRow, alternate design **V3** — an *ultra-dense single line*. A small
 * inline package glyph, the id, then `weight · dims` collapsed into one muted
 * meta segment, and a trailing status glyph + word — all on one row with no
 * card chrome, tuned for long scannable manifests. Selection shows as a leading
 * token accent bar plus the a11y selected state (never color alone). Same props.
 */
export function PackageRowV3({
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
}: PackageRowV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = status ? SHIPMENT_META[status] : undefined;
  const accent = meta ? toneColor(colors, meta.tone) : colors.muted;

  const metaLine = [
    contents,
    weight != null ? formatWeight(weight, weightUnit) : null,
    dimensions,
  ]
    .filter(Boolean)
    .join('  ·  ');

  const containerStyle: StyleProp<ViewStyle> = [
    {
      flexDirection: 'row',
      alignItems: 'center',
      gap: tokens.spacing.sm,
      paddingVertical: tokens.spacing.xs,
      paddingHorizontal: tokens.spacing.xs,
      borderBottomWidth: 1,
      borderColor: colors.border,
      backgroundColor: 'transparent',
    },
    style,
  ];

  const inner = (
    <>
      {/* Leading selection accent bar (token). */}
      <View
        style={{
          width: 3,
          alignSelf: 'stretch',
          borderRadius: tokens.radius.full,
          backgroundColor: selected ? colors.primary : 'transparent',
        }}
      />
      <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.sm, color: colors.muted }}>
        📦
      </Text>
      <View style={{ flex: 1, minWidth: 0, gap: 1 }}>
        <Text numberOfLines={1} style={{ fontSize: tokens.typography.scale.sm, fontWeight: '600', color: colors.onSurface }}>
          {packageId}
        </Text>
        {metaLine ? (
          <Text numberOfLines={1} style={{ fontSize: tokens.typography.scale.xs, color: colors.muted }}>
            {metaLine}
          </Text>
        ) : null}
      </View>
      {meta ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.xs, color: accent }}>
            {meta.glyph}
          </Text>
          <Text style={{ fontSize: tokens.typography.scale.xs, fontWeight: '600', color: accent }}>
            {meta.label}
          </Text>
        </View>
      ) : null}
    </>
  );

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Package ${packageId}${meta ? `, ${meta.label}` : ''}`}
        accessibilityState={{ selected }}
        onPress={onPress}
        testID={testID}
        style={({ pressed }) => [containerStyle, { backgroundColor: pressed ? withAlpha(colors.primary, 0.04) : 'transparent' }]}
      >
        {inner}
      </Pressable>
    );
  }

  return (
    <View accessibilityState={{ selected }} testID={testID} style={containerStyle}>
      {inner}
    </View>
  );
}
