import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Avatar } from '../primitives';
import {
  companionGradient,
  companionInk,
  companionInkSoft,
  companionTile,
  companionBorder,
} from './internal/companion';
import { GradientSurface } from './internal/GradientSurface';
import type { PetProfileCardProps, PetSpecies, PetSex } from './PetProfileCard';

/** Drop-in for {@link PetProfileCardProps} — same props, the V4 "companion" design. */
export type PetProfileCardV4Props = PetProfileCardProps;

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

const SEX_GLYPH: Record<PetSex, string> = { male: '♂', female: '♀', unknown: '•' };

const absoluteFill = { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 } as const;

/**
 * PetProfileCard — **V4** "companion" profile hero (native twin of the web V4).
 * This is the pets line's ONE reserved gradient moment: the pet header sits on
 * the brand gradient ground (`companionGradient`) drawn as an absolute-fill
 * `GradientSurface` inside a rounded, overflow-hidden container, with near-white
 * `companionInk`/`companionInkSoft` text, a frosted-ring avatar, an
 * age/sex/weight strip rendered as frosted glass tiles (`companionTile` +
 * `companionBorder`), and spay/microchip facts as frosted chips (never color
 * alone — each carries a glyph + label). Same props/behavior as
 * {@link PetProfileCardProps}; `species` drives the glyph + fallback label.
 * `loading` renders a frosted skeleton on the gradient. Token-only colors via
 * `useXenitionTheme()` + the companion ramp helpers; the whole card is pressable
 * when `onPress` is set.
 */
export function PetProfileCardV4({
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
}: PetProfileCardV4Props): React.ReactElement {
  const { tokens } = useXenitionTheme();
  const r = tokens.ramps;
  const ink = companionInk(r);
  const inkSoft = companionInkSoft(r);
  const tile = companionTile(r);
  const border = companionBorder(r);
  const meta = SPECIES_META[species];

  const container: StyleProp<ViewStyle> = [
    {
      borderRadius: tokens.radius.lg,
      overflow: 'hidden',
      padding: tokens.spacing.lg,
      gap: tokens.spacing.md,
    },
    style,
  ];

  const Ground = (): React.ReactElement => (
    <GradientSurface colors={companionGradient(r)} style={{ ...absoluteFill }} />
  );

  if (loading) {
    return (
      <View accessibilityLabel="Loading pet profile" style={container}>
        <Ground />
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
          <View style={{ width: 56, height: 56, borderRadius: tokens.radius.full, backgroundColor: tile }} />
          <View style={{ flex: 1, gap: tokens.spacing.xs }}>
            <View style={{ height: 14, width: '55%', borderRadius: tokens.radius.sm, backgroundColor: tile }} />
            <View style={{ height: 10, width: '40%', borderRadius: tokens.radius.sm, backgroundColor: tile }} />
          </View>
        </View>
      </View>
    );
  }

  const stats: Array<{ label: string; value: string }> = [];
  if (age) stats.push({ label: 'Age', value: age });
  if (sex) stats.push({ label: 'Sex', value: `${SEX_GLYPH[sex]} ${sex}` });
  if (weight) stats.push({ label: 'Weight', value: weight });

  const chips: Array<{ glyph: string; label: string }> = [];
  if (fixed) chips.push({ glyph: '✓', label: 'Spayed / neutered' });
  if (microchipId) chips.push({ glyph: '🔖', label: `Chip …${microchipId.slice(-6)}` });

  const inner = (
    <View style={container}>
      <Ground />

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
        {/* Frosted ring around the avatar/photo. */}
        <View
          style={{
            borderRadius: tokens.radius.full,
            borderWidth: 2,
            borderColor: border,
            padding: 2,
          }}
        >
          <Avatar src={photoUrl} name={name} size="lg" />
        </View>
        <View style={{ flex: 1, gap: 2 }}>
          <Text
            accessibilityRole="header"
            numberOfLines={1}
            style={{ color: ink, fontSize: tokens.typography.scale.xl, fontWeight: '700' }}
          >
            {name}
          </Text>
          <Text numberOfLines={1} style={{ color: inkSoft, fontSize: tokens.typography.scale.sm }}>
            {meta.glyph} {breed ?? meta.label}
          </Text>
        </View>
      </View>

      {stats.length > 0 ? (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }}>
          {stats.map((s) => (
            <View
              key={s.label}
              style={{
                minWidth: 64,
                gap: 2,
                paddingHorizontal: tokens.spacing.md,
                paddingVertical: tokens.spacing.sm,
                borderRadius: tokens.radius.md,
                backgroundColor: tile,
                borderWidth: 1,
                borderColor: border,
              }}
            >
              <Text style={{ color: inkSoft, fontSize: tokens.typography.scale.xs }}>{s.label}</Text>
              <Text style={{ color: ink, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>{s.value}</Text>
            </View>
          ))}
        </View>
      ) : null}

      {chips.length > 0 ? (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs }}>
          {chips.map((c) => (
            <View
              key={c.label}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.xs,
                paddingHorizontal: tokens.spacing.sm,
                paddingVertical: 4,
                borderRadius: tokens.radius.full,
                backgroundColor: tile,
                borderWidth: 1,
                borderColor: border,
              }}
            >
              <Text allowFontScaling={false} style={{ color: ink, fontSize: tokens.typography.scale.xs }}>
                {c.glyph}
              </Text>
              <Text style={{ color: ink, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>{c.label}</Text>
            </View>
          ))}
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
      style={({ pressed }) => ({ opacity: pressed ? 0.9 : 1 })}
    >
      {inner}
    </Pressable>
  );
}
