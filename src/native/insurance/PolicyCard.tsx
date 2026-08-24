import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { Card, Icon, Badge, type BadgeTone } from '../primitives';
import { formatMoney, type MoneyFormatter, withAlpha } from './internal/format';
import { policyVariant, type PolicyVariant } from './internal/status';

export type { PolicyVariant };

/** Coverage lifecycle of the policy itself (distinct from a claim status). */
export type PolicyStatus = 'active' | 'pending' | 'lapsed' | 'cancelled';

const POLICY_STATUS: Record<PolicyStatus, { label: string; glyph: string; tone: BadgeTone }> = {
  active: { label: 'Active', glyph: '✓', tone: 'success' },
  pending: { label: 'Pending', glyph: '⋯', tone: 'warn' },
  lapsed: { label: 'Lapsed', glyph: '!', tone: 'danger' },
  cancelled: { label: 'Cancelled', glyph: '✕', tone: 'neutral' },
};

/** Premium billing cadence. */
export type PremiumCadence = 'monthly' | 'quarterly' | 'annual';

const CADENCE_SUFFIX: Record<PremiumCadence, string> = {
  monthly: '/mo',
  quarterly: '/qtr',
  annual: '/yr',
};

export interface PolicyCardProps {
  /** Line of insurance — drives the leading glyph and label. */
  variant: PolicyVariant;
  /** Product / plan name (e.g. "Premier Auto"). */
  name: string;
  /** Policy identifier (e.g. "AUTO-4821-93"). */
  policyNumber: string;
  /** Total coverage / benefit amount in integer **cents**. */
  coverageCents: number;
  /** Recurring premium in integer **cents**. */
  premiumCents?: number;
  /** Premium billing cadence (default `monthly`). */
  cadence?: PremiumCadence;
  /** Policy lifecycle status (default `active`). */
  status?: PolicyStatus;
  /** Named insured / holder shown as a secondary line. */
  holder?: string;
  /** Localized renewal date string (already formatted by the caller). */
  renewalDate?: string;
  /** ISO 4217 currency code (default `USD`). */
  currency?: string;
  /** Override the cents → string formatter (locale control). */
  formatMoney?: MoneyFormatter;
  /** Fires on card press; the card is only a button when supplied. */
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A summary card for a single insurance policy. The `variant` (auto/home/life/
 * health) picks a tinted leading glyph disc; a status pill conveys the policy
 * lifecycle by **text + glyph + color** (never color alone). Coverage and
 * premium are integer cents funnelled through `formatMoney`, so printed values
 * never drift. Becomes a pressable button only when `onPress` is supplied.
 * Every color traces to a `SemanticColors` slot or a `ramps`-derived tint — no
 * literals.
 */
export function PolicyCard({
  variant,
  name,
  policyNumber,
  coverageCents,
  premiumCents,
  cadence = 'monthly',
  status = 'active',
  holder,
  renewalDate,
  currency = 'USD',
  formatMoney: format = formatMoney,
  onPress,
  style,
}: PolicyCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const vd = policyVariant(variant);
  const sd = POLICY_STATUS[status] ?? POLICY_STATUS.active;

  const body = (
    <Card variant={onPress ? 'interactive' : 'elevated'} style={style}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
        <View
          style={{
            width: 48,
            height: 48,
            borderRadius: tokens.radius.md,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: withAlpha(colors.primary, 0.12),
          }}
        >
          <Icon glyph={vd.glyph} size="xl" accessibilityLabel={`${vd.label} policy`} />
        </View>
        <View style={{ flex: 1, gap: 2 }}>
          <Text
            numberOfLines={1}
            style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}
          >
            {name}
          </Text>
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
            {vd.label} · {policyNumber}
          </Text>
        </View>
        <Badge tone={sd.tone} variant="soft">
          {`${sd.glyph} ${sd.label}`}
        </Badge>
      </View>

      {holder != null ? (
        <Text style={{ marginTop: tokens.spacing.sm, color: colors.muted, fontSize: tokens.typography.scale.xs }}>
          Insured: {holder}
        </Text>
      ) : null}

      <View
        style={{
          marginTop: tokens.spacing.md,
          paddingTop: tokens.spacing.md,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}
      >
        <View style={{ gap: 2 }}>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>Coverage</Text>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xl, fontWeight: '700' }}>
            {format(Math.max(0, Math.trunc(coverageCents || 0)), currency)}
          </Text>
        </View>
        {premiumCents != null ? (
          <View style={{ alignItems: 'flex-end', gap: 2 }}>
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>Premium</Text>
            <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }}>
              <Text style={{ color: colors.primary, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
                {format(Math.max(0, Math.trunc(premiumCents)), currency)}
              </Text>
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '400' }}>
                {CADENCE_SUFFIX[cadence]}
              </Text>
            </View>
          </View>
        ) : null}
      </View>

      {renewalDate != null ? (
        <Text style={{ marginTop: tokens.spacing.sm, color: colors.muted, fontSize: tokens.typography.scale.xs }}>
          Renews {renewalDate}
        </Text>
      ) : null}
    </Card>
  );

  if (!onPress) return body;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${name}, ${vd.label} policy, ${sd.label}`}
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
    >
      {body}
    </Pressable>
  );
}
