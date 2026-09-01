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
exports.PollResultBarV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const commerce_1 = require("../commerce");
/**
 * PollResultBar — **V4** "focus" design. The calm, legible take on a result
 * chart: tall (~44px) rounded rows on a soft-primary track, each filled to its
 * share of the vote in solid primary and trailed by a big percent numeral. The
 * **leading** option is emphasised (bolder label, solid-primary fill) and the
 * respondent's own pick keeps its primary border + spoken "your choice"; when
 * `showResults` is `false` and `onVote` is set the rows become vote buttons.
 * One accent (primary), no gradients. Same props/behavior as
 * {@link PollResultBarProps}; all colors from `--xen-*` token classes (no
 * literal colors). `0` total votes render every bar at 0% safely.
 */
exports.PollResultBarV4 = React.forwardRef(function PollResultBarV4({ options, selectedId, showResults = true, onVote, 'aria-label': ariaLabel = 'Poll results', className }, ref) {
    const total = options.reduce((sum, o) => sum + Math.max(0, o.votes), 0);
    const topVotes = options.reduce((m, o) => Math.max(m, o.votes), 0);
    if (options.length === 0) {
        return (0, jsx_runtime_1.jsx)(commerce_1.EmptyState, { ref: ref, title: "No poll options yet.", className: className });
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "list", "aria-label": ariaLabel, className: (0, cn_1.cn)('flex flex-col gap-sm', className), children: [options.map((opt) => {
                const pct = total > 0 ? Math.round((Math.max(0, opt.votes) / total) * 100) : 0;
                const isPick = selectedId === opt.id;
                const isWinner = showResults && total > 0 && opt.votes === topVotes;
                const rowLabel = showResults
                    ? `${opt.label}: ${pct}%${isPick ? ', your choice' : ''}`
                    : opt.label;
                const inner = ((0, jsx_runtime_1.jsxs)("div", { "aria-label": rowLabel, className: (0, cn_1.cn)(
                    // Soft-primary track in results mode; a plain surface for voting.
                    'relative min-h-[44px] overflow-hidden rounded-lg border', showResults ? 'bg-primary/10' : 'bg-surface', isPick ? 'border-primary' : 'border-border'), children: [showResults ? ((0, jsx_runtime_1.jsx)("div", { "aria-hidden": "true", className: (0, cn_1.cn)('absolute inset-y-0 left-0 bg-primary', isWinner ? 'opacity-100' : 'opacity-70'), style: { width: `${pct}%` } })) : null, (0, jsx_runtime_1.jsxs)("div", { className: "relative flex min-h-[44px] items-center gap-sm px-md py-sm", children: [isPick ? ((0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u2713", size: "sm", color: "primary" })) : opt.icon ? ((0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: opt.icon, size: "base", color: "onSurface" })) : null, (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex-1 text-base text-on-surface', isPick || isWinner ? 'font-extrabold' : 'font-semibold'), children: opt.label }), showResults ? ((0, jsx_runtime_1.jsxs)("span", { className: "text-xl font-extrabold tabular-nums text-on-surface", children: [pct, "%"] })) : null] })] }));
                if (!showResults && onVote) {
                    return ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": `Vote for ${opt.label}`, onClick: () => onVote(opt.id), className: "block w-full text-left", children: inner }, opt.id));
                }
                return ((0, jsx_runtime_1.jsx)("div", { role: "listitem", children: inner }, opt.id));
            }), showResults ? ((0, jsx_runtime_1.jsxs)("span", { className: "text-sm font-semibold text-muted", children: [total, " ", total === 1 ? 'vote' : 'votes'] })) : null] }));
});
//# sourceMappingURL=PollResultBarV4.js.map