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
exports.LeaderboardRowV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
/**
 * LeaderboardRow, redesigned (v3): a **dense ranking line**. A fixed-width rank
 * number, a tiny avatar, the name inline, and the score pinned right with its
 * trend as a small trailing note — hairline-separated so a full ladder stacks
 * tightly. Highlighted rows get a primary left accent bar (plus text weight),
 * never color alone. Same props, token-only.
 */
exports.LeaderboardRowV3 = React.forwardRef(function LeaderboardRowV3({ rank, name, avatar, score, scoreUnit = 'pts', highlighted = false, empty = false, trend, onSelect, className, ...rest }, ref) {
    const interactive = typeof onSelect === 'function' && !empty;
    const handleKeyDown = (e) => {
        if (interactive && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onSelect?.();
        }
    };
    if (empty) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-leaderboard-row": "", "aria-label": `Rank ${rank}, open`, className: (0, cn_1.cn)('flex items-center gap-3 border-b border-border py-2 opacity-60', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: "w-6 text-center text-xs font-bold text-muted", children: rank }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: "Open spot" })] }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-leaderboard-row": "", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": `Rank ${rank}${name ? `, ${name}` : ''}${typeof score === 'number' ? `, ${score} ${scoreUnit}` : ''}${highlighted ? ', you' : ''}`, onClick: interactive ? () => onSelect?.() : undefined, onKeyDown: interactive ? handleKeyDown : undefined, className: (0, cn_1.cn)('flex items-center gap-3 border-b border-border py-2 pl-2', highlighted && 'border-l-2 border-l-primary bg-primary/5', interactive && 'cursor-pointer transition-colors hover:bg-neutral-50', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('w-6 text-center text-sm font-bold', highlighted ? 'text-primary' : 'text-muted'), children: rank }), (0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: avatar, name: name, size: "xs" }), (0, jsx_runtime_1.jsx)("p", { className: (0, cn_1.cn)('min-w-0 flex-1 truncate text-sm', highlighted ? 'font-bold text-on-surface' : 'text-on-surface'), children: name ?? `Player ${rank}` }), trend ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: trend }) : null, typeof score === 'number' ? ((0, jsx_runtime_1.jsxs)("span", { className: "text-sm font-semibold text-on-surface", children: [score.toLocaleString(), " ", (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-normal text-muted", children: scoreUnit })] })) : null] }));
});
//# sourceMappingURL=LeaderboardRowV3.js.map