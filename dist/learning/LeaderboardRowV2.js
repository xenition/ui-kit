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
exports.LeaderboardRowV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const MEDAL = { 1: '🥇', 2: '🥈', 3: '🥉' };
/**
 * LeaderboardRow, redesigned (v2): an **elevated podium card**. The rank shows as
 * a medal (top 3) or a big numbered disc, the avatar + name lead, and the score
 * is a large right-aligned figure with its unit and trend beneath. Highlighted
 * rows gain a primary ring + tint. Distinct from v1's flat line. Same props,
 * token-only.
 */
exports.LeaderboardRowV2 = React.forwardRef(function LeaderboardRowV2({ rank, name, avatar, score, scoreUnit = 'pts', highlighted = false, empty = false, trend, onSelect, className, ...rest }, ref) {
    const interactive = typeof onSelect === 'function' && !empty;
    const handleKeyDown = (e) => {
        if (interactive && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onSelect?.();
        }
    };
    if (empty) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-leaderboard-row": "", "aria-label": `Rank ${rank}, open`, className: (0, cn_1.cn)('flex items-center gap-3 rounded-lg border border-dashed border-border p-3 opacity-60', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: "w-8 text-center text-sm font-bold text-muted", children: rank }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: "Open spot" })] }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-leaderboard-row": "", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": `Rank ${rank}${name ? `, ${name}` : ''}${typeof score === 'number' ? `, ${score} ${scoreUnit}` : ''}`, onClick: interactive ? () => onSelect?.() : undefined, onKeyDown: interactive ? handleKeyDown : undefined, className: (0, cn_1.cn)('flex items-center gap-3 rounded-lg bg-surface p-3 shadow-sm transition-transform', highlighted && 'bg-primary/10 ring-2 ring-primary', interactive && 'cursor-pointer hover:-translate-y-0.5 hover:shadow-md motion-reduce:transition-none motion-reduce:hover:translate-y-0', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-lg font-bold text-on-surface", children: MEDAL[rank] ?? rank }), (0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: avatar, name: name, size: "md" }), (0, jsx_runtime_1.jsx)("p", { className: "min-w-0 flex-1 truncate text-sm font-semibold text-on-surface", children: name ?? `Player ${rank}` }), (0, jsx_runtime_1.jsxs)("div", { className: "text-right", children: [typeof score === 'number' ? ((0, jsx_runtime_1.jsxs)("p", { className: "text-lg font-bold text-on-surface", children: [score.toLocaleString(), " ", (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-normal text-muted", children: scoreUnit })] })) : null, trend ? (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted", children: trend }) : null] })] }));
});
//# sourceMappingURL=LeaderboardRowV2.js.map