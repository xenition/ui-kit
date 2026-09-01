"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodayHeader = TodayHeader;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const GradientSurface_1 = require("./internal/GradientSurface");
const flow_1 = require("./internal/flow");
/**
 * TodayHeader — the "today" dashboard hero and the **peak** of the productivity
 * V4 "flow" line. A brand-gradient panel that greets the person, shows the date,
 * and states the day in one glance: a big near-white **"N tasks due today"**
 * numeral, a near-white progress bar with its percentage, frosted done/remaining
 * tiles, and an optional "next up" focus tile. Presentational — shaped data only,
 * nothing fetches. Every color derives from the brand ramp via `GradientSurface`
 * + `flow*(tokens.ramps)` — no literals, light + dark. The one vivid, motivating
 * surface at the top of the day.
 */
function TodayHeader({ greeting = 'Good morning', userName, dateLabel, dueToday, completedToday, progressPct, focusLabel, style, }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    const r = tokens.ramps;
    const ink = (0, flow_1.flowInk)(r);
    const inkSoft = (0, flow_1.flowInkSoft)(r);
    const tile = (0, flow_1.flowTile)(r);
    const border = (0, flow_1.flowBorder)(r);
    const due = Math.max(0, Math.trunc(dueToday || 0));
    const done = Math.max(0, Math.trunc(completedToday || 0));
    const total = done + due;
    const pct = Math.max(0, Math.min(100, Math.round(progressPct ?? (total > 0 ? (done / total) * 100 : 0))));
    const heading = userName ? `${greeting}, ${userName}` : greeting;
    const Tile = ({ label, value }) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            flex: 1,
            minWidth: 0,
            borderRadius: tokens.radius.md,
            backgroundColor: tile,
            borderWidth: 1,
            borderColor: border,
            paddingHorizontal: tokens.spacing.md,
            paddingVertical: tokens.spacing.sm,
        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: ink, fontSize: tokens.typography.scale['2xl'], fontWeight: '800' }, children: value }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: inkSoft, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: label })] }));
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [{ borderRadius: tokens.radius.lg }, style], children: (0, jsx_runtime_1.jsxs)(GradientSurface_1.GradientSurface, { colors: (0, flow_1.flowGradient)(r), style: { borderRadius: tokens.radius.lg, padding: tokens.spacing.lg, overflow: 'hidden', gap: tokens.spacing.lg }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: inkSoft, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: heading }), dateLabel ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: inkSoft, fontSize: tokens.typography.scale.sm }, children: dateLabel })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityLabel: `${due} ${due === 1 ? 'task' : 'tasks'} due today`, allowFontScaling: false, style: { color: ink, fontSize: tokens.typography.scale['3xl'] * 1.15, fontWeight: '800', letterSpacing: -1 }, children: due }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: inkSoft, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: due === 1 ? 'task due today' : 'tasks due today' })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: inkSoft, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: "Today's progress" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: ink, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: `${pct}%` })] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "progressbar", accessibilityLabel: `${pct}% complete today`, accessibilityValue: { min: 0, max: 100, now: pct }, style: {
                                marginTop: tokens.spacing.xs,
                                height: 8,
                                borderRadius: tokens.radius.full,
                                backgroundColor: tile,
                                overflow: 'hidden',
                            }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: `${pct}%`, height: '100%', borderRadius: tokens.radius.full, backgroundColor: ink } }) })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(Tile, { label: "Done", value: String(done) }), (0, jsx_runtime_1.jsx)(Tile, { label: "Remaining", value: String(due) })] }), focusLabel ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: tokens.spacing.sm,
                        borderRadius: tokens.radius.md,
                        backgroundColor: tile,
                        borderWidth: 1,
                        borderColor: border,
                        paddingHorizontal: tokens.spacing.md,
                        paddingVertical: tokens.spacing.sm,
                    }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u25B6", size: "sm" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: inkSoft, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: "Next up" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: ink, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: focusLabel })] })] })) : null] }) }));
}
//# sourceMappingURL=TodayHeader.js.map