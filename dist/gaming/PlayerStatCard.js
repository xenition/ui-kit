"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerStatCard = PlayerStatCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const cn_1 = require("../primitives/cn");
const Avatar_1 = require("../primitives/Avatar");
const Badge_1 = require("../primitives/Badge");
const Card_1 = require("../primitives/Card");
/**
 * A player profile summary — avatar (with optional presence dot), handle,
 * rank/level, and (in `detailed`) a responsive grid of headline stats. Renders
 * a graceful "No stats yet" line when `detailed` has no stats. `onClick(player)`
 * opens the profile (the card becomes a keyboard-operable `role="button"`).
 * Presence is announced via text, never color alone. Composes `Card`, `Avatar`,
 * `Badge`. Token-only.
 */
function PlayerStatCard({ player, variant = 'compact', online, onClick, className, }) {
    const detailed = variant === 'detailed';
    const stats = player.stats ?? [];
    const header = ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsxs)("span", { className: "relative inline-flex shrink-0", children: [(0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { src: player.avatarUrl, name: player.name, size: detailed ? 'lg' : 'md' }), online !== undefined ? ((0, jsx_runtime_1.jsx)("span", { role: "img", "aria-label": online ? 'Online' : 'Offline', className: (0, cn_1.cn)('absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-surface', online ? 'bg-success' : 'bg-muted') })) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-lg font-bold text-on-surface", children: player.name }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap items-center gap-[var(--xen-space-xs)]", children: [player.rank ? (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: "primary", children: player.rank }) : null, player.level != null ? ((0, jsx_runtime_1.jsxs)("span", { className: "text-sm text-muted", children: ["Level ", player.level] })) : null] })] })] }));
    const grid = detailed ? (stats.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-[var(--xen-space-sm)]", children: stats.map((s, i) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-[84px] flex-1 basis-[30%] flex-col gap-0.5 rounded-[var(--xen-radius-md)] border border-border bg-surface px-[var(--xen-space-md)] py-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-lg font-bold text-on-surface", children: s.value }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: s.label })] }, `${s.label}-${i}`))) })) : ((0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted", children: "No stats yet" }))) : null;
    const interactive = Boolean(onClick);
    return ((0, jsx_runtime_1.jsxs)(Card_1.Card, { className: (0, cn_1.cn)('flex flex-col', detailed ? 'gap-[var(--xen-space-md)]' : 'gap-0', interactive && 'cursor-pointer transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className), ...(interactive
            ? {
                role: 'button',
                tabIndex: 0,
                'aria-label': `${player.name}${player.rank ? `, ${player.rank}` : ''}`,
                onClick: () => onClick(player),
                onKeyDown: (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onClick(player);
                    }
                },
            }
            : {}), children: [header, grid] }));
}
//# sourceMappingURL=PlayerStatCard.js.map