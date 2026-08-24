import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../primitives';
import { Progress } from '../primitives';
import { withAlpha } from './internal/format';

/** Risk tier — an ordered, non-color signal. */
export type RiskTier = 'low' | 'moderate' | 'high';

interface TierDescriptor {
  label: string;
  glyph: string;
  /** Progress tone slot (traces to SemanticColors via Progress). */
  tone: 'success' | 'warn' | 'danger';
  /** Text color slot. */
  color: keyof SemanticColors;
}

const TIER: Record<RiskTier, TierDescriptor> = {
  low: { label: 'Low risk', glyph: '🟢', tone: 'success', color: 'success' },
  moderate: { label: 'Moderate risk', glyph: '🟡', tone: 'warn', color: 'warn' },
  high: { label: 'High risk', glyph: '🔴', tone: 'danger', color: 'danger' },
};

/** Derive a tier from a 0–100 score when one isn't provided. */
function tierFromScore(score: number): RiskTier {
  if (score <= 33) return 'low';
  if (score <= 66) return 'moderate';
  return 'high';
}

export interface RiskScoreProps {
  /** Underwriting risk score, 0–100 (higher = riskier). */
  score: number;
  /** Explicit tier; derived from `score` when omitted. */
  tier?: RiskTier;
  /** Heading label (default "Risk score"). */
  label?: string;
  /** Contributing factors listed under the bar. */
  factors?: string[];
  style?: StyleProp<ViewStyle>;
}

/**
 * An underwriting risk gauge: a 0–100 score with a tier read out by
 * **glyph + label + color** (low → success, high → danger — never color alone),
 * a token `Progress` bar, and an optional factor list. The score is clamped to
 * 0–100 and rounded; the tier derives from the score when not given. Factor
 * indexing is guarded. Token-bound throughout.
 */
export function RiskScore({
  score,
  tier,
  label = 'Risk score',
  factors = [],
  style,
}: RiskScoreProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const clamped = Number.isFinite(score) ? Math.min(100, Math.max(0, Math.round(score))) : 0;
  const td = TIER[tier ?? tierFromScore(clamped)];
  const list = Array.isArray(factors) ? factors : [];

  return (
    <View style={[{ gap: tokens.spacing.sm }, style]}>
      <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <View style={{ gap: 2 }}>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
            {label}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
            <Text
              accessibilityLabel={`${label}: ${clamped} out of 100, ${td.label}`}
              style={{ color: colors.onSurface, fontSize: tokens.typography.scale['3xl'], fontWeight: '700' }}
            >
              {clamped}
            </Text>
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>/ 100</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.xs,
            borderRadius: tokens.radius.full,
            paddingVertical: tokens.spacing.xs,
            paddingHorizontal: tokens.spacing.sm,
            backgroundColor: withAlpha(colors[td.color], 0.14),
          }}
        >
          <Text style={{ fontSize: tokens.typography.scale.xs }} allowFontScaling={false}>
            {td.glyph}
          </Text>
          <Text style={{ color: colors[td.color], fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>
            {td.label}
          </Text>
        </View>
      </View>

      <Progress value={clamped} max={100} tone={td.tone} />

      {list.length > 0 ? (
        <View style={{ gap: tokens.spacing.xs, marginTop: tokens.spacing.xs }}>
          {list.map((factor, i) => (
            <View key={`${factor}-${i}`} style={{ flexDirection: 'row', gap: tokens.spacing.xs }}>
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>•</Text>
              <Text style={{ flex: 1, color: colors.muted, fontSize: tokens.typography.scale.xs }}>{factor}</Text>
            </View>
          ))}
        </View>
      ) : null}
    </View>
  );
}
