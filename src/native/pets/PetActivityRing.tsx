import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { ProgressRing } from '../charts';

export type PetActivityVariant = 'walk' | 'play' | 'exercise' | 'steps' | 'calories';

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

export interface PetActivityRingProps {
  /** Activity type; drives the icon, label, unit and default color. */
  variant: PetActivityVariant;
  /** Current value toward the goal. */
  value: number;
  /** Goal / full-ring value. Non-positive renders a "No goal set" state. */
  goal: number;
  /** Ring diameter in px. */
  size?: number;
  /** Override the variant's accent color. */
  color?: keyof SemanticColors;
  /** Show the label + value line beneath the ring. */
  showCaption?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * A single activity goal ring for a pet (walk / play / steps …), built on the
 * charts {@link ProgressRing}. The center shows the percentage; an optional
 * caption repeats the label and raw value/goal. Guards a non-positive goal with
 * a muted "No goal set" note. Token-only colors.
 */
export function PetActivityRing({
  variant,
  value,
  goal,
  size = 120,
  color,
  showCaption = true,
  style,
}: PetActivityRingProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = VARIANT_META[variant];
  const arcColor = color ?? meta.color;

  if (goal <= 0) {
    return (
      <View accessibilityLabel={`${meta.label}: no goal set`} style={[{ alignItems: 'center', gap: tokens.spacing.xs }, style]}>
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
    <View style={[{ alignItems: 'center', gap: tokens.spacing.sm }, style]}>
      <ProgressRing
        value={value}
        max={goal}
        size={size}
        color={arcColor}
        label={`${meta.glyph} ${pct}%`}
        accessibilityLabel={`${meta.label}: ${clamped} of ${goal}${meta.unit ? ` ${meta.unit}` : ''}, ${pct}%${met ? ', goal met' : ''}`}
      />
      {showCaption ? (
        <View style={{ alignItems: 'center', gap: 2 }}>
          <Text style={{ color: colors[arcColor], fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
            {met ? `✓ ${meta.label} goal met` : meta.label}
          </Text>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {clamped} / {goal}
            {meta.unit ? ` ${meta.unit}` : ''}
          </Text>
        </View>
      ) : null}
    </View>
  );
}
