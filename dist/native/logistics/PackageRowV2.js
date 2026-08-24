"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageRowV2 = PackageRowV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const elevation_1 = require("../primitives/internal/elevation");
const motion_1 = require("../primitives/internal/motion");
const internal_1 = require("./internal");
/**
 * PackageRow, alternate design **V2** — an *elevated package card*. Where the
 * classic is a flat dense row, V2 is a shadowed card: a large rounded package
 * glyph tile on the left, the id + contents stacked beside it, and the
 * weight/dimensions promoted into two labelled metric pills on their own row.
 * The status is a glyph + word badge in the header corner. Selection is a full
 * primary ring (plus a token scan-bar accent), never color alone. Springs on
 * press; fades in on mount. Same props. No literal colors.
 */
function PackageRowV2({ packageId, contents, weight, weightUnit = 'kg', dimensions, status, selected = false, onPress, testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = status ? internal_1.SHIPMENT_META[status] : undefined;
    const accent = meta ? (0, internal_1.toneColor)(colors, meta.tone) : colors.muted;
    const enter = (0, motion_1.useEnter)({ translateY: 6 });
    const press = (0, motion_1.usePressScale)();
    const containerStyle = [
        {
            borderRadius: tokens.radius.lg,
            backgroundColor: colors.surface,
            padding: tokens.spacing.md,
            gap: tokens.spacing.sm,
            borderWidth: selected ? 2 : 0,
            borderColor: selected ? colors.primary : 'transparent',
            ...(0, elevation_1.shadow)('sm', tokens),
        },
        style,
    ];
    const metric = (label, value) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            flex: 1,
            gap: 1,
            paddingHorizontal: tokens.spacing.sm,
            paddingVertical: tokens.spacing.xs,
            borderRadius: tokens.radius.md,
            backgroundColor: tokens.ramps.neutral[100],
        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.xs, color: colors.muted }, children: label }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { fontSize: tokens.typography.scale.sm, fontWeight: '700', color: colors.onSurface }, children: value })] }));
    const hasMetrics = weight != null || dimensions;
    const content = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: 44,
                            height: 44,
                            borderRadius: tokens.radius.md,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: (0, color_1.withAlpha)(accent, 0.14),
                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.lg, color: accent }, children: "\uD83D\uDCE6" }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { fontSize: tokens.typography.scale.base, fontWeight: '700', color: colors.onSurface }, children: packageId }), contents ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { fontSize: tokens.typography.scale.xs, color: colors.muted }, children: contents })) : null] }), meta ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: tokens.spacing.xs,
                            paddingHorizontal: tokens.spacing.sm,
                            paddingVertical: tokens.spacing.xs,
                            borderRadius: tokens.radius.full,
                            backgroundColor: (0, color_1.withAlpha)(accent, 0.16),
                        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.xs, color: accent }, children: meta.glyph }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.xs, fontWeight: '700', color: accent }, children: meta.label })] })) : null] }), hasMetrics ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.sm }, children: [weight != null ? metric('Weight', (0, internal_1.formatWeight)(weight, weightUnit)) : null, dimensions ? metric('Dimensions', dimensions) : null] })) : null] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: [enter, { transform: [...enter.transform, { scale: press.scale }] }], children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Package ${packageId}${meta ? `, ${meta.label}` : ''}`, accessibilityState: { selected }, onPress: onPress, onPressIn: press.onPressIn, onPressOut: press.onPressOut, testID: testID, style: containerStyle, children: content }) }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { accessibilityLabel: `Package ${packageId}${meta ? `, ${meta.label}` : ''}`, accessibilityState: { selected }, testID: testID, style: [containerStyle, enter], children: content }));
}
//# sourceMappingURL=PackageRowV2.js.map