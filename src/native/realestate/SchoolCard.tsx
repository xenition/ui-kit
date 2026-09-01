import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../primitives';
import { withAlpha } from '../primitives/internal/color';

/** Score tiers → the semantic accent that tints the rating disc/text. */
type ScoreTier = 'success' | 'warn' | 'danger';

/**
 * Map a 0–10 rating to its tier: high (≥7) → success, mid (≥4) → warn,
 * low (<4) → danger. The score reads by BOTH number and color.
 */
function scoreTier(rating: number): ScoreTier {
  if (rating >= 7) return 'success';
  if (rating >= 4) return 'warn';
  return 'danger';
}

const TIER_SLOT: Record<ScoreTier, keyof SemanticColors> = {
  success: 'success',
  warn: 'warn',
  danger: 'danger',
};

export interface SchoolCardProps {
  /** School name (e.g. `'Lincoln Elementary'`). The card's headline. */
  name: string;
  /**
   * Rating on a 0–10 scale. Shown as a big numeral inside a score-tinted disc
   * (high ≥7 → success, mid ≥4 → warn, low <4 → danger). Clamped to `0–10`.
   */
  rating: number;
  /** Optional education level (e.g. `'Elementary'`, `'High'`). Shown beside the distance. */
  level?: string;
  /** Optional distance label (e.g. `'0.4 mi'`). Shown beside the level. */
  distanceLabel?: string;
  /** Optional grade span (e.g. `'K–5'`, `'9–12'`). Shown as a muted footnote. */
  gradesLabel?: string;
  /**
   * Optional press handler. When set the whole card becomes a button with an
   * accessible summary label; otherwise it renders as static content.
   */
  onPress?: () => void;
  /** Container style override. */
  style?: StyleProp<ViewStyle>;
}

/**
 * SchoolCard — **V4** "listing" design. A nearby-school rating card: the 0–10
 * rating in a score-tinted disc (high → success, mid → warn, low → danger) on
 * the left, the school name as the headline, the level + distance beneath, and
 * an optional grades footnote. The score is legible by BOTH its big numeral and
 * its color. Editorial, rounded elevated card, 8-pt spacing. Presentational
 * only — token-only colors via `useXenitionTheme()`, no literals; dark-mode
 * safe. When `onPress` is set the card is a button.
 */
export function SchoolCard({
  name,
  rating,
  level,
  distanceLabel,
  gradesLabel,
  onPress,
  style,
}: SchoolCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const clamped = Math.max(0, Math.min(10, rating));
  const tier = scoreTier(clamped);
  const scoreColor = colors[TIER_SLOT[tier]];
  const scoreText = Number.isInteger(clamped) ? String(clamped) : clamped.toFixed(1);

  const meta = [level, distanceLabel].filter(Boolean).join(' · ');
  const label = `${name}, rated ${scoreText} out of 10${meta ? `, ${meta}` : ''}${gradesLabel ? `, grades ${gradesLabel}` : ''}`;

  const body = (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          backgroundColor: colors.card,
          borderRadius: tokens.radius.lg,
          borderWidth: 1,
          borderColor: colors.border,
          padding: tokens.spacing.sm,
          shadowColor: colors.onSurface,
          shadowOpacity: 0.08,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 6 },
          elevation: 3,
        },
        style,
      ]}
    >
      {/* Score-tinted rating disc — number + color both encode the rating. */}
      <View
        style={{
          width: 56,
          height: 56,
          borderRadius: tokens.radius.md,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: withAlpha(scoreColor, 0.15),
        }}
      >
        <Text style={{ fontSize: tokens.typography.scale['2xl'], fontWeight: '700', color: scoreColor }}>
          {scoreText}
        </Text>
        <Text style={{ fontSize: 10, fontWeight: '600', color: scoreColor }}>/ 10</Text>
      </View>

      <View style={{ flex: 1, gap: 2 }}>
        <Text numberOfLines={1} style={{ fontSize: tokens.typography.scale.base, fontWeight: '700', color: colors.onSurface }}>
          {name}
        </Text>
        {meta ? (
          <Text numberOfLines={1} style={{ fontSize: tokens.typography.scale.sm, color: colors.mutedText }}>
            {meta}
          </Text>
        ) : null}
        {gradesLabel ? (
          <Text numberOfLines={1} style={{ fontSize: tokens.typography.scale.xs, color: colors.mutedText }}>
            Grades {gradesLabel}
          </Text>
        ) : null}
      </View>
    </View>
  );

  if (!onPress) return body;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.9 : 1 })}
    >
      {body}
    </Pressable>
  );
}
