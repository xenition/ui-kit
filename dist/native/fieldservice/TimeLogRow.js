"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeLogRow = TimeLogRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const format_1 = require("./internal/format");
const TIME_LOG_STATUS = {
    running: { label: 'Running', glyph: '⏱', tone: 'primary', slot: 'primary' },
    stopped: { label: 'Logged', glyph: '■', tone: 'neutral', slot: 'muted' },
    approved: { label: 'Approved', glyph: '✓', tone: 'success', slot: 'success' },
    rejected: { label: 'Rejected', glyph: '✕', tone: 'danger', slot: 'danger' },
};
/**
 * One line in a time-log / timesheet: a tinted status glyph disc, a
 * label/window stack with an optional billable chip, and a right-aligned
 * duration + computed line total. Duration comes from whole minutes via
 * `formatDuration`; the total is `minutes/60 * rate` in integer cents through
 * `formatMoney` (guarded against a missing rate). Status is text + glyph + a
 * color that traces to a `SemanticColors` slot — never color alone. Becomes a
 * button only when `onPress` is supplied. No literals.
 */
function TimeLogRow({ label, minutes, status, window, billable = false, rateCentsPerHour, currency = 'USD', formatMoney: format = format_1.formatMoney, onPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const sd = TIME_LOG_STATUS[status] ?? TIME_LOG_STATUS.stopped;
    const tint = sd.slot === 'muted' ? colors.muted : colors[sd.slot];
    const safeMinutes = Number.isFinite(minutes) ? Math.max(0, Math.trunc(minutes)) : 0;
    const totalCents = rateCentsPerHour != null && Number.isFinite(rateCentsPerHour)
        ? Math.round((safeMinutes / 60) * Math.max(0, rateCentsPerHour))
        : undefined;
    const row = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                paddingVertical: tokens.spacing.sm,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 40,
                    height: 40,
                    borderRadius: tokens.radius.full,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: (0, format_1.withAlpha)(tint, 0.14),
                }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: sd.glyph, color: sd.slot, accessibilityLabel: sd.label }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: label }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [window != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: window })) : null, (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: sd.tone, variant: "soft", size: "sm", children: `${sd.glyph} ${sd.label}` }), billable ? ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "accent", variant: "outline", size: "sm", children: "$ Billable" })) : null] })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end', gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: (0, format_1.formatDuration)(safeMinutes) }), totalCents != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: format(totalCents, currency) })) : null] })] }));
    if (!onPress)
        return row;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${label}, ${(0, format_1.formatDuration)(safeMinutes)}, ${sd.label}`, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.7 : 1 }), children: row }));
}
//# sourceMappingURL=TimeLogRow.js.map