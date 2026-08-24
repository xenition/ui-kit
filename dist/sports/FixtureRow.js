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
exports.FixtureRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const interactive_1 = require("./interactive");
const STATUS_META = {
    scheduled: { label: 'vs', live: false },
    live: { label: 'LIVE', live: true },
    final: { label: 'FT', live: false },
    postponed: { label: 'PP', live: false },
};
/**
 * A compact one-line fixture — home vs away with a center column showing either
 * the kickoff time, the live scoreline, or the final result. The status is
 * conveyed by text (a `danger` dot only reinforces "LIVE"), never color alone.
 * Built for tight lists (schedules, results). Activated via `onClick`.
 * Token-only colors.
 */
exports.FixtureRow = React.forwardRef(function FixtureRow({ home, away, homeCrest, awayCrest, homeScore, awayScore, kickoffLabel, minute, meta, status = 'scheduled', highlighted = false, onClick, className, ...rest }, ref) {
    const sm = STATUS_META[status] ?? STATUS_META.scheduled;
    const hasScore = homeScore !== undefined && awayScore !== undefined;
    const center = status === 'scheduled'
        ? (kickoffLabel ?? 'vs')
        : hasScore
            ? `${homeScore} – ${awayScore}`
            : sm.label;
    const subline = status === 'live' && minute ? minute : status === 'scheduled' ? (meta ?? '') : sm.label;
    const shell = (0, cn_1.cn)('flex items-center gap-2 rounded-md border px-4 py-2', highlighted ? 'border-primary bg-primary-50' : 'border-border bg-surface', className);
    const team = (nameStr, crest, side) => ((0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex flex-1 items-center gap-1', side === 'home' ? 'flex-row-reverse' : 'flex-row'), children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-sm leading-none", children: crest ?? '🛡' }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex-1 truncate text-sm font-semibold text-on-surface', side === 'home' ? 'text-right' : 'text-left'), children: nameStr })] }));
    const a11y = `${home} versus ${away}, ${sm.label}` +
        (hasScore
            ? `, ${homeScore} to ${awayScore}`
            : status === 'scheduled' && kickoffLabel
                ? `, ${kickoffLabel}`
                : '');
    const interactive = (0, interactive_1.tappableProps)(onClick, a11y);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: onClick ? (0, cn_1.cn)(shell, interactive_1.FOCUS_RING) : shell, ...(onClick ? {} : { 'aria-label': a11y }), ...interactive, ...rest, children: [team(home, homeCrest, 'home'), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-[64px] flex-col items-center", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-base font-bold', status === 'scheduled' ? 'text-muted' : 'text-on-surface'), children: center }), (0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-1", children: [sm.live ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "h-1.5 w-1.5 rounded-full bg-danger" })) : null, (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs font-semibold', sm.live ? 'text-danger' : 'text-muted'), children: subline })] })] }), team(away, awayCrest, 'away')] }));
});
//# sourceMappingURL=FixtureRow.js.map