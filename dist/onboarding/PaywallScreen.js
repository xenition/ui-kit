"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaywallScreen = exports.PaywallFeatureRows = void 0;
exports.toFeatureRows = toFeatureRows;
exports.toValueFramingRows = toValueFramingRows;
exports.PaywallHero = PaywallHero;
exports.PaywallFooter = PaywallFooter;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Icon_1 = require("../primitives/Icon");
const Text_1 = require("../primitives/Text");
const icon_names_1 = require("../primitives/icon-names");
const money_1 = require("../commerce/money");
const GetStartedButton_1 = require("./GetStartedButton");
const PlanSelector_1 = require("./PlanSelector");
const TrialBanner_1 = require("./TrialBanner");
/** Rail turns itself on once the list is long enough to fragment (§8). */
const RAIL_FROM_ROWS = 3;
/**
 * §8 feature rows — circular icon badge on a `primary-50` ground with the glyph
 * in `primary`, a semibold title, a muted description, and an optional hairline
 * rail joining the badges.
 *
 * Exported from this module rather than a file of its own because it is one
 * pattern shared by every paywall line and by the value-framing block: the
 * "less than your everyday spending" section is these rows under a different
 * heading, not a second component.
 */
exports.PaywallFeatureRows = React.forwardRef(function PaywallFeatureRows({ rows, heading, rail, dense = false, className, ...rest }, ref) {
    if (rows.length === 0)
        return null;
    const showRail = rail ?? rows.length >= RAIL_FROM_ROWS;
    const badge = dense ? 'h-9 w-9' : 'h-11 w-11';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-2', className), ...rest, children: [heading ? ((0, jsx_runtime_1.jsx)(Text_1.Text, { size: "sm", tone: "muted", weight: "semibold", children: heading })) : null, (0, jsx_runtime_1.jsx)("ul", { className: "flex flex-col", children: rows.map((row, i) => {
                    const last = i === rows.length - 1;
                    const glyph = row.icon ?? 'check';
                    return ((0, jsx_runtime_1.jsxs)("li", { 
                        // The rhythm lives in the padding, not a `gap`, so the rail can
                        // run through it unbroken.
                        className: (0, cn_1.cn)('flex items-stretch', !last && (dense ? 'pb-2' : 'pb-4')), children: [(0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex shrink-0 flex-col items-center', badge), children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex shrink-0 items-center justify-center rounded-full bg-primary-50', badge), children: (0, icon_names_1.isIconName)(glyph) ? ((0, jsx_runtime_1.jsx)(Icon_1.Icon, { name: glyph, size: dense ? 'base' : 'lg', color: "primary" })) : ((0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: glyph, size: dense ? 'base' : 'lg', color: "primary" })) }), showRail && !last ? ((0, jsx_runtime_1.jsx)("span", { "data-testid": "xen-paywall-rail", className: "mt-1 w-px flex-1 bg-border" })) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-1 pl-4", children: [(0, jsx_runtime_1.jsx)(Text_1.Text, { size: dense ? 'sm' : 'base', weight: "semibold", children: row.title }), row.description ? ((0, jsx_runtime_1.jsx)(Text_1.Text, { size: "sm", tone: "muted", children: row.description })) : null] })] }, row.id ?? i));
                }) })] }));
});
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
        const price = (0, money_1.formatMoney)(framing.perDayCents, framing.currency ?? 'USD');
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
 * The hero slot (§3): a tinted, ~4:3 panel capped at ~38% of the viewport so
 * the sticky CTA never leaves the fold. Falls back to the brand medallion at
 * hero size when the app supplies no artwork.
 */
function PaywallHero({ illustration, logoGlyph, }) {
    return ((0, jsx_runtime_1.jsx)("div", { className: "flex aspect-[4/3] max-h-[38vh] w-full items-center justify-center overflow-hidden rounded-[var(--xen-radius-lg)] bg-primary-50", children: illustration ?? ((0, jsx_runtime_1.jsx)("span", { className: "flex h-14 w-14 items-center justify-center rounded-full bg-primary", children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: logoGlyph, size: "2xl", color: "onPrimary" }) })) }));
}
/**
 * The sticky footer (§5) — one anatomy shared by all three lines, which is why
 * it is exported from here rather than copied into each: a hairline divider,
 * the full-width 56-tall CTA, the fine print, and the secondary action **below**
 * the CTA as a muted text link, never beside it competing for the same weight.
 */
function PaywallFooter({ ctaLabel, onSubscribe, loading, footnote, dismissLabel, onDismiss, sticky = true, }) {
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex flex-col gap-2 border-t border-border bg-surface px-6 pb-6 pt-4', sticky && 'sticky bottom-0'), children: [(0, jsx_runtime_1.jsx)(GetStartedButton_1.GetStartedButton, { label: ctaLabel, loading: loading, onClick: onSubscribe }), footnote ? ((0, jsx_runtime_1.jsx)(Text_1.Text, { size: "xs", tone: "muted", align: "center", children: footnote })) : null, dismissLabel && onDismiss ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": dismissLabel, onClick: onDismiss, className: "py-1 text-center text-base font-medium text-muted", children: dismissLabel })) : null] }));
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
 * GetStartedButton}, with an optional "Maybe later" escape. The body scrolls
 * while the CTA stays pinned. All colors token-bound. No literal colors.
 */
exports.PaywallScreen = React.forwardRef(function PaywallScreen({ title, subtitle, illustration, logoGlyph = '✦', showHero = true, features, featuresTitle, featureRail, valueFraming, valueProps = [], plans, selectedPlanId, onSelectPlan, billingPeriod = 'annual', onBillingPeriodChange, annualSavingsLabel, trial, ctaLabel = 'Start free trial', onSubscribe, loading = false, footnote, dismissLabel, onDismiss, className, ...rest }, ref) {
    const rows = toFeatureRows(features, valueProps);
    const framingRows = toValueFramingRows(valueFraming);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex min-h-full flex-col bg-surface', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 flex-col gap-6 overflow-y-auto px-6 py-8", children: [showHero ? (0, jsx_runtime_1.jsx)(PaywallHero, { illustration: illustration, logoGlyph: logoGlyph }) : null, (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center gap-2", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-center text-2xl font-bold leading-tight text-on-surface", children: title }), subtitle ? ((0, jsx_runtime_1.jsx)(Text_1.Text, { size: "base", tone: "muted", align: "center", className: "max-w-prose", children: subtitle })) : null] }), trial ? ((0, jsx_runtime_1.jsx)(TrialBanner_1.TrialBanner, { title: trial.title, subtitle: trial.subtitle, daysLeft: trial.daysLeft })) : null, (0, jsx_runtime_1.jsx)(exports.PaywallFeatureRows, { rows: rows, heading: featuresTitle, rail: featureRail }), (0, jsx_runtime_1.jsx)(exports.PaywallFeatureRows, { rows: framingRows, heading: valueFraming?.title }), plans?.length ? ((0, jsx_runtime_1.jsx)(PlanSelector_1.PlanSelector, { plans: plans, selectedPlanId: selectedPlanId, onSelectPlan: onSelectPlan, billingPeriod: billingPeriod, onBillingPeriodChange: onBillingPeriodChange, annualSavingsLabel: annualSavingsLabel })) : null] }), (0, jsx_runtime_1.jsx)(PaywallFooter, { ctaLabel: ctaLabel, onSubscribe: onSubscribe, loading: loading, footnote: footnote, dismissLabel: dismissLabel, onDismiss: onDismiss })] }));
});
//# sourceMappingURL=PaywallScreen.js.map