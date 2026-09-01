"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CSATResultCard = CSATResultCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const GradientSurface_1 = require("./internal/GradientSurface");
const console_1 = require("./internal/console");
const internal_1 = require("./internal");
/** Breakdown bar rows — positive→success, neutral→warn, negative→danger. */
const BREAKDOWN = [
    { key: 'positive', label: 'Positive', slot: 'success' },
    { key: 'neutral', label: 'Neutral', slot: 'warn' },
    { key: 'negative', label: 'Negative', slot: 'danger' },
];
/**
 * CSATResultCard — a gradient "console" results hero for a customer-satisfaction
 * score. The title and a big near-white `score%` numeral sit over the console
 * gradient, above the response count. A positive/neutral/negative breakdown
 * reads as three token bars (success/warn/danger) whose widths are the share of
 * the total raw counts, each on a frosted track. A calm peak-moment surface,
 * dark-mode safe, every color from the compiled theme ramps (token-only, no
 * literals). Presentational — shaped counts only, nothing fetches.
 */
function CSATResultCard({ score, responses, positive, neutral, negative, title = 'Customer satisfaction', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const r = tokens.ramps;
    const ink = (0, console_1.consoleInk)(r);
    const inkSoft = (0, console_1.consoleInkSoft)(r);
    const pct = Math.round((0, internal_1.clamp)(score, 0, 100));
    const p = Math.max(0, Math.trunc(positive || 0));
    const n = Math.max(0, Math.trunc(neutral || 0));
    const g = Math.max(0, Math.trunc(negative || 0));
    const total = p + n + g;
    const counts = { positive: p, neutral: n, negative: g };
    const responseLabel = `${responses} ${responses === 1 ? 'response' : 'responses'}`;
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [{ borderRadius: tokens.radius.lg }, style], children: (0, jsx_runtime_1.jsxs)(GradientSurface_1.GradientSurface, { colors: (0, console_1.consoleGradient)(r), style: { borderRadius: tokens.radius.lg, padding: tokens.spacing.lg, overflow: 'hidden', gap: tokens.spacing.lg }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: inkSoft, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: title }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, accessibilityLabel: `${pct} percent satisfaction`, style: { color: ink, fontSize: tokens.typography.scale['3xl'] * 1.2, fontWeight: '800', letterSpacing: -1 }, children: `${pct}%` }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: inkSoft, fontSize: tokens.typography.scale.sm }, children: responseLabel })] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { gap: tokens.spacing.sm }, children: BREAKDOWN.map(({ key, label, slot }) => {
                        const count = counts[key];
                        const width = total > 0 ? Math.round((count / total) * 100) : 0;
                        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityRole: "text", accessibilityLabel: `${label} ${count} of ${total}`, style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { width: 64, color: inkSoft, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: label }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                        flex: 1,
                                        height: 8,
                                        borderRadius: tokens.radius.full,
                                        backgroundColor: (0, console_1.consoleTile)(r),
                                        overflow: 'hidden',
                                    }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: `${width}%`, height: '100%', borderRadius: tokens.radius.full, backgroundColor: colors[slot] } }) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { width: 32, textAlign: 'right', color: ink, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: count })] }, key));
                    }) })] }) }));
}
//# sourceMappingURL=CSATResultCard.js.map