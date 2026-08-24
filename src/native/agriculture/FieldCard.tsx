import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Card, Icon, Badge } from '../primitives';

/** Cultivation state of a field/parcel. Drives the status chip. */
export type FieldStatus = 'planted' | 'fallow' | 'harvested' | 'preparing';
/** Visual density. */
export type FieldCardVariant = 'detailed' | 'compact';

export interface FieldCardProps {
  /** Field / parcel name (e.g. "North 40"). */
  name: string;
  /** Area magnitude (e.g. `12.5`). Rendered with `areaUnit`. */
  area?: number | string;
  /** Area unit suffix. Default `'ha'`. */
  areaUnit?: string;
  /** Crop currently on the field (e.g. "Maize"). */
  crop?: string;
  /** Soil type / classification (e.g. "Clay loam"). */
  soilType?: string;
  /** Location / GPS hint (e.g. "Sector B"). */
  location?: string;
  /** Cultivation status. Default `'planted'`. */
  status?: FieldStatus;
  /** Leading glyph/emoji. Default `'🌾'`. */
  icon?: string;
  /** Density variant. Default `'detailed'`. */
  variant?: FieldCardVariant;
  /** Fires when the card is tapped. */
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

const STATUS_META: Record<
  FieldStatus,
  { label: string; tone: 'success' | 'neutral' | 'warn' | 'primary' }
> = {
  planted: { label: 'Planted', tone: 'success' },
  fallow: { label: 'Fallow', tone: 'neutral' },
  harvested: { label: 'Harvested', tone: 'primary' },
  preparing: { label: 'Preparing', tone: 'warn' },
};

function Meta({ glyph, text, color }: { glyph: string; text: string; color: keyof SemanticColors }): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  return (
    <Text style={{ color: colors[color], fontSize: tokens.typography.scale.xs }}>
      {glyph} {text}
    </Text>
  );
}

/**
 * A field / parcel summary card — glyph, name, an area figure, and a cultivation
 * {@link Badge} whose text label (not color alone) carries the status. The
 * `detailed` variant adds crop / soil / location meta rows; `compact` keeps just
 * the header. Tappable via `onPress` (exposed as an accessible button).
 * Token-bound throughout — no literal colors.
 */
export function FieldCard({
  name,
  area,
  areaUnit = 'ha',
  crop,
  soilType,
  location,
  status = 'planted',
  icon = '🌾',
  variant = 'detailed',
  onPress,
  style,
}: FieldCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = STATUS_META[status];
  const detailed = variant === 'detailed';

  const Body = (
    <Card variant={onPress ? 'interactive' : 'outlined'} style={style}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        <Icon glyph={icon} size="xl" color="accent" />
        <View style={{ flex: 1 }}>
          <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700', fontFamily: tokens.typography.fontHeading }}>
            {name}
          </Text>
          {area != null ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
              {String(area)} {areaUnit}
            </Text>
          ) : null}
        </View>
        <Badge tone={meta.tone} variant="soft" size="sm">
          {meta.label}
        </Badge>
      </View>

      {detailed ? (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.md, marginTop: tokens.spacing.md }}>
          {crop != null ? <Meta glyph="🌱" text={crop} color="onSurface" /> : null}
          {soilType != null ? <Meta glyph="🪨" text={soilType} color="muted" /> : null}
          {location != null ? <Meta glyph="📍" text={location} color="muted" /> : null}
        </View>
      ) : null}
    </Card>
  );

  if (!onPress) return Body;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${name}, ${meta.label}`}
      onPress={onPress}
      style={({ pressed }) => [{ opacity: pressed ? 0.85 : 1 }]}
    >
      {Body}
    </Pressable>
  );
}
