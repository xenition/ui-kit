import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Card } from '../primitives';
import { appearanceStyle, type Appearance } from '../primitives/internal/appearance';
import { ProgressRing } from '../charts';
import { MoneyAmount } from './MoneyAmount';
import { formatMoney, type MoneyFormatter } from '../commerce/money';

export interface SavingsGoalCardProps {
  /** Goal name (e.g. "Emergency fund"). */
  title: string;
  /** Amount saved so far, in integer **cents**. */
  savedCents: number;
  /** Target amount, in integer **cents**. */
  targetCents: number;
  /** ISO 4217 currency code (default `USD`). */
  currency?: string;
  /** Optional target-date caption (already localized). */
  deadline?: string;
  /** Theme color slot for the progress ring (default `success`). */
  color?: keyof SemanticColors;
  /** Override the cents → string formatter (locale control). */
  formatMoney?: MoneyFormatter;
  /**
   * Surface treatment (visual-diversity preset). Defaults to `classic` —
   * byte-for-byte the historical bordered card, so this is opt-in only.
   */
  appearance?: Appearance;
  style?: StyleProp<ViewStyle>;
}

/**
 * A savings-goal tile: a {@link ProgressRing} showing percent-to-target beside
 * a saved / target breakdown and an optional deadline. Progress is
 * `savedCents / targetCents` (guarded against a non-positive target), amounts
 * are integer cents through {@link MoneyAmount}, and the "to go" figure is the
 * remaining cents. Token-bound throughout.
 */
export function SavingsGoalCard({
  title,
  savedCents,
  targetCents,
  currency = 'USD',
  deadline,
  color = 'success',
  formatMoney: format = formatMoney,
  appearance = 'classic',
  style,
}: SavingsGoalCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const saved = Number.isFinite(savedCents) ? Math.max(Math.trunc(savedCents), 0) : 0;
  const target = Number.isFinite(targetCents) ? Math.trunc(targetCents) : 0;
  const pct = target > 0 ? Math.min(saved / target, 1) : 0;
  const remaining = Math.max(target - saved, 0);

  // Appearance overrides the Card's default surface; classic → unchanged.
  const surface = appearance === 'classic' ? undefined : appearanceStyle(appearance, colors, tokens);

  return (
    <Card style={[surface, style]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.lg }}>
        <ProgressRing
          value={pct * 100}
          max={100}
          size={84}
          strokeWidth={9}
          color={color}
          accessibilityLabel={`${title}, ${Math.round(pct * 100)}% saved`}
        />
        <View style={{ flex: 1, gap: tokens.spacing.xs }}>
          <Text
            numberOfLines={1}
            style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}
          >
            {title}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }}>
            <MoneyAmount cents={saved} currency={currency} tone="neutral" size="md" />
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
              / {format(target, currency)}
            </Text>
          </View>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {format(remaining, currency)} to go{deadline != null ? ` · by ${deadline}` : ''}
          </Text>
        </View>
      </View>
    </Card>
  );
}
