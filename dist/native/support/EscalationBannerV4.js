"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EscalationBannerV4 = EscalationBannerV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Button_1 = require("../primitives/Button");
const internal_1 = require("./internal");
// critical → danger, warning → warn, info → primary. The role word + glyph carry
// severity so it's never color-alone.
const LEVEL = {
    info: { slot: 'primary', glyph: 'ℹ', role: 'Notice', escalateTone: 'primary' },
    warning: { slot: 'warn', glyph: '⚠', role: 'Warning', escalateTone: 'default' },
    critical: { slot: 'danger', glyph: '⛔', role: 'Critical', escalateTone: 'danger' },
};
/**
 * EscalationBanner — **V4** "calm console" design. A prominent-but-calm banner:
 * an elevated rounded card with a left severity-accent bar (the signature at-a-
 * glance cue), a leading glyph in a soft-tint chip, and a role word
 * ("Warning"/"Critical") — severity is encoded by glyph **and** color (never
 * color alone), mapping `critical`→danger, `warning`→warn, `info`→primary.
 * Exposes an "Escalate" primary action (`onEscalate`, with an optional busy
 * spinner) and an "Acknowledge" dismiss (`onAcknowledge`); both actions are
 * ≥44px tall. Same props/behavior as {@link EscalationBannerProps}; token-only
 * colors via `useXenitionTheme()` + `withAlpha` (no literal hex).
 */
function EscalationBannerV4({ level = 'warning', title, message, onEscalate, onAcknowledge, escalateLabel = 'Escalate', acknowledgeLabel = 'Acknowledge', escalating = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const spec = LEVEL[level] ?? LEVEL.warning;
    const accent = colors[spec.slot];
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "alert", accessibilityLabel: `${spec.role}: ${title}${message ? `. ${message}` : ''}`, style: [
            {
                flexDirection: 'row',
                backgroundColor: colors.card,
                borderRadius: tokens.radius.lg,
                borderWidth: 1,
                borderColor: colors.border,
                overflow: 'hidden',
                shadowColor: colors.onSurface,
                shadowOpacity: 0.06,
                shadowRadius: 8,
                shadowOffset: { width: 0, height: 3 },
                elevation: 2,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 4, backgroundColor: accent } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.md, padding: tokens.spacing.md, flex: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: 40,
                            height: 40,
                            borderRadius: tokens.radius.md,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: (0, internal_1.withAlpha)(accent, 0.12),
                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: accent, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, accessibilityLabel: spec.role, children: spec.glyph }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: title }), message ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: message })) : null, onEscalate || onAcknowledge ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm, marginTop: tokens.spacing.xs }, children: [onEscalate ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { size: "sm", tone: spec.escalateTone, loading: escalating, onPress: onEscalate, style: { minHeight: 44 }, children: escalateLabel })) : null, onAcknowledge ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { size: "sm", variant: "ghost", onPress: onAcknowledge, style: { minHeight: 44 }, children: acknowledgeLabel })) : null] })) : null] })] })] }));
}
//# sourceMappingURL=EscalationBannerV4.js.map