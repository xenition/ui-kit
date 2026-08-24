"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RiskScore = RiskScore;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const primitives_2 = require("../primitives");
const format_1 = require("./internal/format");
const TIER = {
    low: { label: 'Low risk', glyph: '🟢', tone: 'success', color: 'success' },
    moderate: { label: 'Moderate risk', glyph: '🟡', tone: 'warn', color: 'warn' },
    high: { label: 'High risk', glyph: '🔴', tone: 'danger', color: 'danger' },
};
/** Derive a tier from a 0–100 score when one isn't provided. */
function tierFromScore(score) {
    if (score <= 33)
        return 'low';
    if (score <= 66)
        return 'moderate';
    return 'high';
}
/**
 * An underwriting risk gauge: a 0–100 score with a tier read out by
 * **glyph + label + color** (low → success, high → danger — never color alone),
 * a token `Progress` bar, and an optional factor list. The score is clamped to
 * 0–100 and rounded; the tier derives from the score when not given. Factor
 * indexing is guarded. Token-bound throughout.
 */
function RiskScore({ score, tier, label = 'Risk score', factors = [], style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const clamped = Number.isFinite(score) ? Math.min(100, Math.max(0, Math.round(score))) : 0;
    const td = TIER[tier ?? tierFromScore(clamped)];
    const list = Array.isArray(factors) ? factors : [];
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.sm }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: label }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityLabel: `${label}: ${clamped} out of 100, ${td.label}`, style: { color: colors.onSurface, fontSize: tokens.typography.scale['3xl'], fontWeight: '700' }, children: clamped }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "/ 100" })] })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: tokens.spacing.xs,
                            borderRadius: tokens.radius.full,
                            paddingVertical: tokens.spacing.xs,
                            paddingHorizontal: tokens.spacing.sm,
                            backgroundColor: (0, format_1.withAlpha)(colors[td.color], 0.14),
                        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.xs }, allowFontScaling: false, children: td.glyph }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors[td.color], fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: td.label })] })] }), (0, jsx_runtime_1.jsx)(primitives_2.Progress, { value: clamped, max: 100, tone: td.tone }), list.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { gap: tokens.spacing.xs, marginTop: tokens.spacing.xs }, children: list.map((factor, i) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: "\u2022" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { flex: 1, color: colors.muted, fontSize: tokens.typography.scale.xs }, children: factor })] }, `${factor}-${i}`))) })) : null] }));
}
//# sourceMappingURL=RiskScore.js.map