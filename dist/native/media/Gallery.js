"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gallery = Gallery;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
function Tile({ item, masonry, radius, bg, interactive, }) {
    // On native, aspect ratio comes from `width`/`height` (RN supports the
    // `aspectRatio` style); grid tiles are square, masonry keeps intrinsic ratio.
    const ratio = masonry && item.width && item.height ? item.width / item.height : 1;
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
            width: '100%',
            aspectRatio: ratio,
            overflow: 'hidden',
            borderRadius: radius,
            backgroundColor: bg,
        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: item.url }, accessible: !interactive, accessibilityLabel: interactive ? undefined : item.alt ?? item.caption ?? '', resizeMode: "cover", style: { width: '100%', height: '100%' } }) }));
}
/**
 * Responsive media grid — the native mirror of the web `Gallery`. Backed by a
 * `FlatList` with `numColumns` (windowing gives the lazy loading the web gets
 * from `loading="lazy"`); `grid` renders uniform square tiles, `masonry` keeps
 * each item's intrinsic aspect ratio (from `width`/`height`). When `onOpen` is
 * provided each tile is a `Pressable` `button` that reports its index (wire it
 * to a `Lightbox`). Token-only — radii and tile background trace to theme
 * tokens.
 */
function Gallery({ items, columns = 3, variant = 'grid', onOpen, style, scrollEnabled, }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    const masonry = variant === 'masonry';
    const gap = tokens.spacing.md;
    return ((0, jsx_runtime_1.jsx)(react_native_1.FlatList, { data: items, numColumns: columns, scrollEnabled: scrollEnabled, keyExtractor: (_, index) => String(index), columnWrapperStyle: { gap }, contentContainerStyle: [{ gap }, style], renderItem: ({ item, index }) => {
            const tile = ((0, jsx_runtime_1.jsx)(Tile, { item: item, masonry: masonry, radius: tokens.radius.md, bg: tokens.ramps.neutral[100], interactive: Boolean(onOpen) }));
            return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 }, children: onOpen ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: item.alt ?? item.caption ?? `Open item ${index + 1}`, onPress: () => onOpen(index), style: ({ pressed }) => ({ opacity: pressed ? 0.85 : 1 }), children: tile })) : (tile) }));
        } }, `cols-${columns}`));
}
//# sourceMappingURL=Gallery.js.map