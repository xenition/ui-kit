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
exports.TeamCardV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const interactive_1 = require("./interactive");
const FORM = { W: 'bg-success text-on-success', D: 'bg-neutral-300 text-on-surface', L: 'bg-danger text-on-danger' };
/**
 * TeamCard, redesigned (v2): a **banner team card**. A primary-tinted header holds
 * the crest, name, league and a rank chip; a W-D-L strip and a form streak of
 * pills sit beneath. Bolder than v1's row. Same props, token-only.
 */
exports.TeamCardV2 = React.forwardRef(function TeamCardV2({ name, crest = '⚽', league, won, drawn, lost, rank, form, variant, selected = false, loading = false, onClick, className, ...rest }, ref) {
    void variant;
    if (loading) {
        return (0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-team-card": "", "aria-label": "Loading team", className: (0, cn_1.cn)('h-32 animate-pulse rounded-lg bg-neutral-100', className), ...rest });
    }
    const tap = (0, interactive_1.tappableProps)(onClick, name);
    const record = [won, drawn, lost].every((n) => typeof n === 'number') ? `${won}W · ${drawn}D · ${lost}L` : null;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-team-card": "", className: (0, cn_1.cn)('overflow-hidden rounded-lg bg-surface shadow-sm', selected && 'ring-2 ring-accent', onClick && 'cursor-pointer transition-opacity hover:opacity-90', className), ...tap, ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-3 bg-primary/10 p-md", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-3xl", "aria-hidden": true, children: crest }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-base font-bold text-on-surface", children: name }), league ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted", children: league }) : null] }), typeof rank === 'number' ? (0, jsx_runtime_1.jsxs)("span", { className: "rounded-full bg-primary px-2.5 py-1 text-xs font-bold text-on-primary", children: ["#", rank] }) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between p-md", children: [record ? (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-semibold text-on-surface", children: record }) : (0, jsx_runtime_1.jsx)("span", {}), form && form.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "flex gap-0.5", children: form.slice(-5).map((f, i) => ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold', FORM[f]), children: f }, i))) })) : null] })] }));
});
//# sourceMappingURL=TeamCardV2.js.map