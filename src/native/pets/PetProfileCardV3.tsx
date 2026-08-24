import * as React from 'react';
import { Animated, Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Avatar, Icon } from '../primitives';
import { usePressScale } from '../primitives/internal/motion';
import type { PetProfileCardProps, PetSex, PetSpecies } from './PetProfileCard';

/** Drop-in alternate design for {@link PetProfileCard} — identical props. */
export type PetProfileCardV3Props = PetProfileCardProps;

const SPECIES_META: Record<PetSpecies, { glyph: string; label: string }> = {
  dog: { glyph: '🐕', label: 'Dog' },
  cat: { glyph: '🐈', label: 'Cat' },
  bird: { glyph: '🐦', label: 'Bird' },
  rabbit: { glyph: '🐇', label: 'Rabbit' },
  reptile: { glyph: '🦎', label: 'Reptile' },
  fish: { glyph: '🐠', label: 'Fish' },
  other: { glyph: '🐾', label: 'Pet' },
};

const SEX_GLYPH: Record<PetSex, string> = { male: '♂', female: '♀', unknown: '•' };

/**
 * Compact single-row profile — a dense list-friendly alternate to
 * {@link PetProfileCard}. A small avatar, a two-line name/breed block, and a
 * trailing meta value (age / weight) sit on one hairline-separated row; the
 * spay/neuter state reads as a trailing check glyph + label, never color alone.
 * Same `PetProfileCardProps`. Token-pure.
 */
export function PetProfileCardV3({
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
}: PetProfileCardV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const press = usePressScale();
  const meta = SPECIES_META[species];

  const row: StyleProp<ViewStyle> = [
    {
      flexDirection: 'row',
      alignItems: 'center',
      gap: tokens.spacing.md,
      paddingVertical: tokens.spacing.sm,
      paddingHorizontal: tokens.spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      backgroundColor: colors.surface,
    },
    style,
  ];

  if (loading) {
    return (
      <View accessibilityLabel="Loading pet profile" style={row}>
        <View style={{ width: 40, height: 40, borderRadius: tokens.radius.full, backgroundColor: colors.border }} />
        <View style={{ flex: 1, gap: tokens.spacing.xs }}>
          <View style={{ height: 12, width: '50%', borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
          <View style={{ height: 9, width: '35%', borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
        </View>
      </View>
    );
  }

  const trailing = age ?? weight;
  const subtitle = [breed ?? meta.label, sex ? `${SEX_GLYPH[sex]} ${sex}` : null].filter(Boolean).join(' · ');
  const a11y = `${name}, ${breed ?? meta.label}${age ? `, ${age}` : ''}${fixed ? ', spayed or neutered' : ''}`;

  const inner = (
    <View style={row}>
      <Avatar src={photoUrl} name={name} size="md" />
      <View style={{ flex: 1, gap: 2 }}>
        <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>
          {name}
        </Text>
        <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
          {meta.glyph} {subtitle}
          {microchipId ? ` · chip …${microchipId.slice(-4)}` : ''}
        </Text>
      </View>
      <View style={{ alignItems: 'flex-end', gap: 2 }}>
        {trailing ? (
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>{trailing}</Text>
        ) : null}
        {fixed ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
            <Icon glyph="✓" size="xs" color="successText" />
            <Text style={{ color: colors.successText, fontSize: tokens.typography.scale.xs }}>Fixed</Text>
          </View>
        ) : null}
      </View>
    </View>
  );

  if (!onPress) {
    return <View accessibilityLabel={a11y}>{inner}</View>;
  }
  return (
    <Animated.View style={{ transform: [{ scale: press.scale }] }}>
      <Pressable accessibilityRole="button" accessibilityLabel={a11y} onPress={onPress} onPressIn={press.onPressIn} onPressOut={press.onPressOut}>
        {inner}
      </Pressable>
    </Animated.View>
  );
}
