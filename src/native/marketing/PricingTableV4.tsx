import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import type { PricingPlan, PricingPlanCta, PricingTableProps } from './PricingTable';

/** Drop-in for {@link PricingTableProps} — same props, the V4 "showcase" design. */
export type PricingTableV4Props = PricingTableProps;

/** A single tier plus its style hook (mirrors the web `PricingTierV4`). */
export interface PricingTierV4Props {
  plan: PricingPlan;
}

function isCta(value: unknown): value is PricingPlanCta {
  return typeof value === 'object' && value !== null && 'label' in value;
}

/**
 * PricingTier — **V4** "showcase" design (native mirror of the web V4). One
 * elevated rounded card built from a `PricingPlan`: an extra-bold name, a big
 * extra-bold `tabular-nums` price, a soft-primary ✓ feature list, and a
 * prominent CTA. The **highlighted** tier is the accent moment — a token primary
 * ring, a soft-primary "Popular" chip (never color alone), and a primary CTA
 * (others outline). A token accent, NOT a full brand gradient. Token-only colors,
 * no literals.
 */
export function PricingTierV4({ plan }: PricingTierV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const highlighted = plan.highlighted === true;

  return (
    <View
      style={{
        position: 'relative',
        gap: tokens.spacing.md,
        backgroundColor: colors.card,
        borderRadius: tokens.radius.lg,
        padding: tokens.spacing.lg,
        borderWidth: highlighted ? 2 : 1,
        borderColor: highlighted ? colors.primary : colors.border,
        shadowColor: colors.onSurface,
        shadowOpacity: 0.06,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 2,
      }}
    >
      {highlighted ? (
        <View
          testID="xen-pricing-badge"
          style={{
            alignSelf: 'flex-start',
            backgroundColor: withAlpha(colors.primary, 0.12),
            borderRadius: tokens.radius.full,
            paddingVertical: 2,
            paddingHorizontal: tokens.spacing.sm,
          }}
        >
          <Text
            style={{
              color: tokens.ramps.primary[700],
              fontSize: tokens.typography.scale.xs,
              fontWeight: '700',
            }}
          >
            {plan.highlightLabel ?? 'Popular'}
          </Text>
        </View>
      ) : null}
      <Text
        style={{
          color: colors.onSurface,
          fontSize: tokens.typography.scale.lg,
          fontWeight: '800',
          letterSpacing: -0.3,
        }}
      >
        {plan.name}
      </Text>
      <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }}>
        <Text
          style={{
            color: colors.onSurface,
            fontSize: tokens.typography.scale['3xl'],
            fontWeight: '800',
            letterSpacing: -0.5,
            fontVariant: ['tabular-nums'],
          }}
        >
          {plan.price}
        </Text>
        {plan.period !== undefined ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
            {plan.period}
          </Text>
        ) : null}
      </View>
      {plan.description !== undefined ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
          {plan.description}
        </Text>
      ) : null}
      {plan.features && plan.features.length > 0 ? (
        <View style={{ gap: tokens.spacing.xs }}>
          {plan.features.map((feature, fi) => (
            <View
              key={fi}
              style={{ flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.xs }}
            >
              <Text style={{ color: colors.primary, fontWeight: '700' }}>✓</Text>
              <Text
                style={{
                  flex: 1,
                  color: colors.onSurface,
                  fontSize: tokens.typography.scale.sm,
                }}
              >
                {feature}
              </Text>
            </View>
          ))}
        </View>
      ) : null}
      {isCta(plan.cta) ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={plan.cta.label}
          onPress={plan.cta.onPress}
          style={({ pressed }) => ({
            marginTop: tokens.spacing.xs,
            minHeight: 44,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: highlighted ? colors.primary : 'transparent',
            borderColor: colors.primary,
            borderWidth: highlighted ? 0 : 1,
            borderRadius: tokens.radius.md,
            paddingVertical: tokens.spacing.sm,
            paddingHorizontal: tokens.spacing.md,
            opacity: pressed ? 0.9 : 1,
          })}
        >
          <Text
            style={{
              color: highlighted ? colors.onPrimary : colors.primary,
              fontSize: tokens.typography.scale.sm,
              fontWeight: '700',
            }}
          >
            {plan.cta.label}
          </Text>
        </Pressable>
      ) : plan.cta ? (
        <View style={{ marginTop: tokens.spacing.xs }}>{plan.cta as React.ReactNode}</View>
      ) : null}
    </View>
  );
}

/**
 * PricingTable — **V4** "showcase" design (native mirror of the web V4). Stacks
 * elevated `PricingTierV4` cards from the base's `plans` data array (the web V4
 * composes children in a responsive grid). The highlighted tier stands out with
 * a primary ring + soft-primary chip. Same props/behavior as
 * {@link PricingTableProps}; token-only colors, no literals.
 */
export function PricingTableV4({ plans, style }: PricingTableV4Props): React.ReactElement {
  const { tokens } = useXenitionTheme();

  return (
    <View testID="xen-pricing" style={[{ gap: tokens.spacing.lg }, style]}>
      {plans.map((plan, i) => (
        <PricingTierV4 key={i} plan={plan} />
      ))}
    </View>
  );
}
