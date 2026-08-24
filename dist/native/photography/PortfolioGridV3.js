"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortfolioGridV3 = PortfolioGridV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const EmptyState_1 = require("../commerce/EmptyState");
/** Hairline gutter between tiles — the "contact-sheet" tightness. */
const TIGHT_GAP = 2;
/**
 * PortfolioGrid — design variant **V3**: a **uniform, tight contact-sheet grid**.
 * Every photo is a hard square packed with a 2px gutter and no per-tile radius,
 * so the wall reads as one dense sheet rather than spaced cards — the opposite
 * feel to V2's masonry. The whole sheet gets a single outer radius/clip. Same
 * props as {@link PortfolioGridProps}; token-only, guarded indexing, empty +
 * loading.
 */
function PortfolioGridV3({ items, columns = 3, title, onOpen, loading = false, loadingCount = 6, emptyLabel = 'No photos yet', emptyDescription, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const cols = Math.max(2, columns);
    const widthPct = `${100 / cols}%`;
    const heading = title ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityRole: "header", style: {
            color: colors.onSurface,
            fontSize: tokens.typography.scale.lg,
            fontWeight: '700',
            marginBottom: tokens.spacing.sm,
        }, children: title })) : null;
    const sheetStyle = {
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderRadius: tokens.radius.md,
        overflow: 'hidden',
        backgroundColor: colors.border,
    };
    if (loading) {
        const count = Math.max(1, loadingCount);
        const cells = Array.from({ length: count }, (_, i) => i);
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading photos", style: [{ gap: tokens.spacing.sm }, style], children: [heading, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: sheetStyle, children: cells.map((i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: widthPct,
                            aspectRatio: 1,
                            padding: TIGHT_GAP / 2,
                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                width: '100%',
                                height: '100%',
                                backgroundColor: tokens.ramps.neutral[200],
                            } }) }, i))) })] }));
    }
    if (items.length === 0) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: style, children: [heading, (0, jsx_runtime_1.jsx)(EmptyState_1.EmptyState, { title: emptyLabel, description: emptyDescription })] }));
    }
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.sm }, style], children: [heading, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: sheetStyle, children: items.map((item, index) => {
                    const cell = ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: '100%',
                            height: '100%',
                            overflow: 'hidden',
                            backgroundColor: tokens.ramps.neutral[100],
                        }, children: item.url ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: item.url }, accessible: !onOpen, accessibilityLabel: onOpen ? undefined : item.alt ?? item.caption ?? '', resizeMode: "cover", style: { width: '100%', height: '100%' } })) : null }));
                    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: widthPct, aspectRatio: 1, padding: TIGHT_GAP / 2 }, children: onOpen ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: item.alt ?? item.caption ?? `Photo ${index + 1}`, onPress: () => onOpen(index), style: ({ pressed }) => ({ flex: 1, opacity: pressed ? 0.85 : 1 }), children: cell })) : (cell) }, index));
                }) })] }));
}
//# sourceMappingURL=PortfolioGridV3.js.map