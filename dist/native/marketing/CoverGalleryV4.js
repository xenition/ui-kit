"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoverGalleryV4 = CoverGalleryV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const GenerativeCover_1 = require("../commerce/GenerativeCover");
/**
 * CoverGallery — **V4** "showcase" design (native mirror of the web V4). An
 * elevated wall of floating rounded plates on the page ground (NO gradient): each
 * plate is a seeded {@link GenerativeCover} (or a real `imageUrl` `Image`) set in
 * an elevated card (`colors.card` + border + soft shadow), captions read as bold
 * tight-tracked headings, and `meta` becomes a soft-primary chip. The web CSS-grid
 * breakpoints become a flex-wrap row of `flexBasis` columns; each tile optionally
 * becomes a `Pressable` (native's `href`). As on the native base, the per-plate
 * web `form`/`ink`/`paper` role overrides are dropped (the native `GenerativeCover`
 * has a simpler seed/label contract). Honors every native base field
 * (`items`/`columns`/`aspect`); token-only colors, no literals.
 */
function CoverGalleryV4({ items, columns = 3, aspect = 1, style, }) {
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
                    borderRadius: tokens.radius.lg,
                    borderWidth: 1,
                    borderColor: colors.border,
                    backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.06),
                    shadowColor: colors.onSurface,
                    shadowOpacity: 0.06,
                    shadowRadius: 10,
                    shadowOffset: { width: 0, height: 4 },
                    elevation: 2,
                }, children: item.imageUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: item.imageUrl }, accessible: true, accessibilityLabel: label, resizeMode: "cover", style: { width: '100%', height: '100%' } })) : ((0, jsx_runtime_1.jsx)(GenerativeCover_1.GenerativeCover, { seed: seed, label: label, style: { width: '100%', height: '100%' } })) }));
            const caption = item.caption !== undefined || item.meta !== undefined ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-start', gap: tokens.spacing.xs }, children: [item.caption !== undefined ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: colors.onSurface,
                            fontSize: tokens.typography.scale.lg,
                            fontWeight: '800',
                            letterSpacing: -0.3,
                        }, children: item.caption })) : null, item.meta !== undefined ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            borderRadius: tokens.radius.full,
                            backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1),
                            paddingHorizontal: tokens.spacing.sm,
                            paddingVertical: 2,
                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                color: colors.primary,
                                fontSize: tokens.typography.scale.xs,
                                fontWeight: '500',
                            }, children: item.meta }) })) : null] })) : null;
            const tile = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.sm }, children: [plate, caption] }));
            return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexGrow: 1, flexBasis: basis, minWidth: 120 }, children: item.onPress ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: label ?? 'View', onPress: item.onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.9 : 1 }), children: tile })) : (tile) }, index));
        }) }));
}
//# sourceMappingURL=CoverGalleryV4.js.map