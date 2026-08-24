import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import type { FieldCardProps, FieldStatus } from './FieldCard';

/** Drop-in alternate of {@link FieldCardProps} — identical prop contract. */
export type FieldCardV3Props = FieldCardProps;

const STATUS_META: Record<FieldStatus, { label: string; glyph: string; color: keyof SemanticColors }> = {
  planted: { label: 'Planted', glyph: '🌱', color: 'success' },
  fallow: { label: 'Fallow', glyph: '🟤', color: 'muted' },
  harvested: { label: 'Harvested', glyph: '📦', color: 'primary' },
  preparing: { label: 'Preparing', glyph: '🚜', color: 'warn' },
};

/**
 * FieldCard — design variant **V3**: a **compact row** — glyph, name, an inline
 * muted area figure, and a glyph + text status flush right. No card chrome; a
 * hairline underline separates rows in a list. Same props as
 * {@link FieldCardProps}; only the layout differs. Token-only.
 */
export function FieldCardV3({
  name,
  area,
  areaUnit = 'ha',
  status = 'planted',
  icon = '🌾',
  onPress,
  style,
}: FieldCardV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = STATUS_META[status];

  const container: StyleProp<ViewStyle> = [
    {
      flexDirection: 'row',
      alignItems: 'center',
      gap: tokens.spacing.sm,
      paddingVertical: tokens.spacing.sm,
      paddingHorizontal: tokens.spacing.xs,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    style,
  ];

  const inner = (
    <>
      <Text style={{ fontSize: tokens.typography.scale.base }}>{icon}</Text>
      <Text numberOfLines={1} style={{ flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
        {name}
      </Text>
      {area != null ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
          {String(area)} {areaUnit}
        </Text>
      ) : null}
      <Text style={{ color: colors[meta.color], fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
        {meta.glyph} {meta.label}
      </Text>
    </>
  );

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${name}, ${meta.label}`}
        onPress={onPress}
        style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }, container]}
      >
        {inner}
      </Pressable>
    );
  }

  return <View style={container}>{inner}</View>;
}
