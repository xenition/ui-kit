"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentSlotV4 = AppointmentSlotV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
/** What each status looks like and whether it can be taken. */
const STATUS_META = {
    available: { label: 'Available', disabled: false },
    selected: { label: 'Selected', disabled: false },
    held: { label: 'On hold', disabled: true },
    booked: { label: 'Booked', disabled: true },
};
/**
 * **V4 appointment slot** — same props as {@link AppointmentSlot} plus
 * `statusLabels`.
 *
 * ## Four changes
 *
 * 1. **It clears 44.** A slot grid is the densest tap target in a booking
 *    flow and the base sized it by its padding, so a compact seed produced a
 *    chip a thumb could miss.
 * 2. **A booked or held slot cannot be pressed**, and dims at M3's 0.38. The
 *    base kept them pressable and reported the press.
 * 3. **The time is tabular**, so a column of slots has an edge to scan.
 * 4. **Press is a state layer over the chip's own fill**, not an opacity that
 *    fades its content.
 *
 * **Renders nothing without a `time`** (§4.5).
 */
function AppointmentSlotV4({ time, status = 'available', meta, statusLabels, onPress, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    if (!time)
        return null;
    const info = STATUS_META[status];
    const word = statusLabels?.[status] ?? info.label;
    const selected = status === 'selected';
    const blocked = info.disabled;
    const fill = selected ? colors.primary : colors.card;
    const ink = selected ? colors.onPrimary : colors.onCard;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: [time, word, meta].filter(Boolean).join(', '), accessibilityState: { selected, disabled: blocked }, disabled: blocked || !onPress, onPress: onPress, style: ({ pressed }) => [
            {
                minHeight: (0, chrome_v4_1.minTap)(tokens.spacing),
                alignItems: 'center',
                justifyContent: 'center',
                gap: tokens.spacing.xs / 2,
                borderRadius: tokens.radius.md,
                borderWidth: 1,
                borderColor: selected ? colors.primary : colors.border,
                backgroundColor: pressed && !blocked ? (0, state_v4_1.pressOver)(theme, fill, ink) : fill,
                paddingHorizontal: tokens.spacing.md,
                paddingVertical: tokens.spacing.sm,
                opacity: (0, chrome_v4_1.disabledOpacity)(theme.state, blocked),
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", numeric: "tabular", style: { color: ink }, children: time }), meta ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", style: { color: selected ? colors.onPrimary : colors.mutedText }, children: meta })) : null] }));
}
//# sourceMappingURL=AppointmentSlotV4.js.map