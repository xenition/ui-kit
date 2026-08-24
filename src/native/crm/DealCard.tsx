import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Card, Avatar } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import { formatMoney } from '../commerce/money';
import { WinLossBadge } from './WinLossBadge';
import { clampPct, type DealOutcome } from './internal';
export type { DealOutcome } from './internal';

export type DealCardVariant = 'default' | 'compact' | 'highlighted';

export interface DealOwner {
  name?: string;
  avatarUrl?: string;
}

export interface DealCardProps {
  /** Deal / opportunity name. */
  name: string;
  /** Account or company the deal belongs to. */
  company?: string;
  /** Deal value in integer **cents**. */
  valueCents: number;
  /** ISO 4217 currency (default USD). */
  currency?: string;
  /** Named pipeline stage (e.g. "Negotiation"). */
  stage?: string;
  /** Win probability 0–100. Rendered as a labelled meter. */
  probability?: number;
  /** Deal owner / rep — shown as an avatar. */
  owner?: DealOwner;
  /** Expected/actual close date, pre-formatted for display. */
  closeDate?: string;
  /** Lifecycle result. `won` reads success, `lost` reads danger. */
  outcome?: DealOutcome;
  /** Visual density / emphasis. */
  variant?: DealCardVariant;
  /** Show a shimmer-free placeholder skeleton instead of content. */
  loading?: boolean;
  /** Tap handler for the whole card. */
  onPress?: () => void;
  testID?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * Summary card for a single deal / opportunity: name, account, value, stage,
 * win-probability meter, owner avatar and outcome badge. `compact` drops the
 * meter and secondary meta for list use; `highlighted` tints the surface with a
 * token-derived primary wash for the focused deal. Value is integer cents run
 * through the shared `formatMoney`. Outcome is conveyed by {@link WinLossBadge}
 * (glyph + word), so it never depends on color alone. Renders a `loading`
 * skeleton on demand. All colors are theme tokens — no literals.
 */
export function DealCard({
  name,
  company,
  valueCents,
  currency = 'USD',
  stage,
  probability,
  owner,
  closeDate,
  outcome = 'open',
  variant = 'default',
  loading = false,
  onPress,
  testID,
  style,
}: DealCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const compact = variant === 'compact';
  const highlighted = variant === 'highlighted';
  const pct = clampPct(probability);
  const showMeter = !compact && probability != null;

  const container = (
    <Card
      variant={highlighted ? 'elevated' : 'outlined'}
      padding={compact ? 'sm' : 'md'}
      style={[
        highlighted ? { backgroundColor: withAlpha(colors.primary, 0.06), borderColor: colors.primary } : null,
        { gap: tokens.spacing.sm },
        style,
      ]}
    >
      {loading ? (
        <View accessibilityLabel="Loading deal" style={{ gap: tokens.spacing.sm }}>
          <View style={{ height: tokens.typography.scale.lg, width: '70%', borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
          <View style={{ height: tokens.typography.scale.sm, width: '40%', borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
        </View>
      ) : (
        <>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: tokens.spacing.sm }}>
            <View style={{ flex: 1, gap: 2 }}>
              <Text numberOfLines={2} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
                {name}
              </Text>
              {company ? (
                <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
                  {company}
                </Text>
              ) : null}
            </View>
            <WinLossBadge outcome={outcome} size="sm" />
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.sm }}>
            <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}>
              {formatMoney(valueCents, currency)}
            </Text>
            {stage ? (
              <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
                {stage}
              </Text>
            ) : null}
          </View>

          {showMeter ? (
            <View style={{ gap: tokens.spacing.xs / 2 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>Probability</Text>
                <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>{pct}%</Text>
              </View>
              <View
                accessibilityRole="progressbar"
                accessibilityValue={{ min: 0, max: 100, now: pct }}
                style={{ height: 6, borderRadius: tokens.radius.full, backgroundColor: colors.border, overflow: 'hidden' }}
              >
                <View style={{ width: `${pct}%`, height: '100%', backgroundColor: colors.primary }} />
              </View>
            </View>
          ) : null}

          {!compact && (owner || closeDate) ? (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.sm }}>
              {owner ? (
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
                  <Avatar size="xs" name={owner.name} src={owner.avatarUrl} />
                  {owner.name ? (
                    <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
                      {owner.name}
                    </Text>
                  ) : null}
                </View>
              ) : (
                <View />
              )}
              {closeDate ? (
                <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{closeDate}</Text>
              ) : null}
            </View>
          ) : null}
        </>
      )}
    </Card>
  );

  if (onPress && !loading) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Deal ${name}${company ? `, ${company}` : ''}`}
        onPress={onPress}
        testID={testID}
      >
        {container}
      </Pressable>
    );
  }
  return <View testID={testID}>{container}</View>;
}
