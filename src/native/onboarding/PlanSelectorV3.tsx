import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Badge, Icon, Segmented } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import { usePressScale } from '../primitives/internal/motion';
import type { PlanSelectorProps } from './PlanSelector';
import type { BillingPeriod, PlanTier } from './types';

/** Drop-in for {@link PlanSelector} — identical props, different design. */
export type PlanSelectorV3Props = PlanSelectorProps;

/** One full-width comparison row. */
function PlanRow({
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
  const press = usePressScale(0.99);

  return (
    <Animated.View style={{ transform: [{ scale: press.scale }] }}>
      <Pressable
        accessibilityRole="radio"
        accessibilityState={{ selected }}
        accessibilityLabel={`${plan.name}, ${price}`}
        onPress={onPress}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          padding: tokens.spacing.lg,
          borderRadius: tokens.radius.lg,
          backgroundColor: selected ? withAlpha(colors.primary, 0.08) : colors.surface,
          borderWidth: 1,
          borderColor: selected ? colors.primary : colors.border,
        }}
      >
        {/* Radio indicator. */}
        <View
          style={{
            width: 22,
            height: 22,
            borderRadius: tokens.radius.full,
            borderWidth: 2,
            borderColor: selected ? colors.primary : colors.border,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: selected ? colors.primary : 'transparent',
          }}
        >
          {selected ? <Icon glyph="✓" size="xs" color="onPrimary" /> : null}
        </View>

        {/* Name + features summary. */}
        <View style={{ flex: 1, gap: tokens.spacing.xs }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
            <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}>
              {plan.name}
            </Text>
            {plan.badge ? <Badge tone="primary">{plan.badge}</Badge> : null}
          </View>
          {plan.features?.length ? (
            <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
              {plan.features.join(' · ')}
            </Text>
          ) : null}
        </View>

        {/* Price column. */}
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xl, fontWeight: '800' }}>
            {price}
          </Text>
          {plan.priceCaption ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
              {plan.priceCaption}
            </Text>
          ) : null}
        </View>
      </Pressable>
    </Animated.View>
  );
}

/**
 * Subscription tier picker — V3. A stacked comparison layout: a monthly/annual
 * {@link Segmented} toggle over full-width rows that align name, feature summary
 * and price into columns for easy scanning, each row a `radio` with a circular
 * indicator. The selected row fills with a faint primary tint. Same
 * `radiogroup` semantics and caller-formatted prices as {@link PlanSelector};
 * empty list guarded. Token-pure.
 */
export function PlanSelectorV3({
  plans,
  selectedPlanId,
  onSelectPlan,
  billingPeriod = 'monthly',
  onBillingPeriodChange,
  showBillingToggle = true,
  annualSavingsLabel,
  style,
}: PlanSelectorV3Props): React.ReactElement {
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
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.sm }}>
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

      <View accessibilityRole="radiogroup" accessibilityLabel="Choose a plan" style={{ gap: tokens.spacing.sm }}>
        {plans.map((plan) => (
          <PlanRow
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
