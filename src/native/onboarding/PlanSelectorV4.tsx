import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { BadgeV4 } from '../primitives/BadgeV4';
import { IconV4 } from '../primitives/IconV4';
import { SegmentedV4 } from '../primitives/SegmentedV4';
import { TextV4 } from '../primitives/TextV4';
import { pressOver } from '../primitives/internal/state-v4';
import { elevationStyle } from '../primitives/internal/surface-v4';
import { flowGrounds, type OnboardingAccentV4 } from './internal/flow-v4';
import { chunkPlans, type PlanSelectorProps } from './PlanSelector';
import type { BillingPeriod, PlanTier } from './types';

/**
 * `'offer'` is the reference paywall's single-plan card: one price, its struck
 * compare-at, a savings pill and a per-unit caption. `'cards'` and `'list'`
 * behave exactly as the base's do.
 */
export type PlanSelectorV4Layout = 'cards' | 'list' | 'offer';

export interface PlanSelectorV4Props extends Omit<PlanSelectorProps, 'layout'> {
  /** Default `'cards'`, as the base. `'offer'` is new — see {@link PlanSelectorV4Layout}. */
  layout?: PlanSelectorV4Layout;
  /** Which brand slot selection answers in. Default `'primary'`. */
  accent?: OnboardingAccentV4;
  /** Copy for the empty state. Default `'No plans available.'`. */
  emptyMessage?: string;
}

/* Geometry the spec fixes by number (§10.1): the selected ring is 2px, an
   unselected outline is the 1px hairline. */
const RING = 2;
const HAIRLINE = 1;

/** How many cards sit on one row. A lone plan takes the full width (§7). */
const COLUMNS = 2;

/** The price a plan shows for the active cadence. */
function priceFor(plan: PlanTier, period: BillingPeriod): string {
  return period === 'annual' ? plan.annualPrice : plan.monthlyPrice;
}

/**
 * The undiscounted price for the active cadence — **only** when it is
 * genuinely different from the price being charged.
 *
 * A "was" price equal to the "now" price is a fabricated discount, and this is
 * the one place the component gets to refuse to draw one. It cannot compare
 * magnitudes, because both are already-formatted strings in the host's
 * currency and locale, so it compares them as the host wrote them: identical
 * strings are not a discount.
 */
function compareAtFor(plan: PlanTier, period: BillingPeriod): string | null {
  const was = period === 'annual' ? plan.compareAtAnnualPrice : plan.compareAtMonthlyPrice;
  if (!was) return null;
  return was === priceFor(plan, period) ? null : was;
}

/** The monthly/annual toggle plus its savings pill, on the V4 segmented control. */
function BillingToggleV4({
  billingPeriod,
  onBillingPeriodChange,
  annualSavingsLabel,
}: {
  billingPeriod: BillingPeriod;
  onBillingPeriodChange?: (period: BillingPeriod) => void;
  annualSavingsLabel?: string;
}): React.ReactElement {
  const { tokens } = useXenitionTheme();
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: tokens.spacing.sm,
      }}
    >
      <SegmentedV4
        options={[
          { label: 'Monthly', value: 'monthly' },
          { label: 'Annual', value: 'annual' },
        ]}
        value={billingPeriod}
        onChange={(v) => onBillingPeriodChange?.(v as BillingPeriod)}
      />
      {annualSavingsLabel && billingPeriod === 'annual' ? (
        <BadgeV4 tone="success" variant="soft">
          {annualSavingsLabel}
        </BadgeV4>
      ) : null}
    </View>
  );
}

/**
 * The `'offer'` card — the reference paywall's plan block, exactly.
 *
 * ```
 * ┌──────────────────────────────────────────────┐
 * │ Yearly plan  [20% OFF]              $̶2̶9̶.̶9̶9̶   │
 * │ $23.99 / year                   $0.07/day    │
 * └──────────────────────────────────────────────┘
 * ```
 *
 * The price is the largest thing on it, because the price is the decision.
 * The struck compare-at is **announced**, not just drawn: "$29.99 $23.99" read
 * aloud as a pair tells a screen reader user nothing about which is which.
 */
