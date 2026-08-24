"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CivicAlert = CivicAlert;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const primitives_2 = require("../primitives");
const format_1 = require("./internal/format");
const SEVERITY = {
    info: { label: 'Information', glyph: 'ℹ️', slot: 'primary' },
    advisory: { label: 'Advisory', glyph: '📢', slot: 'accent' },
    warning: { label: 'Warning', glyph: '⚠️', slot: 'warn' },
    emergency: { label: 'Emergency', glyph: '🚨', slot: 'danger' },
};
/**
 * An emergency / civic alert banner. Severity is conveyed by **glyph + label +
 * a token color slot** (info → primary, warning → warn, emergency → danger) —
 * never color alone; the severity label is always rendered as text. Uses the RN
 * `alert` accessibility role so screen readers announce it. Optional primary and
 * dismiss actions. Every color traces to a `SemanticColors` slot or a
 * token-derived tint — no literals.
 */
function CivicAlert({ severity, title, message, source, time, actionLabel = 'View details', onAction, onDismiss, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const sd = SEVERITY[severity] ?? SEVERITY.info;
    const accent = colors[sd.slot];
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "alert", accessibilityLabel: `${sd.label}: ${title}`, style: [
            {
                flexDirection: 'row',
                alignItems: 'flex-start',
                gap: tokens.spacing.md,
                padding: tokens.spacing.md,
                borderRadius: tokens.radius.md,
                borderWidth: 1,
                borderColor: accent,
                backgroundColor: (0, format_1.withAlpha)(accent, 0.12),
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(primitives_2.Icon, { glyph: sd.glyph, size: "xl", color: sd.slot, accessibilityLabel: sd.label }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: accent, fontSize: tokens.typography.scale.xs, fontWeight: '700', textTransform: 'uppercase' }, children: sd.label }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: title }), message != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm }, children: message })) : null, source != null || time != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [source, time].filter((v) => v != null && v !== '').join(' · ') })) : null, onAction != null ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { marginTop: tokens.spacing.sm, alignItems: 'flex-start' }, children: (0, jsx_runtime_1.jsx)(primitives_2.Button, { size: "sm", tone: severity === 'emergency' ? 'danger' : 'default', onPress: onAction, children: actionLabel }) })) : null] }), onDismiss != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Dismiss alert", onPress: onDismiss, hitSlop: 8, style: ({ pressed }) => ({ opacity: pressed ? 0.5 : 1 }), children: (0, jsx_runtime_1.jsx)(primitives_2.Icon, { glyph: "\u2715", size: "sm", color: "muted", accessibilityLabel: "Dismiss" }) })) : null] }));
}
//# sourceMappingURL=CivicAlert.js.map