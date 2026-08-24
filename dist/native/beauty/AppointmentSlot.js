"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentSlot = AppointmentSlot;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const STATUS_META = {
    available: { slot: 'primary', disabled: false },
    selected: { slot: 'primary', note: 'Selected', disabled: false },
    held: { slot: 'warn', note: 'On hold', disabled: true },
    booked: { slot: 'muted', note: 'Booked', disabled: true },
};
/**
 * A single bookable time slot rendered as a tappable pill. `status` carries the
 * meaning (never color alone): `selected` fills with the accent, `held`/`booked`
 * are disabled and labelled, `available` is an outlined tap target. The spoken
 * label always includes the status word, and `accessibilityState.selected` /
 * `.disabled` are set. Token-only colors via semantic slots + `withAlpha`.
 */
function AppointmentSlot({ time, status = 'available', meta, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const info = STATUS_META[status] ?? STATUS_META.available;
    const accent = colors[info.slot];
    const isSelected = status === 'selected';
    const interactive = !info.disabled && !!onPress;
    const bg = isSelected ? accent : info.disabled ? (0, color_1.withAlpha)(colors.muted, 0.08) : colors.surface;
    const fg = isSelected ? colors.onPrimary : info.disabled ? colors.muted : colors.onSurface;
    const border = isSelected ? accent : info.disabled ? colors.border : accent;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${time}${meta ? `, ${meta}` : ''}, ${status}`, accessibilityState: { selected: isSelected, disabled: info.disabled }, disabled: !interactive, onPress: interactive ? onPress : undefined, style: ({ pressed }) => [
            {
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: 84,
                gap: 2,
                borderWidth: 1,
                borderColor: border,
                borderRadius: tokens.radius.md,
                paddingVertical: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.md,
                backgroundColor: bg,
                opacity: pressed && interactive ? 0.85 : 1,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: fg, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: time }), info.note ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: isSelected ? colors.onPrimary : accent, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: info.note })) : meta ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: isSelected ? colors.onPrimary : colors.muted, fontSize: tokens.typography.scale.xs }, children: meta })) : null] }));
}
//# sourceMappingURL=AppointmentSlot.js.map