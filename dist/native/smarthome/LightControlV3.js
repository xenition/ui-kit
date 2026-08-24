"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LightControlV3 = LightControlV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
/**
 * LightControl — alternate design **V3**: a compact single row with an inline
 * brightness bar. The bulb glyph + name lead, a thin {@link Progress} bar plus a
 * percentage read the current brightness in the row itself, and the power
 * {@link Switch} trails. A text `On`/`Off`/`Offline` status carries state (never
 * color-alone). Drop-in replacement for `LightControl` — same props — for dense
 * light lists; the color-temp control is intentionally dropped for compactness.
 * Brightness is clamped to `[0,100]` and the bar hides when the light is dark.
 */
function LightControlV3({ name, on = false, brightness = 0, offline = false, onToggle, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const lit = on && !offline;
    const shownBrightness = Math.round(Math.min(Math.max(brightness, 0), 100));
    const statusLabel = offline ? 'Offline' : on ? 'On' : 'Off';
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.sm,
                paddingVertical: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.sm,
                borderRadius: tokens.radius.md,
                backgroundColor: colors.surface,
                borderWidth: 1,
                borderColor: colors.border,
                opacity: offline ? 0.7 : 1,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 30,
                    height: 30,
                    borderRadius: tokens.radius.sm,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: lit ? (0, color_1.withAlpha)(colors.warn, 0.14) : colors.surface,
                }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\uD83D\uDCA1", color: lit ? 'warn' : 'muted', size: "base" }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 4 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: name }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: lit ? `${shownBrightness}%` : statusLabel })] }), lit ? ((0, jsx_runtime_1.jsx)(primitives_1.Progress, { value: shownBrightness, max: 100, tone: "warn", size: "sm" })) : null] }), (0, jsx_runtime_1.jsx)(primitives_1.Switch, { checked: on, disabled: offline, onCheckedChange: onToggle, accessibilityLabel: `${name} power` })] }));
}
//# sourceMappingURL=LightControlV3.js.map