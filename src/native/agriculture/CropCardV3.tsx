import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import type { CropCardProps, GrowthStage, CropHealth } from './CropCard';

/** Drop-in alternate of {@link CropCardProps} — identical prop contract. */
export type CropCardV3Props = CropCardProps;

const STAGE_GLYPH: Record<GrowthStage, { glyph: string; label: string; color: keyof SemanticColors }> = {
  seeding: { glyph: '🌱', label: 'Seeding', color: 'muted' },
  growing: { glyph: '🌿', label: 'Growing', color: 'primary' },
  flowering: { glyph: '🌸', label: 'Flowering', color: 'accent' },
  mature: { glyph: '🌾', label: 'Mature', color: 'success' },
  harvested: { glyph: '📦', label: 'Harvested', color: 'muted' },
};

const HEALTH_GLYPH: Record<CropHealth, { mark: string; label: string; color: keyof SemanticColors }> = {
  healthy: { mark: '✓', label: 'Healthy', color: 'success' },
  stressed: { mark: '!', label: 'Stressed', color: 'warn' },
  critical: { mark: '⚠', label: 'Critical', color: 'danger' },
};

/**
 * CropCard — design variant **V3**: a **dense single line** — leading stage
 * glyph, name · variety, a stage word, a color-independent health mark, and the
 * maturity percentage flush right. No card chrome; separation comes from a
 * hairline underline. Same props as {@link CropCardProps}; only the layout
 * differs. Token-only.
 */
export function CropCardV3({
  name,
  variety,
  icon,
  stage = 'growing',
  health,
  progress,
  loading = false,
  onPress,
  style,
}: CropCardV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const stageMeta = STAGE_GLYPH[stage];
  const glyph = icon ?? stageMeta.glyph;
  const healthMeta = health ? HEALTH_GLYPH[health] : null;
  const clamped =
    typeof progress === 'number' ? Math.max(0, Math.min(100, progress)) : undefined;

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

  if (loading) {
    return (
      <View accessibilityLabel="Loading crop" style={container}>
        <View style={{ height: tokens.typography.scale.sm, width: '50%', borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
      </View>
    );
  }

  const inner = (
    <>
      <Text style={{ fontSize: tokens.typography.scale.base }}>{glyph}</Text>
      <View style={{ flex: 1, minWidth: 0 }}>
        <Text numberOfLines={1} style={{ fontSize: tokens.typography.scale.sm }}>
          <Text style={{ color: colors.onSurface, fontWeight: '700' }}>{name}</Text>
          {variety != null ? <Text style={{ color: colors.muted }}> · {variety}</Text> : null}
        </Text>
      </View>
      <Text style={{ color: colors[stageMeta.color], fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
        {stageMeta.label}
      </Text>
      {healthMeta ? (
        <Text style={{ color: colors[healthMeta.color], fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>
          {healthMeta.mark} {healthMeta.label}
        </Text>
      ) : null}
      {clamped != null ? (
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700', fontFamily: tokens.typography.fontHeading }}>
          {clamped}%
        </Text>
      ) : null}
    </>
  );

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${name}${variety ? `, ${variety}` : ''}, ${stageMeta.label}`}
        onPress={onPress}
        style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }, container]}
      >
        {inner}
      </Pressable>
    );
  }

  return <View style={container}>{inner}</View>;
}
