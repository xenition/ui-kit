"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TournamentBracket = TournamentBracket;
const jsx_runtime_1 = require("react/jsx-runtime");
const cn_1 = require("../primitives/cn");
const Card_1 = require("../primitives/Card");
const Icon_1 = require("../primitives/Icon");
const EmptyState_1 = require("../commerce/EmptyState");
function Side({ name, score, isWinner, }) {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('min-w-0 flex-1 truncate text-sm', name ? 'text-on-surface' : 'text-muted', isWinner ? 'font-bold' : 'font-normal'), children: name ?? 'TBD' }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-sm', isWinner ? 'font-bold text-primary' : 'font-normal text-muted'), children: score == null ? '–' : String(score) })] }));
}
/**
 * A single-elimination bracket — rounds render as horizontally scrollable
 * columns of match cards, each showing two sides, scores, and the advancing team
 * (marked in weight + color + an "advanced" hint, never color alone).
 * `onMatchClick` fires with the match and its guarded `[round, match]` indices;
 * an interactive match is a real `<button>`. Renders an `EmptyState` when there
 * are no matches. Composes `Card`, `EmptyState`. Token-only.
 */
function TournamentBracket({ rounds, emptyLabel = 'No matches scheduled', onMatchClick, className, }) {
    const totalMatches = rounds.reduce((n, r) => n + (r.matches?.length ?? 0), 0);
    if (rounds.length === 0 || totalMatches === 0) {
        return ((0, jsx_runtime_1.jsx)(EmptyState_1.EmptyState, { icon: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83C\uDFC6", size: "2xl", color: "muted", "aria-label": "Bracket" }), title: emptyLabel, className: className }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('flex gap-[var(--xen-space-lg)] overflow-x-auto p-[var(--xen-space-xs)]', className), children: rounds.map((round, ri) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-[176px] flex-col gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("h4", { className: "text-xs font-bold uppercase text-muted", children: round.name }), (round.matches ?? []).map((match, mi) => {
                    const decided = match.winner != null;
                    const winnerName = match.winner === 'home' ? match.home : match.winner === 'away' ? match.away : undefined;
                    const body = ((0, jsx_runtime_1.jsxs)(Card_1.Card, { className: "flex flex-col gap-[var(--xen-space-xs)] p-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)(Side, { name: match.home, score: match.homeScore, isWinner: match.winner === 'home' }), (0, jsx_runtime_1.jsx)("div", { className: "h-px bg-border" }), (0, jsx_runtime_1.jsx)(Side, { name: match.away, score: match.awayScore, isWinner: match.winner === 'away' })] }));
                    if (!onMatchClick)
                        return (0, jsx_runtime_1.jsx)("div", { children: body }, match.id);
                    return ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": `${match.home ?? 'TBD'} versus ${match.away ?? 'TBD'}`, "aria-pressed": decided, title: winnerName ? `${winnerName} advanced` : undefined, onClick: () => onMatchClick(match, ri, mi), className: "block w-full text-left transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300", children: body }, match.id));
                })] }, `${round.name}-${ri}`))) }));
}
//# sourceMappingURL=TournamentBracket.js.map