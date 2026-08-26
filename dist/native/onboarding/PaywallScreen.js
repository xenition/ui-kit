"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaywallFeatureRows = PaywallFeatureRows;
exports.toFeatureRows = toFeatureRows;
exports.toValueFramingRows = toValueFramingRows;
exports.PaywallFooter = PaywallFooter;
exports.PaywallScreen = PaywallScreen;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const GetStartedButton_1 = require("./GetStartedButton");
const PlanSelector_1 = require("./PlanSelector");
const TrialBanner_1 = require("./TrialBanner");
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
const SUBHEAD_MEASURE = '90%';
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
function PaywallFeatureRows({ rows, heading, rail, dense = false, style, }) {
    const { colors, scheme, tokens } = (0, theme_1.useXenitionTheme)();
    if (rows.length === 0)
        return null;
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
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.sm }, style], children: [heading ? ((0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "sm", tone: "muted", weight: "semibold", children: heading })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { children: rows.map((row, i) => {
                    const last = i === rows.length - 1;
                    const glyph = row.icon ?? 'check';
                    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { 
                        // `alignItems: 'stretch'` so the badge column can span the row and
                        // carry the rail; the gap lives in the padding, not in a `gap`,
                        // because a real gap would break the rail into segments.
                        style: { flexDirection: 'row', alignItems: 'stretch', paddingBottom: last ? 0 : rowGap }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { width: badgeSize, alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                            width: badgeSize,
                                            height: badgeSize,
                                            borderRadius: tokens.radius.full,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: badgeGround,
                                        }, children: (0, primitives_1.isIconName)(glyph) ? ((0, jsx_runtime_1.jsx)(primitives_1.Icon, { name: glyph, size: dense ? 'base' : 'lg', color: "primary" })) : ((0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: glyph, size: dense ? 'base' : 'lg', color: "primary" })) }), showRail && !last ? ((0, jsx_runtime_1.jsx)(react_native_1.View
                                    // Named the way the kit names every other assertable part
                                    // (`xen-calendar-dot`, `xen-trip-route`), so a spec can count
                                    // rails without reaching into style objects.
                                    , { 
                                        // Named the way the kit names every other assertable part
                                        // (`xen-calendar-dot`, `xen-trip-route`), so a spec can count
                                        // rails without reaching into style objects.
                                        testID: "xen-paywall-rail", style: {
                                            flex: 1,
                                            width: HAIRLINE,
                                            backgroundColor: colors.border,
                                            marginTop: tokens.spacing.xs,
                                        } })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs, paddingLeft: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Text, { size: dense ? 'sm' : 'base', weight: "semibold", children: row.title }), row.description ? ((0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "sm", tone: "muted", children: row.description })) : null] })] }, row.id ?? i));
                }) })] }));
}
/**
 * Fold `valueProps` (the original flat `{ icon, text }` list) into §8 rows so a
 * caller that never migrates still gets the new anatomy — the row simply has no
 * description. `features` wins when both are supplied.
 */
function toFeatureRows(features, valueProps) {
    if (features?.length)
        return features;
    return valueProps.map((v, i) => ({ id: String(i), icon: v.icon ?? 'check', title: v.text }));
}
/** Build the value-framing rows, price row first, using the kit's `formatMoney`. */
function toValueFramingRows(framing) {
    if (!framing)
        return [];
    const rows = [];
    if (typeof framing.perDayCents === 'number') {
        const price = (0, primitives_1.formatMoney)(framing.perDayCents, framing.currency ?? 'USD');
        rows.push({
            id: 'per-day',
            icon: framing.perDayIcon ?? 'card',
            title: `${price} ${framing.perDayLabel ?? 'per day'}`,
            description: framing.perDayCaption,
        });
    }
    return rows.concat(framing.rows ?? []);
}
/**
 * The hero slot (§3): a tinted, ~4:3 panel capped at ~38% of the screen so the
 * sticky CTA never leaves the fold. Falls back to the brand medallion at hero
 * size when the app supplies no artwork.
 */
