"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoverGallery = CoverGallery;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const GenerativeCover_1 = require("../commerce/GenerativeCover");
/**
 * A gallery of seeded {@link GenerativeCover} plates (or real images) with
 * captions — the native mirror of the web `CoverGallery`. The web CSS-grid
 * breakpoints become a flex-wrap row with `flexBasis` columns; each tile
 * optionally becomes a `Pressable` (native's `href`). The native
 * `GenerativeCover` has a simpler seed/label contract, so the web `form`/`ink`/
 * `paper` per-plate role overrides are dropped. Token-only — no literal colors.
 */
function CoverGallery({ items, columns = 3, aspect = 1, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const basis = `${100 / columns}%`;
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { testID: "xen-cover-gallery", style: [
            { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.lg },
            style,
        ], children: items.map((item, index) => {
            const seed = String(item.seed);
            const label = item.label ?? (typeof item.caption === 'string' ? item.caption : undefined);
            const plate = ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    aspectRatio: aspect,
                    width: '100%',
                    overflow: 'hidden',
                    borderRadius: tokens.radius.md,
                    backgroundColor: tokens.ramps.neutral[100],
                }, children: item.imageUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: item.imageUrl }, accessible: true, accessibilityLabel: label, resizeMode: "cover", style: { width: '100%', height: '100%' } })) : ((0, jsx_runtime_1.jsx)(GenerativeCover_1.GenerativeCover, { seed: seed, label: label, style: { width: '100%', height: '100%' } })) }));
            const caption = item.caption !== undefined || item.meta !== undefined ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [item.caption !== undefined ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: colors.onSurface,
                            fontSize: tokens.typography.scale.base,
                            fontWeight: '600',
                        }, children: item.caption })) : null, item.meta !== undefined ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: item.meta })) : null] })) : null;
            const tile = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.sm }, children: [plate, caption] }));
            return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexGrow: 1, flexBasis: basis, minWidth: 120 }, children: item.onPress ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: label ?? 'View', onPress: item.onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.9 : 1 }), children: tile })) : (tile) }, index));
        }) }));
}
//# sourceMappingURL=CoverGallery.js.map