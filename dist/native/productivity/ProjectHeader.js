"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectHeader = ProjectHeader;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const GradientSurface_1 = require("./internal/GradientSurface");
const flow_1 = require("./internal/flow");
const STATUS_META = {
    'on-track': { glyph: '🟢', label: 'On track' },
    'at-risk': { glyph: '🟡', label: 'At risk' },
    'off-track': { glyph: '🔴', label: 'Off track' },
    done: { glyph: '✓', label: 'Done' },
};
/**
 * ProjectHeader — the project-detail hero for the productivity **V4 "flow"** line.
 * A brand-gradient panel that opens a project workspace: the near-white project
 * name + description, a near-white progress bar with its numeral, frosted stat
 * tiles (done/total, due), an overlapping member avatar stack, and a frosted
 * status pill. "Add task" (a near-white pill) and a frosted settings button each
 * appear only when their handler is set. Presentational — shaped data +
 * callbacks, nothing fetches. Every color derives from the brand ramp via
 * `GradientSurface` + `flow*(tokens.ramps)` — no literals, light + dark.
 */
function ProjectHeader({ name, description, progressPct, taskCounts, members, dueLabel, status, onAddTask, onSettings, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const r = tokens.ramps;
    const ink = (0, flow_1.flowInk)(r);
    const inkSoft = (0, flow_1.flowInkSoft)(r);
    const tile = (0, flow_1.flowTile)(r);
    const border = (0, flow_1.flowBorder)(r);
    const pct = Math.max(0, Math.min(100, Math.round(progressPct || 0)));
    const shown = members?.slice(0, 5) ?? [];
    const overflow = (members?.length ?? 0) - shown.length;
    const statusMeta = status ? STATUS_META[status] : null;
    const Tile = ({ label, value }) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            flex: 1,
            minWidth: 0,
            borderRadius: tokens.radius.md,
            backgroundColor: tile,
            borderWidth: 1,
            borderColor: border,
            paddingHorizontal: tokens.spacing.md,
            paddingVertical: tokens.spacing.sm,
        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: inkSoft, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: label }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: ink, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: value })] }));
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [{ borderRadius: tokens.radius.lg }, style], children: (0, jsx_runtime_1.jsxs)(GradientSurface_1.GradientSurface, { colors: (0, flow_1.flowGradient)(r), style: { borderRadius: tokens.radius.lg, padding: tokens.spacing.lg, overflow: 'hidden', gap: tokens.spacing.lg }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: ink, fontSize: tokens.typography.scale['2xl'], fontWeight: '800', letterSpacing: -0.5 }, children: name }), statusMeta ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                gap: tokens.spacing.xs,
                                                borderRadius: tokens.radius.full,
                                                backgroundColor: tile,
                                                borderWidth: 1,
                                                borderColor: border,
                                                paddingHorizontal: tokens.spacing.md,
                                                paddingVertical: tokens.spacing.xs,
                                            }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.xs }, children: statusMeta.glyph }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: ink, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: statusMeta.label })] })) : null] }), description ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: inkSoft, fontSize: tokens.typography.scale.sm, marginTop: tokens.spacing.xs }, children: description })) : null] }), onSettings ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Project settings", onPress: onSettings, style: ({ pressed }) => ({
                                width: 44,
                                height: 44,
                                borderRadius: tokens.radius.full,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: tile,
                                borderWidth: 1,
                                borderColor: border,
                                opacity: pressed ? 0.85 : 1,
                            }), children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u2699\uFE0F", size: "lg" }) })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: inkSoft, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: "Progress" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: ink, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: `${pct}%` })] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "progressbar", accessibilityLabel: `Progress ${pct}%`, accessibilityValue: { min: 0, max: 100, now: pct }, style: {
                                marginTop: tokens.spacing.xs,
                                height: 8,
                                borderRadius: tokens.radius.full,
                                backgroundColor: tile,
                                overflow: 'hidden',
                            }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: `${pct}%`, height: '100%', borderRadius: tokens.radius.full, backgroundColor: ink } }) })] }), taskCounts || dueLabel ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.sm }, children: [taskCounts ? (0, jsx_runtime_1.jsx)(Tile, { label: "Tasks", value: `${taskCounts.done} / ${taskCounts.total}` }) : null, dueLabel ? (0, jsx_runtime_1.jsx)(Tile, { label: "Due", value: dueLabel }) : null] })) : null, shown.length > 0 || onAddTask ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.md }, children: [shown.length > 0 ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: `${members?.length} members`, style: { flexDirection: 'row', alignItems: 'center' }, children: [shown.map((m, i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { marginLeft: i > 0 ? -8 : 0, borderRadius: tokens.radius.full, borderWidth: 2, borderColor: r.primary[600] }, children: (0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: m.avatarUrl, name: m.name, size: "sm" }) }, `${m.name}-${i}`))), overflow > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                        marginLeft: -8,
                                        width: 32,
                                        height: 32,
                                        borderRadius: tokens.radius.full,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: tile,
                                        borderWidth: 2,
                                        borderColor: r.primary[600],
                                    }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: ink, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: `+${overflow}` }) })) : null] })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, {})), onAddTask ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Add task", onPress: onAddTask, style: ({ pressed }) => ({
                                minHeight: 44,
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: tokens.spacing.xs,
                                borderRadius: tokens.radius.md,
                                backgroundColor: ink,
                                paddingHorizontal: tokens.spacing.lg,
                                opacity: pressed ? 0.9 : 1,
                            }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primary, fontSize: tokens.typography.scale.base, fontWeight: '800' }, children: "+ Add task" }) })) : null] })) : null] }) }));
}
//# sourceMappingURL=ProjectHeader.js.map