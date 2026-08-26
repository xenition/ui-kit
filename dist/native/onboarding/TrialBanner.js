"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrialBanner = TrialBanner;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
/**
 * Free-trial status strip — a tinted banner that advertises an active or
 * available trial and, optionally, a countdown chip and an inline action. Sits
 * atop the paywall (value-first framing, design.md §27) or in-app once a trial
 * is running. Tone maps to the accent/warn/success token pairs. No literal
 * colors.
 *
 * **There is deliberately no `TrialBannerV2`/`V3`.** A strip this small has one
 * correct shape, so the base component *is* its whole design line — which is
 * why a V2 or V3 paywall composing this base banner is correct rather than a
 * cross-line leak. `design-line-composition.native.spec.tsx` documents the same
 * conclusion from the other side.
 */
function TrialBanner({ title, subtitle, daysLeft, tone = 'info', actionLabel, onActionPress, icon = '✨', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const bgKey = tone === 'warn' ? 'warn' : tone === 'success' ? 'success' : 'accent';
    const fgKey = tone === 'warn' ? 'onWarn' : tone === 'success' ? 'onSuccess' : 'onAccent';
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "summary", style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.sm,
                backgroundColor: colors[bgKey],
                borderRadius: tokens.radius.md,
                paddingVertical: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.md,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: icon, size: "lg", color: fgKey }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "base", weight: "bold", tone: fgKey, children: title }), subtitle ? ((0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "sm", tone: fgKey, style: { opacity: 0.9 }, children: subtitle })) : null] }), typeof daysLeft === 'number' ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    borderRadius: tokens.radius.full,
                    paddingVertical: tokens.spacing.xs,
                    paddingHorizontal: tokens.spacing.sm,
                    backgroundColor: colors.surface,
                }, children: (0, jsx_runtime_1.jsxs)(primitives_1.Text, { size: "xs", weight: "bold", children: [Math.max(0, daysLeft), " ", Math.max(0, daysLeft) === 1 ? 'day' : 'days', " left"] }) })) : null, actionLabel && onActionPress ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: actionLabel, onPress: onActionPress, hitSlop: tokens.spacing.sm, children: (0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "sm", weight: "bold", tone: fgKey, style: { textDecorationLine: 'underline' }, children: actionLabel }) })) : null] }));
}
//# sourceMappingURL=TrialBanner.js.map