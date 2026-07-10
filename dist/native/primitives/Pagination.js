"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pagination = Pagination;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * Page navigation — the native mirror of the web `Pagination`, with the same
 * ellipsis truncation. Prev/next arrows plus numbered page buttons, all
 * token-bound. Returns null when there is a single page. No literal colors.
 */
function Pagination({ page, pageCount, onPageChange, siblingCount = 1, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    if (pageCount <= 1)
        return null;
    const wanted = new Set([1, pageCount]);
    for (let i = page - siblingCount; i <= page + siblingCount; i++) {
        if (i >= 1 && i <= pageCount)
            wanted.add(i);
    }
    const sorted = Array.from(wanted).sort((a, b) => a - b);
    const items = [];
    let prev = 0;
    for (const p of sorted) {
        if (p - prev > 1)
            items.push('ellipsis');
        items.push(p);
        prev = p;
    }
    const cell = (active, disabled, label, onPress, a11y, key) => ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11y, accessibilityState: { selected: active, disabled }, disabled: disabled, onPress: onPress, style: {
            height: 32,
            minWidth: 32,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: tokens.spacing.sm,
            borderRadius: tokens.radius.sm,
            backgroundColor: active ? colors.primary : 'transparent',
            opacity: disabled ? 0.4 : 1,
        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                color: active ? colors.onPrimary : colors.onSurface,
                fontSize: tokens.typography.scale.sm,
            }, children: label }) }, key));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Pagination", style: [{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, style], children: [cell(false, page <= 1, '‹', () => onPageChange(page - 1), 'Previous', 'prev'), items.map((it, i) => it === 'ellipsis' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, paddingHorizontal: tokens.spacing.xs }, children: "\u2026" }, `e${i}`)) : (cell(it === page, false, String(it), () => onPageChange(it), `Page ${it}`, `p${it}`))), cell(false, page >= pageCount, '›', () => onPageChange(page + 1), 'Next', 'next')] }));
}
//# sourceMappingURL=Pagination.js.map