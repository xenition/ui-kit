import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Icon, Text } from '../primitives';
import { PlanSelectorV3 } from './PlanSelectorV3';
import { TrialBanner } from './TrialBanner';
import {
  PaywallFeatureRows,
  PaywallFooter,
  toFeatureRows,
  toValueFramingRows,
  type PaywallScreenProps,
} from './PaywallScreen';

/** Drop-in for {@link PaywallScreen} — identical props, different design. */
export type PaywallScreenV3Props = PaywallScreenProps;

/*
  Geometry the onboarding spec fixes by number (§10.1): the leading brand tile
  beside the headline is the 44 minimum tap target, matching every other control
  in the module even though nothing here is tappable.
*/
const TILE = 44;

/**
 * Value-first paywall — V3, the **compact** line. No hero panel: a small
 * leading brand tile sits beside a left-aligned headline, the §8 rows run dense,
 * and the plan tiers stack as rows rather than a card pair. Sized for a bottom
 * sheet or a short screen, with the CTA still pinned (§5) — a paywall's ask must
 * never leave the fold, sheet or not.
 *
 * `showHero` is honoured as an opt-*in* here (it defaults to off for this line),
 * so a host that wants the panel back can ask for it.
 *
 * Stays inside its own design line: the plan rows are {@link PlanSelectorV3},
 * not the base selector, because an app that picks V3 picks it for every surface
 * it sees. {@link TrialBanner} has no alternate, so the base one is the whole
 * line — that is correct, not a gap. Same props as {@link PaywallScreen}.
 * Token-pure.
 */
export function PaywallScreenV3({
  title,
  subtitle,
  illustration,
  logoGlyph = '✦',
  showHero = false,
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
}: PaywallScreenV3Props): React.ReactElement {
  const { colors, scheme, tokens } = useXenitionTheme();
  // The native ramps keep their light orientation in both schemes — see the
  // note in `PaywallScreen`'s `PaywallFeatureRows`.
  const tileGround = scheme === 'dark' ? tokens.ramps.primary[900] : tokens.ramps.primary[50];
  const rows = toFeatureRows(features, valueProps);
  const framingRows = toValueFramingRows(valueFraming);

  return (
    <View style={[{ flex: 1, backgroundColor: colors.surface }, style]}>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: tokens.spacing.lg,
          paddingVertical: tokens.spacing.lg,
          gap: tokens.spacing.md,
        }}
      >
        {trial ? (
          <TrialBanner title={trial.title} subtitle={trial.subtitle} daysLeft={trial.daysLeft} />
        ) : null}

        {/* Small leading tile + left-aligned headline — the compact stand-in for
            the hero panel (§11). `illustration` takes the tile when supplied. */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
          <View
            style={{
              width: TILE,
              height: TILE,
              borderRadius: tokens.radius.lg,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: showHero ? tileGround : colors.primary,
              overflow: 'hidden',
            }}
          >
            {illustration ?? <Icon glyph={logoGlyph} size="lg" color={showHero ? 'primary' : 'onPrimary'} />}
          </View>
          <View style={{ flex: 1, gap: tokens.spacing.xs }}>
            <Text accessibilityRole="header" size="xl" weight="bold" numberOfLines={2}>
              {title}
            </Text>
            {subtitle ? (
              <Text size="sm" tone="muted" numberOfLines={3}>
                {subtitle}
              </Text>
            ) : null}
          </View>
        </View>

        <PaywallFeatureRows rows={rows} heading={featuresTitle} rail={featureRail} dense />

        <PaywallFeatureRows rows={framingRows} heading={valueFraming?.title} dense />

        {plans?.length ? (
          <PlanSelectorV3
            plans={plans}
            selectedPlanId={selectedPlanId}
            onSelectPlan={onSelectPlan}
            billingPeriod={billingPeriod}
            onBillingPeriodChange={onBillingPeriodChange}
            annualSavingsLabel={annualSavingsLabel}
          />
        ) : null}
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
