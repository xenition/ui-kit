"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LookbookGrid = LookbookGrid;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
/**
 * A masonry-style lookbook / gallery grid of style photos. Renders `items` in a
 * flex-wrap grid of `columns`; each tile shows the image with a gradient-free
 * caption band and optional tag, and calls `onSelect(id)` on tap. An empty
 * `items` array renders a token-tinted empty state. Indices are guarded and
 * missing images degrade to a tinted placeholder. Token-only colors.
 */
function LookbookGrid({ items, columns = 2, aspectRatio = 0.8, emptyLabel = 'No looks yet', onSelect, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const cols = Math.max(1, Math.floor(columns));
    const widthPct = `${100 / cols}%`;
    if (!items.length) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: emptyLabel, style: [
                {
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: tokens.spacing['2xl'],
                    borderRadius: tokens.radius.lg,
                    borderWidth: 1,
                    borderColor: colors.border,
                    backgroundColor: (0, color_1.withAlpha)(colors.muted, 0.08),
                    gap: tokens.spacing.sm,
                },
                style,
            ], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale['2xl'] }, children: "\uD83D\uDCF7" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: emptyLabel })] }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [{ flexDirection: 'row', flexWrap: 'wrap' }, style], children: items.map((item, i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: widthPct, padding: tokens.spacing.xs }, children: (0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: item.label ?? `Look ${i + 1}`, disabled: !onSelect, onPress: onSelect ? () => onSelect(item.id) : undefined, style: ({ pressed }) => ({
                    aspectRatio,
                    borderRadius: tokens.radius.md,
                    overflow: 'hidden',
                    borderWidth: 1,
                    borderColor: colors.border,
                    backgroundColor: (0, color_1.withAlpha)(colors.muted, 0.14),
                    opacity: pressed && onSelect ? 0.9 : 1,
                    justifyContent: 'flex-end',
                }), children: [item.imageUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: item.imageUrl }, resizeMode: "cover", style: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 } })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.xl }, children: "\u2702\uFE0F" }) })), item.tag ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { position: 'absolute', top: tokens.spacing.xs, left: tokens.spacing.xs, borderRadius: tokens.radius.sm, paddingHorizontal: tokens.spacing.xs, paddingVertical: 1, backgroundColor: (0, color_1.withAlpha)(colors.onSurface, 0.55) }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.surface, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: item.tag }) })) : null, item.label ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { padding: tokens.spacing.sm, backgroundColor: (0, color_1.withAlpha)(colors.onSurface, 0.45) }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.surface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: item.label }) })) : null] }) }, item.id ?? i))) }));
}
//# sourceMappingURL=LookbookGrid.js.map