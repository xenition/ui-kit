"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SurveyNavigator = SurveyNavigator;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const primitives_1 = require("../primitives");
/**
 * SurveyNavigator — the survey flow's **footer** (V4 "focus" line). A calm,
 * non-gradient bar: a slim primary progress track with a `Step N of M` caption
 * (exposed as a `progressbar`), a ghost Back button and a primary Next button.
 * On the final step Next becomes Submit (still primary, routed to `onSubmit` and
 * falling back to `onNext`). Both actions are big ≥44px thumb-zone `Button`
 * primitives. Presentational only (step index + callbacks). Token-only colors
 * via `useXenitionTheme()` (no literals), dark-mode safe.
 */
function SurveyNavigator({ step, total, onBack, onNext, onSubmit, backLabel = 'Back', nextLabel = 'Next', submitLabel = 'Submit', nextDisabled = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const safeTotal = Math.max(1, Math.trunc(total));
    const current = Math.min(Math.max(1, Math.trunc(step)), safeTotal);
    const pct = Math.round((current / safeTotal) * 100);
    const isLast = current >= safeTotal;
    const showBack = onBack != null && current > 1;
    const advance = isLast ? onSubmit ?? onNext : onNext;
    const advanceLabel = isLast ? submitLabel : nextLabel;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                borderRadius: tokens.radius.lg,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.surface,
                padding: tokens.spacing.md,
                gap: tokens.spacing.sm,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "progressbar", accessibilityValue: { min: 1, max: safeTotal, now: current }, accessibilityLabel: `Step ${current} of ${safeTotal}`, style: {
                            height: 6,
                            borderRadius: tokens.radius.full,
                            backgroundColor: (0, color_1.withAlpha)(colors.onSurface, 0.1),
                            overflow: 'hidden',
                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: `${pct}%`, height: '100%', borderRadius: tokens.radius.full, backgroundColor: colors.primary } }) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: `Step ${current} of ${safeTotal}` })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [showBack ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "ghost", size: "lg", accessibilityLabel: backLabel, onPress: onBack, style: { flex: 1, minHeight: 44 }, children: backLabel })) : null, (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", size: "lg", accessibilityLabel: advanceLabel, onPress: advance, disabled: nextDisabled, style: { flex: 1, minHeight: 44 }, children: advanceLabel })] })] }));
}
//# sourceMappingURL=SurveyNavigator.js.map