"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentStatus = AgentStatus;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Avatar_1 = require("../primitives/Avatar");
const StatusDot_1 = require("../primitives/StatusDot");
const PRESENCE = {
    online: { slot: 'success', label: 'Online' },
    away: { slot: 'warn', label: 'Away' },
    offline: { slot: 'muted', label: 'Offline' },
};
/**
 * Agent availability indicator (`online`/`away`/`offline`). The `dot` variant
 * is a pulsing status dot + text label; the `row` variant adds an avatar and an
 * optional detail line and can be tapped. Presence is announced by text and dot
 * position, not color alone. The dot maps to `SemanticColors`
 * (`success`/`warn`/`muted`); no literal hex. The pulse animation respects the
 * OS reduced-motion setting via the underlying `StatusDot`.
 */
function AgentStatus({ presence, name, avatar, detail, variant = 'row', onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const spec = PRESENCE[presence] ?? PRESENCE.offline;
    const dotTone = spec.slot;
    const a11y = `${name ? `${name}, ` : ''}${spec.label}${detail ? `, ${detail}` : ''}`;
    if (variant === 'dot') {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityRole: "text", accessibilityLabel: a11y, style: [{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, style], children: [(0, jsx_runtime_1.jsx)(StatusDot_1.StatusDot, { tone: dotTone, pulse: presence === 'online' }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors[dotTone], fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: spec.label })] }));
    }
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { size: "md", name: name, src: avatar, status: presence === 'offline' ? 'offline' : presence === 'away' ? 'away' : 'online' }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [name ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: name })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(StatusDot_1.StatusDot, { tone: dotTone, pulse: presence === 'online', size: 7 }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors[dotTone], fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: spec.label }), detail ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["\u00B7 ", detail] })) : null] })] })] }));
    const rowStyle = [
        { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md },
        style,
    ];
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11y, onPress: onPress, style: ({ pressed }) => [rowStyle, { opacity: pressed ? 0.7 : 1 }], children: body }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityRole: "text", accessibilityLabel: a11y, style: rowStyle, children: body }));
}
//# sourceMappingURL=AgentStatus.js.map