"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImpactStatV4 = ImpactStatV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
/**
 * ImpactStat — **V4** "rally" design. A single mission metric drawn with the
 * warm, elevated "rally" identity: a big legible value numeral, an optional
 * muted unit, a glyph chip in the tone color, a caption label, and a supporting
 * caption. Honors all three `variant`s — `plain` (no surface), `card` (an
 * elevated bordered `colors.card` surface with a soft shadow), and `tile` (a
 * filled soft-tone panel via `withAlpha`) — and all three `tone`s
 * (`primary | success | accent`), identical props/behavior to
 * {@link ImpactStatProps}; the glyph is decorative and the metric is announced
 * as a `summary`. Tone reads through the glyph + value color, never color
 * alone. Token-only colors via `useXenitionTheme()`.
 */
function ImpactStatV4({ value, label, unit, glyph, caption, variant = 'plain', tone = 'primary', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const accent = tone === 'success' ? colors.success : tone === 'accent' ? colors.accent : colors.primary;
    const containerStyle = variant === 'card'
        ? {
            padding: tokens.spacing.md,
            borderRadius: tokens.radius.lg,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: colors.card,
            shadowColor: colors.onSurface,
            shadowOpacity: 0.08,
            shadowRadius: 12,
            shadowOffset: { width: 0, height: 6 },
            elevation: 3,
        }
        : variant === 'tile'
            ? { padding: tokens.spacing.md, borderRadius: tokens.radius.lg, backgroundColor: (0, color_1.withAlpha)(accent, 0.12) }
            : null;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "summary", accessibilityLabel: `${String(value)}${unit ? ` ${unit}` : ''} ${label}`, style: [containerStyle, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [glyph ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: tokens.spacing.xl,
                            height: tokens.spacing.xl,
                            borderRadius: tokens.radius.full,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: (0, color_1.withAlpha)(accent, 0.14),
                        }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: glyph, size: "base" }) })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-end', gap: tokens.spacing.xs }, children: [typeof value === 'string' || typeof value === 'number' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale['3xl'], fontWeight: '800' }, children: value })) : (value), unit ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.base, marginBottom: tokens.spacing.xs }, children: unit })) : null] })] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm, marginTop: tokens.spacing.xs }, children: label }), caption ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, marginTop: 2 }, children: caption })) : null] }));
}
//# sourceMappingURL=ImpactStatV4.js.map