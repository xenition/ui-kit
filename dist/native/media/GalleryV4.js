"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GalleryV4 = GalleryV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const TextV4_1 = require("../primitives/TextV4");
const state_v4_1 = require("../primitives/internal/state-v4");
const media_v4_1 = require("./internal/media-v4");
/**
 * **V4 gallery** — same props as {@link Gallery} plus `emptyMessage`,
 * `videoLabel` and `formatItemLabel`.
 *
 * ## Four changes
 *
 * 1. **Video tiles show their poster and a play badge.** The base handed every
 *    item's `url` to `<Image>`, so a clip rendered as a broken tile.
 * 2. **An empty album says so.**
 * 3. **Press is a state layer**, not `opacity: 0.85` on the tile's content.
 * 4. **The tile's name carries its position** in the album.
 *
 * `masonry` still keeps each item's intrinsic ratio and `grid` still squares
 * them — that decision is the base's and it is right.
 */
function GalleryV4({ items, columns = 3, variant = 'grid', onOpen, emptyMessage = 'No media yet.', videoLabel = 'video', formatItemLabel, style, scrollEnabled, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { tokens } = theme;
    const masonry = variant === 'masonry';
    const gap = tokens.spacing.md;
    const total = items?.length ?? 0;
    const label = formatItemLabel ?? ((n, of) => `Open item ${n} of ${of}`);
    return ((0, jsx_runtime_1.jsx)(react_native_1.FlatList, { data: items, numColumns: columns, scrollEnabled: scrollEnabled, keyExtractor: (_, index) => String(index), columnWrapperStyle: { gap }, contentContainerStyle: [{ gap }, style], ListEmptyComponent: (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "summary", style: { padding: tokens.spacing.lg }, children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", align: "center", children: emptyMessage }) }), renderItem: ({ item, index }) => {
            const ratio = masonry && item.width && item.height ? item.width / item.height : 1;
            const tile = ((0, jsx_runtime_1.jsx)(media_v4_1.MediaSurfaceV4, { item: item, aspectRatio: ratio, inButton: Boolean(onOpen) }));
            const name = [
                item.alt ?? item.caption ?? label(index + 1, total),
                (0, media_v4_1.isVideo)(item) ? videoLabel : null,
            ]
                .filter(Boolean)
                .join(', ');
            return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 }, children: onOpen ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: name, onPress: () => onOpen(index), style: ({ pressed }) => ({
                        borderRadius: tokens.radius.md,
                        backgroundColor: pressed ? (0, state_v4_1.pressFill)(theme) : 'transparent',
                    }), children: tile })) : (tile) }));
        } }, `cols-${columns}`));
}
//# sourceMappingURL=GalleryV4.js.map