import * as React from 'react';
import { Animated, Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Badge } from '../primitives';
import { shadow } from '../primitives/internal/elevation';
import { withAlpha } from '../primitives/internal/color';
import { usePressScale, useEnter } from '../primitives/internal/motion';
import type { CropCardProps, GrowthStage, CropHealth } from './CropCard';

/** Drop-in alternate of {@link CropCardProps} — identical prop contract. */
export type CropCardV2Props = CropCardProps;

const STAGE_META: Record<
  GrowthStage,
  { label: string; glyph: string; color: keyof SemanticColors }
> = {
  seeding: { label: 'Seeding', glyph: '🌱', color: 'muted' },
  growing: { label: 'Growing', glyph: '🌿', color: 'primary' },
  flowering: { label: 'Flowering', glyph: '🌸', color: 'accent' },
  mature: { label: 'Mature', glyph: '🌾', color: 'success' },
  harvested: { label: 'Harvested', glyph: '📦', color: 'muted' },
};

const HEALTH_META: Record<
  CropHealth,
  { label: string; mark: string; color: keyof SemanticColors; tone: 'success' | 'warn' | 'danger' }
> = {
  healthy: { label: 'Healthy', mark: '✓', color: 'success', tone: 'success' },
  stressed: { label: 'Stressed', mark: '!', color: 'warn', tone: 'warn' },
  critical: { label: 'Critical', mark: '⚠', color: 'danger', tone: 'danger' },
};

/**
 * CropCard — design variant **V2**: an elevated card led by a large tinted
 * **glyph tile**, with a segmented **maturity ring** dial (percentage centered)
 * and a color-independent health line (mark + text). Where V1 is a bordered row
 * with an inline progress bar, V2 is a floating, tile-and-dial hero. Same props
 * as {@link CropCardProps}; only the layout differs. Token-only.
 */
export function CropCardV2({
  name,
  variety,
  icon,
  stage = 'growing',
  health,
  progress,
  fieldLabel,
  harvestLabel,
  loading = false,
  onPress,
  style,
}: CropCardV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const press = usePressScale();
  const enter = useEnter({ translateY: 8 });
  const stageMeta = STAGE_META[stage];
  const glyph = icon ?? stageMeta.glyph;
  const healthMeta = health ? HEALTH_META[health] : null;
  const ringColor = healthMeta ? colors[healthMeta.color] : colors.primary;
  const clamped =
    typeof progress === 'number' ? Math.max(0, Math.min(100, progress)) : undefined;

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

  if (loading) {
    return (
      <View accessibilityLabel="Loading crop" style={container}>
        <View style={{ height: tokens.typography.scale.lg, width: '55%', borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
        <View style={{ marginTop: tokens.spacing.sm, height: tokens.typography.scale.sm, width: '35%', borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
      </View>
    );
  }

  const ringSize = 60;
  const ringBorder = 6;
  const seg = (threshold: number): string =>
    clamped != null && clamped >= threshold ? ringColor : colors.border;

  const inner = (
    <>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
        <View
          style={{
            width: 56,
            height: 56,
            borderRadius: tokens.radius.md,
            backgroundColor: withAlpha(colors.primary, 0.1),
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ fontSize: tokens.typography.scale['2xl'] }}>{glyph}</Text>
        </View>
        <View style={{ flex: 1, minWidth: 0 }}>
          <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700', fontFamily: tokens.typography.fontHeading }}>
            {name}
          </Text>
          {variety != null ? (
            <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
              {variety}
            </Text>
          ) : null}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, marginTop: tokens.spacing.xs }}>
            <Text style={{ fontSize: tokens.typography.scale.sm }}>{stageMeta.glyph}</Text>
            <Text style={{ color: colors[stageMeta.color], fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
              {stageMeta.label}
            </Text>
          </View>
        </View>

        {clamped != null ? (
          <View style={{ width: ringSize, height: ringSize, alignItems: 'center', justifyContent: 'center' }}>
            <View
              style={{
                position: 'absolute',
                width: ringSize,
                height: ringSize,
                borderRadius: tokens.radius.full,
                borderWidth: ringBorder,
                borderTopColor: seg(1),
                borderRightColor: seg(26),
                borderBottomColor: seg(51),
                borderLeftColor: seg(76),
                transform: [{ rotate: '45deg' }],
              }}
            />
            <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
              {clamped}%
            </Text>
          </View>
        ) : null}
      </View>

      {healthMeta ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, marginTop: tokens.spacing.md }}>
          <Text style={{ color: colors[healthMeta.color], fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
            {healthMeta.mark}
          </Text>
          <Badge tone={healthMeta.tone} variant="soft" size="sm">
            {healthMeta.label}
          </Badge>
        </View>
      ) : null}

      {fieldLabel != null || harvestLabel != null ? (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.md, marginTop: tokens.spacing.md }}>
          {fieldLabel != null ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>📍 {fieldLabel}</Text>
          ) : null}
          {harvestLabel != null ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>🗓️ {harvestLabel}</Text>
          ) : null}
        </View>
      ) : null}
    </>
  );

  if (onPress) {
    return (
      <Animated.View style={{ opacity: enter.opacity, transform: [...enter.transform, { scale: press.scale }] }}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`${name}${variety ? `, ${variety}` : ''}, ${stageMeta.label}`}
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
