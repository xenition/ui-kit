import * as React from 'react';
import { Animated, Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Badge } from '../primitives';
import { shadow } from '../primitives/internal/elevation';
import { withAlpha } from '../primitives/internal/color';
import { usePressScale, useEnter } from '../primitives/internal/motion';
import type { FieldCardProps, FieldStatus } from './FieldCard';

/** Drop-in alternate of {@link FieldCardProps} — identical prop contract. */
export type FieldCardV2Props = FieldCardProps;

const STATUS_META: Record<
  FieldStatus,
  { label: string; glyph: string; tone: 'success' | 'neutral' | 'warn' | 'primary' }
> = {
  planted: { label: 'Planted', glyph: '🌱', tone: 'success' },
  fallow: { label: 'Fallow', glyph: '🟤', tone: 'neutral' },
  harvested: { label: 'Harvested', glyph: '📦', tone: 'primary' },
  preparing: { label: 'Preparing', glyph: '🚜', tone: 'warn' },
};

function StatCell({ label, value }: { label: string; value: string }): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  return (
    <View style={{ flex: 1, minWidth: 0 }}>
      <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{label}</Text>
      <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
        {value}
      </Text>
    </View>
  );
}

/**
 * FieldCard — design variant **V2**: an elevated card built around a prominent
 * **area block** (large figure + unit on a tinted panel) with a glyph + text
 * status badge, then a labeled crop / soil / location stat grid. Where V1 puts
 * area as a small subtitle, V2 makes it the hero. Same props as
 * {@link FieldCardProps}; only the layout differs. Token-only.
 */
export function FieldCardV2({
  name,
  area,
  areaUnit = 'ha',
  crop,
  soilType,
  location,
  status = 'planted',
  icon = '🌾',
  onPress,
  style,
}: FieldCardV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const press = usePressScale();
  const enter = useEnter({ translateY: 8 });
  const meta = STATUS_META[status];
  const cells: { label: string; value: string }[] = [];
  if (crop != null) cells.push({ label: 'Crop', value: crop });
  if (soilType != null) cells.push({ label: 'Soil', value: soilType });
  if (location != null) cells.push({ label: 'Location', value: location });

  const container: StyleProp<ViewStyle> = [
    {
      padding: tokens.spacing.md,
      borderRadius: tokens.radius.lg,
      borderWidth: 0,
      backgroundColor: colors.surface,
      ...shadow('md', tokens),
    },
    style,
  ];

  const inner = (
    <>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        <Text style={{ fontSize: tokens.typography.scale.xl }}>{icon}</Text>
        <Text numberOfLines={1} style={{ flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700', fontFamily: tokens.typography.fontHeading }}>
          {name}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          <Text style={{ fontSize: tokens.typography.scale.sm }}>{meta.glyph}</Text>
          <Badge tone={meta.tone} variant="soft" size="sm">
            {meta.label}
          </Badge>
        </View>
      </View>

      {area != null ? (
        <View
          style={{
            marginTop: tokens.spacing.md,
            padding: tokens.spacing.md,
            borderRadius: tokens.radius.md,
            backgroundColor: withAlpha(colors.accent, 0.1),
            flexDirection: 'row',
            alignItems: 'baseline',
            gap: tokens.spacing.xs,
          }}
        >
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale['3xl'], fontWeight: '800', fontFamily: tokens.typography.fontHeading }}>
            {String(area)}
          </Text>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>
            {areaUnit}
          </Text>
        </View>
      ) : null}

      {cells.length > 0 ? (
        <View style={{ flexDirection: 'row', gap: tokens.spacing.md, marginTop: tokens.spacing.md }}>
          {cells.map((c) => (
            <StatCell key={c.label} label={c.label} value={c.value} />
          ))}
        </View>
      ) : null}
    </>
  );

  if (onPress) {
    return (
      <Animated.View style={{ opacity: enter.opacity, transform: [...enter.transform, { scale: press.scale }] }}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`${name}, ${meta.label}`}
          onPress={onPress}
          onPressIn={press.onPressIn}
          onPressOut={press.onPressOut}
          style={container}
        >
          {inner}
        </Pressable>
      </Animated.View>
    );
  }

  return (
    <Animated.View style={[{ opacity: enter.opacity, transform: enter.transform }, container]}>
      {inner}
    </Animated.View>
  );
}
