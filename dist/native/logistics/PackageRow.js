"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageRow = PackageRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const internal_1 = require("./internal");
/**
 * Dense list row for a single package: id headline, contents/SKU sub-line, a
 * weight + dimensions metric column, and an optional glyph + word status badge.
 * Tappable when `onPress` is given (button role + descriptive label). Selection
 * is shown by a primary border, not by color alone (the status still carries a
 * word). All colors are theme tokens.
 */
function PackageRow({ packageId, contents, weight, weightUnit = 'kg', dimensions, status, selected = false, onPress, testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = status ? internal_1.SHIPMENT_META[status] : undefined;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Package ${packageId}${meta ? `, ${meta.label}` : ''}`, accessibilityState: { selected }, disabled: !onPress, onPress: onPress, testID: testID, style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.sm,
                paddingVertical: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.sm,
                borderRadius: tokens.radius.md,
                borderWidth: 1,
                borderColor: selected ? colors.primary : colors.border,
                backgroundColor: colors.surface,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 36,
                    height: 36,
                    borderRadius: tokens.radius.sm,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: tokens.ramps.neutral[100],
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.base, color: colors.muted }, children: "\uD83D\uDCE6" }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { fontSize: tokens.typography.scale.sm, fontWeight: '600', color: colors.onSurface }, children: packageId }), contents ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { fontSize: tokens.typography.scale.xs, color: colors.muted }, children: contents })) : null, weight != null || dimensions ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { fontSize: tokens.typography.scale.xs, color: colors.muted }, children: [weight != null ? (0, internal_1.formatWeight)(weight, weightUnit) : null, dimensions]
                            .filter(Boolean)
                            .join(' · ') })) : null] }), meta ? ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: meta.tone, variant: "soft", size: "sm", children: `${meta.glyph} ${meta.label}` })) : null] }));
}
//# sourceMappingURL=PackageRow.js.map