import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import type { SemanticColors } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import type { CompatibilityMeterProps } from './CompatibilityMeter';

/** Drop-in alternate design — identical props to `CompatibilityMeter`. */
export type CompatibilityMeterV2Props = CompatibilityMeterProps;

/** Score bands → tone + spelled-out word (meaning never rests on color). */
function bandFor(score: number): { tone: keyof SemanticColors; word: string } {
  if (score >= 80) return { tone: 'success', word: 'Great match' };
  if (score >= 55) return { tone: 'primary', word: 'Good match' };
  if (score >= 30) return { tone: 'accent', word: 'Some overlap' };
  return { tone: 'muted', word: 'Low overlap' };
}

const DIAL: Record<NonNullable<CompatibilityMeterProps['size']>, number> = { sm: 72, md: 96, lg: 128 };

/**
 * CompatibilityMeter — design variant **V2**, a bold **score dial**. A large
 * filled, tone-tinted disc makes the numeric percentage the hero, with the label
 * caption above and the spelled-out band word in a pill beneath — a stat-tile
 * feel distinct from the original's slim inline ring. Same
 * `CompatibilityMeterProps`; token-pure tints via `withAlpha`; input is clamped
 * and NaN-guarded; a loading skeleton is included.
 */
export function CompatibilityMeterV2({
  score,
  label = 'Compatibility',
  showValue = true,
  size = 'md',
  loading = false,
  style,
}: CompatibilityMeterV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const clamped = Math.max(0, Math.min(100, Math.round(Number.isFinite(score) ? score : 0)));
  const band = bandFor(clamped);
  const tone = colors[band.tone];
  const d = DIAL[size];
  const a11y = `${label}: ${clamped} percent, ${band.word}`;

  if (loading) {
    return (
      <View
        accessibilityRole="progressbar"
        accessibilityLabel={`${label}: loading`}
        style={[{ alignItems: 'center', gap: tokens.spacing.xs }, style]}
      >
        <View style={{ width: d, height: d, borderRadius: d / 2, backgroundColor: colors.border }} />
        <View style={{ height: 12, width: 96, borderRadius: tokens.radius.full, backgroundColor: colors.border }} />
      </View>
    );
  }

  return (
    <View
      accessible
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: clamped }}
      accessibilityLabel={a11y}
      style={[{ alignItems: 'center', gap: tokens.spacing.sm }, style]}
    >
      <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700', letterSpacing: 0.6, textTransform: 'uppercase' }}>
        {label}
      </Text>
      <View
        style={{
          width: d,
          height: d,
          borderRadius: d / 2,
          borderWidth: Math.max(6, Math.round(d * 0.09)),
          borderColor: tone,
          backgroundColor: withAlpha(tone, 0.12),
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {showValue ? (
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale[size === 'sm' ? 'xl' : '2xl'], fontWeight: '800' }}>
            {clamped}
            <Text style={{ fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>%</Text>
          </Text>
        ) : null}
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.xs,
          backgroundColor: withAlpha(tone, 0.14),
          borderRadius: tokens.radius.full,
          paddingVertical: tokens.spacing.xs,
          paddingHorizontal: tokens.spacing.sm,
        }}
      >
        <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: tone }} />
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>{band.word}</Text>
      </View>
    </View>
  );
}
