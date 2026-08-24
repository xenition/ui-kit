"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutomationRule = AutomationRule;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
/**
 * An automation rule row — name plus a "when → then" trigger/action summary and
 * an enable {@link Switch}. Enabled rules tint the glyph with `primary`; disabled
 * or `offline` rules fall back to `muted`, and a text `On`/`Off`/`Offline` label
 * carries the state independent of color. The trigger and action clauses join
 * with a token-colored arrow. `offline` blocks toggling. No literal colors.
 */
function AutomationRule({ name, trigger, action, icon = '⚙️', enabled = false, offline = false, onToggle, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const active = enabled && !offline;
    const statusLabel = offline ? 'Offline' : enabled ? 'On' : 'Off';
    return ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { variant: "outlined", style: [{ opacity: offline ? 0.7 : 1 }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: 36,
                            height: 36,
                            borderRadius: tokens.radius.md,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: colors.surface,
                            borderWidth: 1,
                            borderColor: active ? colors.primary : colors.border,
                        }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: icon, color: active ? 'primary' : 'muted', size: "lg" }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: name }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: statusLabel })] }), (0, jsx_runtime_1.jsx)(primitives_1.Switch, { checked: enabled, disabled: offline, onCheckedChange: onToggle, accessibilityLabel: `${name} enabled` })] }), trigger != null || action != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { marginTop: tokens.spacing.sm, flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 4 }, children: [trigger != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.xs }, children: trigger })) : null, trigger != null && action != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primary, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: "\u2192" })) : null, action != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: action })) : null] })) : null] }));
}
//# sourceMappingURL=AutomationRule.js.map