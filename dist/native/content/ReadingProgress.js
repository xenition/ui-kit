"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadingProgress = ReadingProgress;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
/** Clamp an arbitrary number into the `[0, 1]` reading fraction. */
function clampFraction(n) {
    if (Number.isNaN(n))
        return 0;
    return Math.max(0, Math.min(1, n));
}
/**
 * A reading-progress indicator for an article reader — the thin bar that fills
 * as the reader scrolls. Composes the `Progress` primitive (0–100 scale) from a
 * clamped `0`–`1` fraction, so a scroll handler can drive it directly. A
 * `labeled` variant adds a percentage readout. Announced as a progress bar to
 * screen readers. All colors come from `SemanticColors`; no literal hex.
 */
function ReadingProgress({ progress, variant = 'bar', style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const fraction = clampFraction(progress);
    const pct = Math.round(fraction * 100);
    if (variant === 'labeled') {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 }, children: (0, jsx_runtime_1.jsx)(primitives_1.Progress, { value: pct, max: 100, tone: "primary", size: "sm" }) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityLabel: `${pct} percent read`, style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600', minWidth: 34, textAlign: 'right' }, children: `${pct}%` })] }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: `${pct} percent read`, style: style, children: (0, jsx_runtime_1.jsx)(primitives_1.Progress, { value: pct, max: 100, tone: "primary", size: "sm" }) }));
}
//# sourceMappingURL=ReadingProgress.js.map