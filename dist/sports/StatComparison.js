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
exports.StatComparison = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/**
 * A two-team stat comparison — mirrored horizontal bars sharing a center line,
 * one row per metric (possession, shots, …). Each bar is proportional to its
 * share of the pair total; the winning side is emphasised by weight (leading
 * side reads bolder) so ranking survives without relying on color. Home uses
 * the `primary` slot, away the `accent` slot. Empty state built in. Token-only
 * colors; bars are plain `div`s (no chart dependency).
 */
exports.StatComparison = React.forwardRef(function StatComparison({ homeLabel, awayLabel, rows, homeCrest, awayCrest, emptyLabel = 'No stats to compare', className, ...rest }, ref) {
    const shell = (0, cn_1.cn)('flex flex-col gap-3 rounded-lg border border-border bg-surface p-4 text-on-surface', className);
    const header = ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 items-center gap-1", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-base leading-none", children: homeCrest ?? '🛡' }), (0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm font-bold text-primary", children: homeLabel })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 items-center justify-end gap-1", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm font-bold text-accent", children: awayLabel }), (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-base leading-none", children: awayCrest ?? '🛡' })] })] }));
    if (rows.length === 0) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: shell, ...rest, children: [header, (0, jsx_runtime_1.jsx)("p", { className: "py-3 text-center text-sm text-muted", children: emptyLabel })] }));
    }
    const fmt = (v, suffix) => `${v}${suffix ?? ''}`;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: shell, ...rest, children: [header, rows.map((row, i) => {
                const total = row.home + row.away;
                const homePct = total > 0 ? Math.round((row.home / total) * 100) : 50;
                const awayPct = total > 0 ? Math.round((row.away / total) * 100) : 50;
                const better = row.better ?? 'higher';
                const homeWins = better === 'higher' ? row.home > row.away : row.home < row.away;
                const awayWins = better === 'higher' ? row.away > row.home : row.away < row.home;
                return ((0, jsx_runtime_1.jsxs)("div", { "aria-label": `${row.label}: ${homeLabel} ${fmt(row.home, row.suffix)}, ${awayLabel} ${fmt(row.away, row.suffix)}`, className: "flex flex-col gap-1", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-sm text-on-surface', homeWins ? 'font-bold' : 'font-medium'), children: fmt(row.home, row.suffix) }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold text-muted", children: row.label }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-sm text-on-surface', awayWins ? 'font-bold' : 'font-medium'), children: fmt(row.away, row.suffix) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-1", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex h-2 flex-1 justify-end overflow-hidden rounded-full bg-neutral-100", children: (0, jsx_runtime_1.jsx)("div", { className: "h-full bg-primary", style: { width: `${homePct}%` } }) }), (0, jsx_runtime_1.jsx)("div", { className: "flex h-2 flex-1 justify-start overflow-hidden rounded-full bg-neutral-100", children: (0, jsx_runtime_1.jsx)("div", { className: "h-full bg-accent", style: { width: `${awayPct}%` } }) })] })] }, `${row.label}-${i}`));
            })] }));
});
//# sourceMappingURL=StatComparison.js.map