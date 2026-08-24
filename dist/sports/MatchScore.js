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
exports.MatchScore = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Icon_1 = require("../primitives/Icon");
const interactive_1 = require("./interactive");
const STATUS_META = {
    live: { label: 'LIVE', glyph: '●', live: true },
    halftime: { label: 'HT', glyph: '●', live: true },
    final: { label: 'FT', glyph: '✓', live: false },
    upcoming: { label: 'Upcoming', glyph: '🕑', live: false },
    postponed: { label: 'Postponed', glyph: '⚠', live: false },
};
/**
 * A single fixture's scoreline — the web anchor of the sports module. Renders
 * both teams, their scores, and a status chip that distinguishes live / final /
 * upcoming by **text + glyph**, not color alone (a `danger` dot merely
 * reinforces the "LIVE" label). Presentational only: shaped data plus an
 * optional `onClick`; nothing fetches. `loading` swaps in a token skeleton. All
 * colors come from `--xen-*` token classes — no literals.
 */
exports.MatchScore = React.forwardRef(function MatchScore({ home, away, status, minute, kickoffLabel, competition, variant = 'row', loading = false, onClick, className, ...rest }, ref) {
    const meta = STATUS_META[status] ?? STATUS_META.upcoming;
    const feature = variant === 'feature';
    const scoreClass = feature ? 'text-3xl' : 'text-xl';
    const shell = (0, cn_1.cn)('flex flex-col gap-2 rounded-lg border border-border bg-surface p-4 text-on-surface', className);
    if (loading) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "aria-label": "Loading match", "aria-busy": "true", className: shell, ...rest, children: [0, 1].map((i) => ((0, jsx_runtime_1.jsx)("div", { className: "h-5 rounded-sm bg-neutral-200" }, i))) }));
    }
    const statusRight = status === 'live' && minute
        ? minute
        : status === 'upcoming' && kickoffLabel
            ? kickoffLabel
            : meta.label;
    const a11y = `${home.name} ${home.score ?? ''} versus ${away.name} ${away.score ?? ''}, ${meta.label}` +
        (status === 'live' && minute ? `, ${minute}` : '');
    const homeWins = home.score !== undefined && away.score !== undefined && home.score > away.score;
    const awayWins = home.score !== undefined && away.score !== undefined && away.score > home.score;
    const renderSide = (team, isWinner) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 items-center gap-2", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-base leading-none", children: team.crest ?? '🛡' }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex-1 truncate text-base text-on-surface', isWinner ? 'font-bold' : 'font-medium'), children: team.name }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-right font-bold', scoreClass, team.score === undefined ? 'text-muted' : 'text-on-surface'), children: team.score === undefined ? '–' : team.score })] }));
    const interactive = (0, interactive_1.tappableProps)(onClick, a11y);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: onClick ? (0, cn_1.cn)(shell, interactive_1.FOCUS_RING) : shell, ...(onClick ? {} : { 'aria-label': a11y }), ...interactive, ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [competition ? ((0, jsx_runtime_1.jsx)("span", { className: "flex-1 truncate text-xs font-semibold text-muted", children: competition })) : ((0, jsx_runtime_1.jsx)("span", { className: "flex-1" })), (0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-1", children: [meta.live ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "h-2 w-2 rounded-full bg-danger" })) : ((0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: meta.glyph, size: "xs", color: "muted" })), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs font-bold', meta.live ? 'text-danger' : 'text-muted'), children: statusRight })] })] }), renderSide(home, homeWins), renderSide(away, awayWins)] }));
});
//# sourceMappingURL=MatchScore.js.map