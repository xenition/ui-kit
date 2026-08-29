import * as React from 'react';
import {
  Pressable,
  ScrollView,
  View,
  useWindowDimensions,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useXenitionTheme } from '../theme';
import { Icon, Text, formatMoney, isIconName, type IconName } from '../primitives';
import { GetStartedButton } from './GetStartedButton';
import { PlanSelector } from './PlanSelector';
import { TrialBanner } from './TrialBanner';
import type { BillingPeriod, PlanTier } from './types';

/*
  Geometry the onboarding spec fixes by number rather than by token
  (ONBOARDING-DESIGN-SPEC §10.1 allows exactly these):

  - BADGE — the §8 feature-row badge is a 44×44 circle, the same 44 minimum tap
    target every control in the module uses.
  - MEDALLION — the hero fallback mark is the 56 control height, so an empty
    hero slot still reads as a composed panel rather than a hole (§3).
  - HAIRLINE — 1px rules: the sticky-footer divider and the §8 rail.
  - HERO_ASPECT / HERO_MAX_HEIGHT_RATIO — the hero panel is roughly 4:3 and
    never taller than ~38% of the screen, so the CTA cannot leave the fold (§3).
*/
const BADGE = 44;
const MEDALLION = 56;
const HAIRLINE = 1;
const HERO_ASPECT = 4 / 3;
const HERO_MAX_HEIGHT_RATIO = 0.38;

/** Comfortable measure for the centred subhead — never the full tablet width (§4). */
const SUBHEAD_MEASURE = '90%' as const;

export interface PaywallValueProp {
  /** Leading glyph for the value row. */
  icon?: string;
  /** Outcome the user gets (design.md §47) — not a feature name. */
  text: string;
}

/**
 * One §8 feature row: an icon badge, a title and a supporting line. This is the
 * pattern that carries the value proposition on a paywall — the reference
 * screens lead with it — and it is deliberately the *same* shape used for the
 * value-framing block, so there is one row component rather than two.
 */
export interface PaywallFeatureRow {
  /** Stable key for list rendering. Falls back to the index. */
  id?: string;
  /** A name from the kit's icon set (`'bolt'`, `'lock'`, …) or a one-off glyph. */
  icon?: IconName | string;
  /** Row title — an outcome, not a feature name (design.md §47). */
  title: string;
  /** Supporting line under the title. */
  description?: string;
}

/**
 * The "less than your everyday spending" block from the reference paywall: a
 * per-day price, a comparison and a payback line. It is not a second component
 * — it is {@link PaywallFeatureRows} under a different heading, with the price
 * row generated from `perDayCents` through the kit's `formatMoney`.
 */
export interface PaywallValueFraming {
  /** Section heading (e.g. `'Less than your everyday spending'`). */
  title?: string;
  /** Per-day price in integer **cents**, formatted with the kit's `formatMoney`. */
  perDayCents?: number;
  /** ISO currency for `perDayCents`. Default `'USD'`. */
  currency?: string;
  /** Suffix after the formatted price. Default `'per day'`. */
  perDayLabel?: string;
  /** Supporting line under the price row. */
  perDayCaption?: string;
  /** Badge glyph for the generated price row. Default `'card'`. */
  perDayIcon?: IconName | string;
  /** Comparison / payback lines — the same §8 rows as `features`. */
  rows?: PaywallFeatureRow[];
}

export interface PaywallFeatureRowsProps {
  /** The rows to draw. Empty renders nothing at all. */
  rows: PaywallFeatureRow[];
  /** Optional section heading above the list. */
  heading?: string;
  /**
   * 1px vertical rail connecting the badges. Defaults to **on at three or more
   * rows** (§8) — a rail is what makes three rows read as one list instead of
   * three fragments; below three there is nothing to bind.
   */
  rail?: boolean;
  /** Tighter badge and rhythm for the compact (V3) line. Default `false`. */
  dense?: boolean;
  style?: StyleProp<ViewStyle>;
}

/** Rail turns itself on once the list is long enough to fragment (§8). */
const RAIL_FROM_ROWS = 3;

/**
 * §8 feature rows — circular icon badge on a `primary[50]` ground with the
 * glyph in `colors.primary`, a semibold title, a muted description, and an
 * optional hairline rail joining the badges.
 *
 * Exported from this module rather than a file of its own because it is one
 * pattern shared by every paywall line and by the value-framing block: the
 * "less than your everyday spending" section is these rows under a different
 * heading, not a second component.
 */
