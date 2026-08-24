import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import type { SemanticColors } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import type { CompatibilityMeterProps } from './CompatibilityMeter';

/** Drop-in alternate design — identical props to `CompatibilityMeter`. */
export type CompatibilityMeterV3Props = CompatibilityMeterProps;

/** Score bands → tone + spelled-out word (meaning never rests on color). */
function bandFor(score: number): { tone: keyof SemanticColors; word: string } {
  if (score >= 80) return { tone: 'success', word: 'Great match' };
  if (score >= 55) return { tone: 'primary', word: 'Good match' };
  if (score >= 30) return { tone: 'accent', word: 'Some overlap' };
  return { tone: 'muted', word: 'Low overlap' };
}

const SEGMENTS = 10;
const SEG_H: Record<NonNullable<CompatibilityMeterProps['size']>, number> = { sm: 8, md: 12, lg: 16 };

/**
 * CompatibilityMeter — design variant **V3**, a **segmented bar**. The score is
 * quantised into ten discrete pips that fill in the band tone up to the value —
 * a chunky, glanceable read that is visually distinct from the original's smooth
 * progress bar — with the label, percentage, and a spelled-out band word above.
 * Same `CompatibilityMeterProps`; token-pure; clamped and NaN-guarded; loading
 * skeleton included.
 */
export function CompatibilityMeterV3({
  score,
  label = 'Compatibility',
  showValue = true,
  size = 'md',
  loading = false,
  style,
}: CompatibilityMeterV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const clamped = Math.max(0, Math.min(100, Math.round(Number.isFinite(score) ? score : 0)));
  const band = bandFor(clamped);
  const tone = colors[band.tone];
  const filled = Math.round((clamped / 100) * SEGMENTS);
  const h = SEG_H[size];
  const a11y = `${label}: ${clamped} percent, ${band.word}`;

  if (loading) {
    return (
      <View accessibilityRole="progressbar" accessibilityLabel={`${label}: loading`} style={[{ gap: tokens.spacing.xs }, style]}>
        <View style={{ height: 12, width: '55%', borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
        <View style={{ flexDirection: 'row', gap: 4 }}>
          {Array.from({ length: SEGMENTS }).map((_, i) => (
            <View key={i} style={{ flex: 1, height: h, borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
          ))}
        </View>
      </View>
    );
  }

  return (
    <View
      accessible
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: clamped }}
      accessibilityLabel={a11y}
      style={[{ gap: tokens.spacing.xs }, style]}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>{label}</Text>
        {showValue ? (
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
            {clamped}% · {band.word}
          </Text>
        ) : (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>{band.word}</Text>
        )}
      </View>
      <View style={{ flexDirection: 'row', gap: 4 }}>
        {Array.from({ length: SEGMENTS }).map((_, i) => (
          <View
            key={i}
            style={{
              flex: 1,
              height: h,
              borderRadius: tokens.radius.sm,
              backgroundColor: i < filled ? tone : withAlpha(colors.border, 0.7),
            }}
          />
        ))}
      </View>
    </View>
  );
}
