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
exports.MatchHeader = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const STATUS_META = {
    live: { label: 'LIVE', glyph: '●', live: true },
    halftime: { label: 'HT', glyph: '●', live: true },
    final: { label: 'FT', glyph: '✓', live: false },
    upcoming: { label: 'Upcoming', glyph: '🕑', live: false },
    postponed: { label: 'Postponed', glyph: '⚠', live: false },
};
/**
 * MatchHeader — the sports module's **live-match peak** (web parity of the native
 * twin). A full brand-gradient hero: the competition + venue read in near-white /
 * frosted ink at the top, a big crest·score·score·crest line dominates the middle,
 * and a live pulse + minute sit in a frosted pill (`bg-primary-50/15`) — the "LIVE"
 * state is announced via an `aria-live` region and reinforced by a pulsing dot
 * plus text, never color alone. Presentational only: shaped `home`/`away` teams,
 * a `status`, and an optional `onBack`; nothing fetches. Every color derives from
 * the brand ramp (`--xen-*` classes + gradient utilities) — no literals, dark-safe.
 */
exports.MatchHeader = React.forwardRef(function MatchHeader({ home, away, status, minute, competition, venue, onBack, className, ...rest }, ref) {
    const meta = STATUS_META[status] ?? STATUS_META.upcoming;
    const statusRight = status === 'live' && minute ? minute : meta.label;
    const a11y = `${home.name} ${home.score ?? ''} versus ${away.name} ${away.score ?? ''}, ${meta.label}` +
        (status === 'live' && minute ? `, ${minute}` : '');
    const homeWins = home.score !== undefined && away.score !== undefined && home.score > away.score;
    const awayWins = home.score !== undefined && away.score !== undefined && away.score > home.score;
    const renderCrest = (team, isWinner) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col items-center gap-2", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-4xl leading-none", children: team.crest ?? '🛡' }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('w-full truncate text-center text-sm text-primary-50', isWinner ? 'font-extrabold' : 'font-medium'), children: team.name })] }));
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": a11y, className: (0, cn_1.cn)('relative flex flex-col overflow-hidden rounded-[var(--xen-radius-lg)] bg-gradient-to-br from-primary-500 to-primary-700 p-6 text-primary-50 shadow-sm', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-start gap-3", children: [onBack ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Go back", onClick: onBack, className: "flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-primary-50/30 bg-primary-50/15 text-lg text-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300", children: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: "\u2039" }) })) : null, (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [competition ? ((0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs font-extrabold uppercase tracking-wide text-primary-50", children: competition })) : null, venue ? ((0, jsx_runtime_1.jsx)("p", { className: "mt-0.5 truncate text-xs text-primary-100", children: venue })) : null] }), (0, jsx_runtime_1.jsxs)("span", { className: "inline-flex flex-shrink-0 items-center gap-1.5 rounded-full border border-primary-50/30 bg-primary-50/15 px-3 py-1 text-xs font-extrabold text-primary-50", role: "status", "aria-live": meta.live ? 'polite' : 'off', children: [meta.live ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "h-2 w-2 animate-pulse rounded-full bg-primary-50" })) : ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: meta.glyph })), statusRight] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-6 flex items-center gap-4", children: [renderCrest(home, homeWins), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-shrink-0 items-center gap-2 text-5xl font-extrabold tracking-tight text-primary-50", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)(home.score === undefined && 'text-primary-100'), children: home.score === undefined ? '–' : home.score }), (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-primary-100", children: ":" }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)(away.score === undefined && 'text-primary-100'), children: away.score === undefined ? '–' : away.score })] }), renderCrest(away, awayWins)] })] }));
});
//# sourceMappingURL=MatchHeader.js.map