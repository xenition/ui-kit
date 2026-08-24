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
exports.StandingsV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const commerce_1 = require("../commerce");
const interactive_1 = require("./interactive");
const ZONE_DOT = { success: 'bg-success', danger: 'bg-danger', primary: 'bg-primary' };
/**
 * Standings, redesigned (v3): a **minimal ladder**. Position, crest + team, and
 * points only — a tiny zone dot flags promotion/relegation. The tightest possible
 * table for a sidebar. The opposite of v2's card rows. Same props, token-only.
 */
exports.StandingsV3 = React.forwardRef(function StandingsV3({ rows, variant, showForm, zones, activeId, loadingRows, onSelectTeam, emptyLabel = 'No standings', className, ...rest }, ref) {
    void variant;
    void showForm;
    if (loadingRows && loadingRows > 0) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-standings": "", className: (0, cn_1.cn)('flex flex-col', className), ...rest, children: Array.from({ length: loadingRows }).map((_, i) => (0, jsx_runtime_1.jsx)("div", { className: "h-7 border-b border-border" }, i)) }));
    }
    if (rows.length === 0) {
        return (0, jsx_runtime_1.jsx)(commerce_1.EmptyState, { ref: ref, icon: (0, jsx_runtime_1.jsx)("span", { className: "text-3xl", children: "\uD83C\uDFC6" }), title: emptyLabel, className: className, ...rest });
    }
    const zoneFor = (pos) => zones?.find((z) => pos >= z.from && pos <= z.to);
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-standings": "", className: (0, cn_1.cn)('flex flex-col', className), ...rest, children: rows.map((row, i) => {
            const pos = i + 1;
            const zone = zoneFor(pos);
            const active = row.id === activeId;
            const interactive = typeof onSelectTeam === 'function';
            return ((0, jsx_runtime_1.jsxs)("div", { role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": `${pos}. ${row.team}, ${row.points} points`, onClick: interactive ? () => onSelectTeam?.(row) : undefined, onKeyDown: interactive ? (0, interactive_1.activateOnKey)(() => onSelectTeam?.(row)) : undefined, className: (0, cn_1.cn)('flex items-center gap-2 border-b border-border py-1.5', active && 'bg-primary/5', interactive && 'cursor-pointer transition-colors hover:bg-neutral-50'), children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-1", children: [zone ? (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('h-2 w-2 rounded-full', ZONE_DOT[zone.tone]), "aria-hidden": true }) : (0, jsx_runtime_1.jsx)("span", { className: "h-2 w-2" }), (0, jsx_runtime_1.jsx)("span", { className: "w-5 text-right text-xs tabular-nums text-muted", children: pos })] }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm", "aria-hidden": true, children: row.crest ?? '⚽' }), (0, jsx_runtime_1.jsx)("span", { className: "min-w-0 flex-1 truncate text-sm text-on-surface", children: row.team }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-bold tabular-nums text-on-surface", children: row.points })] }, row.id));
        }) }));
});
//# sourceMappingURL=StandingsV3.js.map