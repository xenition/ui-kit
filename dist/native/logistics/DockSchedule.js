"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DockSchedule = DockSchedule;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const CarrierBadge_1 = require("./CarrierBadge");
const internal_1 = require("./internal");
/**
 * A dock-door appointment board: a door headline over a list of time-window
 * slots, each with a glyph + word status chip and an optional `CarrierBadge`.
 * Empty (no slots) and loading states are handled. Slots are tappable when
 * `onSelectSlot` is set (button role + label). All colors are theme tokens.
 */
function DockSchedule({ dock, slots, onSelectSlot, loading = false, testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const list = Array.isArray(slots) ? slots : [];
    return ((0, jsx_runtime_1.jsx)(primitives_1.Card, { variant: "outlined", testID: testID, style: style, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.base, fontWeight: '700', color: colors.onSurface }, children: dock }), !loading ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.xs, color: colors.muted }, children: `${list.length} ${list.length === 1 ? 'slot' : 'slots'}` })) : null] }), loading ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: "Loading dock schedule", style: { gap: tokens.spacing.xs }, children: [0, 1, 2].map((i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 40, borderRadius: tokens.radius.md, backgroundColor: tokens.ramps.neutral[100] } }, i))) })) : list.length === 0 ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "No slots scheduled", style: { paddingVertical: tokens.spacing.lg, alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.xl, color: colors.muted }, children: "\uD83C\uDD7F" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.sm, color: colors.muted }, children: "No slots scheduled" })] })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: list.map((slot) => {
                        const meta = internal_1.DOCK_META[slot.status] ?? internal_1.DOCK_META.open;
                        const accent = (0, internal_1.toneColor)(colors, meta.tone);
                        return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${slot.window}, ${meta.label}`, disabled: !onSelectSlot, onPress: () => onSelectSlot?.(slot), style: {
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: tokens.spacing.sm,
                                paddingVertical: tokens.spacing.xs,
                                paddingHorizontal: tokens.spacing.sm,
                                borderRadius: tokens.radius.md,
                                borderLeftWidth: 3,
                                borderLeftColor: accent,
                                backgroundColor: tokens.ramps.neutral[100],
                            }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { width: 92 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.sm, fontWeight: '600', color: colors.onSurface }, children: slot.window }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.xs, color: accent }, children: meta.glyph }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.xs, fontWeight: '600', color: accent }, children: meta.label })] })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, alignItems: 'flex-start', gap: 2 }, children: [slot.carrier ? (0, jsx_runtime_1.jsx)(CarrierBadge_1.CarrierBadge, { carrier: slot.carrier, size: "sm" }) : null, slot.reference ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { fontSize: tokens.typography.scale.xs, color: colors.muted }, children: slot.reference })) : null] })] }, slot.id));
                    }) }))] }) }));
}
//# sourceMappingURL=DockSchedule.js.map