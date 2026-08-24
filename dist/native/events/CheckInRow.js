"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckInRow = CheckInRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Avatar_1 = require("../primitives/Avatar");
const Badge_1 = require("../primitives/Badge");
/**
 * A staff-facing check-in row: avatar, attendee name, ticket type, and a toggle
 * that flips the checked-in state. The state is shown with a check glyph, a
 * text badge (`Checked in` / `Not in`) and `accessibilityState.checked` — never
 * color alone. Colors come from the compiled theme tokens; no literal colors.
 */
function CheckInRow({ name, avatarUrl, ticketType, checkedInAt, checkedIn = false, onToggle, disabled = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                padding: tokens.spacing.md,
                borderRadius: tokens.radius.md,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.surface,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { src: avatarUrl, name: name, size: "sm" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: name }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, flexWrap: 'wrap' }, children: [ticketType ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: ticketType })) : null, checkedIn ? ((0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: "success", children: checkedInAt ? `In · ${checkedInAt}` : 'Checked in' })) : ((0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: "neutral", children: "Not in" }))] })] }), (0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "switch", accessibilityState: { checked: checkedIn, disabled }, accessibilityLabel: checkedIn ? `Undo check-in for ${name}` : `Check in ${name}`, disabled: disabled, onPress: () => onToggle?.(!checkedIn), style: ({ pressed }) => ({
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.xs,
                    paddingVertical: tokens.spacing.xs,
                    paddingHorizontal: tokens.spacing.md,
                    borderRadius: tokens.radius.full,
                    backgroundColor: checkedIn ? colors.success : colors.primary,
                    opacity: disabled ? 0.5 : pressed ? 0.85 : 1,
                }), children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: checkedIn ? colors.onSuccess : colors.onPrimary, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: checkedIn ? '✓' : '+' }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: checkedIn ? colors.onSuccess : colors.onPrimary, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: checkedIn ? 'In' : 'Check in' })] })] }));
}
//# sourceMappingURL=CheckInRow.js.map