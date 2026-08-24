"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableReservationRow = TableReservationRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Badge_1 = require("../primitives/Badge");
const Icon_1 = require("../primitives/Icon");
const STATUS_META = {
    requested: { label: 'Requested', tone: 'warn' },
    confirmed: { label: 'Confirmed', tone: 'primary' },
    seated: { label: 'Seated', tone: 'success' },
    completed: { label: 'Completed', tone: 'neutral' },
    cancelled: { label: 'Cancelled', tone: 'danger' },
};
/**
 * A single table-reservation row — guest name, a party-size chip, date/time,
 * an optional table label, and a status `Badge`. The status is shown as a
 * labelled badge (text + tone), so it never depends on color alone. Optionally
 * pressable to open the booking. Reuses the `Badge` and `Icon` primitives.
 * Token-only.
 */
function TableReservationRow({ name, partySize, dateText, timeText, tableLabel, status = 'requested', onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = STATUS_META[status] ?? STATUS_META.requested;
    const when = [dateText, timeText].filter(Boolean).join(' · ');
    const containerStyle = [
        {
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.md,
            borderRadius: tokens.radius.lg,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: colors.surface,
            padding: tokens.spacing.md,
        },
        style,
    ];
    const inner = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    width: 44,
                    height: 44,
                    borderRadius: tokens.radius.md,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: tokens.ramps.neutral[100],
                }, children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83D\uDC65", size: "sm", accessibilityLabel: `Party of ${partySize}` }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: partySize })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: name }), when ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: when })) : null, tableLabel ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: tableLabel })) : null] }), (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: meta.tone, children: meta.label })] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${name}, party of ${partySize}${when ? `, ${when}` : ''}, ${meta.label}`, onPress: onPress, style: ({ pressed }) => [containerStyle, { opacity: pressed ? 0.9 : 1 }], children: inner }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { style: containerStyle, children: inner });
}
//# sourceMappingURL=TableReservationRow.js.map