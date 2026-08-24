"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HarvestLog = HarvestLog;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
/**
 * A harvest log — a titled {@link Card} listing recent harvest records (crop,
 * quantity + unit, date, field, optional grade chip). The header can show a
 * period `total`. When `entries` is empty an {@link EmptyState} stands in for
 * the list. Rows are keyed and indexed defensively, and `maxRows` truncates a
 * long log to a "+N more" summary. Token-bound throughout — no literal colors.
 */
function HarvestLog({ entries, title = 'Harvest log', total, maxRows, emptyTitle = 'No harvests logged', emptyDescription = 'Recorded harvests will appear here.', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const list = Array.isArray(entries) ? entries : [];
    const visible = typeof maxRows === 'number' ? list.slice(0, Math.max(0, maxRows)) : list;
    const remaining = list.length - visible.length;
    return ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { variant: "outlined", style: style, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\uD83E\uDDFA", color: "accent", size: "base" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: title }), total != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: total })) : null] }), list.length === 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { marginTop: tokens.spacing.md }, children: (0, jsx_runtime_1.jsx)(primitives_1.EmptyState, { icon: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\uD83C\uDF3E", size: "2xl", color: "muted" }), title: emptyTitle, description: emptyDescription }) })) : ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { marginTop: tokens.spacing.sm }, children: [visible.map((entry, i) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: tokens.spacing.sm,
                            paddingVertical: tokens.spacing.sm,
                            borderBottomWidth: i === visible.length - 1 && remaining <= 0 ? 0 : 1,
                            borderBottomColor: colors.border,
                        }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: entry.crop }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [entry.field, entry.date].filter((s) => s != null && s !== '').join(' · ') })] }), entry.grade != null ? ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "neutral", variant: "outline", size: "sm", children: entry.grade })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700', fontFamily: tokens.typography.fontHeading }, children: [String(entry.quantity), entry.unit != null ? (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontWeight: '400' }, children: [" ", entry.unit] }) : null] })] }, entry.id ?? `harvest-${i}`))), remaining > 0 ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, marginTop: tokens.spacing.xs }, children: ["+", remaining, " more"] })) : null] }))] }));
}
//# sourceMappingURL=HarvestLog.js.map