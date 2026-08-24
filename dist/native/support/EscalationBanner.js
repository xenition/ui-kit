"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EscalationBanner = EscalationBanner;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Button_1 = require("../primitives/Button");
const Icon_1 = require("../primitives/Icon");
const internal_1 = require("./internal");
const LEVEL = {
    info: { slot: 'primary', glyph: 'ℹ', role: 'Notice' },
    warning: { slot: 'warn', glyph: '⚠', role: 'Warning' },
    critical: { slot: 'danger', glyph: '⛔', role: 'Critical' },
};
/**
 * A prominent escalation banner for at-risk / breached tickets. Severity is
 * shown by a leading glyph, a role word ("Warning"/"Critical") **and** a
 * semantic tint — never color alone — mapping `critical`→danger, `warning`→warn,
 * `info`→primary. Exposes an "Escalate" primary action (`onEscalate`, with an
 * optional busy spinner) and an "Acknowledge" secondary (`onAcknowledge`). All
 * colors come from `SemanticColors` + token tints; no literal hex.
 */
function EscalationBanner({ level = 'warning', title, message, onEscalate, onAcknowledge, escalateLabel = 'Escalate', acknowledgeLabel = 'Acknowledge', escalating = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const spec = LEVEL[level] ?? LEVEL.warning;
    const accent = colors[spec.slot];
    const escalateTone = level === 'critical' ? 'danger' : level === 'warning' ? 'default' : 'primary';
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "alert", accessibilityLabel: `${spec.role}: ${title}${message ? `. ${message}` : ''}`, style: [
            {
                flexDirection: 'row',
                alignItems: 'flex-start',
                gap: tokens.spacing.sm,
                padding: tokens.spacing.md,
                backgroundColor: (0, internal_1.withAlpha)(accent, 0.12),
                borderColor: accent,
                borderWidth: 1,
                borderLeftWidth: 4,
                borderRadius: tokens.radius.md,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: spec.glyph, size: "lg", color: spec.slot, accessibilityLabel: spec.role }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: title }), message ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: message })) : null, onEscalate || onAcknowledge ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.sm, marginTop: tokens.spacing.xs }, children: [onEscalate ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { size: "sm", tone: escalateTone, loading: escalating, onPress: onEscalate, children: escalateLabel })) : null, onAcknowledge ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { size: "sm", variant: "ghost", onPress: onAcknowledge, children: acknowledgeLabel })) : null] })) : null] })] }));
}
//# sourceMappingURL=EscalationBanner.js.map