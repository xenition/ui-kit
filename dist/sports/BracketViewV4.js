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
exports.BracketViewV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const commerce_1 = require("../commerce");
const interactive_1 = require("./interactive");
/**
 * BracketView — **V4** "broadcast" design (web parity of the native V4). The
 * knockout draw as a matchday graphic: horizontally-scrolling round columns of
 * clean, elevated matchup cells, the advancing side bolded and washed in a
 * soft-primary tint with a primary check glyph (never color alone). The implied
 * connective column structure of the base is preserved, as is horizontal scroll.
 * Same props/behavior as {@link BracketViewProps}; all colors from `--xen-*`
 * token classes (no literals).
 */
exports.BracketViewV4 = React.forwardRef(function BracketViewV4({ rounds, onSelectMatch, emptyLabel = 'Bracket not drawn yet', className, ...rest }, ref) {
    if (rounds.length === 0) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: className, ...rest, children: (0, jsx_runtime_1.jsx)(commerce_1.EmptyState, { title: emptyLabel, description: "Rounds appear once the draw is made." }) }));
    }
    const renderSlot = (slot) => {
        const named = Boolean(slot.name && slot.name.length > 0);
        const win = Boolean(slot.winner);
        return ((0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex items-center justify-between gap-2 rounded-[var(--xen-radius-sm)] px-2 py-1', win && 'bg-primary/10'), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 items-center gap-2", children: [win ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-xs font-bold text-primary", children: "\u2713" })) : ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-xs text-muted", children: "\u00B7" })), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex-1 truncate text-sm', named ? (win ? 'text-primary' : 'text-on-surface') : 'italic text-muted', win ? 'font-extrabold' : 'font-medium'), children: named ? slot.name : 'TBD' })] }), slot.score !== undefined ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-sm font-extrabold', win ? 'text-primary' : 'text-on-surface'), children: slot.score })) : null] }));
    };
    const renderRound = (round, ri) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex w-44 flex-col justify-around gap-4", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-center text-xs font-extrabold uppercase tracking-wide text-muted", children: round.title }), round.matches.map((m) => {
                const a11y = `${m.top.name ?? 'TBD'} versus ${m.bottom.name ?? 'TBD'}`;
                const interactive = (0, interactive_1.tappableProps)(onSelectMatch ? () => onSelectMatch(m, ri) : undefined, a11y);
                return ((0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex flex-col gap-1 rounded-[var(--xen-radius-md)] border border-border bg-surface p-2 shadow-sm', onSelectMatch && interactive_1.FOCUS_RING), ...(onSelectMatch ? {} : { 'aria-label': a11y }), ...interactive, children: [renderSlot(m.top), (0, jsx_runtime_1.jsx)("div", { "aria-hidden": "true", className: "h-px bg-border" }), renderSlot(m.bottom)] }, m.id));
            })] }, `${round.title}-${ri}`));
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, cn_1.cn)('flex gap-6 overflow-x-auto p-1', className), ...rest, children: rounds.map(renderRound) }));
});
//# sourceMappingURL=BracketViewV4.js.map