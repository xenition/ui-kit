import * as React from 'react';
import { Animated, Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Badge, Icon, Text } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import { usePressScale } from '../primitives/internal/motion';
import { BillingToggle, chunkPlans, type PlanSelectorProps } from './PlanSelector';
import type { PlanTier } from './types';

/** Drop-in for {@link PlanSelector} — identical props, different design. */
export type PlanSelectorV3Props = PlanSelectorProps;

/* §10.1 geometry: 2px selection ring, 1px hairline outline, 44 tap target. */
const RING = 2;
const HAIRLINE = 1;
const CONTROL = 44;
const COLUMNS = 2;

/** One dense comparison row. */
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
          minHeight: CONTROL,
          paddingHorizontal: tokens.spacing.md,
          paddingVertical: tokens.spacing.sm,
          borderRadius: tokens.radius.lg,
          backgroundColor: selected ? withAlpha(colors.primary, 0.08) : colors.surface,
          borderWidth: selected ? RING : HAIRLINE,
          borderColor: selected ? colors.primary : colors.border,
        }}
      >
        {/* Radio indicator. */}
        <View
          style={{
            width: tokens.spacing.lg,
            height: tokens.spacing.lg,
            borderRadius: tokens.radius.full,
            borderWidth: RING,
            borderColor: selected ? colors.primary : colors.border,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: selected ? colors.primary : colors.surface,
          }}
        >
          {selected ? <Icon name="check" size="xs" color="onPrimary" /> : null}
        </View>

        <View style={{ flex: 1, gap: tokens.spacing.xs }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
            <Text size="base" weight="semibold">
              {plan.name}
            </Text>
            {plan.badge ? (
              <Badge tone="success" size="sm">
                {plan.badge}
              </Badge>
            ) : null}
          </View>
          {plan.features?.length ? (
            <Text size="sm" tone="muted" numberOfLines={1}>
              {plan.features.join(' · ')}
            </Text>
          ) : null}
        </View>

        <View style={{ alignItems: 'flex-end' }}>
          <Text size="lg" weight="bold">
            {price}
          </Text>
          {plan.priceCaption ? (
            <Text size="xs" tone="muted">
              {plan.priceCaption}
            </Text>
          ) : null}
        </View>
      </Pressable>
    </Animated.View>
  );
}

/** One §7 card, used when a V3 host explicitly asks for `layout="cards"`. */
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
  const fg = selected ? 'onPrimary' : 'onSurface';

  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      accessibilityLabel={`${plan.name}, ${price}`}
      onPress={onPress}
      style={{
        flex: 1,
        borderRadius: tokens.radius.lg,
        padding: tokens.spacing.md,
        gap: tokens.spacing.xs,
        backgroundColor: selected ? colors.primary : colors.surface,
        borderWidth: selected ? RING : HAIRLINE,
        borderColor: selected ? colors.primary : colors.border,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: tokens.spacing.xs }}>
        <Text size="sm" weight="semibold" tone={fg} style={{ flexShrink: 1 }}>
          {plan.name}
        </Text>
        {plan.badge ? (
          <Badge tone="success" size="sm">
            {plan.badge}
          </Badge>
        ) : null}
      </View>
      <Text size="lg" weight="bold" tone={fg}>
        {price}
      </Text>
      {plan.priceCaption ? (
        <Text size="xs" tone={selected ? 'onPrimary' : 'muted'}>
          {plan.priceCaption}
        </Text>
      ) : null}
    </Pressable>
  );
}

/**
 * Subscription tier picker — V3, the compact line. Dense selectable rows that
 * align a radio indicator, the name (+ its badge), a one-line feature summary
 * and the price into scannable columns; the selected row keeps the 2px ring and
 * a faint primary tint. This is the one selector whose `layout` defaults to
 * `'list'` — a dense sheet is what the V3 line is *for* — and passing
 * `layout="cards"` gives the §7 pair at compact sizing.
 *
 * Same `radiogroup` semantics and caller-formatted prices as
 * {@link PlanSelector}; empty list guarded. Token-pure.
 */
export function PlanSelectorV3({
  plans,
  selectedPlanId,
  onSelectPlan,
  billingPeriod = 'monthly',
  onBillingPeriodChange,
  showBillingToggle = true,
  annualSavingsLabel,
  layout = 'list',
  style,
}: PlanSelectorV3Props): React.ReactElement {
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
  const columns = plans.length === 1 ? 1 : COLUMNS;

  return (
    <View style={[{ gap: tokens.spacing.md }, style]}>
      {showBillingToggle ? (
        <BillingToggle
          billingPeriod={billingPeriod}
          onBillingPeriodChange={onBillingPeriodChange}
          annualSavingsLabel={annualSavingsLabel}
          spread
        />
      ) : null}

      <View accessibilityRole="radiogroup" accessibilityLabel="Choose a plan" style={{ gap: tokens.spacing.sm }}>
        {layout === 'cards'
          ? chunkPlans(plans, columns).map((row, i) => (
              <View key={i} style={{ flexDirection: 'row', alignItems: 'stretch', gap: tokens.spacing.sm }}>
                {row.map((plan) => (
                  <TierCard
                    key={plan.id}
                    plan={plan}
                    price={priceOf(plan)}
                    selected={plan.id === selectedPlanId}
                    onPress={() => onSelectPlan?.(plan.id)}
                  />
                ))}
                {row.length < columns ? <View style={{ flex: 1 }} /> : null}
              </View>
            ))
          : plans.map((plan) => (
              <PlanRow
                key={plan.id}
                plan={plan}
                price={priceOf(plan)}
                selected={plan.id === selectedPlanId}
                onPress={() => onSelectPlan?.(plan.id)}
              />
            ))}
      </View>
    </View>
  );
}
