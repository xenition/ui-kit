import * as React from 'react';
import { Animated, Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Avatar, Badge, Icon } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import { shadow } from '../primitives/internal/elevation';
import { useEnter, usePressScale } from '../primitives/internal/motion';
import type { PetProfileCardProps, PetSex, PetSpecies } from './PetProfileCard';

/** Drop-in alternate design for {@link PetProfileCard} — identical props. */
export type PetProfileCardV2Props = PetProfileCardProps;

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
 * Banner-and-overlapping-avatar profile card — a visually distinct alternate to
 * {@link PetProfileCard}. A soft primary-tinted banner sits behind an avatar
 * that overlaps its lower edge (with a surface ring), the name/breed centered
 * below, and the key stats presented as filled chips rather than a bare strip.
 * Same `PetProfileCardProps`; elevated + enter/press motion. Token-pure.
 */
export function PetProfileCardV2({
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
}: PetProfileCardV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const enter = useEnter();
  const press = usePressScale();
  const meta = SPECIES_META[species];

  const container: StyleProp<ViewStyle> = [
    {
      backgroundColor: colors.surface,
      borderRadius: tokens.radius.lg,
      overflow: 'hidden',
      ...shadow('md', tokens),
    },
    style,
  ];

  if (loading) {
    return (
      <View accessibilityLabel="Loading pet profile" style={container}>
        <View style={{ height: 60, backgroundColor: withAlpha(colors.primary, 0.1) }} />
        <View style={{ alignItems: 'center', marginTop: -30, gap: tokens.spacing.sm, paddingBottom: tokens.spacing.lg }}>
          <View
            style={{
              width: 72,
              height: 72,
              borderRadius: tokens.radius.full,
              backgroundColor: colors.border,
              borderWidth: 3,
              borderColor: colors.surface,
            }}
          />
          <View style={{ height: 14, width: '45%', borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
          <View style={{ height: 10, width: '30%', borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
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
      <View style={{ height: 60, backgroundColor: withAlpha(colors.primary, 0.12) }}>
        <Icon
          glyph={meta.glyph}
          size="2xl"
          style={{ position: 'absolute', right: tokens.spacing.md, top: tokens.spacing.sm, opacity: 0.5 }}
        />
      </View>

      <View style={{ alignItems: 'center', marginTop: -30, paddingHorizontal: tokens.spacing.lg, paddingBottom: tokens.spacing.lg, gap: tokens.spacing.xs }}>
        <View style={{ borderRadius: tokens.radius.full, borderWidth: 3, borderColor: colors.surface }}>
          <Avatar src={photoUrl} name={name} size="xl" />
        </View>
        <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xl, fontWeight: '700' }}>
          {name}
        </Text>
        <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
          {meta.glyph} {breed ?? meta.label}
        </Text>

        {stats.length > 0 ? (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: tokens.spacing.sm, marginTop: tokens.spacing.xs }}>
            {stats.map((s) => (
              <View
                key={s.label}
                style={{
                  alignItems: 'center',
                  gap: 2,
                  minWidth: 64,
                  paddingVertical: tokens.spacing.sm,
                  paddingHorizontal: tokens.spacing.md,
                  borderRadius: tokens.radius.md,
                  backgroundColor: tokens.ramps.neutral[100] ?? colors.surface,
                }}
              >
                <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{s.label}</Text>
                <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>{s.value}</Text>
              </View>
            ))}
          </View>
        ) : null}

        {fixed || microchipId ? (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: tokens.spacing.xs, marginTop: tokens.spacing.xs }}>
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
    </View>
  );

  const a11y = `${name}, ${breed ?? meta.label}${age ? `, ${age}` : ''}`;

  if (!onPress) {
    return (
      <Animated.View accessibilityLabel={a11y} style={{ opacity: enter.opacity, transform: enter.transform }}>
        {inner}
      </Animated.View>
    );
  }
  return (
    <Animated.View style={{ opacity: enter.opacity, transform: [...enter.transform, { scale: press.scale }] }}>
      <Pressable accessibilityRole="button" accessibilityLabel={a11y} onPress={onPress} onPressIn={press.onPressIn} onPressOut={press.onPressOut}>
        {inner}
      </Pressable>
    </Animated.View>
  );
}