function OfferCard({
  plan,
  period,
  selected,
  onPress,
  accent,
}: {
  plan: PlanTier;
  period: BillingPeriod;
  selected: boolean;
  onPress: () => void;
  accent: OnboardingAccentV4;
}): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens, elevation } = theme;
  const grounds = flowGrounds(theme, 'plain', accent);

  const price = priceFor(plan, period);
  const was = compareAtFor(plan, period);
  const caption = plan.priceCaption ?? (period === 'annual' ? '/ year' : '/ month');

  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      accessibilityLabel={[
        plan.name,
        plan.savingsLabel,
        was ? `was ${was},` : null,
        `now ${price} ${caption}`,
        plan.perUnitPrice,
      ]
        .filter(Boolean)
        .join(', ')}
      onPress={onPress}
      style={({ pressed }) => [
        {
          alignSelf: 'stretch',
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.lg,
          gap: tokens.spacing.sm,
          // The offer card is the one raised object on the page — the ground
          // is `card`, not `surface`, so it separates from the page in dark
          // mode too, where a shadow alone is nearly invisible.
          backgroundColor: pressed ? pressOver(theme, colors.card, colors.onCard) : colors.card,
          borderWidth: selected ? RING : HAIRLINE,
          borderColor: selected ? grounds.fill : colors.border,
        },
        elevationStyle(elevation.card),
      ]}
    >
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: tokens.spacing.sm,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.sm,
            flexShrink: 1,
          }}
        >
          <TextV4 size="base" weight="bold" tone="onCard" style={{ flexShrink: 1 }}>
            {plan.name}
          </TextV4>
          {plan.savingsLabel ? (
            <BadgeV4 tone="success" variant="soft" size="sm">
              {plan.savingsLabel}
            </BadgeV4>
          ) : null}
        </View>

        {was ? (
          <TextV4
            size="base"
            tone="mutedText"
            numeric="tabular"
            // A struck price is a fact about the past, and the label is what
            // carries that to a reader who cannot see the line through it.
            accessibilityLabel={`Was ${was}`}
            style={{ textDecorationLine: 'line-through' }}
          >
            {was}
          </TextV4>
        ) : null}
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          gap: tokens.spacing.sm,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'baseline',
            gap: tokens.spacing.xs,
            flexShrink: 1,
          }}
        >
          <TextV4 face="heading" size="3xl" weight="bold" tone="onCard" numeric="tabular">
            {price}
          </TextV4>
          <TextV4 size="lg" weight="semibold" tone="mutedText">
            {caption}
          </TextV4>
        </View>
        {plan.perUnitPrice ? (
          <TextV4 size="base" weight="semibold" tone="mutedText" numeric="tabular">
            {plan.perUnitPrice}
          </TextV4>
        ) : null}
      </View>

      {plan.features && plan.features.length > 0 ? (
        <View style={{ gap: tokens.spacing.xs, marginTop: tokens.spacing.xs }}>
          {plan.features.map((feature) => (
            <View
              key={feature}
              style={{ flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.sm }}
            >
              <IconV4 name="check" size="sm" color="successText" />
              <TextV4 size="sm" tone="onCard" style={{ flex: 1 }}>
                {feature}
              </TextV4>
            </View>
          ))}
        </View>
      ) : null}
    </Pressable>
  );
}

