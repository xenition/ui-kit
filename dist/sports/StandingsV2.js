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
exports.StandingsV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const commerce_1 = require("../commerce");
const interactive_1 = require("./interactive");
const FORM = { W: 'bg-success text-on-success', D: 'bg-neutral-300 text-on-surface', L: 'bg-danger text-on-danger' };
const ZONE_BAR = { success: 'border-l-success', danger: 'border-l-danger', primary: 'border-l-primary' };
/**
 * Standings, redesigned (v2): a **card-row table**. Each team is a raised row with
 * a rank medallion, crest, name, a form streak of pills, and prominent points — a
 * leading accent bar marks promotion/relegation zones. Bolder than v1's grid.
 * Same props, token-only.
 */
exports.StandingsV2 = React.forwardRef(function StandingsV2({ rows, variant, showForm = true, zones, activeId, loadingRows, onSelectTeam, emptyLabel = 'No standings', className, ...rest }, ref) {
    void variant;
    if (loadingRows && loadingRows > 0) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-standings": "", className: (0, cn_1.cn)('flex flex-col gap-1.5', className), ...rest, children: Array.from({ length: loadingRows }).map((_, i) => (0, jsx_runtime_1.jsx)("div", { className: "h-12 animate-pulse rounded-md bg-neutral-100" }, i)) }));
    }
    if (rows.length === 0) {
        return (0, jsx_runtime_1.jsx)(commerce_1.EmptyState, { ref: ref, icon: (0, jsx_runtime_1.jsx)("span", { className: "text-3xl", children: "\uD83C\uDFC6" }), title: emptyLabel, className: className, ...rest });
    }
    const zoneFor = (pos) => zones?.find((z) => pos >= z.from && pos <= z.to);
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-standings": "", className: (0, cn_1.cn)('flex flex-col gap-1.5', className), ...rest, children: rows.map((row, i) => {
            const pos = i + 1;
            const zone = zoneFor(pos);
            const active = row.id === activeId;
            const interactive = typeof onSelectTeam === 'function';
            return ((0, jsx_runtime_1.jsxs)("div", { role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": `${pos}. ${row.team}, ${row.points} points`, onClick: interactive ? () => onSelectTeam?.(row) : undefined, onKeyDown: interactive ? (0, interactive_1.activateOnKey)(() => onSelectTeam?.(row)) : undefined, className: (0, cn_1.cn)('flex items-center gap-3 rounded-md border-l-4 bg-surface p-2.5 shadow-sm', zone ? ZONE_BAR[zone.tone] : 'border-l-transparent', active && 'ring-2 ring-primary', interactive && 'cursor-pointer transition-colors hover:bg-neutral-50'), children: [(0, jsx_runtime_1.jsx)("span", { className: "w-6 text-center text-sm font-bold text-muted", children: pos }), (0, jsx_runtime_1.jsx)("span", { className: "text-lg", "aria-hidden": true, children: row.crest ?? '⚽' }), (0, jsx_runtime_1.jsx)("span", { className: "min-w-0 flex-1 truncate text-sm font-semibold text-on-surface", children: row.team }), showForm && row.form && row.form.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "hidden gap-0.5 sm:flex", children: row.form.slice(-5).map((f, j) => ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold', FORM[f]), children: f }, j))) })) : null, (0, jsx_runtime_1.jsx)("span", { className: "w-8 text-right text-base font-bold text-on-surface", children: row.points })] }, row.id));
        }) }));
});
//# sourceMappingURL=StandingsV2.js.map