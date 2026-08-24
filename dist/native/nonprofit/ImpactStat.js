"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImpactStat = ImpactStat;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Icon_1 = require("../primitives/Icon");
const internal_1 = require("./internal");
/**
 * A single impact metric — a large token-scaled figure, an optional unit, a
 * caption label, and an optional glyph chip. `variant` renders it bare
 * (`plain`), inside a bordered `card`, or as a tinted `tile`. The glyph is
 * decorative; the metric is announced as a `summary`. All colors come from the
 * compiled theme tokens (accent tints via `withAlpha`) — no literal colors.
 */
function ImpactStat({ value, label, unit, glyph, caption, variant = 'plain', tone = 'primary', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const accent = tone === 'success' ? colors.success : tone === 'accent' ? colors.accent : colors.primary;
    const containerStyle = variant === 'card'
        ? { padding: tokens.spacing.md, borderRadius: tokens.radius.lg, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface }
        : variant === 'tile'
            ? { padding: tokens.spacing.md, borderRadius: tokens.radius.lg, backgroundColor: (0, internal_1.withAlpha)(accent, 0.1) }
            : null;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "summary", accessibilityLabel: `${String(value)}${unit ? ` ${unit}` : ''} ${label}`, style: [containerStyle, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [glyph ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: tokens.spacing.xl,
                            height: tokens.spacing.xl,
                            borderRadius: tokens.radius.full,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: (0, internal_1.withAlpha)(accent, 0.14),
                        }, children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: glyph, size: "base" }) })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-end', gap: tokens.spacing.xs }, children: [typeof value === 'string' || typeof value === 'number' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale['3xl'], fontWeight: '800' }, children: value })) : (value), unit ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.base, marginBottom: tokens.spacing.xs }, children: unit })) : null] })] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm, marginTop: tokens.spacing.xs }, children: label }), caption ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, marginTop: 2 }, children: caption })) : null] }));
}
//# sourceMappingURL=ImpactStat.js.map