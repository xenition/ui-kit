"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherStat = WeatherStat;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Card_1 = require("../primitives/Card");
const Icon_1 = require("../primitives/Icon");
/**
 * Compact weather metric tile — humidity, pressure, visibility, dew point, etc.
 * A leading glyph, a muted label, a large token-scaled value with an optional
 * unit suffix, and a caption line. `variant='plain'` drops the card chrome for
 * use inside grids/rows. Renders a muted placeholder when `value` is absent.
 * All colors/sizes come from the compiled theme tokens via `useXenitionTheme()`
 * — no literal colors.
 */
function WeatherStat({ label, value, unit, glyph, caption, variant = 'card', emptyValue = '—', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const hasValue = value != null;
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [glyph ? (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: glyph, size: "sm" }) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: label })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                    gap: tokens.spacing.xs,
                    marginTop: tokens.spacing.xs,
                }, children: [typeof value === 'string' || typeof value === 'number' || !hasValue ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: colors.onSurface,
                            fontSize: tokens.typography.scale['2xl'],
                            fontWeight: '700',
                        }, children: hasValue ? value : emptyValue })) : (value), unit && hasValue ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: colors.muted,
                            fontSize: tokens.typography.scale.base,
                            marginBottom: 2,
                        }, children: unit })) : null] }), caption ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: colors.muted,
                    fontSize: tokens.typography.scale.xs,
                    marginTop: tokens.spacing.xs,
                }, children: caption })) : null] }));
    const a11y = `${label}, ${hasValue ? `${value}${unit ? ' ' + unit : ''}` : 'no data'}`;
    if (variant === 'plain') {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "summary", accessibilityLabel: a11y, style: style, children: body }));
    }
    return ((0, jsx_runtime_1.jsx)(Card_1.Card, { variant: "outlined", style: style, accessibilityRole: "summary", accessibilityLabel: a11y, children: body }));
}
//# sourceMappingURL=WeatherStat.js.map