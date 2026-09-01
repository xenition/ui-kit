"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeatureLockCardV2 = FeatureLockCardV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
/** §10.1 geometry: the glyph plate that fills the banner's leading edge. */
const PLATE = 64;
/**
 * Locked feature — V2, the editorial line: a **banner** on the brand fill,
 * with the plan ribbon over it and the CTA as a light button on the colour.
 *
 * The base is a quiet card that says "this is locked". This one is an
 * advertisement: it is the loudest thing on whatever screen it lands on, which
 * is right when the gate IS the screen — an empty state, a feature the user
 * just tried to open — and wrong in a list, which is what V3 is for.
 *
 * The copy is `onPrimary` throughout rather than `onSurface`, so the contrast
 * promise is the one the compiler actually made about this fill; the CTA
 * inverts to a `surface` fill with `primaryText` on it, which is the only
 * shape that stays legible on top of a saturated band.
 *
 * `variant="inline"` is accepted and ignored: an inline banner is a
 * contradiction, and an app that wants a compact row wants V3.
 *
 * Same props as {@link FeatureLockCard}. Token-pure.
 */
function FeatureLockCardV2({ title, description, icon = '🔒', planLabel = 'Pro', unlockLabel = 'Unlock', onUnlock, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    if (!title)
        return null;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "summary", style: [
            {
                backgroundColor: colors.primary,
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.lg,
                gap: tokens.spacing.md,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: PLATE,
                            height: PLATE,
                            borderRadius: tokens.radius.lg,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: colors.surface,
                        }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: icon, size: "2xl", accessibilityLabel: "Locked" }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [planLabel ? ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "neutral", size: "sm", children: planLabel })) : null, (0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "lg", weight: "bold", tone: "onPrimary", children: title })] })] }), description ? ((0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "sm", tone: "onPrimary", style: { opacity: 0.9 }, children: description })) : null, (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "secondary", size: "md", onPress: onUnlock, accessibilityLabel: unlockLabel, style: { alignSelf: 'stretch', backgroundColor: colors.surface }, children: (0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "base", weight: "semibold", tone: "primaryText", children: unlockLabel }) })] }));
}
//# sourceMappingURL=FeatureLockCardV2.js.map