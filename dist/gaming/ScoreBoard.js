"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScoreBoard = ScoreBoard;
const jsx_runtime_1 = require("react/jsx-runtime");
const cn_1 = require("../primitives/cn");
const Avatar_1 = require("../primitives/Avatar");
const Card_1 = require("../primitives/Card");
const Icon_1 = require("../primitives/Icon");
const EmptyState_1 = require("../commerce/EmptyState");
function Crest({ entry, size }) {
    if (entry.avatarUrl) {
        return ((0, jsx_runtime_1.jsx)("img", { src: entry.avatarUrl, alt: "", loading: "lazy", className: (0, cn_1.cn)('rounded-[var(--xen-radius-sm)] bg-neutral-200 object-cover', size === 'lg' ? 'h-12 w-12' : 'h-7 w-7') }));
    }
    return (0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { name: entry.name, size: size });
}
function VersusSide({ entry, score, winner, align, }) {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 flex-col items-center gap-[var(--xen-space-xs)]", "aria-label": `${entry?.name ?? 'TBD'}, ${score ?? 0}${winner ? ', leading' : ''}`, children: [entry ? (0, jsx_runtime_1.jsx)(Crest, { entry: entry, size: "lg" }) : (0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { name: "?", size: "lg" }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('w-full truncate text-sm', winner ? 'font-bold' : 'font-medium', 'text-on-surface', align === 'left' ? 'text-left' : 'text-right'), children: entry?.name ?? 'TBD' }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-2xl font-bold', winner ? 'text-primary' : 'text-muted'), children: score ?? 0 })] }));
}
/**
 * A scoreboard — a `ranked` ordered standings list (leader highlighted in weight
 * + position, not color alone) or a `versus` head-to-head between the first two
 * entries. Renders an `EmptyState` when there are no entries. Uses guarded
 * indexing for the versus sides. Composes `Card`, `Avatar`, `EmptyState`.
 * Token-only.
 */
function ScoreBoard({ entries, variant = 'ranked', title, emptyLabel = 'No scores yet', className, }) {
    if (entries.length === 0) {
        return ((0, jsx_runtime_1.jsx)(EmptyState_1.EmptyState, { icon: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83C\uDFC1", size: "2xl", color: "muted", "aria-label": "Scores" }), title: emptyLabel, className: className }));
    }
    const header = title ? (0, jsx_runtime_1.jsx)("h3", { className: "text-base font-bold text-on-surface", children: title }) : null;
    if (variant === 'versus') {
        const home = entries[0];
        const away = entries[1];
        const homeWins = home != null && away != null && home.score > away.score;
        const awayWins = home != null && away != null && away.score > home.score;
        return ((0, jsx_runtime_1.jsxs)(Card_1.Card, { className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-md)]', className), children: [header, (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)(VersusSide, { entry: home, score: home?.score, winner: homeWins, align: "left" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-bold text-muted", children: "VS" }), (0, jsx_runtime_1.jsx)(VersusSide, { entry: away, score: away?.score, winner: awayWins, align: "right" })] })] }));
    }
    const ranked = [...entries].sort((a, b) => b.score - a.score);
    return ((0, jsx_runtime_1.jsxs)(Card_1.Card, { className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-xs)]', className), children: [header, ranked.map((e, i) => {
                const leader = i === 0;
                return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-sm)] py-[var(--xen-space-xs)]", "aria-label": `Rank ${i + 1}, ${e.name}, ${e.score} points`, children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('w-[22px] text-sm font-bold', leader ? 'text-primary' : 'text-muted'), children: i + 1 }), (0, jsx_runtime_1.jsx)(Crest, { entry: e, size: "sm" }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: (0, cn_1.cn)('truncate text-sm text-on-surface', leader ? 'font-bold' : 'font-medium'), children: e.name }), e.detail ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted", children: e.detail }) : null] }), (0, jsx_runtime_1.jsx)("span", { className: "text-base font-bold text-on-surface", children: e.score })] }, e.id));
            })] }));
}
//# sourceMappingURL=ScoreBoard.js.map