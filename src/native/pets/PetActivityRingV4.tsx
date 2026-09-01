import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { ProgressRing } from '../charts';
import { withAlpha } from '../primitives/internal/color';
import type { PetActivityRingProps, PetActivityVariant } from './PetActivityRing';

/** Drop-in for {@link PetActivityRingProps} — same props, the V4 "companion" design. */
export type PetActivityRingV4Props = PetActivityRingProps;

interface VariantMeta {
  glyph: string;
  label: string;
  unit: string;
  color: keyof SemanticColors;
}

/** Per-variant glyph / label / unit / default color — copied from the base component. */
const VARIANT_META: Record<PetActivityVariant, VariantMeta> = {
  walk: { glyph: '🐾', label: 'Walk', unit: 'min', color: 'primary' },
  play: { glyph: '🎾', label: 'Play', unit: 'min', color: 'accent' },
  exercise: { glyph: '🏃', label: 'Exercise', unit: 'min', color: 'success' },
  steps: { glyph: '👣', label: 'Steps', unit: '', color: 'warn' },
  calories: { glyph: '🔥', label: 'Calories', unit: 'kcal', color: 'danger' },
};

/**
 * PetActivityRing — **V4** "companion" design (native parity of the web V4). The
 * warm, friendly take on a single activity goal ring: an elevated rounded card
 * with a soft shadow wrapping the charts {@link ProgressRing} (kept token-fed and
 * unchanged from the base), a big legible central value, and the label + glyph
 * carried in a soft-primary chip beneath. Same props/behavior as
 * {@link PetActivityRingProps}: honors `variant` (walk / play / exercise / steps /
 * calories) with its glyph/label/unit, the `color` override and the `size` prop,
 * and guards a non-positive goal with a muted "No goal set" note. Token-only
 * colors via `useXenitionTheme()`.
 */
export function PetActivityRingV4({
  variant,
  value,
  goal,
  size = 120,
  color,
  showCaption = true,
  style,
}: PetActivityRingV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = VARIANT_META[variant];
  const arcColor = color ?? meta.color;

  const card = {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: tokens.radius.lg,
    padding: tokens.spacing.lg,
    alignItems: 'center' as const,
    shadowColor: colors.onSurface,
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  };

  if (goal <= 0) {
    return (
      <View accessibilityLabel={`${meta.label}: no goal set`} style={[card, { gap: tokens.spacing.sm }, style]}>
        <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale['2xl'] }}>
          {meta.glyph}
        </Text>
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>No goal set</Text>
      </View>
    );
  }

  const clamped = Math.min(Math.max(value, 0), goal);
  const pct = Math.round((clamped / goal) * 100);
  const met = clamped >= goal;

  return (
    <View style={[card, { gap: tokens.spacing.md }, style]}>
      <ProgressRing
        value={value}
        max={goal}
        size={size}
        color={arcColor}
        label={`${meta.glyph} ${pct}%`}
        accessibilityLabel={`${meta.label}: ${clamped} of ${goal}${meta.unit ? ` ${meta.unit}` : ''}, ${pct}%${met ? ', goal met' : ''}`}
      />
      {/* Big legible central value. */}
      <Text allowFontScaling={false} style={{ color: colors.onSurface, fontSize: tokens.typography.scale['3xl'], fontWeight: '700' }}>
        {pct}%
      </Text>
      {showCaption ? (
        <View style={{ alignItems: 'center', gap: tokens.spacing.xs }}>
          {/* Label + glyph as a soft-primary chip. */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: tokens.spacing.xs,
              backgroundColor: withAlpha(colors.primary, 0.1),
              borderRadius: tokens.radius.full,
              paddingHorizontal: tokens.spacing.sm,
              paddingVertical: 2,
            }}
          >
            <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.sm }}>
              {meta.glyph}
            </Text>
            <Text style={{ color: colors[arcColor], fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
              {met ? `✓ ${meta.label} goal met` : meta.label}
            </Text>
          </View>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {clamped} / {goal}
            {meta.unit ? ` ${meta.unit}` : ''}
          </Text>
        </View>
      ) : null}
    </View>
  );
}
