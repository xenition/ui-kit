import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Icon } from '../primitives';
import { ProgressRing } from '../charts';
import type { PetActivityRingProps, PetActivityVariant } from './PetActivityRing';

/** Drop-in alternate design for {@link PetActivityRing} — identical props. */
export type PetActivityRingV3Props = PetActivityRingProps;

interface VariantMeta {
  glyph: string;
  label: string;
  unit: string;
  color: keyof SemanticColors;
}

const VARIANT_META: Record<PetActivityVariant, VariantMeta> = {
  walk: { glyph: '🐾', label: 'Walk', unit: 'min', color: 'primary' },
  play: { glyph: '🎾', label: 'Play', unit: 'min', color: 'accent' },
  exercise: { glyph: '🏃', label: 'Exercise', unit: 'min', color: 'success' },
  steps: { glyph: '👣', label: 'Steps', unit: '', color: 'warn' },
  calories: { glyph: '🔥', label: 'Calories', unit: 'kcal', color: 'danger' },
};

/**
 * Compact ring row — a list-friendly alternate to {@link PetActivityRing}. A
 * small ring sits at the leading edge with the label and inline value/goal on
 * its right and the percentage trailing; the ring `size` prop drives the small
 * diameter. Guards a non-positive goal with a muted "No goal set" note. Same
 * `PetActivityRingProps`. Token-pure.
 */
export function PetActivityRingV3({
  variant,
  value,
  goal,
  size = 44,
  color,
  showCaption = true,
  style,
}: PetActivityRingV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = VARIANT_META[variant];
  const arcColor = color ?? meta.color;
  const textColor = (colors as unknown as Record<string, string>)[`${String(arcColor)}Text`] ?? colors[arcColor];

  const row = {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: tokens.spacing.md,
    paddingVertical: tokens.spacing.sm,
  };

  if (goal <= 0) {
    return (
      <View accessibilityLabel={`${meta.label}: no goal set`} style={[row, style]}>
        <Icon glyph={meta.glyph} size="xl" />
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{meta.label}: no goal set</Text>
      </View>
    );
  }

  const clamped = Math.min(Math.max(value, 0), goal);
  const pct = Math.round((clamped / goal) * 100);
  const met = clamped >= goal;

  return (
    <View
      accessibilityLabel={`${meta.label}: ${clamped} of ${goal}${meta.unit ? ` ${meta.unit}` : ''}, ${pct}%${met ? ', goal met' : ''}`}
      style={[row, style]}
    >
      <ProgressRing
        value={value}
        max={goal}
        size={size}
        strokeWidth={5}
        color={arcColor}
        label={meta.glyph}
        accessibilityLabel={`${meta.label} ring, ${pct}%`}
      />
      {showCaption ? (
        <View style={{ flex: 1, gap: 2 }}>
          <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
            {met ? `✓ ${meta.label}` : meta.label}
          </Text>
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {clamped} / {goal}
            {meta.unit ? ` ${meta.unit}` : ''}
          </Text>
        </View>
      ) : null}
      <Text style={{ color: textColor, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>{pct}%</Text>
    </View>
  );
}
