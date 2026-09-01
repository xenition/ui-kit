import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { GradientSurface } from './internal/GradientSurface';
import { consoleGradient, consoleInk, consoleInkSoft, consoleTile } from './internal/console';
import { clamp } from './internal';

export interface CSATResultCardProps {
  /** Satisfaction score as a percentage `0–100`; the big near-white numeral. */
  score: number;
  /** Total number of survey responses this score is based on. */
  responses: number;
  /** Count of **positive** ratings (raw response count, not a percentage). */
  positive: number;
  /** Count of **neutral** ratings (raw response count, not a percentage). */
  neutral: number;
  /** Count of **negative** ratings (raw response count, not a percentage). */
  negative: number;
  /** Headline (default `"Customer satisfaction"`). */
  title?: string;
  style?: StyleProp<ViewStyle>;
}

/** Breakdown bar rows — positive→success, neutral→warn, negative→danger. */
const BREAKDOWN: readonly {
  key: 'positive' | 'neutral' | 'negative';
  label: string;
  slot: keyof SemanticColors;
}[] = [
  { key: 'positive', label: 'Positive', slot: 'success' },
  { key: 'neutral', label: 'Neutral', slot: 'warn' },
  { key: 'negative', label: 'Negative', slot: 'danger' },
];

/**
 * CSATResultCard — a gradient "console" results hero for a customer-satisfaction
 * score. The title and a big near-white `score%` numeral sit over the console
 * gradient, above the response count. A positive/neutral/negative breakdown
 * reads as three token bars (success/warn/danger) whose widths are the share of
 * the total raw counts, each on a frosted track. A calm peak-moment surface,
 * dark-mode safe, every color from the compiled theme ramps (token-only, no
 * literals). Presentational — shaped counts only, nothing fetches.
 */
export function CSATResultCard({
  score,
  responses,
  positive,
  neutral,
  negative,
  title = 'Customer satisfaction',
  style,
}: CSATResultCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const r = tokens.ramps;
  const ink = consoleInk(r);
  const inkSoft = consoleInkSoft(r);

  const pct = Math.round(clamp(score, 0, 100));
  const p = Math.max(0, Math.trunc(positive || 0));
  const n = Math.max(0, Math.trunc(neutral || 0));
  const g = Math.max(0, Math.trunc(negative || 0));
  const total = p + n + g;
  const counts: Record<'positive' | 'neutral' | 'negative', number> = { positive: p, neutral: n, negative: g };
  const responseLabel = `${responses} ${responses === 1 ? 'response' : 'responses'}`;

  return (
    <View style={[{ borderRadius: tokens.radius.lg }, style]}>
      <GradientSurface
        colors={consoleGradient(r)}
        style={{ borderRadius: tokens.radius.lg, padding: tokens.spacing.lg, overflow: 'hidden', gap: tokens.spacing.lg }}
      >
        <View style={{ gap: tokens.spacing.xs }}>
          <Text style={{ color: inkSoft, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>{title}</Text>
          <Text
            allowFontScaling={false}
            accessibilityLabel={`${pct} percent satisfaction`}
            style={{ color: ink, fontSize: tokens.typography.scale['3xl'] * 1.2, fontWeight: '800', letterSpacing: -1 }}
          >
            {`${pct}%`}
          </Text>
          <Text style={{ color: inkSoft, fontSize: tokens.typography.scale.sm }}>{responseLabel}</Text>
        </View>

        <View style={{ gap: tokens.spacing.sm }}>
          {BREAKDOWN.map(({ key, label, slot }) => {
            const count = counts[key];
            const width = total > 0 ? Math.round((count / total) * 100) : 0;
            return (
              <View
                key={key}
                accessible
                accessibilityRole="text"
                accessibilityLabel={`${label} ${count} of ${total}`}
                style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}
              >
                <Text style={{ width: 64, color: inkSoft, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
                  {label}
                </Text>
                <View
                  style={{
                    flex: 1,
                    height: 8,
                    borderRadius: tokens.radius.full,
                    backgroundColor: consoleTile(r),
                    overflow: 'hidden',
                  }}
                >
                  <View
                    style={{ width: `${width}%`, height: '100%', borderRadius: tokens.radius.full, backgroundColor: colors[slot] }}
                  />
                </View>
                <Text style={{ width: 32, textAlign: 'right', color: ink, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
                  {count}
                </Text>
              </View>
            );
          })}
        </View>
      </GradientSurface>
    </View>
  );
}
