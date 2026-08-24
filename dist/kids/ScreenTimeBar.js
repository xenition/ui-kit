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
exports.ScreenTimeBar = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const commerce_1 = require("../commerce");
function fmtMinutes(mins, unit) {
    if (unit !== 'min')
        return `${mins} ${unit}`;
    if (mins < 60)
        return `${mins} min`;
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return m === 0 ? `${h}h` : `${h}h ${m}m`;
}
/**
 * Screen-time usage against a daily limit: a labelled readout plus a progress
 * bar that shifts tone as usage climbs (primary → warn near the cap → danger
 * once over). The over/near state is conveyed in the readout text + a11y label,
 * not by color alone. Renders the shared {@link EmptyState} when `limit <= 0`.
 * Token-bound throughout — no literal colors.
 */
exports.ScreenTimeBar = React.forwardRef(function ScreenTimeBar({ used, limit, unit = 'min', label = 'Screen time', loading = false, emptyLabel = 'No screen-time limit set', className, ...rest }, ref) {
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(primitives_1.Card, { ref: ref, "data-xen-screen-time-bar": "", "aria-label": "Loading screen time", className: className, ...rest, children: (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-3 w-2/5 animate-pulse rounded-[var(--xen-radius-sm)] bg-neutral-200" }), (0, jsx_runtime_1.jsx)("div", { className: "h-2.5 w-full animate-pulse rounded-[var(--xen-radius-sm)] bg-neutral-200" })] }) }));
    }
    if (!(limit > 0)) {
        return ((0, jsx_runtime_1.jsx)(commerce_1.EmptyState, { ref: ref, "data-xen-screen-time-bar": "", "aria-label": emptyLabel, className: className, icon: (0, jsx_runtime_1.jsx)("span", { className: "text-3xl", children: "\u23F1\uFE0F" }), title: label, description: emptyLabel, ...rest }));
    }
    const safeUsed = Math.max(0, used);
    const pct = (safeUsed / limit) * 100;
    const over = safeUsed > limit;
    const near = !over && pct >= 80;
    const tone = over ? 'danger' : near ? 'warn' : 'primary';
    const readoutColor = over ? 'text-danger' : near ? 'text-warn' : 'text-on-surface';
    const stateNote = over
        ? `over by ${fmtMinutes(safeUsed - limit, unit)}`
        : `${fmtMinutes(Math.max(0, limit - safeUsed), unit)} left`;
    return ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { ref: ref, "data-xen-screen-time-bar": "", "aria-label": `${label}, ${fmtMinutes(safeUsed, unit)} of ${fmtMinutes(limit, unit)}, ${stateNote}`, className: className, ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-baseline justify-between", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-base font-bold text-on-surface", children: label }), (0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('text-sm font-bold', readoutColor), children: [fmtMinutes(safeUsed, unit), " / ", fmtMinutes(limit, unit)] })] }), (0, jsx_runtime_1.jsx)("div", { className: "mt-2", children: (0, jsx_runtime_1.jsx)(primitives_1.Progress, { value: safeUsed, max: limit, tone: tone }) }), (0, jsx_runtime_1.jsx)("p", { className: (0, cn_1.cn)('mt-1 text-xs', over ? 'font-bold text-danger' : 'text-muted'), children: over ? `⚠️ ${stateNote}` : stateNote })] }));
});
//# sourceMappingURL=ScreenTimeBar.js.map