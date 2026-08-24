import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Card, Icon, Badge, Progress } from '../primitives';

/** Growth phase of a planting. Drives the stage chip + default glyph. */
export type GrowthStage = 'seeding' | 'growing' | 'flowering' | 'mature' | 'harvested';
/** Plant health — colors the health value and pairs with a text chip. */
export type CropHealth = 'healthy' | 'stressed' | 'critical';
/** Visual density. `detailed` shows the maturity bar + meta; `compact` is a slim row. */
export type CropCardVariant = 'detailed' | 'compact';

export interface CropCardProps {
  /** Crop / planting name (e.g. "Winter Wheat"). */
  name: string;
  /** Cultivar / variety line (e.g. "Skyfall"). */
  variety?: string;
  /** Leading glyph/emoji. Defaults to a stage-appropriate glyph. */
  icon?: string;
  /** Growth phase. Default `'growing'`. */
  stage?: GrowthStage;
  /** Plant health — colors the health label and shows a text status chip. */
  health?: CropHealth;
  /** Maturity progress 0–100 (rendered as a bar in `detailed`). Guarded/clamped. */
  progress?: number;
  /** Field / plot the crop sits in (e.g. "North 40"). */
  fieldLabel?: string;
  /** Days-to-harvest or ready hint (e.g. "42 days to harvest"). */
  harvestLabel?: string;
  /** Density variant. Default `'detailed'`. */
  variant?: CropCardVariant;
  /** Show a muted placeholder while data loads. */
  loading?: boolean;
  /** Fires when the card is tapped (opens the planting). */
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

const STAGE_META: Record<
  GrowthStage,
  { label: string; glyph: string; tone: 'neutral' | 'primary' | 'success' | 'accent' }
> = {
  seeding: { label: 'Seeding', glyph: '🌱', tone: 'neutral' },
  growing: { label: 'Growing', glyph: '🌿', tone: 'primary' },
  flowering: { label: 'Flowering', glyph: '🌸', tone: 'accent' },
  mature: { label: 'Mature', glyph: '🌾', tone: 'success' },
  harvested: { label: 'Harvested', glyph: '📦', tone: 'neutral' },
};

const HEALTH_META: Record<
  CropHealth,
  { label: string; color: keyof SemanticColors; tone: 'success' | 'warn' | 'danger' }
> = {
  healthy: { label: 'Healthy', color: 'success', tone: 'success' },
  stressed: { label: 'Stressed', color: 'warn', tone: 'warn' },
  critical: { label: 'Critical', color: 'danger', tone: 'danger' },
};

/**
 * A single crop / planting summary — glyph, name + variety, a growth-stage
 * {@link Badge}, an optional health chip (color is always paired with a text
 * label so an at-risk crop reads without color), and, in the `detailed`
 * variant, a maturity {@link Progress} bar plus field / harvest meta. Tapping
 * fires `onPress` (exposed as an accessible button); `loading` renders a muted
 * placeholder. Token-bound throughout — no literal colors.
 */
export function CropCard({
  name,
  variety,
  icon,
  stage = 'growing',
  health,
  progress,
  fieldLabel,
  harvestLabel,
  variant = 'detailed',
  loading = false,
  onPress,
  style,
}: CropCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const stageMeta = STAGE_META[stage];
  const glyph = icon ?? stageMeta.glyph;
  const healthMeta = health ? HEALTH_META[health] : null;
  const detailed = variant === 'detailed';
  const clampedProgress =
    typeof progress === 'number' ? Math.max(0, Math.min(100, progress)) : undefined;

  if (loading) {
    return (
      <Card variant="outlined" style={style}>
        <View style={{ height: tokens.typography.scale.base, backgroundColor: colors.border, borderRadius: tokens.radius.sm, width: '60%' }} />
        <View style={{ height: tokens.typography.scale.sm, backgroundColor: colors.border, borderRadius: tokens.radius.sm, width: '40%', marginTop: tokens.spacing.sm }} />
      </Card>
    );
  }

  const Body = (
    <Card variant={onPress ? 'interactive' : 'outlined'} style={style}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        <Icon glyph={glyph} size={detailed ? '2xl' : 'xl'} color="primary" />
        <View style={{ flex: 1 }}>
          <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700', fontFamily: tokens.typography.fontHeading }}>
            {name}
          </Text>
          {variety != null ? (
            <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
              {variety}
            </Text>
          ) : null}
        </View>
        <View style={{ alignItems: 'flex-end', gap: 4 }}>
          <Badge tone={stageMeta.tone} variant="soft" size="sm">
            {stageMeta.label}
          </Badge>
          {healthMeta ? (
            <Badge tone={healthMeta.tone} variant="soft" size="sm">
              {healthMeta.label}
            </Badge>
          ) : null}
        </View>
      </View>

      {detailed && clampedProgress != null ? (
        <View style={{ marginTop: tokens.spacing.md }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>Maturity</Text>
            <Text style={{ color: healthMeta ? colors[healthMeta.color] : colors.onSurface, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
              {clampedProgress}%
            </Text>
          </View>
          <Progress value={clampedProgress} tone={healthMeta ? healthMeta.tone : 'primary'} />
        </View>
      ) : null}

      {detailed && (fieldLabel != null || harvestLabel != null) ? (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.md, marginTop: tokens.spacing.md }}>
          {fieldLabel != null ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>📍 {fieldLabel}</Text>
          ) : null}
          {harvestLabel != null ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>🗓️ {harvestLabel}</Text>
          ) : null}
        </View>
      ) : null}
    </Card>
  );

  if (!onPress) return Body;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${name}${variety ? `, ${variety}` : ''}, ${stageMeta.label}`}
      onPress={onPress}
      style={({ pressed }) => [{ opacity: pressed ? 0.85 : 1 }]}
    >
      {Body}
    </Pressable>
  );
}
