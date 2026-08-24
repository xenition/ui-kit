"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentStatusV3 = AgentStatusV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const StatusDot_1 = require("../primitives/StatusDot");
const PRESENCE = {
    online: { dot: 'success', text: 'successText', label: 'Online' },
    away: { dot: 'warn', text: 'warnText', label: 'Away' },
    offline: { dot: 'muted', text: 'muted', label: 'Offline' },
};
/**
 * AgentStatus — **V3 (compact inline)**. A single dense line: a status dot, the
 * agent name, the presence label, and an optional detail — sized to sit inline
 * in a list header or toolbar. Same `AgentStatusProps` as {@link AgentStatus}
 * (the `variant` prop is ignored — this IS the compact design). Presence is
 * carried by dot + text; token colors only.
 */
function AgentStatusV3({ presence, name, detail, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const spec = PRESENCE[presence] ?? PRESENCE.offline;
    const a11y = `${name ? `${name}, ` : ''}${spec.label}${detail ? `, ${detail}` : ''}`;
    const inner = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(StatusDot_1.StatusDot, { tone: spec.dot, pulse: presence === 'online', size: 8 }), name ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: name })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors[spec.text], fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: spec.label }), detail ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["\u00B7 ", detail] })) : null] }));
    const rowStyle = { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs };
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11y, onPress: onPress, style: ({ pressed }) => [rowStyle, { opacity: pressed ? 0.7 : 1 }, style], children: inner }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityRole: "text", accessibilityLabel: a11y, style: [rowStyle, style], children: inner }));
}
//# sourceMappingURL=AgentStatusV3.js.map