"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageRowV4 = PackageRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const internal_1 = require("./internal");
/**
 * PackageRow — **V4** "dispatch" design (native twin of the web V4). The
 * confident, operations-desk take on a parcel row: an elevated rounded row with
 * a soft shadow, a parcel glyph in a soft-primary well, the package-id headline,
 * a contents sub-line, a weight · dimensions metric chip, and a labelled glyph +
 * word status badge (never color alone). Selection shows a primary border;
 * tappable when `onPress` is set. Honors the V4 `variant` — `full` (default) and
 * `compact` (a denser single line). Token-only colors via `useXenitionTheme()`.
 */
function PackageRowV4({ packageId, contents, weight, weightUnit = 'kg', dimensions, status, selected = false, variant = 'full', onPress, testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = status ? internal_1.SHIPMENT_META[status] : undefined;
    const metric = [weight != null ? (0, internal_1.formatWeight)(weight, weightUnit) : null, dimensions].filter(Boolean).join(' · ');
    const shell = {
        backgroundColor: colors.card,
        borderColor: selected ? colors.primary : colors.border,
        borderWidth: 1,
        borderRadius: tokens.radius.lg,
        shadowColor: colors.onSurface,
        shadowOpacity: 0.06,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 2,
    };
    const a11y = `Package ${packageId}${meta ? `, ${meta.label}` : ''}`;
    const badge = meta ? ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: meta.tone, variant: "soft", size: "sm", children: `${meta.glyph} ${meta.label}` })) : null;
    const compact = variant === 'compact';
    const content = compact ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.base }, children: "\uD83D\uDCE6" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flexShrink: 1, fontSize: tokens.typography.scale.sm, fontWeight: '600', color: colors.onSurface }, children: packageId }), weight != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.xs, color: colors.muted, fontVariant: ['tabular-nums'] }, children: (0, internal_1.formatWeight)(weight, weightUnit) })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { marginLeft: 'auto' }, children: badge })] })) : ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 44, height: 44, borderRadius: tokens.radius.md, alignItems: 'center', justifyContent: 'center', backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1) }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.lg }, children: "\uD83D\uDCE6" }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { fontSize: tokens.typography.scale.base, fontWeight: '600', color: colors.onSurface }, children: packageId }), contents ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { fontSize: tokens.typography.scale.xs, color: colors.muted }, children: contents }) : null, metric ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { alignSelf: 'flex-start', backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1), borderRadius: tokens.radius.sm, paddingHorizontal: tokens.spacing.xs }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { fontSize: tokens.typography.scale.xs, color: colors.muted, fontVariant: ['tabular-nums'] }, children: metric }) })) : null] }), badge] }));
    const layout = compact
        ? { minHeight: 44, paddingVertical: tokens.spacing.sm, paddingHorizontal: tokens.spacing.md }
        : { minHeight: 56, paddingVertical: tokens.spacing.sm, paddingHorizontal: tokens.spacing.md };
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11y, accessibilityState: { selected }, onPress: onPress, testID: testID, style: ({ pressed }) => [shell, layout, { opacity: pressed ? 0.8 : 1 }, style], children: content }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { testID: testID, style: [shell, layout, style], children: content });
}
//# sourceMappingURL=PackageRowV4.js.map