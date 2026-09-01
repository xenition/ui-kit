"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.TournamentBracketV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const EmptyStateV4_1 = require("../primitives/EmptyStateV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
const arcade_v4_1 = require("./internal/arcade-v4");
const CARD_STATE = (0, v4_state_1.stateGroundVars)('var(--xen-card)', 'var(--xen-on-card)');
function Side({ name, score, isWinner, }) {
    return ((0, jsx_runtime_1.jsxs)("span", { className: "flex items-center justify-between gap-sm", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('min-w-0 flex-1 truncate text-sm', name ? 'text-on-card' : 'text-muted-text', isWinner ? 'font-bold' : 'font-normal'), children: name ?? 'TBD' }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-sm', arcade_v4_1.TABULAR_CLASS, isWinner ? 'font-bold text-on-card' : 'font-normal text-muted-text'), children: score == null ? '–' : String(score) })] }));
}
/**
 * **V4 tournament bracket** — same props as {@link TournamentBracket} plus
 * `advancedLabel`.
 *
 * ## Four changes
 *
 * 1. **A reader can learn a score.** The match's name was
 *    `"Ada versus Kite"` — no scores — and it sat on a `role="button"`, which
 *    makes the whole subtree presentational. So the two sides that render the
 *    scores were removed from the accessibility tree by the same element that
 *    failed to mention them, and a screen-reader user could not learn a single
 *    score anywhere in the bracket. The name is built with `spokenLine()` and
 *    carries both sides and both scores.
 * 2. **Opening a match stops claiming to be a toggle.** It announced
 *    `aria-pressed={decided}` — pressed because the match had a *winner*,
 *    which the user cannot change and which has nothing to do with whether
 *    they have pressed anything. It opens a detail view; it is an action.
 * 3. **Who advanced is on the screen.** It lived in a `title` attribute:
 *    invisible on touch, invisible to the keyboard, announced by some readers
 *    and not others, and untranslatable by the app. `advancedLabel` puts it in
 *    the card as text and in the match's name.
 * 4. **The rounds are lists, press is a state layer and scores are tabular.**
 *    Each round was a stack of anonymous `div`s; `hover:opacity-85` dimmed the
 *    match's own content, which is M3's *disabled* signal; and proportional
 *    digits made the score column shift as a live bracket updated.
 */
exports.TournamentBracketV4 = React.forwardRef(function TournamentBracketV4({ rounds, emptyLabel = 'No matches scheduled', onMatchClick, advancedLabel = (name) => `${name} advanced`, className, }, ref) {
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    const list = rounds ?? [];
    const totalMatches = list.reduce((n, round) => n + (round.matches?.length ?? 0), 0);
    if (totalMatches === 0) {
        return (0, jsx_runtime_1.jsx)(EmptyStateV4_1.EmptyStateV4, { ref: ref, title: emptyLabel, className: className });
    }
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, cn_1.cn)('flex gap-lg overflow-x-auto p-xs', className), children: list.map((round, ri) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-[calc(var(--xen-space-2xl)_*_4)] flex-col gap-sm", children: [(0, jsx_runtime_1.jsx)("h4", { className: "font-heading text-xs font-bold uppercase text-muted-text", children: round.name }), (0, jsx_runtime_1.jsx)("ul", { "aria-label": round.name, className: "flex flex-col gap-sm", children: (round.matches ?? []).map((match, mi) => {
                        const winnerName = match.winner === 'home'
                            ? match.home
                            : match.winner === 'away'
                                ? match.away
                                : undefined;
                        const advanced = winnerName ? advancedLabel(winnerName) : undefined;
                        const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(Side, { name: match.home, score: match.homeScore, isWinner: match.winner === 'home' }), (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "block h-px bg-border" }), (0, jsx_runtime_1.jsx)(Side, { name: match.away, score: match.awayScore, isWinner: match.winner === 'away' }), advanced ? ((0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted-text", children: advanced })) : null] }));
                        const cardClass = (0, cn_1.cn)('flex flex-col gap-xs rounded-[var(--xen-radius-md)] border border-border', 'bg-card p-sm text-on-card');
                        if (!onMatchClick) {
                            return ((0, jsx_runtime_1.jsx)("li", { className: cardClass, children: body }, match.id));
                        }
                        return ((0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": (0, arcade_v4_1.spokenLine)([
                                    match.home ?? 'TBD',
                                    match.homeScore != null ? String(match.homeScore) : undefined,
                                    match.away ?? 'TBD',
                                    match.awayScore != null ? String(match.awayScore) : undefined,
                                    advanced,
                                ]), onClick: () => onMatchClick(match, ri, mi), "data-xen-v4-state": "", style: CARD_STATE, className: (0, cn_1.cn)(cardClass, 'w-full text-left', chrome_v4_1.MIN_TAP_CLASS, 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'), children: body }) }, match.id));
                    }) })] }, `${round.name}-${ri}`))) }));
});
//# sourceMappingURL=TournamentBracketV4.js.map