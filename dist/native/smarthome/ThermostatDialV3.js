"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThermostatDialV3 = ThermostatDialV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const MODE_ACCENT = {
    heat: 'danger',
    cool: 'primary',
    auto: 'accent',
    off: 'muted',
};
const MODE_TONE = {
    heat: 'danger',
    cool: 'primary',
    auto: 'accent',
    off: 'neutral',
};
const MODE_LABEL = {
    heat: 'Heating',
    cool: 'Cooling',
    auto: 'Auto',
    off: 'Off',
};
/**
 * ThermostatDial — alternate design **V3**: a minimal +/- stepper card, no SVG.
 * A big center setpoint (with optional ambient sub-line) is flanked by large
 * `−`/`+` `Pressable`s, and the mode is announced by a text {@link Badge} so it
 * never rests on color alone. Drop-in replacement for `ThermostatDial` — same
 * props — for tight layouts where a full dial is too heavy. `span`/clamping
 * guard the setpoint math and `offline` dims + disables the steppers.
 */
function ThermostatDialV3({ target, ambient, min = 10, max = 30, step = 0.5, mode = 'heat', unit = '°', onTargetChange, offline = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const accent = offline ? 'muted' : MODE_ACCENT[mode];
    const clampedTarget = Math.min(Math.max(target, min), max);
    const bump = (dir) => {
        if (offline || !onTargetChange)
            return;
        const next = Math.min(Math.max(clampedTarget + dir * step, min), max);
        onTargetChange(next);
    };
    const stepBtn = (dir, glyph, label) => ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: label, disabled: offline, onPress: () => bump(dir), style: ({ pressed }) => ({
            width: 48,
            height: 48,
            borderRadius: tokens.radius.full,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: colors.surface,
            opacity: offline ? 0.5 : pressed ? 0.8 : 1,
        }), children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: glyph, color: "onSurface", size: "xl" }) }));
    return ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { variant: "outlined", accessibilityRole: "adjustable", accessibilityLabel: `Thermostat, ${MODE_LABEL[mode]}`, style: [{ opacity: offline ? 0.6 : 1 }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, children: [stepBtn(-1, '−', 'Lower target temperature'), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center', flex: 1 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: {
                                    color: colors.onSurface,
                                    fontSize: tokens.typography.scale['3xl'],
                                    fontFamily: tokens.typography.fontHeading,
                                    fontWeight: '700',
                                }, children: [clampedTarget, unit] }), ambient != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, marginBottom: 4 }, children: `Now ${ambient}${unit}` })) : null, (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: offline ? 'neutral' : MODE_TONE[mode], variant: "soft", size: "sm", children: offline ? 'Offline' : MODE_LABEL[mode] })] }), stepBtn(1, '+', 'Raise target temperature')] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 2, marginTop: tokens.spacing.sm, borderRadius: tokens.radius.full, backgroundColor: colors[accent] } })] }));
}
//# sourceMappingURL=ThermostatDialV3.js.map