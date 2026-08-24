"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HarvestLogV3 = HarvestLogV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * HarvestLog — design variant **V3**: a **minimal log** — a title + total on one
 * header line, then each record as a single dense line (`qty unit · crop ·
 * field · date`). No card chrome, no dividers. Empty `entries` collapse to a
 * muted one-liner. Same props as {@link HarvestLogProps}; only the layout
 * differs. Token-only.
 */
function HarvestLogV3({ entries, title = 'Harvest log', total, maxRows, emptyTitle = 'No harvests logged', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const list = Array.isArray(entries) ? entries : [];
    const visible = typeof maxRows === 'number' ? list.slice(0, Math.max(0, maxRows)) : list;
    const remaining = list.length - visible.length;
    const container = [{ gap: tokens.spacing.xs }, style];
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: container, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.sm }, children: "\uD83E\uDDFA" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: title }), total != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: total })) : null] }), list.length === 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: emptyTitle })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [visible.map((entry, i) => ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: { fontSize: tokens.typography.scale.xs }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.onSurface, fontWeight: '700' }, children: [String(entry.quantity), entry.unit != null ? ` ${entry.unit}` : ''] }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted }, children: [' · ', [entry.crop, entry.field, entry.date].filter((s) => s != null && s !== '').join(' · '), entry.grade != null ? `  [${entry.grade}]` : ''] })] }, entry.id ?? `harvest-${i}`))), remaining > 0 ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["+", remaining, " more"] })) : null] }))] }));
}
//# sourceMappingURL=HarvestLogV3.js.map