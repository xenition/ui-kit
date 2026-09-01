"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SensorReadingV4 = SensorReadingV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const STATUS_META = {
    normal: { accent: 'primary', value: 'onSurface', label: 'Normal', tone: 'success' },
    warn: { accent: 'warn', value: 'warn', label: 'High', tone: 'warn' },
    danger: { accent: 'danger', value: 'danger', label: 'Alert', tone: 'danger' },
    offline: { accent: 'muted', value: 'muted', label: 'Offline', tone: 'neutral' },
};
/** Icon slot for the disc — semantic name that maps to a `text-*`/theme color. */
const ICON_COLOR = {
    normal: 'primary',
    warn: 'warn',
    danger: 'danger',
    offline: 'muted',
};
/**
 * SensorReading — **V4** "ambient" design. The calm take on a sensor card: a
 * glyph sits in a **status-tinted glowing disc**, the reading is a **big
 * legible numeral** (3xl, weight 800) beside its unit, with the sensor `label`
 * and a soft-tint status pill (Normal / High / Alert / Offline) below. `status`
 * also colors the numeral — but the pill's icon+label always carries the
 * meaning, so an at-risk reading is never conveyed by color alone. When
 * `offline` the value renders as an em dash; optional `trend` sits underneath.
 * Same props/behavior as {@link SensorReadingProps}; token-only colors via
 * `useXenitionTheme()` + `withAlpha`.
 */
function SensorReadingV4({ label, value, unit, icon = '📈', status = 'normal', trend, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = STATUS_META[status];
    const accent = colors[meta.accent];
    const shownValue = status === 'offline' || value == null ? '—' : String(value);
    const tinted = status !== 'offline';
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                borderRadius: tokens.radius.lg,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.card,
                padding: tokens.spacing.md,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: 44,
                            height: 44,
                            borderRadius: tokens.radius.md,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: tinted ? (0, color_1.withAlpha)(accent, 0.12) : (0, color_1.withAlpha)(colors.onSurface, 0.05),
                            borderWidth: 1,
                            borderColor: tinted ? (0, color_1.withAlpha)(accent, 0.4) : colors.border,
                        }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: icon, color: ICON_COLOR[status], size: "lg" }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', gap: 4 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                            color: colors[meta.value],
                                            fontSize: tokens.typography.scale['3xl'],
                                            fontWeight: '800',
                                            fontFamily: tokens.typography.fontHeading,
                                        }, children: shownValue }), unit != null && shownValue !== '—' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.base }, children: unit })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs, marginTop: tokens.spacing.xs }, children: label })] })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    marginTop: tokens.spacing.md,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: tokens.spacing.xs,
                }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: meta.tone, variant: "soft", size: "sm", children: meta.label }), trend != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flexShrink: 1, color: colors.muted, fontSize: tokens.typography.scale.xs }, children: trend })) : null] })] }));
}
//# sourceMappingURL=SensorReadingV4.js.map