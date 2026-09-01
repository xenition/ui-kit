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
exports.MatchScoreV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const interactive_1 = require("./interactive");
const STATUS_META = {
    live: { label: 'LIVE', glyph: '●', live: true, pill: 'bg-danger/10 text-danger' },
    halftime: { label: 'HT', glyph: '●', live: true, pill: 'bg-danger/10 text-danger' },
    final: { label: 'FT', glyph: '✓', live: false, pill: 'bg-muted/10 text-muted' },
    upcoming: { label: 'Upcoming', glyph: '🕑', live: false, pill: 'bg-primary/10 text-primary' },
    postponed: { label: 'Postponed', glyph: '⚠', live: false, pill: 'bg-warn/10 text-warn' },
};
/**
 * MatchScore — **V4** "broadcast" design (web parity of the native V4). The
 * matchday take on a scoreline: an elevated card with a soft-tint status pill (a
 * pulsing danger dot reinforces "LIVE" — never color alone) and bold score
 * numerals; the `feature` variant becomes a full brand-gradient hero with
 * near-white ink. Same props/behavior as {@link MatchScoreProps}; all colors
 * from `--xen-*` token classes (no literals). `loading` swaps in a token skeleton.
 */
exports.MatchScoreV4 = React.forwardRef(function MatchScoreV4({ home, away, status, minute, kickoffLabel, competition, variant = 'row', loading = false, onClick, className, ...rest }, ref) {
    const meta = STATUS_META[status] ?? STATUS_META.upcoming;
    const feature = variant === 'feature';
    const scoreClass = feature ? 'text-3xl' : 'text-2xl';
    const shell = (0, cn_1.cn)('flex flex-col gap-2 overflow-hidden rounded-[var(--xen-radius-lg)] p-4 shadow-sm', feature
        ? 'bg-gradient-to-br from-primary-500 to-primary-700 text-primary-50'
        : 'border border-border bg-surface text-on-surface', className);
    if (loading) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "aria-label": "Loading match", "aria-busy": "true", className: (0, cn_1.cn)(shell, 'border border-border bg-surface'), ...rest, children: [0, 1].map((i) => ((0, jsx_runtime_1.jsx)("div", { className: "h-6 rounded-sm bg-on-surface/10" }, i))) }));
    }
    const statusRight = status === 'live' && minute ? minute : status === 'upcoming' && kickoffLabel ? kickoffLabel : meta.label;
    const a11y = `${home.name} ${home.score ?? ''} versus ${away.name} ${away.score ?? ''}, ${meta.label}` +
        (status === 'live' && minute ? `, ${minute}` : '');
    const homeWins = home.score !== undefined && away.score !== undefined && home.score > away.score;
    const awayWins = home.score !== undefined && away.score !== undefined && away.score > home.score;
    const captionCls = feature ? 'text-primary-100' : 'text-muted';
    const pillCls = feature ? 'bg-primary-50/15 text-primary-50' : meta.pill;
    const renderSide = (team, isWinner) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 items-center gap-2", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-base leading-none", children: team.crest ?? '🛡' }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex-1 truncate text-base', feature ? 'text-primary-50' : 'text-on-surface', isWinner ? 'font-extrabold' : 'font-medium'), children: team.name }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-right font-extrabold', scoreClass, team.score === undefined ? (feature ? 'text-primary-100' : 'text-muted') : feature ? 'text-primary-50' : 'text-on-surface'), children: team.score === undefined ? '–' : team.score })] }));
    const interactive = (0, interactive_1.tappableProps)(onClick, a11y);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: onClick ? (0, cn_1.cn)(shell, interactive_1.FOCUS_RING) : shell, ...(onClick ? {} : { 'aria-label': a11y }), ...interactive, ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [competition ? (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex-1 truncate text-xs font-bold', captionCls), children: competition }) : (0, jsx_runtime_1.jsx)("span", { className: "flex-1" }), (0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-extrabold', pillCls), children: [meta.live ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('h-2 w-2 rounded-full', feature ? 'bg-primary-50' : 'bg-danger') })) : ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: meta.glyph })), statusRight] })] }), renderSide(home, homeWins), renderSide(away, awayWins)] }));
});
//# sourceMappingURL=MatchScoreV4.js.map