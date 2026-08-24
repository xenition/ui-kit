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
exports.PlayerStatCardV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Avatar_1 = require("../primitives/Avatar");
const Badge_1 = require("../primitives/Badge");
/**
 * PlayerStatCard, redesigned (v2): a **hero profile card**. A tinted header holds
 * a large avatar (with an online dot), the gamertag, and a rank/level badge; the
 * headline stats render as a grid of tiles beneath. Bolder than v1. Same props,
 * token-only.
 */
exports.PlayerStatCardV2 = React.forwardRef(function PlayerStatCardV2({ player, variant, online = false, onClick, className }, ref) {
    void variant;
    const interactive = typeof onClick === 'function';
    const badge = [player.rank, typeof player.level === 'number' ? `Lv ${player.level}` : null].filter((s) => !!s).join(' · ');
    const stats = player.stats ?? [];
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-player-stat-card": "", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": player.name, onClick: interactive ? () => onClick?.(player) : undefined, onKeyDown: interactive ? (e) => { if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick?.(player);
        } } : undefined, className: (0, cn_1.cn)('overflow-hidden rounded-lg bg-surface shadow-sm', interactive && 'cursor-pointer transition-opacity hover:opacity-90', className), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-3 bg-primary/10 p-md", children: [(0, jsx_runtime_1.jsxs)("div", { className: "relative", children: [(0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { src: player.avatarUrl, name: player.name, size: "lg" }), online ? (0, jsx_runtime_1.jsx)("span", { className: "absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-surface bg-success", "aria-label": "Online" }) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-base font-bold text-on-surface", children: player.name }), badge ? (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: "primary", children: badge }) : null] })] }), stats.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-3 gap-2 p-md", children: stats.map((s, i) => ((0, jsx_runtime_1.jsxs)("div", { className: "rounded-md bg-neutral-100 px-2 py-2 text-center", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-lg font-bold text-on-surface", children: s.value }), (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted", children: s.label })] }, i))) })) : null] }));
});
//# sourceMappingURL=PlayerStatCardV2.js.map