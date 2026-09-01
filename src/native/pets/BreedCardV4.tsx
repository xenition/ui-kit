import * as React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Badge } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import type { BreedCardProps, BreedSize, BreedEnergy } from './BreedCard';

/** V4 layout choices for the "companion" design. */
export type BreedCardLayout = 'card' | 'compact';

/** Drop-in for {@link BreedCardProps} — same props, the V4 "companion" design. */
export interface BreedCardV4Props extends BreedCardProps {
  /** V4 layout: `card` (default) or `compact` (dense single row). */
  variant?: BreedCardLayout;
}

const SIZE_META: Record<BreedSize, { glyph: string; label: string }> = {
  toy: { glyph: '🐁', label: 'Toy' },
  small: { glyph: '🐇', label: 'Small' },
  medium: { glyph: '🐕', label: 'Medium' },
  large: { glyph: '🐎', label: 'Large' },
  giant: { glyph: '🐘', label: 'Giant' },
};

const ENERGY_META: Record<BreedEnergy, { glyph: string; label: string; tone: 'success' | 'warn' | 'danger' }> = {
  low: { glyph: '🌙', label: 'Low energy', tone: 'success' },
  moderate: { glyph: '⚡', label: 'Moderate energy', tone: 'warn' },
  high: { glyph: '🔥', label: 'High energy', tone: 'danger' },
};

/**
 * BreedCard — **V4** "companion" design (native parity of the web V4). The warm,
 * friendly take on a breed reference card: an elevated rounded card with a soft
 * shadow (no gradient — a clean surface), the breed photo/glyph in a soft-primary
 * tinted well, a bold breed name, a muted species line, size + energy shown as
 * labelled glyph Badges (never color alone), lifespan as a soft-primary chip, and
 * temperament traits as soft-primary chips. Same props/behavior as
 * {@link BreedCardProps}; pressable when `onPress` is set. Token-only colors via
 * `useXenitionTheme()`.
 */
export function BreedCardV4({
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
  variant = 'card',
}: BreedCardV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const sizeMeta = size ? SIZE_META[size] : undefined;
  const energyMeta = energy ? ENERGY_META[energy] : undefined;
  const safeTraits = traits ?? [];

  const chipStyle = {
    backgroundColor: withAlpha(colors.primary, 0.1),
    borderRadius: tokens.radius.full,
    paddingHorizontal: tokens.spacing.sm,
    paddingVertical: 2,
  } as const;

  const compactInner = (
    <View
      style={[
        {
          minHeight: 44,
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.sm,
          backgroundColor: colors.card,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.sm,
          shadowColor: colors.onSurface,
          shadowOpacity: 0.08,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 6 },
          elevation: 3,
        },
        style,
      ]}
    >
      <View
        style={{
          width: 36,
          height: 36,
          borderRadius: tokens.radius.full,
          backgroundColor: withAlpha(colors.primary, 0.1),
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {photoUrl ? (
          <Image source={{ uri: photoUrl }} resizeMode="cover" style={{ width: '100%', height: '100%' }} />
        ) : (
          <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.lg }}>
            {glyph}
          </Text>
        )}
      </View>
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.sm }}>
        <Text numberOfLines={1} style={{ flexShrink: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
          {name}
        </Text>
        {species ? (
          <Text numberOfLines={1} style={{ flexShrink: 1, color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {species}
          </Text>
        ) : null}
      </View>
      {sizeMeta ? (
        <Badge tone="primary" variant="soft" size="sm">
          {sizeMeta.glyph} {sizeMeta.label}
        </Badge>
      ) : null}
      {energyMeta ? (
        <Badge tone={energyMeta.tone} variant="soft" size="sm">
          {energyMeta.glyph} {energyMeta.label}
        </Badge>
      ) : null}
    </View>
  );

  const inner = variant === 'compact' ? compactInner : (
    <View
      style={[
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.lg,
          gap: tokens.spacing.md,
          shadowColor: colors.onSurface,
          shadowOpacity: 0.08,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 6 },
          elevation: 3,
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        <View
          style={{
            width: 44,
            height: 44,
            borderRadius: tokens.radius.full,
            backgroundColor: withAlpha(colors.primary, 0.1),
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {photoUrl ? (
            <Image source={{ uri: photoUrl }} resizeMode="cover" style={{ width: '100%', height: '100%' }} />
          ) : (
            <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.xl }}>
              {glyph}
            </Text>
          )}
        </View>
        <View style={{ flex: 1, gap: 2 }}>
          <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}>
            {name}
          </Text>
          {species ? (
            <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
              {species}
            </Text>
          ) : null}
        </View>
      </View>

      {sizeMeta || energyMeta ? (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: tokens.spacing.sm }}>
          {sizeMeta ? (
            <Badge tone="primary" variant="soft" size="sm">
              {sizeMeta.glyph} {sizeMeta.label}
            </Badge>
          ) : null}
          {energyMeta ? (
            <Badge tone={energyMeta.tone} variant="soft" size="sm">
              {energyMeta.glyph} {energyMeta.label}
            </Badge>
          ) : null}
        </View>
      ) : null}

      {lifespan ? (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }}>
          <View style={chipStyle}>
            <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm }}>⏳ {lifespan}</Text>
          </View>
        </View>
      ) : null}

      {safeTraits.length > 0 ? (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs }}>
          {safeTraits.slice(0, 5).map((t, i) => (
            <View key={i} style={chipStyle}>
              <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xs }}>{t}</Text>
            </View>
          ))}
        </View>
      ) : null}
    </View>
  );

  const a11y = `${name}${species ? `, ${species}` : ''}${sizeMeta ? `, ${sizeMeta.label}` : ''}${energyMeta ? `, ${energyMeta.label}` : ''}`;
  if (!onPress) {
    return <View accessibilityLabel={a11y}>{inner}</View>;
  }
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={a11y} onPress={onPress} style={({ pressed }) => ({ opacity: pressed ? 0.9 : 1 })}>
      {inner}
    </Pressable>
  );
}
