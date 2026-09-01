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
exports.ScoreTickerV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const interactive_1 = require("./interactive");
const STATUS_META = {
    live: { label: 'LIVE', glyph: '●', live: true, pill: 'bg-danger/10 text-danger' },
    final: { label: 'FT', glyph: '✓', live: false, pill: 'bg-muted/10 text-muted' },
    upcoming: { label: 'SOON', glyph: '🕑', live: false, pill: 'bg-primary/10 text-primary' },
};
/**
 * ScoreTicker — **V4** "broadcast" design (web parity of the native V4). A
 * horizontally-scrolling strip of mini score cards, each a compact matchup with
 * a soft-tint status pill (a pulsing `danger` dot reinforces "LIVE" — never
 * color alone) and bold numerals; live tiles are subtly emphasised with a
 * `primary` ring. One accent: `primary`. Same props/behavior as
 * {@link ScoreTickerProps} (drop-in) — keeps the horizontal scroll, per-match
 * `onSelect`, loading and empty states. All colors from `--xen-*` token classes
 * (no literals).
 */
exports.ScoreTickerV4 = React.forwardRef(function ScoreTickerV4({ matches, onSelect, loadingTiles, emptyLabel = 'No matches', className, ...rest }, ref) {
    const strip = 'flex gap-2 overflow-x-auto px-1 py-1';
    if (loadingTiles && loadingTiles > 0) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "aria-busy": "true", className: (0, cn_1.cn)(strip, className), ...rest, children: Array.from({ length: loadingTiles }).map((_, i) => ((0, jsx_runtime_1.jsx)("div", { className: "h-20 w-36 shrink-0 rounded-[var(--xen-radius-lg)] bg-on-surface/10" }, i))) }));
    }
    if (matches.length === 0) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, cn_1.cn)('rounded-[var(--xen-radius-lg)] border border-border bg-surface px-4 py-3 text-center text-sm text-muted', className), ...rest, children: emptyLabel }));
    }
    const line = (name, score) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between gap-2", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm font-semibold text-on-surface", children: name }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-lg font-extrabold', score === undefined ? 'text-muted' : 'text-on-surface'), children: score === undefined ? '–' : score })] }));
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, cn_1.cn)(strip, className), ...rest, children: matches.map((m) => {
            const status = m.status ?? 'upcoming';
            const sm = STATUS_META[status] ?? STATUS_META.upcoming;
            const hasScore = m.homeScore !== undefined && m.awayScore !== undefined;
            const a11y = `${m.home} versus ${m.away}, ${sm.label}${hasScore ? `, ${m.homeScore} ${m.awayScore}` : ''}`;
            const interactive = (0, interactive_1.tappableProps)(onSelect ? () => onSelect(m) : undefined, a11y);
            return ((0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex w-36 shrink-0 flex-col gap-1 rounded-[var(--xen-radius-lg)] border bg-surface p-3 shadow-sm', sm.live ? 'border-primary/40 ring-1 ring-primary/20' : 'border-border', onSelect && interactive_1.FOCUS_RING), ...(onSelect ? {} : { 'aria-label': a11y }), ...interactive, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-1", children: [(0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('inline-flex flex-1 items-center gap-1 rounded-full px-2 py-0.5 text-[0.625rem] font-extrabold', sm.pill), children: [sm.live ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "h-1.5 w-1.5 rounded-full bg-danger" })) : ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: sm.glyph })), sm.label] }), m.clock ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold text-muted", children: m.clock }) : null] }), line(m.home, m.homeScore), line(m.away, m.awayScore)] }, m.id));
        }) }));
});
//# sourceMappingURL=ScoreTickerV4.js.map