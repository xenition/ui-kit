"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IrrigationSchedule = IrrigationSchedule;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const STATE_META = {
    scheduled: { label: 'Scheduled', tone: 'neutral', color: 'muted' },
    running: { label: 'Running', tone: 'primary', color: 'primary' },
    done: { label: 'Done', tone: 'success', color: 'success' },
    skipped: { label: 'Skipped', tone: 'warn', color: 'warn' },
};
/**
 * An irrigation schedule — a titled {@link Card} listing zone runs (zone, time,
 * duration) each with a run-state {@link Badge} and an enable {@link Switch}.
 * The enabled state rides the switch's a11y `checked` state (not color), and the
 * run state is stated as text. Toggling fires `onToggle(id, next)`. When `slots`
 * is empty an {@link EmptyState} stands in. Rows are keyed + indexed defensively.
 * Token-bound throughout — no literal colors.
 */
function IrrigationSchedule({ slots, title = 'Irrigation', onToggle, emptyTitle = 'No irrigation scheduled', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const list = Array.isArray(slots) ? slots : [];
    return ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { variant: "outlined", style: style, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\uD83D\uDEBF", color: "primary", size: "base" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: title })] }), list.length === 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { marginTop: tokens.spacing.md }, children: (0, jsx_runtime_1.jsx)(primitives_1.EmptyState, { icon: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\uD83D\uDCA7", size: "2xl", color: "muted" }), title: emptyTitle, description: "Add a zone run to get started." }) })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { marginTop: tokens.spacing.xs }, children: list.map((slot, i) => {
                    const meta = STATE_META[slot.state ?? 'scheduled'];
                    const enabled = slot.enabled ?? true;
                    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: tokens.spacing.sm,
                            paddingVertical: tokens.spacing.sm,
                            borderBottomWidth: i === list.length - 1 ? 0 : 1,
                            borderBottomColor: colors.border,
                            opacity: enabled ? 1 : 0.6,
                        }, children: [slot.time != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700', fontFamily: tokens.typography.fontHeading, width: 52 }, children: slot.time })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: slot.zone }), slot.duration != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: slot.duration })) : null] }), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: meta.tone, variant: "soft", size: "sm", children: meta.label }), (0, jsx_runtime_1.jsx)(primitives_1.Switch, { checked: enabled, onCheckedChange: (next) => onToggle?.(slot.id, next), accessibilityLabel: `${slot.zone} irrigation` })] }, slot.id ?? `slot-${i}`));
                }) }))] }));
}
//# sourceMappingURL=IrrigationSchedule.js.map