"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorCardV3 = DoctorCardV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const motion_1 = require("../primitives/internal/motion");
const AVAIL_META = {
    available: { label: 'Available', color: 'successText', glyph: '●' },
    busy: { label: 'Limited', color: 'warnText', glyph: '◐' },
    off: { label: 'Off', color: 'muted', glyph: '○' },
};
/**
 * DoctorCard, redesigned (v3): a **compact directory row**. A small avatar leads
 * a name / specialty stack; the star rating collapses to a single "★ 4.5"
 * figure on the right, and availability shows as a glyph + word (never color
 * alone). No CTA button, no card chrome — a hairline base rule separates rows so
 * a stack reads as a lean provider list. Distinct at a glance from v1's card and
 * v2's centered profile. Same props, token-pure.
 */
function DoctorCardV3({ name, specialty, avatar, rating, reviewCount, availability, onBook, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const press = (0, motion_1.usePressScale)();
    const meta = availability ? AVAIL_META[availability] : undefined;
    const availColor = meta ? colors[meta.color] : colors.muted;
    const a11y = `${name}, ${specialty}${rating != null ? `, rated ${rating} out of 5` : ''}${meta ? `, ${meta.label}` : ''}`;
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                paddingVertical: tokens.spacing.sm,
                borderBottomWidth: 1,
                borderBottomColor: colors.border,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: avatar, name: name, size: "sm" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: name }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: specialty })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end', gap: 1 }, children: [rating != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: [`★ ${rating.toFixed(1)}`, reviewCount != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '500' }, children: ` (${reviewCount})` })) : null] })) : null, meta ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: availColor, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: `${meta.glyph} ${meta.label}` })) : null] })] }));
    if (!onBook) {
        return (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: a11y, children: body });
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { transform: [{ scale: press.scale }] }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11y, onPress: onBook, onPressIn: press.onPressIn, onPressOut: press.onPressOut, style: ({ pressed }) => ({ opacity: pressed ? 0.7 : 1 }), children: body }) }));
}
//# sourceMappingURL=DoctorCardV3.js.map