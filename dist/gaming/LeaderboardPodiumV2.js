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
exports.LeaderboardPodiumV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Avatar_1 = require("../primitives/Avatar");
const EmptyState_1 = require("../commerce/EmptyState");
const MEDAL = ['🥇', '🥈', '🥉'];
const PILLARS = [1, 0, 2]; // render order: 2nd, 1st, 3rd
const HEIGHT = ['h-16', 'h-24', 'h-12'];
/**
 * LeaderboardPodium, redesigned (v2): a **classic 3-pillar podium**. The top three
 * stand on tiered blocks (2nd · 1st · 3rd) with medals, avatars, names and scores;
 * the winner's pillar is tallest and primary-filled. Bolder than v1. Same props,
 * token-only.
 */
exports.LeaderboardPodiumV2 = React.forwardRef(function LeaderboardPodiumV2({ entries, emptyLabel = 'No rankings yet', onClick, className }, ref) {
    if (entries.length === 0) {
        return (0, jsx_runtime_1.jsx)(EmptyState_1.EmptyState, { ref: ref, icon: (0, jsx_runtime_1.jsx)("span", { className: "text-3xl", children: "\uD83C\uDFC6" }), title: emptyLabel, className: className });
    }
    const top = entries.slice(0, 3);
    const interactive = typeof onClick === 'function';
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-leaderboard-podium": "", className: (0, cn_1.cn)('flex items-end justify-center gap-2', className), children: PILLARS.map((idx) => {
            const entry = top[idx];
            if (!entry)
                return (0, jsx_runtime_1.jsx)("div", { className: "flex-1" }, idx);
            const rank = idx + 1;
            const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xl", "aria-hidden": true, children: MEDAL[idx] }), (0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { src: entry.avatarUrl, name: entry.name, size: idx === 0 ? 'lg' : 'md' }), (0, jsx_runtime_1.jsx)("span", { className: "max-w-full truncate text-xs font-semibold text-on-surface", children: entry.name }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: entry.score.toLocaleString() }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('mt-1 w-full rounded-t-md', HEIGHT[idx], idx === 0 ? 'bg-primary/20' : 'bg-neutral-100'), "aria-hidden": true })] }));
            if (!interactive)
                return (0, jsx_runtime_1.jsx)("div", { className: "flex flex-1 flex-col items-center gap-1", children: body }, entry.id);
            return ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": `Rank ${rank}, ${entry.name}`, onClick: () => onClick?.(entry, rank), className: "flex flex-1 flex-col items-center gap-1", children: body }, entry.id));
        }) }));
});
//# sourceMappingURL=LeaderboardPodiumV2.js.map