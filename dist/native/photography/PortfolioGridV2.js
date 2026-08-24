"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortfolioGridV2 = PortfolioGridV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const EmptyState_1 = require("../commerce/EmptyState");
const color_1 = require("../primitives/internal/color");
const motion_1 = require("../primitives/internal/motion");
/** Varied aspect presets cycled by position for a masonry rhythm. */
const RATIO_CYCLE = [1, 3 / 4, 4 / 3, 1, 2 / 3, 5 / 4];
function tileRatio(item, index) {
    if (item.width && item.height && item.width > 0 && item.height > 0) {
        return item.width / item.height;
    }
    return RATIO_CYCLE[index % RATIO_CYCLE.length] ?? 1;
}
/**
 * PortfolioGrid — design variant **V2**: a **masonry-feel** wall of photos.
 * Items are dealt round-robin into `columns` vertical stacks and each tile keeps
 * its own intrinsic aspect ratio (falling back to a cycled preset), so tiles
 * vary in height and read as a gallery wall rather than a uniform grid. A gentle
 * caption scrim rides the foot of any captioned tile. Same props as
 * {@link PortfolioGridProps}; token-only, guarded indexing, empty + loading.
 */
function PortfolioGridV2({ items, columns = 3, title, onOpen, loading = false, loadingCount = 6, emptyLabel = 'No photos yet', emptyDescription, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const enter = (0, motion_1.useEnter)({ translateY: 10 });
    const colCount = Math.max(2, columns);
    const heading = title ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityRole: "header", style: {
            color: colors.onSurface,
            fontSize: tokens.typography.scale.lg,
            fontWeight: '700',
            marginBottom: tokens.spacing.sm,
        }, children: title })) : null;
    if (loading) {
        const count = Math.max(1, loadingCount);
        const cols = Array.from({ length: colCount }, () => []);
        for (let i = 0; i < count; i += 1) {
            (cols[i % colCount] ?? cols[0]).push(i);
        }
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading photos", style: [{ gap: tokens.spacing.sm }, style], children: [heading, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.sm }, children: cols.map((cellIdx, c) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.sm }, children: cellIdx.map((i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                width: '100%',
                                aspectRatio: RATIO_CYCLE[i % RATIO_CYCLE.length] ?? 1,
                                borderRadius: tokens.radius.md,
                                backgroundColor: tokens.ramps.neutral[200],
                            } }, i))) }, c))) })] }));
    }
    if (items.length === 0) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: style, children: [heading, (0, jsx_runtime_1.jsx)(EmptyState_1.EmptyState, { title: emptyLabel, description: emptyDescription })] }));
    }
    // Deal items into columns, tracking each item's ORIGINAL index for onOpen.
    const cols = Array.from({ length: colCount }, () => []);
    items.forEach((item, index) => {
        (cols[index % colCount] ?? cols[0]).push({ item, index });
    });
    const scrim = (0, color_1.withAlpha)(tokens.ramps.neutral[900], 0.5);
    const renderTile = (item, index) => {
        const ratio = tileRatio(item, index);
        const inner = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                width: '100%',
                aspectRatio: ratio,
                overflow: 'hidden',
                borderRadius: tokens.radius.md,
                backgroundColor: tokens.ramps.neutral[100],
            }, children: [item.url ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: item.url }, accessible: !onOpen, accessibilityLabel: onOpen ? undefined : item.alt ?? item.caption ?? '', resizeMode: "cover", style: { width: '100%', height: '100%' } })) : null, item.caption ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: scrim,
                        paddingHorizontal: tokens.spacing.sm,
                        paddingVertical: tokens.spacing.xs,
                    }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                            color: tokens.ramps.neutral[50],
                            fontSize: tokens.typography.scale.xs,
                            fontWeight: '600',
                        }, children: item.caption }) })) : null] }));
        if (onOpen) {
            return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: item.alt ?? item.caption ?? `Photo ${index + 1}`, onPress: () => onOpen(index), style: ({ pressed }) => ({ opacity: pressed ? 0.85 : 1 }), children: inner }, index));
        }
        return (0, jsx_runtime_1.jsx)(react_native_1.View, { children: inner }, index);
    };
    const containerStyle = [{ gap: tokens.spacing.sm }, style];
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Animated.View, { style: [{ opacity: enter.opacity, transform: enter.transform }, containerStyle], children: [heading, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.sm }, children: cols.map((col, c) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.sm }, children: col.map(({ item, index }) => renderTile(item, index)) }, c))) })] }));
}
//# sourceMappingURL=PortfolioGridV2.js.map