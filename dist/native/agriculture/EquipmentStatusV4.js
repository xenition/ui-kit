"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EquipmentStatusV4 = EquipmentStatusV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const BadgeV4_1 = require("../primitives/BadgeV4");
const CardV4_1 = require("../primitives/CardV4");
const IconV4_1 = require("../primitives/IconV4");
const ProgressV4_1 = require("../primitives/ProgressV4");
const TextV4_1 = require("../primitives/TextV4");
const state_v4_1 = require("../primitives/internal/state-v4");
const farm_v4_1 = require("./internal/farm-v4");
/** State → tone and default label. Genuinely a status, so the tones stay. */
const STATE_META = {
    operational: { label: 'Operational', tone: 'success' },
    idle: { label: 'Idle', tone: 'neutral' },
    maintenance: { label: 'Maintenance', tone: 'warn' },
    offline: { label: 'Offline', tone: 'danger' },
};
/**
 * **V4 equipment status** — same props as {@link EquipmentStatus} plus
 * `stateLabels` and `lowFuelThreshold`.
 *
 * ## Four changes
 *
 * 1. **The low-fuel threshold is a prop.** 20% was a constant inside the
 *    component, and it is a fleet decision, not a design-system one.
 * 2. **Press is a state layer**, not `opacity: 0.85`.
 * 3. **The state's ink is the contrast-corrected slot** — `mutedText`,
 *    `successText`, `warnText`, `dangerText` — where the base put the *fill*
 *    slots (`muted`, `success`, …) directly on text.
 * 4. **Type comes from `TextV4`**, and the fuel and hours figures are tabular
 *    so a column of machines lines up.
 *
 * **Renders nothing without a `name`** (§4.5).
 */
function EquipmentStatusV4({ name, type, icon = '🚜', state = 'operational', fuelPct, fuelLabel = 'Fuel', hours, stateLabels, lowFuelThreshold = 20, onPress, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    if (!name)
        return null;
    const meta = STATE_META[state];
    const label = stateLabels?.[state] ?? meta.label;
    const pct = (0, farm_v4_1.clampPercent)(fuelPct);
    const lowFuel = pct != null && pct < lowFuelThreshold;
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: icon, size: "xl" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { face: "heading", size: "base", weight: "bold", tone: "onCard", numberOfLines: 1, children: name }), type != null ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", numberOfLines: 1, children: type })) : null] }), (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: meta.tone, variant: "soft", size: "sm", children: label })] }), pct != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { marginTop: tokens.spacing.md, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: fuelLabel }), (0, jsx_runtime_1.jsxs)(TextV4_1.TextV4, { size: "xs", weight: "semibold", numeric: "tabular", style: { color: lowFuel ? (0, farm_v4_1.toneInk)(theme, 'warn') : colors.onCard }, children: [pct, "%"] })] }), (0, jsx_runtime_1.jsx)(ProgressV4_1.ProgressV4, { value: pct, tone: lowFuel ? 'warn' : 'primary' })] })) : null, hours != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.xs,
                    marginTop: tokens.spacing.sm,
                }, children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: "clock", size: "xs", color: "mutedText" }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numeric: "tabular", children: hours })] })) : null] }));
    if (!onPress)
        return (0, jsx_runtime_1.jsx)(CardV4_1.CardV4, { style: style, children: body });
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: [name, type, label].filter(Boolean).join(', '), onPress: onPress, style: ({ pressed }) => ({
            borderRadius: tokens.radius.lg,
            backgroundColor: pressed ? (0, state_v4_1.pressOver)(theme, colors.card, colors.onCard) : 'transparent',
        }), children: (0, jsx_runtime_1.jsx)(CardV4_1.CardV4, { style: style, children: body }) }));
}
//# sourceMappingURL=EquipmentStatusV4.js.map