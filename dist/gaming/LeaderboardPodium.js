"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaderboardPodium = LeaderboardPodium;
const jsx_runtime_1 = require("react/jsx-runtime");
const cn_1 = require("../primitives/cn");
const Avatar_1 = require("../primitives/Avatar");
const Card_1 = require("../primitives/Card");
const Icon_1 = require("../primitives/Icon");
const EmptyState_1 = require("../commerce/EmptyState");
const types_1 = require("./types");
// Podium render order (2nd, 1st, 3rd) with per-place heights + accent slots.
const PLACES = [
    { index: 1, height: 56, medal: '🥈', border: 'border-t-border' },
    { index: 0, height: 80, medal: '🥇', border: 'border-t-warn' },
    { index: 2, height: 40, medal: '🥉', border: 'border-t-accent' },
];
/**
 * A top-3 leaderboard podium — the first three `entries` render as centered
 * columns (2nd · 1st · 3rd) with medals, avatars, names, and scores; the tallest
 * block marks the leader. Uses **guarded indexing** so a 1- or 2-entry list
 * simply omits the missing places, and renders an `EmptyState` when there are
 * none. `onClick(entry, rank)` opens a place (a real `<button>`). Composes
 * `Card`, `Avatar`, `Icon`, `EmptyState`. Token-only.
 */
function LeaderboardPodium({ entries, emptyLabel = 'No rankings yet', onClick, className, }) {
    if (entries.length === 0) {
        return ((0, jsx_runtime_1.jsx)(EmptyState_1.EmptyState, { icon: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83C\uDFC6", size: "2xl", color: "muted", "aria-label": "Leaderboard" }), title: emptyLabel, className: className }));
    }
    return ((0, jsx_runtime_1.jsx)(Card_1.Card, { className: (0, cn_1.cn)('flex items-end justify-center gap-[var(--xen-space-sm)]', className), children: PLACES.map((place) => {
            const entry = entries[place.index];
            if (!entry)
                return (0, jsx_runtime_1.jsx)("div", { className: "flex-1" }, place.index);
            const rank = place.index + 1;
            const label = `Rank ${rank}, ${entry.name}, ${entry.score} points`;
            const column = ((0, jsx_runtime_1.jsxs)("div", { className: "flex w-full flex-col items-center gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-xl leading-none", children: place.medal }), (0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { src: entry.avatarUrl, name: entry.name, size: place.index === 0 ? 'lg' : 'md' }), (0, jsx_runtime_1.jsx)("span", { className: "max-w-full truncate text-sm font-bold text-on-surface", children: entry.name }), (0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex w-full flex-col items-center rounded-t-[var(--xen-radius-md)] border-t-2 bg-neutral-100 pt-[var(--xen-space-xs)]', place.border), style: { height: place.height }, children: [(0, jsx_runtime_1.jsxs)("span", { className: "text-base font-bold text-on-surface", children: ["#", rank] }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-on-surface", children: (0, types_1.formatCount)(entry.score) })] })] }));
            if (!onClick) {
                return ((0, jsx_runtime_1.jsx)("div", { className: "flex-1", "aria-label": label, children: column }, entry.id));
            }
            return ((0, jsx_runtime_1.jsx)("button", { type: "button", className: "flex-1 transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300", "aria-label": label, onClick: () => onClick(entry, rank), children: column }, entry.id));
        }) }));
}
//# sourceMappingURL=LeaderboardPodium.js.map