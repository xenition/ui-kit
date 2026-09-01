"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LookbookGridV4 = LookbookGridV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const BadgeV4_1 = require("../primitives/BadgeV4");
const TextV4_1 = require("../primitives/TextV4");
const state_v4_1 = require("../primitives/internal/state-v4");
/**
 * **V4 lookbook grid** — same props as {@link LookbookGrid} plus
 * `formatItemLabel`.
 *
 * ## Four changes
 *
 * 1. **The placeholder ground is `colors.muted`**, not a translucent wash: a
 *    translucent fill borrows whatever is behind it, so an image that has not
 *    loaded is a different colour on every screen it appears on.
 * 2. **A tile without a label is named by position**, not by its `id` — the
 *    base read a database key aloud.
 * 3. **Press is a state layer**, not an opacity on the tile.
 * 4. **The caption overlay uses the scrim colour**, which is dark in both
 *    schemes, rather than `onSurface`, which inverts and turned the strip
 *    near-white on a dark page.
 */
function LookbookGridV4({ items, columns = 2, aspectRatio = 1, emptyLabel = 'No looks yet.', formatItemLabel, onSelect, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const total = items?.length ?? 0;
    const label = formatItemLabel ?? ((n, of) => `Look ${n} of ${of}`);
    const cols = Math.max(1, Math.floor(columns));
    return ((0, jsx_runtime_1.jsx)(react_native_1.FlatList, { data: items, numColumns: cols, keyExtractor: (item, i) => item.id ?? String(i), columnWrapperStyle: cols > 1 ? { gap: tokens.spacing.sm } : undefined, contentContainerStyle: [{ gap: tokens.spacing.sm }, style], ListEmptyComponent: (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "summary", style: { padding: tokens.spacing.lg }, children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", align: "center", children: emptyLabel }) }), renderItem: ({ item, index }) => {
            const name = item.label ?? label(index + 1, total);
            const tile = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flex: 1,
                    aspectRatio,
                    borderRadius: tokens.radius.md,
                    overflow: 'hidden',
                    backgroundColor: colors.muted,
                }, children: [item.imageUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: item.imageUrl }, accessible: !onSelect, accessibilityLabel: onSelect ? undefined : name, resizeMode: "cover", style: { width: '100%', height: '100%' } })) : null, item.tag ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { position: 'absolute', top: tokens.spacing.sm, left: tokens.spacing.sm }, children: (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: "primary", variant: "soft", size: "sm", children: item.tag }) })) : null, item.label ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            bottom: 0,
                            paddingHorizontal: tokens.spacing.sm,
                            paddingVertical: tokens.spacing.xs,
                            // The shadow colour does not invert with the scheme.
                            backgroundColor: theme.elevation.sheet.color + 'A0',
                        }, children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "semibold", numberOfLines: 1, style: { color: tokens.ramps.neutral[50] }, children: item.label }) })) : null] }));
            return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 }, children: onSelect ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: name, onPress: () => onSelect(item.id), style: ({ pressed }) => ({
                        flex: 1,
                        borderRadius: tokens.radius.md,
                        backgroundColor: pressed ? (0, state_v4_1.pressFill)(theme) : 'transparent',
                    }), children: tile })) : (tile) }));
        } }, `cols-${cols}`));
}
//# sourceMappingURL=LookbookGridV4.js.map