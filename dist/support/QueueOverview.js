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
exports.QueueOverview = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
// Tone → token utility classes for the big value numeral. Token-only (no hex).
const VALUE_TONE = {
    primary: 'text-primary',
    success: 'text-success',
    warn: 'text-warn',
    danger: 'text-danger',
    muted: 'text-on-surface',
};
/**
 * QueueOverview — **V4** "calm console" dashboard strip. A responsive
 * row/grid of elevated stat tiles giving a helpdesk queue its at-a-glance vitals
 * ("Open", "Waiting", "Breached SLA", "CSAT"). Each tile is a big value numeral
 * with a muted caption and an optional signed delta colored by sign (▲ up /
 * ▼ down). One accent = primary; other tones swap in a semantic accent. Tiles
 * wrap onto new rows on narrow widths. Presentational only — shaped data in, no
 * fetching. All colors from `--xen-*` token classes (no literal hex).
 * Dark-mode safe.
 */
exports.QueueOverview = React.forwardRef(function QueueOverview({ stats, title, className, ...rest }, ref) {
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "group", "aria-label": title ?? 'Queue overview', className: (0, cn_1.cn)('flex flex-col gap-3', className), ...rest, children: [title ? ((0, jsx_runtime_1.jsx)("h2", { className: "text-sm font-bold uppercase tracking-wide text-muted", children: title })) : null, (0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-3", children: stats.map((stat, i) => {
                    const tone = stat.tone ?? 'primary';
                    const hasDelta = typeof stat.delta === 'number' && Number.isFinite(stat.delta);
                    const up = hasDelta && stat.delta > 0;
                    const down = hasDelta && stat.delta < 0;
                    const deltaText = hasDelta
                        ? `${up ? '▲' : down ? '▼' : ''} ${Math.abs(stat.delta)}`.trim()
                        : null;
                    return ((0, jsx_runtime_1.jsxs)("div", { "aria-label": `${stat.label}: ${String(stat.value)}${deltaText ? `, change ${up ? 'up' : 'down'} ${Math.abs(stat.delta)}` : ''}`, className: (0, cn_1.cn)('flex min-w-[140px] flex-1 flex-col gap-1 rounded-[var(--xen-radius-lg)] border border-border bg-surface p-4 shadow-sm', tone === 'primary' && 'bg-primary/10'), children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-3xl font-bold leading-none', VALUE_TONE[tone] ?? VALUE_TONE.primary), children: stat.value }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-medium text-muted", children: stat.label }), deltaText ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('text-xs font-bold', up && 'text-success', down && 'text-danger', !up && !down && 'text-muted'), children: deltaText })) : null] }, `${stat.label}-${i}`));
                }) })] }));
});
//# sourceMappingURL=QueueOverview.js.map