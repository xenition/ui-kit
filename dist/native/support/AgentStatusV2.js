"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentStatusV2 = AgentStatusV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Avatar_1 = require("../primitives/Avatar");
const StatusDot_1 = require("../primitives/StatusDot");
const appearance_1 = require("../primitives/internal/appearance");
const motion_1 = require("../primitives/internal/motion");
const internal_1 = require("./internal");
const PRESENCE = {
    online: { dot: 'success', avatar: 'online', text: 'successText', label: 'Online' },
    away: { dot: 'warn', avatar: 'away', text: 'warnText', label: 'Away' },
    offline: { dot: 'muted', avatar: 'offline', text: 'muted', label: 'Offline' },
};
/**
 * AgentStatus — **V2 (avatar tile)**. A raised, centered tile: a large avatar
 * with a presence ring + corner status dot, the agent name, a
 * glyph-dot + presence label, and an optional detail line. Same
 * `AgentStatusProps` as {@link AgentStatus} (the `variant` prop is ignored — the
 * tile IS the design). Presence is carried by dot + text, never color alone;
 * token colors only.
 */
function AgentStatusV2({ presence, name, avatar, detail, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const spec = PRESENCE[presence] ?? PRESENCE.offline;
    const press = (0, motion_1.usePressScale)();
    const enter = (0, motion_1.useEnter)();
    const a11y = `${name ? `${name}, ` : ''}${spec.label}${detail ? `, ${detail}` : ''}`;
    const inner = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { size: "lg", name: name, src: avatar, status: spec.avatar, ring: true }), name ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                    color: colors.onSurface,
                    fontSize: tokens.typography.scale.base,
                    fontWeight: '700',
                    marginTop: tokens.spacing.sm,
                }, children: name })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.xs,
                    marginTop: tokens.spacing.xs,
                    backgroundColor: (0, internal_1.withAlpha)(colors[spec.dot === 'muted' ? 'onSurface' : spec.dot], 0.1),
                    borderRadius: tokens.radius.full,
                    paddingVertical: 2,
                    paddingHorizontal: tokens.spacing.sm,
                }, children: [(0, jsx_runtime_1.jsx)(StatusDot_1.StatusDot, { tone: spec.dot, pulse: presence === 'online', size: 7 }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors[spec.text], fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: spec.label })] }), detail ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, marginTop: tokens.spacing.xs }, children: detail })) : null] }));
    const tileStyle = [
        (0, appearance_1.appearanceStyle)('elevated', colors, tokens),
        {
            borderRadius: tokens.radius.lg,
            padding: tokens.spacing.md,
            alignItems: 'center',
            minWidth: 120,
        },
    ];
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: [
                { opacity: enter.opacity, transform: [...enter.transform, { scale: press.scale }] },
                style,
            ], children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11y, onPress: onPress, onPressIn: press.onPressIn, onPressOut: press.onPressOut, style: tileStyle, children: inner }) }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { accessible: true, accessibilityRole: "text", accessibilityLabel: a11y, style: [{ opacity: enter.opacity, transform: enter.transform }, ...tileStyle, style], children: inner }));
}
//# sourceMappingURL=AgentStatusV2.js.map