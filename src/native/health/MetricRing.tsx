import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { ProgressRing } from '../charts';
import { appearanceStyle, type Appearance } from '../primitives/internal/appearance';

export type MetricRingColor = keyof SemanticColors;

export interface MetricRingProps {
  /** Metric name shown under the ring, e.g. "Move". */
  label: string;
  /** Current value; clamped to `[0, goal]`. */
  value: number;
  /** Goal / full-ring value. */
  goal: number;
  /** Unit shown in the caption, e.g. "kcal". */
  unit?: string;
  /** Ring arc color (SemanticColors key). */
  color?: MetricRingColor;
  /** Outer diameter in px. */
  size?: number;
  /** Center text override; defaults to the percentage. */
  centerLabel?: string;
  /**
   * Surface treatment for the outer container (the SVG ring is unaffected);
   * defaults to `classic` (no surface, the historical look).
   */
  appearance?: Appearance;
  style?: StyleProp<ViewStyle>;
}

/**
 * A single labelled progress ring for one health metric — wraps the charts
 * {@link ProgressRing} and adds a value/goal caption below. When `goal <= 0`
 * it degrades to a muted "No goal set" note. `appearance` selects an optional
 * surface treatment for the outer container. The ring carries an
 * `accessibilityLabel`. Token-only colors.
 */
export function MetricRing({
  label,
  value,
  goal,
  unit,
  color = 'primary',
  size = 120,
  centerLabel,
  appearance = 'classic',
  style,
}: MetricRingProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const surface: ViewStyle | null =
    appearance !== 'classic'
      ? { ...appearanceStyle(appearance, colors, tokens), borderRadius: tokens.radius.lg, padding: tokens.spacing.lg }
      : null;

  if (goal <= 0) {
    return (
      <View style={[{ alignItems: 'center', gap: tokens.spacing.xs }, surface, style]}>
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>No goal set</Text>
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
          {label}
        </Text>
      </View>
    );
  }

  const clamped = Math.min(Math.max(value, 0), goal);
  const pct = Math.round((clamped / goal) * 100);

  return (
    <View style={[{ alignItems: 'center', gap: tokens.spacing.xs }, surface, style]}>
      <ProgressRing
        value={clamped}
        max={goal}
        size={size}
        color={color}
        label={centerLabel ?? `${pct}%`}
        accessibilityLabel={`${label}: ${clamped} of ${goal}${unit ? ` ${unit}` : ''}, ${pct}%`}
      />
      <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
        {label}
      </Text>
      <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
        {clamped} / {goal}
        {unit ? ` ${unit}` : ''}
      </Text>
    </View>
  );
}
