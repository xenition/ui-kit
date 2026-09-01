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
exports.TeamCardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const LeagueBadge_1 = require("./LeagueBadge");
const interactive_1 = require("./interactive");
const FORM_META = {
    W: { text: 'text-success', border: 'border-success', label: 'win' },
    D: { text: 'text-muted', border: 'border-border', label: 'draw' },
    L: { text: 'text-danger', border: 'border-danger', label: 'loss' },
};
/**
 * TeamCard — **V4** "broadcast" design (web parity of the native V4). The
 * matchday take on a team summary: an elevated card with the crest, name, and
 * league; the current rank shown as a big bold numeral in a soft-primary tile; the
 * W/D/L record and a recent-form strip whose results read by letter + a11y label,
 * never color alone. `selected` promotes to an accent border and stays a pressed
 * affordance. Same props/behavior as {@link TeamCardProps}; all colors from
 * `--xen-*` token classes (no literals). `loading` swaps in a token skeleton.
 */
exports.TeamCardV4 = React.forwardRef(function TeamCardV4({ name, crest, league, won, drawn, lost, rank, form = [], variant = 'full', selected = false, loading = false, onClick, className, ...rest }, ref) {
    const tile = variant === 'tile';
    const shell = (0, cn_1.cn)('flex flex-col gap-2 rounded-[var(--xen-radius-lg)] bg-surface p-4 text-on-surface shadow-sm', selected ? 'border-2 border-primary' : 'border border-border', className);
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-busy": "true", "aria-label": "Loading team", className: shell, ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "h-5 rounded-sm bg-on-surface/10" }), (0, jsx_runtime_1.jsx)("div", { className: "h-4 w-3/5 rounded-sm bg-on-surface/10" })] }));
    }
    const hasRecord = won !== undefined || drawn !== undefined || lost !== undefined;
    const recordLabel = `${won ?? 0}W · ${drawn ?? 0}D · ${lost ?? 0}L`;
    const a11y = `${name}${rank !== undefined ? `, rank ${rank}` : ''}${hasRecord ? `, ${recordLabel}` : ''}`;
    const interactive = (0, interactive_1.tappableProps)(onClick, a11y);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: onClick ? (0, cn_1.cn)(shell, interactive_1.FOCUS_RING) : shell, ...(onClick ? { 'aria-pressed': selected } : { 'aria-label': a11y }), ...interactive, ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(LeagueBadge_1.LeagueBadge, { name: name, crest: crest, label: "", size: tile ? 'sm' : 'lg' }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-base font-extrabold text-on-surface", children: name }), league ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted", children: league }) : null] }), rank !== undefined ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center rounded-md bg-primary/10 px-2 py-1", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-[10px] font-bold uppercase tracking-wide text-muted", children: "Rank" }), (0, jsx_runtime_1.jsxs)("span", { className: "text-2xl font-extrabold leading-none text-primary tabular-nums", children: ["#", rank] })] })) : null] }), !tile && hasRecord ? ((0, jsx_runtime_1.jsx)("p", { className: "text-sm font-bold text-on-surface tabular-nums", children: recordLabel })) : null, !tile && form.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "flex gap-1", children: form.slice(-5).map((f, i) => {
                    const fm = FORM_META[f] ?? FORM_META.D;
                    return ((0, jsx_runtime_1.jsx)("span", { "aria-label": fm.label, className: (0, cn_1.cn)('inline-flex h-5 w-5 items-center justify-center rounded-full border bg-on-surface/5 text-xs font-bold', fm.border, fm.text), children: f }, i));
                }) })) : null] }));
});
//# sourceMappingURL=TeamCardV4.js.map