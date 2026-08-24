import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import type { SemanticColors } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import { Progress } from '../primitives';

export type CompatibilityMeterVariant = 'bar' | 'ring' | 'compact';
export type CompatibilityMeterSize = 'sm' | 'md' | 'lg';

export interface CompatibilityMeterProps {
  /** Compatibility score 0–100. */
  score: number;
  /** Heading above the meter. */
  label?: string;
  /** Show the numeric percentage. Defaults to true. */
  showValue?: boolean;
  /** Presentation. `bar` (default), `ring` (dial), or `compact` (inline pill). */
  variant?: CompatibilityMeterVariant;
  /** Size scale (drives ring diameter / text). Defaults to `md`. */
  size?: CompatibilityMeterSize;
  /** Loading skeleton (indeterminate). */
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
}

/** Score bands → semantic tone. State is conveyed by label text, not color alone. */
function bandFor(score: number): { tone: keyof SemanticColors; word: string } {
  if (score >= 80) return { tone: 'success', word: 'Great match' };
  if (score >= 55) return { tone: 'primary', word: 'Good match' };
  if (score >= 30) return { tone: 'accent', word: 'Some overlap' };
  return { tone: 'muted', word: 'Low overlap' };
}

const RING_D: Record<CompatibilityMeterSize, number> = { sm: 48, md: 64, lg: 88 };

/**
 * Compatibility score meter — visualises a 0–100 match score as a token-styled
 * bar, ring dial, or compact pill. The tone shifts across score bands but the
 * band is always spelled out in words ("Great match") and the a11y label states
 * the number, so meaning never rests on color. Colors come from semantic tokens
 * and `withAlpha` tints — no literal colors. Guarded against out-of-range input.
 */
export function CompatibilityMeter({
  score,
  label = 'Compatibility',
  showValue = true,
  variant = 'bar',
  size = 'md',
  loading = false,
  style,
}: CompatibilityMeterProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const clamped = Math.max(0, Math.min(100, Math.round(Number.isFinite(score) ? score : 0)));
  const band = bandFor(clamped);
  const toneColor = colors[band.tone];
  const a11y = `${label}: ${clamped} percent, ${band.word}`;

  if (loading) {
    return (
      <View
        accessibilityRole="progressbar"
        accessibilityLabel={`${label}: loading`}
        style={[{ gap: tokens.spacing.xs }, style]}
      >
        <View
          style={{
            height: size === 'lg' ? 14 : 12,
            width: '55%',
            borderRadius: tokens.radius.sm,
            backgroundColor: colors.border,
          }}
        />
        <View
          style={{
            height: 10,
            borderRadius: tokens.radius.full,
            backgroundColor: colors.border,
          }}
        />
      </View>
    );
  }

  if (variant === 'ring') {
    const d = RING_D[size];
    return (
      <View
        accessible
        accessibilityRole="progressbar"
        accessibilityValue={{ min: 0, max: 100, now: clamped }}
        accessibilityLabel={a11y}
        style={[{ alignItems: 'center', gap: tokens.spacing.xs }, style]}
      >
        <View
          style={{
            width: d,
            height: d,
            borderRadius: d / 2,
            borderWidth: Math.max(4, Math.round(d * 0.12)),
            borderColor: toneColor,
            backgroundColor: withAlpha(toneColor, 0.1),
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {showValue ? (
            <Text
              style={{
                color: colors.onSurface,
                fontSize: tokens.typography.scale[size === 'lg' ? 'xl' : 'base'],
                fontWeight: '700',
              }}
            >
              {clamped}%
            </Text>
          ) : null}
        </View>
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{band.word}</Text>
      </View>
    );
  }

  if (variant === 'compact') {
    return (
      <View
        accessible
        accessibilityRole="text"
        accessibilityLabel={a11y}
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'flex-start',
            gap: tokens.spacing.xs,
            backgroundColor: withAlpha(toneColor, 0.14),
            borderRadius: tokens.radius.full,
            paddingVertical: tokens.spacing.xs,
            paddingHorizontal: tokens.spacing.sm,
          },
          style,
        ]}
      >
        <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: toneColor }} />
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
          {clamped}% · {band.word}
        </Text>
      </View>
    );
  }

  const barTone =
    band.tone === 'success' ? 'success' : band.tone === 'danger' ? 'danger' : band.tone === 'accent' ? 'warn' : 'primary';

  return (
    <View
      accessible
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: clamped }}
      accessibilityLabel={a11y}
      style={[{ gap: tokens.spacing.xs }, style]}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
          {label}
        </Text>
        {showValue ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
            {clamped}% · {band.word}
          </Text>
        ) : null}
      </View>
      <Progress value={clamped} max={100} tone={barTone} size={size === 'sm' ? 'sm' : 'md'} />
    </View>
  );
}
