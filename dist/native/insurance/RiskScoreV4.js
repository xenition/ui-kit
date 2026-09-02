"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RiskScoreV4 = RiskScoreV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const ProgressV4_1 = require("../primitives/ProgressV4");
const TextV4_1 = require("../primitives/TextV4");
const coverage_v4_1 = require("../../insurance/coverage-v4");
const tone_v4_1 = require("./internal/tone-v4");
/**
 * **V4 risk score** — same props as {@link RiskScore} plus `min`, `max`,
 * `tierLabels`, `scoreLabel` and `outOfRangeLabel`.
 *
 * ## Five changes
 *
 * 1. **A 300–850 model can be rendered at all.** The scale was hard-coded 0–100
 *    and the cutoffs hard-coded at 33 and 66, so an insurer whose underwriting
 *    model runs on any other range could not use the component: `score={720}`
 *    clamped to 100 and reported "high risk". `min` and `max` are the caller's
 *    now, the bands are thirds of *that* scale, and `scoreParts` clamps and
 *    reports rather than clamping silently.
 * 2. **The score and the tier can no longer contradict each other.**
 *    `score={95} tier="low"` rendered "95 / 100" beside a green "Low risk"
 *    pill, because an explicit `tier` overrode the number outright. The meter
 *    and the numeral always come from `score`; an explicit `tier` still chooses
 *    the *word*, because it is on the base and removing it would break
 *    callers — but with the tier no longer carrying a status colour, that word
 *    is the caller's label rather than the screen's verdict.
 * 3. **The tier stops spending the alarm palette.** `low → success`,
 *    `high → danger`, drawn as `🟢` / `🟡` / `🔴` — so a screen reader said
 *    "green circle" out loud, a colour-blind reader got three identical grey
 *    dots, and a benefits screen had already used red before anything was
 *    wrong. The band is an ordered glyph (a quarter, a half, a full disc) and a
 *    word on the neutral chip every other kind in this module wears.
 * 4. **The meter reports its value.** The base's bare `Progress` had no role,
 *    no name and no value, so the one number on the screen was invisible to a
 *    reader unless they found the numeral beside it. It is a `progressbar` on
 *    the caller's own scale, and the tier chip and the factor bullets are
 *    hidden because the meter's name already carries them.
 * 5. **A score off its own scale says so** instead of pinning the bar to an end
 *    and asserting a band.
 *
 * The factor bullets lose their `•` from the reader's path — the base drew a
 * `Text` node containing a bullet character beside every factor, and a screen
 * reader announces it.
 */
function RiskScoreV4({ score, tier, label = 'Risk score', factors = [], min = 0, max = 100, tierLabels, scoreLabel, outOfRangeLabel = 'Off scale', style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { tokens } = theme;
    const parts = (0, coverage_v4_1.scoreParts)(score, min, max);
    const band = tier ?? (0, tone_v4_1.tierFromRatio)(parts.ratio);
    const meta = tone_v4_1.RISK_TIER_V4[band] ?? tone_v4_1.RISK_TIER_V4.moderate;
    const word = tierLabels?.[band] ?? meta.label;
    const list = Array.isArray(factors) ? factors : [];
    const name = scoreLabel ?? label;
    const spoken = (0, tone_v4_1.spokenLine)([
        name,
        `${parts.value} / ${parts.max}`,
        word,
        parts.outOfRange ? outOfRangeLabel : null,
        ...list,
    ]);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.sm }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { ...tone_v4_1.DECORATIVE, style: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs / 2 }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", tone: "mutedText", children: label }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "3xl", weight: "bold", tone: "onCard", numeric: "tabular", children: parts.value }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", numeric: "tabular", children: `/ ${parts.max}` })] })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: (0, tone_v4_1.chipStyle)(theme), children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "onCard", children: meta.glyph }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "bold", tone: "onCard", children: word })] })] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityRole: "progressbar", accessibilityLabel: spoken, accessibilityValue: {
                    min: parts.min,
                    max: parts.max,
                    now: parts.value,
                    text: `${parts.value} / ${parts.max}`,
                }, children: (0, jsx_runtime_1.jsx)(ProgressV4_1.ProgressV4, { value: parts.value - parts.min, max: parts.max - parts.min, tone: "primary" }) }), parts.outOfRange ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { ...tone_v4_1.DECORATIVE, size: "xs", weight: "semibold", style: { color: (0, tone_v4_1.toneInk)(theme, 'warn') }, children: outOfRangeLabel })) : null, list.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { ...tone_v4_1.DECORATIVE, style: { gap: tokens.spacing.xs, marginTop: tokens.spacing.xs }, children: list.map((factor, i) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: "\u2022" }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", style: { flex: 1 }, children: factor })] }, `${factor}-${i}`))) })) : null] }));
}
//# sourceMappingURL=RiskScoreV4.js.map