export function PaywallFeatureRows({
  rows,
  heading,
  rail,
  dense = false,
  style,
}: PaywallFeatureRowsProps): React.ReactElement | null {
  const { colors, scheme, tokens } = useXenitionTheme();

  if (rows.length === 0) return null;

  /*
    `toNativeTokens` copies the LIGHT orientation of `tokens.ramps` into BOTH
    schemes — unlike the emitted CSS variables, the native ramps are not
    inverted for dark mode. Reading `primary[50]` literally would paint a
    near-white disc on a near-black page, so the dark scheme takes the far end
    of the same ramp. Still a token, so still token-pure. (Web is unaffected:
    `bg-primary-50` is correct there verbatim.)
  */
  const badgeGround = scheme === 'dark' ? tokens.ramps.primary[900] : tokens.ramps.primary[50];
  const showRail = rail ?? rows.length >= RAIL_FROM_ROWS;
  const badgeSize = dense ? tokens.spacing['2xl'] : BADGE;
  const rowGap = dense ? tokens.spacing.sm : tokens.spacing.md;

  return (
    <View style={[{ gap: tokens.spacing.sm }, style]}>
      {heading ? (
        <Text size="sm" tone="muted" weight="semibold">
          {heading}
        </Text>
      ) : null}

      <View>
        {rows.map((row, i) => {
          const last = i === rows.length - 1;
          const glyph = row.icon ?? 'check';
          return (
            <View
              key={row.id ?? i}
              // `alignItems: 'stretch'` so the badge column can span the row and
              // carry the rail; the gap lives in the padding, not in a `gap`,
              // because a real gap would break the rail into segments.
              style={{ flexDirection: 'row', alignItems: 'stretch', paddingBottom: last ? 0 : rowGap }}
            >
              <View style={{ width: badgeSize, alignItems: 'center' }}>
                <View
                  style={{
                    width: badgeSize,
                    height: badgeSize,
                    borderRadius: tokens.radius.full,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: badgeGround,
                  }}
                >
                  {isIconName(glyph) ? (
                    <Icon name={glyph} size={dense ? 'base' : 'lg'} color="primary" />
                  ) : (
                    <Icon glyph={glyph} size={dense ? 'base' : 'lg'} color="primary" />
                  )}
                </View>
                {showRail && !last ? (
                  <View
                    // Named the way the kit names every other assertable part
                    // (`xen-calendar-dot`, `xen-trip-route`), so a spec can count
                    // rails without reaching into style objects.
                    testID="xen-paywall-rail"
                    style={{
                      flex: 1,
                      width: HAIRLINE,
                      backgroundColor: colors.border,
                      marginTop: tokens.spacing.xs,
                    }}
                  />
                ) : null}
              </View>

              <View style={{ flex: 1, gap: tokens.spacing.xs, paddingLeft: tokens.spacing.md }}>
                <Text size={dense ? 'sm' : 'base'} weight="semibold">
                  {row.title}
                </Text>
                {row.description ? (
                  <Text size="sm" tone="muted">
                    {row.description}
                  </Text>
                ) : null}
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

/**
 * Fold `valueProps` (the original flat `{ icon, text }` list) into §8 rows so a
 * caller that never migrates still gets the new anatomy — the row simply has no
 * description. `features` wins when both are supplied.
 */
export function toFeatureRows(
  features: PaywallFeatureRow[] | undefined,
  valueProps: PaywallValueProp[]
): PaywallFeatureRow[] {
  if (features?.length) return features;
  return valueProps.map((v, i) => ({ id: String(i), icon: v.icon ?? 'check', title: v.text }));
}

/** Build the value-framing rows, price row first, using the kit's `formatMoney`. */
export function toValueFramingRows(framing: PaywallValueFraming | undefined): PaywallFeatureRow[] {
  if (!framing) return [];
  const rows: PaywallFeatureRow[] = [];
  if (typeof framing.perDayCents === 'number') {
    const price = formatMoney(framing.perDayCents, framing.currency ?? 'USD');
    rows.push({
      id: 'per-day',
      icon: framing.perDayIcon ?? 'card',
      title: `${price} ${framing.perDayLabel ?? 'per day'}`,
      description: framing.perDayCaption,
    });
  }
  return rows.concat(framing.rows ?? []);
}

export interface PaywallScreenProps {
  /** Value-first headline (e.g. `'Do your best work, faster'`). */
  title: string;
  /** Supporting line under the headline. */
  subtitle?: string;
  /**
   * Artwork for the §3 hero slot. The kit ships none — pass an `<Image>`, an
   * SVG or any node. Absent, the slot falls back to the `logoGlyph` medallion
   * so the screen still reads as composed rather than empty.
   */
  illustration?: React.ReactNode;
  /** Brand mark for the hero fallback. Default `'✦'`. */
  logoGlyph?: string;
  /** Draw the hero slot at all. Default `true` (the compact V3 line defaults to `false`). */
  showHero?: boolean;
  /**
   * The §8 value rows — icon badge, title, description. This is what the
   * reference paywall leads with; prefer it over the flat `valueProps`.
   */
  features?: PaywallFeatureRow[];
  /** Heading above `features` (e.g. `'What you unlock'`). */
  featuresTitle?: string;
  /** Force the §8 connecting rail on/off. Default: on at three or more rows. */
  featureRail?: boolean;
  /**
   * The "less than your everyday spending" block — a per-day price, a
   * comparison and a payback line, drawn with the same §8 rows.
   */
  valueFraming?: PaywallValueFraming;
  /**
   * The "why upgrade" list, shown before any price (design.md §27). Kept for
   * existing callers: each entry is folded into a §8 row without a description.
   */
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
 * The hero slot (§3): a tinted, ~4:3 panel capped at ~38% of the screen so the
 * sticky CTA never leaves the fold. Falls back to the brand medallion at hero
 * size when the app supplies no artwork.
 */
function PaywallHero({
  illustration,
  logoGlyph,
}: {
  illustration?: React.ReactNode;
  logoGlyph: string;
}): React.ReactElement {
  const { colors, scheme, tokens } = useXenitionTheme();
  const { height } = useWindowDimensions();
  // See the note in `PaywallFeatureRows` — the native ramps are not inverted.
  const heroGround = scheme === 'dark' ? tokens.ramps.primary[900] : tokens.ramps.primary[50];

  return (
    <View
      style={{
        alignSelf: 'stretch',
        aspectRatio: HERO_ASPECT,
        maxHeight: Math.round(height * HERO_MAX_HEIGHT_RATIO),
        borderRadius: tokens.radius.lg,
        backgroundColor: heroGround,
        alignItems: 'center',
        justifyContent: 'center',
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
  );
}

/**
 * The sticky footer (§5) — one anatomy shared by all three lines, which is why
 * it is exported from here rather than copied into each: a hairline divider, the
 * full-width 56-tall CTA, the
 * fine print, and the secondary action **below** the CTA as a muted text link
 * — never beside it competing for the same weight.
 */
export function PaywallFooter({
  ctaLabel,
  onSubscribe,
  loading,
  footnote,
  dismissLabel,
  onDismiss,
}: Pick<
  PaywallScreenProps,
  'ctaLabel' | 'onSubscribe' | 'loading' | 'footnote' | 'dismissLabel' | 'onDismiss'
> & { ctaLabel: string }): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  return (
    <View
      style={{
        paddingHorizontal: tokens.spacing.lg,
        paddingTop: tokens.spacing.md,
        paddingBottom: tokens.spacing.lg,
        gap: tokens.spacing.sm,
        borderTopWidth: HAIRLINE,
        borderTopColor: colors.border,
        backgroundColor: colors.surface,
      }}
    >
      <GetStartedButton label={ctaLabel} loading={loading} onPress={onSubscribe} />
      {footnote ? (
        <Text size="xs" tone="muted" align="center">
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
          <Text size="base" tone="muted" weight="medium">
            {dismissLabel}
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}

/**
 * Value-first paywall — the reference anatomy, top to bottom: hero slot (§3),
 * centred headline block (§4), the §8 feature rows that carry the value
 * proposition, the value-framing block, the two-up plan cards (§7), and a
 * sticky CTA (§5) that never leaves the fold.
 *
 * What was thin before: a headline, a flat row of green ticks and a button on
 * grey. The rows are the fix — an icon badge on a tinted ground, a semibold
 * title, a muted description and a rail binding them into one list is what the
 * reference screens use to make the offer look worth paying for.
 *
 * Composes {@link TrialBanner}, {@link PlanSelector} and {@link
 * GetStartedButton}, with an optional "Maybe later" escape. Everything above
 * the footer scrolls. All colors token-bound. No literal colors.
 */
export function PaywallScreen({
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
}: PaywallScreenProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const rows = toFeatureRows(features, valueProps);
  const framingRows = toValueFramingRows(valueFraming);

  return (
    <View style={[{ flex: 1, backgroundColor: colors.surface }, style]}>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: tokens.spacing.lg,
          paddingVertical: tokens.spacing.xl,
          gap: tokens.spacing.lg,
        }}
      >
        {showHero ? <PaywallHero illustration={illustration} logoGlyph={logoGlyph} /> : null}

        <View style={{ gap: tokens.spacing.sm, alignItems: 'center' }}>
          <Text accessibilityRole="header" size="2xl" weight="bold" align="center" numberOfLines={2}>
            {title}
          </Text>
          {subtitle ? (
            <Text size="base" tone="muted" align="center" numberOfLines={3} style={{ maxWidth: SUBHEAD_MEASURE }}>
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
