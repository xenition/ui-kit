"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRail = CategoryRail;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const GradientSurface_1 = require("./internal/GradientSurface");
const spotlight_1 = require("./internal/spotlight");
/**
 * CategoryRail — **V4** "spotlight" design. A horizontally-scrolling rail of
 * rounded browse tiles (genres / moods). Each tile is a gradient-glow cover —
 * the V4 accent→primary wash — or the category artwork when supplied, with the
 * label set in near-white spotlight ink over a legibility scrim. Tiles are
 * ≥44px tap targets. Presentational only; token-only colors via
 * `useXenitionTheme()` and the `spotlight*` helpers (no literal hex).
 * Dark-mode safe.
 */
function CategoryRail({ categories, title, onSelect, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const r = tokens.ramps;
    const ink = (0, spotlight_1.spotlightInk)(r);
    if (categories.length === 0)
        return null;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "list", style: [{ gap: tokens.spacing.sm }, style], children: [title ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: colors.muted,
                    fontSize: tokens.typography.scale.xs,
                    fontWeight: '700',
                    letterSpacing: 0.5,
                    textTransform: 'uppercase',
                    paddingHorizontal: tokens.spacing.xs,
                }, children: title })) : null, (0, jsx_runtime_1.jsx)(react_native_1.ScrollView, { horizontal: true, showsHorizontalScrollIndicator: false, contentContainerStyle: { gap: tokens.spacing.md, paddingBottom: tokens.spacing.xs }, children: categories.map((cat) => {
                    const interactive = !!onSelect;
                    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: interactive ? 'button' : undefined, accessibilityLabel: cat.label, disabled: !interactive, onPress: interactive ? () => onSelect(cat.id) : undefined, style: ({ pressed }) => ({ opacity: interactive && pressed ? 0.85 : 1 }), children: (0, jsx_runtime_1.jsxs)(GradientSurface_1.GradientSurface, { colors: (0, spotlight_1.spotlightGlow)(r), style: {
                                width: 128,
                                height: 96,
                                minWidth: 44,
                                minHeight: 44,
                                borderRadius: tokens.radius.lg,
                                overflow: 'hidden',
                                justifyContent: 'flex-end',
                                padding: tokens.spacing.sm,
                            }, children: [cat.artworkUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: cat.artworkUrl }, accessibilityIgnoresInvertColors: true, resizeMode: "cover", style: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 } })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        backgroundColor: (0, color_1.withAlpha)(r.primary[700], 0.4),
                                    } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [cat.glyph ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: ink, fontSize: tokens.typography.scale.lg }, children: cat.glyph }) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: ink, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: cat.label })] })] }) }, cat.id));
                }) })] }));
}
//# sourceMappingURL=CategoryRail.js.map