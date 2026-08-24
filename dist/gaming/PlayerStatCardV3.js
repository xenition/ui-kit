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
/**
 * PlayerStatCard, redesigned (v3): a **compact roster row**. A small avatar with an
 * online dot, the gamertag over a rank·level line, and the first couple of stats
 * inline on the right — hairline-bordered for a friends/party list. The opposite
 * of v2's hero. Same props, token-only.
 */
exports.PlayerStatCardV3 = React.forwardRef(function PlayerStatCardV3({ player, variant, online = false, onClick, className }, ref) {
    void variant;
    const interactive = typeof onClick === 'function';
    const sub = [player.rank, typeof player.level === 'number' ? `Lv ${player.level}` : null].filter((s) => !!s).join(' · ');
    const top = (player.stats ?? []).slice(0, 2);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-player-stat-card": "", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": player.name, onClick: interactive ? () => onClick?.(player) : undefined, onKeyDown: interactive ? (e) => { if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick?.(player);
        } } : undefined, className: (0, cn_1.cn)('flex items-center gap-3 border-b border-border py-2.5', interactive && 'cursor-pointer transition-colors hover:bg-neutral-50', className), children: [(0, jsx_runtime_1.jsxs)("div", { className: "relative shrink-0", children: [(0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { src: player.avatarUrl, name: player.name, size: "sm" }), online ? (0, jsx_runtime_1.jsx)("span", { className: "absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-surface bg-success", "aria-label": "Online" }) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm font-semibold text-on-surface", children: player.name }), sub ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted", children: sub }) : null] }), top.map((s, i) => ((0, jsx_runtime_1.jsxs)("div", { className: "text-right", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm font-bold text-on-surface", children: s.value }), (0, jsx_runtime_1.jsx)("p", { className: "text-[10px] text-muted", children: s.label })] }, i)))] }));
});
//# sourceMappingURL=PlayerStatCardV3.js.map