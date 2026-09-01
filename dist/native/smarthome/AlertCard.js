"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertCard = AlertCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
/** info→primary, warning→warn, critical→danger — accent by icon + label, not color alone. */
const SEVERITY_META = {
    info: { glyph: 'ℹ️', word: 'Info', accent: 'primary' },
    warning: { glyph: '⚠️', word: 'Warning', accent: 'warn' },
    critical: { glyph: '🚨', word: 'Critical', accent: 'danger' },
};
/**
 * AlertCard — **V4** "ambient" home alert. A calm notification card with a
 * **left severity-accent bar**, a severity glyph in a soft-tint disc, and a
 * soft (not saturated) severity-tinted background — `info`→primary,
 * `warning`→warn, `critical`→danger. Severity is spelled out as a word in the
 * accessible label so it never rides on color alone. Optional dismiss (✕) and
 * view actions are ≥44px targets. Presentational only; token-only colors via
 * `useXenitionTheme()` + `withAlpha`, dark-mode safe.
 */
function AlertCard({ severity, title, message, time, deviceName, icon, onDismiss, onView, viewLabel = 'View', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = SEVERITY_META[severity] ?? SEVERITY_META.info;
    const accent = colors[meta.accent];
    const meta2 = `${deviceName ?? ''}${deviceName != null && time != null ? ' · ' : ''}${time ?? ''}`;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: severity === 'critical' ? 'alert' : 'summary', accessibilityLabel: `${meta.word} alert: ${title}`, style: [
            {
                position: 'relative',
                overflow: 'hidden',
                borderRadius: tokens.radius.lg,
                borderWidth: 1,
                borderColor: (0, color_1.withAlpha)(accent, 0.4),
                backgroundColor: (0, color_1.withAlpha)(accent, 0.08),
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { position: 'absolute', top: 0, bottom: 0, left: 0, width: 4, backgroundColor: accent } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    gap: tokens.spacing.sm,
                    padding: tokens.spacing.md,
                    paddingLeft: tokens.spacing.md + 4,
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: 44,
                            height: 44,
                            borderRadius: tokens.radius.md,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderWidth: 1,
                            borderColor: (0, color_1.withAlpha)(accent, 0.4),
                            backgroundColor: (0, color_1.withAlpha)(accent, 0.15),
                        }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: icon ?? meta.glyph, color: meta.accent, size: "lg" }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { flex: 1, fontSize: tokens.typography.scale.base, fontWeight: '700', color: colors.onSurface }, children: title }), onDismiss ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Dismiss alert", onPress: onDismiss, style: ({ pressed }) => ({
                                            width: 44,
                                            height: 44,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderRadius: tokens.radius.md,
                                            backgroundColor: pressed ? (0, color_1.withAlpha)(colors.onSurface, 0.05) : 'transparent',
                                        }), children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u2715", color: "muted", size: "base" }) })) : null] }), message != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { marginTop: tokens.spacing.xs, fontSize: tokens.typography.scale.sm, color: (0, color_1.withAlpha)(colors.onSurface, 0.8) }, children: message })) : null, meta2.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { marginTop: tokens.spacing.xs, fontSize: tokens.typography.scale.xs, color: colors.muted }, children: meta2 })) : null, onView ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { marginTop: tokens.spacing.md, flexDirection: 'row', gap: tokens.spacing.sm }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: viewLabel, onPress: onView, style: ({ pressed }) => ({
                                        minHeight: 44,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        paddingHorizontal: tokens.spacing.md,
                                        borderRadius: tokens.radius.md,
                                        borderWidth: 1,
                                        borderColor: colors.primary,
                                        backgroundColor: colors.primary,
                                        opacity: pressed ? 0.9 : 1,
                                    }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.sm, fontWeight: '600', color: colors.onPrimary }, children: viewLabel }) }) })) : null] })] })] }));
}
//# sourceMappingURL=AlertCard.js.map