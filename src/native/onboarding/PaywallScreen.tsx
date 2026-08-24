import * as React from 'react';
import { Pressable, ScrollView, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Button, Icon } from '../primitives';
import { PlanSelector } from './PlanSelector';
import { TrialBanner } from './TrialBanner';
import type { BillingPeriod, PlanTier } from './types';

export interface PaywallValueProp {
  /** Leading glyph for the value row. */
  icon?: string;
  /** Outcome the user gets (design.md §47) — not a feature name. */
  text: string;
}

export interface PaywallScreenProps {
  /** Value-first headline (e.g. `'Do your best work, faster'`). */
  title: string;
  /** Supporting line under the headline. */
  subtitle?: string;
  /** The "why upgrade" list, shown before any price (design.md §27). */
  valueProps?: PaywallValueProp[];
  /** Plans to choose from. When present, renders the inline {@link PlanSelector}. */
  plans?: PlanTier[];
  /** Selected tier id (controlled). */
  selectedPlanId?: string;
  /** Fires with the tapped tier id. */
  onSelectPlan?: (planId: string) => void;
  /** Billing cadence (controlled). Default `'annual'` — annual leads on paywalls. */
  billingPeriod?: BillingPeriod;
  /** Fires when the monthly/annual toggle changes. */
  onBillingPeriodChange?: (period: BillingPeriod) => void;
  /** Savings pill copy beside the annual toggle. */
  annualSavingsLabel?: string;
  /** Optional trial strip above the value list. */
  trial?: { title: string; subtitle?: string; daysLeft?: number };
  /** Primary CTA copy. Default `'Start free trial'`. */
  ctaLabel?: string;
  /** Fires on the primary CTA. */
  onSubscribe?: () => void;
  /** Show a spinner on the CTA while purchase is in flight. */
  loading?: boolean;
  /** Fine print under the CTA (e.g. cancel-anytime, terms). */
  footnote?: string;
  /** Dismiss ("Maybe later") link copy. Hidden without `onDismiss`. */
  dismissLabel?: string;
  /** Fires on dismiss. */
  onDismiss?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * Value-first paywall — leads with outcomes and the value list, then the plans,
 * then the price and CTA, so the ask lands only after the value is clear
 * (paywall-after-value, design.md §27-28). Composes {@link TrialBanner},
 * {@link PlanSelector} and the primary CTA, with an optional "Maybe later"
 * escape. Everything scrolls for small screens. All colors token-bound. No
 * literal colors.
 */
export function PaywallScreen({
  title,
  subtitle,
  valueProps = [],
  plans,
  selectedPlanId,
  onSelectPlan,
  billingPeriod = 'annual',
  onBillingPeriodChange,
  annualSavingsLabel,
  trial,
  ctaLabel = 'Start free trial',
  onSubscribe,
  loading = false,
  footnote,
  dismissLabel,
  onDismiss,
  style,
}: PaywallScreenProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  return (
    <View style={[{ flex: 1, backgroundColor: colors.surface }, style]}>
      <ScrollView contentContainerStyle={{ padding: tokens.spacing.xl, gap: tokens.spacing.lg }}>
        <View style={{ gap: tokens.spacing.sm }}>
          <Text
            accessibilityRole="header"
            style={{ color: colors.onSurface, fontSize: tokens.typography.scale['2xl'], fontWeight: '700' }}
          >
            {title}
          </Text>
          {subtitle ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.base, lineHeight: tokens.typography.scale.base * 1.5 }}>
              {subtitle}
            </Text>
          ) : null}
        </View>

        {trial ? (
          <TrialBanner title={trial.title} subtitle={trial.subtitle} daysLeft={trial.daysLeft} />
        ) : null}

        {valueProps.length ? (
          <View style={{ gap: tokens.spacing.sm }}>
            {valueProps.map((v, i) => (
              <View key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
                <View
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: tokens.radius.full,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: colors.success,
                  }}
                >
                  <Icon glyph={v.icon ?? '✓'} size="sm" color="onSuccess" />
                </View>
                <Text style={{ flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base }}>
                  {v.text}
                </Text>
              </View>
            ))}
          </View>
        ) : null}

        {plans?.length ? (
          <PlanSelector
            plans={plans}
            selectedPlanId={selectedPlanId}
            onSelectPlan={onSelectPlan}
            billingPeriod={billingPeriod}
            onBillingPeriodChange={onBillingPeriodChange}
            annualSavingsLabel={annualSavingsLabel}
          />
        ) : null}
      </ScrollView>

      <View style={{ padding: tokens.spacing.xl, gap: tokens.spacing.sm, borderTopWidth: 1, borderTopColor: colors.border }}>
        <Button
          variant="primary"
          size="lg"
          loading={loading}
          onPress={onSubscribe}
          accessibilityLabel={ctaLabel}
          style={{ alignSelf: 'stretch' }}
        >
          {ctaLabel}
        </Button>
        {footnote ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, textAlign: 'center' }}>
            {footnote}
          </Text>
        ) : null}
        {dismissLabel && onDismiss ? (
          <Pressable accessibilityRole="button" accessibilityLabel={dismissLabel} onPress={onDismiss} style={{ alignItems: 'center', paddingVertical: tokens.spacing.xs }}>
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.base, fontWeight: '500' }}>
              {dismissLabel}
            </Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}
