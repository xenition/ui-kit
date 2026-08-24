"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HarvestLogV2 = HarvestLogV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const elevation_1 = require("../primitives/internal/elevation");
const color_1 = require("../primitives/internal/color");
const motion_1 = require("../primitives/internal/motion");
/**
 * HarvestLog — design variant **V2**: an elevated card fronted by a **big total
 * hero** (large figure + "total harvested" label on a tinted panel), then a
 * record list where each row leads with a tinted quantity chip. Where V1 tucks
 * the total in the header corner, V2 makes it the headline. Same props as
 * {@link HarvestLogProps}; only the layout differs. Token-only.
 */
function HarvestLogV2({ entries, title = 'Harvest log', total, maxRows, emptyTitle = 'No harvests logged', emptyDescription = 'Recorded harvests will appear here.', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const enter = (0, motion_1.useEnter)({ translateY: 8 });
    const list = Array.isArray(entries) ? entries : [];
    const visible = typeof maxRows === 'number' ? list.slice(0, Math.max(0, maxRows)) : list;
    const remaining = list.length - visible.length;
    const container = [
        {
            padding: tokens.spacing.md,
            borderRadius: tokens.radius.lg,
            borderWidth: 0,
            backgroundColor: colors.surface,
            ...(0, elevation_1.shadow)('md', tokens),
        },
        style,
    ];
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Animated.View, { style: [{ opacity: enter.opacity, transform: enter.transform }, container], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\uD83E\uDDFA", color: "accent", size: "base" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: title })] }), total != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    marginTop: tokens.spacing.sm,
                    padding: tokens.spacing.md,
                    borderRadius: tokens.radius.md,
                    backgroundColor: (0, color_1.withAlpha)(colors.success, 0.1),
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: "Total harvested" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale['3xl'], fontWeight: '800', fontFamily: tokens.typography.fontHeading }, children: total })] })) : null, list.length === 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { marginTop: tokens.spacing.md }, children: (0, jsx_runtime_1.jsx)(primitives_1.EmptyState, { icon: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\uD83C\uDF3E", size: "2xl", color: "muted" }), title: emptyTitle, description: emptyDescription }) })) : ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { marginTop: tokens.spacing.md, gap: tokens.spacing.sm }, children: [visible.map((entry, i) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                                    minWidth: 52,
                                    paddingVertical: tokens.spacing.xs,
                                    paddingHorizontal: tokens.spacing.sm,
                                    borderRadius: tokens.radius.sm,
                                    backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1),
                                    alignItems: 'center',
                                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '800', fontFamily: tokens.typography.fontHeading }, children: String(entry.quantity) }), entry.unit != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: entry.unit })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: entry.crop }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [entry.field, entry.date].filter((s) => s != null && s !== '').join(' · ') })] }), entry.grade != null ? ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "neutral", variant: "outline", size: "sm", children: entry.grade })) : null] }, entry.id ?? `harvest-${i}`))), remaining > 0 ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["+", remaining, " more"] })) : null] }))] }));
}
//# sourceMappingURL=HarvestLogV2.js.map