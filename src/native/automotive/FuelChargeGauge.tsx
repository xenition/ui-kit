import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';
import type { SemanticColors } from '../theme';
import { withAlpha } from '../primitives/internal/color';

/** Energy source powering the gauge. */
export type FuelKind = 'fuel' | 'ev';
/** Presentation for a {@link FuelChargeGauge}. */
export type FuelChargeVariant = 'bar' | 'compact';

export interface FuelChargeGaugeProps {
  /** Charge / tank level as a percentage 0–100. */
  percent: number;
  /** Energy source. `fuel` (tank) or `ev` (battery). */
  kind?: FuelKind;
  /** Heading above the gauge. Defaults to the source name. */
  label?: string;
  /** Estimated range remaining, pre-formatted (e.g. `'142 mi'`). */
  rangeLabel?: string;
  /** Percentage at/under which the level reads as low (default 15). */
  lowThreshold?: number;
  /** Whether the EV is actively charging (adds a text-labelled state). */
  charging?: boolean;
  /** Presentation variant. */
  variant?: FuelChargeVariant;
  /** Loading skeleton (indeterminate). */
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
}

/** Level bands → semantic tone + word. A low level maps to the `danger` slot. */
function bandFor(pct: number, low: number): { tone: keyof SemanticColors; word: string } {
  if (pct <= low) return { tone: 'danger', word: 'Low' };
  if (pct <= low * 2.5) return { tone: 'warn', word: 'Fair' };
  return { tone: 'success', word: 'Good' };
}

/**
 * A fuel-tank or EV-battery level gauge — draws a token-tinted meter filled to
 * `percent`, with an estimated-range readout. A low level (at/under
 * `lowThreshold`) resolves to the `danger` slot per contract, but the band is
 * always spelled out ("Low"/"Fair"/"Good") and the a11y label states the number
 * plus a glyph, so meaning never rests on color. Colors come from semantic
 * tokens and `withAlpha` tints — no literal colors. Input is clamped to 0–100.
 */
export function FuelChargeGauge({
  percent,
  kind = 'fuel',
  label,
  rangeLabel,
  lowThreshold = 15,
  charging = false,
  variant = 'bar',
  loading = false,
  style,
}: FuelChargeGaugeProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const clamped = Math.max(0, Math.min(100, Math.round(Number.isFinite(percent) ? percent : 0)));
  const low = Number.isFinite(lowThreshold) ? lowThreshold : 15;
  const band = bandFor(clamped, low);
  const toneColor = colors[band.tone];
  const heading = label ?? (kind === 'ev' ? 'Battery' : 'Fuel');
  const glyph = kind === 'ev' ? (charging ? '⚡' : '🔋') : '⛽';
  const compact = variant === 'compact';

  if (loading) {
    return (
      <View
        accessibilityLabel={`Loading ${heading.toLowerCase()} level`}
        style={[{ gap: tokens.spacing.xs }, style]}
      >
        <View style={{ height: 12, width: '40%', borderRadius: tokens.radius.sm, backgroundColor: withAlpha(colors.muted, 0.25) }} />
        <View style={{ height: compact ? 10 : 14, borderRadius: tokens.radius.full, backgroundColor: withAlpha(colors.muted, 0.18) }} />
      </View>
    );
  }

  const a11y = `${heading}${charging ? ' charging' : ''}: ${clamped} percent, ${band.word}${
    rangeLabel ? `, ${rangeLabel} range` : ''
  }`;

  return (
    <View accessible accessibilityLabel={a11y} style={[{ gap: tokens.spacing.xs }, style]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
          {glyph} {heading}
          {charging ? ' · Charging' : ''}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }}>
          <Text style={{ color: toneColor, fontSize: tokens.typography.scale.base, fontWeight: '800' }}>{clamped}%</Text>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{band.word}</Text>
        </View>
      </View>

      <View
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        style={{
          height: compact ? 8 : 12,
          borderRadius: tokens.radius.full,
          backgroundColor: withAlpha(colors.muted, 0.2),
          overflow: 'hidden',
        }}
      >
        <View
          style={{
            width: `${clamped}%`,
            height: '100%',
            borderRadius: tokens.radius.full,
            backgroundColor: toneColor,
          }}
        />
      </View>

      {rangeLabel ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>Est. range {rangeLabel}</Text>
      ) : null}
    </View>
  );
}
