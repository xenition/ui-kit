"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationBlockV4 = LocationBlockV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
/**
 * LocationBlock — **V4** "showcase" design (native mirror of the web V4). An
 * elevated contact card: the venue `name`, `address`, an opening-`hours` list,
 * and `phone`/`email` lines seated in a clean `colors.card` surface with a soft
 * border and a subtle shadow, above the map slot. The map is a **static
 * `mapImageUri` image** when provided, otherwise a **soft-primary well**
 * placeholder carrying the address (native has no interactive `<iframe>`). NOT a
 * brand-gradient surface — refined and elevated. Same props/behavior as
 * {@link LocationBlockProps}; token-only colors via `useXenitionTheme()`,
 * dark-mode safe.
 */
function LocationBlockV4({ name, address, hours, phone, email, mapImageUri, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const well = (0, color_1.withAlpha)(colors.primary, 0.06);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { testID: "xen-location-block", style: [
            {
                gap: tokens.spacing.xl,
                borderRadius: tokens.radius.lg,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.card,
                padding: tokens.spacing.lg,
                shadowColor: colors.onSurface,
                shadowOpacity: 0.06,
                shadowRadius: 10,
                shadowOffset: { width: 0, height: 4 },
                elevation: 2,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.md }, children: [name ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: colors.onSurface,
                            fontSize: tokens.typography.scale['2xl'],
                            fontWeight: '800',
                            letterSpacing: -0.5,
                        }, children: name })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.base }, children: address }), hours && hours.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { gap: 0 }, children: hours.map((row, i) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                paddingVertical: tokens.spacing.sm,
                                borderBottomWidth: i === hours.length - 1 ? 0 : 1,
                                borderBottomColor: colors.border,
                            }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                        color: colors.onSurface,
                                        fontSize: tokens.typography.scale.sm,
                                        fontWeight: '600',
                                    }, children: row.label }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: row.value })] }, i))) })) : null, phone || email ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [phone ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primary, fontSize: tokens.typography.scale.sm, fontWeight: '500' }, children: phone })) : null, email ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primary, fontSize: tokens.typography.scale.sm, fontWeight: '500' }, children: email })) : null] })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    aspectRatio: 16 / 9,
                    width: '100%',
                    overflow: 'hidden',
                    borderRadius: tokens.radius.md,
                    borderWidth: 1,
                    borderColor: colors.border,
                    backgroundColor: well,
                    alignItems: 'center',
                    justifyContent: 'center',
                }, children: mapImageUri ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: mapImageUri }, style: { width: '100%', height: '100%' }, resizeMode: "cover" })) : ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                        color: colors.muted,
                        fontSize: tokens.typography.scale.sm,
                        textAlign: 'center',
                        paddingHorizontal: tokens.spacing.md,
                    }, children: address })) })] }));
}
//# sourceMappingURL=LocationBlockV4.js.map