/** One §7 plan card — two-up, selected filled, badge top-right, name never clipped. */
function PlanCardV4({
  plan,
  price,
  was,
  selected,
  onPress,
  accent,
}: {
  plan: PlanTier;
  price: string;
  was: string | null;
  selected: boolean;
  onPress: () => void;
  accent: OnboardingAccentV4;
}): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  const grounds = flowGrounds(theme, 'plain', accent);
  const fill = selected ? grounds.fill : colors.card;
  const ink = selected ? grounds.onFill : colors.onCard;

  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      accessibilityLabel={[plan.name, was ? `was ${was},` : null, price].filter(Boolean).join(', ')}
      onPress={onPress}
      style={({ pressed }) => ({
        flex: 1,
        borderRadius: tokens.radius.lg,
        padding: tokens.spacing.lg,
        gap: tokens.spacing.sm,
        backgroundColor: pressed ? pressOver(theme, fill, ink) : fill,
        borderWidth: selected ? RING : HAIRLINE,
        borderColor: selected ? grounds.fill : colors.border,
      })}
    >
      {/*
        Name left, badge top-right — and the row WRAPS. Two-up on a 390pt phone
        leaves roughly 150pt a card, and a badge that refuses to move takes its
        width out of the name. The name is the thing being chosen; the ornament
        takes its own line instead.
      */}
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: tokens.spacing.xs,
        }}
      >
        <TextV4 size="base" weight="semibold" style={{ color: ink }}>
          {plan.name}
        </TextV4>
        {plan.badge ? (
          <BadgeV4 tone={selected ? 'neutral' : 'success'} variant="soft" size="sm">
            {plan.badge}
          </BadgeV4>
        ) : null}
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }}>
        <TextV4 face="heading" size="2xl" weight="bold" numeric="tabular" style={{ color: ink }}>
          {price}
        </TextV4>
        {was ? (
          <TextV4
            size="sm"
            numeric="tabular"
            accessibilityLabel={`Was ${was}`}
            style={{ color: ink, opacity: 0.7, textDecorationLine: 'line-through' }}
          >
            {was}
          </TextV4>
        ) : null}
      </View>

      {plan.priceCaption ? (
        <TextV4 size="xs" style={{ color: ink, opacity: 0.8 }}>
          {plan.priceCaption}
        </TextV4>
      ) : null}

      {plan.features && plan.features.length > 0 ? (
        <View style={{ gap: tokens.spacing.xs }}>
          {plan.features.map((feature) => (
            <TextV4 key={feature} size="sm" style={{ color: ink }}>
              {feature}
            </TextV4>
          ))}
        </View>
      ) : null}
    </Pressable>
  );
}

/** The stacked list rendering — the right shape for a settings screen. */
function PlanRowV4({
  plan,
  price,
  was,
  selected,
  onPress,
  accent,
}: {
  plan: PlanTier;
  price: string;
  was: string | null;
  selected: boolean;
  onPress: () => void;
  accent: OnboardingAccentV4;
}): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  const grounds = flowGrounds(theme, 'plain', accent);

  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      accessibilityLabel={[plan.name, was ? `was ${was},` : null, price].filter(Boolean).join(', ')}
      onPress={onPress}
      style={({ pressed }) => ({
        flexDirection: 'row',
        alignItems: 'center',
        gap: tokens.spacing.md,
        borderRadius: tokens.radius.lg,
        padding: tokens.spacing.md,
        backgroundColor: pressed ? pressOver(theme, colors.card, colors.onCard) : colors.card,
        borderWidth: selected ? RING : HAIRLINE,
        borderColor: selected ? grounds.fill : colors.border,
      })}
    >
      {/*
        The radio mark, drawn rather than named: the icon set has a ✓ but no
        empty circle, and a check that simply vanishes when unselected leaves
        the row with no affordance at all. It is decoration beside a row that
        already announces its own selected state, so it is hidden from the
        reader rather than announced twice.
      */}
      <View
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        style={{
          width: tokens.spacing.lg,
          height: tokens.spacing.lg,
          borderRadius: tokens.radius.full,
          borderWidth: selected ? 0 : HAIRLINE,
          borderColor: colors.border,
          backgroundColor: selected ? grounds.fill : 'transparent',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {selected ? <IconV4 name="check" size="xs" style={{ color: grounds.onFill }} /> : null}
      </View>
      <View style={{ flex: 1, gap: tokens.spacing.xs }}>
        <TextV4 size="base" weight="semibold" tone="onCard">
          {plan.name}
        </TextV4>
        {plan.priceCaption ? (
          <TextV4 size="sm" tone="mutedText">
            {plan.priceCaption}
          </TextV4>
        ) : null}
      </View>
      <View style={{ alignItems: 'flex-end' }}>
        <TextV4 face="heading" size="lg" weight="bold" tone="onCard" numeric="tabular">
          {price}
        </TextV4>
        {was ? (
          <TextV4
            size="xs"
            tone="mutedText"
            numeric="tabular"
            accessibilityLabel={`Was ${was}`}
            style={{ textDecorationLine: 'line-through' }}
          >
            {was}
          </TextV4>
        ) : null}
      </View>
    </Pressable>
  );
}

