import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

export interface PricingPlanCta {
  label: string;
  onPress?: () => void;
}

export interface PricingPlan {
  /** Tier name ("Starter", "Pro", …). */
  name: string;
  /** Price display ("$19", "Free", …). */
  price: string;
  /** Billing period line (e.g. "/month"). */
  period?: string;
  /** Short description under the price. */
  description?: string;
  /** Checklist entries. */
  features?: string[];
  /** Call-to-action button; a node is rendered as-is. */
  cta?: PricingPlanCta | React.ReactNode;
  /** Emphasized tier: token ring + badge (web `featured`). */
  highlighted?: boolean;
  /** Badge text on the highlighted tier. */
  highlightLabel?: string;
}

export interface PricingTableProps {
  /** The tiers to render (mirrors the web `PricingTier` children). */
  plans: PricingPlan[];
  style?: StyleProp<ViewStyle>;
}

function isCta(value: unknown): value is PricingPlanCta {
  return typeof value === 'object' && value !== null && 'label' in value;
}

/**
 * Stacked pricing tiers — the native mirror of the web `PricingTable` +
 * `PricingTier`. The web version composes children in a responsive grid; native
 * takes a `plans` data array and stacks the cards vertically (the `lg:scale-105`
 * highlight is expressed with a token ring + badge only). Token-only.
 */
export function PricingTable({ plans, style }: PricingTableProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  return (
    <View testID="xen-pricing" style={[{ gap: tokens.spacing.lg }, style]}>
      {plans.map((plan, i) => (
        <View
          key={i}
          style={{
            position: 'relative',
            gap: tokens.spacing.md,
            backgroundColor: colors.surface,
            borderRadius: tokens.radius.lg,
            padding: tokens.spacing.lg,
            borderWidth: plan.highlighted ? 2 : 1,
            borderColor: plan.highlighted ? colors.primary : colors.border,
          }}
        >
          {plan.highlighted ? (
            <View
              testID="xen-pricing-badge"
              style={{
                alignSelf: 'flex-start',
                backgroundColor: colors.primary,
                borderRadius: tokens.radius.full,
                paddingVertical: 2,
                paddingHorizontal: tokens.spacing.sm,
              }}
            >
              <Text
                style={{
                  color: colors.onPrimary,
                  fontSize: tokens.typography.scale.xs,
                  fontWeight: '600',
                }}
              >
                {plan.highlightLabel ?? 'Most popular'}
              </Text>
            </View>
          ) : null}
          <Text
            style={{
              color: colors.onSurface,
              fontSize: tokens.typography.scale.lg,
              fontWeight: '600',
            }}
          >
            {plan.name}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }}>
            <Text
              style={{
                color: colors.onSurface,
                fontSize: tokens.typography.scale['3xl'],
                fontWeight: '700',
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
                  <Text style={{ color: colors.success, fontWeight: '700' }}>✓</Text>
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
                alignItems: 'center',
                backgroundColor: plan.highlighted ? colors.primary : colors.surface,
                borderColor: colors.primary,
                borderWidth: 1,
                borderRadius: tokens.radius.md,
                paddingVertical: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.md,
                opacity: pressed ? 0.9 : 1,
              })}
            >
              <Text
                style={{
                  color: plan.highlighted ? colors.onPrimary : colors.primary,
                  fontSize: tokens.typography.scale.sm,
                  fontWeight: '600',
                }}
              >
                {plan.cta.label}
              </Text>
            </Pressable>
          ) : plan.cta ? (
            <View style={{ marginTop: tokens.spacing.xs }}>{plan.cta as React.ReactNode}</View>
          ) : null}
        </View>
      ))}
    </View>
  );
}
