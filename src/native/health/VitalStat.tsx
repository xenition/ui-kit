import * as React from 'react';
import { Animated, Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { appearanceStyle, type Appearance } from '../primitives/internal/appearance';
import { useEnter, usePressScale } from '../primitives/internal/motion';

/** Resolve a fill semantic key to its contrast-safe `*Text` sibling when one exists. */
function textTone(colors: SemanticColors, key: keyof SemanticColors): string {
  return (colors as unknown as Record<string, string>)[`${key}Text`] ?? colors[key];
}

export type VitalStatVariant =
  | 'heart-rate'
  | 'steps'
  | 'calories'
  | 'distance'
  | 'oxygen'
  | 'blood-pressure'
  | 'temperature'
  | 'respiration';

interface VariantMeta {
  glyph: string;
  label: string;
  unit: string;
  color: keyof SemanticColors;
}

/** Icon / default label / default unit / accent tone per vital variant. */
const VARIANT_META: Record<VitalStatVariant, VariantMeta> = {
  'heart-rate': { glyph: '❤️', label: 'Heart rate', unit: 'bpm', color: 'danger' },
  steps: { glyph: '👟', label: 'Steps', unit: '', color: 'primary' },
  calories: { glyph: '🔥', label: 'Calories', unit: 'kcal', color: 'warn' },
  distance: { glyph: '📍', label: 'Distance', unit: 'km', color: 'primary' },
  oxygen: { glyph: '🫁', label: 'Blood oxygen', unit: '%', color: 'accent' },
  'blood-pressure': { glyph: '🩺', label: 'Blood pressure', unit: 'mmHg', color: 'danger' },
  temperature: { glyph: '🌡️', label: 'Temperature', unit: '°C', color: 'warn' },
  respiration: { glyph: '💨', label: 'Respiration', unit: 'br/min', color: 'accent' },
};

export interface VitalStatProps {
  /** Which vital sign this tile shows; drives the default icon, label, unit, and tone. */
  variant: VitalStatVariant;
  /** The measured value (e.g. `72`, `"120/80"`). */
  value: React.ReactNode;
  /** Override the variant's default unit suffix. Pass `''` to hide it. */
  unit?: string;
  /** Override the variant's default label. */
  label?: string;
  /** Optional change readout, e.g. `"+4"`; positive reads success, negative danger. */
  delta?: number;
  onPress?: () => void;
  /** Surface treatment for visual diversity; defaults to `classic` (the historical look). */
  appearance?: Appearance;
  style?: StyleProp<ViewStyle>;
}

/**
 * A single vital-sign tile: an emoji icon, the measured value with its unit, a
 * caption, and an optional trend delta. The `variant` picks sensible defaults
 * (icon / unit / accent tone) that individual props can override. `appearance`
 * selects the surface treatment (classic by default). Colors resolve from
 * `SemanticColors` via `useXenitionTheme()` — no literal colors. Pressable when
 * `onPress` is provided.
 */
export function VitalStat({
  variant,
  value,
  unit,
  label,
  delta,
  onPress,
  appearance = 'classic',
  style,
}: VitalStatProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = VARIANT_META[variant];
  const resolvedUnit = unit ?? meta.unit;
  const resolvedLabel = label ?? meta.label;
  const deltaColor =
    delta == null || delta === 0 ? colors.muted : delta > 0 ? colors.successText : colors.dangerText;
  const a11y = `${resolvedLabel}: ${String(value)}${resolvedUnit ? ` ${resolvedUnit}` : ''}`;
  const enter = useEnter();
  const press = usePressScale();

  const inner = (
    <View
      style={[
        {
          ...appearanceStyle(appearance, colors, tokens),
          borderRadius: tokens.radius.md,
          padding: tokens.spacing.md,
          gap: tokens.spacing.xs,
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
        <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.base }}>
          {meta.glyph}
        </Text>
        <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, flex: 1 }}>
          {resolvedLabel}
        </Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: tokens.spacing.xs }}>
        <Text style={{ color: textTone(colors, meta.color), fontSize: tokens.typography.scale['2xl'], fontWeight: '700' }}>
          {value}
        </Text>
        {resolvedUnit ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm, marginBottom: tokens.spacing.xs }}>
            {resolvedUnit}
          </Text>
        ) : null}
      </View>
      {delta != null ? (
        <Text style={{ color: deltaColor, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
          {delta > 0 ? '▲ ' : delta < 0 ? '▼ ' : ''}
          {Math.abs(delta)}
        </Text>
      ) : null}
    </View>
  );

  if (!onPress) {
    return (
      <Animated.View accessibilityLabel={a11y} style={{ opacity: enter.opacity, transform: enter.transform }}>
        {inner}
      </Animated.View>
    );
  }
  return (
    <Animated.View style={{ opacity: enter.opacity, transform: [...enter.transform, { scale: press.scale }] }}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={a11y}
        onPress={onPress}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
        style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}
      >
        {inner}
      </Pressable>
    </Animated.View>
  );
}
