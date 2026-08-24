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
exports.PlayerStatCardV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Avatar_1 = require("../primitives/Avatar");
const interactive_1 = require("./interactive");
const STATUS_GLYPH = {
    available: '✓', injured: '＋', suspended: '⛔',
};
const STATUS_TEXT = {
    available: 'text-success', injured: 'text-danger', suspended: 'text-warn',
};
/**
 * PlayerStatCard, redesigned (v3): a **compact roster row**. A small avatar with
 * the shirt number, the name over position·team, and the first couple of stats
 * inline on the right — hairline-bordered for a squad list. The opposite of v2's
 * hero. Same props, token-only.
 */
exports.PlayerStatCardV3 = React.forwardRef(function PlayerStatCardV3({ name, position, number, photo, team, stats = [], variant, status, loading = false, onClick, className, ...rest }, ref) {
    void variant;
    if (loading) {
        return (0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-player-stat-card": "", "aria-label": "Loading player", className: (0, cn_1.cn)('flex items-center gap-3 border-b border-border py-2.5', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "h-9 w-9 animate-pulse rounded-full bg-neutral-100" }), (0, jsx_runtime_1.jsx)("div", { className: "h-3 w-1/3 animate-pulse rounded-sm bg-neutral-100" })] });
    }
    const sub = [position, team].filter((s) => !!s).join(' · ');
    const tap = (0, interactive_1.tappableProps)(onClick, name);
    const top = stats.slice(0, 2);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-player-stat-card": "", className: (0, cn_1.cn)('flex items-center gap-3 border-b border-border py-2.5', onClick && 'cursor-pointer transition-colors hover:bg-neutral-50', className), ...tap, ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "relative shrink-0", children: [(0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { src: photo, name: name, size: "sm" }), typeof number === 'number' ? ((0, jsx_runtime_1.jsx)("span", { className: "absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-on-primary", children: number })) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsxs)("p", { className: "flex items-center gap-1 truncate text-sm font-semibold text-on-surface", children: [name, status ? (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs', STATUS_TEXT[status]), "aria-label": status, children: STATUS_GLYPH[status] }) : null] }), sub ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted", children: sub }) : null] }), top.map((s, i) => ((0, jsx_runtime_1.jsxs)("div", { className: "text-right", children: [(0, jsx_runtime_1.jsx)("p", { className: (0, cn_1.cn)('text-sm font-bold', s.highlight ? 'text-primary' : 'text-on-surface'), children: s.value }), (0, jsx_runtime_1.jsx)("p", { className: "text-[10px] text-muted", children: s.label })] }, i)))] }));
});
//# sourceMappingURL=PlayerStatCardV3.js.map