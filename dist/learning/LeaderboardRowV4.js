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
exports.LeaderboardRowV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const MEDAL = {
    1: { glyph: '🥇', text: 'text-accent' },
    2: { glyph: '🥈', text: 'text-muted' },
    3: { glyph: '🥉', text: 'text-warn' },
};
/**
 * LeaderboardRow — **V4** "campus" design (web parity of the native V4). An
 * elevated rounded row with a soft shadow: rank (a medal glyph for the top three),
 * avatar, name, an optional trend note, and a big legible **tabular-nums** score.
 * `highlighted` marks the current user with a primary ring; `empty` renders a
 * muted placeholder for an unfilled slot. Interactive rows are a keyboard-operable
 * `role="button"`. Honors the V4 `variant` — `full` (default) and `compact` (a
 * denser single line). All colors from `--xen-*` token classes (no literals).
 */
exports.LeaderboardRowV4 = React.forwardRef(function LeaderboardRowV4({ rank, name, avatar, score, scoreUnit = 'pts', highlighted = false, empty = false, trend, variant = 'full', onSelect, className, ...rest }, ref) {
    const medal = MEDAL[rank];
    const compact = variant === 'compact';
    const shell = (0, cn_1.cn)('flex items-center gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface shadow-sm px-[var(--xen-space-md)]', compact ? 'py-[var(--xen-space-xs)]' : 'py-[var(--xen-space-sm)]', highlighted && 'ring-2 ring-primary', className);
    if (empty || !name) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-leaderboard-row": "", "aria-label": `Rank ${rank}, empty`, className: shell, ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: "w-7 text-center text-sm font-bold tabular-nums text-muted", children: rank }), (0, jsx_runtime_1.jsx)("span", { className: "h-8 w-8 rounded-full bg-neutral-100" }), (0, jsx_runtime_1.jsx)("span", { className: "flex-1 text-sm text-muted", children: "\u2014" })] }));
    }
    const rankClass = medal ? medal.text : 'text-on-surface';
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
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-leaderboard-row": "", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": a11y, onClick: interactive ? onSelect : undefined, onKeyDown: handleKeyDown, className: (0, cn_1.cn)(shell, interactive && 'cursor-pointer transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary'), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('w-7 shrink-0 text-center text-lg font-extrabold tabular-nums', rankClass), children: medal ? medal.glyph : rank }), (0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: avatar, name: name, size: "sm" }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('min-w-0 flex-1 truncate text-sm', highlighted ? 'font-bold' : 'font-semibold', 'text-on-surface'), children: name }), trend ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs tabular-nums text-muted", children: trend }) : null, score != null ? (0, jsx_runtime_1.jsxs)("span", { className: "shrink-0 text-sm font-bold tabular-nums text-on-surface", children: [score, " ", scoreUnit] }) : null] }));
});
//# sourceMappingURL=LeaderboardRowV4.js.map