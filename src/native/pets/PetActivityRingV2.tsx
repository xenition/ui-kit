import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Icon } from '../primitives';
import { ProgressRing } from '../charts';
import { withAlpha } from '../primitives/internal/color';
import type { PetActivityRingProps, PetActivityVariant } from './PetActivityRing';

/** Drop-in alternate design for {@link PetActivityRing} — identical props. */
export type PetActivityRingV2Props = PetActivityRingProps;

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
 * Hero activity ring — a prominent alternate to {@link PetActivityRing}. The
 * ring is enlarged and centered on a soft tinted panel, with the activity label
 * as a headline and the raw value/goal called out beneath. Guards a non-positive
 * goal with a muted "No goal set" note. Same `PetActivityRingProps`; the caption
 * is always shown as the hero copy. Token-pure.
 */
export function PetActivityRingV2({
  variant,
  value,
  goal,
  size = 168,
  color,
  showCaption = true,
  style,
}: PetActivityRingV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = VARIANT_META[variant];
  const arcColor = color ?? meta.color;
  const textColor = (colors as unknown as Record<string, string>)[`${String(arcColor)}Text`] ?? colors[arcColor];

  const panel = {
    alignItems: 'center' as const,
    gap: tokens.spacing.md,
    padding: tokens.spacing.xl,
    borderRadius: tokens.radius.lg,
    backgroundColor: withAlpha(colors[arcColor], 0.08),
  };

  if (goal <= 0) {
    return (
      <View accessibilityLabel={`${meta.label}: no goal set`} style={[panel, style]}>
        <Icon glyph={meta.glyph} size="3xl" />
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.base }}>No goal set</Text>
      </View>
    );
  }

  const clamped = Math.min(Math.max(value, 0), goal);
  const pct = Math.round((clamped / goal) * 100);
  const met = clamped >= goal;

  return (
    <View style={[panel, style]}>
      <ProgressRing
        value={value}
        max={goal}
        size={size}
        strokeWidth={16}
        color={arcColor}
        label={`${pct}%`}
        accessibilityLabel={`${meta.label}: ${clamped} of ${goal}${meta.unit ? ` ${meta.unit}` : ''}, ${pct}%${met ? ', goal met' : ''}`}
      />
      {showCaption ? (
        <View style={{ alignItems: 'center', gap: tokens.spacing.xs }}>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xl, fontWeight: '700' }}>
            {meta.glyph} {met ? `${meta.label} goal met` : meta.label}
          </Text>
          <Text style={{ color: textColor, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>
            {clamped} / {goal}
            {meta.unit ? ` ${meta.unit}` : ''}
            {met ? ' ✓' : ''}
          </Text>
        </View>
      ) : null}
    </View>
  );
}
