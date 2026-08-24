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
exports.LeaderboardRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
/** Medal glyph + token `text-*` tone for the top three ranks. */
const MEDAL = {
    1: { glyph: '🥇', colorClass: 'text-accent' },
    2: { glyph: '🥈', colorClass: 'text-muted' },
    3: { glyph: '🥉', colorClass: 'text-warn' },
};
/**
 * A leaderboard entry row: rank (medal glyph for the top three), avatar, name,
 * and score. `highlighted` marks the current user; `empty` renders a muted
 * placeholder for an unfilled slot. Interactive rows are a `role="button"`
 * element with Enter/Space activation. Token-only colors (`--xen-*`).
 */
exports.LeaderboardRow = React.forwardRef(function LeaderboardRow({ rank, name, avatar, score, scoreUnit = 'pts', highlighted = false, empty = false, trend, onSelect, className, ...rest }, ref) {
    const medal = MEDAL[rank];
    const base = (0, cn_1.cn)('flex items-center gap-3 rounded-[var(--xen-radius-md)] border px-3 py-2', highlighted ? 'border-primary bg-primary' : 'border-border bg-surface', className);
    if (empty || !name) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": `Rank ${rank}, empty`, className: base, ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: "w-7 text-center text-sm font-bold text-muted", children: rank }), (0, jsx_runtime_1.jsx)("span", { className: "h-8 w-8 rounded-full bg-border" }), (0, jsx_runtime_1.jsx)("span", { className: "flex-1 text-sm text-muted", children: "\u2014" })] }));
    }
    const fgClass = highlighted ? 'text-on-primary' : 'text-on-surface';
    const mutedClass = highlighted ? 'text-on-primary' : 'text-muted';
    const rankClass = medal ? medal.colorClass : fgClass;
    const a11y = `Rank ${rank}, ${name}${score != null ? `, ${score} ${scoreUnit}` : ''}${highlighted ? ', you' : ''}`;
    const interactive = !!onSelect;
    const handleKeyDown = (e) => {
        if (!interactive)
            return;
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onSelect?.();
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": a11y, onClick: interactive ? onSelect : undefined, onKeyDown: handleKeyDown, className: (0, cn_1.cn)(base, interactive && 'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary'), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('w-7 text-center text-base font-extrabold', rankClass), children: medal ? medal.glyph : rank }), (0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: avatar, name: name, size: "sm" }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('min-w-0 flex-1 truncate text-sm', highlighted ? 'font-bold' : 'font-semibold', fgClass), children: name }), trend ? (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs', mutedClass), children: trend }) : null, score != null ? ((0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('text-sm font-bold', fgClass), children: [score, " ", scoreUnit] })) : null] }));
});
//# sourceMappingURL=LeaderboardRow.js.map