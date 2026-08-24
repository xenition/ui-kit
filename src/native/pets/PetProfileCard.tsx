import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Avatar, Badge } from '../primitives';

export type PetSpecies = 'dog' | 'cat' | 'bird' | 'rabbit' | 'reptile' | 'fish' | 'other';
export type PetSex = 'male' | 'female' | 'unknown';

interface SpeciesMeta {
  glyph: string;
  label: string;
}

const SPECIES_META: Record<PetSpecies, SpeciesMeta> = {
  dog: { glyph: '🐕', label: 'Dog' },
  cat: { glyph: '🐈', label: 'Cat' },
  bird: { glyph: '🐦', label: 'Bird' },
  rabbit: { glyph: '🐇', label: 'Rabbit' },
  reptile: { glyph: '🦎', label: 'Reptile' },
  fish: { glyph: '🐠', label: 'Fish' },
  other: { glyph: '🐾', label: 'Pet' },
};

export interface PetProfileCardProps {
  /** Pet's name. */
  name: string;
  /** Species; drives the icon + fallback label. */
  species: PetSpecies;
  /** Breed, e.g. "Golden Retriever". */
  breed?: string;
  /** Age label already formatted, e.g. "3 yrs" or "8 mo". */
  age?: string;
  /** Biological sex. */
  sex?: PetSex;
  /** Weight label, e.g. "28 kg". */
  weight?: string;
  /** Photo URL for the avatar; falls back to initials/species. */
  photoUrl?: string;
  /** Whether the pet is spayed/neutered — shown as a success chip. */
  fixed?: boolean;
  /** Microchip id; shown truncated when present. */
  microchipId?: string;
  /** Loading placeholder state. */
  loading?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

const SEX_GLYPH: Record<PetSex, string> = { male: '♂', female: '♀', unknown: '•' };

/**
 * Header card for a single pet: avatar/photo, name, species + breed, and a strip
 * of key stats (age, sex, weight) plus optional spay/neuter and microchip chips.
 * Pressable when `onPress` is set. Renders a muted skeleton while `loading`.
 * Every color traces to a `SemanticColors` token — no literals.
 */
export function PetProfileCard({
  name,
  species,
  breed,
  age,
  sex,
  weight,
  photoUrl,
  fixed,
  microchipId,
  loading = false,
  onPress,
  style,
}: PetProfileCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = SPECIES_META[species];

  const container: StyleProp<ViewStyle> = [
    {
      backgroundColor: colors.surface,
      borderColor: colors.border,
      borderWidth: 1,
      borderRadius: tokens.radius.lg,
      padding: tokens.spacing.lg,
      gap: tokens.spacing.md,
    },
    style,
  ];

  if (loading) {
    return (
      <View accessibilityLabel="Loading pet profile" style={container}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
          <View style={{ width: 56, height: 56, borderRadius: tokens.radius.full, backgroundColor: colors.border }} />
          <View style={{ flex: 1, gap: tokens.spacing.xs }}>
            <View style={{ height: 14, width: '55%', borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
            <View style={{ height: 10, width: '40%', borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
          </View>
        </View>
      </View>
    );
  }

  const stats: Array<{ label: string; value: string }> = [];
  if (age) stats.push({ label: 'Age', value: age });
  if (sex) stats.push({ label: 'Sex', value: `${SEX_GLYPH[sex]} ${sex}` });
  if (weight) stats.push({ label: 'Weight', value: weight });

  const inner = (
    <View style={container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
        <Avatar src={photoUrl} name={name} size="lg" />
        <View style={{ flex: 1, gap: 2 }}>
          <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xl, fontWeight: '700' }}>
            {name}
          </Text>
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
            {meta.glyph} {breed ?? meta.label}
          </Text>
        </View>
      </View>

      {stats.length > 0 ? (
        <View style={{ flexDirection: 'row', gap: tokens.spacing.xl }}>
          {stats.map((s) => (
            <View key={s.label} style={{ gap: 2 }}>
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{s.label}</Text>
              <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>
                {s.value}
              </Text>
            </View>
          ))}
        </View>
      ) : null}

      {fixed || microchipId ? (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs }}>
          {fixed ? (
            <Badge tone="success" variant="soft" size="sm">
              ✓ Spayed / neutered
            </Badge>
          ) : null}
          {microchipId ? (
            <Badge tone="primary" variant="soft" size="sm">
              {`Chip …${microchipId.slice(-6)}`}
            </Badge>
          ) : null}
        </View>
      ) : null}
    </View>
  );

  const a11y = `${name}, ${breed ?? meta.label}${age ? `, ${age}` : ''}`;
  if (!onPress) {
    return <View accessibilityLabel={a11y}>{inner}</View>;
  }
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={a11y}
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
    >
      {inner}
    </Pressable>
  );
}
