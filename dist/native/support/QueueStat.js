"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueStat = QueueStat;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Card_1 = require("../primitives/Card");
const Statistic_1 = require("../primitives/Statistic");
const internal_1 = require("./internal");
const TONE_SLOT = {
    neutral: 'muted',
    primary: 'primary',
    success: 'success',
    warn: 'warn',
    danger: 'danger',
};
/**
 * A single queue KPI tile — a leading tinted glyph chip plus a `Statistic`
 * (caption, big value, optional delta/suffix). Built for helpdesk dashboards
 * ("Open", "Waiting", "Breached SLA", "CSAT"). The chip tone maps to
 * `SemanticColors` via a token tint; the delta arrow/tone comes from the
 * underlying `Statistic`. Supports a `loading` placeholder. No literal hex.
 */
function QueueStat({ label, value, delta, trend, suffix, tone = 'neutral', glyph, loading = false, card = true, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const accent = colors[TONE_SLOT[tone] ?? 'muted'];
    const inner = loading ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading metric", style: { gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 10, width: '50%', borderRadius: 4, backgroundColor: (0, internal_1.withAlpha)(colors.onSurface, 0.1) } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 28, width: '35%', borderRadius: 4, backgroundColor: (0, internal_1.withAlpha)(colors.onSurface, 0.12) } })] })) : ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [glyph ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 40,
                    height: 40,
                    borderRadius: tokens.radius.md,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: (0, internal_1.withAlpha)(accent, 0.14),
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: accent, fontSize: tokens.typography.scale.lg }, children: glyph }) })) : null, (0, jsx_runtime_1.jsx)(Statistic_1.Statistic, { label: label, value: value, delta: delta, trend: trend, suffix: suffix, style: { flex: 1 } })] }));
    if (!card) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: `${label}: ${String(value)}`, style: style, children: inner }));
    }
    return ((0, jsx_runtime_1.jsx)(Card_1.Card, { variant: "outlined", padding: "md", accessibilityLabel: `${label}: ${String(value)}`, style: style, children: inner }));
}
//# sourceMappingURL=QueueStat.js.map