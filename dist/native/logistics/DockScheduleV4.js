"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DockScheduleV4 = DockScheduleV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const CarrierBadge_1 = require("./CarrierBadge");
const internal_1 = require("./internal");
/**
 * DockSchedule — **V4** "dispatch" design (native twin of the web V4). The
 * confident, operations-desk take on a dock-door appointment board: an elevated
 * rounded card with a soft shadow, a door headline with a slot count, and a list
 * of time-window slots. Each slot is a soft-primary well with a tone-toned
 * leading edge, a **tabular-nums** window, a glyph + word status (never color
 * alone), and an optional `CarrierBadge` + reference. Empty (no slots) and
 * loading states are handled; slots are tappable when `onSelectSlot` is set.
 * Token-only colors via `useXenitionTheme()`.
 */
function DockScheduleV4({ dock, slots, onSelectSlot, loading = false, testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const list = Array.isArray(slots) ? slots : [];
    const shell = {
        backgroundColor: colors.card,
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: tokens.radius.lg,
        padding: tokens.spacing.lg,
        gap: tokens.spacing.md,
        shadowColor: colors.onSurface,
        shadowOpacity: 0.06,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 2,
    };
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { testID: testID, style: [shell, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.base, fontWeight: '700', color: colors.onSurface }, children: dock }), !loading ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.xs, color: colors.muted, fontVariant: ['tabular-nums'] }, children: `${list.length} ${list.length === 1 ? 'slot' : 'slots'}` })) : null] }), loading ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: "Loading dock schedule", style: { gap: tokens.spacing.sm }, children: [0, 1, 2].map((i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 48, borderRadius: tokens.radius.md, backgroundColor: tokens.ramps.neutral[100] } }, i))) })) : list.length === 0 ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "No slots scheduled", style: { paddingVertical: tokens.spacing.lg, alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.xl, color: colors.muted }, children: "\uD83C\uDD7F" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.sm, color: colors.muted }, children: "No slots scheduled" })] })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { gap: tokens.spacing.sm }, children: list.map((slot) => {
                    const meta = internal_1.DOCK_META[slot.status] ?? internal_1.DOCK_META.open;
                    const accent = (0, internal_1.toneColor)(colors, meta.tone);
                    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${slot.window}, ${meta.label}`, disabled: !onSelectSlot, onPress: () => onSelectSlot?.(slot), style: ({ pressed }) => ({
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: tokens.spacing.md,
                            paddingVertical: tokens.spacing.sm,
                            paddingHorizontal: tokens.spacing.md,
                            borderRadius: tokens.radius.md,
                            borderLeftWidth: 3,
                            borderLeftColor: accent,
                            backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.05),
                            opacity: pressed && onSelectSlot ? 0.8 : 1,
                        }), children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { width: 96 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.sm, fontWeight: '600', color: colors.onSurface, fontVariant: ['tabular-nums'] }, children: slot.window }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: 2, marginTop: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.xs, color: accent }, children: meta.glyph }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.xs, fontWeight: '600', color: accent }, children: meta.label })] })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, alignItems: 'flex-start', gap: 2 }, children: [slot.carrier ? (0, jsx_runtime_1.jsx)(CarrierBadge_1.CarrierBadge, { carrier: slot.carrier, size: "sm" }) : null, slot.reference ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { fontSize: tokens.typography.scale.xs, color: colors.muted }, children: slot.reference }) : null] })] }, slot.id));
                }) }))] }));
}
//# sourceMappingURL=DockScheduleV4.js.map