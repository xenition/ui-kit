import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Badge, Icon, Segmented } from '../primitives';
import { shadow } from '../primitives/internal/elevation';
import { usePressScale } from '../primitives/internal/motion';
import type { PlanSelectorProps } from './PlanSelector';
import type { BillingPeriod, PlanTier } from './types';

/** Drop-in for {@link PlanSelector} — identical props, different design. */
export type PlanSelectorV2Props = PlanSelectorProps;

/** One elevated tier card in the side-by-side row. */
function TierCard({
  plan,
  price,
  selected,
  onPress,
}: {
  plan: PlanTier;
  price: string;
  selected: boolean;
  onPress: () => void;
}): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const press = usePressScale();
  const emphasized = selected || plan.highlighted;

  return (
    <Animated.View style={{ flex: 1, transform: [{ scale: press.scale }] }}>
      <Pressable
        accessibilityRole="radio"
        accessibilityState={{ selected }}
        accessibilityLabel={`${plan.name}, ${price}`}
        onPress={onPress}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
        style={{
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.lg,
          gap: tokens.spacing.sm,
          backgroundColor: colors.surface,
          borderWidth: emphasized ? 2 : 1,
          borderColor: selected ? colors.primary : plan.highlighted ? colors.accent : colors.border,
          ...shadow(plan.highlighted ? 'lg' : 'md', tokens),
        }}
      >
        {plan.badge ? (
          <View style={{ alignSelf: 'flex-start' }}>
            <Badge tone="primary">{plan.badge}</Badge>
          </View>
        ) : null}

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}>
            {plan.name}
          </Text>
          {selected ? <Icon glyph="✓" size="base" color="primary" accessibilityLabel="Selected" /> : null}
        </View>

        <View style={{ gap: tokens.spacing.xs }}>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale['3xl'], fontWeight: '800' }}>
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
              <View key={i} style={{ flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.xs }}>
                <Icon glyph="✓" size="sm" color="success" />
                <Text style={{ flex: 1, color: colors.muted, fontSize: tokens.typography.scale.sm }}>{f}</Text>
              </View>
            ))}
          </View>
        ) : null}
      </Pressable>
    </Animated.View>
  );
}

/**
 * Subscription tier picker — V2. The tiers sit side-by-side as elevated,
 * shadowed cards (rather than a stacked list), with the "popular"/highlighted
 * tier lifted by a stronger shadow, an accent border and its ribbon badge. Keeps
 * the monthly/annual {@link Segmented} toggle and the `radiogroup`/`radio`
 * semantics; prices stay caller-formatted. Guards an empty list. Token-pure.
 */
export function PlanSelectorV2({
  plans,
  selectedPlanId,
  onSelectPlan,
  billingPeriod = 'monthly',
  onBillingPeriodChange,
  showBillingToggle = true,
  annualSavingsLabel,
  style,
}: PlanSelectorV2Props): React.ReactElement {
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
    <View style={[{ gap: tokens.spacing.lg }, style]}>
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
        style={{ flexDirection: 'row', alignItems: 'stretch', gap: tokens.spacing.md }}
      >
        {plans.map((plan) => (
          <TierCard
            key={plan.id}
            plan={plan}
            price={billingPeriod === 'annual' ? plan.annualPrice : plan.monthlyPrice}
            selected={plan.id === selectedPlanId}
            onPress={() => onSelectPlan?.(plan.id)}
          />
        ))}
      </View>
    </View>
  );
}
