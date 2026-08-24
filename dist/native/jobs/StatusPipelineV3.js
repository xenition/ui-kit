"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusPipelineV3 = StatusPipelineV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const types_1 = require("./types");
/**
 * StatusPipeline — design V3. A minimal, dense read-out: the current stage
 * word (with a ✓/✕ glyph so meaning survives without color) and an `n / total`
 * position on one line, above a thin segmented bar that fills to the current
 * stage. Rejection tints the filled segments danger AND is stated as the word,
 * never color alone. `variant` is accepted for parity but ignored. Token-pure.
 */
function StatusPipelineV3({ stage, rejected = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    // Guarded indexing: an unknown stage resolves to the first step, never -1.
    const idx = Math.max(0, types_1.APPLICATION_STAGES.indexOf(stage));
    const total = types_1.APPLICATION_STAGES.length;
    const label = types_1.STAGE_LABEL[stage] ?? types_1.STAGE_LABEL[types_1.APPLICATION_STAGES[0]];
    const position = `${idx + 1} of ${total}`;
    const summary = rejected
        ? `Rejected at stage ${position}: ${label}`
        : `Stage ${position}: ${label}`;
    const hired = stage === 'hired';
    const wordColor = rejected ? colors.dangerText : hired ? colors.successText : colors.primaryText;
    const word = rejected ? `✕ ${label} · Rejected` : hired ? `✓ ${label}` : label;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: summary, style: [{ gap: tokens.spacing.xs }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flex: 1, color: wordColor, fontWeight: '700', fontSize: tokens.typography.scale.sm }, children: word }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: position })] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', gap: 3 }, children: types_1.APPLICATION_STAGES.map((s, i) => {
                    const filled = i <= idx;
                    const barColor = rejected
                        ? filled
                            ? colors.danger
                            : colors.border
                        : filled
                            ? colors.primary
                            : colors.border;
                    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, height: 6, borderRadius: tokens.radius.full, backgroundColor: barColor } }, s));
                }) })] }));
}
//# sourceMappingURL=StatusPipelineV3.js.map