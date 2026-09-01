import * as React from 'react';
import { Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Badge, Icon, Segmented, Text } from '../primitives';
import type { BillingPeriod, PlanTier } from './types';

/*
  Geometry the onboarding spec fixes by number (§10.1): the selected card's ring
  is 2px, an unselected card's outline is the 1px hairline. Everything else —
  radius, padding, colour — is a token.
*/
const RING = 2;
const HAIRLINE = 1;

/** How many cards sit on one row. A lone plan takes the full width (§7). */
const COLUMNS = 2;

/** Two-up cards (§7) or the original stacked list. */
export type PlanSelectorLayout = 'cards' | 'list';

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
  /**
   * `'cards'` is the reference paywall pair — two-up, equal width, the selected
   * one filled (§7). `'list'` is the older stacked rendering, still the right
   * shape for a settings screen. Default `'cards'`; the compact V3 line
   * defaults to `'list'` instead.
   */
  layout?: PlanSelectorLayout;
  style?: StyleProp<ViewStyle>;
}

/** Split `plans` into rows of `columns`, so every card keeps an equal width. */
export function chunkPlans(plans: PlanTier[], columns: number): PlanTier[][] {
  const rows: PlanTier[][] = [];
  for (let i = 0; i < plans.length; i += columns) rows.push(plans.slice(i, i + columns));
  return rows;
}

/**
 * The monthly/annual cadence toggle plus its savings pill — identical across
 * the three lines, so it lives in one place.
 */
export function BillingToggle({
  billingPeriod,
  onBillingPeriodChange,
  annualSavingsLabel,
  spread = false,
}: {
  billingPeriod: BillingPeriod;
  onBillingPeriodChange?: (period: BillingPeriod) => void;
  annualSavingsLabel?: string;
  spread?: boolean;
}): React.ReactElement {
  const { tokens } = useXenitionTheme();
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: spread ? 'space-between' : 'flex-start',
        gap: tokens.spacing.sm,
      }}
    >
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
  );
}

/**
 * One §7 plan card. Selected takes the `primary` fill plus the 2px ring;
 * unselected stays outlined. The "BEST"/"SAVE 20%" badge sits top-right of the
 * card it belongs to.
 */
function PlanCard({
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
        padding: tokens.spacing.lg,
        gap: tokens.spacing.sm,
        backgroundColor: selected ? colors.primary : colors.surface,
        borderWidth: selected ? RING : HAIRLINE,
        borderColor: selected ? colors.primary : plan.highlighted ? colors.accent : colors.border,
      }}
    >
      {/*
        Name left, badge top-right — and the row WRAPS.

        Two-up on a 390pt phone leaves roughly 150pt per card, and a badge that
        refuses to move takes its width out of the name: "Coached" rendered as
        "Coache" on the web twin. A plan's name is the thing being chosen, so
        it is the one element on the card that must never be shortened to make
        room for an ornament. When both do not fit, the badge takes its own
        line.
      */}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: tokens.spacing.xs }}>
        <Text size="base" weight="semibold" tone={fg}>
          {plan.name}
        </Text>
        {plan.badge ? (
          // §7 asks for the badge "in colors.success on successText". The
          // compiled palette has no legible form of that pair on a card: on web
          // the soft-success badge is a NEUTRAL ground with success text, and
          // successText is tuned for `surface`, not for a primary fill. The
          // solid success/onSuccess pair is the one that reads as "success" on
          // both an outlined and a filled card, and it is identical on both
          // twins — so that is what both use.
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
  );
}

/** The original stacked row — kept for `layout="list"`. */
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

  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      accessibilityLabel={`${plan.name}, ${price}`}
      onPress={onPress}
      style={{
        borderWidth: selected || plan.highlighted ? RING : HAIRLINE,
        borderColor: selected ? colors.primary : plan.highlighted ? colors.accent : colors.border,
        borderRadius: tokens.radius.lg,
        padding: tokens.spacing.lg,
        backgroundColor: colors.surface,
        gap: tokens.spacing.xs,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
          <Text size="lg" weight="bold">
            {plan.name}
          </Text>
          {plan.badge ? (
            <Badge tone="success" size="sm">
              {plan.badge}
            </Badge>
          ) : null}
        </View>
        {selected ? <Icon name="check" size="base" color="primary" accessibilityLabel="Selected" /> : null}
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }}>
        <Text size="2xl" weight="bold">
          {price}
        </Text>
        {plan.priceCaption ? (
          <Text size="sm" tone="muted">
            {plan.priceCaption}
          </Text>
        ) : null}
      </View>

      {plan.features?.length ? (
        <View style={{ gap: tokens.spacing.xs, marginTop: tokens.spacing.xs }}>
          {plan.features.map((f, i) => (
            <View key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
              <Icon name="check" size="sm" color="success" />
              <Text size="sm" tone="muted">
                {f}
              </Text>
            </View>
          ))}
        </View>
      ) : null}
    </Pressable>
  );
}

/**
 * Subscription tier picker — a `radiogroup` of plan cards plus an optional
 * monthly/annual {@link Segmented} toggle that swaps every card's price.
 *
 * The default is the reference pair (§7): two-up, equal width, `radius.lg`,
 * the selected card taking the `primary` fill and a 2px ring while the others
 * stay outlined, with a tier's "BEST"/"SAVE 20%" badge top-right of its own
 * card. A lone plan takes the full width rather than sitting in half a grid.
 * `layout="list"` restores the older stacked rows for dense contexts.
 *
 * Each card is a `radio` announcing its `selected` state; prices are
 * caller-formatted strings so the component never does currency math. Guards an
 * empty plan list. No literal colors.
 */
export function PlanSelector({
  plans,
  selectedPlanId,
  onSelectPlan,
  billingPeriod = 'monthly',
  onBillingPeriodChange,
  showBillingToggle = true,
  annualSavingsLabel,
  layout = 'cards',
  style,
}: PlanSelectorProps): React.ReactElement {
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
        />
      ) : null}

      <View accessibilityRole="radiogroup" accessibilityLabel="Choose a plan" style={{ gap: tokens.spacing.md }}>
        {layout === 'list'
          ? plans.map((plan) => (
              <PlanRow
                key={plan.id}
                plan={plan}
                price={priceOf(plan)}
                selected={plan.id === selectedPlanId}
                onPress={() => onSelectPlan?.(plan.id)}
              />
            ))
          : chunkPlans(plans, columns).map((row, i) => (
              <View key={i} style={{ flexDirection: 'row', alignItems: 'stretch', gap: tokens.spacing.md }}>
                {row.map((plan) => (
                  <PlanCard
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
