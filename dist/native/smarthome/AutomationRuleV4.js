"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutomationRuleV4 = AutomationRuleV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
/**
 * AutomationRule — **V4** "ambient" design. The control-panel take on an
 * automation row: an **enabled rule glows** — when active the card takes a soft
 * `primary`-tinted wash, a primary border, and a glowing icon disc; disabled or
 * `offline` rules stay calm and muted. The "when → then" clause reads as a
 * trigger → action line, and a text `On`/`Off`/`Offline` label carries the state
 * independent of color. The enable {@link Switch} is blocked while `offline`.
 * Same props/behavior as {@link AutomationRuleProps}; token-only colors via
 * `useXenitionTheme()`.
 */
function AutomationRuleV4({ name, trigger, action, icon = '⚙️', enabled = false, offline = false, onToggle, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const active = enabled && !offline;
    const statusLabel = offline ? 'Offline' : enabled ? 'On' : 'Off';
    const accent = active ? 'primary' : 'muted';
    return ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { variant: "outlined", style: [
            {
                opacity: offline ? 0.7 : 1,
                backgroundColor: active ? (0, color_1.withAlpha)(colors.primary, 0.08) : colors.card,
                borderColor: active ? (0, color_1.withAlpha)(colors.primary, 0.5) : colors.border,
                ...(active
                    ? { shadowColor: colors.primary, shadowOpacity: 0.18, shadowRadius: 12, shadowOffset: { width: 0, height: 4 }, elevation: 3 }
                    : {}),
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: 44,
                            height: 44,
                            borderRadius: tokens.radius.md,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: active ? (0, color_1.withAlpha)(colors.primary, 0.16) : (0, color_1.withAlpha)(colors.onSurface, 0.05),
                            borderWidth: 1,
                            borderColor: active ? (0, color_1.withAlpha)(colors.primary, 0.4) : colors.border,
                        }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: icon, color: accent, size: "lg" }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: name }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: statusLabel })] }), (0, jsx_runtime_1.jsx)(primitives_1.Switch, { checked: enabled, disabled: offline, onCheckedChange: onToggle, accessibilityLabel: `${name} enabled` })] }), trigger != null || action != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { marginTop: tokens.spacing.sm, flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 4 }, children: [trigger != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.xs }, children: trigger })) : null, trigger != null && action != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: active ? colors.primary : colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: "\u2192" })) : null, action != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: action })) : null] })) : null] }));
}
//# sourceMappingURL=AutomationRuleV4.js.map