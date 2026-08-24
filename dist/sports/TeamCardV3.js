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
exports.TeamCardV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const interactive_1 = require("./interactive");
const FORM_TEXT = { W: 'text-success', D: 'text-muted', L: 'text-danger' };
/**
 * TeamCard, redesigned (v3): a **compact team row**. A rank number, crest, name
 * over a league·record line, and a small form streak on the right — hairline-
 * bordered for a teams list. The opposite of v2's banner. Same props, token-only.
 */
exports.TeamCardV3 = React.forwardRef(function TeamCardV3({ name, crest = '⚽', league, won, drawn, lost, rank, form, variant, selected = false, loading = false, onClick, className, ...rest }, ref) {
    void variant;
    if (loading) {
        return (0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-team-card": "", "aria-label": "Loading team", className: (0, cn_1.cn)('flex items-center gap-3 border-b border-border py-2.5', className), ...rest, children: (0, jsx_runtime_1.jsx)("div", { className: "h-3 w-2/5 animate-pulse rounded-sm bg-neutral-100" }) });
    }
    const tap = (0, interactive_1.tappableProps)(onClick, name);
    const record = [won, drawn, lost].every((n) => typeof n === 'number') ? `${won}-${drawn}-${lost}` : null;
    const sub = [league, record].filter((s) => !!s).join(' · ');
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-team-card": "", className: (0, cn_1.cn)('flex items-center gap-3 border-b border-border py-2.5', selected && 'border-l-2 border-l-accent pl-2', onClick && 'cursor-pointer transition-colors hover:bg-neutral-50', className), ...tap, ...rest, children: [typeof rank === 'number' ? (0, jsx_runtime_1.jsx)("span", { className: "w-5 text-right text-sm font-bold tabular-nums text-muted", children: rank }) : null, (0, jsx_runtime_1.jsx)("span", { className: "text-lg", "aria-hidden": true, children: crest }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm font-semibold text-on-surface", children: name }), sub ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted", children: sub }) : null] }), form && form.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "flex gap-0.5", children: form.slice(-5).map((f, i) => ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs font-bold', FORM_TEXT[f]), children: f }, i))) })) : null] }));
});
//# sourceMappingURL=TeamCardV3.js.map