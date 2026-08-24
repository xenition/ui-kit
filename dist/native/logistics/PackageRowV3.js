"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageRowV3 = PackageRowV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const internal_1 = require("./internal");
/**
 * PackageRow, alternate design **V3** — an *ultra-dense single line*. A small
 * inline package glyph, the id, then `weight · dims` collapsed into one muted
 * meta segment, and a trailing status glyph + word — all on one row with no
 * card chrome, tuned for long scannable manifests. Selection shows as a leading
 * token accent bar plus the a11y selected state (never color alone). Same props.
 */
function PackageRowV3({ packageId, contents, weight, weightUnit = 'kg', dimensions, status, selected = false, onPress, testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = status ? internal_1.SHIPMENT_META[status] : undefined;
    const accent = meta ? (0, internal_1.toneColor)(colors, meta.tone) : colors.muted;
    const metaLine = [
        contents,
        weight != null ? (0, internal_1.formatWeight)(weight, weightUnit) : null,
        dimensions,
    ]
        .filter(Boolean)
        .join('  ·  ');
    const containerStyle = [
        {
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.sm,
            paddingVertical: tokens.spacing.xs,
            paddingHorizontal: tokens.spacing.xs,
            borderBottomWidth: 1,
            borderColor: colors.border,
            backgroundColor: 'transparent',
        },
        style,
    ];
    const inner = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 3,
                    alignSelf: 'stretch',
                    borderRadius: tokens.radius.full,
                    backgroundColor: selected ? colors.primary : 'transparent',
                } }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.sm, color: colors.muted }, children: "\uD83D\uDCE6" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { fontSize: tokens.typography.scale.sm, fontWeight: '600', color: colors.onSurface }, children: packageId }), metaLine ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { fontSize: tokens.typography.scale.xs, color: colors.muted }, children: metaLine })) : null] }), meta ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.xs, color: accent }, children: meta.glyph }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.xs, fontWeight: '600', color: accent }, children: meta.label })] })) : null] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Package ${packageId}${meta ? `, ${meta.label}` : ''}`, accessibilityState: { selected }, onPress: onPress, testID: testID, style: ({ pressed }) => [containerStyle, { backgroundColor: pressed ? (0, color_1.withAlpha)(colors.primary, 0.04) : 'transparent' }], children: inner }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityState: { selected }, testID: testID, style: containerStyle, children: inner }));
}
//# sourceMappingURL=PackageRowV3.js.map