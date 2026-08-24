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
exports.LeaderboardPodiumV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Avatar_1 = require("../primitives/Avatar");
const EmptyState_1 = require("../commerce/EmptyState");
const MEDAL = ['🥇', '🥈', '🥉'];
/**
 * LeaderboardPodium, redesigned (v3): a **compact top-3 list**. The three leaders
 * stack as hairline rows — medal, avatar, name, and score pinned right — for a
 * tight standings widget. The opposite of v2's pillars. Same props, token-only.
 */
exports.LeaderboardPodiumV3 = React.forwardRef(function LeaderboardPodiumV3({ entries, emptyLabel = 'No rankings yet', onClick, className }, ref) {
    if (entries.length === 0) {
        return (0, jsx_runtime_1.jsx)(EmptyState_1.EmptyState, { ref: ref, icon: (0, jsx_runtime_1.jsx)("span", { className: "text-3xl", children: "\uD83C\uDFC6" }), title: emptyLabel, className: className });
    }
    const top = entries.slice(0, 3);
    const interactive = typeof onClick === 'function';
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-leaderboard-podium": "", className: (0, cn_1.cn)('flex flex-col', className), children: top.map((entry, idx) => {
            const rank = idx + 1;
            const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("span", { className: "w-6 text-center text-base", "aria-hidden": true, children: MEDAL[idx] }), (0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { src: entry.avatarUrl, name: entry.name, size: "sm" }), (0, jsx_runtime_1.jsx)("span", { className: "min-w-0 flex-1 truncate text-sm font-medium text-on-surface", children: entry.name }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-bold tabular-nums text-on-surface", children: entry.score.toLocaleString() })] }));
            if (!interactive)
                return (0, jsx_runtime_1.jsx)("div", { className: "flex items-center gap-3 border-b border-border py-2", children: body }, entry.id);
            return ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": `Rank ${rank}, ${entry.name}`, onClick: () => onClick?.(entry, rank), className: "flex items-center gap-3 border-b border-border py-2 text-left transition-colors hover:bg-neutral-50", children: body }, entry.id));
        }) }));
});
//# sourceMappingURL=LeaderboardPodiumV3.js.map