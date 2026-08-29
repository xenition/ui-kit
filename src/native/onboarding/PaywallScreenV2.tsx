import * as React from 'react';
import { ScrollView, View, useWindowDimensions } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Icon, Text } from '../primitives';
import { PlanSelectorV2 } from './PlanSelectorV2';
import { TrialBanner } from './TrialBanner';
import {
  PaywallFeatureRows,
  PaywallFooter,
  toFeatureRows,
  toValueFramingRows,
  type PaywallScreenProps,
} from './PaywallScreen';

/** Drop-in for {@link PaywallScreen} — identical props, different design. */
export type PaywallScreenV2Props = PaywallScreenProps;

/*
  Geometry the onboarding spec fixes by number (§10.1). The editorial hero is
  taller than the base one because it runs full-bleed to the top edge with no
  panel inset; the cap still keeps the sticky CTA in the fold (§3).
*/
const MEDALLION = 56;
const HERO_HEIGHT_RATIO = 0.34;

/**
 * Value-first paywall — V2, the **editorial** line. The hero runs full-bleed to
 * the top edge with no inset panel, and the content sheet rises over it with a
 * rounded lip so the headline overlaps the artwork. Below the fold line sit the
 * trial strip, the §8 feature rows, the value-framing block and the V2 plan
 * cards, with the CTA pinned (§5).
 *
 * Stays inside its own design line: the plan cards are {@link PlanSelectorV2},
 * not the base selector, because an app that picks V2 picks it for every
 * surface it sees. {@link TrialBanner} has no alternate, so the base one is the
 * whole line — that is correct, not a gap. Same props as {@link PaywallScreen}.
 * Token-pure.
 */
export function PaywallScreenV2({
  title,
  subtitle,
  illustration,
  logoGlyph = '✦',
  showHero = true,
  features,
  featuresTitle,
  featureRail,
  valueFraming,
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
  const { colors, scheme, tokens } = useXenitionTheme();
  const { height } = useWindowDimensions();
  // The native ramps keep their light orientation in both schemes — see the
  // note in `PaywallScreen`'s `PaywallFeatureRows`.
  const heroGround = scheme === 'dark' ? tokens.ramps.primary[900] : tokens.ramps.primary[50];
  const rows = toFeatureRows(features, valueProps);
  const framingRows = toValueFramingRows(valueFraming);

  return (
    <View style={[{ flex: 1, backgroundColor: colors.surface }, style]}>
      <ScrollView contentContainerStyle={{ paddingBottom: tokens.spacing.xl }}>
        {showHero ? (
          <View
            style={{
              height: Math.round(height * HERO_HEIGHT_RATIO),
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: heroGround,
              overflow: 'hidden',
            }}
          >
            {illustration ?? (
              <View
                style={{
                  width: MEDALLION,
                  height: MEDALLION,
                  borderRadius: tokens.radius.full,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: colors.primary,
                }}
              >
                <Icon glyph={logoGlyph} size="2xl" color="onPrimary" />
              </View>
            )}
          </View>
        ) : null}

        {/* The sheet rises over the hero — its rounded lip is the overlap. */}
        <View
          style={{
            marginTop: showHero ? -tokens.spacing.xl : 0,
            borderTopLeftRadius: tokens.radius.lg,
            borderTopRightRadius: tokens.radius.lg,
            backgroundColor: colors.surface,
            paddingHorizontal: tokens.spacing.lg,
            paddingTop: tokens.spacing.xl,
            gap: tokens.spacing.lg,
          }}
        >
          <View style={{ gap: tokens.spacing.sm, alignItems: 'center' }}>
            <Text accessibilityRole="header" size="2xl" weight="bold" align="center" numberOfLines={2}>
              {title}
            </Text>
            {subtitle ? (
              <Text size="base" tone="muted" align="center" numberOfLines={3}>
                {subtitle}
              </Text>
            ) : null}
          </View>

          {trial ? (
            <TrialBanner title={trial.title} subtitle={trial.subtitle} daysLeft={trial.daysLeft} />
          ) : null}

          <PaywallFeatureRows rows={rows} heading={featuresTitle} rail={featureRail} />

          <PaywallFeatureRows rows={framingRows} heading={valueFraming?.title} />

          {plans?.length ? (
            <PlanSelectorV2
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

      <PaywallFooter
        ctaLabel={ctaLabel}
        onSubscribe={onSubscribe}
        loading={loading}
        footnote={footnote}
        dismissLabel={dismissLabel}
        onDismiss={onDismiss}
      />
    </View>
  );
}