/**
 * **V4 plan selector** — the base's props with `layout` widened to add
 * `'offer'`, plus `accent` and `emptyMessage`.
 *
 * ## Five changes
 *
 * 1. **`'offer'`.** The reference paywall does not offer a choice — it offers
 *    a *deal*, on one card, and the base could not draw it: `PlanTier` had one
 *    price per cadence, no compare-at, no savings pill, no per-unit caption.
 *    Those four fields are now on the type (all optional) and this is the
 *    layout that spends them. It renders the **selected** plan, or the first,
 *    and ignores the rest — a screen showing three offers is not an offer.
 * 2. **Cards sit on `card`, not `surface`.** Every card in the base module
 *    painted the same colour as the page behind it, so the border was doing
 *    all the work and a plan pair on a dark page read as one flat sheet.
 * 3. **A fabricated discount is refused.** A compare-at equal to the price is
 *    not drawn (see {@link compareAtFor}).
 * 4. **Both prices are announced.** A struck price carries `Was …`, so a
 *    screen reader handed two numbers knows which is which.
 * 5. **Press is a state layer.** M3's layer over the card's own fill, not
 *    `opacity` on its content — dimming content is what 0.38 means, and it
 *    made a pressed card look disabled.
 *
 * The empty state is a message, not a blank box, and its copy is a prop.
 */
export function PlanSelectorV4({
  plans,
  selectedPlanId,
  onSelectPlan,
  billingPeriod = 'monthly',
  onBillingPeriodChange,
  showBillingToggle = true,
  annualSavingsLabel,
  layout = 'cards',
  accent = 'primary',
  emptyMessage = 'No plans available.',
  style,
}: PlanSelectorV4Props): React.ReactElement {
  const { tokens } = useXenitionTheme();

  if (!plans || plans.length === 0) {
    return (
      <View
        accessibilityRole="summary"
        style={[{ padding: tokens.spacing.lg, alignItems: 'center' }, style]}
      >
        <TextV4 size="base" tone="mutedText">
          {emptyMessage}
        </TextV4>
      </View>
    );
  }

  const offer = layout === 'offer';
  // An offer screen shows one offer. `selectedPlanId` picks it so a host can
  // still swap the deal without changing the array it passes. `plans[0]` is
  // reachable — the empty case returned above — but the index signature does
  // not know that, so the fallback is explicit rather than asserted.
  const featured: PlanTier =
    plans.find((plan) => plan.id === selectedPlanId) ?? (plans[0] as PlanTier);
  const columns = plans.length === 1 ? 1 : COLUMNS;

  return (
    <View style={[{ alignSelf: 'stretch', gap: tokens.spacing.md }, style]}>
      {/* An offer has one cadence by definition — a toggle there would invite
          the user to leave the deal they were just shown. */}
      {showBillingToggle && !offer ? (
        <BillingToggleV4
          billingPeriod={billingPeriod}
          onBillingPeriodChange={onBillingPeriodChange}
          annualSavingsLabel={annualSavingsLabel}
        />
      ) : null}

      <View
        accessibilityRole="radiogroup"
        accessibilityLabel="Choose a plan"
        style={{ gap: tokens.spacing.md }}
      >
        {offer ? (
          <OfferCard
            plan={featured}
            period={billingPeriod}
            selected
            accent={accent}
            onPress={() => onSelectPlan?.(featured.id)}
          />
        ) : layout === 'list' ? (
          plans.map((plan) => (
            <PlanRowV4
              key={plan.id}
              plan={plan}
              price={priceFor(plan, billingPeriod)}
              was={compareAtFor(plan, billingPeriod)}
              selected={plan.id === selectedPlanId}
              accent={accent}
              onPress={() => onSelectPlan?.(plan.id)}
            />
          ))
        ) : (
          chunkPlans(plans, columns).map((row, i) => (
            <View
              key={i}
              style={{ flexDirection: 'row', alignItems: 'stretch', gap: tokens.spacing.md }}
            >
              {row.map((plan) => (
                <PlanCardV4
                  key={plan.id}
                  plan={plan}
                  price={priceFor(plan, billingPeriod)}
                  was={compareAtFor(plan, billingPeriod)}
                  selected={plan.id === selectedPlanId}
                  accent={accent}
                  onPress={() => onSelectPlan?.(plan.id)}
                />
              ))}
              {/* Keeps the last card the same width as the others. */}
              {row.length < columns ? <View style={{ flex: 1 }} /> : null}
            </View>
          ))
        )}
      </View>
    </View>
  );
}
