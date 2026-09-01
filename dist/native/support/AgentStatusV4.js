"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentStatusV4 = AgentStatusV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Avatar_1 = require("../primitives/Avatar");
const internal_1 = require("./internal");
// online → success, away → warn, offline → muted. Each carries a distinct glyph
// so presence reads by shape as well as color.
const PRESENCE = {
    online: { slot: 'success', glyph: '●', label: 'Online' },
    away: { slot: 'warn', glyph: '◐', label: 'Away' },
    offline: { slot: 'muted', glyph: '○', label: 'Offline' },
};
/**
 * AgentStatus — **V4** "calm console" design. The agent-workspace take on a
 * presence indicator: an avatar + name with a soft-tint presence pill carrying
 * glyph + label (presence is encoded by glyph **and** color, never color alone),
 * plus an optional detail chip. The compact `dot` variant is just the pill; the
 * `row` variant is an elevated, tappable ≥44px card. Same props/behavior as
 * {@link AgentStatusProps}; token-only colors via `useXenitionTheme()`.
 */
function AgentStatusV4({ presence, name, avatar, detail, variant = 'row', onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const spec = PRESENCE[presence] ?? PRESENCE.offline;
    const presenceColor = colors[spec.slot];
    const a11y = `${name ? `${name}, ` : ''}${spec.label}${detail ? `, ${detail}` : ''}`;
    const pill = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 4,
            paddingHorizontal: tokens.spacing.sm,
            paddingVertical: 2,
            borderRadius: tokens.radius.full,
            backgroundColor: (0, internal_1.withAlpha)(presenceColor, 0.12),
        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: presenceColor, fontSize: tokens.typography.scale.xs }, children: spec.glyph }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: presenceColor, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: spec.label })] }));
    if (variant === 'dot') {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityRole: "text", accessibilityLabel: a11y, style: [{ flexDirection: 'row', alignItems: 'center' }, style], children: pill }));
    }
    const cardBase = {
        flexDirection: 'row',
        alignItems: 'center',
        gap: tokens.spacing.md,
        minHeight: 44,
        padding: tokens.spacing.sm,
        backgroundColor: colors.card,
        borderRadius: tokens.radius.lg,
        borderWidth: 1,
        borderColor: colors.border,
        shadowColor: colors.onSurface,
        shadowOpacity: 0.06,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 3 },
        elevation: 2,
    };
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { size: "md", name: name, src: avatar, status: presence === 'offline' ? 'offline' : presence === 'away' ? 'away' : 'online' }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 4 }, children: [name ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: name })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, flexWrap: 'wrap' }, children: [pill, detail ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    paddingHorizontal: tokens.spacing.sm,
                                    paddingVertical: 2,
                                    borderRadius: tokens.radius.full,
                                    backgroundColor: (0, internal_1.withAlpha)(colors.onSurface, 0.05),
                                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: detail }) })) : null] })] })] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11y, onPress: onPress, style: ({ pressed }) => [
                cardBase,
                { backgroundColor: pressed ? (0, internal_1.withAlpha)(colors.onSurface, 0.04) : colors.card },
                style,
            ], children: body }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityRole: "text", accessibilityLabel: a11y, style: [cardBase, style], children: body }));
}
//# sourceMappingURL=AgentStatusV4.js.map