function PaywallHero({ illustration, logoGlyph, }) {
    const { colors, scheme, tokens } = (0, theme_1.useXenitionTheme)();
    const { height } = (0, react_native_1.useWindowDimensions)();
    // See the note in `PaywallFeatureRows` — the native ramps are not inverted.
    const heroGround = scheme === 'dark' ? tokens.ramps.primary[900] : tokens.ramps.primary[50];
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
            alignSelf: 'stretch',
            aspectRatio: HERO_ASPECT,
            maxHeight: Math.round(height * HERO_MAX_HEIGHT_RATIO),
            borderRadius: tokens.radius.lg,
            backgroundColor: heroGround,
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
        }, children: illustration ?? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                width: MEDALLION,
                height: MEDALLION,
                borderRadius: tokens.radius.full,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: colors.primary,
            }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: logoGlyph, size: "2xl", color: "onPrimary" }) })) }));
}
/**
 * The sticky footer (§5) — one anatomy shared by all three lines, which is why
 * it is exported from here rather than copied into each: a hairline divider, the
 * full-width 56-tall CTA, the
 * fine print, and the secondary action **below** the CTA as a muted text link
 * — never beside it competing for the same weight.
 */
function PaywallFooter({ ctaLabel, onSubscribe, loading, footnote, dismissLabel, onDismiss, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            paddingHorizontal: tokens.spacing.lg,
            paddingTop: tokens.spacing.md,
            paddingBottom: tokens.spacing.lg,
            gap: tokens.spacing.sm,
            borderTopWidth: HAIRLINE,
            borderTopColor: colors.border,
            backgroundColor: colors.surface,
        }, children: [(0, jsx_runtime_1.jsx)(GetStartedButton_1.GetStartedButton, { label: ctaLabel, loading: loading, onPress: onSubscribe }), footnote ? ((0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "xs", tone: "muted", align: "center", children: footnote })) : null, dismissLabel && onDismiss ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: dismissLabel, onPress: onDismiss, style: { alignItems: 'center', paddingVertical: tokens.spacing.xs }, children: (0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "base", tone: "muted", weight: "medium", children: dismissLabel }) })) : null] }));
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
function PaywallScreen({ title, subtitle, illustration, logoGlyph = '✦', showHero = true, features, featuresTitle, featureRail, valueFraming, valueProps = [], plans, selectedPlanId, onSelectPlan, billingPeriod = 'annual', onBillingPeriodChange, annualSavingsLabel, trial, ctaLabel = 'Start free trial', onSubscribe, loading = false, footnote, dismissLabel, onDismiss, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const rows = toFeatureRows(features, valueProps);
    const framingRows = toValueFramingRows(valueFraming);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ flex: 1, backgroundColor: colors.surface }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.ScrollView, { contentContainerStyle: {
                    paddingHorizontal: tokens.spacing.lg,
                    paddingVertical: tokens.spacing.xl,
                    gap: tokens.spacing.lg,
                }, children: [showHero ? (0, jsx_runtime_1.jsx)(PaywallHero, { illustration: illustration, logoGlyph: logoGlyph }) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.sm, alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Text, { accessibilityRole: "header", size: "2xl", weight: "bold", align: "center", numberOfLines: 2, children: title }), subtitle ? ((0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "base", tone: "muted", align: "center", numberOfLines: 3, style: { maxWidth: SUBHEAD_MEASURE }, children: subtitle })) : null] }), trial ? ((0, jsx_runtime_1.jsx)(TrialBanner_1.TrialBanner, { title: trial.title, subtitle: trial.subtitle, daysLeft: trial.daysLeft })) : null, (0, jsx_runtime_1.jsx)(PaywallFeatureRows, { rows: rows, heading: featuresTitle, rail: featureRail }), (0, jsx_runtime_1.jsx)(PaywallFeatureRows, { rows: framingRows, heading: valueFraming?.title }), plans?.length ? ((0, jsx_runtime_1.jsx)(PlanSelector_1.PlanSelector, { plans: plans, selectedPlanId: selectedPlanId, onSelectPlan: onSelectPlan, billingPeriod: billingPeriod, onBillingPeriodChange: onBillingPeriodChange, annualSavingsLabel: annualSavingsLabel })) : null] }), (0, jsx_runtime_1.jsx)(PaywallFooter, { ctaLabel: ctaLabel, onSubscribe: onSubscribe, loading: loading, footnote: footnote, dismissLabel: dismissLabel, onDismiss: onDismiss })] }));
}
//# sourceMappingURL=PaywallScreen.js.map