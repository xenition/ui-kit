import * as React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Button, Icon } from '../primitives';
import { PlanSelector } from './PlanSelector';
import { TrialBanner } from './TrialBanner';
import { withAlpha } from '../primitives/internal/color';
import type { PaywallScreenProps } from './PaywallScreen';

/** Drop-in for {@link PaywallScreen} — identical props, different design. */
export type PaywallScreenV2Props = PaywallScreenProps;

/**
 * Value-first paywall — V2. Leads with a bold, tinted hero (brand medallion +
 * outcome headline over a token-derived scrim), then the benefit list, optional
 * trial strip and plans, with the price CTA pinned to the bottom so the ask
 * lands only after the value is read. Composes {@link TrialBanner},
 * {@link PlanSelector} and the CTA. Everything above the pinned bar scrolls.
 * Same props as {@link PaywallScreen}. Token-pure.
 */
export function PaywallScreenV2({
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
}: PaywallScreenV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  return (
    <View style={[{ flex: 1, backgroundColor: colors.surface }, style]}>
      <ScrollView contentContainerStyle={{ paddingBottom: tokens.spacing.xl, gap: tokens.spacing.lg }}>
        {/* Value-first hero. */}
        <View
          style={{
            paddingHorizontal: tokens.spacing.xl,
            paddingTop: tokens.spacing['2xl'],
            paddingBottom: tokens.spacing.xl,
            gap: tokens.spacing.md,
            alignItems: 'center',
            backgroundColor: withAlpha(colors.primary, 0.1),
            borderBottomLeftRadius: tokens.radius.lg,
            borderBottomRightRadius: tokens.radius.lg,
          }}
        >
          <View
            style={{
              width: 72,
              height: 72,
              borderRadius: tokens.radius.full,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: colors.primary,
            }}
          >
            <Icon glyph="✦" size="2xl" color="onPrimary" />
          </View>
          <Text
            accessibilityRole="header"
            style={{ color: colors.onSurface, fontSize: tokens.typography.scale['3xl'], fontWeight: '800', textAlign: 'center' }}
          >
            {title}
          </Text>
          {subtitle ? (
            <Text
              style={{
                color: colors.muted,
                fontSize: tokens.typography.scale.base,
                textAlign: 'center',
                lineHeight: tokens.typography.scale.base * 1.5,
              }}
            >
              {subtitle}
            </Text>
          ) : null}
        </View>

        <View style={{ paddingHorizontal: tokens.spacing.xl, gap: tokens.spacing.lg }}>
          {trial ? <TrialBanner title={trial.title} subtitle={trial.subtitle} daysLeft={trial.daysLeft} /> : null}

          {valueProps.length ? (
            <View style={{ gap: tokens.spacing.md }}>
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
                  <Text style={{ flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '500' }}>
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
        </View>
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
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={dismissLabel}
            onPress={onDismiss}
            style={{ alignItems: 'center', paddingVertical: tokens.spacing.xs }}
          >
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.base, fontWeight: '500' }}>
              {dismissLabel}
            </Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}
