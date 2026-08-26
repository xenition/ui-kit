import * as React from 'react';
import { Animated, Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Badge, Icon, Text } from '../primitives';
import { shadow } from '../primitives/internal/elevation';
import { usePressScale } from '../primitives/internal/motion';
import { BillingToggle, chunkPlans, type PlanSelectorProps } from './PlanSelector';
import type { PlanTier } from './types';

/** Drop-in for {@link PlanSelector} — identical props, different design. */
export type PlanSelectorV2Props = PlanSelectorProps;

/* §10.1 geometry: 2px selection ring, 1px hairline outline. */
const RING = 2;
const HAIRLINE = 1;
const COLUMNS = 2;

/** One elevated §7 tier card in the side-by-side pair. */
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
  const fg = selected ? 'onPrimary' : 'onSurface';

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
          backgroundColor: selected ? colors.primary : colors.surface,
          borderWidth: selected ? RING : HAIRLINE,
          borderColor: selected ? colors.primary : plan.highlighted ? colors.accent : colors.border,
          ...shadow(plan.highlighted || selected ? 'lg' : 'md', tokens),
        }}
      >
        {/* Name left, badge top-right of its own card (§7). */}
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: tokens.spacing.xs }}>
          <Text size="base" weight="semibold" tone={fg} style={{ flexShrink: 1 }}>
            {plan.name}
          </Text>
          {plan.badge ? (
            <Badge tone="success" size="sm">
              {plan.badge}
            </Badge>
          ) : null}
        </View>

        <View style={{ gap: tokens.spacing.xs }}>
          <Text size="2xl" weight="bold" tone={fg}>
            {price}
          </Text>
          {plan.priceCaption ? (
            <Text size="sm" tone={selected ? 'onPrimary' : 'muted'}>
              {plan.priceCaption}
            </Text>
          ) : null}
        </View>

        {plan.features?.length ? (
          <View style={{ gap: tokens.spacing.xs }}>
            {plan.features.map((f, i) => (
              <View key={i} style={{ flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.xs }}>
                <Icon name="check" size="sm" color={selected ? 'onPrimary' : 'success'} />
                <Text size="sm" tone={selected ? 'onPrimary' : 'muted'} style={{ flex: 1 }}>
                  {f}
                </Text>
              </View>
            ))}
          </View>
        ) : null}
      </Pressable>
    </Animated.View>
  );
}

/**
 * Subscription tier picker — V2, the editorial line. The §7 card pair, lifted:
 * two-up and equal width like the base selector, but shadowed and press-scaled,
 * with the selected card taking the `primary` fill, the 2px ring and the
 * stronger elevation. A lone plan takes the full width rather than half a grid.
 *
 * `layout="list"` still stacks the same cards for a dense context. Keeps the
 * monthly/annual toggle and the `radiogroup`/`radio` semantics; prices stay
 * caller-formatted. Guards an empty list. Token-pure.
 */
export function PlanSelectorV2({
  plans,
  selectedPlanId,
  onSelectPlan,
  billingPeriod = 'monthly',
  onBillingPeriodChange,
  showBillingToggle = true,
  annualSavingsLabel,
  layout = 'cards',
  style,
}: PlanSelectorV2Props): React.ReactElement {
  const { tokens } = useXenitionTheme();

  if (plans.length === 0) {
    return (
      <View accessibilityRole="summary" style={[{ padding: tokens.spacing.lg, alignItems: 'center' }, style]}>
        <Text size="base" tone="muted">
          No plans available.
        </Text>
      </View>
    );
  }

  const priceOf = (plan: PlanTier): string =>
    billingPeriod === 'annual' ? plan.annualPrice : plan.monthlyPrice;
  const columns = layout === 'list' || plans.length === 1 ? 1 : COLUMNS;

  return (
    <View style={[{ gap: tokens.spacing.lg }, style]}>
      {showBillingToggle ? (
        <BillingToggle
          billingPeriod={billingPeriod}
          onBillingPeriodChange={onBillingPeriodChange}
          annualSavingsLabel={annualSavingsLabel}
        />
      ) : null}

      <View accessibilityRole="radiogroup" accessibilityLabel="Choose a plan" style={{ gap: tokens.spacing.md }}>
        {chunkPlans(plans, columns).map((row, i) => (
          <View key={i} style={{ flexDirection: 'row', alignItems: 'stretch', gap: tokens.spacing.md }}>
            {row.map((plan) => (
              <TierCard
                key={plan.id}
                plan={plan}
                price={priceOf(plan)}
                selected={plan.id === selectedPlanId}
                onPress={() => onSelectPlan?.(plan.id)}
              />
            ))}
            {/* Keeps the last card the same width as the others. */}
            {row.length < columns ? <View style={{ flex: 1 }} /> : null}
          </View>
        ))}
      </View>
    </View>
  );
}
