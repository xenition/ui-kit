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
exports.Standings = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const commerce_1 = require("../commerce");
const interactive_1 = require("./interactive");
const ZONE_BAR = {
    success: 'bg-success',
    danger: 'bg-danger',
    primary: 'bg-primary',
};
const FORM_META = {
    W: { text: 'text-success', border: 'border-success', label: 'win' },
    D: { text: 'text-muted', border: 'border-border', label: 'draw' },
    L: { text: 'text-danger', border: 'border-danger', label: 'loss' },
};
/**
 * A league table — the classic standings grid rendered as a semantic `<table>`.
 * Rows are selectable (`onSelectTeam`, keyboard-activated); `zones` paint
 * promotion / relegation bands as a leading accent bar reinforced by the row's
 * a11y label, so meaning never rests on color alone. Empty (via the shared
 * `EmptyState`) and loading states are built in. `compact` trims to Played +
 * Points for narrow layouts. Token-only colors.
 */
exports.Standings = React.forwardRef(function Standings({ rows, variant = 'full', showForm = false, zones = [], activeId, loadingRows, onSelectTeam, emptyLabel = 'No standings yet', className, ...rest }, ref) {
    const full = variant === 'full';
    const zoneFor = (pos) => zones.find((z) => pos >= z.from && pos <= z.to);
    const shell = (0, cn_1.cn)('w-full overflow-x-auto rounded-md border border-border bg-surface', className);
    const th = (label, extra = 'text-right') => (0, cn_1.cn)('px-2 py-2 text-xs font-semibold text-muted', extra);
    const td = (extra = 'text-right') => (0, cn_1.cn)('px-2 py-2 text-sm text-muted', extra);
    const head = ((0, jsx_runtime_1.jsx)("thead", { children: (0, jsx_runtime_1.jsxs)("tr", { className: "border-b border-border", children: [(0, jsx_runtime_1.jsx)("th", { className: th('#', 'text-center'), children: "#" }), (0, jsx_runtime_1.jsx)("th", { className: th('Team', 'text-left'), children: "Team" }), (0, jsx_runtime_1.jsx)("th", { className: th('P'), children: "P" }), full ? (0, jsx_runtime_1.jsx)("th", { className: th('W'), children: "W" }) : null, full ? (0, jsx_runtime_1.jsx)("th", { className: th('D'), children: "D" }) : null, full ? (0, jsx_runtime_1.jsx)("th", { className: th('L'), children: "L" }) : null, full ? (0, jsx_runtime_1.jsx)("th", { className: th('GD'), children: "GD" }) : null, (0, jsx_runtime_1.jsx)("th", { className: th('Pts'), children: "Pts" })] }) }));
    const colCount = full ? 8 : 4;
    if (loadingRows && loadingRows > 0) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "aria-busy": "true", "aria-label": "Loading standings", className: shell, ...rest, children: (0, jsx_runtime_1.jsxs)("table", { className: "w-full border-collapse", children: [head, (0, jsx_runtime_1.jsx)("tbody", { children: Array.from({ length: loadingRows }).map((_, i) => ((0, jsx_runtime_1.jsx)("tr", { className: "border-b border-border last:border-0", children: (0, jsx_runtime_1.jsx)("td", { colSpan: colCount, className: "p-2", children: (0, jsx_runtime_1.jsx)("div", { className: "h-6 rounded-sm bg-neutral-200" }) }) }, i))) })] }) }));
    }
    if (rows.length === 0) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: shell, ...rest, children: (0, jsx_runtime_1.jsxs)("table", { className: "w-full border-collapse", children: [head, (0, jsx_runtime_1.jsx)("tbody", { children: (0, jsx_runtime_1.jsx)("tr", { children: (0, jsx_runtime_1.jsx)("td", { colSpan: colCount, className: "p-0", children: (0, jsx_runtime_1.jsx)(commerce_1.EmptyState, { title: emptyLabel, description: "Rows appear once the table is published.", className: "border-0" }) }) }) })] }) }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: shell, ...rest, children: (0, jsx_runtime_1.jsxs)("table", { className: "w-full border-collapse", children: [head, (0, jsx_runtime_1.jsx)("tbody", { children: rows.map((row, i) => {
                        const pos = i + 1;
                        const zone = zoneFor(pos);
                        const active = row.id === activeId;
                        const gd = row.goalDiff ?? row.won - row.lost;
                        const gdLabel = gd > 0 ? `+${gd}` : String(gd);
                        const label = `${pos}. ${row.team}, ${row.points} points, played ${row.played}` +
                            (zone ? `, ${zone.label}` : '');
                        const clickable = Boolean(onSelectTeam);
                        return ((0, jsx_runtime_1.jsxs)("tr", { ...(clickable
                                ? {
                                    role: 'button',
                                    tabIndex: 0,
                                    'aria-label': label,
                                    'aria-pressed': active,
                                    onClick: () => onSelectTeam(row),
                                    onKeyDown: (0, interactive_1.activateOnKey)(() => onSelectTeam(row)),
                                }
                                : { 'aria-label': label }), className: (0, cn_1.cn)('border-b border-border last:border-0', active ? 'bg-primary-50' : 'bg-surface', clickable &&
                                'cursor-pointer outline-none hover:bg-neutral-50 focus-visible:ring-2 focus-visible:ring-primary-300'), children: [(0, jsx_runtime_1.jsxs)("td", { className: "relative px-2 py-2 text-center text-sm font-semibold text-on-surface", children: [zone ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('absolute inset-y-0 left-0 w-[3px]', ZONE_BAR[zone.tone]) })) : null, pos] }), (0, jsx_runtime_1.jsx)("td", { className: "px-2 py-2 text-left", children: (0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-sm leading-none", children: row.crest ?? '🛡' }), (0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm font-semibold text-on-surface", children: row.team }), showForm && full && row.form && row.form.length > 0 ? ((0, jsx_runtime_1.jsx)("span", { className: "ml-1 hidden gap-0.5 sm:flex", children: row.form.slice(-5).map((f, fi) => {
                                                    const fm = FORM_META[f] ?? FORM_META.D;
                                                    return ((0, jsx_runtime_1.jsx)("span", { "aria-label": fm.label, className: (0, cn_1.cn)('inline-flex h-4 w-4 items-center justify-center rounded-sm border bg-neutral-100 text-xs font-bold', fm.border, fm.text), children: f }, fi));
                                                }) })) : null] }) }), (0, jsx_runtime_1.jsx)("td", { className: td(), children: row.played }), full ? (0, jsx_runtime_1.jsx)("td", { className: td(), children: row.won }) : null, full ? (0, jsx_runtime_1.jsx)("td", { className: td(), children: row.drawn }) : null, full ? (0, jsx_runtime_1.jsx)("td", { className: td(), children: row.lost }) : null, full ? (0, jsx_runtime_1.jsx)("td", { className: td(), children: gdLabel }) : null, (0, jsx_runtime_1.jsx)("td", { className: (0, cn_1.cn)(td('text-right'), 'font-bold text-on-surface'), children: row.points })] }, row.id));
                    }) })] }) }));
});
//# sourceMappingURL=Standings.js.map