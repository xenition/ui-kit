import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Badge, Icon, Segmented } from '../primitives';
import type { BillingPeriod, PlanTier } from './types';

export interface PlanSelectorProps {
  /** Tiers to choose from. Empty renders the empty state. */
  plans: PlanTier[];
  /** Currently selected tier id (controlled). */
  selectedPlanId?: string;
  /** Fires with the tapped tier id. */
  onSelectPlan?: (planId: string) => void;
  /** Active billing cadence (controlled). Default `'monthly'`. */
  billingPeriod?: BillingPeriod;
  /** Fires when the monthly/annual toggle changes. */
  onBillingPeriodChange?: (period: BillingPeriod) => void;
  /** Show the monthly/annual toggle. Default `true`. */
  showBillingToggle?: boolean;
  /** Savings pill copy shown beside the annual toggle (e.g. `'Save 20%'`). */
  annualSavingsLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * Subscription tier picker — a `radiogroup` of pressable plan cards plus an
 * optional monthly/annual {@link Segmented} toggle that swaps every card's
 * price. The selected card lifts to the primary border and shows a check; each
 * card is a `radio` announcing its `selected` state to screen readers. Prices
 * are caller-formatted strings so the component never does currency math. Guards
 * an empty plan list. No literal colors.
 */
export function PlanSelector({
  plans,
  selectedPlanId,
  onSelectPlan,
  billingPeriod = 'monthly',
  onBillingPeriodChange,
  showBillingToggle = true,
  annualSavingsLabel,
  style,
}: PlanSelectorProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  if (plans.length === 0) {
    return (
      <View accessibilityRole="summary" style={[{ padding: tokens.spacing.lg, alignItems: 'center' }, style]}>
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.base }}>
          No plans available.
        </Text>
      </View>
    );
  }

  return (
    <View style={[{ gap: tokens.spacing.md }, style]}>
      {showBillingToggle ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
          <Segmented
            options={[
              { label: 'Monthly', value: 'monthly' },
              { label: 'Annual', value: 'annual' },
            ]}
            value={billingPeriod}
            onChange={(v) => onBillingPeriodChange?.(v as BillingPeriod)}
          />
          {annualSavingsLabel && billingPeriod === 'annual' ? (
            <Badge tone="success">{annualSavingsLabel}</Badge>
          ) : null}
        </View>
      ) : null}

      <View
        accessibilityRole="radiogroup"
        accessibilityLabel="Choose a plan"
        style={{ gap: tokens.spacing.sm }}
      >
        {plans.map((plan) => {
          const selected = plan.id === selectedPlanId;
          const price = billingPeriod === 'annual' ? plan.annualPrice : plan.monthlyPrice;
          return (
            <Pressable
              key={plan.id}
              accessibilityRole="radio"
              accessibilityState={{ selected }}
              accessibilityLabel={`${plan.name}, ${price}`}
              onPress={() => onSelectPlan?.(plan.id)}
              style={{
                borderWidth: selected || plan.highlighted ? 2 : 1,
                borderColor: selected ? colors.primary : plan.highlighted ? colors.accent : colors.border,
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.lg,
                backgroundColor: colors.surface,
                gap: tokens.spacing.xs,
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
                  <Text
                    style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}
                  >
                    {plan.name}
                  </Text>
                  {plan.badge ? <Badge tone="primary">{plan.badge}</Badge> : null}
                </View>
                {selected ? <Icon glyph="✓" size="base" color="primary" accessibilityLabel="Selected" /> : null}
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }}>
                <Text
                  style={{ color: colors.onSurface, fontSize: tokens.typography.scale['2xl'], fontWeight: '700' }}
                >
                  {price}
                </Text>
                {plan.priceCaption ? (
                  <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
                    {plan.priceCaption}
                  </Text>
                ) : null}
              </View>

              {plan.features?.length ? (
                <View style={{ gap: tokens.spacing.xs, marginTop: tokens.spacing.xs }}>
                  {plan.features.map((f, i) => (
                    <View key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
                      <Icon glyph="✓" size="sm" color="success" />
                      <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{f}</Text>
                    </View>
                  ))}
                </View>
              ) : null}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
