"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CauseCardV2 = CauseCardV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Badge_1 = require("../primitives/Badge");
const Icon_1 = require("../primitives/Icon");
const motion_1 = require("../primitives/internal/motion");
const internal_1 = require("./internal");
/**
 * CauseCard — design variant **V2**: a **full-bleed cover hero**. The cover fills
 * the whole tile; a token-tinted scrim sits over its lower half so the category
 * badge, title, blurb, and a slim progress overlay read in light ink regardless
 * of the photo. Progress is sized to `raised/goal` (divide-by-zero guarded via
 * `goalPct`) and always paired with a printed percent — never color alone.
 * Pressable cards get a press-scale spring (reduced-motion aware). Same props as
 * {@link CauseCardProps}. Token-only; money is integer cents.
 */
function CauseCardV2({ title, description, imageUrl, imageAlt, category, raisedCents, goalCents, currency = 'USD', variant = 'default', onPress, loading = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const press = (0, motion_1.usePressScale)();
    const isFeatured = variant === 'featured';
    const height = isFeatured ? 260 : 200;
    const containerStyle = [
        { overflow: 'hidden', borderRadius: tokens.radius.lg, backgroundColor: tokens.ramps.neutral[100] ?? colors.surface },
        style,
    ];
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: "Loading cause", style: containerStyle, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height, backgroundColor: tokens.ramps.neutral[200] ?? colors.border } }) }));
    }
    const hasProgress = typeof raisedCents === 'number' && typeof goalCents === 'number';
    const pct = hasProgress ? (0, internal_1.goalPct)(raisedCents, goalCents) : 0;
    const pctLabel = `${Math.round(pct)}%`;
    const fillWidth = `${pct}%`;
    const light = tokens.ramps.neutral[50] ?? colors.onPrimary;
    const inner = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { height }, children: [imageUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: imageUrl }, accessible: true, accessibilityLabel: imageAlt ?? title, resizeMode: "cover", style: { width: '100%', height: '100%' } })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, alignItems: 'center', justifyContent: 'center' }, children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83E\uDD1D", size: "3xl" }) })), category ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { position: 'absolute', top: tokens.spacing.sm, left: tokens.spacing.sm }, children: (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: "primary", children: category }) })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    padding: tokens.spacing.md,
                    gap: tokens.spacing.xs,
                    backgroundColor: (0, internal_1.withAlpha)(tokens.ramps.neutral[950] ?? tokens.ramps.neutral[900] ?? colors.onSurface, 0.55),
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: light, fontSize: isFeatured ? tokens.typography.scale.xl : tokens.typography.scale.lg, fontWeight: '800' }, children: title }), description ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: (0, internal_1.withAlpha)(light, 0.85), fontSize: tokens.typography.scale.sm }, children: description })) : null, hasProgress ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs, marginTop: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 6, borderRadius: tokens.radius.full, backgroundColor: (0, internal_1.withAlpha)(light, 0.3), overflow: 'hidden' }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: '100%', width: fillWidth, backgroundColor: colors.primary, borderRadius: tokens.radius.full } }) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: light, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: `${(0, internal_1.formatMoney)(raisedCents, currency)} raised · ${pctLabel} of goal` })] })) : null] })] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { transform: [{ scale: press.scale }] }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: title, onPress: onPress, onPressIn: press.onPressIn, onPressOut: press.onPressOut, style: containerStyle, children: inner }) }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { style: containerStyle, children: inner });
}
//# sourceMappingURL=CauseCardV2.js.map