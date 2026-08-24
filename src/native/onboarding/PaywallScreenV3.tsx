import * as React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Button, Icon } from '../primitives';
import { PlanSelector } from './PlanSelector';
import { TrialBanner } from './TrialBanner';
import { withAlpha } from '../primitives/internal/color';
import type { PaywallScreenProps } from './PaywallScreen';

/** Drop-in for {@link PaywallScreen} — identical props, different design. */
export type PaywallScreenV3Props = PaywallScreenProps;

/**
 * Value-first paywall — V3. Frames the upgrade as a comparison table: a
 * prominent trial banner up top, then a two-column "free vs premium" grid where
 * each value prop is a row (— for the free tier, ✓ for the premium one), with
 * the premium column tinted to draw the eye. Plans and the pinned CTA follow.
 * Column names are pulled from `plans` when present. Same props as
 * {@link PaywallScreen}. Token-pure.
 */
export function PaywallScreenV3({
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
}: PaywallScreenV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const freeName = plans?.[0]?.name ?? 'Free';
  const proName = plans?.find((p) => p.highlighted)?.name ?? plans?.[plans.length - 1]?.name ?? 'Premium';

  return (
    <View style={[{ flex: 1, backgroundColor: colors.surface }, style]}>
      <ScrollView contentContainerStyle={{ padding: tokens.spacing.xl, gap: tokens.spacing.lg }}>
        {trial ? <TrialBanner title={trial.title} subtitle={trial.subtitle} daysLeft={trial.daysLeft} /> : null}

        <View style={{ gap: tokens.spacing.sm }}>
          <Text
            accessibilityRole="header"
            style={{ color: colors.onSurface, fontSize: tokens.typography.scale['2xl'], fontWeight: '800' }}
          >
            {title}
          </Text>
          {subtitle ? (
            <Text
              style={{
                color: colors.muted,
                fontSize: tokens.typography.scale.base,
                lineHeight: tokens.typography.scale.base * 1.5,
              }}
            >
              {subtitle}
            </Text>
          ) : null}
        </View>

        {valueProps.length ? (
          <View
            style={{
              borderWidth: 1,
              borderColor: colors.border,
              borderRadius: tokens.radius.lg,
              overflow: 'hidden',
            }}
          >
            {/* Header row. */}
            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: withAlpha(colors.onSurface, 0.04) }}>
              <View style={{ flex: 1, padding: tokens.spacing.md }}>
                <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700', letterSpacing: 1 }}>
                  WHAT YOU GET
                </Text>
              </View>
              <View style={{ width: 64, alignItems: 'center', padding: tokens.spacing.md }}>
                <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>
                  {freeName}
                </Text>
              </View>
              <View style={{ width: 72, alignItems: 'center', padding: tokens.spacing.md, backgroundColor: withAlpha(colors.primary, 0.1) }}>
                <Text style={{ color: colors.primaryText, fontSize: tokens.typography.scale.xs, fontWeight: '800' }}>
                  {proName}
                </Text>
              </View>
            </View>

            {/* Feature rows. */}
            {valueProps.map((v, i) => (
              <View
                key={i}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderTopWidth: 1,
                  borderTopColor: colors.border,
                }}
              >
                <View style={{ flex: 1, padding: tokens.spacing.md, flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
                  {v.icon ? <Icon glyph={v.icon} size="base" color="onSurface" /> : null}
                  <Text style={{ flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm }}>
                    {v.text}
                  </Text>
                </View>
                <View style={{ width: 64, alignItems: 'center', padding: tokens.spacing.md }}>
                  <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.base }}>—</Text>
                </View>
                <View style={{ width: 72, alignItems: 'center', padding: tokens.spacing.md, backgroundColor: withAlpha(colors.primary, 0.06) }}>
                  <Icon glyph="✓" size="base" color="success" accessibilityLabel={`Included in ${proName}`} />
                </View>
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
