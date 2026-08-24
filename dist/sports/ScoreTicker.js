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
exports.ScoreTicker = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const interactive_1 = require("./interactive");
const STATUS_META = {
    live: { label: 'LIVE', live: true },
    final: { label: 'FT', live: false },
    upcoming: { label: 'SOON', live: false },
};
/**
 * A horizontally-scrolling scoreboard strip — compact per-match tiles for a
 * top-of-screen ticker. Each tile shows both codes, the scoreline, and a status
 * marked by text (plus a `danger` dot for live, never color alone). Handles
 * empty and loading states. Activated via `onSelect`. Token-only colors.
 */
exports.ScoreTicker = React.forwardRef(function ScoreTicker({ matches, onSelect, loadingTiles, emptyLabel = 'No matches', className, ...rest }, ref) {
    const strip = 'flex gap-2 overflow-x-auto px-1 py-1';
    if (loadingTiles && loadingTiles > 0) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "aria-busy": "true", className: (0, cn_1.cn)(strip, className), ...rest, children: Array.from({ length: loadingTiles }).map((_, i) => ((0, jsx_runtime_1.jsx)("div", { className: "h-16 w-32 shrink-0 rounded-md bg-neutral-100" }, i))) }));
    }
    if (matches.length === 0) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, cn_1.cn)('rounded-md border border-border bg-surface px-4 py-3 text-center text-sm text-muted', className), ...rest, children: emptyLabel }));
    }
    const line = (name, score) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between gap-2", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm font-semibold text-on-surface", children: name }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-sm font-bold', score === undefined ? 'text-muted' : 'text-on-surface'), children: score === undefined ? '–' : score })] }));
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, cn_1.cn)(strip, className), ...rest, children: matches.map((m) => {
            const status = m.status ?? 'upcoming';
            const sm = STATUS_META[status] ?? STATUS_META.upcoming;
            const hasScore = m.homeScore !== undefined && m.awayScore !== undefined;
            const a11y = `${m.home} versus ${m.away}, ${sm.label}${hasScore ? `, ${m.homeScore} ${m.awayScore}` : ''}`;
            const interactive = (0, interactive_1.tappableProps)(onSelect ? () => onSelect(m) : undefined, a11y);
            return ((0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('w-32 shrink-0 rounded-md border border-border bg-surface p-2', onSelect &&
                    'cursor-pointer outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-primary-300'), ...(onSelect ? {} : { 'aria-label': a11y }), ...interactive, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-1", children: [sm.live ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "h-1.5 w-1.5 rounded-full bg-danger" })) : null, (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex-1 text-xs font-bold', sm.live ? 'text-danger' : 'text-muted'), children: sm.label }), m.clock ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: m.clock }) : null] }), line(m.home, m.homeScore), line(m.away, m.awayScore)] }, m.id));
        }) }));
});
//# sourceMappingURL=ScoreTicker.js.map