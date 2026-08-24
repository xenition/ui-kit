"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SafetyChecklist = SafetyChecklist;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const react_native_2 = require("react-native");
const primitives_1 = require("../primitives");
const format_1 = require("./internal/format");
const VERDICT = {
    pass: { glyph: '✓', slot: 'success', label: 'Pass' },
    fail: { glyph: '✕', slot: 'danger', label: 'Fail' },
    unchecked: { glyph: '○', slot: 'muted', label: 'Unchecked' },
};
/** Cycle a verdict pass → fail → unchecked → pass on tap. */
function nextVerdict(current) {
    return current === 'pass' ? 'fail' : current === 'fail' ? 'unchecked' : 'pass';
}
/**
 * A pass/fail safety checklist. Each item is a tappable row with a verdict
 * glyph disc (pass → success, fail → danger — conveyed by glyph + label +
 * color, never color alone) that cycles the verdict via `onToggle`. When any
 * item is a flagged `hazard` failure, a danger `Alert` banner is raised at the
 * top. Handles the empty state (`EmptyState`) and a `loading` skeleton. No
 * literal colors.
 */
function SafetyChecklist({ title, items, onToggle, loading = false, emptyLabel = 'No safety items', style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const list = Array.isArray(items) ? items : [];
    const hazardCount = list.filter((i) => i.hazard && i.verdict === 'fail').length;
    const failCount = list.filter((i) => i.verdict === 'fail').length;
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(primitives_1.Card, { variant: "outlined", style: style, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading safety checklist", style: { gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Skeleton, { variant: "text", width: "50%", height: 14 }), (0, jsx_runtime_1.jsx)(primitives_1.Skeleton, { variant: "text", lines: 3 })] }) }));
    }
    if (list.length === 0) {
        return (0, jsx_runtime_1.jsx)(primitives_1.EmptyState, { title: emptyLabel, description: "Safety checkpoints will appear here.", style: style });
    }
    return ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { variant: "outlined", style: style, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, children: [title != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: title })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, {})), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: failCount > 0 ? 'danger' : 'success', variant: "soft", size: "sm", children: failCount > 0 ? `✕ ${failCount} failing` : '✓ All clear' })] }), hazardCount > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { marginTop: tokens.spacing.md }, children: (0, jsx_runtime_1.jsx)(primitives_1.Alert, { tone: "danger", title: "Hazard \u2014 do not proceed", children: `${hazardCount} blocking safety ${hazardCount === 1 ? 'item is' : 'items are'} failing.` }) })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { marginTop: tokens.spacing.md, gap: tokens.spacing.xs }, children: list.map((item) => {
                    const vd = VERDICT[item.verdict] ?? VERDICT.unchecked;
                    const tint = vd.slot === 'muted' ? colors.muted : colors[vd.slot];
                    return ((0, jsx_runtime_1.jsxs)(react_native_2.Pressable, { accessibilityRole: "button", accessibilityLabel: `${item.label}, ${vd.label}`, onPress: () => onToggle?.(item.id, nextVerdict(item.verdict)), style: ({ pressed }) => ({
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: tokens.spacing.md,
                            paddingVertical: tokens.spacing.xs,
                            opacity: pressed ? 0.7 : 1,
                        }), children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    width: 32,
                                    height: 32,
                                    borderRadius: tokens.radius.full,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: (0, format_1.withAlpha)(tint, 0.14),
                                }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: vd.glyph, size: "sm", color: vd.slot, accessibilityLabel: vd.label }) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '500' }, children: item.label }), item.hazard ? ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "danger", variant: "outline", size: "sm", children: "\u26A0 Hazard" })) : null] }, item.id));
                }) })] }));
}
//# sourceMappingURL=SafetyChecklist.js.map