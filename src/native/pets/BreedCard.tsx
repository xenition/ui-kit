import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Badge } from '../primitives';

export type BreedSize = 'toy' | 'small' | 'medium' | 'large' | 'giant';
export type BreedEnergy = 'low' | 'moderate' | 'high';

const SIZE_LABEL: Record<BreedSize, string> = {
  toy: 'Toy',
  small: 'Small',
  medium: 'Medium',
  large: 'Large',
  giant: 'Giant',
};

const ENERGY_META: Record<BreedEnergy, { label: string; dots: number; slot: keyof SemanticColors }> = {
  low: { label: 'Low energy', dots: 1, slot: 'success' },
  moderate: { label: 'Moderate energy', dots: 2, slot: 'warn' },
  high: { label: 'High energy', dots: 3, slot: 'danger' },
};

export interface BreedCardProps {
  /** Breed name, e.g. "Border Collie". */
  name: string;
  /** Species label, e.g. "Dog". */
  species?: string;
  /** Photo URL rendered as a banner; a glyph placeholder shows otherwise. */
  photoUrl?: string;
  /** Emoji placeholder when there's no photo. */
  glyph?: string;
  /** Size class. */
  size?: BreedSize;
  /** Typical energy level; rendered as labelled dots. */
  energy?: BreedEnergy;
  /** Typical lifespan label, e.g. "12–15 yrs". */
  lifespan?: string;
  /** Short list of temperament traits. */
  traits?: string[];
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A breed reference card: banner (photo or emoji placeholder), name + species,
 * a stat row (size class, lifespan), a labelled energy meter, and temperament
 * trait chips. Pressable when `onPress` is set. The energy level is conveyed by
 * both dots and a text label. Token-only colors; a `View` placeholder stands in
 * for a real breed photo.
 */
export function BreedCard({
  name,
  species,
  photoUrl,
  glyph = '🐾',
  size,
  energy,
  lifespan,
  traits,
  onPress,
  style,
}: BreedCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const energyMeta = energy ? ENERGY_META[energy] : undefined;
  const safeTraits = traits ?? [];

  const inner = (
    <View
      style={[
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: tokens.radius.lg,
          overflow: 'hidden',
        },
        style,
      ]}
    >
      <View
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        style={{
          height: 96,
          backgroundColor: colors.border,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {!photoUrl ? (
          <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale['3xl'] }}>
            {glyph}
          </Text>
        ) : null}
      </View>

      <View style={{ padding: tokens.spacing.lg, gap: tokens.spacing.sm }}>
        <View style={{ gap: 2 }}>
          <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}>
            {name}
          </Text>
          {species ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{species}</Text>
          ) : null}
        </View>

        {size || lifespan ? (
          <View style={{ flexDirection: 'row', gap: tokens.spacing.xl }}>
            {size ? (
              <View style={{ gap: 2 }}>
                <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>Size</Text>
                <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
                  {SIZE_LABEL[size]}
                </Text>
              </View>
            ) : null}
            {lifespan ? (
              <View style={{ gap: 2 }}>
                <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>Lifespan</Text>
                <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
                  {lifespan}
                </Text>
              </View>
            ) : null}
          </View>
        ) : null}

        {energyMeta ? (
          <View
            accessibilityLabel={energyMeta.label}
            style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}
          >
            {[0, 1, 2].map((i) => (
              <View
                key={i}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: tokens.radius.full,
                  backgroundColor: i < energyMeta.dots ? colors[energyMeta.slot] : colors.border,
                }}
              />
            ))}
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{energyMeta.label}</Text>
          </View>
        ) : null}

        {safeTraits.length > 0 ? (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs }}>
            {safeTraits.slice(0, 5).map((t, i) => (
              <Badge key={i} tone="accent" variant="soft" size="sm">
                {t}
              </Badge>
            ))}
          </View>
        ) : null}
      </View>
    </View>
  );

  const a11y = `${name}${species ? `, ${species}` : ''}${size ? `, ${SIZE_LABEL[size]}` : ''}`;
  if (!onPress) {
    return <View accessibilityLabel={a11y}>{inner}</View>;
  }
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={a11y} onPress={onPress} style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}>
      {inner}
    </Pressable>
  );
}
