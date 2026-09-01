"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryTabs = CategoryTabs;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const internal_1 = require("./internal");
/**
 * CategoryTabs — **V4** "register" design. A horizontally-scrolling `tablist`
 * for the product grid: the selected tab fills **solid primary** with
 * on-primary ink; unselected tabs stay calm on `surface`. Each tab is a ≥44px
 * target and may carry a count pill (soft-toned when unselected, on-primary
 * when selected). Presentational only — selection is driven by props and
 * reported via `onSelect`. Token-only colors via `useXenitionTheme()`,
 * dark-mode safe.
 */
function CategoryTabs({ categories, selectedId, onSelect, testID, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsx)(react_native_1.ScrollView, { horizontal: true, showsHorizontalScrollIndicator: false, accessibilityRole: "tablist", accessibilityLabel: "Product categories", testID: testID, contentContainerStyle: { flexDirection: 'row', gap: tokens.spacing.sm, padding: tokens.spacing.xs }, children: categories.map((cat) => {
            const selected = cat.id === selectedId;
            const pillBg = selected ? (0, internal_1.withAlpha)(colors.onPrimary, 0.2) : (0, internal_1.withAlpha)((0, internal_1.toneColor)(colors, cat.tone ?? 'neutral'), 0.15);
            const pillText = selected ? colors.onPrimary : (0, internal_1.toneColor)(colors, cat.tone ?? 'neutral');
            return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "tab", accessibilityState: { selected }, accessibilityLabel: typeof cat.count === 'number' ? `${cat.label}, ${cat.count}` : cat.label, onPress: () => onSelect?.(cat.id), style: ({ pressed }) => ({
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.xs,
                    minHeight: 44,
                    borderRadius: tokens.radius.md,
                    paddingVertical: tokens.spacing.sm,
                    paddingHorizontal: tokens.spacing.md,
                    backgroundColor: selected ? colors.primary : colors.card,
                    opacity: pressed && !selected ? 0.92 : 1,
                    ...(selected
                        ? { shadowColor: colors.primary, shadowOpacity: 0.18, shadowRadius: 8, shadowOffset: { width: 0, height: 3 }, elevation: 2 }
                        : null),
                }), children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: selected ? colors.onPrimary : colors.onSurface,
                            fontSize: tokens.typography.scale.sm,
                            fontWeight: '700',
                        }, children: cat.label }), typeof cat.count === 'number' ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            minWidth: 20,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 999,
                            paddingHorizontal: 6,
                            backgroundColor: pillBg,
                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                color: pillText,
                                fontSize: tokens.typography.scale.xs,
                                fontWeight: '700',
                                fontVariant: ['tabular-nums'],
                            }, children: cat.count }) })) : null] }, cat.id));
        }) }));
}
//# sourceMappingURL=CategoryTabs.js.map