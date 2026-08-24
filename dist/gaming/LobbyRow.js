"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LobbyRow = LobbyRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const cn_1 = require("../primitives/cn");
const Badge_1 = require("../primitives/Badge");
const Button_1 = require("../primitives/Button");
const Card_1 = require("../primitives/Card");
const Icon_1 = require("../primitives/Icon");
const types_1 = require("./types");
/**
 * One joinable lobby / room row — name, host, mode, a filled/total slot meter,
 * and a Join button. The button disables (with a "Full" / "In progress" label,
 * not color alone) when the room can't be joined. `onJoin(lobby)` fires the
 * intent. Composes `Card`, `Button`, `Badge`, `Icon`. Token-only.
 */
function LobbyRow({ lobby, variant = 'default', joining = false, onJoin, className, }) {
    const compact = variant === 'compact';
    const cap = Math.max(0, lobby.capacity);
    const filled = (0, types_1.clamp)(lobby.players, 0, cap || lobby.players);
    const isFull = cap > 0 && filled >= cap;
    const joinable = !isFull && !lobby.inProgress;
    const joinLabel = lobby.inProgress ? 'In progress' : isFull ? 'Full' : 'Join';
    const slots = cap > 0 ? Array.from({ length: cap }, (_, i) => i < filled) : [];
    const subline = [lobby.host ? `Host ${lobby.host}` : undefined, !compact ? lobby.mode : undefined]
        .filter(Boolean)
        .join(' · ');
    return ((0, jsx_runtime_1.jsxs)(Card_1.Card, { className: (0, cn_1.cn)('flex flex-col', compact ? 'gap-[var(--xen-space-xs)]' : 'gap-[var(--xen-space-sm)]', className), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-xs)]", children: [lobby.locked ? (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83D\uDD12", size: "sm", color: "muted", "aria-label": "Locked" }) : null, (0, jsx_runtime_1.jsx)("span", { className: "min-w-0 truncate text-base font-bold text-on-surface", children: lobby.name })] }), (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted", children: subline || ' ' })] }), (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: isFull ? 'danger' : 'neutral', children: `${filled}/${cap || lobby.players}` }), onJoin ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { variant: joinable ? 'primary' : 'secondary', size: "sm", disabled: !joinable || joining, "aria-busy": joining || undefined, onClick: () => onJoin(lobby), "aria-label": `${joinLabel} ${lobby.name}`, children: joinLabel })) : null] }), !compact && slots.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "flex gap-[3px]", "aria-label": `${filled} of ${cap} slots filled`, children: slots.map((on, i) => ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('h-1 flex-1 rounded-full', on ? 'bg-primary' : 'bg-border') }, i))) })) : null] }));
}
//# sourceMappingURL=LobbyRow.js.map