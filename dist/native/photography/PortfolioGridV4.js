"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortfolioGridV4 = PortfolioGridV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const media_1 = require("../media");
const EmptyState_1 = require("../commerce/EmptyState");
/**
 * PortfolioGrid — **V4** "studio" design. The matted, image-forward take on a
 * portfolio: the body of work floats inside an elevated **mat** — a token
 * surface with a thin border and soft shadow — while the media {@link Gallery}
 * lays the photos out. Honors both `variant` layouts — `grid` (uniform square
 * tiles) and `masonry` (intrinsic ratios), tappable when `onOpen` is set — and
 * renders a token skeleton while `loading` and an {@link EmptyState} when there
 * are no photos. Identical props/behavior to {@link PortfolioGridProps};
 * token-only colors via `useXenitionTheme()`.
 */
function PortfolioGridV4({ items, columns = 3, variant = 'grid', title, onOpen, loading = false, loadingCount = 6, emptyLabel = 'No photos yet', emptyDescription, scrollEnabled, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    // The matted surface: the whole body of work floats inside an elevated card.
    const containerStyle = [
        {
            gap: tokens.spacing.md,
            borderRadius: tokens.radius.lg,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: colors.card,
            padding: tokens.spacing.md,
            shadowColor: colors.onSurface,
            shadowOpacity: 0.08,
            shadowRadius: 12,
            shadowOffset: { width: 0, height: 6 },
            elevation: 3,
        },
        style,
    ];
    const heading = title ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityRole: "header", style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: title })) : null;
    if (loading) {
        const count = Math.max(1, loadingCount);
        const cells = Array.from({ length: count }, (_, i) => i);
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading photos", style: containerStyle, children: [heading, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }, children: cells.map((i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: `${100 / columns - 2}%`,
                            aspectRatio: 1,
                            borderRadius: tokens.radius.md,
                            borderWidth: 1,
                            borderColor: colors.border,
                            backgroundColor: tokens.ramps.neutral[200],
                        } }, i))) })] }));
    }
    if (items.length === 0) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: containerStyle, children: [heading, (0, jsx_runtime_1.jsx)(EmptyState_1.EmptyState, { title: emptyLabel, description: emptyDescription })] }));
    }
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: containerStyle, children: [heading, (0, jsx_runtime_1.jsx)(media_1.Gallery, { items: items, columns: columns, variant: variant, onOpen: onOpen, scrollEnabled: scrollEnabled })] }));
}
//# sourceMappingURL=PortfolioGridV4.js.map