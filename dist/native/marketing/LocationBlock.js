"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationBlock = LocationBlock;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * Contact/location section — the native mirror of the web `LocationBlock`:
 * name, address, opening-hours rows, and contact lines above a map. The web
 * two-column desktop grid is **stacked vertically** on native (phones are
 * narrow). The web embeds an interactive map `<iframe>`; native has no
 * interactive map, so it renders a **static `mapImageUri` image** or a
 * token-styled placeholder. Phone/email are shown as plain text rather than
 * `tel:`/`mailto:` links. Token-only.
 */
function LocationBlock({ name, address, hours, phone, email, mapImageUri, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { testID: "xen-location-block", style: [{ gap: tokens.spacing.xl }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.md }, children: [name ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: colors.onSurface,
                            fontSize: tokens.typography.scale['2xl'],
                            fontWeight: '700',
                        }, children: name })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.base }, children: address }), hours && hours.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { gap: 0 }, children: hours.map((row, i) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                paddingVertical: tokens.spacing.xs,
                                borderBottomWidth: i === hours.length - 1 ? 0 : 1,
                                borderBottomColor: colors.border,
                            }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                        color: colors.onSurface,
                                        fontSize: tokens.typography.scale.sm,
                                        fontWeight: '500',
                                    }, children: row.label }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: row.value })] }, i))) })) : null, phone || email ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [phone ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primary, fontSize: tokens.typography.scale.sm }, children: phone })) : null, email ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primary, fontSize: tokens.typography.scale.sm }, children: email })) : null] })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    aspectRatio: 16 / 9,
                    width: '100%',
                    overflow: 'hidden',
                    borderRadius: tokens.radius.lg,
                    borderWidth: 1,
                    borderColor: colors.border,
                    backgroundColor: tokens.ramps.neutral[100],
                    alignItems: 'center',
                    justifyContent: 'center',
                }, children: mapImageUri ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: mapImageUri }, style: { width: '100%', height: '100%' }, resizeMode: "cover" })) : ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                        color: colors.muted,
                        fontSize: tokens.typography.scale.sm,
                        textAlign: 'center',
                        paddingHorizontal: tokens.spacing.md,
                    }, children: address })) })] }));
}
//# sourceMappingURL=LocationBlock.js.map