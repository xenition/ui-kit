"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LobbyRow = LobbyRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const types_1 = require("./types");
/**
 * One joinable lobby / room row — name, host, mode, a filled/total slot meter,
 * and a Join button. The button disables (with a "Full" / "In progress" label,
 * not color alone) when the room can't be joined. `onJoin(lobby)` fires the
 * intent. Composes `Card`, `Button`, `Badge`, `Icon`. Token-only.
 */
function LobbyRow({ lobby, variant = 'default', joining = false, onJoin, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const compact = variant === 'compact';
    const cap = Math.max(0, lobby.capacity);
    const filled = (0, types_1.clamp)(lobby.players, 0, cap || lobby.players);
    const isFull = cap > 0 && filled >= cap;
    const joinable = !isFull && !lobby.inProgress;
    const joinLabel = lobby.inProgress ? 'In progress' : isFull ? 'Full' : 'Join';
    const slots = cap > 0 ? Array.from({ length: cap }, (_, i) => i < filled) : [];
    return ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { style: [{ gap: compact ? tokens.spacing.xs : tokens.spacing.sm }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [lobby.locked ? (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\uD83D\uDD12", size: "sm", color: "muted", accessibilityLabel: "Locked" }) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flexShrink: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: lobby.name })] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [lobby.host ? `Host ${lobby.host}` : undefined, !compact ? lobby.mode : undefined]
                                    .filter(Boolean)
                                    .join(' · ') || ' ' })] }), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: isFull ? 'danger' : 'neutral', variant: "soft", size: "sm", children: `${filled}/${cap || lobby.players}` }), onJoin ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: joinable ? 'primary' : 'secondary', size: "sm", loading: joining, disabled: !joinable, onPress: () => onJoin(lobby), accessibilityLabel: `${joinLabel} ${lobby.name}`, children: joinLabel })) : null] }), !compact && slots.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', gap: 3 }, accessible: true, accessibilityLabel: `${filled} of ${cap} slots filled`, children: slots.map((on, i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        flex: 1,
                        height: 4,
                        borderRadius: tokens.radius.full,
                        backgroundColor: on ? colors.primary : colors.border,
                    } }, i))) })) : null] }));
}
//# sourceMappingURL=LobbyRow.js.map