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
exports.RiskScoreV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const ProgressV4_1 = require("../primitives/ProgressV4");
const coverage_v4_1 = require("./coverage-v4");
const tone_v4_1 = require("./internal/tone-v4");
const TIER_ORDER = ['low', 'moderate', 'high'];
/** Where a position on the caller's own scale falls, in thirds. */
function tierFromRatio(ratio) {
    if (ratio <= 1 / 3)
        return 'low';
    if (ratio <= 2 / 3)
        return 'moderate';
    return 'high';
}
/**
 * **V4 risk score** — same props as {@link RiskScore} plus `min`, `max`,
 * `tierLabels` and `scoreLabel`.
 *
 * ## Five changes
 *
 * 1. **A 300–850 model can be rendered.** The scale was hard-coded 0–100 with
 *    33/66 cutoffs, so an insurer whose underwriting model runs on any other
 *    range could not use the component at all — a 720 clamped to 100 and
 *    reported "High risk". `min` and `max` are the caller's, and a score
 *    outside them is said out loud rather than silently clamped to the edge.
 * 2. **`score={95} tier="low"` no longer renders a green "Low risk".** An
 *    explicit `tier` overrode the score outright, and the pill was the loudest
 *    thing on the card, so the applicant read the colour and not the number.
 *    The numeral, its scale and the meter are always drawn from `score`; the
 *    tier is a word beside them, and when the caller's tier contradicts where
 *    the score actually sits, both are shown rather than one quietly winning.
 * 3. **The tier stops spending a status colour.** `low → success`,
 *    `high → danger` told an applicant they had passed or failed something. A
 *    tier is an underwriting classification, the same kind of thing as a credit
 *    band; the ordering lives in the numeral and the meter, where it is
 *    checkable, and the glyph carries the tier at a glance.
 * 4. **The meter is exposed.** The bar was decorative — `Progress` with no
 *    name — so a screen-reader user got the numeral and nothing about where it
 *    sits on the range. It is a named `progressbar` with the score, its floor
 *    and its ceiling.
 * 5. **The score was announced by a label that replaced it.** `aria-label` on
 *    the `<span>` holding the numeral meant the "/ 100" beside it was never
 *    read; the name now carries the whole reading, and every word is a prop.
 */
exports.RiskScoreV4 = React.forwardRef(function RiskScoreV4({ score, tier, label = 'Risk score', factors = [], min = 0, max = 100, tierLabels, scoreLabel, outOfRangeLabel = 'Off scale', className, ...rest }, ref) {
    const parts = (0, coverage_v4_1.scoreParts)(score, min, max);
    const derivedTier = tierFromRatio(parts.ratio);
    const shownTier = tier ?? derivedTier;
    const labelFor = (value) => tierLabels?.[value] ?? tone_v4_1.RISK_TIER_META_V4[value].label;
    const meta = tone_v4_1.RISK_TIER_META_V4[shownTier] ?? tone_v4_1.RISK_TIER_META_V4.moderate;
    const list = Array.isArray(factors) ? factors : [];
    const scoreText = String(Math.round(parts.value));
    const scaleText = `/ ${parts.max}`;
    const meterName = scoreLabel ?? label;
    // The caller asserted a tier the score does not sit in. Neither is deleted:
    // overriding was the defect, and silently overriding the override would be
    // the same defect pointed the other way.
    const contradiction = tier != null && tier !== derivedTier
        ? `Score sits in the ${labelFor(derivedTier)} band`
        : undefined;
    // The words are the caller's; the range is the caller's own numbers, so it
    // is appended rather than embedded in a string they would have to rebuild.
    const outOfRange = parts.outOfRange
        ? `${outOfRangeLabel}: ${parts.min}–${parts.max}`
        : undefined;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-sm', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-end justify-between gap-sm", children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex flex-col gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm font-semibold text-muted-text", children: label }), (0, jsx_runtime_1.jsxs)("span", { className: "flex items-baseline gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-3xl font-bold text-on-card', tone_v4_1.TABULAR_CLASS), children: scoreText }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-sm text-muted-text', tone_v4_1.TABULAR_CLASS), children: scaleText })] })] }), (0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('flex shrink-0 items-center gap-xs rounded-[var(--xen-radius-full)] px-sm py-xs', (0, tone_v4_1.toneInkClass)(meta.tone)), style: (0, tone_v4_1.toneGroundStyle)(meta.tone), children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-xs", children: meta.glyph }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-bold", children: labelFor(shownTier) }), (0, jsx_runtime_1.jsx)("span", { className: "sr-only", children: `Tier ${TIER_ORDER.indexOf(shownTier) + 1} of ${TIER_ORDER.length}` })] })] }), (0, jsx_runtime_1.jsx)(ProgressV4_1.ProgressV4, { value: parts.value - parts.min, max: parts.max - parts.min, tone: "primary", "aria-label": (0, tone_v4_1.spokenLine)([
                    meterName,
                    `${scoreText} out of ${parts.max}`,
                    labelFor(shownTier),
                    contradiction,
                    outOfRange,
                ]), "aria-valuenow": parts.value, "aria-valuemin": parts.min, "aria-valuemax": parts.max, "aria-valuetext": `${scoreText} of ${parts.max}, ${labelFor(shownTier)}` }), contradiction != null || outOfRange != null ? ((0, jsx_runtime_1.jsx)("p", { className: "text-xs font-semibold text-warn-text", children: (0, tone_v4_1.spokenLine)([outOfRange, contradiction]) })) : null, list.length > 0 ? ((0, jsx_runtime_1.jsx)("ul", { "aria-label": `${label} factors`, className: "mt-xs flex flex-col gap-xs", children: list.map((factor, index) => ((0, jsx_runtime_1.jsxs)("li", { className: "flex gap-xs text-xs text-muted-text", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: "\u2022" }), (0, jsx_runtime_1.jsx)("span", { className: "flex-1", children: factor })] }, `${factor}-${index}`))) })) : null] }));
});
//# sourceMappingURL=RiskScoreV4.js.map