"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusPipeline = StatusPipeline;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const types_1 = require("./types");
/**
 * Hiring-funnel progress: applied → screening → interview → offer → hired.
 * Built on the primitive `Steps`, so each stage carries a numbered/checked
 * marker AND its text label — stage is never conveyed by color alone (an
 * explicit accessibility summary states "Stage n of m: <label>", and rejection
 * is announced as text, not just a danger hue). Presentational; pass `stage`.
 */
function StatusPipeline({ stage, rejected = false, variant = 'full', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    // Guard the lookup: an unknown stage resolves to the first step, never -1.
    const idx = Math.max(0, types_1.APPLICATION_STAGES.indexOf(stage));
    const total = types_1.APPLICATION_STAGES.length;
    const label = types_1.STAGE_LABEL[stage] ?? types_1.APPLICATION_STAGES[0];
    const position = `${idx + 1} of ${total}`;
    const summary = rejected
        ? `Rejected at stage ${position}: ${label}`
        : `Stage ${position}: ${label}`;
    if (variant === 'compact') {
        const tone = rejected ? 'danger' : stage === 'hired' ? 'success' : 'primary';
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "text", accessibilityLabel: summary, style: [{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, style], children: [(0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: tone, children: rejected ? `${label} · Rejected` : label }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: position })] }));
    }
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: summary, style: [{ gap: tokens.spacing.sm }, style], children: [(0, jsx_runtime_1.jsx)(primitives_1.Steps, { steps: types_1.APPLICATION_STAGES.map((s) => ({ title: types_1.STAGE_LABEL[s] })), current: idx }), rejected ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.danger, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: `✕ Rejected at ${label}` })) : null] }));
}
//# sourceMappingURL=StatusPipeline.js.map