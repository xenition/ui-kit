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
exports.StatComparisonV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/**
 * StatComparison — **V4** "broadcast" design (web parity of the native V4). The
 * matchday take on a head-to-head: an elevated card of center-split bars, one
 * row per metric, home filling left in the `primary` accent and away filling
 * right in the `accent` token. Big value numerals flank each row and the leading
 * side reads bolder in `primary`, so ranking survives without relying on color.
 * Same props/behavior as {@link StatComparisonProps}; all colors from `--xen-*`
 * token classes (no literals). Empty state built in. 8-pt spacing, one accent.
 */
exports.StatComparisonV4 = React.forwardRef(function StatComparisonV4({ homeLabel, awayLabel, rows, homeCrest, awayCrest, emptyLabel = 'No stats to compare', className, ...rest }, ref) {
    const shell = (0, cn_1.cn)('flex flex-col gap-4 rounded-[var(--xen-radius-lg)] border border-border bg-surface p-4 text-on-surface shadow-sm', className);
    const header = ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 items-center gap-2", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-base leading-none", children: homeCrest ?? '🛡' }), (0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm font-extrabold text-primary", children: homeLabel })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 items-center justify-end gap-2", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm font-extrabold text-accent", children: awayLabel }), (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-base leading-none", children: awayCrest ?? '🛡' })] })] }));
    if (rows.length === 0) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: shell, ...rest, children: [header, (0, jsx_runtime_1.jsx)("p", { className: "py-3 text-center text-sm text-muted", children: emptyLabel })] }));
    }
    const fmt = (v, suffix) => `${v}${suffix ?? ''}`;
    const renderRow = (row, i) => {
        const total = row.home + row.away;
        const homePct = total > 0 ? Math.round((row.home / total) * 100) : 50;
        const awayPct = total > 0 ? Math.round((row.away / total) * 100) : 50;
        const better = row.better ?? 'higher';
        const homeWins = better === 'higher' ? row.home > row.away : row.home < row.away;
        const awayWins = better === 'higher' ? row.away > row.home : row.away < row.home;
        return ((0, jsx_runtime_1.jsxs)("div", { "aria-label": `${row.label}: ${homeLabel} ${fmt(row.home, row.suffix)}, ${awayLabel} ${fmt(row.away, row.suffix)}`, className: "flex flex-col gap-1", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xl tabular-nums', homeWins ? 'font-extrabold text-primary' : 'font-medium text-muted'), children: fmt(row.home, row.suffix) }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-bold uppercase tracking-wide text-muted", children: row.label }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xl tabular-nums', awayWins ? 'font-extrabold text-accent' : 'font-medium text-muted'), children: fmt(row.away, row.suffix) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-1", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex h-2 flex-1 justify-end overflow-hidden rounded-full bg-primary/10", children: (0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-full rounded-full bg-primary', homeWins ? 'opacity-100' : 'opacity-40'), style: { width: `${homePct}%` } }) }), (0, jsx_runtime_1.jsx)("div", { className: "flex h-2 flex-1 justify-start overflow-hidden rounded-full bg-accent/10", children: (0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-full rounded-full bg-accent', awayWins ? 'opacity-100' : 'opacity-40'), style: { width: `${awayPct}%` } }) })] })] }, `${row.label}-${i}`));
    };
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: shell, ...rest, children: [header, rows.map(renderRow)] }));
});
//# sourceMappingURL=StatComparisonV4.js.map