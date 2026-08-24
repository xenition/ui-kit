"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortfolioGrid = PortfolioGrid;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const media_1 = require("../media");
const EmptyState_1 = require("../commerce/EmptyState");
/**
 * A photographer's portfolio grid — the entry surface for a body of work.
 * Wraps the media {@link Gallery} for the populated case (`grid` square tiles
 * or `masonry` intrinsic ratios, tappable when `onOpen` is set), and renders a
 * token-only skeleton while `loading` and an {@link EmptyState} when there are
 * no photos. Guarded indexing throughout; all colors trace to theme tokens.
 */
function PortfolioGrid({ items, columns = 3, variant = 'grid', title, onOpen, loading = false, loadingCount = 6, emptyLabel = 'No photos yet', emptyDescription, scrollEnabled, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const heading = title ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityRole: "header", style: {
            color: colors.onSurface,
            fontSize: tokens.typography.scale.lg,
            fontWeight: '700',
            marginBottom: tokens.spacing.sm,
        }, children: title })) : null;
    if (loading) {
        const count = Math.max(1, loadingCount);
        const cells = Array.from({ length: count }, (_, i) => i);
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading photos", style: [{ gap: tokens.spacing.sm }, style], children: [heading, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }, children: cells.map((i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: `${100 / columns - 2}%`,
                            aspectRatio: 1,
                            borderRadius: tokens.radius.md,
                            backgroundColor: tokens.ramps.neutral[200],
                        } }, i))) })] }));
    }
    if (items.length === 0) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: style, children: [heading, (0, jsx_runtime_1.jsx)(EmptyState_1.EmptyState, { title: emptyLabel, description: emptyDescription })] }));
    }
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.sm }, style], children: [heading, (0, jsx_runtime_1.jsx)(media_1.Gallery, { items: items, columns: columns, variant: variant, onOpen: onOpen, scrollEnabled: scrollEnabled })] }));
}
//# sourceMappingURL=PortfolioGrid.js.map